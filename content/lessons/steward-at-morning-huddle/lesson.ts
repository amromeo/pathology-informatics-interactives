import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: [],
  slug: "steward-at-morning-huddle",
  title: "Who Does What in Laboratory Informatics?",
  topic: 1,
  pierObjectives: ["1.1", "1.2", "1.3", "8.1"],
  durationMinutes: 22,
  difficulty: "foundational",
  interactionKinds: ["field-map", "role-assignment", "support-ticket-triage", "go-live-decision"],
  apiSessions: [0, 3, 9],
  hasLocalPracticum: true,
  experience: "orientation",
  id: "01",
  layout: "standard",

  summary:
    "A new troponin assay is due to start Monday, but the chart report and bench preparation are unfinished.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 0, 3, 9",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
    {
      label: "Henricks et al. — Pathologists as Stewards of Laboratory Information",
      url: "https://pubmed.ncbi.nlm.nih.gov/25724030/",
      license: "Copyright © Archives of Pathology & Laboratory Medicine; cited and summarized",
      use: "Supports the pathologist's stewardship role for laboratory information throughout the health system, including systems outside direct laboratory control.",
    },
    {
      label:
        "CAP — Don't Forget Your Rules When Harmonizing Laboratory Testing Across Multiple Sites",
      url: "https://www.cap.org/member-resources/clinical-informatics-resources/dont-forget-your-rules-when-harmonizing-laboratory-testing-across-multiple-sites",
      license: "Copyright © College of American Pathologists; cited and summarized",
      use: "Identifies GEN.48500 and supports the laboratory's responsibility to verify accurate transmission of patient results into the EHR. No CAP text is reproduced.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "1.1-steward-at-morning-huddle",
      objective: "1.1",
      summary:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      learnerAction:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/steward-at-morning-huddle/interaction.ts",
          contains: "orientationTasks",
        },
      ],
    },
    {
      id: "1.2-steward-at-morning-huddle",
      objective: "1.2",
      summary:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      learnerAction:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/steward-at-morning-huddle/interaction.ts",
          contains: "orientationTasks",
        },
      ],
    },
    {
      id: "1.3-steward-at-morning-huddle",
      objective: "1.3",
      summary:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      learnerAction:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/steward-at-morning-huddle/interaction.ts",
          contains: "orientationTasks",
        },
      ],
    },
    {
      id: "8.1-steward-at-morning-huddle",
      objective: "8.1",
      summary:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      learnerAction:
        "Assign the test build and report review to the right people, then decide whether Monday's start should wait.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/steward-at-morning-huddle/interaction.ts",
          contains: "orientationTasks",
        },
      ],
    },
  ],
};
