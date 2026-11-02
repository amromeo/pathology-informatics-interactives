import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A recent HbA1c exists but clinicians see it only after placing another order. What change is worth testing?",
    choices: [
      {
        id: "supported",
        label: "Show relevant history at order entry",
        correct: true,
        feedback:
          "Showing this patient's history at the right moment can prevent an unnecessary repeat while still allowing justified ones. Test it in practice, and for safety, before rolling it out widely.",
      },
      {
        id: "shortcut",
        label: "Send a weekly list after discharge",
        feedback:
          "A list after discharge arrives long after the order was placed, when nothing can be changed. The history has to be shown while the clinician is ordering.",
      },
      {
        id: "incomplete",
        label: "Interrupt every order regardless of history",
        feedback:
          "Interrupting every order, whatever the history, trains clinicians to click past the message. Show the history only when there is a recent result or pending order.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your laboratory wants to add guidance for a test that is often repeated. What would you do first?",
    choices: [
      {
        id: "supported",
        label: "Observe the ordering workflow",
        correct: true,
        feedback:
          "Find out who makes the decision, what information they have and whether the proposed support would reach them at the right moment.",
      },
      {
        id: "shortcut",
        label: "Add a warning without observing ordering",
        feedback:
          "A warning added without seeing how clinicians order may go to the wrong person or arrive too late, as it did in this case.",
      },
      {
        id: "incomplete",
        label: "Copy this lesson's design",
        feedback:
          "Your test, your clinicians and your ordering screens may be different. Watch how ordering works locally before choosing a design.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "10",
    prompt:
      "Two specimens share a patient and collection date. Which link supports correct routing?",
    choices: [
      {
        id: "supported",
        label: "The order and specimen identifiers",
        correct: true,
        feedback:
          "The patient's identity is needed, but it does not tell two tests or specimens apart. Keep the accession and specimen linked all the way through routing.",
      },
      {
        id: "shortcut",
        label: "The patient name by itself",
        feedback:
          "Both specimens belong to the same patient, so the name cannot tell them apart. Use the order and specimen identifiers.",
      },
      {
        id: "incomplete",
        label: "The destination worklist by itself",
        feedback:
          "A worklist can hold many specimens from the same patient. The destination does not say which specimen is which; the order and specimen identifiers do.",
      },
    ],
  },
];
