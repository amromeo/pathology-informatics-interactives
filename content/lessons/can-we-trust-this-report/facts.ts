import { reportSummaries, reportRows } from "./interaction";
export const facts = [
  {
    name: "baseline count",
    actual: reportSummaries.baseline.cases,
    pattern: /compared (\d+) pre-go-live/,
  },
  {
    name: "post count",
    actual: reportRows.filter((r) => r.period !== "baseline").length,
    pattern: /with (\d+) cases accessioned after go-live/,
  },
  {
    name: "baseline mean",
    actual: reportSummaries.baseline.mean,
    pattern: /mean rose from ([\d.]+)/,
  },
  {
    name: "baseline median",
    actual: reportSummaries.baseline.median,
    pattern: /median fell from ([\d.]+)/,
  },
  {
    name: "cutover count",
    actual: reportSummaries.cutover.cases,
    pattern: /Its (\d+) cases/,
  },
  { name: "cutover mean", actual: reportSummaries.cutover.mean, pattern: /mean of ([\d.]+)/ },
  { name: "cutover median", actual: reportSummaries.cutover.median, pattern: /median of ([\d.]+)/ },
  { name: "all records", actual: reportRows.length, pattern: /Keep all (\d+) cases/ },
];
