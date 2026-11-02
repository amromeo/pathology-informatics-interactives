import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "Two specimens share a patient and collection date. Which link lets staff follow the intended examination for each one?",
    choices: [
      {
        id: "supported",
        label: "The order, accession and specimen links",
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
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "A newly added procedure appears on the wrong worklist. Which comparison should the analyst make first?",
    choices: [
      {
        id: "supported",
        label: "Compare its saved destination with the approved route",
        correct: true,
        feedback:
          "Find the new procedure's code and the version used when the case was assigned. Compare that entry with where the supervisor meant it to go, then test the fix and the routes that were not changed.",
      },
      {
        id: "shortcut",
        label: "Change every procedure to the requested destination",
        feedback:
          "Other procedures may need different teams. In this case, sending everything to gross would disrupt cytology and frozen-section work. Look at the new entry before changing any other route.",
      },
      {
        id: "incomplete",
        label: "Replace every label using the new procedure code",
        feedback:
          "A new label would still open the same accession and its saved procedure. First find out whether the identity is wrong or the procedure entry has the wrong destination.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "After the connection is fixed, 40 queued results flow into the chart. What still needs checking?",
    choices: [
      {
        id: "supported",
        label: "That each reached the right chart once",
        correct: true,
        feedback:
          "A queue clearing does not show every result landed correctly. Check that each one appears once, in the right patient's chart, and compare it with any results phoned during the outage.",
      },
      {
        id: "shortcut",
        label: "Nothing, since the queue is now empty",
        feedback:
          "An empty queue means the messages were sent, not that each one arrived once in the right chart. Check them before calling the problem fixed.",
      },
      {
        id: "incomplete",
        label: "Only the first result in the queue",
        feedback:
          "One result arriving correctly does not show the other 39 did. Check all of them, and any phoned results, against the chart.",
      },
    ],
  },
];
