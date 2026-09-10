import assert from "node:assert/strict";
import test from "node:test";
import { approvedRelease, evaluateRelease, originalRelease, releaseCases, releaseReplay } from "../content/lessons/autoverification-at-the-edge/interaction";
import { approvedReflex, evaluateReflex, originalReflex, reflexCases, reflexReplay, reflexSummary } from "../content/lessons/reflex-rule-ripple-effect/interaction";

test("absolute-only release reproduces two missed holds; approved rule preserves releases", () => {
  assert.equal(releaseCases.length, 22);
  assert.deepEqual(releaseReplay(originalRelease).filter((r) => r.outcome !== r.expected).map((r) => r.id), ["AV-01", "AV-03"]);
  assert.ok(releaseReplay(approvedRelease).every((r) => r.outcome === r.expected));
  assert.deepEqual(evaluateRelease(releaseCases[0], approvedRelease).difference, 36);
  assert.equal(evaluateRelease(releaseCases[0], approvedRelease).percentage, 300);
});
test("AND between delta branches misses independent absolute and relative holds", () => {
  const results = releaseReplay({ ...approvedRelease, delta: "both" });
  for (const id of ["AV-01", "AV-02", "AV-03"]) assert.equal(results.find((r) => r.id === id)?.outcome, "Release");
});
test("small denominators, missing history, and exact history boundaries are handled separately", () => {
  const result = (id: string) => releaseReplay(approvedRelease).find((r) => r.id === id)!;
  assert.equal(result("AV-04").outcome, "Release");
  for (const id of ["AV-06", "AV-07", "AV-08", "AV-15"]) { assert.equal(result(id).outcome, "Hold"); assert.equal(result(id).percentage, null); }
  assert.equal(result("AV-18").outcome, "Release");
  assert.equal(result("AV-06").gates.find((gate) => gate.name === "Change from prior result")?.skipped, true);
  assert.equal(releaseReplay({ ...approvedRelease, minimumChange: 0 }).find((r) => r.id === "AV-04")?.outcome, "Hold");
});
test("release gates preserve QC, flag, status, range and critical exceptions", () => {
  for (const id of ["AV-09", "AV-10", "AV-11", "AV-12", "AV-13", "AV-17", "AV-22"]) assert.equal(releaseReplay(approvedRelease).find((r) => r.id === id)?.outcome, "Hold");
  assert.equal(releaseReplay({ ...approvedRelease, checkQc: false }).find((r) => r.id === "AV-09")?.outcome, "Release");
  assert.equal(releaseReplay({ ...approvedRelease, checkFlags: false }).find((r) => r.id === "AV-10")?.outcome, "Release");
  assert.equal(evaluateRelease({ ...releaseCases[0], current: NaN }, approvedRelease).outcome, "Hold");
  assert.equal(evaluateRelease({ ...releaseCases[0], current: 2, prior: 2 }, approvedRelease).outcome, "Release");
});
test("reflex replay accounts for every record and three additional orders under original rule", () => {
  assert.equal(reflexCases.length, 13);
  assert.deepEqual(reflexSummary(originalReflex), { total: 13, orders: 5, expectedOrders: 2, extraOrders: 3, missedOrders: 0, correct: 10 });
  assert.deepEqual(reflexSummary(approvedReflex), { total: 13, orders: 2, expectedOrders: 2, extraOrders: 0, missedOrders: 0, correct: 13 });
  assert.deepEqual(reflexReplay(originalReflex).filter((r) => r.action !== r.expected).map((r) => r.id), ["TH-01", "TH-02", "TH-04"]);
});
test("inclusive reflex boundaries and disabled duplicate protection produce distinct failures", () => {
  assert.deepEqual(reflexReplay({ ...approvedReflex, inclusive: true }).filter((r) => r.action !== r.expected).map((r) => r.id), ["TH-04", "TH-06"]);
  assert.deepEqual(reflexReplay({ ...approvedReflex, preventDuplicate: false }).filter((r) => r.action !== r.expected).map((r) => r.id), ["TH-08", "TH-09"]);
});
test("reflex scope and result status cannot be replaced by numeric threshold checks", () => {
  assert.deepEqual(reflexReplay({ ...approvedReflex, restrictScope: false }).filter((r) => r.action !== r.expected).map((r) => r.id), ["TH-11", "TH-12"]);
  assert.deepEqual(reflexReplay({ ...approvedReflex, requireFinal: false }).filter((r) => r.action !== r.expected).map((r) => r.id), ["TH-13"]);
  assert.equal(evaluateReflex({ ...reflexCases[0], tsh: NaN }, approvedReflex).action, "Review");
  assert.equal(evaluateReflex({ ...reflexCases[0], tsh: -1 }, approvedReflex).action, "Review");
});
test("a lower order count can conceal missed indicated FT4 orders", () => {
  const summary = reflexSummary({ ...approvedReflex, lower: 0.1, upper: 5 });
  assert.equal(summary.orders, 0);
  assert.equal(summary.missedOrders, 2);
  assert.ok(summary.correct < summary.total);
});
