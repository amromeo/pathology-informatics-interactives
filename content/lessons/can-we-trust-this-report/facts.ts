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
    pattern: /with (\d+) post-go-live/,
  },
  {
    name: "baseline mean",
    actual: reportSummaries.baseline.mean,
    pattern: /pre-go-live mean was ([\d.]+)/,
  },
  {
    name: "baseline median",
    actual: reportSummaries.baseline.median,
    pattern: /median was ([\d.]+)/,
  },
  {
    name: "cutover count",
    actual: reportSummaries.cutover.cases,
    pattern: /The (\d+) cutover cases/,
  },
  { name: "cutover mean", actual: reportSummaries.cutover.mean, pattern: /mean TAT of ([\d.]+)/ },
  { name: "cutover median", actual: reportSummaries.cutover.median, pattern: /median of ([\d.]+)/ },
  { name: "all records", actual: reportRows.length, pattern: /keeps all (\d+) cases/ },
];
