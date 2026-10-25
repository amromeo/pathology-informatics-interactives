import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Compare the source message with the received report",
        correct: true,
        feedback:
          "Following the same observation exposes where the flag was lost or translated incorrectly.",
      },
      {
        id: "shortcut",
        label: "Repeat the transmission without inspecting fields",
        feedback:
          "This leaves the central problem unresolved. Following the same observation exposes where the flag was lost or translated incorrectly.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Following the same observation exposes where the flag was lost or translated incorrectly.",
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
