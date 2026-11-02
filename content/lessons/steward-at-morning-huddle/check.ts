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
          "The laboratory director checks that the units are right in the complete report in the chart. The LIS and EHR analysts make and test the change.",
      },
      {
        id: "shortcut",
        label: "The interface analyst alone",
        feedback:
          "The analyst can fix the field and show that it reached the chart. The laboratory still has to check and approve the complete report.",
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
          "Look at the same report in both places. If the comment is complete in the LIS but short in the chart, the analyst knows where to look for the cut.",
      },
      {
        id: "shortcut",
        label: "Ask for a larger chart text box before looking at the LIS report",
        feedback:
          "A bigger text box will not bring back words that are missing from the report or the message. Compare the two reports first, so the analyst fixes the right thing.",
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
        label: "Give the clinician the result now",
        correct: true,
        feedback:
          "Phone the result under the laboratory's downtime procedure, with read-back when required, and record the call. The team can work out what went wrong once the clinician has the result.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "A restart may not get this result into the chart. Call the count first, so the clinician is not left waiting while the team troubleshoots.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "Waiting leaves the clinician looking at Pending when the laboratory already has a final count. Phone it through now under the downtime procedure.",
      },
    ],
  },
];
