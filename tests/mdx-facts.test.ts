import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
for (const slug of [
  "can-we-trust-this-report",
  "can-we-accept-this-lot",
  "invisible-bottleneck",
  "pixel-budget",
])
  test(slug + " numerical prose agrees with calculated records", async () => {
    const data = await import("../content/lessons/" + slug + "/facts.ts"),
      file = data.file ?? "debrief.mdx",
      text = readFileSync("content/lessons/" + slug + "/" + file, "utf8");
    for (const fact of data.facts) {
      const match = text.match(fact.pattern);
      assert.ok(match, slug + "/" + file + ": missing " + fact.name);
      const printed = Number(match[1].replaceAll(",", "").replace(/\.$/, ""));
      assert.equal(
        printed,
        Number(fact.actual.toFixed(1)),
        slug +
          "/" +
          file +
          " says " +
          printed +
          " for " +
          fact.name +
          " but data gives " +
          fact.actual.toFixed(1),
      );
    }
  });
