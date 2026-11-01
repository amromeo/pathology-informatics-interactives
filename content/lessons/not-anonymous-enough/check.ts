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
          "Safe Harbor removes all date elements except year and all five-digit ZIP codes. Limited three-digit ZIP retention has a population condition; other disclosure methods require their own review.",
      },
      {
        id: "shortcut",
        label: "It meets Safe Harbor without review",
        feedback:
          "Exact birth dates and full ZIP codes remain in this extract. Those fields fail Safe Harbor requirements even though names were removed.",
      },
      {
        id: "incomplete",
        label: "A study number alone makes it anonymous",
        feedback:
          "A study number changes the row label. It leaves the exact birth dates and ZIP codes available for linkage and may itself connect to a separate identity key.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "An investigator requests a laboratory export containing dates and ZIP codes. What should you check before preparing the file?",
    choices: [
      {
        id: "supported",
        label: "Ask which disclosure method was approved",
        correct: true,
        feedback:
          "The fields and safeguards depend on the authorized method; a data use agreement is not a substitute for satisfying that method.",
      },
      {
        id: "shortcut",
        label: "Delete names and send the remaining file",
        feedback:
          "Deleting names leaves dates, geography and potentially a key. Ask the privacy office which disclosure method and field list were approved before preparing the export.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This case's three transformations may remove details another study needs. Use the local approved method and field list, with the privacy office reviewing any change.",
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
        label: "Review authorized access and safeguards",
        correct: true,
        feedback:
          "The access arrangement needs individual authorization, appropriate safeguards and review of the business-associate relationship where applicable. Convenience does not remove these obligations.",
      },
      {
        id: "shortcut",
        label: "Share the supervisor login temporarily",
        feedback:
          "The shared account would attribute the vendor's work to the supervisor. Arrange named, limited access so the hospital can review who changed the workstation.",
      },
      {
        id: "incomplete",
        label: "Permit unrestricted access until repair ends",
        feedback:
          "The repair may need only one workstation. Restricting the session protects unrelated records and settings and lets the laboratory approve and review the work.",
      },
    ],
  },
];

export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
