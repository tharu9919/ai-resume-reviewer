import { NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/parseFile";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "missing_file", message: "Please upload a PDF, DOCX, or TXT resume file." },
        { status: 400 }
      );
    }

    const text = (await extractTextFromFile(file)).trim();

    if (!text) {
      return NextResponse.json(
        { error: "empty_file", message: "We could not extract readable text from this file." },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to parse file.";
    const status = message.includes("Unsupported file type") ? 400 : 500;
    return NextResponse.json({ error: "parse_failed", message }, { status });
  }
}
