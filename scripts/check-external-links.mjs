import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
const text = readFileSync("content/SOURCES.md", "utf8");
const urls = [
  ...new Set([...text.matchAll(/https?:\/\/[^\s<>"\)]+/g)].map((m) => m[0].replace(/[.,;]+$/, ""))),
];
const failures = [];
for (const url of urls) {
  let outcome = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(20000),
        headers: { "User-Agent": "Pathology-Informatics-Link-Check/1.0" },
      });
      await response.body?.cancel();
      if (response.ok) {
        outcome = "";
        break;
      }
      outcome = String(response.status);
    } catch (error) {
      outcome = error.message;
    }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
  }
  if (outcome) failures.push({ url, result: outcome });
}
mkdirSync("review", { recursive: true });
writeFileSync(
  "review/external-links.json",
  JSON.stringify({ checked: new Date().toISOString(), total: urls.length, failures }, null, 2),
);
console.log(
  `${urls.length} source URLs checked; ${failures.length} require review. See the report artifact. Servers may reject automated checks even when a browser works.`,
);
if (failures.length) process.exitCode = 1;
