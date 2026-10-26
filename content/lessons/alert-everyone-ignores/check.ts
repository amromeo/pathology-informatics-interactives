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
          "The concurrent comparison helps distinguish a pilot-associated change from a broader trend. Small counts and nonrandom assignment limit causal claims.",
      },
      {
        id: "shortcut",
        label: "Attribute the whole pilot decrease to the alert",
        feedback:
          "This leaves the central problem unresolved. The concurrent comparison helps distinguish a pilot-associated change from a broader trend. Small counts and nonrandom assignment limit causal claims.",
      },
      {
        id: "incomplete",
        label: "Ignore the comparison service after go-live",
        feedback:
          "This does not establish the needed conclusion. The concurrent comparison helps distinguish a pilot-associated change from a broader trend. Small counts and nonrandom assignment limit causal claims.",
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
        label: "Define eligible decisions and balancing measures",
        correct: true,
        feedback:
          "A rate requires a denominator; evaluation also needs justified repeats, missed needed testing and workflow burden.",
      },
      {
        id: "shortcut",
        label: "Count dismissed alerts as prevented repeats",
        feedback:
          "This leaves the central problem unresolved. A rate requires a denominator; evaluation also needs justified repeats, missed needed testing and workflow burden.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. A rate requires a denominator; evaluation also needs justified repeats, missed needed testing and workflow burden.",
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
          "Completed-case turnaround and current queue age answer different questions. A queue analysis must include unfinished eligible work.",
      },
      {
        id: "shortcut",
        label: "The final times of completed cases",
        feedback:
          "This leaves the central problem unresolved. Completed-case turnaround and current queue age answer different questions. A queue analysis must include unfinished eligible work.",
      },
      {
        id: "incomplete",
        label: "The number already finalized",
        feedback:
          "This does not establish the needed conclusion. Completed-case turnaround and current queue age answer different questions. A queue analysis must include unfinished eligible work.",
      },
    ],
  },
];
