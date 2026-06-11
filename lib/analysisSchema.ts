export const analysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "resumeScore",
    "jobMatchScore",
    "overallScore",
    "atsScore",
    "criteria",
    "strengths",
    "missingSections",
    "improvements",
    "weakVerbsFound",
    "keywordGaps",
    "overallFeedback"
  ],
  properties: {
    resumeScore: { type: "number", minimum: 0, maximum: 50 },
    jobMatchScore: { type: "number", minimum: 0, maximum: 50 },
    overallScore: { type: "number", minimum: 0, maximum: 100 },
    atsScore: { type: "number", minimum: 0, maximum: 100 },
    criteria: {
      type: "array",
      minItems: 10,
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name", "score", "feedback"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          score: { type: "number", minimum: 1, maximum: 5 },
          feedback: { type: "string" }
        }
      }
    },
    strengths: { type: "array", minItems: 0, maxItems: 5, items: { type: "string" } },
    missingSections: { type: "array", items: { type: "string" } },
    improvements: {
      type: "array",
      minItems: 0,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["section", "issue", "before", "after"],
        properties: {
          section: { type: "string" },
          issue: { type: "string" },
          before: { type: "string" },
          after: { type: "string" }
        }
      }
    },
    weakVerbsFound: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["verb", "context", "suggestions"],
        properties: {
          verb: { type: "string" },
          context: { type: "string" },
          suggestions: { type: "array", items: { type: "string" } }
        }
      }
    },
    keywordGaps: {
      type: "array",
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["keyword", "importance", "suggestion"],
        properties: {
          keyword: { type: "string" },
          importance: { type: "string", enum: ["high", "medium", "low"] },
          suggestion: { type: "string" }
        }
      }
    },
    overallFeedback: { type: "string" }
  }
} as const;
