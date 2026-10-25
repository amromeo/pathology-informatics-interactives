import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["steward-at-morning-huddle"],
  slug: "can-we-trust-this-report",
  title: "Can We Trust This Report?",
  topic: 2,
  pierObjectives: ["2.1", "1.2"],
  durationMinutes: 32,
  difficulty: "foundational",
  interactionKinds: [
    "source-comparison",
    "data-flow",
    "data-quality-audit",
    "report-table",
    "metric-repair",
    "regression",
  ],
  apiSessions: [0, 2],
  hasLocalPracticum: true,
  experience: "data-quality",
  pierCoverage: [
    {
      id: "2.1-data-representation",
      objective: "2.1",

      summary: "Structured and unstructured laboratory data",
      learnerAction:
        "Compare a blank structured LIS field with an accession time visible on a scanned requisition.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-trust-this-report/interaction.ts",
          contains: "qualityChecks",
        },
      ],
    },
    {
      id: "2.1-data-quality",
      objective: "2.1",
      summary:
        "Accuracy, completeness, validity, consistency, uniqueness, timeliness, and fitness for purpose",
      learnerAction:
        "Match seven checks on the surgical pathology dataset to the appropriate data-quality dimensions.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-trust-this-report/interaction.ts",
          contains: "qualityChecks",
        },
      ],
    },
    {
      id: "2.1-data-flow",
      objective: "2.1",
      summary: "Data flow from creation to use",
      learnerAction:
        "Trace the case from accessioning through the LIS export and spreadsheet to the quality meeting.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-trust-this-report/interaction.ts",
          contains: "qualityChecks",
        },
      ],
    },
    {
      id: "2.1-pathology-data-science",
      objective: "2.1",
      summary: "Examples of data science in pathology",
      learnerAction:
        "Relate the TAT case to statistical analysis, linked clinical data, image analysis, and AI/ML.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-trust-this-report/interaction.ts",
          contains: "qualityChecks",
        },
      ],
    },
    {
      id: "1.2-can-we-trust-this-report",
      objective: "1.2",
      summary:
        "Match data-quality checks, recover accession times and compare all three reporting periods.",
      learnerAction:
        "Match data-quality checks, recover accession times and compare all three reporting periods.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-trust-this-report/interaction.ts",
          contains: "qualityChecks",
        },
      ],
    },
  ],
  id: "03",
  layout: "standard",
  summary:
    "A turnaround-time report spans an information-system change and missing accession times.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 0, 2",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
    {
      label: "UK Government Data Quality Framework",
      url: "https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework",
      license: "Open Government Licence v3.0; cited and adapted",
      use: "Formal definitions for accuracy, completeness, consistency, timeliness, validity, and uniqueness, followed by original surgical pathology examples.",
    },
  ],
  status: "published",
};
