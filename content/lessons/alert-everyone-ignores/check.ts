import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "Repeats fall in both the pilot and comparison services. How should the pilot be assessed?",
    choices: [
      {
        id: "supported",
        label: "Compare the changes in both groups",
        correct: true,
        feedback:
          "Comparing the two over the same period helps separate a change linked to the trial from a wider trend. Small numbers, and wards that were not chosen at random, limit how sure you can be about the cause.",
      },
      {
        id: "shortcut",
        label: "Attribute the whole pilot decrease to the alert",
        feedback:
          "Repeats also fell on the comparison service, which did not get the alert. Part of the trial ward's drop was probably happening anyway.",
      },
      {
        id: "incomplete",
        label: "Ignore the comparison service after go-live",
        feedback:
          "Without the comparison service, you cannot tell how much of the drop would have happened without the alert. Keep following both.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your laboratory wants to judge whether an existing alert works. What would you settle first?",
    choices: [
      {
        id: "supported",
        label: "Define eligible decisions and balancing measures",
        correct: true,
        feedback:
          "A rate needs a denominator. The evaluation also has to count justified repeats, needed tests that were missed and the extra work for staff.",
      },
      {
        id: "shortcut",
        label: "Count dismissed alerts as prevented repeats",
        feedback:
          "Dismissing a message is not the same as cancelling a test, and a cancelled test is not always one that should have been avoided.",
      },
      {
        id: "incomplete",
        label: "Reuse this lesson's ward comparison",
        feedback:
          "Your alert, your wards and your test may be different. Decide which decisions count and what side effects to measure for your own case.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "16",
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
];
