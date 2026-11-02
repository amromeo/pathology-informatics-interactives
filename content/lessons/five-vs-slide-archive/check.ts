import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your hospital is about to combine slide images with molecular results in one view. What would you check first?",
    choices: [
      {
        id: "supported",
        label: "How each image is linked to its block",
        correct: true,
        feedback:
          "Start with the links. If an image cannot be traced from accession to part to block, nothing built on top of it can be trusted.",
      },
      {
        id: "shortcut",
        label: "Whether the archive has enough storage",
        feedback:
          "Storage matters, but enough of it will not stop a slide being linked to the wrong block. Check how the records are linked first.",
      },
      {
        id: "incomplete",
        label: "Whether the vendor has used this view elsewhere",
        feedback:
          "Another hospital's experience does not tell you how your own images, blocks and molecular reports are linked. Check those links in your own records.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "3",
    prompt:
      "An export for a turnaround study has 512 rows, but the LIS shows 498 eligible accessions. What do you do before analyzing it?",
    choices: [
      {
        id: "supported",
        label: "Find out what the extra 14 rows are",
        correct: true,
        feedback:
          "The extra rows may be duplicates, amended reports counted twice or cases outside the study. Until you know, you cannot tell what the averages describe.",
      },
      {
        id: "shortcut",
        label: "Analyze all 512, since more data is better",
        feedback:
          "More rows are only better if they are the right ones. Duplicates or ineligible cases would change the results without anyone knowing.",
      },
      {
        id: "incomplete",
        label: "Drop the last 14 rows so the counts match",
        feedback:
          "Matching the count does not mean you removed the right rows. Find out what the extra rows are first.",
      },
    ],
  },
];
