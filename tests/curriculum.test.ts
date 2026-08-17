import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../src/data/curriculum";
import { validationResult } from "../src/data/validation";

test("the controlled repair passes every lesson validation set", () => {
  for (const lesson of lessons) {
    const result = validationResult(lesson, "validated");
    assert.equal(result.passed, result.total, lesson.manifest.slug);
  }
});

test("unsafe shortcuts fail at least one validation case", () => {
  for (const lesson of lessons) {
    const result = validationResult(lesson, "unsafe");
    assert.ok(result.passed < result.total, lesson.manifest.slug);
  }
});

test("all four pilot interaction patterns are present", () => {
  assert.deepEqual(
    lessons.map((lesson) => lesson.manifest.pilot).filter(Boolean).sort(),
    ["data-quality", "digital-pathology", "downtime", "interoperability"],
  );
});

test("the morning-huddle artifact compares two medians for one defined cohort", () => {
  const lesson = lessons.find((item) => item.manifest.slug === "steward-at-morning-huddle");
  assert.ok(lesson);
  assert.match(lesson.artifactTitle, /receipt-to-verification TAT/);
  assert.deepEqual(
    lesson.evidence.map((item) => item.label),
    [
      "Automated dashboard median",
      "Manual bench-review median",
      "Dashboard rows missing receipt time",
    ],
  );
  assert.equal(lesson.evidence[2].value, "8 of 43 (18.6%)");
});
