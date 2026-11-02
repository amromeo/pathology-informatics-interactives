import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A program trained to find abnormal cells in slide images misses them from the first local test on a new scanner. What does this suggest?",
    choices: [
      {
        id: "supported",
        label: "A generalizability problem",
        correct: true,
        feedback:
          "The model performed poorly as soon as it was tried in the new laboratory. That is a problem with how well it carries over to another setting.",
      },
      {
        id: "shortcut",
        label: "A proven change over time",
        feedback:
          "There is no earlier local result showing better detection. To call this a later change, you would need to compare results from different times.",
      },
      {
        id: "incomplete",
        label: "A rise in disease prevalence alone",
        feedback:
          "The question concerns misses among slides already known to contain abnormal cells. A different proportion of positive patients does not explain those misses by itself.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your department wants to try the metastasis-detection model on both local scanners. What would you ask to see before agreeing?",
    choices: [
      {
        id: "supported",
        label: "Local detection results separated by scanner and lesion size",
        correct: true,
        feedback:
          "Compare each scanner and the small lesions separately. One good result can hide another group's misses when all the slides are pooled.",
      },
      {
        id: "shortcut",
        label: "Only the vendor's overall detection rate",
        feedback:
          "The vendor tested its own scanner and slides. That percentage does not show how many small lesions the model misses on either of your scanners.",
      },
      {
        id: "incomplete",
        label: "The same start date and review plan used by another hospital",
        feedback:
          "The other hospital may use different scanners and staining methods. Your pathologists need to review detection on local slides before setting a start date.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "5",
    prompt:
      "A PD-L1 result from the same patient's 2024 colon specimen shows up in today's lung case view. What should happen?",
    choices: [
      {
        id: "supported",
        label: "Keep it as history, not as today's result",
        correct: true,
        feedback:
          "It belongs to the patient but not to the lung specimen being discussed. Keep it in the patient's history and find the result for the current specimen.",
      },
      {
        id: "shortcut",
        label: "Use it, since it is the same patient",
        feedback:
          "The same patient does not mean the same tumor. A colon result from 2024 says nothing about today's lung specimen.",
      },
      {
        id: "incomplete",
        label: "Delete it from the patient's record",
        feedback:
          "The result is real and belongs in the patient's history. The problem is that it is linked to the wrong specimen in this view.",
      },
    ],
  },
];
