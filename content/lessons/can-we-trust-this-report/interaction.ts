import reportCsv from "../../../src/generated/lesson3Report";

export type ReportPeriod = "baseline" | "cutover" | "stabilized";
export type SpecimenGroup = "Biopsy" | "Resection";

export type ReportRow = {
  accessionId: string;
  period: ReportPeriod;
  accessionedAt: string;
  structuredAccessionAt: string;
  sourceDocumentTime: string;
  finalizedAt: string;
  tatWorkingDays: number;
  specimenGroup: SpecimenGroup;
  eligible: boolean;
  amended: boolean;
  currentPostIncluded: boolean;
  fairPostIncluded: boolean;
};

const parseBoolean = (value: string) => value === "yes";

export const reportRows: ReportRow[] = reportCsv.trim().split("\n").slice(1).map((line) => {
  const [accessionId, period, accessionedAt, structuredAccessionAt, sourceDocumentTime, finalizedAt, tatWorkingDays, specimenGroup, eligible, amended, currentPostIncluded, fairPostIncluded] = line.trim().split(",");
  return {
    accessionId,
    period: period as ReportPeriod,
    accessionedAt,
    structuredAccessionAt,
    sourceDocumentTime,
    finalizedAt,
    tatWorkingDays: Number(tatWorkingDays),
    specimenGroup: specimenGroup as SpecimenGroup,
    eligible: parseBoolean(eligible),
    amended: parseBoolean(amended),
    currentPostIncluded: parseBoolean(currentPostIncluded),
    fairPostIncluded: parseBoolean(fairPostIncluded),
  };
});

export const reportCsvUrl = new URL("./report.csv", import.meta.url).href;

export const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

export const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[midpoint] : (sorted[midpoint - 1] + sorted[midpoint]) / 2;
};

export const summarize = (rows: ReportRow[]) => ({
  cases: rows.length,
  mean: mean(rows.map((row) => row.tatWorkingDays)),
  median: median(rows.map((row) => row.tatWorkingDays)),
  biopsies: rows.filter((row) => row.specimenGroup === "Biopsy").length,
  resections: rows.filter((row) => row.specimenGroup === "Resection").length,
});

export const baselineRows = reportRows.filter((row) => row.period === "baseline");
export const cutoverRows = reportRows.filter((row) => row.period === "cutover");
export const stabilizedRows = reportRows.filter((row) => row.period === "stabilized");
export const originalPostRows = reportRows.filter((row) => row.currentPostIncluded);
export const fairPostRows = reportRows.filter((row) => row.fairPostIncluded);

export const reportSummaries = {
  baseline: summarize(baselineRows),
  cutover: summarize(cutoverRows),
  originalPost: summarize(originalPostRows),
  fairPost: summarize(fairPostRows),
};

const mondayFor = (value: string) => {
  const date = new Date(value.replace(" ", "T"));
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const weeklyTat = Array.from(reportRows.reduce((weeks, row) => {
  const monday = mondayFor(row.accessionedAt);
  const key = monday.toISOString().slice(0, 10);
  const existing = weeks.get(key) ?? { key, date: monday, period: row.period, rows: [] as ReportRow[] };
  existing.rows.push(row);
  weeks.set(key, existing);
  return weeks;
}, new Map<string, { key: string; date: Date; period: ReportPeriod; rows: ReportRow[] }>()).values())
  .sort((left, right) => left.date.getTime() - right.date.getTime())
  .map((week) => ({
    key: week.key,
    label: week.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    period: week.period,
    cases: week.rows.length,
    mean: mean(week.rows.map((row) => row.tatWorkingDays)),
    median: median(week.rows.map((row) => row.tatWorkingDays)),
  }));

export const exampleMissingSource = cutoverRows.find((row) => !row.structuredAccessionAt && row.sourceDocumentTime)!;

export const openingChoices = [
  {
    id: "review",
    label: "Look at TAT by week before deciding whether it improved",
    feedback: "Yes. The post-go-live mean is worse while the median is better. Looking at the weeks separately can show whether a short period of very long TAT is pulling the mean upward.",
    correct: true,
  },
  {
    id: "present",
    label: "Report that TAT improved because the post-go-live median is lower",
    feedback: "The median is slightly lower, but the mean is higher. Reporting only the median would hide the very long cases that increased the mean.",
    correct: false,
  },
  {
    id: "discard",
    label: "Report that TAT worsened because the post-go-live mean is higher",
    feedback: "The higher mean matters, but it does not describe what happened to most cases. First find out whether a smaller group of unusually long cases explains the difference between the mean and median.",
    correct: false,
  },
];

export const dataPath = [
  { id: "requisition", label: "Scanned requisition", detail: "This case arrived after the accessioning function was taken offline Tuesday morning. The accessioning staff wrote 08:56 on the requisition and in the paper cutover log." },
  { id: "lis", label: "LIS accession record", detail: "When the case was entered later, the back-entry procedure did not include the original accession time. The structured field is blank in this case and 26 other cutover cases." },
  { id: "export", label: "Case list sent to the spreadsheet", detail: "All 35 cutover cases are on the list. The structured LIS accession-time field is blank in 27 rows, so the quality coordinator checks the requisitions and cutover log." },
  { id: "spreadsheet", label: "TAT spreadsheet", detail: "For those 27 cases, the coordinator enters the documented cutover time in a separate source-time column. The spreadsheet uses that time to calculate TAT and keeps the cases in the report." },
  { id: "meeting", label: "Summary prepared for the quality meeting", detail: "All 35 cutover cases are included in the 245-case post-go-live group. The very long cutover cases pull the post-go-live mean up to 3.8 days, while the median remains 2.5 days." },
];

export const dataPathInstruction = "This section connects the single case you just reviewed with the monthly report. Read the five steps from top to bottom, then answer the question below.";

export const dataPathChoices = [
  {
    id: "missing-both",
    label: "The accession time is missing from both the requisition and the LIS",
    correct: false,
    feedback: "The requisition contains the accession time 08:56. The time is missing only from the structured LIS field.",
  },
  {
    id: "blank-lis",
    label: "The quality coordinator used the time documented on the requisition and in the cutover log",
    correct: true,
    feedback: "The structured LIS field is blank, but the same accession event was documented during cutover. The coordinator entered that documented time in a separate spreadsheet column, calculated TAT, and kept the case in the report.",
  },
  {
    id: "not-final",
    label: "The spreadsheet used the time when the case was entered into the LIS later",
    correct: false,
    feedback: "That later entry time is not the accession time and would make TAT look shorter. The calculation used the original time documented during cutover.",
  },
] as const;

export const reportTableInstructions = [
  `Search for ${exampleMissingSource.accessionId}. Confirm that its structured LIS accession-time field is blank and that the report uses the time from the requisition and cutover log.`,
  "Clear the search and choose Cutover week as the period. All 35 cutover cases are listed.",
  "Show the cases included in the original pre/post comparison. All 35 cutover cases are included in the post-go-live group.",
  "Then show the cases in the post-go-live group after cutover is separated. The 35 cutover cases remain in the report, but they are no longer mixed with the later post-go-live cases.",
] as const;

export const qualityChecks = [
  {
    id: "source-time",
    prompt: "Does the accession time in the LIS match the time on the requisition?",
    answer: "accuracy",
    explanation: "This checks accuracy. For the example case, the requisition shows a time but the structured LIS field is blank.",
  },
  {
    id: "missing-time",
    prompt: "Are all required accession times present?",
    answer: "completeness",
    explanation: "This checks completeness. Twenty-seven cutover cases lack the required structured field.",
  },
  {
    id: "allowed-time",
    prompt: "Is each timestamp in the expected format and sequence?",
    answer: "validity",
    explanation: "This checks validity: a timestamp should follow the accepted format and finalization should not precede accession.",
  },
  {
    id: "same-definition",
    prompt: "Do all three periods use the same start point, endpoint, and eligible-case definition?",
    answer: "consistency",
    explanation: "This checks consistency. All three periods must measure accession to the initial final report for the same eligible case types.",
  },
  {
    id: "one-row",
    prompt: "Does each accession appear once even if the report was later amended?",
    answer: "uniqueness",
    explanation: "This checks uniqueness. Amendments are tracked, but they do not create a second accession row.",
  },
  {
    id: "complete-period",
    prompt: "Was the report prepared after all cases through the end of the reporting period had been finalized?",
    answer: "timeliness",
    explanation: "This checks timeliness. A report run before late cases are finalized would be incomplete for the period.",
  },
  {
    id: "meeting-use",
    prompt: "Is this comparison adequate for the claim the laboratory plans to make?",
    answer: "fitness",
    explanation: "This checks fitness for purpose. One post-go-live group hides the difference between a difficult cutover week and the later routine workflow.",
  },
] as const;

export const qualityTerms = [
  ["", "Choose a dimension"],
  ["accuracy", "Accuracy"],
  ["completeness", "Completeness"],
  ["validity", "Validity"],
  ["consistency", "Consistency"],
  ["uniqueness", "Uniqueness"],
  ["timeliness", "Timeliness"],
  ["fitness", "Fitness for purpose"],
] as const;

export const repairChoices = [
  {
    id: "defined-cutover",
    label: "Report pre-go-live, cutover week, and post-go-live after cutover as three separate groups",
    detail: "Keep all 455 cases in the report and state which dates belong to each group.",
    correct: true,
    feedback: "This shows the temporary cutover delay without allowing it to describe the laboratory's later performance. No cases are hidden: the 35 cutover cases remain visible in their own group.",
  },
  {
    id: "missing-only",
    label: "Remove the 27 cutover cases whose LIS accession-time field is blank",
    detail: "Keep the other eight cutover cases in the post-go-live group.",
    correct: false,
    feedback: "The accession times for those 27 cases were recovered from the requisitions and cutover log. Removing only the delayed cases would make post-go-live TAT look better by hiding the cases with the longest delays.",
  },
  {
    id: "creation-time",
    label: "Keep one post-go-live group and report only the median",
    detail: "Do not show the mean or the cutover week separately.",
    correct: false,
    feedback: "The median describes the middle case, but it does not show the severe delays during cutover. The mean and median should both be reported, and cutover week should be visible as its own period.",
  },
];

export const validationCases = [
  { label: "Three periods", result: "The report shows 210 pre-go-live cases, 35 cutover cases, and 210 post-go-live cases after cutover." },
  { label: "All cases retained", result: "Each of the 455 cases appears once; the cutover cases are separated, not deleted." },
  { label: "TAT definition", result: "All three periods use accession to the initial final report, measured in working days." },
  { label: "Accession-time source", result: "The report identifies the 27 cutover times recovered from requisitions and the paper cutover log." },
  { label: "Amendments", result: "Amended reports remain linked to one accession row." },
  { label: "Summary statistics", result: "Mean, median, and biopsy/resection counts remain available for each period." },
  { label: "Future workflow", result: "The structured accession-time field is required after cutover." },
];

export const workingDaysBetween = (start: Date, end: Date): number => {
  if (end < start) return -workingDaysBetween(end, start);
  const cursor = new Date(start);
  let weekdays = 0;
  while (cursor.toDateString() !== end.toDateString()) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) weekdays += 1;
  }
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  return weekdays + (endMinutes - startMinutes) / (24 * 60);
};
