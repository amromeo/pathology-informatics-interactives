import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A paired reagent-lot comparison has p < 0.001, but the whole confidence interval for the mean shift lies inside the agreed limit. What should the team do next?",
    choices: [
      {
        id: "supported",
        label: "Review all acceptance criteria",
        correct: true,
        feedback:
          "The comparison found an average difference that still meets the limit for the mean shift. Before the director approves the lot, the team has to check the other concentration groups and everything else the protocol requires.",
      },
      {
        id: "shortcut",
        label: "Reject because p is below 0.05",
        feedback:
          "The small p-value only says the average difference is unlikely to be zero. It does not say the shift is bigger than the laboratory's limit.",
      },
      {
        id: "incomplete",
        label: "Accept without reviewing other ranges",
        feedback:
          "The main confidence interval describes one concentration group. It cannot tell you whether the lots agree at very low or elevated concentrations.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "You are asked to review a lot comparison for a different assay. Where should you find the criteria for accepting it?",
    choices: [
      {
        id: "supported",
        label: "Read the approved acceptance protocol",
        correct: true,
        feedback:
          "The protocol should set out the specimen groups, the allowed differences, the required checks and who approves the lot, before anyone looks at the results.",
      },
      {
        id: "shortcut",
        label: "Choose a limit that fits the observed mean",
        feedback:
          "A limit picked after seeing the result can excuse a shift the laboratory would have rejected beforehand. Use the criteria agreed before testing.",
      },
      {
        id: "incomplete",
        label: "Use this lesson's troponin limits",
        feedback:
          "The troponin limits in this lesson were set for this assay. Another assay needs its own approved protocol, based on how its results are used.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
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
    fromLesson: "3",
  },
];
