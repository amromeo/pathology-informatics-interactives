import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "An initial troponin has no prior result. Does the serial-order delta rule decide its release?",
    choices: [
      {
        id: "supported",
        label: "No; use the initial-order rule",
        correct: true,
        feedback:
          "This lesson scopes its delta rule to serial orders. Initial orders use a separate release process with no delta check; other safety checks still apply.",
      },
      {
        id: "shortcut",
        label: "Yes; every first result must be held",
        feedback:
          "This leaves the central problem unresolved. This lesson scopes its delta rule to serial orders. Initial orders use a separate release process with no delta check; other safety checks still apply.",
      },
      {
        id: "incomplete",
        label: "No; all first results release automatically",
        feedback:
          "This does not establish the needed conclusion. This lesson scopes its delta rule to serial orders. Initial orders use a separate release process with no delta check; other safety checks still apply.",
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
        label: "Compare the rule with the approved order pathway",
        correct: true,
        feedback:
          "Confirm which order, assay, prior result and other checks apply before changing a threshold.",
      },
      {
        id: "shortcut",
        label: "Change the threshold until fewer cases hold",
        feedback:
          "This leaves the central problem unresolved. Confirm which order, assay, prior result and other checks apply before changing a threshold.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Confirm which order, assay, prior result and other checks apply before changing a threshold.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "10",
    prompt:
      "Two specimens share a patient and collection date. Which link supports correct routing?",
    choices: [
      {
        id: "supported",
        label: "The order and specimen identifiers",
        correct: true,
        feedback:
          "Patient identity is necessary but does not distinguish separate ordered tests or specimens. Preserve the accession and specimen relationship through routing.",
      },
      {
        id: "shortcut",
        label: "The patient name by itself",
        feedback:
          "This leaves the central problem unresolved. Patient identity is necessary but does not distinguish separate ordered tests or specimens. Preserve the accession and specimen relationship through routing.",
      },
      {
        id: "incomplete",
        label: "The destination worklist by itself",
        feedback:
          "This does not establish the needed conclusion. Patient identity is necessary but does not distinguish separate ordered tests or specimens. Preserve the accession and specimen relationship through routing.",
      },
    ],
  },
];
