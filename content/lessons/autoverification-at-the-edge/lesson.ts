import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["where-is-the-specimen"],
  slug: "autoverification-at-the-edge",
  title: "Checking Automatic Result Release",
  topic: 4,
  pierObjectives: ["4.3", "4.5", "5.4", "8.2"],
  durationMinutes: 35,
  difficulty: "applied",
  interactionKinds: ["rule-builder", "result-trace", "regression", "change-review"],
  apiSessions: [3, 9],
  hasLocalPracticum: true,
  experience: "autoverification",
  id: "11",
  layout: "standard",

  summary: "A serial troponin release rule must handle boundary values and unusable history.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 3, 9",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
    {
      label: "CLSI AUTO15 — Autoverification",
      url: "https://clsi.org/shop/standards/auto15/",
      license: "Linked source; content not reproduced.",
      use: "Professional context for design and validation; the case thresholds are local policy.",
    },
    {
      label: "Krasowski et al. — Autoverification in core chemistry",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4023033/",
      license: "Linked source; content not reproduced.",
      use: "An optional published example of middleware and result-release checks.",
    },
    {
      label: "NIDDK — Adult eGFR equations",
      url: "https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations/adults",
      license: "Linked source; content not reproduced.",
      use: "Documents calculation inputs, including age, for the missing-input example.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "4.3-autoverification-at-the-edge",
      objective: "4.3",
      summary:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      learnerAction:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/autoverification-at-the-edge/interaction.ts",
          contains: "releaseReplay",
        },
      ],
    },
    {
      id: "4.5-autoverification-at-the-edge",
      objective: "4.5",
      summary:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      learnerAction:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/autoverification-at-the-edge/interaction.ts",
          contains: "releaseReplay",
        },
      ],
    },
    {
      id: "5.4-autoverification-at-the-edge",
      objective: "5.4",
      summary:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      learnerAction:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/autoverification-at-the-edge/interaction.ts",
          contains: "releaseReplay",
        },
      ],
    },
    {
      id: "8.2-autoverification-at-the-edge",
      objective: "8.2",
      summary:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      learnerAction:
        "Run automatic-release cases, review missing calculation inputs and identify middleware responsibilities.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/autoverification-at-the-edge/interaction.ts",
          contains: "releaseReplay",
        },
      ],
    },
  ],
};
