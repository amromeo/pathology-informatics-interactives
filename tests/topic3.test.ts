import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../src/data/curriculum";
import { validationResult } from "../src/data/validation";

const expectedTopic3Slugs = [
  "server-behind-the-analyzer",
  "twelve-hours-offline",
  "not-anonymous-enough",
];

const topic3Lessons = lessons.filter((lesson) => lesson.manifest.topic === 3);

test("Topic 3 contains the three planned lessons", () => {
  assert.deepEqual(
    topic3Lessons.map((lesson) => lesson.manifest.slug),
    expectedTopic3Slugs,
  );
});

test("each Topic 3 lesson starts with at least three validation cases", () => {
  for (const lesson of topic3Lessons) {
    assert.ok(
      lesson.validationCases.length >= 3,
      `${lesson.manifest.slug} has fewer than three validation cases`,
    );
  }
});

test("each Topic 3 lesson starts with one correct diagnosis and repair", () => {
  for (const lesson of topic3Lessons) {
    assert.equal(
      lesson.decisionChoices.filter((choice) => choice.correct).length,
      1,
      `${lesson.manifest.slug} does not have exactly one correct diagnosis`,
    );
    assert.equal(
      lesson.repairChoices.filter((choice) => choice.correct).length,
      1,
      `${lesson.manifest.slug} does not have exactly one correct repair`,
    );
  }
});

const expectedPassingCases: Record<string, Record<string, string[]>> = {
  "server-behind-the-analyzer": {
    validated: ["Environmental resilience", "Named laboratory access", "Network containment", "Vendor access", "Tested recovery"],
    narrow: ["Environmental resilience"],
    unsafe: ["Vendor access"],
  },
  "twelve-hours-offline": {
    validated: ["Controlled transition", "Temporary identities", "Critical-result documentation", "Duplicate and repeat review", "Complete result inclusion"],
    narrow: ["Critical-result documentation", "Complete result inclusion"],
    unsafe: ["Critical-result documentation"],
  },
  "not-anonymous-enough": {
    validated: ["Minimum necessary fields", "Linkage key control", "Uniqueness-risk review", "Approved recipient and purpose", "Recipient confidentiality commitment"],
    narrow: ["Linkage key control"],
    unsafe: ["Recipient confidentiality commitment"],
  },
};

test("Topic 3 repairs produce the intended partial-credit matrices", () => {
  for (const lesson of topic3Lessons) {
    for (const repairId of ["validated", "narrow", "unsafe"]) {
      const passingCases = validationResult(lesson, repairId).cases
        .filter((testCase) => testCase.passed)
        .map((testCase) => testCase.name);
      assert.deepEqual(passingCases, expectedPassingCases[lesson.manifest.slug][repairId], `${lesson.manifest.slug}:${repairId}`);
    }
  }
});

test("Topic 3 failure results explain the laboratory consequence", () => {
  for (const lesson of topic3Lessons) {
    for (const repair of lesson.repairChoices.filter((choice) => !choice.correct)) {
      for (const testCase of validationResult(lesson, repair.id).cases.filter((item) => !item.passed)) {
        assert.ok(testCase.failNote?.trim(), `${lesson.manifest.slug}:${repair.id}:${testCase.name}`);
      }
    }
  }
});

test("Topic 3 Phase 1 metadata describes the generic experience honestly", () => {
  const expectedInteractionKinds: Record<string, string[]> = {
    "server-behind-the-analyzer": ["evidence-review", "system-trace", "guided-decision", "regression-checks"],
    "twelve-hours-offline": ["staged-tabletop", "evidence-review", "system-trace", "guided-decision", "regression-checks"],
    "not-anonymous-enough": ["evidence-review", "system-trace", "guided-decision", "regression-checks"],
  };
  for (const lesson of topic3Lessons) {
    assert.equal(lesson.manifest.durationMinutes, 12, lesson.manifest.slug);
    assert.deepEqual(lesson.manifest.interactionKinds, expectedInteractionKinds[lesson.manifest.slug], lesson.manifest.slug);
    assert.equal(lesson.manifest.hasLocalPracticum, true, lesson.manifest.slug);
  }
});
