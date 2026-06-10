# AI Resume Reviewer

AI-powered resume reviewer and job match analyzer built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Gemini.

## Features

- Upload PDF, DOCX, or TXT resumes
- Paste resume text directly
- Add an optional job description for match scoring
- 10-criteria rubric scoring
- Keyword gap analysis
- ATS compatibility score
- Weak verb detection and stronger replacements
- Before/after improvement examples

## Setup

```bash
npm install
npm run dev
```

Create `.env.local` and add:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a Gemini API key from Google AI Studio: https://aistudio.google.com/app/apikey

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push the project to GitHub.
2. Import the repository on Vercel.
3. Add `GEMINI_API_KEY` in Project Settings > Environment Variables.
4. Deploy.

## GitHub Push

```bash
git init
git add .
git commit -m "Build AI Resume Reviewer"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
