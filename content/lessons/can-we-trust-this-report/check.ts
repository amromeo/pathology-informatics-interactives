import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
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
          "State how many orders were excluded and that their collection times were missing. The average describes only the included orders. Investigate whether the missing times are concentrated during the delay being studied.",
      },
      {
        id: "shortcut",
        label: "Only the mean of complete records",
        feedback:
          "That mean cannot describe the excluded orders. If the longest delays also caused missing timestamps, reporting only complete records could make performance look better than it was.",
      },
      {
        id: "incomplete",
        label: "Only the total number of final results",
        feedback:
          "The total does not identify how many orders contributed to the turnaround calculation or why others were omitted. Show the included and excluded counts and the missing field.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Before interpreting a new turnaround-time export, how would you check whether it represents the intended cases?",
    choices: [
      {
        id: "supported",
        label: "Reconcile the export count with the accession list",
        correct: true,
        feedback:
          "Start with the eligible accessions. Account for each included or excluded case, check blank fields and look for duplicate rows. That establishes what the later averages describe.",
      },
      {
        id: "shortcut",
        label: "Remove records with unexpectedly long times",
        feedback:
          "A long time may be the important finding. Check its source before changing it, and keep a real delay in the report rather than deleting it because it is inconvenient.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "Your report may use a different start event, endpoint or eligible group. Establish those definitions and inspect the source records before deciding how to group its cases.",
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
