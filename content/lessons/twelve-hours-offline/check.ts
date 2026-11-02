import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "The blood bank's electronic worklist is back after an outage. Staff still have paper test records. What should they do before routine work resumes?",
    choices: [
      {
        id: "supported",
        label: "Match paper tests to electronic orders",
        correct: true,
        feedback:
          "Match each paper record to the correct patient and order. Check which results are already entered so completed tests are neither missed nor ordered again.",
      },
      {
        id: "shortcut",
        label: "Confirm that the login screen appears",
        feedback:
          "Logging in shows that staff can reach the system. It does not show whether the paper tests and their results are in the right patient charts.",
      },
      {
        id: "incomplete",
        label: "Enter every paper result as a new order",
        feedback:
          "Some orders may already be on the restored worklist. Entering each paper record as a new order can duplicate testing that has already been completed.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your supervisor asks you to help plan the next downtime drill. Where would you look to learn who checks paper results when the LIS returns?",
    choices: [
      {
        id: "supported",
        label: "The laboratory's downtime procedure",
        correct: true,
        feedback:
          "Walk through the procedure with the bench supervisor and LIS analyst. Find who matches patients, checks results and closes duplicate orders before the section resumes routine work.",
      },
      {
        id: "shortcut",
        label: "The timestamp on the latest backup",
        feedback:
          "The backup time tells you when data were copied. It does not tell you who will match the paper records or check work completed after that copy.",
      },
      {
        id: "incomplete",
        label: "The IT team's server recovery checklist",
        feedback:
          "That checklist covers getting the system back, not matching paper results to charts. Who does that is in the laboratory's downtime reconciliation procedure.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "7",
    prompt:
      "Backups of the middleware server have reported success every night for a year. Can the laboratory rely on them?",
    choices: [
      {
        id: "supported",
        label: "Not until a restore has been tested",
        correct: true,
        feedback:
          "A backup job reporting success only shows a copy was made. Restore it on a test system and check the orders, results and settings before counting on it.",
      },
      {
        id: "shortcut",
        label: "Yes, a year of successes is enough",
        feedback:
          "A year of successful copies says nothing about whether they can be restored, or whether the restored records would be complete.",
      },
      {
        id: "incomplete",
        label: "Yes, if the backup files are large enough",
        feedback:
          "File size does not show the backup holds everything needed, or that it can be restored. Only a tested restore shows that.",
      },
    ],
  },
];

export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
