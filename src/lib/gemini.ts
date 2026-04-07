import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const proModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateContent = async (
  parts: { text: string }[]
): Promise<string> => {
  try {
    const result = await proModel.generateContent(parts);
    return result.response.text();
  } catch {
    const result = await flashModel.generateContent(parts);
    return result.response.text();
  }
};
