import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["server-behind-the-analyzer"],
  slug: "twelve-hours-offline",
  title: "Twelve Hours Offline",
  topic: 3,
  pierObjectives: ["3.1", "3.3", "4.5"],
  durationMinutes: 30,
  difficulty: "applied",
  interactionKinds: ["tabletop", "timeline", "reconciliation"],
  apiSessions: [8, 9],
  hasLocalPracticum: true,
  experience: "downtime",
  id: "08",
  layout: "standard",

  summary: "A twelve-hour network outage requires paper testing, communication and reconciliation.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 8, 9",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "3.1-twelve-hours-offline",
      objective: "3.1",
      summary:
        "Choose downtime actions and reconcile temporary identifiers, calls and restored records.",
      learnerAction:
        "Choose downtime actions and reconcile temporary identifiers, calls and restored records.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/twelve-hours-offline/interaction.ts",
          contains: "reconciliation",
        },
      ],
    },
    {
      id: "3.3-twelve-hours-offline",
      objective: "3.3",
      summary:
        "Choose downtime actions and reconcile temporary identifiers, calls and restored records.",
      learnerAction:
        "Choose downtime actions and reconcile temporary identifiers, calls and restored records.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/twelve-hours-offline/interaction.ts",
          contains: "reconciliation",
        },
      ],
    },
    {
      id: "4.5-twelve-hours-offline",
      objective: "4.5",
      summary:
        "Choose downtime actions and reconcile temporary identifiers, calls and restored records.",
      learnerAction:
        "Choose downtime actions and reconcile temporary identifiers, calls and restored records.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/twelve-hours-offline/interaction.ts",
          contains: "reconciliation",
        },
      ],
    },
  ],
};
