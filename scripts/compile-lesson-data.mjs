import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("../content/lessons/can-we-trust-this-report/report.csv", import.meta.url));
const outputDirectory = fileURLToPath(new URL("../src/generated", import.meta.url));
const output = fileURLToPath(new URL("../src/generated/lesson3Report.ts", import.meta.url));
const csv = readFileSync(source, "utf8");

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(output, `// Generated from content/lessons/can-we-trust-this-report/report.csv.\nexport default ${JSON.stringify(csv)};\n`, "utf8");
console.log("Compiled the editable Lesson 3 CSV.");
