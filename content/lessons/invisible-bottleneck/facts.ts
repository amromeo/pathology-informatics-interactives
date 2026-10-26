import { queueReport } from "./interaction";
const report = queueReport({
  freshness: "current",
  source: "linked",
  period: "all",
  stage: "total",
});
export const facts = [
  { name: "completed records", actual: report.complete.length, pattern: /(\d+) completed/ },
  { name: "total median", actual: report.median!, pattern: /total median is (\d+) minutes/ },
  { name: "90th percentile", actual: report.p90!, pattern: /90th percentile is (\d+) minutes/ },
];
