import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["where-is-the-specimen"],
  slug: "five-rights-right-test",
  title: "Designing Repeat-Test Guidance",
  topic: 6,
  pierObjectives: ["6.1", "6.2", "4.2"],
  durationMinutes: 35,
  difficulty: "applied",
  interactionKinds: ["workflow-map", "cds-builder"],
  apiSessions: [7],
  hasLocalPracticum: true,
  experience: "cds-design",
  id: "17",
  layout: "wide",

  summary: "A repeat-test message reaches the wrong person after the order is signed.",
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
      id: "6.1-five-rights-right-test",
      objective: "6.1",
      summary: "Configure repeat-test guidance and classify six decision-support applications.",
      learnerAction:
        "Configure repeat-test guidance and classify six decision-support applications.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/five-rights-right-test/interaction.ts",
          contains: "cdsControls",
        },
      ],
    },
    {
      id: "6.2-five-rights-right-test",
      objective: "6.2",
      summary: "Configure repeat-test guidance and classify six decision-support applications.",
      learnerAction:
        "Configure repeat-test guidance and classify six decision-support applications.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/five-rights-right-test/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
    {
      id: "4.2-five-rights-right-test",
      objective: "4.2",
      summary: "Configure repeat-test guidance and classify six decision-support applications.",
      learnerAction:
        "Configure repeat-test guidance and classify six decision-support applications.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/five-rights-right-test/interaction.ts",
          contains: "cdsControls",
        },
      ],
    },
  ],
};
