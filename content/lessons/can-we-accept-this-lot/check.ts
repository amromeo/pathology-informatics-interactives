import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A paired reagent comparison has p < 0.001, but its entire confidence interval for the mean shift lies inside the approved limit. What should the team do next?",
    choices: [
      {
        id: "supported",
        label: "Review all acceptance criteria",
        correct: true,
        feedback:
          "The study detects an average difference that meets the mean-shift criterion. The team must still check the other concentration groups and all remaining protocol requirements before director approval.",
      },
      {
        id: "shortcut",
        label: "Reject because p is below 0.05",
        feedback:
          "The small p-value concerns a zero average difference. It does not say that the measured shift exceeds the laboratory's acceptance limit.",
      },
      {
        id: "incomplete",
        label: "Accept without reviewing other ranges",
        feedback:
          "The main confidence interval describes one concentration group. It cannot establish acceptable agreement at very low or elevated concentrations.",
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
          "The protocol should define the specimen groups, allowed differences, required checks and approver before the results are interpreted.",
      },
      {
        id: "shortcut",
        label: "Choose a limit that fits the observed mean",
        feedback:
          "A limit chosen after seeing the result can excuse a shift the laboratory would previously have considered unacceptable. Use the criteria agreed before testing.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "The troponin limits in this lesson do not automatically fit another assay. Use that assay's approved protocol and clinical requirements.",
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
          "State how many orders were excluded and that their collection times were missing. The average describes only the included orders. Investigate whether the missing times are concentrated during the delay being studied.",
      },
      {
        id: "shortcut",
        label: "Only the mean of complete records",
        feedback:
          "That mean cannot describe the excluded orders. If the longest delays also caused missing timestamps, reporting only complete records could make performance look better than it was.",
      },
      {
        id: "incomplete",
        label: "Only the total number of final results",
        feedback:
          "The total does not identify how many orders contributed to the turnaround calculation or why others were omitted. Show the included and excluded counts and the missing field.",
      },
    ],
    fromLesson: "3",
  },
];
