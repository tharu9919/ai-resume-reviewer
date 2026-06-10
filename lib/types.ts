export interface CriterionResult {
  id: string;
  name: string;
  score: number;
  feedback: string;
}

export interface WeakVerbFound {
  verb: string;
  context: string;
  suggestions: string[];
}

export interface Improvement {
  section: string;
  issue: string;
  before: string;
  after: string;
}

export interface KeywordGap {
  keyword: string;
  importance: "high" | "medium" | "low";
  suggestion: string;
}

export interface AnalysisResult {
  resumeScore: number;
  jobMatchScore: number;
  overallScore: number;
  atsScore: number;
  criteria: CriterionResult[];
  strengths: string[];
  missingSections: string[];
  improvements: Improvement[];
  weakVerbsFound: WeakVerbFound[];
  keywordGaps: KeywordGap[];
  overallFeedback: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  score_1: string;
  score_3: string;
  score_5: string;
  weight: number;
}

export interface WeakVerbRule {
  weak: string;
  strong: string[];
  category: "collaboration" | "development" | "leadership" | "analysis" | "communication" | "delivery";
}
