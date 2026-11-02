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
  originalTwoPeriodGroup: boolean;
  revisedThreePeriodGroup: boolean;
};

const parseBoolean = (value: string) => value === "yes";

export const reportRows: ReportRow[] = reportCsv
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [
      accessionId,
      period,
      accessionedAt,
      structuredAccessionAt,
      sourceDocumentTime,
      finalizedAt,
      tatWorkingDays,
      specimenGroup,
      eligible,
      amended,
      originalTwoPeriodGroup,
      revisedThreePeriodGroup,
    ] = line.trim().split(",");
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
      originalTwoPeriodGroup: parseBoolean(originalTwoPeriodGroup),
      revisedThreePeriodGroup: parseBoolean(revisedThreePeriodGroup),
    };
  });

export const reportCsvUrl = new URL("./report.csv", import.meta.url).href;

export const mean = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

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
export const originalPostRows = reportRows.filter((row) => row.originalTwoPeriodGroup);
export const fairPostRows = reportRows.filter((row) => row.revisedThreePeriodGroup);

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

export const weeklyTat = Array.from(
  reportRows
    .reduce((weeks, row) => {
      const monday = mondayFor(row.accessionedAt);
      const key = monday.toISOString().slice(0, 10);
      const existing = weeks.get(key) ?? {
        key,
        date: monday,
        period: row.period,
        rows: [] as ReportRow[],
      };
      existing.rows.push(row);
      weeks.set(key, existing);
      return weeks;
    }, new Map<string, { key: string; date: Date; period: ReportPeriod; rows: ReportRow[] }>())
    .values(),
)
  .sort((left, right) => left.date.getTime() - right.date.getTime())
  .map((week) => ({
    key: week.key,
    label: week.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    period: week.period,
    cases: week.rows.length,
    mean: mean(week.rows.map((row) => row.tatWorkingDays)),
    median: median(week.rows.map((row) => row.tatWorkingDays)),
  }));

export const exampleMissingSource = cutoverRows.find(
  (row) => !row.structuredAccessionAt && row.sourceDocumentTime,
)!;

export const openingChoices = [
  {
    id: "review",
    label: "Look at TAT by week before deciding whether it improved",
    feedback:
      "Yes. After go-live the mean is worse but the median is better. Looking at the weeks one by one will show whether a short stretch of very long TATs is pulling the mean up.",
    correct: true,
  },
  {
    id: "present",
    label: "Report that TAT improved because the post-go-live median is lower",
    feedback:
      "The median is slightly lower, but the mean is higher. Reporting only the median would hide the very long cases that increased the mean.",
    correct: false,
  },
  {
    id: "discard",
    label: "Report that TAT worsened because the post-go-live mean is higher",
    feedback:
      "The higher mean matters, but it does not describe what happened to most cases. First find out whether a small group of unusually long cases explains the gap between the mean and the median.",
    correct: false,
  },
];

export const dataPath = [
  {
    id: "requisition",
    label: "Scanned requisition",
    detail:
      "This case arrived after accessioning in the LIS was switched off on Tuesday morning. Accessioning staff wrote 08:56 on the requisition and in the paper cutover log.",
  },
  {
    id: "lis",
    label: "LIS accession record",
    detail:
      "When the case was typed into the LIS later, nobody entered the original accession time. The field is blank for this case and 26 other cutover cases.",
  },
  {
    id: "export",
    label: "Case list sent to the spreadsheet",
    detail:
      "All 35 cutover cases are on the list. The LIS accession-time field is blank in 27 rows, so the quality coordinator looks the times up on the requisitions and in the cutover log.",
  },
  {
    id: "spreadsheet",
    label: "TAT spreadsheet",
    detail:
      "For those 27 cases, the coordinator types the time from the paper records into a separate column. The spreadsheet uses that time to calculate TAT, and the cases stay in the report.",
  },
  {
    id: "meeting",
    label: "Summary prepared for the quality meeting",
    detail:
      "All 35 cutover cases are in the 245-case post-go-live group. The very long cutover cases pull the post-go-live mean up to 3.8 days, while the median stays at 2.5.",
  },
];

export const dataPathInstruction =
  "This section follows the case you just looked at into the monthly report. Read the five steps from top to bottom, then answer the question below.";

export const dataPathChoices = [
  {
    id: "missing-both",
    label: "It could not be calculated because neither source contained an accession time",
    correct: false,
    feedback:
      "The requisition contains the accession time 08:56. The time is missing only from the structured LIS field.",
  },
  {
    id: "blank-lis",
    label: "The coordinator used the requisition and cutover log",
    correct: true,
    feedback:
      "The LIS field is blank, but the accession time was written down on paper during cutover. The coordinator typed that time into a separate column, calculated TAT and kept the case in the report.",
  },
  {
    id: "not-final",
    label: "The spreadsheet used the time when the case was entered into the LIS later",
    correct: false,
    feedback:
      "The time the case was typed in later is not the accession time, and using it would make TAT look shorter. The calculation used the original time written down during cutover.",
  },
] as const;

export const reportTableInstructions = [
  `Search for ${exampleMissingSource.accessionId}. Check that its LIS accession-time field is blank and that the report uses the time from the requisition and cutover log.`,
  "Clear the search and choose Cutover week as the period. All 35 cutover cases are listed.",
  "Show the cases in the original before-and-after comparison. All 35 cutover cases are in the post-go-live group.",
  "Then show the post-go-live group with cutover week taken out. The 35 cutover cases are still in the report, but no longer mixed in with the later weeks.",
] as const;

export const qualityChecks = [
  {
    id: "source-time",
    prompt: "Does the accession time in the LIS match the time on the requisition?",
    answer: "accuracy",
    explanation:
      "This checks accuracy: an accession time in the LIS should agree with the requisition. For the 428 cases that have a time in the LIS, the two can be compared. For the 27 blank fields there is nothing to compare yet; that is a completeness problem.",
  },
  {
    id: "missing-time",
    prompt: "Are all required accession times present?",
    answer: "completeness",
    explanation:
      "This checks completeness. Twenty-seven cutover cases lack the required structured field.",
  },
  {
    id: "allowed-time",
    prompt: "Is each timestamp in the expected format and sequence?",
    answer: "validity",
    explanation:
      "This checks validity: each timestamp should be in the right format, and no case should be signed out before it was accessioned.",
  },
  {
    id: "same-definition",
    prompt:
      "Do all three periods use the same start point, endpoint, and eligible-case definition?",
    answer: "consistency",
    explanation:
      "This checks consistency. All three periods must measure accession to the initial final report for the same eligible case types.",
  },
  {
    id: "one-row",
    prompt: "Does each accession appear once even if the report was later amended?",
    answer: "uniqueness",
    explanation:
      "This checks uniqueness. Amendments are tracked, but they do not create a second accession row.",
  },
  {
    id: "complete-period",
    prompt:
      "Was the report prepared after all cases through the end of the reporting period had been finalized?",
    answer: "timeliness",
    explanation:
      "This checks timeliness. A report run before late cases are finalized would be incomplete for the period.",
  },
  {
    id: "meeting-use",
    prompt: "Can this comparison support what the laboratory plans to say at the meeting?",
    answer: "fitness",
    explanation:
      "This checks fitness for purpose. One post-go-live group hides the difference between a difficult cutover week and the ordinary weeks that followed.",
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
    label: "Report all cases in three defined periods",
    detail: "Keep all 455 cases in the report and state which dates belong to each group.",
    correct: true,
    feedback:
      "This shows the cutover delay without letting it stand for how the laboratory did afterward. Nothing is hidden: the 35 cutover cases stay in view as their own group.",
  },
  {
    id: "missing-only",
    label: "Remove the 27 cutover cases whose LIS accession-time field is blank",
    detail: "Keep the other eight cutover cases in the post-go-live group.",
    correct: false,
    feedback:
      "The accession times for those 27 cases were found on the requisitions and in the cutover log. Removing them would make post-go-live TAT look better by hiding the longest delays.",
  },
  {
    id: "creation-time",
    label: "Keep one post-go-live group and report only the median",
    detail: "Do not show the mean or the cutover week separately.",
    correct: false,
    feedback:
      "The median describes the middle case, but it hides the severe delays during cutover. Report both the mean and the median, and show cutover week as its own period.",
  },
];

export const validationCases = [
  {
    passingRepairs: ["defined-cutover"] as string[],
    failNote: "This grouping still mixes cutover week with the ordinary weeks.",
    label: "Three periods",
    result:
      "The report shows 210 pre-go-live cases, 35 cutover cases, and 210 post-go-live cases after cutover.",
  },
  {
    passingRepairs: ["defined-cutover", "creation-time"] as string[],
    failNote: "Removing the 27 cases throws away cases known to have long delays.",
    label: "All cases retained",
    result: "Each of the 455 cases appears once; the cutover cases are separated, not deleted.",
  },
  {
    passingRepairs: ["defined-cutover", "missing-only", "creation-time"] as string[],
    failNote: "Measure every group from accession to the first final report.",
    label: "TAT definition",
    result:
      "All three periods use accession to the initial final report, measured in working days.",
  },
  {
    passingRepairs: ["defined-cutover", "creation-time"] as string[],
    failNote: "This report does not say which accession times came from the paper records.",
    label: "Accession-time source",
    result:
      "The report identifies the 27 cutover times recovered from requisitions and the paper cutover log.",
  },
  {
    passingRepairs: ["defined-cutover", "missing-only", "creation-time"] as string[],
    failNote: "Keep amendments attached to the original accession.",
    label: "Amendments",
    result: "Amended reports remain linked to one accession row.",
  },
  {
    passingRepairs: ["defined-cutover"] as string[],
    failNote: "The report needs the mean and median for each period, with the case counts.",
    label: "Summary statistics",
    result: "The mean, median and biopsy and resection counts are shown for each period.",
  },
  {
    passingRepairs: ["defined-cutover"] as string[],
    failNote: "The plan should also stop accession times going missing in future.",
    label: "Before the next report",
    result: "From now on, the LIS will not accept a case without an accession time.",
  },
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

export const lessonCopy = {
  text01:
    "The 35 cutover cases are shown in their own group rather than mixed with the later post-go-live cases",
  text02:
    "Mean and median turnaround time vary before go-live, rise sharply during cutover week and are generally lower afterward. The last two baseline weeks are higher than the first four.",
  text03:
    "Each point summarizes the cases accessioned during one week. The solid line shows the mean; the dashed line shows the median. Cutover week is shaded.",
  text04:
    "Start with the original comparison. Look at the pre- and post-go-live mean and median. Do they point to the same conclusion?",
  text05:
    "This is one of the 27 cutover cases whose accession time was not entered into the structured LIS field. The quality coordinator still calculated its TAT using the time documented during cutover. Compare the LIS record with the scanned requisition and confirm where the time was recorded.",
  text06:
    "The quality coordinator used the time on the requisition and paper cutover log to calculate TAT for this case in the spreadsheet. The case remained in the post-go-live report, but its accession time came from a different source than usual.",
  text07:
    "Use it to confirm that all 35 cutover cases were included in the original post-go-live group and that they remain visible after cutover week is shown separately.",
  text08:
    "The original two-period comparison mixes a difficult cutover week with six ordinary weeks. Choose a way of reporting that shows what happened without hiding any cases.",
  text09:
    "The quality coordinator has now placed the 35 cutover cases in their own group. No cases were removed. Compare the three rows and decide whether they explain why the original post-go-live mean and median disagreed.",
  text10:
    "Cutover cases had a mean TAT of 8.4 working days and a median of 9.5. After cutover, the mean was 3.0 and the median was 2.5. Mixing those periods produced a post-go-live mean of 3.8 even though the median was 2.5.",
  text11:
    "It shows a severe but short-lived delay during cutover and a small improvement afterward. All 455 cases are still there, and the report says that 27 cutover accession times came from the requisitions and the paper cutover log.",
  text12:
    "The weekly view shows why a single before-and-after summary was misleading. Follow both lines across the six weeks before go-live, cutover week, and the six weeks after.",
};

export const qualityChoiceFeedback: Record<string, string> = {
  accuracy: "Accuracy asks whether a recorded value agrees with what happened.",
  completeness: "Completeness asks whether the required information is present.",
  validity: "Validity asks whether a value follows the allowed format and rules.",
  consistency:
    "Consistency asks whether the same definitions are used for all the records being compared.",
  uniqueness: "Uniqueness asks whether the same accession has been counted more than once.",
  timeliness:
    "Timeliness asks whether the data are complete and up to date by the time the report is run.",
  fitness: "Fitness for purpose asks whether the analysis can answer the laboratory's question.",
};
