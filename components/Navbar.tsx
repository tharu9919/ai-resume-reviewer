"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={cn("fixed inset-x-0 top-0 z-50 border-b border-white/8 transition", scrolled ? "bg-[#04040a]/80 shadow-glow-sm backdrop-blur-xl" : "bg-transparent")}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2" aria-label="AI Resume Reviewer home">
          <span className="gradient-text text-xl font-black">AI Resume</span>
          <span className="rounded-full bg-purple-500/18 px-2 py-0.5 text-xs font-black text-purple-200">AI</span>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-purple-300/50 hover:text-white sm:flex"
        >
          GitHub <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.nav>
  );
}
