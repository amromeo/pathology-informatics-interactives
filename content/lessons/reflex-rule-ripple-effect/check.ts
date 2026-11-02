import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "TH-01 shows the new reference interval but received an unexpected FT4 order. Which records explain the added order?",
    choices: [
      {
        id: "supported",
        label: "The saved reflex rule and the order history",
        correct: true,
        feedback:
          "Revision 8 still used 0.40 as the lower threshold, and the order history names that revision at 07:18. Comparing both with the approved protocol explains why a TSH of 0.30 added an FT4.",
      },
      {
        id: "shortcut",
        label: "The report's interval definition and displayed flag",
        feedback:
          "Those records show what the report prints. The ordering program reads a separate saved rule. Follow the rule revision into the order history to explain the FT4.",
      },
      {
        id: "incomplete",
        label: "The analyzer's assay name and reagent lot record",
        feedback:
          "The assay change started this review, but its name and lot do not show which saved condition added the FT4. Look at the reflex rule and the accession's order history.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "After a reflex-rule correction, which review can reveal a follow-up test that should have been added but was missed?",
    choices: [
      {
        id: "supported",
        label: "Compare expected and actual actions for all eligible accessions",
        correct: true,
        feedback:
          "Include eligible accessions with and without a new FT4 order. A missed addition appears where the protocol calls for a test but the order record shows none.",
      },
      {
        id: "shortcut",
        label: "Review only the FT4 orders created after the change",
        feedback:
          "An accession whose FT4 was missed has no new FT4 order to find. Starting from every eligible TSH-with-reflex accession keeps that mistake in view.",
      },
      {
        id: "incomplete",
        label: "Compare the total FT4 count before and after the change",
        feedback:
          "A lower total may mean fewer unnecessary tests, or more missed ones. Check each eligible accession's expected and actual action to tell which.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "11",
    prompt:
      "A serial troponin's prior result came from a different assay. What should the release rule do?",
    choices: [
      {
        id: "supported",
        label: "Hold the result for review",
        correct: true,
        feedback:
          "Results from different assays cannot be compared directly, so there is no usable history. Under this kind of policy, the result goes to a technologist.",
      },
      {
        id: "shortcut",
        label: "Compare them anyway, since both are troponin",
        feedback:
          "Different assays can give different numbers for the same sample. The change between them would not mean what the rule assumes.",
      },
      {
        id: "incomplete",
        label: "Treat the prior as zero and calculate",
        feedback:
          "Zero was never measured, and dividing by it is impossible. A missing or unusable prior result is not zero; hold the result for review.",
      },
    ],
  },
];
