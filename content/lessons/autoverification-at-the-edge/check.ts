import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
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
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Before changing a local release threshold, what should the resident and analyst compare?",
    choices: [
      {
        id: "supported",
        label: "The saved conditions and the approved order-specific policy",
        correct: true,
        feedback:
          "Note the order type, assay, prior result needed and other release checks. Comparing the policy with the saved conditions shows which change to test and which cases should stay the same.",
      },
      {
        id: "shortcut",
        label: "The threshold and the setting that produces fewer holds",
        feedback:
          "Fewer holds could mean results that need review are being released. Start from the approved criteria, and compare expected with actual outcomes, before reading anything into the number of holds.",
      },
      {
        id: "incomplete",
        label: "The local threshold and the numbers in this lesson",
        feedback:
          "This case's limits come from its own approved policy. A local change has to start from your laboratory's assay, orders and review criteria, and then be tested.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    prompt:
      "Two specimens share a patient and collection date. Which link lets staff follow the intended examination for each one?",
    choices: [
      {
        id: "supported",
        label: "The order linked to each accession and specimen",
        correct: true,
        feedback:
          "Follow the order, accession and specimen identifiers together. That keeps track of which examination was requested for each container, even when both belong to the same patient.",
      },
      {
        id: "shortcut",
        label: "The patient name and date of collection",
        feedback:
          "Both specimens share those details. Staff need the accession and specimen links to tell the two examinations apart.",
      },
      {
        id: "incomplete",
        label: "The name of the receiving department",
        feedback:
          "A department's worklist can hold many examinations for many specimens. Follow the order and specimen identifiers to find which work belongs to this container.",
      },
    ],
    fromLesson: "10",
  },
];
