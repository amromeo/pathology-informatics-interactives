import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A detector misses some mitoses. What does checking only the marked spots fail to catch?",
    choices: [
      {
        id: "supported",
        label: "False negatives outside the marked areas",
        correct: true,
        feedback:
          "Checking only the marks cannot tell you what a full search would find. Judge the pathologist and the tool together against independent reference answers, including unmarked areas.",
      },
      {
        id: "shortcut",
        label: "The time spent checking marked candidates",
        feedback:
          "Checking the marks is exactly the part that takes time and can be timed. What it misses are the mitoses the tool never marked.",
      },
      {
        id: "incomplete",
        label: "The number of false marks displayed",
        feedback:
          "False marks are found by checking the marks. The mitoses outside the marked spots are what go uncounted.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt:
      "A vendor shows your department a reader study of its tool. What would you look at first?",
    choices: [
      {
        id: "supported",
        label: "The full design of the reader study",
        correct: true,
        feedback:
          "Find out how many different slides and reference mitoses there were, how readers read them, and the gap between sessions, before trusting the combined figures.",
      },
      {
        id: "shortcut",
        label: "The share of marks that were correct",
        feedback:
          "The share of correct marks says nothing about mitoses the tool never marked, so it is not the tool's clinical sensitivity.",
      },
      {
        id: "incomplete",
        label: "This lesson's reader study",
        feedback:
          "This study had four readers and 20 slides. Look at how the vendor's study was designed before comparing the two.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "6",
    prompt:
      "An image model does poorly on a new scanner from the very first local test. What does this suggest?",
    choices: [
      {
        id: "supported",
        label: "A generalizability problem",
        correct: true,
        feedback:
          "The model did not carry over well to a new setting. Drift is a change over time after a starting point has been measured.",
      },
      {
        id: "shortcut",
        label: "A proven change over time",
        feedback:
          "There is no earlier local result to compare with, so nothing has changed over time yet. The model did poorly from the start.",
      },
      {
        id: "incomplete",
        label: "A rise in disease prevalence alone",
        feedback:
          "The question is about mitoses the model missed among slides already known to have them. How common disease is does not explain those misses.",
      },
    ],
  },
];
