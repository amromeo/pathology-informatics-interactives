import test from "node:test";
import React from "react";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  cdsReplay,
  originalCds,
  reviewedCds,
  cdsOutcome,
  orderCases,
} from "../content/lessons/five-rights-right-test/interaction";
import {
  alertReplay,
  originalAlert,
  reviewedAlert,
  pilotComparison,
  pilotWeeks,
} from "../content/lessons/alert-everyone-ignores/interaction";
import { CdsDesignExperience } from "../src/components/CdsDesignExperience";
import { AlertEvaluationExperience } from "../src/components/AlertEvaluationExperience";

test("original guidance preserves absent history but fails delivery and recipient checks", () => {
  assert.deepEqual(
    cdsReplay(originalCds)
      .filter((row) => row.pass)
      .map((row) => row.id),
    ["CD-03", "CD-04", "CD-06"],
  );
  assert.ok(cdsReplay(reviewedCds).every((row) => row.pass));
});
test("CDS review window includes the exact boundary and excludes unusable results", () => {
  const results = cdsReplay(reviewedCds);
  assert.equal(results.find((row) => row.id === "CD-08")?.shown, true);
  assert.equal(results.find((row) => row.id === "CD-04")?.shown, false);
  assert.equal(results.find((row) => row.id === "CD-06")?.shown, false);
  assert.match(results.find((row) => row.id === "CD-07")!.note, /pending order/);
});
test("hard stops violate discretion while an interrupting continue option preserves it", () => {
  const exception = orderCases.find((row) => row.id === "CD-05")!;
  assert.equal(cdsOutcome({ ...reviewedCds, format: "hard" }, exception).blocked, true);
  assert.equal(cdsOutcome({ ...reviewedCds, format: "hard" }, exception).pass, false);
  assert.equal(cdsOutcome({ ...reviewedCds, format: "soft" }, exception).pass, true);
});
test("each five-rights regression detects the corresponding defect", () => {
  for (const key of ["person", "information", "channel", "timing"] as const) {
    assert.ok(
      cdsReplay({ ...reviewedCds, [key]: originalCds[key] }).some((row) => !row.pass),
      key,
    );
  }
});
test("targeting and deduplication retain a new decision for the same patient", () => {
  const events = alertReplay(reviewedAlert);
  assert.deepEqual(
    events.filter((row) => row.shown).map((row) => row.id),
    ["E01", "E07", "E08", "E10"],
  );
  assert.equal(events.filter((row) => row.interrupt).length, 0);
  assert.equal(alertReplay(originalAlert).filter((row) => row.shown).length, 10);
  assert.equal(
    alertReplay({ ...reviewedAlert, frequency: "every" }).filter((row) => row.shown).length,
    6,
  );
});
test("hard stops expose documented-exception harm even after targeting improves", () => {
  const events = alertReplay({ ...reviewedAlert, format: "hard" });
  assert.deepEqual(
    events.filter((row) => row.blocked).map((row) => row.id),
    ["E08", "E10"],
  );
  assert.equal(events.filter((row) => row.interrupt).length, 4);
});
test("changing recipients and targeting have independently observable effects", () => {
  assert.equal(
    alertReplay({ ...reviewedAlert, target: "all" }).filter((row) => row.shown).length,
    7,
  );
  const all = alertReplay({ ...reviewedAlert, person: "all", frequency: "every" });
  assert.equal(all.find((row) => row.id === "E03")?.shown, true);
});
test("ward comparison uses pooled decision denominators and both period changes", () => {
  assert.equal(
    pilotWeeks.reduce((n, row) => n + row.denominator, 0),
    4000,
  );
  assert.deepEqual(pilotComparison(true), {
    before: 80,
    after: 40,
    change: -40,
    comparisonChange: -10,
    adjusted: -30,
  });
  assert.equal(pilotComparison(false).adjusted, null);
});
test("bespoke experiences render named controls and distinguish replay from observed outcomes", () => {
  const design = renderToStaticMarkup(<CdsDesignExperience />);
  assert.match(design, /Person receiving guidance/);
  assert.match(design, /Run eight encounter checks/);
  const evaluation = renderToStaticMarkup(<AlertEvaluationExperience />);
  assert.match(evaluation, /Comparison included/);
  assert.match(evaluation, /not estimated monthly effects or clinical outcomes/);
  assert.match(evaluation, /Delayed indicated tests and missed testing/);
});
