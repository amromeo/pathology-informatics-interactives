import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A cytology image model misses abnormal cells from the first local test on a new scanner. What does this suggest?",
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
      "Your department wants to try the metastasis detector on both local scanners. What would you ask to see before agreeing?",
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
      "A tumor-board image has the right patient but the wrong block. How should you repair the link?",
    choices: [
      {
        id: "supported",
        label: "Verify the block against the case record",
        correct: true,
        feedback:
          "Trace the accession, part and block in the case record. Link the slide to the molecular result only after confirming which block was tested.",
      },
      {
        id: "shortcut",
        label: "Link by patient name and report date",
        feedback:
          "The patient may have several specimens and blocks from the same date. Name and date alone can still link the image to the wrong tissue.",
      },
      {
        id: "incomplete",
        label: "Keep it because the diagnosis agrees",
        feedback:
          "Two blocks can have the same diagnosis. Matching diagnoses does not show that this image comes from the block used for molecular testing.",
      },
    ],
  },
];
