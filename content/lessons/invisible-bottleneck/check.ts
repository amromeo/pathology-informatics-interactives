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
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Check the extract inclusion rule",
        correct: true,
        feedback:
          "Establish whether pending specimens are present before interpreting workload or delays.",
      },
      {
        id: "shortcut",
        label: "Sort the completed cases by longest time",
        feedback:
          "This leaves the central problem unresolved. Establish whether pending specimens are present before interpreting workload or delays.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Establish whether pending specimens are present before interpreting workload or delays.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "3",
    prompt:
      "A chemistry turnaround report excludes orders without a collection time. What should its summary disclose?",
    choices: [
      {
        id: "supported",
        label: "The excluded count and missing field",
        correct: true,
        feedback:
          "The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
      {
        id: "shortcut",
        label: "Only the mean of complete records",
        feedback:
          "This leaves the central problem unresolved. The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
      {
        id: "incomplete",
        label: "Only the total number of final results",
        feedback:
          "This does not establish the needed conclusion. The summary otherwise describes only the retained subset. Missing timestamps may be related to the operational problem being studied.",
      },
    ],
  },
];
