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

  summary: "A metastasis detector performs differently on local scanners and small lesions.",
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
      summary: "Artificial intelligence and machine learning definitions",
      learnerAction: "Distinguish an AI/ML system from a conventional programmed laboratory rule.",
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
        "Classify supervised image detection and unsupervised molecular clustering proposals correctly.",
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
        "Identify the model type and principal review need in a CNN proposal and a generative tumor-board summary proposal.",
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
        "Recommend proceed, revise, or decline for four proposed pathology uses and explain the laboratory problem each tool is meant to address.",
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
        "Test a metastasis second-review model on local slides, scanners, and clinically important subgroups.",
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
        "Identify a subgroup failure after transfer to a laboratory with a different scanner and case mix.",
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
        "Distinguish an initial generalizability failure from a later change in performance and identify brittle behavior.",
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
      summary: "Implementation and monitoring",
      learnerAction:
        "Define intended use, human review, acceptance criteria, change review, and post-deployment performance checks.",
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
        "Identify patient-safety, equity, accountability, documentation, and regulatory questions before deployment.",
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
