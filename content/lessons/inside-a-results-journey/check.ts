import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Trace the same result through the LIS, message queue and chart",
        correct: true,
        feedback:
          "A successful acknowledgment establishes receipt at one handoff; it does not prove the clinician can view the complete report.",
      },
      {
        id: "shortcut",
        label: "Use server uptime as proof of delivery",
        feedback:
          "This leaves the central problem unresolved. A successful acknowledgment establishes receipt at one handoff; it does not prove the clinician can view the complete report.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. A successful acknowledgment establishes receipt at one handoff; it does not prove the clinician can view the complete report.",
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
          "The laboratory owns the complete report, including how it appears in the chart. The LIS and EHR teams make and test the technical change.",
      },
      {
        id: "shortcut",
        label: "The interface analyst alone",
        feedback:
          "This leaves the central problem unresolved. The laboratory owns the complete report, including how it appears in the chart. The LIS and EHR teams make and test the technical change.",
      },
      {
        id: "incomplete",
        label: "The software vendor alone",
        feedback:
          "This does not establish the needed conclusion. The laboratory owns the complete report, including how it appears in the chart. The LIS and EHR teams make and test the technical change.",
      },
    ],
  },
];
