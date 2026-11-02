import lotComparisonCsv from "../../../src/generated/lesson4LotComparison";

export type TroponinRange = "very-low" | "decision" | "elevated";

export type LotResultRow = {
  specimenId: string;
  rangeGroup: TroponinRange;
  currentLot: number;
  newLot: number;
  difference: number;
  percentDifference: number;
};

export const mean = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

export const median = (values: number[]) => {
  const sorted = [...values].sort((left, right) => left - right);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[midpoint] : (sorted[midpoint - 1] + sorted[midpoint]) / 2;
};

export const sampleStandardDeviation = (values: number[]) => {
  const average = mean(values);
  return Math.sqrt(
    values.reduce((sum, value) => sum + (value - average) ** 2, 0) / (values.length - 1),
  );
};

export const lotResults: LotResultRow[] = lotComparisonCsv
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [specimenId, rangeGroup, currentLot, newLot] = line.trim().split(",");
    const current = Number(currentLot);
    const next = Number(newLot);
    return {
      specimenId,
      rangeGroup: rangeGroup as TroponinRange,
      currentLot: current,
      newLot: next,
      difference: Number((next - current).toFixed(1)),
      percentDifference: Number((((next - current) / current) * 100).toFixed(1)),
    };
  });

export const veryLowResults = lotResults.filter((row) => row.rangeGroup === "very-low");
export const decisionResults = lotResults.filter((row) => row.rangeGroup === "decision");
export const elevatedResults = lotResults.filter((row) => row.rangeGroup === "elevated");

const decisionDifferences = decisionResults.map((row) => row.difference);
const t95For17Df = 2.1098;
const decisionMean = mean(decisionDifferences);
const decisionSd = sampleStandardDeviation(decisionDifferences);
const standardError = decisionSd / Math.sqrt(decisionDifferences.length);

export const decisionSummary = {
  specimens: decisionResults.length,
  mean: decisionMean,
  median: median(decisionDifferences),
  standardDeviation: decisionSd,
  confidenceLow: decisionMean - t95For17Df * standardError,
  confidenceHigh: decisionMean + t95For17Df * standardError,
  tStatistic: decisionMean / standardError,
  pDisplay: "< 0.001",
};

export const lowRangePasses = veryLowResults.every((row) => row.currentLot < 2 && row.newLot < 2);
export const elevatedRangePasses = elevatedResults.every(
  (row) => Math.abs(row.percentDifference) <= 10,
);
export const confidenceIntervalPasses =
  decisionSummary.confidenceLow >= -2 && decisionSummary.confidenceHigh <= 2;
export const lotComparisonCsvUrl = new URL("./lot-comparison.csv", import.meta.url).href;

export const patternChoices = [
  {
    id: "small-positive-tail",
    label: "Mostly higher results, with a positive tail",
    correct: true,
    feedback:
      "Most points are above zero. Several larger positive differences make a small tail to the right, but no single specimen sits far away from the rest.",
  },
  {
    id: "no-direction",
    label: "The differences are evenly balanced above and below zero",
    correct: false,
    feedback:
      "Only two differences are below zero, and one is exactly zero. Most results are higher on the new lot.",
  },
  {
    id: "single-outlier",
    label: "One extreme specimen explains the entire difference between the lots",
    correct: false,
    feedback:
      "The plot has a tail to the right, but no single point stands apart and explains the whole pattern.",
  },
] as const;

export const descriptiveChecks = [
  {
    id: "mean",
    prompt:
      "Several large positive differences pull one summary above the median of +0.8 ng/L. Which summary is +1.2 ng/L?",
    answer: "mean",
    explanation: "The mean is the sum of the 18 paired differences divided by 18.",
  },
  {
    id: "median",
    prompt:
      "If a few large positive differences increased further, which center would change less?",
    answer: "median",
    explanation:
      "The median is the middle of the ordered differences, so the larger values in the tail move it less.",
  },
  {
    id: "standard-deviation",
    prompt:
      "Which summary, if increased to 4.0 ng/L with the same sample size, would widen the confidence interval?",
    answer: "standard-deviation",
    explanation:
      "The standard deviation measures how much the individual differences vary. With the same 18 specimens, more spread makes the average less precise and widens its confidence interval.",
  },
] as const;

export const descriptiveTerms = [
  ["", "Choose a statistic"],
  ["mean", "Mean"],
  ["median", "Median"],
  ["standard-deviation", "Standard deviation"],
] as const;

export const pValueChoices = [
  {
    id: "evidence-difference",
    label: "The specimens provide evidence that the lots have an average difference",
    correct: true,
    feedback:
      "Yes. The paired test asks whether the average difference could reasonably be zero. It does not say whether a difference of this size is acceptable for patient testing.",
  },
  {
    id: "reject-lot",
    label: "The new lot must be rejected because p is below 0.05",
    correct: false,
    feedback:
      "A small p-value suggests a measurable difference. You still have to compare its size and confidence interval with the limit the laboratory set.",
  },
  {
    id: "individual-range",
    label: "More than 99.9% of individual specimens fall within the acceptable range",
    correct: false,
    feedback:
      "The p-value says nothing about what share of individual results falls inside an acceptable range.",
  },
] as const;

export const confidenceChoices = [
  {
    id: "average-range",
    label: "The comparison supports an average shift of approximately +0.6 to +1.8 ng/L",
    correct: true,
    feedback:
      "Yes. The interval shows how uncertain the average difference is. It does not show where 95% of individual results fall.",
  },
  {
    id: "individual-results",
    label: "Ninety-five percent of individual paired differences lie between +0.6 and +1.8 ng/L",
    correct: false,
    feedback:
      "That is not what this confidence interval means. It is a range for the average difference, not for individual specimens.",
  },
  {
    id: "repeat-guarantee",
    label: "A repeat comparison is guaranteed to have a mean between +0.6 and +1.8 ng/L",
    correct: false,
    feedback:
      "A confidence interval shows uncertainty. It does not promise what the next comparison will find.",
  },
] as const;

export const testOptions = [
  ["", "Choose a test"],
  ["paired-t", "Paired t-test"],
  ["wilcoxon", "Wilcoxon signed-rank test"],
  ["independent-t", "Independent-samples t-test"],
  ["anova", "Analysis of variance (ANOVA)"],
  ["fisher", "Fisher exact test"],
] as const;

export const testScenarios = [
  {
    id: "lot-pairs",
    prompt:
      "The same specimens are tested with the current and new reagent lots. The paired differences have no marked outlier or severe skew.",
    answer: "paired-t",
    explanation:
      "Use a paired t-test: both measurements come from the same specimen, and the question is about the mean paired difference.",
  },
  {
    id: "skewed-pairs",
    prompt:
      "The same tumors have a numerical measurement before and after decalcification. The paired differences are roughly symmetric but are not normally distributed; a rank-based comparison is planned.",
    answer: "wilcoxon",
    explanation:
      "The Wilcoxon signed-rank test uses the signs and ranks of the paired differences. It suits these differences because they are roughly symmetric, even though they are not normally distributed. Strong skew on its own would not be a reason to choose it.",
  },
  {
    id: "unrelated-groups",
    prompt: "Mean hemoglobin is compared between two unrelated patient groups.",
    answer: "independent-t",
    explanation:
      "An independent-samples t-test compares the means of two unrelated groups, as long as its assumptions hold.",
  },
  {
    id: "three-fixatives",
    prompt:
      "Mean RNA yield is compared across independent tissue samples assigned to three different fixatives.",
    answer: "anova",
    explanation:
      "ANOVA compares a numerical result across three or more groups, as long as its assumptions hold.",
  },
  {
    id: "small-categories",
    prompt: "BRAF mutation detected or not detected is compared between two small patient groups.",
    answer: "fisher",
    explanation:
      "The Fisher exact test compares counts in categories and works well when the groups, or the expected counts, are small.",
  },
] as const;

export const finalChoices = [
  {
    id: "accept-monitor",
    label: "Approve after review and document the shift",
    detail:
      "The confidence interval is inside the limit set before testing, and the very low and elevated checks pass.",
    correct: true,
    feedback:
      "The new lot reads slightly higher on average, but well within the limit the director set before testing. Record the shift and monitor results after the change.",
  },
  {
    id: "reject-p",
    label: "Reject the new lot because p is below 0.001",
    detail: "Treat any difference the statistics can detect as unacceptable.",
    correct: false,
    feedback:
      "The p-value suggests the lots differ. It does not show that the difference is too large for patient testing.",
  },
  {
    id: "ignore-shift",
    label: "Accept the lot without documenting or monitoring the shift",
    detail: "The mean difference is less than 2 ng/L, so no follow-up is needed.",
    correct: false,
    feedback:
      "Record the average shift even when the lot meets the criteria. The chemistry team should carry out its planned checks after the change, so that a later problem is noticed.",
  },
] as const;

export const validationChecks = [
  {
    passingRepairs: ["accept-monitor", "reject-p", "ignore-shift"] as string[],
    failNote: "The specimens must remain paired.",
    label: "Paired design",
    detail: "The same patient specimens were tested with both reagent lots.",
  },
  {
    passingRepairs: ["accept-monitor", "reject-p", "ignore-shift"] as string[],
    failNote: "The main analysis must use the concentration group chosen before testing.",
    label: "Primary range",
    detail:
      "The main statistics use the 18 specimens near the laboratory's clinical decision concentration.",
  },
  {
    passingRepairs: ["accept-monitor", "ignore-shift"] as string[],
    failNote: "A p-value alone does not describe the size or spread of the shift.",
    label: "Estimated shift",
    detail: "The mean, median, standard deviation and plot are reviewed together.",
  },
  {
    passingRepairs: ["accept-monitor"] as string[],
    failNote: "Compare the confidence interval with the limit set before testing.",
    label: "Uncertainty",
    detail: "The confidence interval is compared with the limit set before testing.",
  },
  {
    passingRepairs: ["accept-monitor", "ignore-shift"] as string[],
    failNote: "Review both low and elevated specimens.",
    label: "Other concentrations",
    detail: "Very low and markedly elevated specimens pass their separate checks.",
  },
  {
    passingRepairs: ["accept-monitor"] as string[],
    failNote: "The complete comparison needs director approval.",
    label: "Medical approval",
    detail:
      "The laboratory director reviews the whole comparison before the new lot is used for patients.",
  },
  {
    passingRepairs: ["accept-monitor"] as string[],
    failNote: "Without a record of the shift, nobody can follow it up.",
    label: "After the change",
    detail: "The small upward shift is recorded and monitored after the change.",
  },
] as const;

export const lessonCopy = {
  text01:
    "Most new-lot results are slightly higher. Several larger positive differences make a small tail to the right, with no single extreme result.",
  text02:
    "Each dot is one of the 18 specimens near the clinical decision concentration. Values above zero are higher with the new lot.",
  text03:
    "The 95 percent confidence interval runs from positive 0.6 to positive 1.8 nanograms per liter and remains within the laboratory's acceptable range of negative 2 to positive 2.",
  text04:
    "The main statistics describe the 18 specimens near the clinical decision concentration. The laboratory also checks whether the two lots agree at the low and high ends.",
  text05:
    "The new lot reads higher on average, but the confidence interval stays inside the range the director set before testing. The low and high checks also pass. Choose the next step.",
  text06:
    "The pattern of differences, the summary numbers, the confidence interval, the limit set before testing and the low and high checks all support accepting the lot once the director has reviewed it.",
};

export const statisticChoiceFeedback: Record<string, string> = {
  mean: "The mean describes the average of all the differences.",
  median: "The median describes the middle of the ordered differences.",
  "standard-deviation":
    "The standard deviation describes the spread of individual differences around their mean.",
};
export const testChoiceFeedback: Record<string, string> = {
  "paired-t": "A paired t-test addresses the mean difference within matched pairs.",
  wilcoxon: "The signed-rank test uses paired differences and assumes they are roughly symmetric.",
  "independent-t": "An independent-samples t-test compares means from two unrelated groups.",
  anova:
    "ANOVA, as taught here, compares a numerical result across three or more unrelated groups.",
  fisher: "The Fisher exact test compares counts in categories, such as detected and not detected.",
};
