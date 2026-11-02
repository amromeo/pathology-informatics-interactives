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
        label: "Investigate that reader and the cases",
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
        label: "This lesson's approval decision",
        feedback:
          "This case approved one narrow use on one tested setup. Your proposed uses need their own evidence.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "19",
    prompt:
      "Doubling both image dimensions at the same channels and bit depth does what to uncompressed pixels?",
    choices: [
      {
        id: "supported",
        label: "Multiplies the count by four",
        correct: true,
        feedback:
          "Width and height both double, so the number of pixels goes up four times. Compression, pyramid levels and file overhead change the stored size separately.",
      },
      {
        id: "shortcut",
        label: "Doubles the count",
        feedback:
          "Doubling only one dimension would double the count. Doubling both multiplies width by height twice over: 2 × 2 = 4 times as many pixels.",
      },
      {
        id: "incomplete",
        label: "Leaves the count unchanged",
        feedback:
          "A larger grid always holds more pixels. With both dimensions doubled, the count goes up four times.",
      },
    ],
  },
];
