import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A vendor demonstration scores well, but a required blood-bank workflow fails. What should the selection team do?",
    choices: [
      {
        id: "supported",
        label: "Resolve the required workflow first",
        correct: true,
        feedback:
          "A high aggregate preference score cannot compensate for an unmet mandatory safety requirement. Require evidence and an acceptable plan before selection.",
      },
      {
        id: "shortcut",
        label: "Average the failure into the total score",
        feedback:
          "This leaves the central problem unresolved. A high aggregate preference score cannot compensate for an unmet mandatory safety requirement. Require evidence and an acceptable plan before selection.",
      },
      {
        id: "incomplete",
        label: "Treat every demonstration criterion as optional",
        feedback:
          "This does not establish the needed conclusion. A high aggregate preference score cannot compensate for an unmet mandatory safety requirement. Require evidence and an acceptable plan before selection.",
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
        label: "Agree on requirements and decision authority",
        correct: true,
        feedback:
          "The team needs explicit must-haves, weighted preferences and responsibility for approving tradeoffs before viewing demonstrations.",
      },
      {
        id: "shortcut",
        label: "Choose the vendor with the most features",
        feedback:
          "This leaves the central problem unresolved. The team needs explicit must-haves, weighted preferences and responsibility for approving tradeoffs before viewing demonstrations.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. The team needs explicit must-haves, weighted preferences and responsibility for approving tradeoffs before viewing demonstrations.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "22",
    prompt:
      "A new test result transmits, but its reference interval is absent in the chart. Can it go live?",
    choices: [
      {
        id: "supported",
        label: "Hold approval and repair the report",
        correct: true,
        feedback:
          "A technically delivered result is not a complete verified report. Correct the build and rerun affected and unaffected cases before clinical approval.",
      },
      {
        id: "shortcut",
        label: "Approve because the numeric result arrived",
        feedback:
          "This leaves the central problem unresolved. A technically delivered result is not a complete verified report. Correct the build and rerun affected and unaffected cases before clinical approval.",
      },
      {
        id: "incomplete",
        label: "Remove the interval from the LIS too",
        feedback:
          "This does not establish the needed conclusion. A technically delivered result is not a complete verified report. Correct the build and rerun affected and unaffected cases before clinical approval.",
      },
    ],
  },
];
