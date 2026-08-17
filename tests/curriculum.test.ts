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
