"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { KeywordGap } from "@/lib/types";
import { cn } from "@/lib/utils";

const importanceStyles = {
  high: "border-red-400/25 bg-red-500/10 text-red-300",
  medium: "border-yellow-400/25 bg-yellow-500/10 text-yellow-200",
  low: "border-blue-400/25 bg-blue-500/10 text-blue-300"
};

export default function KeywordGapCard({ gaps }: { gaps: KeywordGap[] }) {
  if (gaps.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-5">
        <div className="flex items-center gap-3 text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
          <p className="font-semibold">Perfect keyword alignment!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {gaps.map((gap, index) => (
        <motion.div
          key={`${gap.keyword}-${index}`}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">{gap.keyword}</span>
            <span className={cn("rounded-full border px-2 py-0.5 text-xs font-bold", importanceStyles[gap.importance])}>
              {gap.importance}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">{gap.suggestion}</p>
        </motion.div>
      ))}
    </div>
  );
}
