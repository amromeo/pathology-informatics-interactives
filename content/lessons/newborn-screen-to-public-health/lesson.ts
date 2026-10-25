import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["follow-the-flag"],
  slug: "newborn-screen-to-public-health",
  title: "Sending a Newborn Screening Report",
  topic: 5,
  pierObjectives: ["5.1", "5.2", "5.3"],
  durationMinutes: 35,
  difficulty: "applied",
  interactionKinds: ["message-inspector", "terminology-map"],
  apiSessions: [4],
  hasLocalPracticum: true,
  experience: "newborn-exchange",
  id: "14",
  layout: "wide",

  summary: "A newborn screening report must reach the right public-health workflow.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 4",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "5.1-newborn-screen-to-public-health",
      objective: "5.1",
      summary:
        "Map newborn observations and answers, then match standards requests to responsible organizations.",
      learnerAction:
        "Map newborn observations and answers, then match standards requests to responsible organizations.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/newborn-screen-to-public-health/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
    {
      id: "5.2-newborn-screen-to-public-health",
      objective: "5.2",
      summary:
        "Map newborn observations and answers, then match standards requests to responsible organizations.",
      learnerAction:
        "Map newborn observations and answers, then match standards requests to responsible organizations.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/newborn-screen-to-public-health/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
    {
      id: "5.3-newborn-screen-to-public-health",
      objective: "5.3",
      summary:
        "Map newborn observations and answers, then match standards requests to responsible organizations.",
      learnerAction:
        "Map newborn observations and answers, then match standards requests to responsible organizations.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/newborn-screen-to-public-health/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
  ],
};
