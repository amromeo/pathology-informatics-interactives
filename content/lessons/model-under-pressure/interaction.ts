export const modelKinds = [
  { id: "rule", label: "Programmed rule" },
  { id: "supervised", label: "Supervised image model" },
  { id: "unsupervised", label: "Unsupervised clustering" },
  { id: "generative", label: "Generative model" },
];
export const reviewKinds = [
  { id: "boundaries", label: "Test limits and exception cases" },
  { id: "local", label: "Verify labeled local performance" },
  { id: "meaning", label: "Investigate the clusters' meaning" },
  { id: "sources", label: "Compare each statement with sources" },
];
export const proposals = [
  {
    id: "P1",
    title: "Hold a result when quality control fails",
    record: "An analyst writes an explicit if/then rule. No parameters are learned from examples.",
    kind: "rule",
    review: "boundaries",
    why: "A programmed rule follows stated conditions. Test boundary values, invalid runs and exceptions; calling it AI does not change that responsibility.",
  },
  {
    id: "P2",
    title: "Find metastases on lymph-node slides",
    record:
      "A convolutional neural network learns image features from slides labeled by pathologists.",
    kind: "supervised",
    review: "local",
    why: "Supervised learning uses labeled examples. Convolutional networks learn local image patterns; they still require representative local testing, including small lesions and each supported scanner.",
  },
  {
    id: "P3",
    title: "Group tumors by gene-expression pattern",
    record: "An algorithm groups similar profiles without supplied diagnostic categories.",
    kind: "unsupervised",
    review: "meaning",
    why: "Unsupervised clusters describe similarity. A cluster does not automatically constitute a diagnosis or treatment group; investigate confounders and clinical meaning.",
  },
  {
    id: "P4",
    title: "Draft a tumor-board summary",
    record: "A language model generates a paragraph from pathology, genomic and staging reports.",
    kind: "generative",
    review: "sources",
    why: "A generative model creates text. It may omit a qualification or invent a statement; a clinician must compare every assertion with the source records before use.",
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
    note: "Local baseline: scanner B differs from the vendor's supported scanner.",
  },
  {
    month: "August",
    micro: 17,
    macro: 25,
    total: 50,
    note: "Same scanner mix and preparation workflow.",
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
    label: "Initial generalizability failure",
    feedback:
      "The gap was present on first transfer. Vendor sensitivity was 192/200 (96%) on its supported scanner; local detection was 42/50 (84%), including 17/25 micrometastases (68%) and 25/25 macrometastases (100%).",
  },
  {
    id: "drift",
    label: "Later performance drift",
    feedback:
      "Drift requires change over time. September raises that concern, but it cannot explain a local gap already present in July.",
  },
  {
    id: "prevalence",
    label: "Lower disease prevalence alone",
    feedback:
      "Changing prevalence changes predictive value. It does not by itself explain worse sensitivity among known positive micrometastasis slides.",
  },
];
export const timeChoices = [
  {
    id: "change",
    label: "Investigate a change over time",
    feedback:
      "The September decline follows a stain change. Investigate case mix, stain quality and reader labels before attributing causation; pause use if the agreed safety criterion is breached.",
  },
  {
    id: "ignore",
    label: "Retain the pooled launch result",
    feedback:
      "A launch result cannot stand in for current performance. Review the September failures and compare like groups across months.",
  },
  {
    id: "replace",
    label: "Replace all reference labels",
    feedback:
      "Review discordances independently. Rewriting labels to match model output hides failures and invalidates the comparison.",
  },
];
export const governanceKinds = [
  { id: "equity", label: "Equity" },
  { id: "accountability", label: "Accountability" },
  { id: "documentation", label: "Documentation" },
  { id: "device", label: "Device status" },
];
export const governance = [
  {
    id: "G1",
    prompt: "Does performance differ for patients served by each site?",
    answer: "equity",
    why: "Compare relevant patient groups and sites with denominators. A pooled result can hide unequal missed lesions.",
  },
  {
    id: "G2",
    prompt: "Who reviews an unmarked area and can stop clinical use?",
    answer: "accountability",
    why: "Assign clinical responsibility, escalation and stop criteria. The model supplier cannot replace the laboratory director's local oversight.",
  },
  {
    id: "G3",
    prompt: "Which model, stain, scanner and threshold produced this report?",
    answer: "documentation",
    why: "Record versions and changes so results and incidents can be reconstructed and reviewed.",
  },
  {
    id: "G4",
    prompt: "Does the proposed intended use fit the product's authorized scope?",
    answer: "device",
    why: "Check the device's current status and intended use with the institution's regulatory team. A research demonstration or vendor claim is not clinical authorization.",
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
