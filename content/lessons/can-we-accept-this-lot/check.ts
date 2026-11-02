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
        label: "Check every acceptance criterion first",
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
        label: "Use the assay's quality-control ranges",
        feedback:
          "Quality-control ranges describe control material, not how big a shift in patient results the laboratory will accept. Use the approved protocol for this assay.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "3",
    prompt:
      "A monthly report of blood culture contamination leaves out 30 cultures because their draw site is blank. What should the report say?",
    choices: [
      {
        id: "supported",
        label: "That 30 were left out, and why",
        correct: true,
        feedback:
          "Readers will otherwise assume the rate covers every culture. The cultures with no draw site may also be the ones drawn in a hurry, which are more likely to be contaminated.",
      },
      {
        id: "shortcut",
        label: "Nothing, since the rate is still accurate",
        feedback:
          "The rate is only accurate for the cultures that were counted. If the missing ones differ, the report could be quite wrong, so say they were left out.",
      },
      {
        id: "incomplete",
        label: "Only the rate for cultures with a draw site",
        feedback:
          "That is the rate it already shows. Readers also need to know how many cultures were left out and why, or they will think it covers them all.",
      },
    ],
  },
];
