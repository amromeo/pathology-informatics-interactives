import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["inside-a-results-journey"],
  slug: "where-is-the-specimen",
  title: "Where Is the Specimen?",
  topic: 4,
  pierObjectives: ["4.1", "4.2", "4.4"],
  durationMinutes: 25,
  difficulty: "applied",
  interactionKinds: ["audit-trail", "routing-repair", "regression", "recovery-decision"],
  apiSessions: [3],
  hasLocalPracticum: true,
  experience: "specimen-routing",
  id: "10",
  layout: "standard",

  summary: "A correctly labeled specimen reaches the wrong worklist.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 3",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "4.1-where-is-the-specimen",
      objective: "4.1",
      summary:
        "Repair worklist routing and classify ordering and tracking records across laboratory sections.",
      learnerAction:
        "Repair worklist routing and classify ordering and tracking records across laboratory sections.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/where-is-the-specimen/interaction.ts",
          contains: "Routing",
        },
      ],
    },
    {
      id: "4.2-where-is-the-specimen",
      objective: "4.2",
      summary:
        "Repair worklist routing and classify ordering and tracking records across laboratory sections.",
      learnerAction:
        "Repair worklist routing and classify ordering and tracking records across laboratory sections.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/where-is-the-specimen/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
    {
      id: "4.4-where-is-the-specimen",
      objective: "4.4",
      summary:
        "Repair worklist routing and classify ordering and tracking records across laboratory sections.",
      learnerAction:
        "Repair worklist routing and classify ordering and tracking records across laboratory sections.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/where-is-the-specimen/interaction.ts",
          contains: "Routing",
        },
      ],
    },
  ],
};
