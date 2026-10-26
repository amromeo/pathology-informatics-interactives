import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Trace the order catalog entry to the worklist",
        correct: true,
        feedback:
          "Check requirements, collection instructions and specimen routing before changing a worklist rule.",
      },
      {
        id: "shortcut",
        label: "Reroute every specimen to the same bench",
        feedback:
          "This leaves the central problem unresolved. Check requirements, collection instructions and specimen routing before changing a worklist rule.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Check requirements, collection instructions and specimen routing before changing a worklist rule.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "The LIS contains a final platelet count, but the clinician sees Pending. What comes first?",
    choices: [
      {
        id: "supported",
        label: "Communicate the verified result",
        correct: true,
        feedback:
          "Use the approved downtime communication process, obtain read-back when required, and document the call while the delivery failure is investigated.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "This leaves the central problem unresolved. Use the approved downtime communication process, obtain read-back when required, and document the call while the delivery failure is investigated.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "This does not establish the needed conclusion. Use the approved downtime communication process, obtain read-back when required, and document the call while the delivery failure is investigated.",
      },
    ],
  },
];
