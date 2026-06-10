import type { RubricCriterion, WeakVerbRule } from "./types";

export function buildAnalysisPrompt(
  resumeText: string,
  jobDescription: string,
  rubric: RubricCriterion[],
  weakVerbs: WeakVerbRule[]
): string {
  const hasJobDescription = jobDescription.trim().length > 0;

  return `
You are an expert resume reviewer, ATS analyst, recruiter, and career coach.

Analyze the resume using the rubric and weak verb list below. Score every rubric criterion from 1 to 5 based on the provided definitions.

Rules:
1. Calculate resumeScore as the sum of the 10 criteria scores. The maximum is 50.
2. Calculate jobMatchScore from 0 to 50 based on keyword match, role relevance, skills alignment, and tailoring. If no job description is provided, set jobMatchScore to 0.
3. Calculate overallScore as resumeScore + jobMatchScore. If no job description is provided, overallScore should equal resumeScore.
4. Calculate atsScore from 0 to 100 based on ATS-friendly structure, standard headings, parseable wording, keyword clarity, and formatting risk.
5. Find all weak verbs from the provided weak verb list that appear in the resume, including short context and stronger replacements.
6. Provide specific before/after improvement examples using real text from the resume whenever possible. If exact text is unavailable for a missing idea, write "Not present in resume" as before.
7. If a job description is provided, find keyword gaps between the job description and resume. If no job description is provided, return an empty keywordGaps array.
8. Return ONLY valid JSON. No markdown, no backticks, no explanation, no trailing comments.
9. Use exactly the JSON schema shown below. Ensure all arrays are present, even when empty.
10. Keep feedback concise, specific, and actionable.
11. Keep strengths to exactly 5 items, improvements to 3-5 items, keywordGaps to at most 8 items, and weakVerbsFound to at most 10 items.

JSON schema:
{
  "resumeScore": number,
  "jobMatchScore": number,
  "overallScore": number,
  "atsScore": number,
  "criteria": [{ "id": string, "name": string, "score": number, "feedback": string }],
  "strengths": string[],
  "missingSections": string[],
  "improvements": [{ "section": string, "issue": string, "before": string, "after": string }],
  "weakVerbsFound": [{ "verb": string, "context": string, "suggestions": string[] }],
  "keywordGaps": [{ "keyword": string, "importance": "high"|"medium"|"low", "suggestion": string }],
  "overallFeedback": string
}

Rubric:
${JSON.stringify(rubric, null, 2)}

Weak verbs:
${JSON.stringify(weakVerbs, null, 2)}

Job description provided: ${hasJobDescription ? "yes" : "no"}

Resume:
${resumeText}

Job Description:
${hasJobDescription ? jobDescription : "No job description provided."}
`.trim();
}

export const analysisSystemInstruction =
  "You are AI Resume Reviewer, a strict resume scoring engine. Return only valid JSON matching the requested schema.";
