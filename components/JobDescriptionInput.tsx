"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clipboard, Info, Plus, Trash2, X } from "lucide-react";
import { countWords } from "@/lib/utils";

interface JobDescriptionInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

export default function JobDescriptionInput({ value, onChange, disabled }: JobDescriptionInputProps) {
  const expanded = value.length > 0;

  async function pasteFromClipboard() {
    const text = await navigator.clipboard.readText();
    onChange(text);
  }

  return (
    <div className="mt-8">
      <AnimatePresence initial={false}>
        {!expanded ? (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => onChange(" ")}
            disabled={disabled}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-semibold text-slate-300 transition hover:border-purple-300/50 hover:text-white disabled:opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            title="Adding a job description enables keyword gap analysis and match scoring"
          >
            <Plus className="h-4 w-4 text-purple-300" />
            Add Job Description
            <span className="text-slate-500">(optional)</span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-200">Job Description</h3>
                <Info className="h-4 w-4 text-slate-500" aria-label="Adding a job description enables keyword gap analysis and match scoring" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={pasteFromClipboard}
                  disabled={disabled}
                  className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-purple-300/40 hover:text-purple-200 disabled:opacity-50"
                  aria-label="Paste job description"
                >
                  <Clipboard className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  disabled={disabled}
                  className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-red-300/40 hover:text-red-300 disabled:opacity-50"
                  aria-label="Clear job description"
                >
                  {value.trim() ? <Trash2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <textarea
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              className="mt-4 min-h-44 w-full resize-y rounded-xl border border-white/10 bg-[#080812] p-4 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-300/50"
              placeholder="Paste the target job description here..."
            />
            <p className="mt-2 text-right text-xs text-slate-500">
              {value.length.toLocaleString()} chars - {countWords(value)} words
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
