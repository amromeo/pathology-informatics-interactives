import test from "node:test";
import assert from "node:assert/strict";
import { lessons } from "../src/data/curriculum";
test("coverage validator rejects loss of the primary ordering interaction", async () => {
  const lesson = lessons.find((l) => l.manifest.slug === "where-is-the-specimen")!;
  const prior = lesson.manifest.pierCoverage;
  try {
    lesson.manifest.pierCoverage = prior!.map((c) =>
      c.objective === "4.2" ? { ...c, primary: false } : c,
    );
    await assert.rejects(
      import("../scripts/validate-curriculum"),
      /4\.2 has no published primary interactive lesson/,
    );
  } finally {
    lesson.manifest.pierCoverage = prior;
  }
});
