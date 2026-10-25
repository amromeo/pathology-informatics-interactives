import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A vendor needs remote access to service an analyzer workstation. What is the next step?",
    choices: [
      {
        id: "supported",
        label: "Review authorized access and safeguards",
        correct: true,
        feedback:
          "The access arrangement needs individual authorization, appropriate safeguards and review of the business-associate relationship where applicable. Convenience does not remove these obligations.",
      },
      {
        id: "shortcut",
        label: "Share the supervisor login temporarily",
        feedback:
          "This leaves the central problem unresolved. The access arrangement needs individual authorization, appropriate safeguards and review of the business-associate relationship where applicable. Convenience does not remove these obligations.",
      },
      {
        id: "incomplete",
        label: "Permit unrestricted access until repair ends",
        feedback:
          "This does not establish the needed conclusion. The access arrangement needs individual authorization, appropriate safeguards and review of the business-associate relationship where applicable. Convenience does not remove these obligations.",
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
        label: "Review the approved access and risk assessment",
        correct: true,
        feedback:
          "The laboratory and security team must understand what the vendor can access and how that access is monitored and removed.",
      },
      {
        id: "shortcut",
        label: "Count passwords without reviewing access",
        feedback:
          "This leaves the central problem unresolved. The laboratory and security team must understand what the vendor can access and how that access is monitored and removed.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. The laboratory and security team must understand what the vendor can access and how that access is monitored and removed.",
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
