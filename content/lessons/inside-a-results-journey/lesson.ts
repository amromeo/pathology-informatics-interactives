import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["steward-at-morning-huddle"],
  slug: "inside-a-results-journey",
  title: "The Missing CBC",
  topic: 1,
  pierObjectives: ["1.4"],
  durationMinutes: 22,
  difficulty: "foundational",
  interactionKinds: [
    "system-map",
    "component-classification",
    "log-review",
    "fault-localization",
    "reconciliation",
  ],
  apiSessions: [1, 3],
  hasLocalPracticum: true,
  experience: "result-journey",
  id: "02",
  layout: "standard",

  summary: "A completed blood count remains pending in the emergency department chart.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 1, 3",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "1.4-inside-a-results-journey",
      objective: "1.4",
      summary:
        "Build the reporting path and identify the connection that prevents the ED receiving a final result.",
      learnerAction:
        "Build the reporting path and identify the connection that prevents the ED receiving a final result.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/inside-a-results-journey/interaction.ts",
          contains: "pathwayOrder",
        },
      ],
    },
  ],
};
