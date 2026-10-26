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
        label: "Reconcile the paper tests with the electronic orders and results",
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
        label: "The laboratory's downtime reconciliation procedure",
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
        label: "This lesson's job assignments, copied into the local drill",
        feedback:
          "Your hospital may assign these jobs differently. Find the local procedure and ask the people named in it to show how they check the records.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "7",
    prompt:
      "A vendor needs remote access to service an analyzer workstation. What is the next step?",
    choices: [
      {
        id: "supported",
        label: "Check who is authorized to connect and how access is limited",
        correct: true,
        feedback:
          "Have the hospital team check the vendor's account, the access needed for the repair and the protections in place. They also check whether a business-associate agreement is needed.",
      },
      {
        id: "shortcut",
        label: "Share the supervisor login temporarily",
        feedback:
          "A shared login makes the vendor's actions look like the supervisor's. Arrange access for the named service person so the hospital can review who did what.",
      },
      {
        id: "incomplete",
        label: "Permit unrestricted access until the repair ends",
        feedback:
          "The vendor may need only one workstation. Letting that account reach other systems exposes records and services unrelated to the repair.",
      },
    ],
  },
];
