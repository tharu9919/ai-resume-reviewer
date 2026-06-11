import { callGemini } from "./gemini";
import { callOpenRouter } from "./openrouter";

export async function callAiProvider(prompt: string, systemInstruction: string): Promise<string> {
  const provider = process.env.AI_PROVIDER?.toLowerCase();
  const hasOpenRouterKey = Boolean(process.env.OPENROUTER_API_KEY);

  if (provider === "openrouter" || (!provider && hasOpenRouterKey)) {
    return callOpenRouter(prompt, systemInstruction);
  }

  return callGemini(prompt, systemInstruction);
}
