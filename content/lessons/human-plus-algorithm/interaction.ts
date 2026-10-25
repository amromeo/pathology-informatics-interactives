export type Candidate = {
  id: string;
  truth: boolean;
  score: number;
  site: string;
  description: string;
};
// One row per candidate location in the same prespecified tumor area; no excluded rows.
export const candidates: Candidate[] = [
  { id: "M01", truth: true, score: 0.95, site: "A", description: "Clear mitotic figure" },
  {
    id: "M02",
    truth: true,
    score: 0.8,
    site: "A",
    description: "Mitotic figure near crowded nuclei",
  },
  { id: "M03", truth: true, score: 0.6, site: "A", description: "Less conspicuous mitotic figure" },
  { id: "M04", truth: true, score: 0.4, site: "B", description: "Mitotic figure in pale stain" },
  { id: "M05", truth: true, score: 0.2, site: "B", description: "Mitotic figure near tissue edge" },
  { id: "N01", truth: false, score: 0.9, site: "A", description: "Apoptotic nucleus" },
  { id: "N02", truth: false, score: 0.7, site: "B", description: "Crushed hyperchromatic nucleus" },
  { id: "N03", truth: false, score: 0.5, site: "B", description: "Stain deposit" },
  { id: "N04", truth: false, score: 0.3, site: "A", description: "Lymphocyte" },
  { id: "N05", truth: false, score: 0.1, site: "A", description: "Interphase nucleus" },
  { id: "N06", truth: false, score: 0.05, site: "B", description: "Debris" },
  { id: "N07", truth: false, score: 0.02, site: "B", description: "Interphase nucleus" },
];
export function performance(threshold: number, site = "all") {
  if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1)
    throw new Error("Threshold must be between 0 and 1");
  const rows = candidates
    .filter((r) => site === "all" || r.site === site)
    .map((r) => ({ ...r, marked: r.score >= threshold }));
  const tp = rows.filter((r) => r.truth && r.marked).length,
    fn = rows.filter((r) => r.truth && !r.marked).length;
  const fp = rows.filter((r) => !r.truth && r.marked).length,
    tn = rows.filter((r) => !r.truth && !r.marked).length;
  return {
    rows,
    tp,
    fn,
    fp,
    tn,
    sensitivity: tp + fn ? tp / (tp + fn) : null,
    specificity: tn + fp ? tn / (tn + fp) : null,
    ppv: tp + fp ? tp / (tp + fp) : null,
  };
}
export const readerStudy = [
  {
    mode: "Unassisted",
    found: 36,
    missed: 4,
    minutes: 6.2,
    note: "40 reference mitotic figures across 20 slides; all slides reviewed.",
  },
  {
    mode: "Assist with full-area review",
    found: 38,
    missed: 2,
    minutes: 8.1,
    note: "Same 40 reference figures; false marks required review. This is the observed study condition, not a prediction from the threshold controls.",
  },
  {
    mode: "Assist; inspect marked locations only",
    found: 34,
    missed: 6,
    minutes: 4.4,
    note: "Same 40 reference figures; 4 additional misses compared with full-area assisted review.",
  },
];
export const reviewChoices = [
  {
    id: "full",
    label: "Review the entire defined area and adjudicate every proposed mark.",
    note: "The tool proposes locations. A pathologist confirms and rejects marks and searches unmarked tissue. Record the final count and area; do not count every mark as a mitosis.",
  },
  {
    id: "marks",
    label: "Review marks and skip the unmarked tissue.",
    note: "Unmarked tissue can contain false negatives, including M04 and M05 at higher thresholds. A blank overlay is not evidence that the area contains no mitoses.",
  },
  {
    id: "automatic",
    label: "Copy the model count directly into the report.",
    note: "False marks inflate the count while missed figures lower it. This detection-assist use does not support automatic reporting, grading, or prognosis.",
  },
];
export const monitorItems = [
  {
    correct: true,
    id: "misses",
    label: "Audit marked and unmarked areas against expert review.",
    note: "Reviewing only positive marks cannot estimate false negatives. Record selection and reference-review methods.",
  },
  {
    correct: true,
    id: "mix",
    label: "Track case mix, site, stain, scanner, and image-quality failures.",
    note: "Changes in inputs can alter errors; stratify performance and include unreadable or failed analyses in an accountable workflow.",
  },
  {
    correct: true,
    id: "human",
    label: "Measure final reader errors, review time, and changes after seeing the overlay.",
    note: "The clinically used system includes the reader. Faster work alone is insufficient if misses increase.",
  },
  {
    correct: true,
    id: "change",
    label: "Assign review responsibility and a pause and revalidation process.",
    note: "Record version and threshold. Investigate failures and assess changes before changing the approved configuration.",
  },
  {
    id: "marks-only",
    label: "Use marked candidates as the only reference audit",
    note: "Reviewing marked areas alone omits false negatives. Include unmarked areas in an independent reference review.",
    correct: false,
  },
  {
    id: "speed-only",
    label: "Approve a new threshold if reading time falls",
    note: "Faster work cannot establish safety. Review reader errors, input changes and the approved validation process.",
    correct: false,
  },
] as const;
export const monitoringRecords = [
  {
    period: "Month 1",
    site: "A",
    slides: 80,
    failed: 2,
    found: 18,
    reference: 20,
    note: "Sampled reference audit; 18/20 reference figures marked in audited areas.",
  },
  {
    period: "Month 2",
    site: "B",
    slides: 20,
    failed: 3,
    found: 6,
    reference: 10,
    note: "New staining workflow; 6/10 reference figures marked in audited areas. Investigate rather than infer a precise stable site effect from this small sample.",
  },
];
export const monitoringFeedback = {
  complete:
    "The plan covers reference errors, case mix, readers, and change review. Investigate the affected site and document evidence before resuming or expanding assistance.",
  incomplete:
    "The investigation is appropriate. Include all four evidence groups so failures, false negatives, human performance, and changes remain visible.",
  unsafe:
    "Faster work does not establish safe performance. An untested threshold change or expansion can worsen errors; investigate the new site and staining workflow first.",
};

export const sectionPurposes = [
  "Change the threshold and compare missed figures with false marks.",
  "Judge the complete assisted workflow and choose evidence for ongoing review.",
];
