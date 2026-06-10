"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = ["10 Criteria", "100 Point Scale", "ATS Score"];

export default function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-purple-600/18 blur-3xl"
          animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[12%] right-[10%] h-80 w-80 rounded-full bg-blue-600/14 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-500/10 px-4 py-2 text-sm font-bold text-purple-200">
            <Sparkles className="h-4 w-4" />
            Powered by Gemini AI
          </div>
          <h1 className="mt-6 text-6xl font-black leading-none text-white sm:text-7xl lg:text-8xl">
            <span className="gradient-text">AI Resume Reviewer</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Upload your resume. Paste a job description. Get a detailed AI-powered match score in seconds.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
              >
                <p className="text-sm font-bold text-slate-100">{stat}</p>
              </motion.div>
            ))}
          </div>

          <a
            href="#form"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-4 text-sm font-black text-white shadow-glow-md transition hover:scale-[1.02]"
          >
            Analyze My Resume
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>

        <motion.div
          className="animated-gradient-border relative rounded-3xl"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.7 }}
        >
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">For illustration only</p>
                <h2 className="mt-1 text-2xl font-black text-white">Resume Score</h2>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">37/50</div>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-slate-800">
                <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-emerald-400 border-r-blue-400" />
                <div className="text-center">
                  <p className="text-5xl font-black text-white">74</p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">percent</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Skills Section", "88%"],
                ["Work Experience", "72%"],
                ["Quantified Results", "46%"],
                ["ATS Compatibility", "81%"]
              ].map(([label, width]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="text-slate-500">{width}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width }}
                      transition={{ delay: 0.5, duration: 0.9 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
