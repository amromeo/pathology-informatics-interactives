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
          "This leaves the central problem unresolved. Safe Harbor removes all date elements except year and all five-digit ZIP codes. Limited three-digit ZIP retention has a population condition; other disclosure methods require their own review.",
      },
      {
        id: "incomplete",
        label: "A study number alone makes it anonymous",
        feedback:
          "This does not establish the needed conclusion. Safe Harbor removes all date elements except year and all five-digit ZIP codes. Limited three-digit ZIP retention has a population condition; other disclosure methods require their own review.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
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
          "This leaves the central problem unresolved. The fields and safeguards depend on the authorized method; a data use agreement is not a substitute for satisfying that method.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. The fields and safeguards depend on the authorized method; a data use agreement is not a substitute for satisfying that method.",
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
          "This leaves the central problem unresolved. The access arrangement needs individual authorization, appropriate safeguards and review of the business-associate relationship where applicable. Convenience does not remove these obligations.",
      },
      {
        id: "incomplete",
        label: "Permit unrestricted access until repair ends",
        feedback:
          "This does not establish the needed conclusion. The access arrangement needs individual authorization, appropriate safeguards and review of the business-associate relationship where applicable. Convenience does not remove these obligations.",
      },
    ],
  },
];
