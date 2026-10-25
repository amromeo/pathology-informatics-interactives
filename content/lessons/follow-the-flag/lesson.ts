import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["inside-a-results-journey"],
  slug: "follow-the-flag",
  title: "Tracing a Missing Critical Flag",
  topic: 5,
  pierObjectives: ["5.2", "5.3", "5.4", "8.1"],
  durationMinutes: 30,
  difficulty: "foundational",
  interactionKinds: ["system-trace", "field-inspector", "mapping", "regression"],
  apiSessions: [3, 4],
  hasLocalPracticum: true,
  experience: "flag-trace",
  id: "13",
  layout: "wide",

  summary: "A critical potassium result arrives without its critical flag.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 3, 4",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "5.2-follow-the-flag",
      objective: "5.2",
      summary:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      learnerAction:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/follow-the-flag/interaction.ts",
          contains: "flagFields",
        },
      ],
    },
    {
      id: "5.3-follow-the-flag",
      objective: "5.3",
      summary:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      learnerAction:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/follow-the-flag/interaction.ts",
          contains: "flagFields",
        },
      ],
    },
    {
      id: "5.4-follow-the-flag",
      objective: "5.4",
      summary:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      learnerAction:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/follow-the-flag/interaction.ts",
          contains: "flagFields",
        },
      ],
    },
    {
      id: "8.1-follow-the-flag",
      objective: "8.1",
      summary:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      learnerAction:
        "Inspect whole result-message fields, repair flags and distinguish instrument-interface mechanisms.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/follow-the-flag/interaction.ts",
          contains: "flagFields",
        },
      ],
    },
  ],
};
