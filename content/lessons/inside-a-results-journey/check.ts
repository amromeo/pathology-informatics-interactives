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
        label: "Follow the result from LIS to chart",
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
        label: "Resend the result from the LIS",
        feedback:
          "Resending before you know where it stopped may just add another copy to a stuck queue. Trace the result first.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "1",
    prompt:
      "The EHR team wants to move the reference interval to a second screen to tidy the result view. Who has to agree before it changes?",
    choices: [
      {
        id: "supported",
        label: "The laboratory director",
        correct: true,
        feedback:
          "The reference interval is part of the laboratory's report. The laboratory decides whether the report is still complete and safe to read after the change.",
      },
      {
        id: "shortcut",
        label: "The EHR team, since it owns the screen",
        feedback:
          "The EHR team builds the screen, but the report on it belongs to the laboratory. The laboratory director has to agree to a change in what clinicians see.",
      },
      {
        id: "incomplete",
        label: "The clinicians who asked for a tidier view",
        feedback:
          "Their views matter, but they cannot approve a change to the laboratory's report. The laboratory director decides, with their input.",
      },
    ],
  },
];
