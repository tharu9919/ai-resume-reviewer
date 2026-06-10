import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getScoreColor(score: number, max: number): string {
  const ratio = max > 0 ? score / max : 0;
  if (ratio < 0.4) return "text-red-400";
  if (ratio <= 0.7) return "text-yellow-400";
  return "text-emerald-400";
}

export function getScoreGradient(score: number, max: number): string {
  const ratio = max > 0 ? score / max : 0;
  if (ratio < 0.4) return "linear-gradient(135deg, #ef4444, #f97316)";
  if (ratio <= 0.7) return "linear-gradient(135deg, #f97316, #eab308)";
  return "linear-gradient(135deg, #eab308, #10b981)";
}

export function formatPercent(score: number, max: number): string {
  if (max <= 0) return "0%";
  return `${Math.round((score / max) * 100)}%`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}...`;
}
