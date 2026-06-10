"use client";

import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { WeakVerbFound } from "@/lib/types";

export default function WeakVerbCard({ item, index }: { item: WeakVerbFound; index: number }) {
  const [copied, setCopied] = useState(false);
  const highlighted = item.context.replace(new RegExp(`(${item.verb})`, "ig"), "%%$1%%").split("%%");

  async function copySuggestions() {
    await navigator.clipboard.writeText(item.suggestions.join(", "));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <motion.article
      className="rounded-xl border border-red-400/15 bg-white/[0.03] p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-bold text-red-300">{item.verb}</span>
        <button
          type="button"
          onClick={copySuggestions}
          className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-emerald-400/40 hover:text-emerald-300"
          aria-label="Copy suggestions"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {highlighted.map((part, partIndex) =>
          part.toLowerCase() === item.verb.toLowerCase() ? (
            <mark key={`${part}-${partIndex}`} className="rounded bg-red-500/20 px-1 text-red-200">
              {part}
            </mark>
          ) : (
            <span key={`${part}-${partIndex}`}>{part}</span>
          )
        )}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.suggestions.map((suggestion) => (
          <span key={suggestion} className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            {suggestion}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
