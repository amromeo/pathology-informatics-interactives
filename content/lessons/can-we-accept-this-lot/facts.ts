import { decisionSummary, lotResults } from "./interaction";
export const facts = [
  { name: "all specimens", actual: lotResults.length, pattern: /contains (\d+) specimens/ },
  {
    name: "primary specimens",
    actual: decisionSummary.specimens,
    pattern: /comparison uses the (\d+) near/,
  },
  { name: "mean difference", actual: decisionSummary.mean, pattern: /mean of \+([\d.]+) ng/ },
  {
    name: "median difference",
    actual: decisionSummary.median,
    pattern: /median is \+([\d.]+) ng/,
  },
  {
    name: "standard deviation",
    actual: decisionSummary.standardDeviation,
    pattern: /SD is about ([\d.]+) ng/,
  },
  {
    name: "confidence lower",
    actual: decisionSummary.confidenceLow,
    pattern: /approximately \+([\d.]+) to/,
  },
  {
    name: "confidence upper",
    actual: decisionSummary.confidenceHigh,
    pattern: /approximately \+[\d.]+ to \+([\d.]+) ng/,
  },
];
