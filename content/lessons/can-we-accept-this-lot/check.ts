import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A paired reagent comparison has p < 0.001 but its entire confidence interval lies inside the approved limit. What follows?",
    choices: [
      {
        id: "supported",
        label: "Review all acceptance criteria",
        correct: true,
        feedback:
          "A small p-value is evidence against zero mean difference. It does not by itself make a medically acceptable difference unacceptable; other protocol criteria still apply.",
      },
      {
        id: "shortcut",
        label: "Reject because p is below 0.05",
        feedback:
          "This leaves the central problem unresolved. A small p-value is evidence against zero mean difference. It does not by itself make a medically acceptable difference unacceptable; other protocol criteria still apply.",
      },
      {
        id: "incomplete",
        label: "Accept without reviewing other ranges",
        feedback:
          "This does not establish the needed conclusion. A small p-value is evidence against zero mean difference. It does not by itself make a medically acceptable difference unacceptable; other protocol criteria still apply.",
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
        label: "Read the approved acceptance protocol",
        correct: true,
        feedback:
          "The clinical limit must be set before inspecting the study result; selecting it afterwards can rationalize an unacceptable lot.",
      },
      {
        id: "shortcut",
        label: "Choose a limit that fits the observed mean",
        feedback:
          "This leaves the central problem unresolved. The clinical limit must be set before inspecting the study result; selecting it afterwards can rationalize an unacceptable lot.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. The clinical limit must be set before inspecting the study result; selecting it afterwards can rationalize an unacceptable lot.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "3",
    prompt:
      "A chemistry turnaround report excludes orders without a collection time. What should its summary disclose?",
    choices: [
      {
        id: "supported",
        label: "The excluded count and missing field",
        correct: true,
        feedback:
          "The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
      {
        id: "shortcut",
        label: "Only the mean of complete records",
        feedback:
          "This leaves the central problem unresolved. The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
      {
        id: "incomplete",
        label: "Only the total number of final results",
        feedback:
          "This does not establish the needed conclusion. The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
    ],
  },
];
