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
        label: "Replace names with study numbers",
        feedback:
          "Study numbers remove names but leave dates and ZIP codes that can identify people. Find out which method of sharing was approved first.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "7",
    prompt:
      "Night staff share one login to the middleware server so nobody gets locked out. What is the main problem?",
    choices: [
      {
        id: "supported",
        label: "Nobody can tell who changed what",
        correct: true,
        feedback:
          "With a shared login, any change to results or routing settings cannot be tied to a person. Each person needs a named account with only the access their job needs.",
      },
      {
        id: "shortcut",
        label: "Someone may forget the password",
        feedback:
          "That is an inconvenience. The bigger problem is that a shared login makes every action anonymous, so changes cannot be traced.",
      },
      {
        id: "incomplete",
        label: "It uses up a software license",
        feedback:
          "Licensing may matter, but it is not the risk. A shared login means nobody can tell who opened or changed a patient's result.",
      },
    ],
  },
];

export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
