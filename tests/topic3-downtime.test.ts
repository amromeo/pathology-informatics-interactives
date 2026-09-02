import assert from "node:assert/strict";
import test from "node:test";
import {
  applyDecision,
  buildReconciliationRecords,
  initialDowntimeState,
  scoreReconciliation,
  type DowntimeState,
  type LearnerAssignments,
  type ReconciliationRecords,
} from "../content/lessons/twelve-hours-offline/interaction";

const controlledState = (): DowntimeState => {
  let state = initialDowntimeState;
  state = applyDecision(state, "activate", "controlled-id-block");
  state = applyDecision(state, "activate", "defined-command");
  state = applyDecision(state, "operate", "controlled-call-log");
  state = applyDecision(state, "operate", "central-accession-log");
  state = applyDecision(state, "recover", "freeze-and-stage");
  return applyDecision(state, "recover", "compare-before-recollection");
};

const correctAssignments = (records: ReconciliationRecords): LearnerAssignments => ({
  matches: Object.fromEntries(records.paperRecords.map((record) => [record.tempId, record.expectedMrn])),
  actions: Object.fromEntries(records.hazards.map((hazard) => [hazard.id, hazard.correctActionId])),
});

test("the all-controlled path yields the locked baseline reconciliation set", () => {
  const records = buildReconciliationRecords(controlledState());
  assert.equal(records.paperRecords.length, 6);
  assert.equal(records.restoredCharts.length, 6);
  assert.deepEqual(records.paperRecords.map((record) => record.tempId), ["DT-201", "DT-202", "DT-203", "DT-204", "DT-205", "DT-206"]);
  assert.deepEqual(records.hazards.map((hazard) => hazard.id), [
    "duplicate-order-DT-204",
    "missing-critical-DT-202",
    "timestamp-conflict-DT-205",
  ]);
  assert.deepEqual(records.callLogEntries, [{ id: "CL-02", tempId: "DT-202", calledAt: "10:14", recipient: "R. Moore, RN", readBack: true }]);
});

test("uncontrolled temporary identifiers create exactly one duplicate-chart pair", () => {
  const state = applyDecision(controlledState(), "activate", "unit-created-identifiers");
  const records = buildReconciliationRecords(state);
  const duplicateCharts = records.hazards.filter((hazard) => hazard.kind === "duplicate-chart");
  assert.equal(records.paperRecords.length, 6);
  assert.equal(records.restoredCharts.length, 7);
  assert.equal(duplicateCharts.length, 1);
  assert.deepEqual(duplicateCharts[0].relatedIds, ["MRN-410118", "MRN-490118"]);
  assert.equal(records.restoredCharts.find((chart) => chart.mrn === "MRN-490118")?.duplicateOf, "MRN-410118");
});

test("unit-specific critical-result communication removes the potassium call-log entry", () => {
  const state = applyDecision(controlledState(), "operate", "unit-call-methods");
  const records = buildReconciliationRecords(state);
  assert.equal(records.callLogEntries.find((entry) => entry.tempId === "DT-202"), undefined);
  assert.equal(records.hazards.find((hazard) => hazard.id === "missing-critical-DT-202")?.kind, "missing-critical-result");
});

test("reconciliation scoring identifies the unmatched critical result and duplicate order", () => {
  const records = buildReconciliationRecords(controlledState());
  const assignments = correctAssignments(records);
  delete assignments.matches["DT-202"];
  delete assignments.actions["duplicate-order-DT-204"];
  const score = scoreReconciliation(records, assignments);
  assert.equal(score.resolved, score.total - 2);
  assert.ok(score.hazardsMissed.includes("identity-DT-202"));
  assert.ok(score.hazardsMissed.includes("duplicate-order-DT-204"));
});

test("a fully correct reconciliation scores clean", () => {
  const records = buildReconciliationRecords(controlledState());
  const score = scoreReconciliation(records, correctAssignments(records));
  assert.equal(score.resolved, score.total);
  assert.deepEqual(score.hazardsMissed, []);
});

test("downtime state is serializable plain data", () => {
  const state = controlledState();
  const clone = structuredClone(state);
  assert.deepEqual(clone, state);
  assert.notEqual(clone, state);
  assert.deepEqual(JSON.parse(JSON.stringify(state)), state);
});
