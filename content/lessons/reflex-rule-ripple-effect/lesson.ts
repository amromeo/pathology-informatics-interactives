import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["autoverification-at-the-edge"],
  slug: "reflex-rule-ripple-effect",
  title: "Updating a Thyroid Reflex Rule",
  topic: 4,
  pierObjectives: ["4.3", "4.5", "4.2", "8.2"],
  durationMinutes: 30,
  difficulty: "applied",
  interactionKinds: ["rule-map", "order-replay", "utilization", "change-review"],
  apiSessions: [3, 7, 9],
  hasLocalPracticum: true,
  experience: "reflex-rule",
  id: "12",
  layout: "standard",

  summary: "A thyroid assay change affects reflex orders and related records.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 3, 7, 9",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "4.3-reflex-rule-ripple-effect",
      objective: "4.3",
      summary:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      learnerAction:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/reflex-rule-ripple-effect/interaction.ts",
          contains: "Reflex",
        },
      ],
    },
    {
      id: "4.5-reflex-rule-ripple-effect",
      objective: "4.5",
      summary:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      learnerAction:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/reflex-rule-ripple-effect/interaction.ts",
          contains: "Reflex",
        },
      ],
    },
    {
      id: "4.2-reflex-rule-ripple-effect",
      objective: "4.2",
      summary:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      learnerAction:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/reflex-rule-ripple-effect/interaction.ts",
          contains: "Reflex",
        },
      ],
    },
    {
      id: "8.2-reflex-rule-ripple-effect",
      objective: "8.2",
      summary:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      learnerAction:
        "Repair reflex conditions and choose a denominator that captures missing and unnecessary tests.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/reflex-rule-ripple-effect/interaction.ts",
          contains: "Reflex",
        },
      ],
    },
  ],
};
