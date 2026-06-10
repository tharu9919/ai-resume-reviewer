"use client";

import { motion } from "framer-motion";
import type { CriterionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function CriteriaBar({ criterion, index }: { criterion: CriterionResult; index: number }) {
  const color = criterion.score <= 2 ? "bg-red-500" : criterion.score === 3 ? "bg-yellow-400" : "bg-emerald-400";

  return (
    <motion.div
      className="glass rounded-xl p-4"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-slate-100">{criterion.name}</h4>
        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold text-slate-950", color)}>
          {criterion.score}/5
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(0, Math.min(criterion.score, 5)) * 20}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.04, duration: 0.75, ease: "easeOut" }}
        />
      </div>
      <motion.p
        className="mt-3 text-sm leading-6 text-slate-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55 + index * 0.04 }}
      >
        {criterion.feedback}
      </motion.p>
    </motion.div>
  );
}
