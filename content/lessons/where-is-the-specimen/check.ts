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
          "Find the new procedure's code and the version used when the case was assigned. Compare that entry with the supervisor's intended destination, then test the correction and unaffected routes.",
      },
      {
        id: "shortcut",
        label: "Change every procedure to the requested destination",
        feedback:
          "Other procedures may need different teams. In this case, routing everything to gross would disrupt cytology and frozen-section work. Inspect the new entry before changing neighboring routes.",
      },
      {
        id: "incomplete",
        label: "Replace every label using the new procedure code",
        feedback:
          "A replacement label would still retrieve the accession and its saved procedure. First establish whether identity is wrong or the procedure entry supplies the wrong destination.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "The LIS contains a final platelet count, but the clinician sees Pending. What comes first?",
    choices: [
      {
        id: "supported",
        label: "Communicate the verified result",
        correct: true,
        feedback:
          "Use the approved communication process, obtain read-back when required and document the call. The analyst can investigate report delivery while the clinical team receives the available result.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "Restarting may not correct the delivery problem and would leave the team waiting for an available result. Communicate the verified result and document it while the connection is investigated.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "The result is already verified in the LIS. Waiting for another transmission leaves the clinical team without that information. Follow the laboratory's communication procedure and record the call.",
      },
    ],
  },
];
