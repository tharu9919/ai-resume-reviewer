export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#05050c]">
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>AI Resume Reviewer - Powered by Gemini AI</p>
        <p>© 2025 AI Resume Reviewer. Open source.</p>
      </div>
    </footer>
  );
}
