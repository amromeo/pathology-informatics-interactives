import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A newborn result arrives in a valid message but with a local code the program does not recognize. What is still unknown?",
    choices: [
      {
        id: "supported",
        label: "What the coded result means",
        correct: true,
        feedback:
          "A valid structure does not show that both organizations understand the same test or answer. The two sides need agreed codes and an agreed list of allowed answers.",
      },
      {
        id: "shortcut",
        label: "Whether anything was received",
        feedback:
          "The message arrived and its structure was valid, so it was received. What is still unknown is what the local code means to the program.",
      },
      {
        id: "incomplete",
        label: "Whether the message has a control number",
        feedback:
          "A valid message already carries a control number. The control number identifies the message; it says nothing about what the result code means.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Your laboratory is about to send a new report to public health. What would you check first?",
    choices: [
      {
        id: "supported",
        label: "The program's implementation guide",
        correct: true,
        feedback:
          "It sets out the required fields, the allowed codes and answers, and what the program sends back for each message.",
      },
      {
        id: "shortcut",
        label: "Whether it uses the newest standard",
        feedback:
          "A newer standard does not settle which fields, codes and answers this program expects. Read its implementation guide and test with the program.",
      },
      {
        id: "incomplete",
        label: "The codes used in this lesson",
        feedback:
          "Your report and your program may need different codes and answers. Start from the guide the program has published for your report.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "13",
    prompt:
      "The EHR acknowledges a critical result but drops its critical flag. What does that show?",
    choices: [
      {
        id: "supported",
        label: "The message arrived, but not its full meaning",
        correct: true,
        feedback:
          "An acknowledgment shows the message was received at one handoff. The field translation and the report clinicians see also have to keep the critical flag.",
      },
      {
        id: "shortcut",
        label: "The report clinicians see has been checked",
        feedback:
          "The acknowledgment comes from the receiving system, not from anyone looking at the report. Open the EHR report itself to see whether the flag is there.",
      },
      {
        id: "incomplete",
        label: "The flag was translated correctly",
        feedback:
          "The flag was dropped, so it was not translated correctly. Compare the flag in the sent message with the code the EHR expects.",
      },
    ],
  },
];
