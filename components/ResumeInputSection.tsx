"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn, countWords } from "@/lib/utils";
import FileUploader from "./FileUploader";
import JobDescriptionInput from "./JobDescriptionInput";

interface ResumeInputSectionProps {
  onAnalyze: (resumeText: string, jobDescription: string) => void;
  isLoading: boolean;
}

const sampleResume = `Sarah Chen | sarah.chen@email.com | linkedin.com/in/sarahchen | github.com/sarahchen | Seattle, WA

PROFESSIONAL SUMMARY
Full-stack engineer with 5 years of experience building React and Node.js applications. Helped teams deliver products and worked on various features across the stack. Responsible for maintaining existing codebases and participated in code reviews.

SKILLS
JavaScript, TypeScript, React, Node.js, PostgreSQL, AWS, Docker, Git

WORK EXPERIENCE
Software Engineer | TechCorp | 2021-Present
- Helped build customer dashboard using React
- Worked on backend API endpoints
- Assisted with database migrations
- Was responsible for fixing production bugs
- Participated in sprint planning

Junior Developer | StartupXYZ | 2019-2021
- Made responsive landing pages
- Did unit testing for components
- Helped with deployment scripts

EDUCATION
B.S. Computer Science | University of Washington | 2019`;

export default function ResumeInputSection({ onAnalyze, isLoading }: ResumeInputSectionProps) {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const words = countWords(resumeText);
  const canAnalyze = resumeText.trim().length > 0 && !isLoading;

  function handleExtracted(text: string, name: string) {
    setFileName(name);
    setResumeText(text);
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-20">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-300">Resume analysis</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Upload or paste your resume</h2>
      </div>

      <div className="glass rounded-3xl p-5 sm:p-7">
        <FileUploader onTextExtracted={handleExtracted} isLoading={isLoading} />

        <div className="my-7 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <textarea
          value={resumeText}
          onChange={(event) => setResumeText(event.target.value)}
          disabled={isLoading}
          className="min-h-72 w-full resize-y rounded-2xl border border-white/10 bg-[#080812] p-5 text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-300/50"
          placeholder="Paste your resume text here..."
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>{fileName ? `Extracted from ${fileName}` : "Pasted text is analyzed exactly as entered."}</span>
          <span className={cn("font-semibold", words >= 50 ? "text-emerald-300" : "text-slate-500")}>
            {resumeText.length.toLocaleString()} chars - {words} words
          </span>
        </div>

        <JobDescriptionInput value={jobDescription} onChange={setJobDescription} disabled={isLoading} />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setResumeText(sampleResume)}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-purple-300/40 hover:text-white disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4 text-purple-300" />
            Try Sample Resume
          </button>
          <motion.button
            type="button"
            onClick={() => onAnalyze(resumeText, jobDescription)}
            disabled={!canAnalyze}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3 text-sm font-black text-white shadow-glow-md transition disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={canAnalyze ? { scale: 1.02 } : undefined}
            whileTap={canAnalyze ? { scale: 0.98 } : undefined}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            Analyze Resume
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
