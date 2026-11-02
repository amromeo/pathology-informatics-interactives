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
        label: "Set up approved, limited access",
        correct: true,
        feedback:
          "The vendor needs its own named account, limited to the repair, with the session recorded. Check that a business associate agreement is in place if the vendor will see PHI. Being in a hurry does not change any of this.",
      },
      {
        id: "shortcut",
        label: "Share the supervisor login temporarily",
        feedback:
          "With a shared supervisor login, the vendor's work looks like the supervisor's. Set up a named account with only the permissions the repair needs, and record the session.",
      },
      {
        id: "incomplete",
        label: "Allow unrestricted access until the repair ends",
        feedback:
          "Unrestricted access may expose other patients' records and settings. Limit the vendor's named account to the approved task, then end the session and review what was done.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your laboratory wants to change how the vendor connects remotely. Which records should you look at first?",
    choices: [
      {
        id: "supported",
        label: "The approved access and risk analysis",
        correct: true,
        feedback:
          "The laboratory and security team need to know what the vendor can reach, how its sessions are watched and how its access is removed.",
      },
      {
        id: "shortcut",
        label: "A count of the vendor's passwords",
        feedback:
          "Counting passwords does not show which server files or settings the vendor can reach. Look at the approved access, the risk analysis and the session records with security staff.",
      },
      {
        id: "incomplete",
        label: "The access plan used in this lesson",
        feedback:
          "Your systems and support contract may be quite different from this case. Start from your own approved access and local procedure before proposing changes to accounts or connections.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "The LIS shows a final platelet count, but the clinician still sees Pending. What comes first?",
    choices: [
      {
        id: "supported",
        label: "Get the verified result to the clinician",
        correct: true,
        feedback:
          "Phone it through using the downtime procedure, get a read-back if required and record the call. Then keep working out why it did not reach the chart.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "A restart may not fix the problem, and the clinician is still waiting. Phone the verified result through while the analyst works out what went wrong.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "Waiting leaves the clinical team without a platelet count the laboratory has already verified. Phone it through now and record the call.",
      },
    ],
  },
];

export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
