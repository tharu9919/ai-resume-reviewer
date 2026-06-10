"use client";

import { motion } from "framer-motion";
import { ClipboardCopy, FilePlus2, Sparkles, XCircle } from "lucide-react";
import type { AnalysisResult } from "@/lib/types";
import ATSScoreCard from "./ATSScoreCard";
import CriteriaBar from "./CriteriaBar";
import ImprovementCard from "./ImprovementCard";
import KeywordGapCard from "./KeywordGapCard";
import ScoreRing from "./ScoreRing";
import StrengthCard from "./StrengthCard";
import WeakVerbCard from "./WeakVerbCard";

interface ResultsDashboardProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  hasJobDescription: boolean;
  onReset?: () => void;
}

export default function ResultsDashboard({ result, isLoading, hasJobDescription, onReset }: ResultsDashboardProps) {
  if (!result && !isLoading) return null;
  if (!result) return <div className="mx-auto max-w-7xl px-5 py-12" />;

  async function copyReport() {
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">Analysis Complete</p>
        <h2 className="mt-2 text-4xl font-black text-white">Your AI Resume Reviewer report</h2>
      </motion.div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <ScoreRing score={result.resumeScore} maxScore={50} label="Resume Score" delay={0.05} />
        <div className={!hasJobDescription ? "opacity-55 grayscale" : undefined}>
          <ScoreRing score={result.jobMatchScore} maxScore={50} label={hasJobDescription ? "Job Match Score" : "Add JD for Match Score"} delay={0.12} />
        </div>
        <ScoreRing score={result.overallScore} maxScore={100} label="Overall Score" delay={0.18} />
      </div>

      <div className="mt-6">
        <ATSScoreCard score={result.atsScore} />
      </div>

      <div className="glass mt-6 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-purple-300" />
          <h3 className="text-xl font-bold text-white">Overall AI Summary</h3>
        </div>
        <p className="mt-3 leading-7 text-slate-300">{result.overallFeedback}</p>
      </div>

      <section className="mt-10">
        <h3 className="text-2xl font-black text-white">Criteria Breakdown</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {result.criteria.map((criterion, index) => (
            <CriteriaBar key={criterion.id} criterion={criterion} index={index} />
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-2xl p-6">
          <h3 className="text-xl font-black text-white">Key Strengths</h3>
          <ul className="mt-4 space-y-3">
            {result.strengths.map((strength, index) => (
              <StrengthCard key={`${strength}-${index}`} text={strength} index={index} />
            ))}
          </ul>
        </section>

        <section className="glass rounded-2xl p-6">
          <h3 className="text-xl font-black text-white">Missing Sections</h3>
          <div className="mt-4 space-y-3">
            {result.missingSections.length > 0 ? (
              result.missingSections.map((section, index) => (
                <motion.div
                  key={`${section}-${index}`}
                  className="flex gap-3 rounded-xl border border-red-400/15 bg-red-500/5 p-3 text-sm text-slate-200"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <span>{section}</span>
                </motion.div>
              ))
            ) : (
              <p className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3 text-sm text-emerald-200">No major missing sections found.</p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-10">
        <h3 className="text-2xl font-black text-white">Specific Improvements</h3>
        <div className="mt-5 space-y-4">
          {result.improvements.map((improvement, index) => (
            <ImprovementCard key={`${improvement.section}-${index}`} improvement={improvement} index={index} />
          ))}
        </div>
      </section>

      <section className="glass mt-10 rounded-2xl p-6">
        <h3 className="text-2xl font-black text-white">Keyword Gap Analysis</h3>
        <div className="mt-5">
          <KeywordGapCard gaps={result.keywordGaps} />
        </div>
      </section>

      <section className="glass mt-10 rounded-2xl p-6">
        <h3 className="text-2xl font-black text-white">Weak Verbs</h3>
        <div className="mt-5 space-y-3">
          {result.weakVerbsFound.length > 0 ? (
            result.weakVerbsFound.map((item, index) => <WeakVerbCard key={`${item.verb}-${index}`} item={item} index={index} />)
          ) : (
            <p className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4 text-sm text-emerald-200">No weak verbs found.</p>
          )}
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={copyReport}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-purple-300/40 hover:text-white"
        >
          <ClipboardCopy className="h-4 w-4" />
          Copy Full Report
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-200"
        >
          <FilePlus2 className="h-4 w-4" />
          Analyze Another Resume
        </button>
      </div>
    </section>
  );
}
