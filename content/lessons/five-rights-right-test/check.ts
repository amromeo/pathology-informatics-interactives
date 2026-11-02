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
        label: "Ask clinicians what message they want",
        feedback:
          "Asking helps, but people often describe ordering differently from how it actually happens. Watch the ordering itself before choosing a design.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "10",
    prompt:
      "A new procedure code sent one test to the wrong worklist. After fixing it, what else should the analyst retest?",
    choices: [
      {
        id: "supported",
        label: "The routes that already worked",
        correct: true,
        feedback:
          "A fix to one route can break others. Rerun the procedures that worked before, and a code the LIS does not recognize.",
      },
      {
        id: "shortcut",
        label: "Only the procedure that went to the wrong worklist",
        feedback:
          "Testing only the fixed route would miss any route the change broke. Rerun the ones that already worked too.",
      },
      {
        id: "incomplete",
        label: "Nothing more, since the change was small",
        feedback:
          "Small changes can still affect other routes, as copying an entry did here. Rerun the routes that already worked.",
      },
    ],
  },
];
