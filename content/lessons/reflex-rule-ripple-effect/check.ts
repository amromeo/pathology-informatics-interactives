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
        label: "The saved reflex rule and its entry in the order history",
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
    prompt:
      "An initial troponin order has no prior result. Which release process should staff use?",
    choices: [
      {
        id: "supported",
        label: "The initial-order rule and its required checks",
        correct: true,
        feedback:
          "Initial troponin orders have their own release rule. The serial-order comparison assumes there is an earlier sample; the initial-order rule runs its own eligibility, QC, flag and other checks.",
      },
      {
        id: "shortcut",
        label: "The serial-order rule with its missing-history hold",
        feedback:
          "A first sample usually has no prior result. This laboratory sends initial orders through a separate release process, so that the history check applies only to serial orders.",
      },
      {
        id: "incomplete",
        label: "Automatic release without any further checks",
        feedback:
          "Having no earlier result to compare with does not remove the other release checks. The initial-order rule's checks still have to pass before the result is released.",
      },
    ],
    fromLesson: "11",
  },
];
