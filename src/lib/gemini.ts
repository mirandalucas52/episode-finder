import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const flashModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const isDev = process.env.NODE_ENV === "development";
const FLASH_DAILY_LIMIT = 500;
const STATS_FILE = join(process.cwd(), ".ai-stats.json");

type DayStats = {
  date: string;
  flashUsed: number;
};

const readStats = (): DayStats => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const raw = readFileSync(STATS_FILE, "utf-8");
    const stats = JSON.parse(raw) as DayStats;
    if (stats.date === today) return stats;
  } catch {}
  return { date: today, flashUsed: 0 };
};

const writeStats = (stats: DayStats) => {
  try {
    writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch {}
};

export const generateContent = async (
  parts: { text: string }[]
): Promise<{ text: string; model: string }> => {
  const stats = readStats();

  // Retry once on 503
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await flashModel.generateContent(parts);
      stats.flashUsed++;
      writeStats(stats);
      if (isDev) console.log(`[AI] gemini-2.5-flash (${FLASH_DAILY_LIMIT - stats.flashUsed} left today)`);
      return { text: result.response.text(), model: "gemini-2.5-flash" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (attempt === 0 && /503|unavailable|overloaded/i.test(msg)) {
        if (isDev) console.warn("[AI] flash 503, retrying in 2s...");
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      throw e;
    }
  }

  throw new Error("AI model failed");
};

export const getModelStats = () => {
  const stats = readStats();
  return {
    flashUsed: stats.flashUsed,
    flashLimit: FLASH_DAILY_LIMIT,
  };
};
