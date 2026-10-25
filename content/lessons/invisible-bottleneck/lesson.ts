import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["can-we-trust-this-report"],
  slug: "invisible-bottleneck",
  title: "Investigating Delayed Result Release",
  topic: 5,
  pierObjectives: ["5.5", "2.1"],
  durationMinutes: 35,
  difficulty: "applied",
  interactionKinds: ["dashboard", "metric-design"],
  apiSessions: [0, 2, 3, 4],
  hasLocalPracticum: true,
  experience: "queue-analysis",
  id: "16",
  layout: "wide",

  summary: "A dashboard based on completed results hides specimens still awaiting review.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 0, 2, 3, 4",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "5.5-invisible-bottleneck",
      objective: "5.5",
      summary:
        "Include pending work and distinguish collection, review and release delays in operational records.",
      learnerAction:
        "Include pending work and distinguish collection, review and release delays in operational records.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/invisible-bottleneck/interaction.ts",
          contains: "Queue",
        },
      ],
    },
    {
      id: "2.1-invisible-bottleneck",
      objective: "2.1",
      summary:
        "Include pending work and distinguish collection, review and release delays in operational records.",
      learnerAction:
        "Include pending work and distinguish collection, review and release delays in operational records.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/invisible-bottleneck/interaction.ts",
          contains: "Queue",
        },
      ],
    },
  ],
};
