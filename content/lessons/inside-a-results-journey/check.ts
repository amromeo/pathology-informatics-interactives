import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "The LIS contains a final platelet count, but the clinician calling the laboratory sees Pending. What should staff do for the clinician while investigating?",
    choices: [
      {
        id: "supported",
        label: "Communicate the verified result",
        correct: true,
        feedback:
          "The laboratory already has a verified result. Communicate it through the approved downtime process, obtain read-back when required and record the call while the analyst traces electronic delivery.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "Restarting may not repair the failed connection, and it delays a result already available in the LIS. Staff can communicate that result while the analyst investigates.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "A scheduled report may use the same failed connection. The clinician needs the verified result now, so use the approved downtime communication process.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Another result is final in your LIS but missing from the chart. Which check would help locate where its delivery stopped?",
    choices: [
      {
        id: "supported",
        label: "Trace the same result through the LIS, message queue and chart",
        correct: true,
        feedback:
          "Use the same accession and result to compare the release record, outgoing message, receiving acknowledgment and chart. Each record establishes a different step in delivery.",
      },
      {
        id: "shortcut",
        label: "Use server uptime as proof of delivery",
        feedback:
          "Uptime tells you the server has been running. A blocked connection or rejected message can still prevent a report from arriving.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "A firewall rule caused this case, but another missing report could have a different cause. First locate the failed handoff and identify the appropriate local support team.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "1",
    prompt:
      "A potassium report displays the wrong units in the chart. Who approves the corrected report?",
    choices: [
      {
        id: "supported",
        label: "The laboratory director",
        correct: true,
        feedback:
          "The laboratory director or designated laboratory approver reviews the complete corrected report. The LIS and EHR teams make and test the technical change.",
      },
      {
        id: "shortcut",
        label: "The interface analyst alone",
        feedback:
          "The analyst can change the mapping and test transmission. Clinical approval still belongs to the laboratory, which must review the complete report as it appears in the chart.",
      },
      {
        id: "incomplete",
        label: "The software vendor alone",
        feedback:
          "The vendor can help correct the display, but it cannot replace the laboratory's review of its report. The laboratory director or designated approver confirms that the corrected result is suitable for clinical use.",
      },
    ],
  },
];
