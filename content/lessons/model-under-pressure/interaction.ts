export const modelKinds = [
  { id: "rule", label: "Programmed rule" },
  { id: "supervised", label: "Supervised image model" },
  { id: "unsupervised", label: "Unsupervised clustering" },
  { id: "generative", label: "Generative model" },
];
export const reviewKinds = [
  { id: "boundaries", label: "Test limits and exception cases" },
  { id: "local", label: "Compare local detection with independent diagnoses" },
  { id: "meaning", label: "Investigate the clusters' meaning" },
  { id: "sources", label: "Compare each statement with sources" },
];
export const proposals = [
  {
    id: "P1",
    title: "Hold a result when quality control fails",
    record:
      "An analyst writes an if/then rule that holds a result when quality control fails. The conditions are programmed directly.",
    kind: "rule",
    review: "boundaries",
    why: "The analyst supplied the conditions for holding the result. Try values on either side of each limit, failed runs and exceptions to see when the rule holds or releases it.",
  },
  {
    id: "P2",
    title: "Find metastases on lymph-node slides",
    record:
      "A convolutional neural network learns image features from slides labeled by pathologists.",
    kind: "supervised",
    review: "local",
    why: "Pathologists supplied the labels on the training slides. Now compare the detector's marks with independent diagnoses on local slides, including small lesions and each supported scanner.",
  },
  {
    id: "P3",
    title: "Group tumors by gene-expression pattern",
    record: "An algorithm groups similar profiles without supplied diagnostic categories.",
    kind: "unsupervised",
    review: "meaning",
    why: "The program grouped similar gene-expression profiles without knowing the diagnoses. Find out what the tumors in each group share before treating a cluster as a diagnosis or treatment group.",
  },
  {
    id: "P4",
    title: "Draft a tumor-board summary",
    record: "A language model generates a paragraph from pathology, genomic and staging reports.",
    kind: "generative",
    review: "sources",
    why: "The model wrote a new paragraph. A clinician must compare it with the reports to find added findings, missing qualifications and important omissions before using the summary.",
  },
];
export const verificationRows = [
  { scanner: "A", lesion: "Micrometastasis", detected: 10, total: 12 },
  { scanner: "A", lesion: "Macrometastasis", detected: 13, total: 13 },
  { scanner: "B", lesion: "Micrometastasis", detected: 7, total: 13 },
  { scanner: "B", lesion: "Macrometastasis", detected: 12, total: 12 },
];
export const monitoring = [
  {
    month: "July",
    micro: 17,
    macro: 25,
    total: 50,
    note: "First local results: scanner B differs from the vendor's supported scanner.",
  },
  {
    month: "August",
    micro: 17,
    macro: 25,
    total: 50,
    note: "Same mix of scanners and the same slide preparation methods.",
  },
  {
    month: "September",
    micro: 12,
    macro: 25,
    total: 50,
    note: "Stain protocol changed at the start of the month; case review is pending.",
  },
];
export const performanceChoices = [
  {
    id: "generalize",
    label: "Poor performance at first local testing",
    feedback:
      "The difference was present from the first local test. The vendor found 192/200 (96%) on its scanner. Locally, detection was 42/50 (84%): 17/25 micrometastases (68%) and 25/25 macrometastases (100%).",
  },
  {
    id: "drift",
    label: "Later performance drift",
    feedback:
      "September may show a later change, called drift. The poor local result was already present in July, so September cannot explain that initial difference.",
  },
  {
    id: "prevalence",
    label: "Lower disease prevalence alone",
    feedback:
      "Prevalence affects how reliable a positive call is. These slides are already known to contain micrometastases; prevalence alone does not explain why the detector missed them.",
  },
];
export const timeChoices = [
  {
    id: "change",
    label: "Investigate a change over time",
    feedback:
      "Review the missed slides after the stain change. Compare case mix, stain quality and reference diagnoses before deciding what caused the decline. Pause use if detection falls below the agreed stopping limit.",
  },
  {
    id: "ignore",
    label: "Keep using the overall result from the first local test",
    feedback:
      "The earlier result leaves out September's additional misses. Review those slides and compare the same lesion groups across months.",
  },
  {
    id: "replace",
    label: "Replace all reference labels",
    feedback:
      "Have pathologists independently review slides where their diagnosis and the detector disagree. Changing diagnoses to match its marks would hide its mistakes.",
  },
];
export const governanceKinds = [
  { id: "equity", label: "Performance across patient groups" },
  { id: "accountability", label: "Who reviews the work and can stop use" },
  { id: "documentation", label: "Records of versions and settings" },
  { id: "device", label: "Device status" },
];
export const governance = [
  {
    id: "G1",
    prompt: "Does performance differ for patients served by each site?",
    answer: "equity",
    why: "Count detected and missed lesions for each relevant patient group and site. Combining them can hide poorer detection in one group.",
  },
  {
    id: "G2",
    prompt: "Who reviews an unmarked area and can stop clinical use?",
    answer: "accountability",
    why: "Name the pathologist who reviews unmarked areas and who can stop use. Agree when staff should call for help and what findings require a pause.",
  },
  {
    id: "G3",
    prompt: "Which model, stain, scanner and threshold produced this report?",
    answer: "documentation",
    why: "Keep the model version and scanner, stain and threshold settings with the test records. The laboratory will need them to investigate a missed lesion.",
  },
  {
    id: "G4",
    prompt: "Does the product's device authorization cover the way the laboratory plans to use it?",
    answer: "device",
    why: "Ask the hospital's regulatory team to check the product's current device status and what use it covers. The vendor's description alone cannot answer that question.",
  },
];
export function simulatedPerformance(prevalence: number, separation: number) {
  if (
    !Number.isFinite(prevalence) ||
    prevalence <= 0 ||
    prevalence >= 1 ||
    !Number.isFinite(separation) ||
    separation < 0
  )
    throw Error("Use prevalence between zero and one and a nonnegative separation.");
  const sensitivity = 1 / (1 + Math.exp(-separation)),
    specificity = sensitivity;
  const tp = 10000 * prevalence * sensitivity,
    fn = 10000 * prevalence * (1 - sensitivity),
    fp = 10000 * (1 - prevalence) * (1 - specificity),
    tn = 10000 * (1 - prevalence) * specificity;
  return { sensitivity, specificity, ppv: tp / (tp + fp), tp, fn, fp, tn };
}
