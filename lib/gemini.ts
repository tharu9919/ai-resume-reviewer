import { sleep } from "./utils";

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
}

function isQuotaError(message: string): boolean {
  const normalized = message.toLowerCase();
  return normalized.includes("quota") || normalized.includes("rate limit") || normalized.includes("429");
}

export async function callGemini(prompt: string, systemInstruction: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("Gemini API key is missing. Add GEMINI_API_KEY to your environment variables.");
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60_000);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192,
            responseMimeType: "application/json"
          }
        })
      });

      const data = (await response.json()) as GeminiResponse;

      if (!response.ok) {
        const apiMessage = data.error?.message ?? `Gemini request failed with status ${response.status}`;
        if (response.status === 429 || isQuotaError(apiMessage)) {
          throw new Error("Gemini quota exceeded. Please wait a minute and try again, or add billing/upgrade quota in Google AI Studio.");
        }
        throw new Error(apiMessage);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }

      return text;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown Gemini request error.");
      if (isQuotaError(lastError.message)) {
        throw lastError;
      }
      if (attempt < 2) {
        await sleep(800 * 2 ** attempt);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw new Error(`Gemini analysis failed after 3 attempts: ${lastError?.message ?? "Unknown error"}`);
}
