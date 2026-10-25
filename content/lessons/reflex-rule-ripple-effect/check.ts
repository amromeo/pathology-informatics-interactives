import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A reflex assay stops running, but its dependent interpretation remains. What needs review?",
    choices: [
      {
        id: "supported",
        label: "The dependent result and report logic",
        correct: true,
        feedback:
          "Removing an order does not automatically remove calculations or interpretations that depended on its result. Test the complete report and unaffected pathways.",
      },
      {
        id: "shortcut",
        label: "Only the reflex order count",
        feedback:
          "This leaves the central problem unresolved. Removing an order does not automatically remove calculations or interpretations that depended on its result. Test the complete report and unaffected pathways.",
      },
      {
        id: "incomplete",
        label: "Only the analyzer test menu",
        feedback:
          "This does not establish the needed conclusion. Removing an order does not automatically remove calculations or interpretations that depended on its result. Test the complete report and unaffected pathways.",
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
        label: "List every result that depends on the reflex assay",
        correct: true,
        feedback:
          "The dependency list tells the team which calculations, comments and reports need regression testing.",
      },
      {
        id: "shortcut",
        label: "Hide the unexpected comment in the chart only",
        feedback:
          "This leaves the central problem unresolved. The dependency list tells the team which calculations, comments and reports need regression testing.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. The dependency list tells the team which calculations, comments and reports need regression testing.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "11",
    prompt:
      "An initial troponin has no prior result. Does the serial-order delta rule decide its release?",
    choices: [
      {
        id: "supported",
        label: "No; use the initial-order rule",
        correct: true,
        feedback:
          "This lesson scopes its delta rule to serial orders. Initial orders use a separate release process with no delta check; other safety checks still apply.",
      },
      {
        id: "shortcut",
        label: "Yes; every first result must be held",
        feedback:
          "This leaves the central problem unresolved. This lesson scopes its delta rule to serial orders. Initial orders use a separate release process with no delta check; other safety checks still apply.",
      },
      {
        id: "incomplete",
        label: "No; all first results release automatically",
        feedback:
          "This does not establish the needed conclusion. This lesson scopes its delta rule to serial orders. Initial orders use a separate release process with no delta check; other safety checks still apply.",
      },
    ],
  },
];
