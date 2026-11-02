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
        label: "Use this lesson's storage estimate",
        feedback:
          "The estimate here rests on assumed slide sizes, volumes and compression. Measure your own files and needs before planning storage.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "5",
    prompt:
      "A tumor-board image has the right patient but the wrong block. What should happen before it is shown?",
    choices: [
      {
        id: "supported",
        label: "Check the block against the case record",
        correct: true,
        feedback:
          "The right patient does not mean the right specimen or block. Trace the accession, part and block before linking the slide to the molecular result.",
      },
      {
        id: "shortcut",
        label: "Link by patient name and report date",
        feedback:
          "A name and a date can match several specimens from the same patient. Trace the accession, part and block before linking the slide to the molecular result.",
      },
      {
        id: "incomplete",
        label: "Keep it, because the diagnosis agrees",
        feedback:
          "Two specimens from the same patient can share a diagnosis. Agreement does not show that this slide came from this block, so trace the accession, part and block first.",
      },
    ],
  },
];
