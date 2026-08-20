import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../src/data/curriculum";
import { validationResult } from "../src/data/validation";
import { orientationTasks, orientationTickets } from "../content/lessons/steward-at-morning-huddle/interaction";
import { connectionChoices, evidenceViews, pathwayNodes, pathwayOrder, repairChoices, validationCases } from "../content/lessons/inside-a-results-journey/interaction";

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
  assert.equal(lesson.manifest.title, "Who Does What in Laboratory Informatics?");
  assert.deepEqual(lesson.manifest.pierObjectives, ["1.1", "1.2", "1.3"]);
  assert.match(lesson.artifactTitle, /troponin go-live/i);
  assert.match(lesson.trace.map((step) => `${step.system} ${step.role} ${step.sees} ${step.implication}`).join(" "), /clinical informatics/i);
  assert.match(lesson.trace.map((step) => `${step.system} ${step.role} ${step.sees} ${step.implication}`).join(" "), /laboratory owns the complete result report/i);
  assert.equal(orientationTasks.find((task) => task.id === "lis-build")?.owner, "lis-team");
  assert.match(orientationTasks.find((task) => task.id === "lis-build")?.explanation ?? "", /technical build/i);
  assert.equal(orientationTasks.find((task) => task.id === "report")?.owner, "laboratory");
  assert.equal(orientationTasks.find((task) => task.id === "result-design")?.owner, "pathology-informatics");
  assert.match(orientationTasks.find((task) => task.id === "result-design")?.explanation ?? "", /across the laboratory/i);
  assert.equal(orientationTasks.find((task) => task.id === "cds")?.owner, "shared-cds");
  assert.match(orientationTasks.find((task) => task.id === "cds")?.explanation ?? "", /not cleanly divided/i);
  assert.deepEqual(orientationTickets.map((ticket) => ticket.answer), ["laboratory", "pathology-informatics", "clinical-informatics"]);
});

test("lesson 2 covers PIER 1.4 through an observable result-reporting investigation", () => {
  const lesson = lessons.find((item) => item.manifest.slug === "inside-a-results-journey");
  assert.ok(lesson);
  assert.equal(lesson.manifest.title, "The Missing CBC");
  assert.deepEqual(lesson.manifest.pierObjectives, ["1.4"]);
  assert.deepEqual(pathwayOrder, ["analyzer", "lis", "interface", "network", "ehr"]);
  assert.notDeepEqual(pathwayNodes.map((node) => node.id), pathwayOrder);
  const interfaceEvidence = evidenceViews.find((view) => view.id === "interface");
  assert.ok(interfaceEvidence);
  assert.deepEqual(interfaceEvidence.fields.find((field) => field.label === "Outbound queue"), { label: "Outbound queue", value: "214 results", tone: "critical" });
  assert.equal(connectionChoices.find((choice) => choice.correct)?.id, "interface-ehr");
  assert.equal(repairChoices.find((choice) => choice.correct)?.id, "restore-firewall");
  assert.deepEqual(validationCases.map((item) => item.id), ["original", "queue", "new-cbc", "other-section", "downtime"]);
});
