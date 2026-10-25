import test from "node:test";
import React from "react";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  initialBuild,
  approvedBuild,
  replayBuild,
} from "../content/lessons/build-the-new-test/interaction";
import {
  evidenceRows,
  initialWeights,
  vendorSummary,
} from "../content/lessons/choose-and-govern-lis/interaction";
import { TestBuildExperience } from "../src/components/TestBuildExperience";
import { LisSelectionExperience } from "../src/components/LisSelectionExperience";

test("copied test definition fails all reports and approved version preserves all eight", () => {
  assert.equal(replayBuild(initialBuild).filter((row) => row.pass).length, 0);
  assert.equal(replayBuild(approvedBuild).filter((row) => row.pass).length, 8);
});
test("fields and units alone do not repair invalid, pending, specimen, correction or retry cases", () => {
  assert.deepEqual(
    replayBuild({ ...initialBuild, fields: "components", units: "qualitative" })
      .filter((row) => row.pass)
      .map((row) => row.id),
    ["TB01", "TB02", "TB03"],
  );
});
test("each unsafe configuration has an independently detectable consequence", () => {
  const expected: Record<string, string[]> = {
    fields: ["TB01", "TB02", "TB03", "TB07", "TB08"],
    units: ["TB01", "TB02", "TB03", "TB07", "TB08"],
    validity: ["TB04"],
    pending: ["TB05"],
    specimen: ["TB06"],
    correction: ["TB07"],
    identity: ["TB08"],
  };
  for (const key of Object.keys(expected) as (keyof typeof approvedBuild)[]) {
    assert.deepEqual(
      replayBuild({ ...approvedBuild, [key]: initialBuild[key] })
        .filter((row) => !row.pass)
        .map((row) => row.id),
      expected[key],
      key,
    );
  }
});
test("correction preserves history and retry preserves a single current report", () => {
  const rows = replayBuild(approvedBuild);
  assert.match(rows[6].actual, /Corrected; prior version retained; notification required/);
  assert.match(rows[7].actual, /1 current report$/);
  assert.doesNotMatch(rows[4].actual, /Not detected/);
});
const answers = Object.fromEntries(evidenceRows.map((row) => [row.id, row.answer]));
test("only Birch has evidence supporting all mandatory requirements", () => {
  assert.deepEqual(
    ["alder", "birch", "cedar"].filter(
      (id) => vendorSummary(id, initialWeights, answers, true).eligible,
    ),
    ["birch"],
  );
  assert.equal(vendorSummary("alder", initialWeights, answers, true).score, 4.8);
  assert.equal(vendorSummary("birch", initialWeights, answers, true).score, 3.2);
});
test("marking every requirement as passing cannot conceal failed or missing evidence", () => {
  const falseAnswers = Object.fromEntries(evidenceRows.map((row) => [row.id, "pass"]));
  assert.equal(vendorSummary("alder", initialWeights, falseAnswers, true).eligible, false);
  assert.equal(vendorSummary("cedar", initialWeights, falseAnswers, true).eligible, false);
  assert.equal(vendorSummary("alder", initialWeights, falseAnswers, true).accurate, false);
  assert.equal(vendorSummary("birch", initialWeights, {}, true).eligible, false);
});
test("preference weights normalize and cannot change mandatory eligibility", () => {
  const zero = { usability: 0, analytics: 0, training: 0 };
  assert.equal(vendorSummary("alder", zero, answers, true).score, null);
  const training = { usability: 0, analytics: 0, training: 100 };
  assert.equal(vendorSummary("alder", training, answers, true).score, 4);
  assert.equal(vendorSummary("alder", training, answers, true).eligible, false);
});
test("five year scoped costs include each annual charge and explicit one-time categories", () => {
  assert.deepEqual(
    ["alder", "birch", "cedar"].map((id) => vendorSummary(id, initialWeights, answers, false).cost),
    [580, 565, 510],
  );
  assert.deepEqual(
    ["alder", "birch", "cedar"].map((id) => vendorSummary(id, initialWeights, answers, true).cost),
    [695, 695, 720],
  );
});
test("experiences expose labeled controls, expected results, and lifecycle choices", () => {
  const build = renderToStaticMarkup(<TestBuildExperience />);
  assert.match(build, /Validation case/);
  assert.match(build, /Expected result and reason/);
  assert.match(build, /Run eight report checks/);
  const selection = renderToStaticMarkup(<LisSelectionExperience />);
  assert.match(selection, /A-correction evidence/);
  assert.match(selection, /Before the old system is retired/);
  assert.match(selection, /Selection recommendation/);
});
