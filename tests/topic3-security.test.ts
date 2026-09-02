import assert from "node:assert/strict";
import test from "node:test";
import {
  alternatePortfolio,
  evaluateFinding,
  evaluateScenario,
  portfolioCost,
  portfolioLimit,
  referencePortfolio,
  securityControls,
  securityFindings,
  securityScenarios,
  withinBudget,
  type ControlId,
} from "../content/lessons/server-behind-the-analyzer/interaction";

test("the six installation findings have the locked confidentiality, integrity, and availability map", () => {
  assert.deepEqual(
    securityFindings.map((finding) => [finding.id, finding.properties]),
    [
      ["heat-vent", ["availability"]],
      ["shared-login", ["confidentiality", "integrity"]],
      ["flat-network", ["confidentiality", "integrity", "availability"]],
      ["persistent-vendor", ["confidentiality", "integrity"]],
      ["untested-backup", ["integrity", "availability"]],
      ["phi-at-rest", ["confidentiality"]],
    ],
  );
  assert.equal(evaluateFinding("flat-network", ["confidentiality", "integrity", "availability"]).correct, true);
  assert.deepEqual(evaluateFinding("untested-backup", ["availability"]), { correct: false, missing: ["integrity"], extra: [] });
});

test("an empty portfolio leaves all five scenarios unmitigated", () => {
  assert.deepEqual(
    securityScenarios.map((scenario) => evaluateScenario(scenario.id, [])),
    ["unmitigated", "unmitigated", "unmitigated", "unmitigated", "unmitigated"],
  );
});

test("buying every control exceeds both portfolio limits", () => {
  const everyControl = securityControls.map((control) => control.id);
  assert.deepEqual(portfolioCost(everyControl), { budgetPoints: 22, staffEffort: 18 });
  assert.deepEqual(portfolioLimit, { budgetPoints: 15, staffEffort: 11 });
  assert.equal(withinBudget(everyControl), false);
});

test("the reference portfolio is affordable and covers every scenario", () => {
  assert.deepEqual(portfolioCost(referencePortfolio), { budgetPoints: 14, staffEffort: 11 });
  assert.equal(withinBudget(referencePortfolio), true);
  assert.deepEqual(
    securityScenarios.map((scenario) => [scenario.id, evaluateScenario(scenario.id, referencePortfolio)]),
    [
      ["thermal-power-event", "blocked"],
      ["shared-credential-misuse", "blocked"],
      ["ransomware-traversal", "partial"],
      ["unapproved-vendor-change", "blocked"],
      ["failed-restore", "blocked"],
    ],
  );
});

test("a password-only portfolio blocks only shared-credential misuse", () => {
  const passwordOnly: ControlId[] = ["named-accounts"];
  const blocked = securityScenarios.filter((scenario) => evaluateScenario(scenario.id, passwordOnly) === "blocked").map((scenario) => scenario.id);
  assert.deepEqual(blocked, ["shared-credential-misuse"]);
  assert.equal(evaluateScenario("unapproved-vendor-change", passwordOnly), "partial");
});

test("two distinct affordable portfolios provide full scenario coverage", () => {
  assert.notDeepEqual(referencePortfolio, alternatePortfolio);
  for (const portfolio of [referencePortfolio, alternatePortfolio]) {
    assert.equal(withinBudget(portfolio), true);
    assert.ok(securityScenarios.every((scenario) => evaluateScenario(scenario.id, portfolio) !== "unmitigated"));
  }
  assert.deepEqual(portfolioCost(alternatePortfolio), { budgetPoints: 13, staffEffort: 11 });
  assert.deepEqual(
    securityScenarios.map((scenario) => evaluateScenario(scenario.id, alternatePortfolio)),
    ["partial", "blocked", "blocked", "blocked", "blocked"],
  );
});

test("the tempting low-value controls do not mitigate a stress scenario by themselves", () => {
  const lowValue: ControlId[] = ["keyboard-lock", "policy-memo"];
  assert.equal(withinBudget(lowValue), true);
  assert.ok(securityScenarios.every((scenario) => evaluateScenario(scenario.id, lowValue) === "unmitigated"));
});
