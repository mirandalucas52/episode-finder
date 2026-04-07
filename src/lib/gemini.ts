import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const proModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const isDev = process.env.NODE_ENV === "development";
const PRO_DAILY_LIMIT = 25;
const FLASH_DAILY_LIMIT = 500;
const STATS_FILE = join(process.cwd(), ".ai-stats.json");

type DayStats = {
  date: string;
  proUsed: number;
  flashUsed: number;
};

const readStats = (): DayStats => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const raw = readFileSync(STATS_FILE, "utf-8");
    const stats = JSON.parse(raw) as DayStats;
    if (stats.date === today) return stats;
  } catch {}
  return { date: today, proUsed: 0, flashUsed: 0 };
};

const writeStats = (stats: DayStats) => {
  try {
    writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch {}
};

export type ModelPreference = "auto" | "pro" | "flash";

export const generateContent = async (
  parts: { text: string }[],
  preference: ModelPreference = "auto"
): Promise<{ text: string; model: string }> => {
  const stats = readStats();

  const usePro =
    preference === "flash"
      ? false
      : preference === "pro" || stats.proUsed < PRO_DAILY_LIMIT;

  if (usePro) {
    try {
      const result = await proModel.generateContent(parts);
      stats.proUsed++;
      writeStats(stats);
      if (isDev) console.log(`[AI] gemini-2.5-pro (${PRO_DAILY_LIMIT - stats.proUsed} pro left today)`);
      return { text: result.response.text(), model: "gemini-2.5-pro" };
    } catch (e) {
      if (isDev) console.warn("[AI] pro failed, fallback to flash:", e instanceof Error ? e.message : e);
    }
  }

  // Flash with 1 retry on 503
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await flashModel.generateContent(parts);
      stats.flashUsed++;
      writeStats(stats);
      if (isDev) console.log(`[AI] gemini-2.5-flash${preference === "flash" ? "" : " (fallback)"} (${PRO_DAILY_LIMIT - stats.proUsed} pro left today)`);
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

  throw new Error("All AI models failed");
};

export const getModelStats = () => {
  const stats = readStats();
  return {
    proUsed: stats.proUsed,
    proLimit: PRO_DAILY_LIMIT,
    flashUsed: stats.flashUsed,
    flashLimit: FLASH_DAILY_LIMIT,
  };
};
