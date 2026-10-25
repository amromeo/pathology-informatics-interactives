import { decisionSummary, lotResults } from "./interaction";
export const facts = [
  { name: "all specimens", actual: lotResults.length, pattern: /same (\d+) patient specimens/ },
  {
    name: "primary specimens",
    actual: decisionSummary.specimens,
    pattern: /analysis used the (\d+) specimens/,
  },
  { name: "mean difference", actual: decisionSummary.mean, pattern: /averaged ([\d.]+) ng/ },
  {
    name: "median difference",
    actual: decisionSummary.median,
    pattern: /median difference was ([\d.]+) ng/,
  },
  {
    name: "standard deviation",
    actual: decisionSummary.standardDeviation,
    pattern: /standard deviation was ([\d.]+) ng/,
  },
  {
    name: "confidence lower",
    actual: decisionSummary.confidenceLow,
    pattern: /approximately \+([\d.]+) to/,
  },
  { name: "confidence upper", actual: decisionSummary.confidenceHigh, pattern: /to \+([\d.]+) ng/ },
];
