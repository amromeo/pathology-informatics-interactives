import assert from "node:assert/strict";
import test from "node:test";
import {
  confidenceIntervalPasses,
  decisionResults,
  decisionSummary,
  elevatedRangePasses,
  elevatedResults,
  finalChoices,
  lotResults,
  lowRangePasses,
  testScenarios,
  veryLowResults,
} from "../content/lessons/can-we-accept-this-lot/interaction";

test("the lot-comparison worksheet contains the planned paired specimens", () => {
  assert.equal(lotResults.length, 30);
  assert.equal(new Set(lotResults.map((row) => row.specimenId)).size, 30);
  assert.equal(veryLowResults.length, 6);
  assert.equal(decisionResults.length, 18);
  assert.equal(elevatedResults.length, 6);
  for (const row of lotResults) assert.equal(row.difference, Number((row.newLot - row.currentLot).toFixed(1)));
});

test("the primary paired-result statistics reproduce the lesson values", () => {
  assert.equal(decisionSummary.specimens, 18);
  assert.equal(Number(decisionSummary.mean.toFixed(1)), 1.2);
  assert.equal(Number(decisionSummary.median.toFixed(1)), 0.8);
  assert.equal(Number(decisionSummary.standardDeviation.toFixed(1)), 1.2);
  assert.equal(Number(decisionSummary.confidenceLow.toFixed(1)), 0.6);
  assert.equal(Number(decisionSummary.confidenceHigh.toFixed(1)), 1.8);
  assert.ok(decisionSummary.tStatistic > 4.2 && decisionSummary.tStatistic < 4.3);
  assert.equal(decisionSummary.pDisplay, "< 0.001");
});

test("all three concentration-range checks support the controlled decision", () => {
  assert.equal(lowRangePasses, true);
  assert.equal(elevatedRangePasses, true);
  assert.equal(confidenceIntervalPasses, true);
  assert.equal(finalChoices.filter((choice) => choice.correct).map((choice) => choice.id).join(), "accept-monitor");
});

test("the common-test exercise includes the five planned statistical choices", () => {
  assert.deepEqual(testScenarios.map((scenario) => scenario.answer), [
    "paired-t",
    "wilcoxon",
    "independent-t",
    "anova",
    "fisher",
  ]);
});
