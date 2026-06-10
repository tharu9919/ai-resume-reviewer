"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useId } from "react";

interface ScoreRingProps {
  score: number;
  maxScore: number;
  label: string;
  size?: number;
  delay?: number;
}

export default function ScoreRing({ score, maxScore, label, size = 170, delay = 0 }: ScoreRingProps) {
  const id = useId().replace(/:/g, "");
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = maxScore > 0 ? Math.min(score / maxScore, 1) : 0;
  const animatedScore = useMotionValue(0);
  const springScore = useSpring(animatedScore, { stiffness: 80, damping: 20 });
  const displayScore = useTransform(springScore, (value) => Math.round(value));
  const colors =
    progress < 0.4
      ? ["#ef4444", "#f97316"]
      : progress <= 0.7
        ? ["#f97316", "#eab308"]
        : ["#eab308", "#10b981"];

  useEffect(() => {
    const timer = window.setTimeout(() => animatedScore.set(score), delay * 1000);
    return () => window.clearTimeout(timer);
  }, [animatedScore, delay, score]);

  return (
    <motion.div
      className="glass flex min-w-0 flex-col items-center rounded-2xl p-5 text-center"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-4 rounded-full blur-2xl"
          style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, opacity: 0.25 }}
        />
        <svg width={size} height={size} className="relative -rotate-90">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${id})`}
            strokeLinecap="round"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - progress) }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="text-4xl font-black tracking-normal text-white">{displayScore}</motion.span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">/{maxScore}</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-200">{label}</p>
      <p className="mt-1 text-xs text-slate-500">
        {score}/{maxScore}
      </p>
    </motion.div>
  );
}
