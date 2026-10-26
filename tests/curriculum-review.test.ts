import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { lessons } from "../src/data/curriculum";
import {
  simulatedPerformance,
  verificationRows,
  monitoring,
} from "../content/lessons/model-under-pressure/interaction";
import { linkedRecords, checkLinks } from "../content/lessons/five-vs-slide-archive/interaction";
import { validationCases } from "../content/lessons/can-we-trust-this-report/interaction";
import { releaseRequirements } from "../content/lessons/build-the-new-test/interaction";
import { monitorItems } from "../content/lessons/human-plus-algorithm/interaction";
import { measures } from "../content/lessons/alert-everyone-ignores/interaction";
import { outboundMessage } from "../content/lessons/follow-the-flag/interaction";
test("prevalence changes predictive value without changing intrinsic sensitivity", () => {
  const low = simulatedPerformance(0.01, 2),
    high = simulatedPerformance(0.5, 2);
  assert.equal(low.sensitivity, high.sensitivity);
  assert.ok(low.ppv < high.ppv);
  assert.ok(simulatedPerformance(0.1, 3).sensitivity > low.sensitivity);
  assert.equal(simulatedPerformance(0.1, 0).sensitivity, 0.5);
  assert.ok(Math.abs(low.tp + low.fp + low.tn + low.fn - 10000) < 1e-9);
  assert.throws(() => simulatedPerformance(0, 2));
  assert.throws(() => simulatedPerformance(0.2, -1));
});
test("local verification retains subgroup denominators", () => {
  assert.equal(
    verificationRows.reduce((n, r) => n + r.total, 0),
    50,
  );
  assert.equal(
    verificationRows.reduce((n, r) => n + r.detected, 0),
    42,
  );
});
test("archive repair retains a correct link and distinguishes wrong identity levels", () => {
  const answers = Object.fromEntries(linkedRecords.map((r) => [r.id, r.answer]));
  assert.ok(checkLinks(answers).every((r) => r.pass));
  answers[linkedRecords[0].id] = "keep";
  assert.equal(checkLinks(answers).filter((r) => r.pass).length, linkedRecords.length - 1);
});
test("removing missing-time cases produces partial rather than uniform report checks", () => {
  const results = validationCases.map((r) => r.passingRepairs.includes("missing-only"));
  assert.ok(results.some(Boolean));
  assert.ok(results.some((x) => !x));
  assert.equal(results[1], false);
});
test("checklists require omitting plausible but insufficient actions", () => {
  for (const rows of [releaseRequirements, monitorItems, measures]) {
    assert.equal(rows.filter((r) => !r.correct).length, 2);
    assert.equal(
      rows.every((r) => r.correct),
      false,
    );
    assert.ok(rows.filter((r) => r.correct).length >= 4);
  }
});
test("whole result message identifies patient, order, result and version in their specified fields", () => {
  const lines = outboundMessage.split(/\r?\n/).map((l) => l.split("|"));
  const msh = lines.find((l) => l[0] === "MSH")!,
    pid = lines.find((l) => l[0] === "PID")!,
    obr = lines.find((l) => l[0] === "OBR")!,
    obx = lines.find((l) => l[0] === "OBX")!;
  assert.equal(msh[8], "ORU^R01^ORU_R01");
  assert.equal(msh[9], "F001");
  assert.equal(msh[11], "2.5.1");
  assert.equal(pid[3], "MRN0041872^^^HOSP^MR");
  assert.equal(obr[3], "FL-01^LIS");
  assert.equal(obr[25], "F");
  assert.equal(obx[8], "CH");
  assert.equal(obx[11], "F");
});
for (const lesson of lessons)
  test(lesson.manifest.slug + " has complete learner and faculty materials", async () => {
    const folder = "content/lessons/" + lesson.manifest.slug;
    const { checks } = await import("../" + folder + "/check.ts");
    assert.equal(checks.length, 3);
    assert.ok(checks.some((c: any) => c.kind === "spaced"));
    for (const check of checks) {
      assert.equal(check.choices.filter((c: any) => c.correct).length, 1);
      assert.ok(check.choices.every((c: any) => c.feedback.length > 35));
    }
    assert.match(
      readFileSync(folder + "/introduction.mdx", "utf8"),
      /## What you will be able to do/,
    );
    const practicum = readFileSync(folder + "/practicum.mdx", "utf8");
    for (const heading of [
      "Who to meet",
      "Time",
      "Steps",
      "Bring back",
      "Discuss with faculty",
      "Privacy",
    ])
      assert.ok(practicum.includes("## " + heading), heading);
    const faculty = readFileSync(folder + "/faculty.mdx", "utf8");
    for (const heading of ["Run of show", "Common misconceptions"])
      assert.ok(faculty.includes("## " + heading), heading);
    assert.match(readFileSync(folder + "/debrief.mdx", "utf8"), /^## Debrief:/);
    assert.notEqual(lesson.manifest.experience, "generic");
  });

test("single-answer choices do not signal the key by excessive length", async () => {
  let total = 0,
    longest = 0;
  for (const l of lessons) {
    const data = await import("../content/lessons/" + l.manifest.slug + "/interaction.ts");
    const seen = new Set<unknown>();
    function visit(value: any) {
      if (!value || typeof value !== "object" || seen.has(value)) return;
      seen.add(value);
      if (
        Array.isArray(value) &&
        value.filter((c) => c?.correct === true).length === 1 &&
        value.some((c) => c?.correct === false)
      ) {
        const right = value.find((c) => c.correct),
          wrong = value
            .filter((c) => !c.correct && c.label)
            .map((c) => c.label.length)
            .sort((a, b) => a - b);
        if (right?.label && wrong.length) {
          const mid = Math.floor(wrong.length / 2),
            median = wrong.length % 2 ? wrong[mid] : (wrong[mid - 1] + wrong[mid]) / 2;
          assert.ok(
            right.label.length <= median * 1.25,
            l.manifest.slug + ": shorten " + right.label,
          );
          total++;
          if (right.label.length > Math.max(...wrong)) longest++;
        }
      }
      for (const v of Object.values(value)) visit(v);
    }
    visit(data);
  }
  assert.ok(longest / total <= 0.3, longest + " of " + total + " correct labels are longest");
});
