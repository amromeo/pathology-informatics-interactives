import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt: "A dashboard includes only completed specimens. What can it miss?",
    choices: [
      {
        id: "supported",
        label: "Specimens still waiting to be finished",
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
        label: "Ask for a faster analyzer",
        feedback:
          "Without knowing where the time goes, a faster analyzer may change nothing. Check which records the dashboard includes first.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "3",
    prompt:
      "A surgical pathology turnaround report has three cases over 20 days. The analyst wants to delete them as errors. What do you do first?",
    choices: [
      {
        id: "supported",
        label: "Check them in the source records",
        correct: true,
        feedback:
          "Long cases may be the most important finding. Look at the requisitions and case history before deciding whether a time is wrong.",
      },
      {
        id: "shortcut",
        label: "Delete them, since they distort the mean",
        feedback:
          "If the delays were real, deleting them hides exactly what the report should show. Check them first.",
      },
      {
        id: "incomplete",
        label: "Report the median so they don't matter",
        feedback:
          "The median would hide the long cases rather than explain them. Check whether they are real before choosing what to report.",
      },
    ],
  },
];
