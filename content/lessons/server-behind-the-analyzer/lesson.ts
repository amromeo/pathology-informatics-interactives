import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["inside-a-results-journey"],
  slug: "server-behind-the-analyzer",
  title: "The Server Behind the Analyzer",
  topic: 3,
  pierObjectives: ["3.1", "3.2"],
  durationMinutes: 25,
  difficulty: "applied",
  interactionKinds: ["threat-model", "control-builder", "stress-test"],
  apiSessions: [8],
  hasLocalPracticum: true,
  experience: "security-review",
  id: "07",
  layout: "standard",

  summary: "A laboratory middleware server has unresolved physical, access and recovery risks.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 8",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "3.1-server-behind-the-analyzer",
      objective: "3.1",
      summary:
        "Match threats to protections, test a control plan and match findings to regulatory obligations.",
      learnerAction:
        "Match threats to protections, test a control plan and match findings to regulatory obligations.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/server-behind-the-analyzer/interaction.ts",
          contains: "securityFindings",
        },
      ],
    },
    {
      id: "3.2-server-behind-the-analyzer",
      objective: "3.2",
      summary:
        "Match threats to protections, test a control plan and match findings to regulatory obligations.",
      learnerAction:
        "Match threats to protections, test a control plan and match findings to regulatory obligations.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/server-behind-the-analyzer/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
  ],
};
