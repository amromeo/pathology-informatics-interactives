import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["five-vs-slide-archive", "human-plus-algorithm"],
  slug: "model-under-pressure",
  status: "published",
  experience: "ai-deployment",
  title: "Model Under Pressure",
  topic: 2,
  pierObjectives: ["2.4"],
  durationMinutes: 40,
  difficulty: "applied",
  interactionKinds: ["model-verification", "monitoring"],
  apiSessions: [6],
  hasLocalPracticum: true,
  id: "06",
  layout: "standard",

  summary:
    "A metastasis-detection model misses more small lesions on local slides. Review the scanners, stains and monthly results.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 6",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  pierCoverage: [
    {
      id: "2.4-ai-ml-definitions",
      objective: "2.4",
      summary: "How programmed rules and learned models differ",
      learnerAction:
        "Explain how a model trained on examples differs from a rule written by an analyst.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-supervised-unsupervised",
      objective: "2.4",
      summary: "Supervised and unsupervised learning",
      learnerAction:
        "Identify which proposal learned from labeled slides and which grouped tumors without diagnostic labels.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-cnns-generative-ai",
      objective: "2.4",
      summary: "Convolutional neural networks and generative AI",
      learnerAction:
        "Identify how the image model and generated summary work, then choose what to check first.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-pathology-applications",
      objective: "2.4",
      summary: "Pathology AI/ML applications",
      learnerAction:
        "Identify how each proposed program does its laboratory job, then choose a first check that could reveal mistakes.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-local-verification",
      objective: "2.4",
      summary: "Local verification",
      learnerAction:
        "Check the metastasis-detection model on local slides, separating scanners and small and large lesions.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-generalizability-bias",
      objective: "2.4",
      summary: "Generalizability and bias",
      learnerAction:
        "Find which lesions the model misses when used in a laboratory with different scanners and cases.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-drift-brittleness",
      objective: "2.4",
      summary: "Drift and brittleness",
      learnerAction:
        "Tell a poor result at first local testing from a later decline. Explain how a small image change can affect a brittle model.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-implementation-monitoring",
      objective: "2.4",
      summary: "Starting use and checking later results",
      learnerAction:
        "Choose the procedure assigning slide review and stopping decisions, and identify the records needed to investigate an error or later decline.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
    {
      id: "2.4-ethics-regulation",
      objective: "2.4",
      summary: "Ethical and regulatory considerations",
      learnerAction:
        "Choose the results needed to compare missed metastases across sites and the documents needed to check responsibilities, settings and authorized use.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/model-under-pressure/interaction.ts",
          contains: "proposals",
        },
      ],
    },
  ],
};
