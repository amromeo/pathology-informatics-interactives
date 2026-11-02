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
          "Identify the order type, assay, required prior result and other release checks. Comparing that policy with the saved conditions shows which change to test and which cases should remain unaffected.",
      },
      {
        id: "shortcut",
        label: "The threshold and the setting that produces fewer holds",
        feedback:
          "Fewer holds could include results that require review. Begin with the approved criteria and compare expected and actual outcomes before interpreting the number of holds.",
      },
      {
        id: "incomplete",
        label: "The local threshold and the numbers in this lesson",
        feedback:
          "This case's limits describe its approved policy. A local change needs the laboratory's own assay, order pathway and review criteria, followed by appropriate testing.",
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
          "Follow the specific order, accession and specimen identifiers together. That preserves which examination was requested for each container, even when both belong to the same patient.",
      },
      {
        id: "shortcut",
        label: "The patient name and date of collection",
        feedback:
          "Both specimens share those details. Staff need the accession and specimen links to distinguish their examinations and follow the correct work.",
      },
      {
        id: "incomplete",
        label: "The name of the receiving department",
        feedback:
          "A department's worklist can contain many examinations for many specimens. Follow the order and specimen identifiers to determine which work belongs to this container.",
      },
    ],
    fromLesson: "10",
  },
];
