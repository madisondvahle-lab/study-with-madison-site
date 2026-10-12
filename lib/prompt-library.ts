export type PromptCategory = {
  id: string;
  title: string;
  goal: string;
  prompts: { title: string; prompt: string }[];
};

export const promptCategories: PromptCategory[] = [
  {
    id: "clinical-judgment",
    title: "Clinical judgment",
    goal: "Practice noticing what matters and deciding what to do about it.",
    prompts: [
      {
        title: "Recognize important cues",
        prompt:
          "Teach me to recognize important assessment cues for [condition]. Describe a short patient situation with a mix of important and unimportant findings. Ask me which findings matter and why. Don't reveal the answer until I respond.",
      },
      {
        title: "Explain my thinking back to me",
        prompt:
          "I'll describe a patient scenario and what I would do. Ask me what I noticed, what I think is going on, and what I'm most worried about before you comment. Then tell me where my reasoning was strong and where it could be stronger.",
      },
    ],
  },
  {
    id: "prioritization",
    title: "Prioritization",
    goal: "Decide who or what needs attention first, and explain why.",
    prompts: [
      {
        title: "Which patient first?",
        prompt:
          "Give me four short patient descriptions and ask which one needs attention first. Wait for my answer and my reasoning. Then explain the order you would use, and tell me what detail would change it.",
      },
      {
        title: "Change one detail",
        prompt:
          "Give me a prioritization scenario about [topic]. After I answer, change one important detail in the situation and ask me whether my priority changes and why.",
      },
    ],
  },
  {
    id: "pharmacology",
    title: "Pharmacology",
    goal: "Understand how drugs work so side effects and nursing actions make sense.",
    prompts: [
      {
        title: "Mechanism first",
        prompt:
          "Explain how [drug class] works in simple terms. Connect the mechanism to its main side effects and the nursing assessments that matter. Then give me three short situations and ask what would concern me and why.",
      },
      {
        title: "Compare two drug classes",
        prompt:
          "Help me compare [drug class A] and [drug class B]. Ask me what I already know first, then fill gaps with short explanations. Finish by quizzing me on how to tell them apart. Remind me to verify details in a drug reference.",
      },
    ],
  },
  {
    id: "fundamentals",
    title: "Fundamentals",
    goal: "Test your understanding of safety, infection prevention, and basic care.",
    prompts: [
      {
        title: "Safety and infection prevention check",
        prompt:
          "Quiz me on infection prevention and safety, one question at a time. Wait for my answer, explain the reasoning briefly, and make the next question a little harder when I answer correctly.",
      },
      {
        title: "Delegation practice",
        prompt:
          "Give me short scenarios about delegating tasks to different members of the care team. Ask me what can be delegated and what cannot, and why. Wait for my answer before explaining.",
      },
    ],
  },
  {
    id: "ngn-case-studies",
    title: "NGN case studies",
    goal: "Work through an unfolding patient scenario step by step.",
    prompts: [
      {
        title: "Unfolding scenario",
        prompt:
          "Create a three-step unfolding patient scenario about [condition]. At each step, give me new information and ask me what I notice, what it could mean, and what I would do. Don't reveal the best response until I answer.",
      },
      {
        title: "Practice the thinking steps",
        prompt:
          "Walk me through a patient scenario one step at a time: first ask me to list the important cues, then to say what they suggest, then to choose priorities, then to name how I'd know my actions worked. Wait for me at each step.",
      },
    ],
  },
  {
    id: "retakers",
    title: "NCLEX retakers",
    goal: "Find patterns in what you miss and plan from evidence.",
    prompts: [
      {
        title: "Find patterns in missed questions",
        prompt:
          "Here are short notes on practice questions I missed, with my own note on why I think I missed each one: [paste notes]. Group them into patterns, tell me which looks most common and easiest to fix first, and ask me clarifying questions before suggesting a plan.",
      },
      {
        title: "Ask me questions about my CPR",
        prompt:
          "I did not pass the NCLEX. Here are the labels from my Candidate Performance Report, with personal identifiers removed: [paste labels]. Don't tell me my weaknesses yet. Ask me up to eight questions that would help me tell whether each area is a content gap, a reasoning issue, or something else.",
      },
    ],
  },
  {
    id: "study-planning",
    title: "Study planning",
    goal: "Build a schedule you can actually follow.",
    prompts: [
      {
        title: "Weekly plan around weak areas",
        prompt:
          "I have [number] weeks until my exam, about [number] hours on weekdays and [number] on weekends. My weakest areas are [list]. Build a weekly schedule that rotates content review, practice questions, and review of missed questions. Include one lighter day and tell me what to cut first if I fall behind.",
      },
      {
        title: "Stress-test my plan",
        prompt:
          "Here is my study plan: [paste plan]. What assumptions does it make that might not be true for me? Which parts might be unrealistic? Ask me three questions that could change it.",
      },
    ],
  },
  {
    id: "active-recall",
    title: "Active recall",
    goal: "Quiz yourself without being handed the answers.",
    prompts: [
      {
        title: "One question at a time",
        prompt:
          "Quiz me on [topic], one question at a time. Wait for my answer before telling me whether I'm right. Then explain the reasoning in two or three sentences and ask a harder follow-up.",
      },
      {
        title: "Explain it back",
        prompt:
          "I'm going to explain [topic] in my own words. Listen, then tell me what I explained well, what I left out, and anything that may be inaccurate for me to verify. Ask me one question that tests whether I really understand it.",
      },
    ],
  },
  {
    id: "nursing-school",
    title: "Nursing school",
    goal: "Turn lecture notes into an interactive study session.",
    prompts: [
      {
        title: "Notes into a quiz",
        prompt:
          "Here are my notes on [topic], in my own words: [paste notes]. List anything that looks incomplete or possibly inaccurate as questions for me to verify. Then quiz me from the notes, mixing recall questions with what-would-you-do questions.",
      },
      {
        title: "Connect the dots",
        prompt:
          "Help me connect [topic A] to [topic B]. Ask me how I think they relate first, then fill in gaps with a short explanation and a patient example. Finish with two questions that make me apply the connection.",
      },
    ],
  },
];
