import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../src/generated", import.meta.url));
mkdirSync(outputDirectory, { recursive: true });

const compileCsv = (sourcePath, outputPath) => {
  const source = fileURLToPath(new URL(sourcePath, import.meta.url));
  const output = fileURLToPath(new URL(outputPath, import.meta.url));
  const csv = readFileSync(source, "utf8");
  writeFileSync(output, `// Generated from ${sourcePath.replace("../", "")}.\nexport default ${JSON.stringify(csv)};\n`, "utf8");
};

compileCsv("../content/lessons/can-we-trust-this-report/report.csv", "../src/generated/lesson3Report.ts");
compileCsv("../content/lessons/can-we-accept-this-lot/lot-comparison.csv", "../src/generated/lesson4LotComparison.ts");
console.log("Compiled the editable Lesson 3 and Lesson 4 CSV files.");
