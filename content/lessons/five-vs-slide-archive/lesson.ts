import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["can-we-trust-this-report", "pixel-budget"],
  slug: "five-vs-slide-archive",
  status: "published",
  experience: "multimodal",
  title: "Five Vs in the Slide Archive",
  topic: 2,
  pierObjectives: ["2.3"],
  durationMinutes: 30,
  difficulty: "applied",
  interactionKinds: ["capacity-planning", "data-flow"],
  apiSessions: [2, 5],
  hasLocalPracticum: true,
  id: "05",
  layout: "standard",

  summary:
    "A tumor-board view combines slide images, protein staining, genomic findings and staging.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 2, 5",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  pierCoverage: [
    {
      id: "2.3-five-vs",
      objective: "2.3",
      summary: "Volume, velocity, variety, veracity, and value",
      learnerAction: "Apply all five Vs to a multimodal lung-cancer dataset.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/five-vs-slide-archive/interaction.ts",
          contains: "archiveQuestions",
        },
      ],
    },
    {
      id: "2.3-multimodal-sources",
      objective: "2.3",
      summary: "Imaging, genomic, pathology, and EHR data",
      learnerAction:
        "Identify the patient-, specimen-, block-, and case-level links needed across a report, WSI, PD-L1 result, genomic findings, and EHR information.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/five-vs-slide-archive/interaction.ts",
          contains: "archiveQuestions",
        },
      ],
    },
    {
      id: "2.3-pathology-integration",
      objective: "2.3",
      summary: "Integration into pathology practice",
      learnerAction:
        "Repair mismatched links and decide whether the combined tumor-board view is safe to present.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/five-vs-slide-archive/interaction.ts",
          contains: "archiveQuestions",
        },
      ],
    },
  ],
};
