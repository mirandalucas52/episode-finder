import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const proModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const isDev = process.env.NODE_ENV === "development";

const PRO_DAILY_LIMIT = 25;
let proCallCount = 0;
let proResetDate = new Date().toDateString();

const getProCallsRemaining = (): number => {
  const today = new Date().toDateString();
  if (today !== proResetDate) {
    proCallCount = 0;
    proResetDate = today;
  }
  return PRO_DAILY_LIMIT - proCallCount;
};

export type ModelPreference = "auto" | "pro" | "flash";

export const generateContent = async (
  parts: { text: string }[],
  preference: ModelPreference = "auto"
): Promise<{ text: string; model: string }> => {
  const today = new Date().toDateString();
  if (today !== proResetDate) {
    proCallCount = 0;
    proResetDate = today;
  }

  const usePro =
    preference === "flash"
      ? false
      : preference === "pro" || proCallCount < PRO_DAILY_LIMIT;

  if (usePro) {
    try {
      const result = await proModel.generateContent(parts);
      proCallCount++;
      if (isDev) console.log(`[AI] gemini-2.5-pro (${getProCallsRemaining()} pro left today)`);
      return { text: result.response.text(), model: "gemini-2.5-pro" };
    } catch (e) {
      if (isDev) console.warn("[AI] pro failed, fallback to flash:", e instanceof Error ? e.message : e);
    }
  }

  const result = await flashModel.generateContent(parts);
  flashCallCount++;
  if (isDev) console.log(`[AI] gemini-2.5-flash${preference === "flash" ? "" : " (fallback)"} (${getProCallsRemaining()} pro left today)`);
  return { text: result.response.text(), model: "gemini-2.5-flash" };
};

let flashCallCount = 0;
let flashResetDate = new Date().toDateString();

export const getModelStats = () => {
  const today = new Date().toDateString();
  if (today !== proResetDate) {
    proCallCount = 0;
    proResetDate = today;
  }
  if (today !== flashResetDate) {
    flashCallCount = 0;
    flashResetDate = today;
  }
  return {
    proUsed: proCallCount,
    proLimit: PRO_DAILY_LIMIT,
    flashUsed: flashCallCount,
    flashLimit: 500,
  };
};
