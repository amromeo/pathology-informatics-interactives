import type { RetrievalItem } from "../../../src/data/types";
export const feedbackHeadings = { correct: "Correct", incorrect: "Try again" };
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "The LIS contains a final platelet count, but the clinician calling the laboratory sees Pending. What should staff do for the clinician while investigating?",
    choices: [
      {
        id: "supported",
        label: "Give the clinician the result now",
        correct: true,
        feedback:
          "The laboratory already has a verified result. Phone it through under the downtime procedure, get a read-back when required and record the call, while the analyst works out why the electronic report did not arrive.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "A restart may not fix the connection, and it keeps the clinician waiting for a result the LIS already has. Call the result first; the analyst can investigate meanwhile.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "The next scheduled report may go through the same broken connection. The clinician needs the result now, so phone it under the downtime procedure.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "Another result is final in your LIS but missing from the chart. Which check would help locate where its delivery stopped?",
    choices: [
      {
        id: "supported",
        label: "Trace the same result through the LIS, message queue and chart",
        correct: true,
        feedback:
          "Follow one accession and result through the release record, the outgoing message, the acknowledgment and the chart. Each record shows a different step, so the first one that is missing tells you where delivery stopped.",
      },
      {
        id: "shortcut",
        label: "Use server uptime as proof of delivery",
        feedback:
          "Uptime tells you the server has been running. A blocked connection or rejected message can still prevent a report from arriving.",
      },
      {
        id: "incomplete",
        label: "Correct the destination port, as in this case",
        feedback:
          "A wrong port caused this case, but your missing result may have a different cause. Trace it through your own systems and find where it stopped before choosing a fix.",
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
          "The laboratory director, or whoever the laboratory has named to approve reports, reviews the complete corrected report. The LIS and EHR teams make and test the change.",
      },
      {
        id: "shortcut",
        label: "The interface analyst alone",
        feedback:
          "The analyst can change the units and test that the message goes through. Approving the report is still the laboratory's job, and it has to look at the complete report as it appears in the chart.",
      },
      {
        id: "incomplete",
        label: "The software vendor alone",
        feedback:
          "The vendor can help fix the display, but it cannot approve the laboratory's report. The laboratory director, or the laboratory's named approver, decides whether the corrected report is ready for patient care.",
      },
    ],
  },
];
