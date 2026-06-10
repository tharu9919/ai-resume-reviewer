"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Improvement } from "@/lib/types";

export default function ImprovementCard({ improvement, index }: { improvement: Improvement; index: number }) {
  return (
    <motion.article
      className="glass rounded-2xl p-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <p className="gradient-text text-sm font-bold uppercase tracking-[0.16em]">{improvement.section}</p>
      <h4 className="mt-2 text-lg font-semibold text-white">{improvement.issue}</h4>
      <div className="mt-4 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl border border-red-400/20 bg-red-500/8 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-300">Before</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{improvement.before}</p>
        </div>
        <motion.div
          className="flex items-center justify-center text-slate-400"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
        </motion.div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/8 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">After</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{improvement.after}</p>
        </div>
      </div>
    </motion.article>
  );
}
