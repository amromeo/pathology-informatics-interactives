import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Inspect the accession-to-block linkage",
        correct: true,
        feedback:
          "Test the identities connecting each modality before treating combined records as a single clinical dataset.",
      },
      {
        id: "shortcut",
        label: "Compare only total archive capacity",
        feedback:
          "This leaves the central problem unresolved. Test the identities connecting each modality before treating combined records as a single clinical dataset.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Test the identities connecting each modality before treating combined records as a single clinical dataset.",
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
