import type { LessonDefinition } from "./types";

export const validationResult = (lesson: LessonDefinition, repairId: string | null) => {
  const cases = lesson.validationCases.map((testCase) => ({
    ...testCase,
    passed: Boolean(repairId && testCase.passingRepairs.includes(repairId)),
  }));
  return { cases, passed: cases.filter((testCase) => testCase.passed).length, total: cases.length };
};
