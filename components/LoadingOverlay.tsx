"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const steps = ["Reading your resume...", "Scoring against rubric...", "Matching job description...", "Generating insights...", "Preparing your report..."];

export default function LoadingOverlay({ isVisible, step }: { isVisible: boolean; step: number }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#04040a]/88 p-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="glass w-full max-w-md rounded-3xl p-8 text-center" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <div className="relative mx-auto h-32 w-24 overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
              <div className="mx-4 mt-5 h-2 rounded bg-white/15" />
              <div className="mx-4 mt-3 h-2 rounded bg-white/10" />
              <div className="mx-4 mt-3 h-2 rounded bg-white/10" />
              <div className="mx-4 mt-3 h-2 rounded bg-white/10" />
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-purple-400/0 via-purple-400/45 to-purple-400/0 animate-scan" />
            </div>
            <p className="mt-6 animate-pulse text-sm font-bold uppercase tracking-[0.2em] text-purple-200">Analyzing with Gemini AI...</p>
            <div className="mt-6 space-y-3 text-left">
              {steps.map((label, index) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/8 text-slate-300">
                    {index < step ? <Check className="h-4 w-4 text-emerald-300" /> : index === step ? <Loader2 className="h-4 w-4 animate-spin text-purple-300" /> : index + 1}
                  </span>
                  <span className={index <= step ? "text-slate-100" : "text-slate-500"}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
