import assert from "node:assert/strict";
import test from "node:test";
import { initialRouting, readyForReview, routeSpecimen, runRoutingCases, type RoutingConfig } from "../content/lessons/where-is-the-specimen/interaction";
const repaired = (): RoutingConfig => ({ routes: { ...initialRouting.routes, "SP-EX": "gross" }, unmatched: "review" });
test("original route matrix exposes excision and unrecognized-code failures", () => {
  assert.deepEqual(runRoutingCases(initialRouting).filter((item) => !item.passed).map((item) => item.id), ["reported", "unknown"]);
});
test("targeted correction preserves neighbors and holds unknown codes", () => {
  assert.ok(runRoutingCases(repaired()).every((item) => item.passed));
  for (const code of ["", "SP-UNKNOWN", "constructor", "__proto__"]) assert.equal(routeSpecimen(code, repaired()), "review");
  assert.equal(initialRouting.routes["SP-EX"], "cytology");
});
test("routing everything to gross breaks cytology and intraoperative work", () => {
  const broad: RoutingConfig = { routes: { "SP-BX": "gross", "SP-EX": "gross", "CY-FNA": "gross", "SP-FS": "gross" }, unmatched: "gross" };
  assert.deepEqual(runRoutingCases(broad).filter((item) => !item.passed).map((item) => item.id), ["cytology", "urgent", "unknown"]);
});
test("software repair and physical recovery are independent requirements", () => {
  assert.equal(readyForReview(repaired(), "queue-only"), false);
  assert.equal(readyForReview(initialRouting, "locate-handoff"), false);
  assert.equal(readyForReview(repaired(), "locate-handoff"), true);
});
