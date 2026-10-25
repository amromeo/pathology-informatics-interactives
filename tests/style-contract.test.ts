import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("all CSS variables have a definition", () => {
  const css = ["src/styles.css", "src/lesson-ui.css", "src/components/Topic7.css"]
      .map((p) => readFileSync(p, "utf8"))
      .join("\n"),
    defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  for (const match of css.matchAll(/var\((--[\w-]+)/g))
    assert.ok(defined.has(match[1]), "Missing CSS variable " + match[1]);
});
