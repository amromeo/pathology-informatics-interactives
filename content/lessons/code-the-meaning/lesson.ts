import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["newborn-screen-to-public-health"],
  slug: "code-the-meaning",
  title: "Why Laboratory Results Need LOINC",
  topic: 5,
  pierObjectives: ["5.3"],
  durationMinutes: 50,
  difficulty: "applied",
  interactionKinds: ["terminology-browser", "mapping-review", "website-lookup", "evidence-review"],
  apiSessions: [4],
  hasLocalPracticum: true,
  experience: "terminology-review",
  id: "15",
  layout: "wide",

  summary:
    "Glucose reports from different laboratories need terminology that preserves their meaning.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 4",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "5.3-code-the-meaning",
      objective: "5.3",
      summary:
        "Compare observation attributes and choose a terminology mapping supported by source records.",
      learnerAction:
        "Compare observation attributes and choose a terminology mapping supported by source records.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/code-the-meaning/interaction.ts",
          contains: "mappingRows",
        },
      ],
    },
  ],
};
