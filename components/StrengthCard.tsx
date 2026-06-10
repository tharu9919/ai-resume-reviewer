"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function StrengthCard({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      className="flex gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3 text-sm text-slate-200"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
      <span>{text}</span>
    </motion.li>
  );
}
