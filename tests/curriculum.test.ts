import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../src/data/curriculum";
import { validationResult } from "../src/data/validation";
import { orientationTasks, orientationViews } from "../content/lessons/steward-at-morning-huddle/interaction";

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

test("lesson 1 teaches the Topic 1 role and ownership boundaries", () => {
  const lesson = lessons.find((item) => item.manifest.slug === "steward-at-morning-huddle");
  assert.ok(lesson);
  assert.equal(lesson.manifest.title, "Who Needs to Be at the Table?");
  assert.deepEqual(lesson.manifest.pierObjectives, ["1.1", "1.2", "1.3"]);
  assert.match(lesson.artifactTitle, /troponin go-live/i);
  assert.match(lesson.trace.map((step) => `${step.system} ${step.role} ${step.sees} ${step.implication}`).join(" "), /clinical informatics/i);
  assert.match(lesson.trace.map((step) => `${step.system} ${step.role} ${step.sees} ${step.implication}`).join(" "), /laboratory owns the report/i);
  assert.equal(orientationTasks.find((task) => task.id === "report")?.owner, "laboratory");
  assert.equal(orientationTasks.find((task) => task.id === "result-design")?.owner, "pathology-informatics");
  assert.match(orientationTasks.find((task) => task.id === "result-design")?.explanation ?? "", /across sections/i);
  assert.equal(orientationTasks.find((task) => task.id === "cds")?.owner, "shared-cds");
  assert.match(orientationTasks.find((task) => task.id === "cds")?.explanation ?? "", /scope of pathology informatics/i);
  assert.deepEqual(orientationViews.map((view) => view.answer), ["specimen", "patient", "both"]);
});
