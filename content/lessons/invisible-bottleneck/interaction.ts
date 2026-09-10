export type QueueRow = { id: string; received: number; analyzed: number; released: number | null; period: "Routine" | "Peak" };
// Minutes from 08:00 on the review day; identifiers are accession keys.
export const queueRows: QueueRow[] = [
  ...Array.from({ length: 6 }, (_, i) => ({ id: `Q-${String(i+1).padStart(2,"0")}`, received: i*5, analyzed: i*5+15, released: i*5+20, period: "Routine" as const })),
  ...Array.from({ length: 6 }, (_, i) => ({ id: `Q-${String(i+7).padStart(2,"0")}`, received: 120+i, analyzed: 135+i, released: 180+i*6, period: "Peak" as const })),
  { id: "Q-13", received: 126, analyzed: 141, released: null, period: "Peak" },
  { id: "Q-14", received: 127, analyzed: 142, released: null, period: "Peak" },
];
export type QueueConfig = { freshness: "stale" | "current"; source: "lis" | "linked"; period: "all" | "peak"; stage: "total" | "analysis" | "post" };
export const originalQueue: QueueConfig = { freshness: "stale", source: "lis", period: "all", stage: "total" };
export const timeText = (minute: number) => `${String(8+Math.floor(minute/60)).padStart(2,"0")}:${String(minute%60).padStart(2,"0")}`;
export function queueReport(config: QueueConfig) {
  const cutoff = config.freshness === "stale" ? 60 : 240;
  const observed = queueRows.filter(row => row.received <= cutoff && (config.period === "all" || row.period === "Peak"));
  const complete = observed.filter(row => row.released !== null && row.released <= cutoff);
  const pending = observed.filter(row => !complete.includes(row));
  const duration = (row: QueueRow) => config.stage === "analysis" ? row.analyzed-row.received : config.stage === "post" ? row.released!-row.analyzed : row.released!-row.received;
  const values = complete.map(duration).sort((a,b) => a-b);
  const n = values.length;
  return { cutoff, observed, complete, pending: config.source === "linked" ? pending : [], omitted: config.source === "lis" ? pending.length : 0, values, median: n ? (values[Math.floor((n-1)/2)]+values[Math.floor(n/2)])/2 : null, p90: n ? values[Math.ceil(.9*n)-1] : null, duration };
}
export const queueSources = [
  { title: "Courier and accessioning", record: "10:00 courier delivery · eight chemistry accessions received 10:00–10:07", note: "Receipt is an accession event. Courier delivery alone is not an individual specimen timestamp; retain accession-level receipt for durations." },
  { title: "Analyzer event log", record: "Q-07…Q-14 · analysis completed 10:15–10:22 · instrument available after 10:22", note: "The interval from receipt to analysis is 15 minutes for every record in this set. It includes any pre-analysis wait; it is not pure instrument run time." },
  { title: "Middleware worklist", record: "10:25 · Q-07…Q-14 awaiting manual review\nReviewer assigned to another bench until 11:00\n12:00 · Q-13, Q-14 still unresolved", note: "The post-analysis interval includes waiting and review. These records support investigation of review coverage, not removal of review criteria." },
  { title: "Dashboard refresh log", record: "Page viewed 12:00 · last successful extract 09:00\n10:00 and 11:00 scheduled extracts failed · join query timed out", note: "The page clock is not the data clock. An analytic query failure makes an apparently current dashboard show only the earlier group." },
];
export const queuePlans = [
  { id: "analyzer", label: "Purchase another analyzer", note: "Every selected specimen already completed analysis in 15 minutes. More analyzer capacity does not address the observed review wait; confirm broader workload before a capital decision." },
  { id: "bypass", label: "Disable manual-review rules", note: "Removing required review may shorten release times by removing a control. The records do not establish that the held results are safe for automatic release." },
  { id: "coverage", label: "Pilot review coverage at courier arrival and repair the analytic refresh", note: "Preserve clinical rules, assign trained review coverage, resolve the two open accessions, and compare post-analysis delays and balancing measures during the pilot." },
];
