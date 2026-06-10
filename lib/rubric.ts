import type { RubricCriterion } from "./types";

export const rubric: RubricCriterion[] = [
  {
    id: "contact_info",
    name: "Contact Information",
    description: "Evaluates whether the resume includes clear, professional, and reachable contact details.",
    score_1: "Missing essential contact details, uses unprofessional contact information, or makes it difficult for a recruiter to identify location or online profiles.",
    score_3: "Includes basic contact details such as name and email, but may be missing LinkedIn, portfolio links, location, or consistent formatting.",
    score_5: "Provides complete, polished contact information with professional email, location, LinkedIn or portfolio, and clear placement at the top.",
    weight: 1
  },
  {
    id: "professional_summary",
    name: "Professional Summary",
    description: "Assesses whether the opening summary quickly communicates role, experience, strengths, and target value.",
    score_1: "No summary is present, or it is vague, generic, and disconnected from the candidate's target roles.",
    score_3: "Summary gives a reasonable overview but lacks measurable impact, role clarity, or distinctive technical and domain strengths.",
    score_5: "Concise summary names the target role, years of experience, core strengths, domain context, and business impact.",
    weight: 1
  },
  {
    id: "skills",
    name: "Skills Section",
    description: "Measures relevance, readability, and coverage of technical, domain, and tool skills.",
    score_1: "Skills are absent, outdated, overly broad, or mixed into prose in a way ATS systems may not parse well.",
    score_3: "Skills section is present and readable but may lack grouping, prioritization, or alignment with the target job.",
    score_5: "Skills are specific, current, grouped logically, and closely aligned with the candidate's experience and target role.",
    weight: 1
  },
  {
    id: "work_experience",
    name: "Work Experience Quality",
    description: "Evaluates clarity, relevance, action orientation, and accomplishment framing in professional experience.",
    score_1: "Experience reads like a task list, has vague bullets, missing dates or titles, or little evidence of ownership.",
    score_3: "Experience is understandable and mostly relevant, but several bullets focus on duties instead of outcomes.",
    score_5: "Experience is well structured with strong action verbs, clear ownership, relevant scope, and achievement-focused bullets.",
    weight: 1
  },
  {
    id: "education",
    name: "Education Details",
    description: "Checks whether education is complete, appropriately placed, and relevant for the candidate's career stage.",
    score_1: "Education is missing, unclear, or lacks institution, credential, field, or completion information.",
    score_3: "Education details are present but may include unnecessary details or inconsistent formatting.",
    score_5: "Education is complete, concise, well formatted, and includes relevant honors, coursework, or certifications only when useful.",
    weight: 1
  },
  {
    id: "projects",
    name: "Projects Section",
    description: "Assesses whether projects demonstrate applied skills, scope, outcomes, and links where appropriate.",
    score_1: "Projects are missing or listed without context, technologies, personal contribution, or results.",
    score_3: "Projects show useful experience but may lack metrics, architecture detail, links, or direct relevance.",
    score_5: "Projects are relevant, outcome-oriented, technically specific, and include links or measurable impact where possible.",
    weight: 1
  },
  {
    id: "quantified_achievements",
    name: "Quantified Results",
    description: "Measures the use of numbers, scale, frequency, savings, growth, quality improvements, or performance metrics.",
    score_1: "Few or no measurable outcomes are included, making impact difficult to evaluate.",
    score_3: "Some bullets include numbers, but metrics are inconsistent or not connected to business or technical outcomes.",
    score_5: "Most relevant bullets include credible metrics that clarify scope, impact, efficiency, revenue, reliability, or quality.",
    weight: 1
  },
  {
    id: "grammar",
    name: "Grammar and Spelling",
    description: "Reviews spelling, grammar, punctuation, capitalization, and professional wording.",
    score_1: "Multiple errors, awkward phrasing, inconsistent tense, or typos reduce professionalism.",
    score_3: "Mostly readable with minor grammar, punctuation, tense, or capitalization inconsistencies.",
    score_5: "Clean, concise, polished writing with consistent tense and professional grammar throughout.",
    weight: 1
  },
  {
    id: "formatting",
    name: "Consistent Formatting",
    description: "Evaluates visual hierarchy, bullet consistency, section organization, spacing, and ATS-friendly structure.",
    score_1: "Formatting is hard to scan, inconsistent, overly decorative, or likely to confuse ATS parsing.",
    score_3: "Resume is generally readable but has spacing, section, bullet, or alignment inconsistencies.",
    score_5: "Formatting is clean, consistent, ATS-friendly, and easy to scan quickly across all sections.",
    weight: 1
  },
  {
    id: "length",
    name: "Resume Length",
    description: "Checks whether the resume is concise while containing enough substance; 400 to 800 words is ideal.",
    score_1: "Resume is far too short to prove qualifications or too long and unfocused for quick recruiter review.",
    score_3: "Length is workable but could be tighter, richer, or better balanced across sections.",
    score_5: "Resume fits the ideal range, prioritizes high-value details, and avoids filler or excessive compression.",
    weight: 1
  }
];
