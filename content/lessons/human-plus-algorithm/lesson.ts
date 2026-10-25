import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["can-we-accept-this-lot", "validate-before-go-live"],
  slug: "human-plus-algorithm",
  title: "Reviewing a Mitosis Detection Tool",
  topic: 7,
  pierObjectives: ["7.3", "2.4"],
  durationMinutes: 40,
  difficulty: "stewardship",
  interactionKinds: ["threshold", "human-factors", "monitoring"],
  apiSessions: [5, 6],
  hasLocalPracticum: true,
  experience: "mitosis-review",
  pierCoverage: [
    {
      id: "7.3-image-analysis",
      objective: "7.3",

      summary: "Processing, detection, counting, diagnosis versus prognosis, and productivity",
      learnerAction:
        "Change an inclusive threshold, inspect false marks and misses, compare final reader performance, and build monitoring.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/human-plus-algorithm/interaction.ts",
          contains: "performance",
        },
      ],
    },
    {
      id: "2.4-image-ai",
      objective: "2.4",
      summary: "Independent testing, case mix, human factors, and oversight",
      learnerAction:
        "Separate candidate metrics from final reader outcomes and investigate site-specific monitoring findings.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/human-plus-algorithm/interaction.ts",
          contains: "performance",
        },
      ],
    },
  ],
  id: "21",
  layout: "wide",
  summary: "A mitosis detector changes the number of marks readers must inspect.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 5, 6",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
    {
      label: "FDA diagnostic-test statistical guidance",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/statistical-guidance-reporting-results-studies-evaluating-diagnostic-tests-guidance-industry-and-fda",
      use: "Reference standards, sensitivity, specificity, and study population.",
      license: "Primary source; cited and paraphrased. No figures or tables reproduced.",
    },
    {
      label: "IMDRF GMLP N88 FINAL:2025",
      url: "https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles",
      use: "Independent evaluation, representative data, human–AI performance, and monitoring.",
      license: "Primary source; cited and paraphrased. No figures or tables reproduced.",
    },
  ],
  status: "published",
};
