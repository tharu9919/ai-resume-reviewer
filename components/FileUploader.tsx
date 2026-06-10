"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Loader2, UploadCloud, X } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onTextExtracted: (text: string, fileName: string) => void;
  isLoading: boolean;
}

const acceptedTypes = ".pdf,.docx,.txt";

function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function typeBadge(file: File): string {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return "PDF";
  if (name.endsWith(".docx")) return "DOCX";
  return "TXT";
}

export default function FileUploader({ onTextExtracted, isLoading }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState("");

  async function parseFile(file: File) {
    setSelectedFile(file);
    setError("");
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse", { method: "POST", body: formData });
      const data = (await response.json()) as { text?: string; message?: string };

      if (!response.ok || !data.text) {
        throw new Error(data.message ?? "Could not extract text from this file.");
      }

      onTextExtracted(data.text, file.name);
    } catch (parseError) {
      setError(parseError instanceof Error ? parseError.message : "File parsing failed.");
      setSelectedFile(null);
    } finally {
      setIsParsing(false);
    }
  }

  function handleFile(file?: File) {
    if (!file || isLoading || isParsing) return;
    void parseFile(file);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function removeFile() {
    setSelectedFile(null);
    setError("");
    onTextExtracted("", "");
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative rounded-2xl border border-dashed p-6 text-center transition",
          isDragging ? "border-purple-300 bg-purple-500/10 shadow-glow-md" : "border-white/15 bg-white/[0.03]",
          (isLoading || isParsing) && "pointer-events-none opacity-80"
        )}
      >
        <input ref={inputRef} type="file" accept={acceptedTypes} className="hidden" onChange={onChange} disabled={isLoading || isParsing} />
        <motion.div animate={{ y: isDragging ? -3 : 0 }} className="mx-auto flex max-w-md flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-200">
            {isParsing ? <Loader2 className="h-7 w-7 animate-spin" /> : <UploadCloud className="h-7 w-7" />}
          </div>
          <p className="mt-4 text-base font-semibold text-white">{isParsing ? "Extracting resume text..." : "Drop your resume here"}</p>
          <p className="mt-1 text-sm text-slate-400">PDF, DOCX, or TXT files are supported.</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-purple-300/50 hover:text-white"
          >
            Browse file
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="h-5 w-5 shrink-0 text-purple-300" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-100">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">
                  {formatFileSize(selectedFile.size)} - {typeBadge(selectedFile)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-red-300/40 hover:text-red-300"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
    </div>
  );
}
