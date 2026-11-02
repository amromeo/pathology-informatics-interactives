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
          "Say how many orders were left out and that their collection times were missing; otherwise readers will assume the average covers every order. Then check whether the missing times cluster around the very delay being studied.",
      },
      {
        id: "shortcut",
        label: "Only the mean of complete records",
        feedback:
          "That mean says nothing about the orders left out. If the worst delays also left timestamps missing, reporting only complete records would make things look better than they were.",
      },
      {
        id: "incomplete",
        label: "Only the total number of final results",
        feedback:
          "The total does not say how many orders went into the turnaround calculation or why the others were left out. Show both counts and name the missing field.",
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
        label: "Check the export against the accession list",
        correct: true,
        feedback:
          "Start from the eligible accessions. Account for every case that was included or left out, look for blank fields and check for duplicate rows. Then you know what the averages actually describe.",
      },
      {
        id: "shortcut",
        label: "Remove records with unexpectedly long times",
        feedback:
          "A long time may be the most important finding. Check where it came from, and if the delay was real, keep it in the report.",
      },
      {
        id: "incomplete",
        label: "Split the report into the same three periods as this case",
        feedback:
          "Your report may start and stop the clock at different events, or include different cases. Pin those down and look at the source records before deciding how to group anything.",
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
          "The laboratory director, or whoever the laboratory has named to approve reports, reviews the complete corrected report. The LIS and EHR teams make and test the change.",
      },
      {
        id: "shortcut",
        label: "The interface analyst alone",
        feedback:
          "The analyst can change the units and test that the message goes through. Approving the report is still the laboratory's job, and it has to look at the complete report as it appears in the chart.",
      },
      {
        id: "incomplete",
        label: "The software vendor alone",
        feedback:
          "The vendor can help fix the display, but it cannot approve the laboratory's report. The laboratory director, or the laboratory's named approver, decides whether the corrected report is ready for patient care.",
      },
    ],
  },
];
