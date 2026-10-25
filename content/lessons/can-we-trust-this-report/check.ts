import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A chemistry turnaround report excludes orders without a collection time. What should its summary disclose?",
    choices: [
      {
        id: "supported",
        label: "The excluded count and missing field",
        correct: true,
        feedback:
          "The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
      {
        id: "shortcut",
        label: "Only the mean of complete records",
        feedback:
          "This leaves the central problem unresolved. The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
      {
        id: "incomplete",
        label: "Only the total number of final results",
        feedback:
          "This does not establish the needed conclusion. The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
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
        label: "Reconcile the export count with the accession list",
        correct: true,
        feedback:
          "Start by establishing which records were included, excluded or left blank before interpreting a change in the mean.",
      },
      {
        id: "shortcut",
        label: "Remove records with unexpectedly long times",
        feedback:
          "This leaves the central problem unresolved. Start by establishing which records were included, excluded or left blank before interpreting a change in the mean.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Start by establishing which records were included, excluded or left blank before interpreting a change in the mean.",
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
