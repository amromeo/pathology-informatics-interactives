import type { LessonManifest } from "../../../src/data/types";
export const manifest: LessonManifest = {
  prerequisites: ["steward-at-morning-huddle"],
  slug: "build-the-new-test",
  title: "Building and Validating a Laboratory Test",
  topic: 8,
  pierObjectives: ["8.1", "8.2", "8.4", "4.2"],
  durationMinutes: 40,
  difficulty: "stewardship",
  interactionKinds: ["test-build", "approval", "regression"],
  apiSessions: [3, 9],
  hasLocalPracticum: true,
  experience: "test-build",
  id: "22",
  layout: "system",

  summary: "A copied test definition produces incorrect reports in several predictable situations.",
  sources: [
    {
      label: "PIER Essentials Release 5",
      url: "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf",
      license: "CC BY-NC-ND 4.0",
      use: "Curriculum alignment only; cases and learner artifacts are original.",
    },
    {
      label: "API Pathology Informatics Introductory Course — sessions 3, 9",
      url: "https://www.pathologyinformatics.org/teaching-slide-sets",
      license: "CC BY 4.0",
      use: "Foundational concepts and terminology, adapted with attribution.",
    },
  ],
  status: "published",
  pierCoverage: [
    {
      id: "8.1-build-the-new-test",
      objective: "8.1",
      summary:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      learnerAction:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/build-the-new-test/interaction.ts",
          contains: "replayBuild",
        },
      ],
    },
    {
      id: "8.2-build-the-new-test",
      objective: "8.2",
      summary:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      learnerAction:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/build-the-new-test/interaction.ts",
          contains: "replayBuild",
        },
      ],
    },
    {
      id: "8.4-build-the-new-test",
      objective: "8.4",
      summary:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      learnerAction:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      primary: true,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/build-the-new-test/interaction.ts",
          contains: "additionalExercises",
        },
      ],
    },
    {
      id: "4.2-build-the-new-test",
      objective: "4.2",
      summary:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      learnerAction:
        "Test complete reports and record configuration versions, approvals and procedure changes.",
      primary: false,
      taughtIn: ["interaction"],
      evidence: [
        {
          file: "content/lessons/build-the-new-test/interaction.ts",
          contains: "replayBuild",
        },
      ],
    },
  ],
};
