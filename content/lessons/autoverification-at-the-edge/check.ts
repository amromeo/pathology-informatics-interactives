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
        label: "The saved rule and the approved policy",
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
        label: "The threshold and the assay's reference interval",
        feedback:
          "A reference interval describes healthy people; it is not the policy for when a result is held. Compare the saved rule with the approved policy.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "10",
    prompt:
      "The tracking screen says a specimen is in histology, but the last receiving scan was at accessioning. Where was it last confirmed?",
    choices: [
      {
        id: "supported",
        label: "At accessioning",
        correct: true,
        feedback:
          "Only a receiving scan by a person shows where the container actually was. The histology entry may come from a worklist assignment, not a handoff.",
      },
      {
        id: "shortcut",
        label: "In histology, as the screen says",
        feedback:
          "A screen can show where the work was assigned rather than where the container went. The last scan by a person was at accessioning.",
      },
      {
        id: "incomplete",
        label: "Wherever the case's worklist is",
        feedback:
          "A worklist is where the work is assigned. It does not show where the container physically is. Go by the last receiving scan.",
      },
    ],
  },
];
