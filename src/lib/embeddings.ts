import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
};
