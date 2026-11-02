import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
        label: "Doubles the number of pixels",
        feedback:
          "Doubling only one dimension would double the count. Doubling both multiplies width by height twice over: 2 × 2 = 4 times as many pixels.",
      },
      {
        id: "incomplete",
        label: "Leaves the number of pixels unchanged",
        feedback:
          "A larger grid always holds more pixels. With both dimensions doubled, the count goes up four times.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "Your hospital wants to cut image storage costs. What would you check first?",
    choices: [
      {
        id: "supported",
        label: "Check the intended viewing task",
        correct: true,
        feedback:
          "Find out what detail pathologists need, and how quickly images must open, before choosing scan and storage settings.",
      },
      {
        id: "shortcut",
        label: "Choose the smallest file regardless of detail",
        feedback:
          "The smallest file may lose detail pathologists need. Start from what they have to see, then look for savings that keep it.",
      },
      {
        id: "incomplete",
        label: "Ask the vendor for its usual compression",
        feedback:
          "The vendor's usual setting may not keep what your pathologists need to see. Start from what they have to see.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "5",
    prompt:
      "A slide image's label reads block B2, but the archive links it to B1. Which do you trust?",
    choices: [
      {
        id: "supported",
        label: "Check both against the case record",
        correct: true,
        feedback:
          "Either could be wrong. The scanner log, the label and the case record together show which block the slide came from.",
      },
      {
        id: "shortcut",
        label: "The archive link, since the LIS made it",
        feedback:
          "Links made by software can be wrong, as when an image is attached to the wrong block. Check both against the case record.",
      },
      {
        id: "incomplete",
        label: "The label, and change the archive link now",
        feedback:
          "The label is good evidence, but changing the link before checking the case record risks a second mistake. Check first.",
      },
    ],
  },
];
