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
        label: "A sample report from another hospital",
        feedback:
          "Another hospital's report may follow an older guide or a different local agreement. Start from the program's implementation guide.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "13",
    prompt:
      "After a fix, the EHR shows critical-high potassium correctly. A critical-low sodium then arrives with no flag. What was missed?",
    choices: [
      {
        id: "supported",
        label: "The critical-low translation",
        correct: true,
        feedback:
          "Fixing CH to HH does nothing for CL. Each critical direction needs its own translation, and both need testing.",
      },
      {
        id: "shortcut",
        label: "The EHR's acknowledgment of the message",
        feedback:
          "The EHR probably acknowledged the message; that only shows it arrived. The flag was lost in translation.",
      },
      {
        id: "incomplete",
        label: "The units for the sodium result",
        feedback:
          "The units are a separate field. The missing flag comes from a critical-low code the EHR still does not recognize.",
      },
    ],
  },
];
