import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "The LIS is restored after an outage. What establishes readiness to resume routine work?",
    choices: [
      {
        id: "supported",
        label: "Reconcile pending orders and results",
        correct: true,
        feedback:
          "Restored connectivity does not resolve paper orders, duplicate identities or results already communicated. Reconcile them using the approved recovery process.",
      },
      {
        id: "shortcut",
        label: "Confirm that the login screen appears",
        feedback:
          "This leaves the central problem unresolved. Restored connectivity does not resolve paper orders, duplicate identities or results already communicated. Reconcile them using the approved recovery process.",
      },
      {
        id: "incomplete",
        label: "Enter all paper results as new orders",
        feedback:
          "This does not establish the needed conclusion. Restored connectivity does not resolve paper orders, duplicate identities or results already communicated. Reconcile them using the approved recovery process.",
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
        label: "Locate the downtime reconciliation procedure",
        correct: true,
        feedback:
          "Identify how the team tracks unresolved work, verifies entries and prevents duplicate orders or reports.",
      },
      {
        id: "shortcut",
        label: "Use the latest backup time as proof of recovery",
        feedback:
          "This leaves the central problem unresolved. Identify how the team tracks unresolved work, verifies entries and prevents duplicate orders or reports.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Identify how the team tracks unresolved work, verifies entries and prevents duplicate orders or reports.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "7",
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
];
