import type { PierCoverageClaim } from "./types";

export type PlannedTopic2Lesson = {
  proposedId: 3 | 4 | 5 | 6 | 7;
  slug: string;
  title: string;
  published: boolean;
  claims: PierCoverageClaim[];
};

const claim = (id: string, objective: "2.1" | "2.2" | "2.3" | "2.4", summary: string, learnerAction: string): PierCoverageClaim => ({
  id,
  objective,
  summary,
  learnerAction,
  primary: true,
});

// Lessons 4–7 remain an internal curriculum plan. They are intentionally not
// added to the public lesson registry until their complete packages are built.
export const topic2CurriculumPlan: PlannedTopic2Lesson[] = [
  {
    proposedId: 3,
    slug: "can-we-trust-this-report",
    title: "Can We Trust This Report?",
    published: true,
    claims: [
      claim("2.1-data-representation", "2.1", "Structured and unstructured laboratory data", "Compare a blank structured LIS field with an accession time visible on a scanned requisition."),
      claim("2.1-data-quality", "2.1", "Seven data-quality dimensions", "Apply accuracy, completeness, validity, consistency, uniqueness, timeliness, and fitness for purpose to specific report checks."),
      claim("2.1-data-flow", "2.1", "Data flow from creation to use", "Trace an accession time through accessioning, the LIS, an export, a spreadsheet, and a laboratory quality meeting."),
      claim("2.1-pathology-data-science", "2.1", "Examples of data science in pathology", "Relate the TAT case to statistical analysis, linked clinical data, image analysis, and AI/ML."),
    ],
  },
  {
    proposedId: 4,
    slug: "can-we-accept-this-lot",
    title: "Can We Accept This Lot?",
    published: false,
    claims: [
      claim("2.2-central-tendency", "2.2", "Mean and median", "Compare the mean and median of paired troponin lot differences and explain what each shows."),
      claim("2.2-dispersion", "2.2", "Standard deviation and distributions", "Inspect the spread, shape, and outliers in a paired reagent-lot comparison."),
      claim("2.2-confidence-intervals", "2.2", "Confidence intervals", "Interpret the confidence interval for the observed lot difference against a clinical acceptance limit."),
      claim("2.2-hypothesis-testing", "2.2", "Hypothesis testing and p-values", "Explain what the p-value answers and why it does not by itself determine lot acceptance."),
      claim("2.2-test-selection", "2.2", "Common statistical tests", "Choose an appropriate test for the paired comparison from a constrained set and justify the choice."),
    ],
  },
  {
    proposedId: 5,
    slug: "can-we-trust-the-tumor-board-view",
    title: "Can We Trust the Tumor-Board View?",
    published: false,
    claims: [
      claim("2.3-five-vs", "2.3", "Volume, velocity, variety, veracity, and value", "Apply all five Vs to a multimodal lung-cancer dataset."),
      claim("2.3-multimodal-sources", "2.3", "Imaging, genomic, pathology, and EHR data", "Identify the patient-, specimen-, block-, and case-level links needed across a report, WSI, PD-L1 result, genomic findings, and EHR information."),
      claim("2.3-pathology-integration", "2.3", "Integration into pathology practice", "Repair mismatched links and decide whether the combined tumor-board view is safe to present."),
    ],
  },
  {
    proposedId: 6,
    slug: "before-we-pilot-an-ai-tool",
    title: "Before We Pilot an AI Tool",
    published: false,
    claims: [
      claim("2.4-ai-ml-definitions", "2.4", "Artificial intelligence and machine learning definitions", "Distinguish an AI/ML system from a conventional programmed laboratory rule."),
      claim("2.4-supervised-unsupervised", "2.4", "Supervised and unsupervised learning", "Classify supervised image detection and unsupervised molecular clustering proposals correctly."),
      claim("2.4-cnns-generative-ai", "2.4", "Convolutional neural networks and generative AI", "Identify the model type and principal review need in a CNN proposal and a generative tumor-board summary proposal."),
      claim("2.4-pathology-applications", "2.4", "Pathology AI/ML applications", "Recommend proceed, revise, or decline for four proposed pathology uses and explain the laboratory problem each tool is meant to address."),
    ],
  },
  {
    proposedId: 7,
    slug: "can-we-use-this-model-here",
    title: "Can We Use This Model Here?",
    published: false,
    claims: [
      claim("2.4-local-verification", "2.4", "Local verification", "Test a metastasis second-review model on local slides, scanners, and clinically important subgroups."),
      claim("2.4-generalizability-bias", "2.4", "Generalizability and bias", "Identify a subgroup failure after transfer to a laboratory with a different scanner and case mix."),
      claim("2.4-drift-brittleness", "2.4", "Drift and brittleness", "Distinguish an initial generalizability failure from a later change in performance and identify brittle behavior."),
      claim("2.4-implementation-monitoring", "2.4", "Implementation and monitoring", "Define intended use, human review, acceptance criteria, change review, and post-deployment performance checks."),
      claim("2.4-ethics-regulation", "2.4", "Ethical and regulatory considerations", "Identify patient-safety, equity, accountability, documentation, and regulatory questions before deployment."),
    ],
  },
];
