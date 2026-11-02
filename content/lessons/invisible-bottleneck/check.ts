import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt: "A dashboard includes only completed specimens. What can it miss?",
    choices: [
      {
        id: "supported",
        label: "Work still waiting in the queue",
        correct: true,
        feedback:
          "Turnaround for finished cases and the age of the current queue answer different questions. To study the queue, include the work that is not finished.",
      },
      {
        id: "shortcut",
        label: "The final times of completed cases",
        feedback:
          "A dashboard of finished cases does include their final times. What it misses is the work still waiting, which may be where the delay is.",
      },
      {
        id: "incomplete",
        label: "The number already finalized",
        feedback:
          "The finished count is exactly what such a dashboard shows. It is the specimens still waiting that drop out of view.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your laboratory's turnaround dashboard looks fine, but the bench says things are slow. What would you check first?",
    choices: [
      {
        id: "supported",
        label: "Check the extract inclusion rule",
        correct: true,
        feedback:
          "Find out whether pending specimens are in the data before reading anything into the workload or delays.",
      },
      {
        id: "shortcut",
        label: "Sort the completed cases by longest time",
        feedback:
          "The longest finished cases may not be the longest waits; specimens still pending can be older. Check whether pending work is in the data at all.",
      },
      {
        id: "incomplete",
        label: "Use this lesson's conclusion about reviewers",
        feedback:
          "Your delay may have a different cause. Check which records your dashboard includes, then look at where the time goes.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "3",
    prompt:
      "A chemistry turnaround report leaves out orders that have no collection time. What should its summary say?",
    choices: [
      {
        id: "supported",
        label: "How many were left out, and why",
        correct: true,
        feedback:
          "Without that, readers will assume the summary covers every order. The orders with missing times may be the very ones caught up in the delay being studied.",
      },
      {
        id: "shortcut",
        label: "Only the mean of complete records",
        feedback:
          "That mean says nothing about the orders left out. If the worst delays also left times missing, the report would make things look better than they were.",
      },
      {
        id: "incomplete",
        label: "Only the total number of final results",
        feedback:
          "The total does not say how many orders went into the turnaround calculation or why the others were left out. Show both counts and name the missing field.",
      },
    ],
  },
];
