export type QueueRow = {
  id: string;
  received: number;
  analyzed: number;
  released: number | null;
  period: "Routine" | "Peak";
};
// Minutes from 08:00 on the review day; identifiers are accession keys.
export const queueRows: QueueRow[] = [
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `Q-${String(i + 1).padStart(2, "0")}`,
    received: i * 5,
    analyzed: i * 5 + 15,
    released: i * 5 + 20,
    period: "Routine" as const,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `Q-${String(i + 7).padStart(2, "0")}`,
    received: 120 + i,
    analyzed: 135 + i,
    released: 180 + i * 6,
    period: "Peak" as const,
  })),
  { id: "Q-13", received: 126, analyzed: 141, released: null, period: "Peak" },
  { id: "Q-14", received: 127, analyzed: 142, released: null, period: "Peak" },
];
export type QueueConfig = {
  freshness: "stale" | "current";
  source: "lis" | "linked";
  period: "all" | "peak";
  stage: "total" | "analysis" | "post";
};
export const originalQueue: QueueConfig = {
  freshness: "stale",
  source: "lis",
  period: "all",
  stage: "total",
};
export const timeText = (minute: number) =>
  `${String(8 + Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
export function queueReport(config: QueueConfig) {
  const cutoff = config.freshness === "stale" ? 60 : 240;
  const observed = queueRows.filter(
    (row) => row.received <= cutoff && (config.period === "all" || row.period === "Peak"),
  );
  const complete = observed.filter((row) => row.released !== null && row.released <= cutoff);
  const pending = observed.filter((row) => !complete.includes(row));
  const duration = (row: QueueRow) =>
    config.stage === "analysis"
      ? row.analyzed - row.received
      : config.stage === "post"
        ? row.released! - row.analyzed
        : row.released! - row.received;
  const values = complete.map(duration).sort((a, b) => a - b);
  const n = values.length;
  return {
    cutoff,
    observed,
    complete,
    pending: config.source === "linked" ? pending : [],
    omitted: config.source === "lis" ? pending.length : 0,
    values,
    median: n ? (values[Math.floor((n - 1) / 2)] + values[Math.floor(n / 2)]) / 2 : null,
    p90: n ? values[Math.ceil(0.9 * n) - 1] : null,
    duration,
  };
}
export const queueSources = [
  {
    title: "Courier and accessioning",
    record: "10:00 courier delivery · eight chemistry accessions received 10:00–10:07",
    note: "Receipt is recorded for each accession. The courier's arrival is not a time for any one specimen, so use each accession's receipt time to measure durations.",
  },
  {
    title: "Analyzer event log",
    record: "Q-07…Q-14 · analysis completed 10:15–10:22 · instrument available after 10:22",
    note: "Every record in this set took 15 minutes from receipt to analysis. That includes any waiting before the run; it is not just the analyzer's run time.",
  },
  {
    title: "Middleware worklist",
    record:
      "10:25 · Q-07…Q-14 awaiting manual review\nReviewer assigned to another bench until 11:00\n12:00 · Q-13, Q-14 still unresolved",
    note: "The time after analysis includes waiting and review. These records point to looking at reviewer coverage, not to removing the review rules.",
  },
  {
    title: "Dashboard refresh log",
    record:
      "Page viewed 12:00 · last successful extract 09:00\n10:00 and 11:00 scheduled extracts failed · join query timed out",
    note: "The clock on the page is not the time of the data. Because the copy failed, a dashboard that looks current shows only the earlier group.",
  },
];
export const queuePlans = [
  {
    id: "analyzer",
    label: "Purchase another analyzer",
    note: "Every specimen here was analyzed within 15 minutes. Another analyzer would not shorten the wait for review; look at the wider workload before spending on equipment.",
  },
  {
    id: "bypass",
    label: "Disable manual-review rules",
    note: "Removing required review would shorten release times by removing a safety check. Nothing in the records shows the held results are safe to release automatically.",
  },
  {
    id: "coverage",
    label: "Pilot review coverage at courier arrival and repair the analytic refresh",
    note: "Keep the clinical rules, make sure trained reviewers are there, finish the two open accessions, and during the trial compare the delays after analysis and any side effects.",
  },
];

export const lessonCopy = {
  text01:
    "Chosen records · times on the review day. Minutes show the finished time, or for pending results, how long since receipt.",
};

export const sectionPurposes = [
  "Check when the data were copied and whether unfinished specimens are included.",
  "Link the timestamps and choose a population that can answer the manager’s question.",
  "Match the proposed fix to where the delay actually is, and say how you would judge whether it worked.",
];
