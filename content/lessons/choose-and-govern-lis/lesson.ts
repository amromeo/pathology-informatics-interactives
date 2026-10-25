import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["build-the-new-test"],
  slug: "choose-and-govern-lis",
  title: "Selecting and Maintaining a Laboratory Information System",
  topic: 8,
  pierObjectives: ["8.3", "8.4"],
  durationMinutes: 40,
  difficulty: "stewardship",
  interactionKinds: ["requirements", "selection-matrix", "lifecycle"],
  apiSessions: [3, 9],
  hasLocalPracticum: true,
  experience: "lis-selection",
  id: "23",
  layout: "system",

  summary: "A laboratory selects a system using verified requirements and plans its maintenance.",
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
  ],
  status: "published",
  pierCoverage: [
    {
      id: "8.3-choose-and-govern-lis",
      objective: "8.3",
      summary:
        "Separate mandatory evidence from preference scores and choose lifecycle responsibilities.",
      learnerAction:
        "Separate mandatory evidence from preference scores and choose lifecycle responsibilities.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/choose-and-govern-lis/interaction.ts",
          contains: "vendorSummary",
        },
      ],
    },
    {
      id: "8.4-choose-and-govern-lis",
      objective: "8.4",
      summary:
        "Separate mandatory evidence from preference scores and choose lifecycle responsibilities.",
      learnerAction:
        "Separate mandatory evidence from preference scores and choose lifecycle responsibilities.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/choose-and-govern-lis/interaction.ts",
          contains: "vendorSummary",
        },
      ],
    },
  ],
};
