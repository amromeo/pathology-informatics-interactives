import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["inside-a-results-journey"],
  slug: "server-behind-the-analyzer",
  title: "The Server Behind the Analyzer",
  topic: 3,
  pierObjectives: ["3.1", "3.2"],
  durationMinutes: 25,
  difficulty: "applied",
  interactionKinds: ["threat-model", "control-builder", "stress-test"],
  apiSessions: [8],
  hasLocalPracticum: true,
  experience: "security-review",
  id: "07",
  layout: "standard",

  summary: "A new laboratory middleware server has problems with its room, logins and backups.",
  sources: [
    {
      label: "HHS — Security Rule summary",
      url: "https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html",
      license: "United States government guidance; cited and paraphrased",
      use: "Current safeguard and risk-analysis obligations; proposed changes are separate.",
    },
    {
      label: "HHS — Business associates",
      url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html",
      license: "United States government guidance; cited and paraphrased",
      use: "Vendor handling of PHI and business associate agreements.",
    },
    {
      label: "HHS — Breach Notification Rule",
      url: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html",
      license: "United States government guidance; cited and paraphrased",
      use: "Breach assessment and notification distinctions in faculty discussion.",
    },
    {
      label: "HHS — Part 2 final rule fact sheet",
      url: "https://www.hhs.gov/hipaa/for-professionals/regulatory-initiatives/fact-sheet-42-cfr-part-2-final-rule/index.html",
      license: "United States government guidance; cited and paraphrased",
      use: "Applicability and February 2026 compliance context.",
    },
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — session 8",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "3.1-server-behind-the-analyzer",
      objective: "3.1",
      summary:
        "Match each threat to a fix, test a set of fixes and match each finding to the review it needs.",
      learnerAction:
        "Match each threat to a fix, test a set of fixes and match each finding to the review it needs.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/server-behind-the-analyzer/interaction.ts",
          contains: "securityFindings",
        },
      ],
    },
    {
      id: "3.2-server-behind-the-analyzer",
      objective: "3.2",
      summary:
        "Match each threat to a fix, test a set of fixes and match each finding to the review it needs.",
      learnerAction:
        "Match each threat to a fix, test a set of fixes and match each finding to the review it needs.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/server-behind-the-analyzer/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
  ],
};
