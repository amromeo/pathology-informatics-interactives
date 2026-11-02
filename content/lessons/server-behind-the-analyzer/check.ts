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
        label: "The vendor's own description of its access",
        feedback:
          "The vendor's description says what it plans to do, not what the hospital approved or can watch. Start with the approved access and the risk analysis.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "Results verified in the LIS after 09:30 are missing from the chart; earlier ones arrived. The interface engine's queue keeps growing. Where has delivery stopped?",
    choices: [
      {
        id: "supported",
        label: "Between the interface engine and the EHR",
        correct: true,
        feedback:
          "The results left the LIS and are piling up in the interface engine, so they are not getting from there to the EHR. Check that connection and its settings.",
      },
      {
        id: "shortcut",
        label: "At the analyzer, which may have stopped sending",
        feedback:
          "The results are already verified in the LIS, so the analyzer did its part. They are stuck further along, in the interface engine's queue.",
      },
      {
        id: "incomplete",
        label: "In the clinicians' chart view, which needs refreshing",
        feedback:
          "A growing queue in the interface engine means the results never reached the chart. Refreshing the view will not bring them in.",
      },
    ],
  },
];

export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
