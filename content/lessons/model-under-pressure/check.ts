import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Review local results by scanner and lesion size",
        correct: true,
        feedback:
          "An overall percentage can hide poor sensitivity in a clinically important subgroup.",
      },
      {
        id: "shortcut",
        label: "Accept the vendor overall accuracy alone",
        feedback:
          "This leaves the central problem unresolved. An overall percentage can hide poor sensitivity in a clinically important subgroup.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. An overall percentage can hide poor sensitivity in a clinically important subgroup.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "5",
    prompt:
      "A tumor-board image has the right patient but the wrong block. What is the defensible repair?",
    choices: [
      {
        id: "supported",
        label: "Verify the block against the case record",
        correct: true,
        feedback:
          "Patient identity alone cannot establish specimen or block identity. Trace the accession, part and block before linking the slide to the molecular result.",
      },
      {
        id: "shortcut",
        label: "Link by patient name and report date",
        feedback:
          "This leaves the central problem unresolved. Patient identity alone cannot establish specimen or block identity. Trace the accession, part and block before linking the slide to the molecular result.",
      },
      {
        id: "incomplete",
        label: "Retain it because the diagnosis agrees",
        feedback:
          "This does not establish the needed conclusion. Patient identity alone cannot establish specimen or block identity. Trace the accession, part and block before linking the slide to the molecular result.",
      },
    ],
  },
];
