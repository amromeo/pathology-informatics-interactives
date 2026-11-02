import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A research extract omits names but retains exact birth dates and five-digit ZIP codes. What is true?",
    choices: [
      {
        id: "supported",
        label: "It does not meet Safe Harbor",
        correct: true,
        feedback:
          "Safe Harbor removes every part of a date except the year, and every five-digit ZIP code. A three-digit ZIP prefix can stay only if its area is large enough. Other methods of sharing need their own review.",
      },
      {
        id: "shortcut",
        label: "It meets Safe Harbor without review",
        feedback:
          "Exact birth dates and full ZIP codes are still in the file. Those fields fail Safe Harbor, even though the names are gone.",
      },
      {
        id: "incomplete",
        label: "A study number alone makes it anonymous",
        feedback:
          "A study number only changes the row label. The exact birth dates and ZIP codes can still be linked to people, and the number itself may lead back to them through a separate key.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "An investigator asks for a laboratory export that includes dates and ZIP codes. What should you check before preparing the file?",
    choices: [
      {
        id: "supported",
        label: "Ask which disclosure method was approved",
        correct: true,
        feedback:
          "Which fields can go out, and how they must be protected, depends on the approved method. A data use agreement does not replace meeting that method's requirements.",
      },
      {
        id: "shortcut",
        label: "Delete names and send the remaining file",
        feedback:
          "Deleting names still leaves dates, locations and possibly a key. Ask the privacy office which method and field list were approved before preparing the export.",
      },
      {
        id: "incomplete",
        label: "Make the same three changes as in this case",
        feedback:
          "The three changes in this case may remove details another study needs. Use the method and field list approved locally, and have the privacy office review any change.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "7",
    prompt:
      "A vendor needs remote access to service an analyzer workstation. What is the next step?",
    choices: [
      {
        id: "supported",
        label: "Set up approved, limited access",
        correct: true,
        feedback:
          "The vendor needs its own named account, limited to the repair, with the session recorded. Check that a business associate agreement is in place if the vendor will see PHI. Being in a hurry does not change any of this.",
      },
      {
        id: "shortcut",
        label: "Share the supervisor login temporarily",
        feedback:
          "With a shared login, the vendor's work looks like the supervisor's. Set up named, limited access so the hospital can see who changed the workstation.",
      },
      {
        id: "incomplete",
        label: "Allow unrestricted access until the repair ends",
        feedback:
          "The repair may need only one workstation. Limiting the session protects other records and settings, and lets the laboratory approve and review the work.",
      },
    ],
  },
];

export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
