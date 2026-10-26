import { compileLessonManifestRegistry } from "./lesson-manifests.mjs";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../src/generated", import.meta.url));
mkdirSync(outputDirectory, { recursive: true });
compileLessonManifestRegistry(outputDirectory);

export function validateCsv(csv, source) {
  const rows = csv
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(","));
  const report = source.includes("report.csv");
  const expected = report
    ? "accession_id,period,accessioned_at,structured_accession_at,source_document_time,finalized_at,tat_working_days,specimen_group,eligible,amended,original_two_period_group,revised_three_period_group"
    : "specimen_id,range_group,current_lot_ng_l,new_lot_ng_l";
  if (rows[0].join(",") !== expected) throw Error(source + ": unexpected CSV header");
  const ids = new Set();
  rows.slice(1).forEach((row, index) => {
    const fail = (message) => {
      throw Error(source + " line " + (index + 2) + ": " + message);
    };
    if (row.length !== rows[0].length)
      fail("expected " + rows[0].length + " columns, found " + row.length);
    if (!row[0] || ids.has(row[0])) fail("missing or duplicate record identifier");
    ids.add(row[0]);
    if (
      !(
        report ? ["baseline", "cutover", "stabilized"] : ["very-low", "decision", "elevated"]
      ).includes(row[1])
    )
      fail("unknown period or range: " + row[1]);
    for (const col of report ? [6] : [2, 3])
      if (!row[col] || !Number.isFinite(Number(row[col])))
        fail("invalid number in " + rows[0][col]);
    if (report) {
      for (const col of [8, 9, 10, 11])
        if (!["yes", "no"].includes(row[col])) fail("expected yes or no in " + rows[0][col]);
      for (const col of [2, 3, 4, 5])
        if (row[col] && !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(row[col]))
          fail("invalid timestamp in " + rows[0][col]);
    }
  });
}
const compileCsv = (sourcePath, outputPath) => {
  const source = fileURLToPath(new URL(sourcePath, import.meta.url));
  const output = fileURLToPath(new URL(outputPath, import.meta.url));
  const csv = readFileSync(source, "utf8");
  validateCsv(csv, sourcePath);
  writeFileSync(
    output,
    `// Generated from ${sourcePath.replace("../", "")}.\nexport default ${JSON.stringify(csv)};\n`,
    "utf8",
  );
};

compileCsv(
  "../content/lessons/can-we-trust-this-report/report.csv",
  "../src/generated/lesson3Report.ts",
);
compileCsv(
  "../content/lessons/can-we-accept-this-lot/lot-comparison.csv",
  "../src/generated/lesson4LotComparison.ts",
);
console.log("Compiled the editable Lesson 3 and Lesson 4 CSV files.");
