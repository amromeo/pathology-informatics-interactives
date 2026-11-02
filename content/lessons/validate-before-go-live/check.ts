import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A pooled concordance rate is high but one reader has repeated discordances. What is next?",
    choices: [
      {
        id: "supported",
        label: "Look into that reader's cases and why they differ",
        correct: true,
        feedback:
          "Combining readers can hide a problem with one reader or one way of working. Look into the causes, and whether that reader is ready for this use, before clinical approval.",
      },
      {
        id: "shortcut",
        label: "Approve every reader from the pooled rate",
        feedback:
          "The overall rate hides this reader's repeated disagreements. Agreement is judged for each pathologist, not for the group.",
      },
      {
        id: "incomplete",
        label: "Exclude the reader from the denominator",
        feedback:
          "Removing the reader makes the numbers look better without fixing anything. Keep their cases and find out why the readings differed.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "Your department wants to start reporting on screen. What would you look at first?",
    choices: [
      {
        id: "supported",
        label: "The proposed use and the local validation plan",
        correct: true,
        feedback:
          "The validation has to cover the system, the pathologists and the clinical use being approved.",
      },
      {
        id: "shortcut",
        label: "Another hospital's validation, unchanged",
        feedback:
          "Another hospital's study used its own scanners, screens, pathologists and cases. It cannot show how your setup performs.",
      },
      {
        id: "incomplete",
        label: "The scanner manufacturer's approval",
        feedback:
          "The manufacturer's approval covers the device as labeled, not your screens, readers and locations. Start from the proposed use and the local plan.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "19",
    prompt: "A blurred scan is saved again as a lossless file. What does that do to the blur?",
    choices: [
      {
        id: "supported",
        label: "Nothing; the blur stays",
        correct: true,
        feedback:
          "Lossless saving keeps exactly the pixels it is given. It cannot add back detail that was never captured in focus.",
      },
      {
        id: "shortcut",
        label: "Removes it, since nothing is lost",
        feedback:
          "Nothing more is lost, but nothing is gained either. The blur was in the scan before it was saved.",
      },
      {
        id: "incomplete",
        label: "Reduces it, at the cost of a larger file",
        feedback:
          "A bigger file holds the same blurred pixels. Only rescanning in focus can capture the missing detail.",
      },
    ],
  },
];
