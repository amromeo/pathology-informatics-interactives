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
        label: "It arrived without its full meaning",
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
        label: "The EHR's list of allowed flags",
        feedback:
          "The EHR's list shows what it accepts, but not what was actually sent. Put the sent message beside the EHR report.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "2",
    prompt:
      "Restarting the interface clears an error, but the setting that sent results to the wrong port has not been changed. Is the problem fixed?",
    choices: [
      {
        id: "supported",
        label: "No, it will happen again",
        correct: true,
        feedback:
          "A restart reloads the same saved setting, so results will go to the wrong port again. Fix and test the setting itself.",
      },
      {
        id: "shortcut",
        label: "Yes, the error has cleared",
        feedback:
          "The error clearing only means the program restarted. The wrong port is still saved and will be used again.",
      },
      {
        id: "incomplete",
        label: "Yes, once the queue has emptied",
        feedback:
          "The queue may empty for a while, but new results will still be sent to the wrong port. The saved setting has to be fixed.",
      },
    ],
  },
];
