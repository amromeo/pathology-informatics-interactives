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
        label: "How fast readers worked with the tool",
        feedback:
          "Speed alone says nothing about missed mitoses. Look at the full study design first.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "6",
    prompt:
      "A model's detection was fine for six months, then fell after a stain change. What does this suggest?",
    choices: [
      {
        id: "supported",
        label: "Drift worth investigating",
        correct: true,
        feedback:
          "Performance changed over time after a good start. The stain change is one cause to check, along with scanners, cases and slide quality.",
      },
      {
        id: "shortcut",
        label: "Proof that the new stain caused it",
        feedback:
          "The timing makes the stain worth looking at, but it does not prove the cause. Other things may have changed too.",
      },
      {
        id: "incomplete",
        label: "A problem present from the first local test",
        feedback:
          "The model did well for six months, so the problem was not there at the start. Something changed later.",
      },
    ],
  },
];
