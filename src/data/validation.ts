import type { LessonDefinition } from "./types";

export const validationResult = (lesson: LessonDefinition, repairId: string | null) => {
  const cases = lesson.validationCases.map((testCase) => {
    const passed = Boolean(repairId && testCase.passingRepairs.includes(repairId));
    return {
      ...testCase,
      passed,
      failNote: !passed && repairId ? testCase.failNotes?.[repairId] : undefined,
    };
  });
  return { cases, passed: cases.filter((testCase) => testCase.passed).length, total: cases.length };
};
