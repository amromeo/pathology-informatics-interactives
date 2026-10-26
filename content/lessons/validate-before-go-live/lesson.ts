import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["pixel-budget"],
  slug: "validate-before-go-live",
  title: "Reviewing a Whole-Slide Imaging Validation",
  topic: 7,
  pierObjectives: ["7.1", "7.4"],
  durationMinutes: 45,
  difficulty: "stewardship",
  interactionKinds: [
    "study-review",
    "discordance-investigation",
    "validation-plan",
    "change-review",
  ],
  apiSessions: [5],
  hasLocalPracticum: true,
  experience: "wsi-validation",
  pierCoverage: [
    {
      id: "7.1-intended-applications",
      objective: "7.1",

      summary: "Different evidence needs for fixed tissue, frozen consultation, and remote use",
      learnerAction:
        "Bound the requested scope to the application and system supported by the packet.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/validate-before-go-live/interaction.ts",
          contains: "reviewValidation",
        },
      ],
    },
    {
      id: "7.4-wsi-validation",
      objective: "7.4",
      summary: "Validation guidance, device scope, clinical approval, and change review",
      learnerAction:
        "Build a representative paired comparison, retain and investigate disagreements, recommend an approval boundary, and classify subsequent changes.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/validate-before-go-live/interaction.ts",
          contains: "reviewValidation",
        },
      ],
    },
  ],
  id: "20",
  layout: "wide",
  summary: "A whole-slide imaging proposal extends beyond the evidence in its validation packet.",
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
      label: "CAP 2021 WSI validation guideline update",
      url: "https://www.cap.org/wp-content/uploads/documents/wsi-summary-recommendations.pdf",
      use: "Representative case counts, intraobserver concordance, investigation below 95%, and two-week washout.",
      license: "Primary source; cited and paraphrased. No figures or tables reproduced.",
    },
    {
      label: "FDA DEN160056 decision summary",
      url: "https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN160056.pdf",
      use: "Historical device-specific intended-use example; not labeling for other current devices.",
      license: "Primary source; cited and paraphrased. No figures or tables reproduced.",
    },
  ],
  status: "published",
};
