export type BlogCategoryId = "retake" | "clinical" | "planning" | "exam" | "ai" | "strategy";

export type BlogCategory = {
  id: BlogCategoryId;
  label: string;
  tone: "peach" | "sage" | "cream" | "ink";
};

export const blogCategories: BlogCategory[] = [
  { id: "retake", label: "Retakes & results", tone: "peach" },
  { id: "strategy", label: "NCLEX strategy", tone: "cream" },
  { id: "clinical", label: "Clinical judgment", tone: "sage" },
  { id: "planning", label: "Study planning", tone: "cream" },
  { id: "exam", label: "Exam day & logistics", tone: "sage" },
  { id: "ai", label: "AI study tools", tone: "ink" },
];

const categoryBySlug: Record<string, BlogCategoryId> = {
  "why-do-i-keep-failing-the-nclex": "retake",
  "how-to-read-nclex-cpr-report": "retake",
  "failed-nclex-at-85-questions": "retake",
  "failed-nclex-what-to-do-next": "retake",
  "failed-nclex-use-ai-to-find-weaknesses": "retake",
  "nclex-stuck-between-two-answers": "clinical",
  "ngn-case-study-step-by-step": "clinical",
  "uworld-vs-archer-vs-bootcamp": "planning",
  "nclex-flexible-weekly-study-plan": "planning",
  "nclex-registration-scheduling-checklist": "exam",
  "nclex-test-day-guide": "exam",
  "using-the-nclex-test-plan": "exam",
  "how-to-use-chatgpt-to-study-for-the-nclex": "ai",
  "stop-asking-ai-for-nclex-questions": "ai",
  "nclex-study-strategy": "strategy",
};

const keywordRules: [RegExp, BlogCategoryId][] = [
  [/\b(ai|chatgpt|gemini|prompt)\b/i, "ai"],
  [/fail|retake|cpr|unsuccessful|85 questions/i, "retake"],
  [/ngn|judgment|case study|prioriti/i, "clinical"],
  [/test day|register|schedul|bulletin|test plan/i, "exam"],
  [/plan|resource|uworld|archer|bootcamp/i, "planning"],
];

export function categorizePost(post: { slug: string; title: string }): BlogCategory {
  const id =
    categoryBySlug[post.slug] ??
    keywordRules.find(([pattern]) => pattern.test(`${post.slug} ${post.title}`))?.[1] ??
    "strategy";
  return blogCategories.find((category) => category.id === id) ?? blogCategories[1];
}
