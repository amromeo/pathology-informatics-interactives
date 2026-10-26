export const modelKinds = [
  { id: "rule", label: "Programmed rule" },
  { id: "supervised", label: "Supervised image model" },
  { id: "unsupervised", label: "Unsupervised clustering" },
  { id: "generative", label: "Generative model" },
];
export const reviewKinds = [
  { id: "boundaries", label: "Try results at the rule's limits and in exception cases" },
  { id: "local", label: "Compare local detection with independent diagnoses" },
  { id: "meaning", label: "Find out what the tumors in each group have in common" },
  { id: "sources", label: "Compare each statement with the original reports" },
];
export const proposals = [
  {
    id: "P1",
    title: "Hold a result when quality control fails",
    record:
      "The laboratory tests control material to check that the testing process is working. An analyst writes a rule: if the control result falls outside the allowed range, hold the affected patient results for staff to review. The analyst enters the conditions directly; the program does not learn them from examples.",
    kind: "rule",
    review: "boundaries",
    why: "This is a programmed rule because the analyst supplied its conditions. Check control values just inside, exactly at and just outside the allowed range. Also try an exception such as a missing control result. Watch which patient results are held. These checks show whether the program follows the laboratory's instructions when testing is acceptable, when it fails and when information is missing.",
  },
  {
    id: "P2",
    title: "Find metastases on lymph-node slides",
    record:
      "Pathologists mark cancer in training images of lymph nodes. A convolutional neural network uses those labeled examples to adjust its calculations. It then marks areas that may contain cancer on slides it has not seen before, for a pathologist to examine.",
    kind: "supervised",
    review: "local",
    why: "This is supervised learning: pathologists supplied answers with the training images. To check whether it works here, compare its marks on new local slides with diagnoses made independently by pathologists. Include small deposits and images from each scanner. A successful training result would not show how often the program misses cancer on these new slides.",
  },
  {
    id: "P3",
    title: "Group tumors by gene-expression pattern",
    record:
      "Researchers measure how active many genes are in each tumor. The measurements form a profile for that tumor. A program compares these profiles and groups similar ones together, without being given the tumors' diagnoses.",
    kind: "unsupervised",
    review: "meaning",
    why: "This is unsupervised clustering because the program grouped measurements without supplied diagnoses. A group of similar tumors may be biologically useful, but similarity alone does not tell us what the group means. Compare the groups with diagnoses, patient findings and sample-preparation methods before treating a cluster as a disease or treatment category.",
  },
  {
    id: "P4",
    title: "Draft a tumor-board summary",
    record:
      "A tumor board is a meeting where clinicians discuss a patient's cancer and treatment. A language model drafts a paragraph for that meeting using reports about the tissue diagnosis, gene findings and extent of disease. It generates the wording from the supplied reports.",
    kind: "generative",
    review: "sources",
    why: "This proposal uses a generative model to produce text. A fluent paragraph can contain an unsupported finding or leave out a qualification that changes the meaning. A clinician should compare every statement with the original reports and look for important omissions. Good grammar and a confident tone do not show that the clinical information is correct.",
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
    context:
      "The hospital serves patients at several sites. The mix of disease, slide preparation and available scanners may differ between sites. The laboratory wants to know whether one group of patients is more likely to have a metastasis missed.",
    prompt: "Does performance differ for patients served by each site?",
    answer: "equity",
    why: "Count detected and missed lesions for each relevant patient group and site. Combining them can hide poorer detection in one group.",
  },
  {
    id: "G2",
    context:
      "A pathologist still has to examine the slide, including areas the program does not mark. Staff need to know whom to contact when they suspect an error and who has permission to pause the program while the problem is investigated.",
    prompt: "Who reviews an unmarked area and can stop clinical use?",
    answer: "accountability",
    why: "Name the pathologist who reviews unmarked areas and who can stop use. Agree when staff should call for help and what findings require a pause.",
  },
  {
    id: "G3",
    context:
      "The vendor may release a new version of the model, and staff may change scanner or stain settings. The threshold is the score at which the program calls a finding positive. To investigate an error later, the laboratory needs a record of which version and settings were used at the time.",
    prompt: "Which model, stain, scanner and threshold produced this report?",
    answer: "documentation",
    why: "Keep the model version and scanner, stain and threshold settings with the test records. The laboratory will need them to investigate a missed lesion.",
  },
  {
    id: "G4",
    context:
      "Software used in patient care may be regulated as a medical device. Any authorization has a defined use, which may specify the tissue, scanner and role of the pathologist. The hospital's regulatory team helps check whether the proposed use is covered.",
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
