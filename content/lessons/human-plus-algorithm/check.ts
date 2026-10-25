import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt: "A detector misses unmarked mitoses. What does reviewing marked candidates alone miss?",
    choices: [
      {
        id: "supported",
        label: "False negatives outside the marked areas",
        correct: true,
        feedback:
          "Candidate-only review cannot measure a complete search. Assess the human-plus-tool workflow against an independent reference, including unmarked areas.",
      },
      {
        id: "shortcut",
        label: "The time spent checking marked candidates",
        feedback:
          "This leaves the central problem unresolved. Candidate-only review cannot measure a complete search. Assess the human-plus-tool workflow against an independent reference, including unmarked areas.",
      },
      {
        id: "incomplete",
        label: "The number of false marks displayed",
        feedback:
          "This does not establish the needed conclusion. Candidate-only review cannot measure a complete search. Assess the human-plus-tool workflow against an independent reference, including unmarked areas.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Review the complete reader-study design",
        correct: true,
        feedback:
          "Identify distinct slides, reference figures, review conditions and washout before interpreting pooled performance.",
      },
      {
        id: "shortcut",
        label: "Use candidate precision as clinical sensitivity",
        feedback:
          "This leaves the central problem unresolved. Identify distinct slides, reference figures, review conditions and washout before interpreting pooled performance.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Identify distinct slides, reference figures, review conditions and washout before interpreting pooled performance.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "6",
    prompt:
      "An image model performs poorly on a new scanner from the first local evaluation. What does this suggest?",
    choices: [
      {
        id: "supported",
        label: "A generalizability problem",
        correct: true,
        feedback:
          "The model did not transfer well to a new setting. Drift describes a change over time after a baseline has been established.",
      },
      {
        id: "shortcut",
        label: "A proven change over time",
        feedback:
          "This leaves the central problem unresolved. The model did not transfer well to a new setting. Drift describes a change over time after a baseline has been established.",
      },
      {
        id: "incomplete",
        label: "A rise in disease prevalence alone",
        feedback:
          "This does not establish the needed conclusion. The model did not transfer well to a new setting. Drift describes a change over time after a baseline has been established.",
      },
    ],
  },
];
