import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["invisible-bottleneck"],
  slug: "alert-everyone-ignores",
  title: "Evaluating a Repeat-Test Alert",
  topic: 6,
  pierObjectives: ["6.3", "6.4"],
  durationMinutes: 40,
  difficulty: "applied",
  interactionKinds: ["alert-redesign", "evaluation"],
  apiSessions: [7],
  hasLocalPracticum: true,
  experience: "alert-evaluation",
  id: "18",
  layout: "wide",

  summary: "An alert gets many acknowledgments, but its clinical effect remains uncertain.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 7",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "6.3-alert-everyone-ignores",
      objective: "6.3",
      summary:
        "Compare alert presentations with order decisions, interpret pilot rates and select safety measures.",
      learnerAction:
        "Compare alert presentations with order decisions, interpret pilot rates and select safety measures.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/alert-everyone-ignores/interaction.ts",
          contains: "pilotComparison",
        },
      ],
    },
    {
      id: "6.4-alert-everyone-ignores",
      objective: "6.4",
      summary:
        "Compare alert presentations with order decisions, interpret pilot rates and select safety measures.",
      learnerAction:
        "Compare alert presentations with order decisions, interpret pilot rates and select safety measures.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/alert-everyone-ignores/interaction.ts",
          contains: "pilotComparison",
        },
      ],
    },
  ],
};
