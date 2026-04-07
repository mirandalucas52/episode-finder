import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const proModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const isDev = process.env.NODE_ENV === "development";

export const generateContent = async (
  parts: { text: string }[]
): Promise<{ text: string; model: string }> => {
  try {
    const result = await proModel.generateContent(parts);
    if (isDev) console.log("[AI] gemini-2.5-pro");
    return { text: result.response.text(), model: "gemini-2.5-pro" };
  } catch (e) {
    if (isDev) console.warn("[AI] pro failed, fallback to flash:", e instanceof Error ? e.message : e);
    const result = await flashModel.generateContent(parts);
    if (isDev) console.log("[AI] gemini-2.5-flash (fallback)");
    return { text: result.response.text(), model: "gemini-2.5-flash" };
  }
};
