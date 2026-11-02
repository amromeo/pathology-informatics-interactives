import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "Two troponin tests use different methods and decision limits. What should guide their mapping?",
    choices: [
      {
        id: "supported",
        label: "The full observation definition",
        correct: true,
        feedback:
          "What is measured, the property, timing, specimen, scale and, where it matters, the method tell tests apart. Similar display names are not enough.",
      },
      {
        id: "shortcut",
        label: "The shortest matching display name",
        feedback:
          "A short name hides the details that matter here. Two troponin tests with different methods and decision limits can share a name and still need different codes.",
      },
      {
        id: "incomplete",
        label: "The code used at a neighboring hospital",
        feedback:
          "The neighboring hospital may run a different assay, and its mapping may simply be wrong. Map from the definition of your own test.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "Your laboratory needs a LOINC code for a new test. What would you do first?",
    choices: [
      {
        id: "supported",
        label: "Write down its specimen, units, method and timing",
        correct: true,
        feedback:
          "You need to know exactly what the test measures before you can choose a code that describes it.",
      },
      {
        id: "shortcut",
        label: "Pick the most common code from a search",
        feedback:
          "The most common code may describe a different specimen, property or method. Compare the code's definition with your test before choosing it.",
      },
      {
        id: "incomplete",
        label: "Reuse the codes from this lesson",
        feedback:
          "The glucose codes here fit these glucose tests. Your test needs its own comparison, part by part, with the candidate code.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "14",
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
];
