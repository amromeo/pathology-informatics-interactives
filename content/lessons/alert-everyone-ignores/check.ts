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
        label: "Which decisions count, and what to measure",
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
        label: "Compare total test volume before and after",
        feedback:
          "Volume changes with patient numbers and many other things. Decide first which decisions count and which side effects to measure.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "16",
    prompt:
      "At 2 pm, a dashboard says it was updated at 10:00. The 11:00 and noon copies failed. What does it show?",
    choices: [
      {
        id: "supported",
        label: "Only what had happened by 10:00",
        correct: true,
        feedback:
          "The page shows the last copy that worked. Anything after 10:00, including the morning's slowest work, is missing.",
      },
      {
        id: "shortcut",
        label: "Everything up to when you opened it",
        feedback:
          "The page clock is not the time of the data. The failed copies mean nothing after 10:00 is included.",
      },
      {
        id: "incomplete",
        label: "The morning's results, plus anything pending",
        feedback:
          "A dashboard built from final results leaves out pending work, and this one stops at 10:00 as well.",
      },
    ],
  },
];
