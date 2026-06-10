"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LoadingOverlay from "@/components/LoadingOverlay";
import Navbar from "@/components/Navbar";
import ResultsDashboard from "@/components/ResultsDashboard";
import ResumeInputSection from "@/components/ResumeInputSection";
import type { AnalysisResult } from "@/lib/types";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [hasJobDescription, setHasJobDescription] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  async function handleAnalyze(resumeText: string, jobDescription: string) {
    setIsLoading(true);
    setLoadingStep(0);
    setResult(null);
    setHasJobDescription(jobDescription.trim().length > 0);

    timerRef.current = window.setInterval(() => {
      setLoadingStep((current) => Math.min(current + 1, 4));
    }, 1200);

    try {
      const formData = new FormData();
      formData.append("resumeText", resumeText);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = (await response.json()) as AnalysisResult | { message?: string };

      if (!response.ok) {
        throw new Error("message" in data ? data.message : "Analysis failed. Please try again.");
      }

      setResult(data as AnalysisResult);
      window.setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 120);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Analysis failed. Please try again.");
    } finally {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
      setLoadingStep(4);
      setIsLoading(false);
    }
  }

  function resetResults() {
    setResult(null);
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <section id="form">
          <ResumeInputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
        </section>
        <section id="results">
          <ResultsDashboard result={result} isLoading={isLoading} hasJobDescription={hasJobDescription} onReset={resetResults} />
        </section>
      </main>
      <Footer />
      <LoadingOverlay isVisible={isLoading} step={loadingStep} />
    </>
  );
}
