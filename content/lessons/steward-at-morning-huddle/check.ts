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
        label: "Ask the LIS analyst to shorten the comment",
        feedback:
          "Shortening the comment changes what the laboratory reports. First find out whether the full comment reached the EHR and where it is cut off.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "A blood culture Gram stain is final in the LIS, but the ward's chart still says Pending. The nurse phones the laboratory. What do you do first?",
    choices: [
      {
        id: "supported",
        label: "Give the nurse the result and record the call",
        correct: true,
        feedback:
          "The patient needs the result now. Give it by phone under the laboratory's procedure, get a read-back if required and record the call, then find out why it did not reach the chart.",
      },
      {
        id: "shortcut",
        label: "Ask the nurse to check the chart in an hour",
        feedback:
          "Nothing suggests the chart will catch up by itself, and a Gram stain may change treatment now. Give the nurse the verified result and record the call.",
      },
      {
        id: "incomplete",
        label: "Verify the result again so the LIS resends it",
        feedback:
          "Verifying again may add a second copy to the same stuck queue, and the nurse is still waiting. Phone the result first, then trace where it stopped.",
      },
    ],
  },
];
