import { NextResponse } from "next/server";
import { callAiProvider } from "@/lib/ai";
import { buildAnalysisPrompt, analysisSystemInstruction } from "@/lib/buildPrompt";
import { extractTextFromFile } from "@/lib/parseFile";
import { rubric } from "@/lib/rubric";
import type { AnalysisResult } from "@/lib/types";
import { countWords } from "@/lib/utils";
import { weakVerbs } from "@/lib/weakVerbs";

export const runtime = "nodejs";

function extractJsonText(text: string): string {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
    return cleaned;
  }

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("JSON object not found in Gemini response.");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<AnalysisResult>;
  return (
    typeof result.resumeScore === "number" &&
    typeof result.jobMatchScore === "number" &&
    typeof result.overallScore === "number" &&
    typeof result.atsScore === "number" &&
    Array.isArray(result.criteria) &&
    Array.isArray(result.strengths) &&
    Array.isArray(result.missingSections) &&
    Array.isArray(result.improvements) &&
    Array.isArray(result.weakVerbsFound) &&
    Array.isArray(result.keywordGaps) &&
    typeof result.overallFeedback === "string"
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get("resumeFile");
    const pastedResumeText = String(formData.get("resumeText") ?? "").trim();
    const jobDescription = String(formData.get("jobDescription") ?? "").trim();

    let resumeText = pastedResumeText;

    if (resumeFile instanceof File && resumeFile.size > 0) {
      const fileText = (await extractTextFromFile(resumeFile)).trim();
      resumeText = [fileText, pastedResumeText].filter(Boolean).join("\n\n");
    }

    if (!resumeText) {
      return NextResponse.json(
        { error: "missing_resume", message: "Upload a resume file or paste your resume text before analyzing." },
        { status: 400 }
      );
    }

    if (countWords(resumeText) < 50) {
      return NextResponse.json(
        { error: "resume_too_short", message: "Please provide at least 50 words of resume content for a useful analysis." },
        { status: 400 }
      );
    }

    const prompt = buildAnalysisPrompt(resumeText, jobDescription, rubric, weakVerbs);
    const rawResponse = await callAiProvider(prompt, analysisSystemInstruction);
    const jsonText = extractJsonText(rawResponse);
    const parsed: unknown = JSON.parse(jsonText);

    if (!isAnalysisResult(parsed)) {
      return NextResponse.json(
        { error: "invalid_ai_response", message: "Gemini returned an unexpected report format. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected analysis error.";

    if (message.includes("Unsupported file type")) {
      return NextResponse.json({ error: "unsupported_file", message }, { status: 400 });
    }

    if (message.includes("Gemini API key")) {
      return NextResponse.json({ error: "missing_api_key", message }, { status: 500 });
    }

    if (message.includes("OpenRouter API key")) {
      return NextResponse.json({ error: "missing_api_key", message }, { status: 500 });
    }

    if (message.toLowerCase().includes("quota") || message.toLowerCase().includes("credits") || message.toLowerCase().includes("rate limit")) {
      return NextResponse.json({ error: "quota_exceeded", message }, { status: 429 });
    }

    if (message.toLowerCase().includes("authentication")) {
      return NextResponse.json({ error: "auth_failed", message }, { status: 401 });
    }

    if (message.includes("JSON")) {
      return NextResponse.json(
        { error: "invalid_json", message: "The AI response could not be parsed. Please retry the analysis." },
        { status: 502 }
      );
    }

    return NextResponse.json({ error: "analysis_failed", message }, { status: 500 });
  }
}
