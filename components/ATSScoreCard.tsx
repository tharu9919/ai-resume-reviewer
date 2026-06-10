"use client";

import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ATSScoreCard({ score }: { score: number }) {
  const color = score < 60 ? "bg-red-500 text-red-300" : score <= 80 ? "bg-yellow-400 text-yellow-200" : "bg-emerald-400 text-emerald-300";
  const tips = ["Use standard section headings", "Avoid tables and graphics", "Use common fonts", "Mirror relevant job keywords", "Keep dates and titles easy to parse"];

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <FileSearch className="h-5 w-5 text-purple-300" />
            <h3 className="text-xl font-bold text-white">ATS Compatibility</h3>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            This score estimates how easily applicant tracking systems can read your structure, headings, keywords, and formatting.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className={cn("text-4xl font-black", color.split(" ")[1])}>{score}/100</p>
        </div>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={cn("h-full rounded-full", color.split(" ")[0])}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(0, Math.min(score, 100))}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      {score < 80 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tips.map((tip) => (
            <span key={tip} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
              {tip}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
