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
      "Most points are above zero. Several larger positive differences form a modest right-sided tail, but no single specimen is markedly separated from the rest.",
  },
  {
    id: "no-direction",
    label: "The differences are evenly balanced above and below zero",
    correct: false,
    feedback:
      "Only two differences are below zero and one is zero. Most results are higher with the new lot.",
  },
  {
    id: "single-outlier",
    label: "One extreme specimen explains the entire difference between the lots",
    correct: false,
    feedback:
      "The plot has a right-sided tail, but there is no single isolated point that explains the overall pattern.",
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
      "The median is the middle of the ordered differences and is less affected by the larger positive values in the tail.",
  },
  {
    id: "standard-deviation",
    prompt:
      "Which summary, if increased to 4.0 ng/L with the same sample size, would widen the confidence interval?",
    answer: "standard-deviation",
    explanation:
      "Larger standard deviation increases the standard error at the same sample size. The interval would widen, so the laboratory would reassess whether it lies within the approved medical limit.",
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
      "Yes. The paired test asks whether the average difference could reasonably be zero. It does not decide whether the measured difference is medically acceptable.",
  },
  {
    id: "reject-lot",
    label: "The new lot must be rejected because p is below 0.05",
    correct: false,
    feedback:
      "A small p-value supports a measurable difference. The size and confidence interval must still be compared with the laboratory's medical acceptance limit.",
  },
  {
    id: "individual-range",
    label: "More than 99.9% of individual specimens fall within the acceptable range",
    correct: false,
    feedback:
      "The p-value does not describe the percentage of individual results inside an acceptance range.",
  },
] as const;

export const confidenceChoices = [
  {
    id: "average-range",
    label: "The comparison supports an average shift of approximately +0.6 to +1.8 ng/L",
    correct: true,
    feedback:
      "Yes. This interval describes uncertainty around the estimated mean paired difference, not the location of 95% of individual results.",
  },
  {
    id: "individual-results",
    label: "Ninety-five percent of individual paired differences lie between +0.6 and +1.8 ng/L",
    correct: false,
    feedback:
      "That is not what this confidence interval means. It is an interval for the average paired difference.",
  },
  {
    id: "repeat-guarantee",
    label: "A repeat comparison is guaranteed to have a mean between +0.6 and +1.8 ng/L",
    correct: false,
    feedback:
      "A confidence interval expresses uncertainty; it does not guarantee the result of the next sample.",
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
      "Use a paired t-test because both measurements come from the same specimen and the analysis concerns the mean paired difference.",
  },
  {
    id: "skewed-pairs",
    prompt:
      "The same tumors are scored before and after decalcification, but the paired score differences are markedly skewed.",
    answer: "wilcoxon",
    explanation:
      "The Wilcoxon signed-rank test is a common nonparametric choice for paired numerical data with markedly non-normal differences.",
  },
  {
    id: "unrelated-groups",
    prompt: "Mean hemoglobin is compared between two unrelated patient groups.",
    answer: "independent-t",
    explanation:
      "An independent-samples t-test compares the means of two unrelated groups when its assumptions are reasonable.",
  },
  {
    id: "three-fixatives",
    prompt: "Mean RNA yield is compared across tissue processed with three different fixatives.",
    answer: "anova",
    explanation:
      "ANOVA is used to compare a numerical outcome across three or more groups when its assumptions are reasonable.",
  },
  {
    id: "small-categories",
    prompt: "BRAF mutation detected or not detected is compared between two small patient groups.",
    answer: "fisher",
    explanation:
      "Fisher exact test compares categorical counts and is appropriate when the groups or expected cell counts are small.",
  },
] as const;

export const finalChoices = [
  {
    id: "accept-monitor",
    label: "Accept after director review; document and monitor",
    detail:
      "The confidence interval is inside the predetermined limit, and the very low and elevated checks pass.",
    correct: true,
    feedback:
      "The data support a small average increase that remains within the laboratory's predetermined medical limit. The laboratory should document the shift and monitor results after the change.",
  },
  {
    id: "reject-p",
    label: "Reject the new lot because p is below 0.001",
    detail: "Treat any statistically detectable difference as unacceptable.",
    correct: false,
    feedback:
      "The p-value supports the presence of a difference but does not say that the difference is too large for patient testing.",
  },
  {
    id: "ignore-shift",
    label: "Accept the lot without documenting or monitoring the shift",
    detail: "The mean difference is less than 2 ng/L, so no follow-up is needed.",
    correct: false,
    feedback:
      "The lot can be accepted, but the consistent positive shift should still be documented and monitored after implementation.",
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
    failNote: "The primary analysis must use the predefined concentration group.",
    label: "Primary range",
    detail:
      "The main statistics use 18 specimens near the laboratory's clinical decision concentration.",
  },
  {
    passingRepairs: ["accept-monitor", "ignore-shift"] as string[],
    failNote: "A p-value alone does not describe the size or spread of the shift.",
    label: "Estimated shift",
    detail: "Mean, median, standard deviation, and the distribution are reviewed together.",
  },
  {
    passingRepairs: ["accept-monitor"] as string[],
    failNote: "Compare the confidence interval with the predefined clinical limit.",
    label: "Uncertainty",
    detail: "The confidence interval is compared with the limit established before testing.",
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
      "The laboratory director reviews the complete comparison before the lot is placed in service.",
  },
  {
    passingRepairs: ["accept-monitor"] as string[],
    failNote: "Acceptance without documenting the shift leaves follow-up incomplete.",
    label: "After the change",
    detail: "The small positive shift is documented and monitored after implementation.",
  },
] as const;

export const lessonCopy = {
  text01:
    "Most new-lot results are slightly higher. Several larger positive differences create a modest right-sided tail without one isolated extreme result.",
  text02:
    "Each dot is one of the 18 specimens near the clinical decision concentration. Values above zero are higher with the new lot.",
  text03:
    "The 95 percent confidence interval runs from positive 0.6 to positive 1.8 nanograms per liter and remains within the laboratory's acceptable range of negative 2 to positive 2.",
  text04:
    "The main statistics describe the 18 specimens near the clinical decision concentration. The laboratory also checks whether the two lots agree at the low and high ends of the comparison.",
  text05:
    "The average shift is measurable, but its confidence interval remains within the range the laboratory accepted before testing. The low- and high-concentration checks also pass. Choose the next step.",
  text06:
    "The paired result pattern, summary statistics, confidence interval, predetermined medical limit, and checks at the low and high ends of the range all support acceptance after laboratory-director review.",
};
