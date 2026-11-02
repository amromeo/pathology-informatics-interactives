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
        label: "Average the times and compare with last month",
        feedback:
          "Averages say nothing about whether the export holds the right cases. Check it against the accession list first.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "1",
    prompt:
      "A new alert would combine a laboratory result with the patient's current medications. Who should design it?",
    choices: [
      {
        id: "supported",
        label: "Laboratory and clinical informatics together",
        correct: true,
        feedback:
          "The alert depends on both the laboratory result and information from the chart. Pathology informatics can lead, but clinical informatics needs to check the medication and diagnosis data.",
      },
      {
        id: "shortcut",
        label: "The LIS analyst, since the result comes from the LIS",
        feedback:
          "The LIS analyst knows the result, but not how medication data are recorded in the chart or how clinicians will use the alert. Both sides need to design it.",
      },
      {
        id: "incomplete",
        label: "Pharmacy, since the alert is about medications",
        feedback:
          "Pharmacy can advise, but the alert also depends on what the laboratory result means. Laboratory and clinical informatics need to design it together.",
      },
    ],
  },
];
