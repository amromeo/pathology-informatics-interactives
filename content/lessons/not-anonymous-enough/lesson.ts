import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["server-behind-the-analyzer"],
  slug: "not-anonymous-enough",
  title: "Not Anonymous Enough",
  topic: 3,
  pierObjectives: ["3.2", "3.4"],
  durationMinutes: 25,
  difficulty: "applied",
  interactionKinds: ["reidentification-attempt", "redaction-workbench", "release-decision"],
  apiSessions: [8],
  hasLocalPracticum: true,
  experience: "privacy",
  id: "09",
  layout: "standard",

  summary: "A research export still contains combinations of fields that identify small groups.",
  sources: [
    {
      label: "45 CFR 164.514 — Deidentification and limited data sets",
      url: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514",
      license: "United States government guidance; cited and paraphrased",
      use: "Conditions for deidentification, retained codes and limited data sets.",
    },
    {
      label: "HHS — HIPAA and research",
      url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/research/index.html",
      license: "United States government guidance; cited and paraphrased",
      use: "Research disclosure pathways and limited data use agreements.",
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
    {
      label:
        "HHS Office for Civil Rights — Guidance Regarding Methods for De-identification of Protected Health Information",
      url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html",
      license: "United States government guidance; cited and paraphrased",
      use: "Supports the distinction between the HIPAA Safe Harbor and Expert Determination methods and the treatment of a reidentification mechanism.",
    },
    {
      label: "HHS Office for Civil Rights — HIPAA Audit Protocol: Limited Data Set",
      url: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/audit/protocol/index.html",
      license: "United States government guidance; cited and paraphrased",
      use: "Supports the limited-data-set requirements for an eligible purpose, appropriate recipient, and data use agreement.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "3.2-not-anonymous-enough",
      objective: "3.2",
      summary:
        "Compare field combinations and transformations, then choose a governed release pathway.",
      learnerAction:
        "Compare field combinations and transformations, then choose a governed release pathway.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/not-anonymous-enough/interaction.ts",
          contains: "minGroupSize",
        },
      ],
    },
    {
      id: "3.4-not-anonymous-enough",
      objective: "3.4",
      summary:
        "Compare field combinations and transformations, then choose a governed release pathway.",
      learnerAction:
        "Compare field combinations and transformations, then choose a governed release pathway.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/not-anonymous-enough/interaction.ts",
          contains: "minGroupSize",
        },
      ],
    },
  ],
};
