import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "The EHR acknowledges a critical result but drops its critical flag. What does that show?",
    choices: [
      {
        id: "supported",
        label: "The message arrived, but not its full meaning",
        correct: true,
        feedback:
          "An acknowledgment shows the message was received at one handoff. The field translation and the report clinicians see also have to keep the critical flag.",
      },
      {
        id: "shortcut",
        label: "The report clinicians see has been checked",
        feedback:
          "The acknowledgment comes from the receiving system, not from anyone looking at the report. Open the EHR report itself to see whether the flag is there.",
      },
      {
        id: "incomplete",
        label: "The flag was translated correctly",
        feedback:
          "The flag was dropped, so it was not translated correctly. Compare the flag in the sent message with the code the EHR expects.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "A result in your EHR is missing a flag the LIS shows. What would you check first?",
    choices: [
      {
        id: "supported",
        label: "The sent message beside the EHR report",
        correct: true,
        feedback:
          "Following the same result from the message to the report shows where the flag was lost or translated wrongly.",
      },
      {
        id: "shortcut",
        label: "Send the message again and see",
        feedback:
          "Sending it again repeats whatever went wrong the first time. Look at the flag field in the message and at the translation table first.",
      },
      {
        id: "incomplete",
        label: "This lesson's flag translations",
        feedback:
          "Your interface may use different codes and a different agreed table. Start from your own message and your own interface agreement.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "The LIS shows a final platelet count, but the clinician still sees Pending. What comes first?",
    choices: [
      {
        id: "supported",
        label: "Get the verified result to the clinician",
        correct: true,
        feedback:
          "Phone it through using the downtime procedure, get a read-back if required and record the call. Then keep working out why it did not reach the chart.",
      },
      {
        id: "shortcut",
        label: "Restart the interface before calling",
        feedback:
          "A restart may not fix the problem, and the clinician is still waiting. Phone the verified result through while the analyst works out what went wrong.",
      },
      {
        id: "incomplete",
        label: "Wait for the next scheduled report",
        feedback:
          "Waiting leaves the clinical team without a platelet count the laboratory has already verified. Phone it through now and record the call.",
      },
    ],
  },
];
