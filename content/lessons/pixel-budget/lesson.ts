import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["inside-a-results-journey"],
  slug: "pixel-budget",
  title: "Choosing Image Settings for a Pathology Service",
  topic: 7,
  pierObjectives: ["7.1", "7.2"],
  durationMinutes: 40,
  difficulty: "foundational",
  interactionKinds: ["image-compare", "compression", "storage-calculator"],
  apiSessions: [5],
  hasLocalPracticum: true,
  experience: "pixel-budget",
  pierCoverage: [
    {
      id: "7.1-image-workflow",
      objective: "7.1",

      summary: "Capture, storage, retrieval, viewing; static, live, and whole-slide applications",
      learnerAction:
        "Compare fields, trace image identity and retrieval, and recommend checks for the reporting workflow.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/pixel-budget/interaction.ts",
          contains: "storage",
        },
      ],
    },
    {
      id: "7.2-image-settings",
      objective: "7.2",
      summary: "Formats, resolution, compression, display, and practical storage",
      learnerAction:
        "Inspect identical regions after downsampling and encoding, calculate storage tradeoffs, and reject approval based on extension or size alone.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/pixel-budget/interaction.ts",
          contains: "storage",
        },
      ],
    },
  ],
  id: "19",
  layout: "wide",
  summary: "A pathology service compares image detail, storage and retrieval requirements.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 5",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
    {
      label: "DICOM PS3.3 2026d — whole-slide microscopy",
      url: "https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_A.32.8.html",
      use: "Tiles, frames, resolution layers; see C.8.12.4 for compression history.",
      license: "Primary source; cited and paraphrased. No figures or tables reproduced.",
    },
  ],
  status: "published",
};
