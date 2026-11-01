import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

test("public teaching supplements carry attribution without presentation addresses or embeds", () => {
  let count = 0;
  for (const slug of readdirSync("content/lessons")) {
    const text = readFileSync(`content/lessons/${slug}/debrief.mdx`, "utf8");
    const supplements =
      text.match(/<details className="teaching-supplement">[\s\S]*?<\/details>/g) ?? [];
    for (const supplement of supplements) {
      count++;
      assert.match(supplement, /<summary>A closer look:/, slug);
      assert.match(supplement, /Conference context:/, slug);
      assert.doesNotMatch(
        supplement,
        /https?:\/\/|href=|<iframe|<embed|<object|data:application\/pdf/i,
        slug,
      );
    }
  }
  assert.ok(count > 0, "Teaching supplements are present");
});
