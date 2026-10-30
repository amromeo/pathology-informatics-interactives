import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A hematology report shows the wrong hemoglobin units in the chart. Who should approve the repaired report?",
    choices: [
      {
        id: "supported",
        label: "The laboratory director",
        correct: true,
        feedback:
          "The laboratory director checks that the units are correct in the complete chart report. The LIS and EHR analysts make and test the change.",
      },
      {
        id: "shortcut",
        label: "The interface analyst alone",
        feedback:
          "The analyst can repair the field and show that it reached the chart. The laboratory still needs to check and approve the complete report.",
      },
      {
        id: "incomplete",
        label: "The software vendor alone",
        feedback:
          "The vendor knows the software, but the laboratory must decide what its hemoglobin report should say and check the version clinicians see.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "A clinician at your hospital says the interpretive comment is cut off. What would you check before asking someone to change the display?",
    choices: [
      {
        id: "supported",
        label: "Compare the LIS report with its complete report view in the EHR",
        correct: true,
        feedback:
          "Compare the same report in both places. A complete comment in the LIS but a shortened one in the chart helps the analyst trace where it was cut off.",
      },
      {
        id: "shortcut",
        label: "Ask for a larger chart text box before looking at the LIS report",
        feedback:
          "A larger text box will not recover words missing from the source report or message. Compare the reports first so the analyst changes the right part.",
      },
      {
        id: "incomplete",
        label: "Send the same repair instructions used for the troponin case",
        feedback:
          "Your hospital may store and display the comment differently. Show the analyst your own LIS and chart reports before choosing a repair.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "The LIS contains a final platelet count, but the clinician sees Pending. What comes first?",
    choices: [
      {
        id: "supported",
        label: "Communicate the verified result",
        correct: true,
        feedback:
          "Call the result through the laboratory's downtime procedure, with read-back when required, and record the call. The team can investigate delivery while the clinician has the result.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "A restart may not restore this result to the chart. Call the verified count first so the clinician is not left waiting during troubleshooting.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "Waiting leaves the clinician with Pending even though the laboratory has a final count. Use the downtime procedure to communicate it now.",
      },
    ],
  },
];
