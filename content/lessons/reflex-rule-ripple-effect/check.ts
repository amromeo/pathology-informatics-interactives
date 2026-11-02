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
          "Revision 8 still used 0.40 as the lower threshold, and the order history identifies that revision at 07:18. Comparing both with the approved protocol explains why a TSH of 0.30 created an FT4.",
      },
      {
        id: "shortcut",
        label: "The report's interval definition and displayed flag",
        feedback:
          "Those records establish what the report displays. The order program reads a separate saved rule. Follow the rule revision into the order history to explain the FT4.",
      },
      {
        id: "incomplete",
        label: "The analyzer's assay name and reagent lot record",
        feedback:
          "The assay change prompted this review, but its name and lot do not show which saved condition created the FT4. Inspect the reflex rule and the accession's order history.",
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
          "An accession with a missed addition has no new FT4 order to select. Starting with all eligible TSH-with-reflex accessions keeps that failure visible.",
      },
      {
        id: "incomplete",
        label: "Compare the total FT4 count before and after the change",
        feedback:
          "A lower total may reflect either fewer unnecessary tests or more missed tests. Review each eligible accession's expected and actual action to distinguish those possibilities.",
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
          "Initial troponin orders use their separate release rule. The serial-order comparison assumes an earlier sample; the initial-order process applies its own eligibility, QC, flag and other required checks.",
      },
      {
        id: "shortcut",
        label: "The serial-order rule with its missing-history hold",
        feedback:
          "A first sample may have no prior result. This laboratory directs initial orders to a separate release process so the serial history requirement is applied to the intended orders.",
      },
      {
        id: "incomplete",
        label: "Automatic release without any further checks",
        feedback:
          "The absence of a delta comparison leaves the other release requirements in place. Staff still need the initial-order rule's checks before the result can release.",
      },
    ],
    fromLesson: "11",
  },
];
