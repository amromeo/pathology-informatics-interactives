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
        label: "Write down what the test measures",
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
        label: "Ask the vendor which code to use",
        feedback:
          "The vendor may suggest a code, but only the laboratory knows exactly what its test measures. Write that down before choosing.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "14",
    prompt:
      "The public health program receives the same newborn report twice, with the same control number. What should happen to the second copy?",
    choices: [
      {
        id: "supported",
        label: "Keep one record, not two",
        correct: true,
        feedback:
          "An exact repeat is the same report sent again. It should not create a second referral or a second follow-up.",
      },
      {
        id: "shortcut",
        label: "Open a second referral to be safe",
        feedback:
          "A second referral for the same report would confuse follow-up and could mean the family is contacted twice.",
      },
      {
        id: "incomplete",
        label: "Treat it as a corrected report",
        feedback:
          "A corrected report is a new version with its own status. An exact repeat with the same control number is just the same report again.",
      },
    ],
  },
];
