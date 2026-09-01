import assert from "node:assert/strict";
import test from "node:test";
import {
  baselineRows,
  cutoverRows,
  fairPostRows,
  originalPostRows,
  reportRows,
  reportSummaries,
  stabilizedRows,
  weeklyTat,
  workingDaysBetween,
} from "../content/lessons/can-we-trust-this-report/interaction";

test("lesson 3 contains the complete synthetic report", () => {
  assert.equal(reportRows.length, 455);
  assert.equal(baselineRows.length, 210);
  assert.equal(cutoverRows.length, 35);
  assert.equal(stabilizedRows.length, 210);
  assert.equal(cutoverRows.filter((row) => !row.structuredAccessionAt).length, 27);
  assert.equal(cutoverRows.filter((row) => row.currentPostIncluded).length, 35);
  assert.equal(new Set(reportRows.map((row) => row.accessionId)).size, 455);
});

test("the two-period and three-period reports calculate the intended summaries", () => {
  assert.equal(originalPostRows.length, 245);
  assert.equal(fairPostRows.length, 210);
  assert.equal(reportSummaries.baseline.mean.toFixed(1), "3.3");
  assert.equal(reportSummaries.baseline.median.toFixed(1), "2.7");
  assert.equal(reportSummaries.originalPost.mean.toFixed(1), "3.8");
  assert.equal(reportSummaries.originalPost.median.toFixed(1), "2.5");
  assert.equal(reportSummaries.cutover.mean.toFixed(1), "8.4");
  assert.equal(reportSummaries.cutover.median.toFixed(1), "9.5");
  assert.equal(reportSummaries.fairPost.mean.toFixed(1), "3.0");
  assert.equal(reportSummaries.fairPost.median.toFixed(1), "2.5");
});

test("the revised report separates cutover and preserves one row per eligible case", () => {
  assert.ok(fairPostRows.every((row) => row.period === "stabilized"));
  assert.ok(reportRows.every((row) => row.eligible));
  assert.equal(fairPostRows.filter((row) => row.amended).length, new Set(fairPostRows.filter((row) => row.amended).map((row) => row.accessionId)).size);
  assert.ok(fairPostRows.some((row) => row.specimenGroup === "Biopsy"));
  assert.ok(fairPostRows.some((row) => row.specimenGroup === "Resection"));
});

test("the weekly trend contains six pre-go-live weeks, cutover, and six later weeks", () => {
  assert.equal(weeklyTat.length, 13);
  assert.equal(weeklyTat.filter((week) => week.period === "baseline").length, 6);
  assert.equal(weeklyTat.filter((week) => week.period === "cutover").length, 1);
  assert.equal(weeklyTat.filter((week) => week.period === "stabilized").length, 6);
  const cutover = weeklyTat.find((week) => week.period === "cutover");
  assert.equal(cutover?.mean.toFixed(1), "8.4");
  assert.equal(cutover?.median.toFixed(1), "9.5");
});

test("working-day calculations skip weekends and retain fractions", () => {
  assert.equal(workingDaysBetween(new Date("2026-02-13T07:00:00"), new Date("2026-02-16T07:00:00")), 1);
  assert.equal(workingDaysBetween(new Date("2026-02-16T07:00:00"), new Date("2026-02-17T19:00:00")), 1.5);
  assert.equal(workingDaysBetween(new Date("2026-02-17T19:00:00"), new Date("2026-02-16T07:00:00")), -1.5);
});
