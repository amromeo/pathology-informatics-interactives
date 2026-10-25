import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["can-we-trust-this-report"],
  slug: "can-we-accept-this-lot",
  title: "Can We Accept This Lot?",
  topic: 2,
  pierObjectives: ["2.2"],
  durationMinutes: 32,
  difficulty: "applied",
  interactionKinds: [
    "paired-results",
    "distribution",
    "descriptive-statistics",
    "confidence-interval",
    "hypothesis-test",
    "test-selection",
    "lot-decision",
  ],
  apiSessions: [0, 2],
  hasLocalPracticum: true,
  experience: "statistics",
  pierCoverage: [
    {
      id: "2.2-central-tendency",
      objective: "2.2",

      summary: "Mean and median",
      learnerAction:
        "Compare the mean and median of paired troponin lot differences and explain what each shows.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-accept-this-lot/interaction.ts",
          contains: "testScenarios",
        },
      ],
    },
    {
      id: "2.2-dispersion",
      objective: "2.2",
      summary: "Standard deviation and distributions",
      learnerAction: "Inspect the spread, shape, and outliers in a paired reagent-lot comparison.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-accept-this-lot/interaction.ts",
          contains: "testScenarios",
        },
      ],
    },
    {
      id: "2.2-confidence-intervals",
      objective: "2.2",
      summary: "Confidence intervals",
      learnerAction:
        "Interpret the confidence interval for the observed lot difference against a medical acceptance limit.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-accept-this-lot/interaction.ts",
          contains: "testScenarios",
        },
      ],
    },
    {
      id: "2.2-hypothesis-testing",
      objective: "2.2",
      summary: "Hypothesis testing and p-values",
      learnerAction:
        "Explain what the p-value answers and why it does not by itself determine lot acceptance.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-accept-this-lot/interaction.ts",
          contains: "testScenarios",
        },
      ],
    },
    {
      id: "2.2-test-selection",
      objective: "2.2",
      summary: "Common statistical tests",
      learnerAction: "Choose a suitable test for five common pathology research questions.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/can-we-accept-this-lot/interaction.ts",
          contains: "testScenarios",
        },
      ],
    },
  ],
  id: "04",
  layout: "standard",
  summary: "A new troponin reagent lot produces small paired differences that need medical review.",
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
      label: "CLSI EP26 — User Evaluation of Acceptability of a Reagent Lot Change",
      url: "https://clsi.org/shop/standards/ep26/",
      license: "Copyright © Clinical and Laboratory Standards Institute; cited and summarized",
      use: "Supports use of patient samples, criteria established before testing, and medical review when evaluating a reagent-lot change. This lesson is not a complete EP26 procedure.",
    },
    {
      label: "NIST/SEMATECH e-Handbook of Statistical Methods",
      url: "https://www.itl.nist.gov/div898/handbook/",
      license: "United States government resource; cited and summarized",
      use: "Supports the explanations of paired observations, descriptive statistics, confidence intervals, hypothesis tests, and common test selection.",
    },
  ],
  status: "published",
};
