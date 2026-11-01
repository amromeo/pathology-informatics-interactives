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
          "A shared supervisor login attributes the vendor's work to the supervisor. Arrange a named account with the permissions needed for the repair and a record of the session.",
      },
      {
        id: "incomplete",
        label: "Permit unrestricted access until repair ends",
        feedback:
          "Unrestricted access may expose other patient records and settings. Limit the named vendor account to the approved task, then end and review the session.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your laboratory wants to change vendor remote access. Which records should you review first?",
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
          "A password count does not show which server files or settings the vendor can reach. Review the approved access, risk analysis and session records with security staff.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "Local systems and support arrangements may differ from this case. Review the approved access and local procedure before proposing account or connection changes.",
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
          "Restarting the interface may not correct the delivery problem and leaves the clinician waiting. Communicate the verified result through the approved process while the analyst investigates.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "Waiting for another report leaves the verified platelet count unavailable to the clinical team. Use the approved communication process and document the call now.",
      },
    ],
  },
];

export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
