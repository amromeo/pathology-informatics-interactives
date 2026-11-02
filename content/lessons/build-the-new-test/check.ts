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
        label: "Hold approval and repair the report",
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
        label: "This lesson's respiratory build",
        feedback:
          "This build fits this respiratory test. Your test needs its own specification for results, units, intervals and comments.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "1",
    prompt:
      "A potassium report displays the wrong units in the chart. Who approves the corrected report?",
    choices: [
      {
        id: "supported",
        label: "The laboratory director",
        correct: true,
        feedback:
          "The laboratory is responsible for the whole report, including how it looks in the chart. The LIS and EHR teams make and test the change.",
      },
      {
        id: "shortcut",
        label: "The interface analyst alone",
        feedback:
          "The analyst can change the units and test that the message goes through. Approving the report is still the laboratory's job.",
      },
      {
        id: "incomplete",
        label: "The software vendor alone",
        feedback:
          "The vendor can help fix the display, but it cannot approve the laboratory's report. That is the laboratory director's decision.",
      },
    ],
  },
];
