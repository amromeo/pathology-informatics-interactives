import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../src/data/curriculum";

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
