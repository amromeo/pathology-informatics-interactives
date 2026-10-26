// Compare the author's prose revisions with a named Git baseline.
// Run: npx tsx scripts/check-lesson-invariants.ts 67c5b44 <lesson slugs>
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const [base, ...slugs] = process.argv.slice(2);
if (!base || !slugs.length) throw Error("Supply a Git revision and lesson slugs.");
const prose = new Set([
  "label",
  "task",
  "explanation",
  "prompt",
  "feedback",
  "title",
  "record",
  "note",
  "notes",
  "why",
  "situation",
  "evidence",
  "resolvedNote",
  "sees",
  "implication",
  "decisionPrompt",
  "repairPrompt",
  "name",
  "artifactTitle",
  "summary",
  "learnerAction",
  "text01",
  "text02",
  "sectionPurposes",
  "selectionCopy",
  "lessonCopy",
  "reconciliationActionNotes",
  "failNotes",
]);
const fixed =
  /^(id|answer|correct|owner|expected|expectedMrn|correctActionId|kind|review|fromLesson|preferred|value|result|tempId|paperAccession|patientName|birthDate|unit|test|collectionTime|backEntryTime|restoredOrder|mrn|duplicateOf|calledAt|recipient|readBack|relatedIds|passingRepairs)$/;
function compare(old: unknown, now: unknown, path: string, copy = false) {
  if (typeof old === "function") {
    assert.equal(typeof now, "function", path);
    return;
  }
  if (Array.isArray(old)) {
    assert.ok(Array.isArray(now), path);
    assert.equal(now.length, old.length, path + " length");
    const tuple =
      old.length === 2 && old.every((v) => typeof v === "string") && /\.options\[\d+\]$/.test(path);
    old.forEach((v, i) => compare(v, now[i], `${path}[${i}]`, tuple ? i !== 0 : copy));
  } else if (old && typeof old === "object") {
    assert.ok(now && typeof now === "object", path);
    for (const [key, value] of Object.entries(old)) {
      assert.ok(Object.hasOwn(now, key), path + "." + key);
      compare(
        value,
        (now as Record<string, unknown>)[key],
        path + "." + key,
        !fixed.test(key) && (copy || prose.has(key)),
      );
    }
  } else if (typeof old === "string" && copy) {
    assert.equal(typeof now, "string", path);
    // Case records include identifier digits, times, prices and measured results.
    if (/\.(record|evidence)$/.test(path))
      assert.deepEqual(
        (now as string).match(/\d+(?:[.,:]\d+)*/g),
        old.match(/\d+(?:[.,:]\d+)*/g),
        path + " numbers",
      );
  } else assert.deepEqual(now, old, path);
}
function numbers(source: string) {
  const out: string[] = [];
  const walk = (node: ts.Node) => {
    if (ts.isNumericLiteral(node)) out.push(node.text);
    ts.forEachChild(node, walk);
  };
  walk(ts.createSourceFile("data.ts", source, ts.ScriptTarget.Latest, true));
  return out;
}

for (const slug of slugs) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw Error("Invalid lesson slug");
  for (const file of ["interaction.ts", "check.ts", "lesson.ts"]) {
    const relative = `content/lessons/${slug}/${file}`;
    const before = execFileSync("git", ["show", `${base}:${relative}`], { encoding: "utf8" });
    const after = readFileSync(relative, "utf8");
    assert.deepEqual(numbers(after), numbers(before), relative + " numeric literals");
    const folder = resolve("tmp/invariant-baseline", slug);
    mkdirSync(folder, { recursive: true });
    const saved = resolve(folder, file);
    writeFileSync(saved, before);
    const old = await import(pathToFileURL(saved).href);
    const now = await import(pathToFileURL(resolve(relative)).href);
    if (file === "lesson.ts") {
      // Only summaries and descriptions of learner actions may change in a manifest.
      const strip = (value: unknown): unknown =>
        Array.isArray(value)
          ? value.map(strip)
          : value && typeof value === "object"
            ? Object.fromEntries(
                Object.entries(value)
                  .filter(([key]) => key !== "summary" && key !== "learnerAction")
                  .map(([key, val]) => [key, strip(val)]),
              )
            : value;
      assert.deepEqual(strip(now.manifest), strip(old.manifest), relative + " manifest");
    } else {
      compare(old, now, relative);
      if (slug === "twelve-hours-offline" && file === "interaction.ts") {
        for (const ids of ["controlled-id-block", "unit-created-identifiers"])
          for (const calls of ["controlled-call-log", "unit-call-methods"]) {
            const state = {
              decisions: { "temporary-identifiers": ids, "critical-results": calls },
            };
            compare(
              old.buildReconciliationRecords(state),
              now.buildReconciliationRecords(state),
              `${slug}.${ids}.${calls}`,
            );
          }
      }
    }
  }
  console.log(`${slug}: IDs, answers, tuple values, case records and numeric literals unchanged`);
}
