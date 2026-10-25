import { additionalExercises as e0 } from "../../content/lessons/server-behind-the-analyzer/interaction";
import { additionalExercises as e1 } from "../../content/lessons/where-is-the-specimen/interaction";
import { additionalExercises as e2 } from "../../content/lessons/follow-the-flag/interaction";
import { additionalExercises as e3 } from "../../content/lessons/newborn-screen-to-public-health/interaction";
import { additionalExercises as e4 } from "../../content/lessons/five-rights-right-test/interaction";
import { additionalExercises as e5 } from "../../content/lessons/autoverification-at-the-edge/interaction";
import { additionalExercises as e6 } from "../../content/lessons/reflex-rule-ripple-effect/interaction";
import { additionalExercises as e7 } from "../../content/lessons/build-the-new-test/interaction";
export const lessonExtensions: Record<string, Extension> = {
  "server-behind-the-analyzer": e0,
  "where-is-the-specimen": e1,
  "follow-the-flag": e2,
  "newborn-screen-to-public-health": e3,
  "five-rights-right-test": e4,
  "autoverification-at-the-edge": e5,
  "reflex-rule-ripple-effect": e6,
  "build-the-new-test": e7,
};
export type Extension = {
  order?: { id: string; label: string; rank: number }[];
  title: string;
  purpose: string;
  questions: {
    id: string;
    prompt: string;
    answer: string;
    choices: { id: string; label: string }[];
    feedback: string;
  }[];
};
