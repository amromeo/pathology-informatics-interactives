import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A newborn result has a valid message structure but an unrecognized local code. What remains unresolved?",
    choices: [
      {
        id: "supported",
        label: "The meaning of the coded result",
        correct: true,
        feedback:
          "Structural validation cannot establish that both organizations understand the same test or value. Terminology and value-set agreement are needed.",
      },
      {
        id: "shortcut",
        label: "Whether any bytes were received",
        feedback:
          "This leaves the central problem unresolved. Structural validation cannot establish that both organizations understand the same test or value. Terminology and value-set agreement are needed.",
      },
      {
        id: "incomplete",
        label: "Whether a message control ID exists",
        feedback:
          "This does not establish the needed conclusion. Structural validation cannot establish that both organizations understand the same test or value. Terminology and value-set agreement are needed.",
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
        label: "Read the receiver implementation guide",
        correct: true,
        feedback:
          "It defines required fields, supported values and acknowledgment behavior for this exchange.",
      },
      {
        id: "shortcut",
        label: "Assume the latest standard needs no local testing",
        feedback:
          "This leaves the central problem unresolved. It defines required fields, supported values and acknowledgment behavior for this exchange.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. It defines required fields, supported values and acknowledgment behavior for this exchange.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "13",
    prompt:
      "An interface acknowledges a critical result but drops its critical flag. What has been demonstrated?",
    choices: [
      {
        id: "supported",
        label: "Receipt without complete meaning",
        correct: true,
        feedback:
          "An acknowledgment establishes receipt at a handoff. Field mapping and the displayed report must also preserve clinically important interpretation.",
      },
      {
        id: "shortcut",
        label: "Verified clinical display",
        feedback:
          "This leaves the central problem unresolved. An acknowledgment establishes receipt at a handoff. Field mapping and the displayed report must also preserve clinically important interpretation.",
      },
      {
        id: "incomplete",
        label: "Correct flag translation",
        feedback:
          "This does not establish the needed conclusion. An acknowledgment establishes receipt at a handoff. Field mapping and the displayed report must also preserve clinically important interpretation.",
      },
    ],
  },
];
