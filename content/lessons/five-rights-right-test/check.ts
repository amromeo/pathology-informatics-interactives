import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A recent HbA1c exists but clinicians see it only after placing another order. What change is worth testing?",
    choices: [
      {
        id: "supported",
        label: "Show relevant history at order entry",
        correct: true,
        feedback:
          "Timely patient-specific information can prevent an avoidable repeat while preserving justified exceptions. Test workflow and safety before broad deployment.",
      },
      {
        id: "shortcut",
        label: "Send a weekly list after discharge",
        feedback:
          "This leaves the central problem unresolved. Timely patient-specific information can prevent an avoidable repeat while preserving justified exceptions. Test workflow and safety before broad deployment.",
      },
      {
        id: "incomplete",
        label: "Interrupt every order regardless of history",
        feedback:
          "This does not establish the needed conclusion. Timely patient-specific information can prevent an avoidable repeat while preserving justified exceptions. Test workflow and safety before broad deployment.",
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
        label: "Observe the ordering workflow",
        correct: true,
        feedback:
          "Identify who decides, what information is available and whether the proposed support reaches that person at the useful moment.",
      },
      {
        id: "shortcut",
        label: "Add a warning without observing ordering",
        feedback:
          "This leaves the central problem unresolved. Identify who decides, what information is available and whether the proposed support reaches that person at the useful moment.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Identify who decides, what information is available and whether the proposed support reaches that person at the useful moment.",
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
