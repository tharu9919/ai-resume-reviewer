import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        purple: "var(--purple)",
        blue: "var(--blue)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "pulse-glow 2.8s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        scan: "scan-line 2.4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 7s ease infinite"
      },
      boxShadow: {
        "glow-sm": "0 0 14px rgba(124, 58, 237, 0.25)",
        "glow-md": "0 0 28px rgba(124, 58, 237, 0.32)",
        "glow-lg": "0 0 46px rgba(37, 99, 235, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
