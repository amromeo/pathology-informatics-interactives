import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A new test result transmits, but its reference interval is absent in the chart. Can it go live?",
    choices: [
      {
        id: "supported",
        label: "Hold approval and repair the report",
        correct: true,
        feedback:
          "A technically delivered result is not a complete verified report. Correct the build and rerun affected and unaffected cases before clinical approval.",
      },
      {
        id: "shortcut",
        label: "Approve because the numeric result arrived",
        feedback:
          "This leaves the central problem unresolved. A technically delivered result is not a complete verified report. Correct the build and rerun affected and unaffected cases before clinical approval.",
      },
      {
        id: "incomplete",
        label: "Remove the interval from the LIS too",
        feedback:
          "This does not establish the needed conclusion. A technically delivered result is not a complete verified report. Correct the build and rerun affected and unaffected cases before clinical approval.",
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
        label: "Review the approved build specification",
        correct: true,
        feedback:
          "Compare the requested assay, units, intervals, flags, comments and chart destination with the implemented report.",
      },
      {
        id: "shortcut",
        label: "Copy a similar test without a specification",
        feedback:
          "This leaves the central problem unresolved. Compare the requested assay, units, intervals, flags, comments and chart destination with the implemented report.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Compare the requested assay, units, intervals, flags, comments and chart destination with the implemented report.",
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
