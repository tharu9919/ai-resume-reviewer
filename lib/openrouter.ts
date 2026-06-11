import { analysisJsonSchema } from "./analysisSchema";
import { sleep } from "./utils";

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
    code?: number | string;
  };
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 409 || status === 425 || status === 500 || status === 502 || status === 503 || status === 504;
}

function isQuotaOrCreditError(message: string): boolean {
  const normalized = message.toLowerCase();
  return normalized.includes("quota") || normalized.includes("rate limit") || normalized.includes("credit") || normalized.includes("insufficient");
}

export async function callOpenRouter(prompt: string, systemInstruction: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === "your_openrouter_api_key_here") {
    throw new Error("OpenRouter API key is missing. Add OPENROUTER_API_KEY to your environment variables.");
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4.1-mini";
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 75_000);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://ai-resume-reviewer-ochre-nu.vercel.app",
          "X-OpenRouter-Title": "AI Resume Reviewer"
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 4096,
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "resume_analysis",
              strict: true,
              schema: analysisJsonSchema
            }
          }
        })
      });

      const data = (await response.json()) as OpenRouterResponse;

      if (!response.ok) {
        const apiMessage = data.error?.message ?? `OpenRouter request failed with status ${response.status}`;
        if (response.status === 401 || response.status === 403) {
          throw new Error("OpenRouter authentication failed. Check OPENROUTER_API_KEY in Vercel.");
        }
        if (response.status === 402 || response.status === 429 || isQuotaOrCreditError(apiMessage)) {
          throw new Error("OpenRouter credits or rate limit exhausted. Add credits in OpenRouter or wait before retrying.");
        }
        if (!isRetryableStatus(response.status)) {
          throw new Error(apiMessage);
        }
        throw new Error(apiMessage);
      }

      const text = data.choices?.[0]?.message?.content;
      if (!text) {
        throw new Error("OpenRouter returned an empty response.");
      }

      return text;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown OpenRouter request error.");
      if (isQuotaOrCreditError(lastError.message) || lastError.message.includes("authentication")) {
        throw lastError;
      }
      if (attempt < 1) {
        await sleep(900);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw new Error(`OpenRouter analysis failed after 2 attempts: ${lastError?.message ?? "Unknown error"}`);
}
