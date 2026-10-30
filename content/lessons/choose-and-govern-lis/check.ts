import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "At a blood bank system demonstration, everyone likes the screens, but a crossmatch result never reaches the chart. What should the committee do?",
    choices: [
      {
        id: "supported",
        label: "Hold the vendor until the fix is retested",
        correct: true,
        feedback:
          "A result that never reaches the chart is a patient-safety failure. Good screens cannot make up for it; the vendor has to fix it and show the fix working.",
      },
      {
        id: "shortcut",
        label: "Count it as one point in the overall score",
        feedback:
          "Averaging hides the failure. The vendor could lose a point here and still come out on top, even though the crossmatch never reaches the chart.",
      },
      {
        id: "incomplete",
        label: "Accept the vendor's plan to fix it after go-live",
        feedback:
          "A plan is not a fix. Until someone sees the corrected version deliver the result to the chart, the requirement has not been met.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your laboratory is about to replace its anatomic pathology system. What should the committee settle before the first vendor demonstration?",
    choices: [
      {
        id: "supported",
        label: "Which tasks are must-haves, and who decides",
        correct: true,
        feedback:
          "If the committee agrees on its must-haves, and who has the final say, before any demonstration, a polished presentation cannot quietly rewrite the list.",
      },
      {
        id: "shortcut",
        label: "Which vendor has the longest feature list",
        feedback:
          "A long feature list says nothing about whether the system handles your own work, such as amended reports or block and slide tracking.",
      },
      {
        id: "incomplete",
        label: "How the vendors' prices compare",
        feedback:
          "Price matters, but looking at it first tempts the committee to excuse a missing must-have in a cheaper system.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "22",
    prompt:
      "A new test's result reaches the chart, but its reference interval is missing. Can the test go live?",
    choices: [
      {
        id: "supported",
        label: "Not yet; fix the build and retest",
        correct: true,
        feedback:
          "The number arrived, but the report is incomplete without its reference interval. Correct the build, then rerun the affected cases and some that should be unchanged before the director approves it.",
      },
      {
        id: "shortcut",
        label: "Yes; the number itself came through",
        feedback:
          "Clinicians need the interval to read the number. A result that arrives without it is not the report the laboratory approved.",
      },
      {
        id: "incomplete",
        label: "Yes, once the interval is removed from the LIS too",
        feedback:
          "That makes the two systems match by making both wrong. The interval belongs on the report, so the fix is in the build.",
      },
    ],
  },
];
