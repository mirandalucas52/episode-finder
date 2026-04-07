import OpenAI from "openai";

const xai = new OpenAI({
  apiKey: process.env.XAI_API_KEY!,
  baseURL: "https://api.x.ai/v1",
});

export const callGrok = async (
  systemPrompt: string,
  userMessage: string
): Promise<string> => {
  const response = await xai.chat.completions.create({
    model: "grok-3-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.2,
  });

  return response.choices[0]?.message?.content ?? "";
};
