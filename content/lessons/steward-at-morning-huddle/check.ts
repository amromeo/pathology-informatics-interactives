import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Compare the LIS report with its verified chart view",
        correct: true,
        feedback:
          "Following one result through both systems identifies the field and handoff that need repair.",
      },
      {
        id: "shortcut",
        label: "Change the display before reviewing the source",
        feedback:
          "This leaves the central problem unresolved. Following one result through both systems identifies the field and handoff that need repair.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Following one result through both systems identifies the field and handoff that need repair.",
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
