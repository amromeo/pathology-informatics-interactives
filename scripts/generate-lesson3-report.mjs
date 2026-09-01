import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../content/lessons/can-we-trust-this-report/report.csv", import.meta.url));

const balanceAcrossWeeks = (values, weekCount) => {
  const buckets = Array.from({ length: weekCount }, () => []);
  [...values].sort((a, b) => a - b).forEach((value, index) => buckets[index % weekCount].push(value));
  return buckets.flat();
};

const baselineTats = balanceAcrossWeeks([
  ...Array(20).fill(1.0),
  ...Array(30).fill(1.8),
  ...Array(54).fill(2.5),
  ...Array(2).fill(2.7),
  ...Array(60).fill(3.5),
  ...Array(30).fill(5.0),
  8.1,
  ...Array(13).fill(8.5),
], 6);

const stabilizedTats = balanceAcrossWeeks([
  ...Array(30).fill(1.0),
  ...Array(40).fill(1.8),
  ...Array(32).fill(2.3),
  ...Array(28).fill(2.5),
  ...Array(36).fill(3.2),
  ...Array(30).fill(4.8),
  7.0,
  ...Array(13).fill(9.1),
], 6);

const cutoverTats = [
  1.5, 0.8, 1.0, 1.8, 1.0, 1.2, 2.0, 0.8,
  7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5,
  7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 10.5,
];

if (baselineTats.length !== 210 || stabilizedTats.length !== 210 || cutoverTats.length !== 35) {
  throw new Error("Unexpected report population size.");
}

const pad = (value) => String(value).padStart(2, "0");
const isoLocal = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

const businessDates = (start, count) => {
  const result = [];
  const cursor = new Date(`${start}T00:00:00`);
  while (result.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) result.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
};

const addWorkingDays = (start, days) => {
  const wholeDays = Math.floor(days);
  const fraction = days - wholeDays;
  const result = new Date(start);
  let added = 0;
  while (added < wholeDays) {
    result.setDate(result.getDate() + 1);
    if (result.getDay() !== 0 && result.getDay() !== 6) added += 1;
  }
  result.setMinutes(result.getMinutes() + Math.round(fraction * 24 * 60));
  return result;
};

const rows = [];
const addPeriod = ({ period, prefix, start, tats, missingStructured = 0 }) => {
  const dates = businessDates(start, Math.ceil(tats.length / 7));
  tats.forEach((tat, index) => {
    const accessionDate = new Date(dates[Math.floor(index / 7)]);
    accessionDate.setHours(7 + (index % 7), (index * 7) % 60, 0, 0);
    const finalDate = addWorkingDays(accessionDate, tat);
    const accessionId = `SP26-${prefix}${String(index + 1).padStart(3, "0")}`;
    const structuredMissing = period === "cutover" && index >= tats.length - missingStructured;
    const currentIncluded = period === "stabilized" || period === "cutover";
    rows.push({
      accession_id: accessionId,
      period,
      accessioned_at: isoLocal(accessionDate),
      structured_accession_at: structuredMissing ? "" : isoLocal(accessionDate),
      source_document_time: structuredMissing ? isoLocal(accessionDate) : "",
      finalized_at: isoLocal(finalDate),
      tat_working_days: tat.toFixed(1),
      specimen_group: index % 3 === 0 ? "Resection" : "Biopsy",
      eligible: "yes",
      amended: index % 41 === 0 ? "yes" : "no",
      current_post_included: currentIncluded ? "yes" : "no",
      fair_post_included: period === "stabilized" ? "yes" : "no",
    });
  });
};

addPeriod({ period: "baseline", prefix: "B", start: "2026-01-05", tats: baselineTats });
addPeriod({ period: "cutover", prefix: "C", start: "2026-02-16", tats: cutoverTats, missingStructured: 27 });
addPeriod({ period: "stabilized", prefix: "P", start: "2026-02-23", tats: stabilizedTats });

const headers = Object.keys(rows[0]);
const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => row[header]).join(","))].join("\n") + "\n";
writeFileSync(output, csv, "utf8");
console.log(`Wrote ${rows.length} rows to ${output}`);
