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
          "Component, property, timing, specimen, scale and method where relevant distinguish observations. Similar display names are insufficient.",
      },
      {
        id: "shortcut",
        label: "The shortest matching display name",
        feedback:
          "This leaves the central problem unresolved. Component, property, timing, specimen, scale and method where relevant distinguish observations. Similar display names are insufficient.",
      },
      {
        id: "incomplete",
        label: "The code used at a neighboring hospital",
        feedback:
          "This does not establish the needed conclusion. Component, property, timing, specimen, scale and method where relevant distinguish observations. Similar display names are insufficient.",
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
        label: "Compare specimen, units, method and timing",
        correct: true,
        feedback:
          "A terminology decision must describe what was actually measured before a code is selected.",
      },
      {
        id: "shortcut",
        label: "Choose the most common code from a search",
        feedback:
          "This leaves the central problem unresolved. A terminology decision must describe what was actually measured before a code is selected.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. A terminology decision must describe what was actually measured before a code is selected.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "14",
    prompt:
      "A newborn result has a valid message structure but an unrecognized local code. What remains unresolved?",
    choices: [
      {
        id: "supported",
        label: "The meaning of the coded result",
        correct: true,
        feedback:
          "Structural validation cannot establish that both organizations understand the same test or value. Terminology and value-set agreement are needed.",
      },
      {
        id: "shortcut",
        label: "Whether any bytes were received",
        feedback:
          "This leaves the central problem unresolved. Structural validation cannot establish that both organizations understand the same test or value. Terminology and value-set agreement are needed.",
      },
      {
        id: "incomplete",
        label: "Whether a message control ID exists",
        feedback:
          "This does not establish the needed conclusion. Structural validation cannot establish that both organizations understand the same test or value. Terminology and value-set agreement are needed.",
      },
    ],
  },
];
