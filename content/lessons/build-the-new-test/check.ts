import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A new test result reaches the chart, but its reference interval is missing. Can it go live?",
    choices: [
      {
        id: "supported",
        label: "Hold approval, fix the report and retest it",
        correct: true,
        feedback:
          "A result that arrives is not the same as a complete, checked report. Fix the build and rerun the affected cases, and the unaffected ones, before clinical approval.",
      },
      {
        id: "shortcut",
        label: "Approve because the numeric result arrived",
        feedback:
          "The number arriving does not make the report complete. Clinicians need the reference interval to read it.",
      },
      {
        id: "incomplete",
        label: "Remove the interval from the LIS too",
        feedback:
          "That would make the LIS match a broken chart. Fix the chart report instead, then test it again.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "Your laboratory is about to build a new test. What would you look at first?",
    choices: [
      {
        id: "supported",
        label: "The approved specification for the test",
        correct: true,
        feedback:
          "Compare the assay requested, the units, intervals, flags, comments and where it appears in the chart with the report that was built.",
      },
      {
        id: "shortcut",
        label: "Copy a similar test without a specification",
        feedback:
          "A copied test brings its own units, answers and rules with it, as happened in this case. Start from what the new test needs.",
      },
      {
        id: "incomplete",
        label: "What the EHR team can build quickly",
        feedback:
          "What is quick to build is not necessarily what the test needs. Start from the approved specification.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "1",
    prompt:
      "A new analyzer goes live next week, but nobody on nights has been trained yet. Whose job is it to sort that out?",
    choices: [
      {
        id: "supported",
        label: "The laboratory's supervisors and managers",
        correct: true,
        feedback:
          "Bench procedures, training and shift coverage belong to the laboratory. The LIS team and the vendor can help, but the laboratory makes sure each shift is ready.",
      },
      {
        id: "shortcut",
        label: "The LIS team, who built the test",
        feedback:
          "The LIS team builds and tests the system, but staffing and training on the bench are the laboratory's responsibility.",
      },
      {
        id: "incomplete",
        label: "The vendor's trainer, who ran the first class",
        feedback:
          "The vendor can train staff, but making sure every shift is covered is the laboratory's job.",
      },
    ],
  },
];
