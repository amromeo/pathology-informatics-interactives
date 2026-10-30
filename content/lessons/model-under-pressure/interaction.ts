export const modelKinds = [
  { id: "rule", label: "Programmed rule" },
  { id: "supervised", label: "Supervised image model" },
  { id: "unsupervised", label: "Unsupervised clustering" },
  { id: "generative", label: "Generative model" },
];
export const reviewKinds = [
  { id: "boundaries", label: "Try results at the rule's limits and in exception cases" },
  {
    id: "local",
    label: "Compare the model's marks on local slides with the pathologists' diagnoses",
  },
  {
    id: "meaning",
    label: "Compare diagnoses, gene activity and sample preparation within each tumor cluster",
  },
  { id: "sources", label: "Compare each statement with the original reports" },
];
export const proposals = [
  {
    id: "P1",
    title: "Hold a result when quality control fails",
    record:
      "An analyst writes a rule: if a quality-control result falls outside the allowed range, hold the affected patient results for staff to review. The analyst enters the conditions directly. The program does not learn them from examples.",
    kind: "rule",
    review: "boundaries",
    why: "This is a programmed rule because the analyst supplied its conditions. Check control values just inside, exactly at and just outside the allowed range. Also try an exception such as a missing control result. Watch which patient results are held. These checks show whether the program follows the laboratory's instructions when testing is acceptable, when it fails and when information is missing.",
    wrongKindFeedback: {
      supervised:
        "Supervised image models learn from labeled images. Here the analyst writes the condition for holding a result directly.",
      unsupervised:
        "Clustering groups similar measurements. This program applies a specified condition to each control result.",
      generative:
        "A generative model produces content such as a summary. This rule decides whether to hold patient results.",
    },
    wrongReviewFeedback: {
      local:
        "Comparing slide marks with diagnoses tests an image model. This proposal acts on control results, so test whether it holds the right patient results.",
      meaning:
        "Comparing tumor clusters would help interpret a clustering program. This proposal has a written rule whose limits and exceptions need testing.",
      sources:
        "Checking statements against reports tests a generated summary. This program produces a hold or release decision, which needs testing at the rule's limits.",
    },
  },
  {
    id: "P2",
    title: "Find metastases on lymph-node slides",
    record:
      "Pathologists mark cancer in training images of lymph nodes. A convolutional neural network uses those labeled examples to adjust its calculations. It then marks areas that may contain cancer on slides it has not seen before, for a pathologist to examine.",
    kind: "supervised",
    review: "local",
    why: "This is supervised learning: pathologists supplied answers with the training images. Compare the model's marks on new local slides with diagnoses that pathologists made before running it. Include micrometastases and images from each scanner. Performance on the training images does not show how often the model misses metastases on new slides.",
    wrongKindFeedback: {
      rule: "A programmed rule uses conditions written by an analyst. Here the training procedure adjusts the model using images with pathologists' labels.",
      unsupervised:
        "Unsupervised clustering groups examples without supplied diagnoses. Here the pathologists' cancer labels guide training.",
      generative:
        "This proposal asks the model to locate cancer in an existing image. The description specifically tells us that it learns from labeled images.",
    },
    wrongReviewFeedback: {
      boundaries:
        "Testing a written rule's limits does not show which metastases this model misses. Compare its marks with the pathologists' diagnoses on new local slides.",
      meaning:
        "There are no tumor clusters to interpret here. The question is whether the model's marks identify metastases on local slides.",
      sources:
        "This model produces image marks, not summary statements. Compare the marks with the pathologists' diagnoses on the same slides.",
    },
  },
  {
    id: "P3",
    title: "Group tumors by gene-expression pattern",
    record:
      "Researchers measure how active many genes are in each tumor. The measurements form a profile for that tumor. A program compares these profiles and groups similar ones together, without being given the tumors' diagnoses.",
    kind: "unsupervised",
    review: "meaning",
    why: "This is unsupervised clustering because the program grouped gene measurements without supplied diagnoses. Compare the tumors' diagnoses, gene activity and sample-preparation methods within each cluster. For example, a group could contain a distinct tumor type, or samples measured in the same laboratory batch. Investigate that explanation before using a cluster to guide diagnosis or treatment.",
    wrongKindFeedback: {
      rule: "The analyst has not supplied a rule assigning tumors to named categories. The program forms groups from similarities in the gene measurements.",
      supervised:
        "The training data do not include diagnoses to learn from. The program groups similar gene measurements without those supplied answers.",
      generative:
        "The output is a grouping of existing tumors by similar measurements. This proposal does not ask the program to write a report or generate an image.",
    },
    wrongReviewFeedback: {
      boundaries:
        "There is no written diagnostic cutoff to test in this proposal. Investigate which measured features and sample-preparation methods distinguish the clusters.",
      local:
        "This program does not mark metastases on slides. Compare diagnoses and sample information across its gene-expression clusters to find out what the groups represent.",
      sources:
        "The program produces tumor groups, not statements in a summary. Review the diagnoses, measurements and preparation methods associated with those groups.",
    },
  },
  {
    id: "P4",
    title: "Draft a tumor-board summary",
    record:
      "A language model drafts a tumor-board summary from the patient's pathology, molecular and staging reports. It generates the wording from the supplied reports. The proposal describes its output but does not specify how it was trained.",
    kind: "generative",
    review: "sources",
    why: "This proposal uses a generative model to produce text. A fluent paragraph can contain an unsupported finding or leave out a qualification that changes the meaning. A clinician should compare every statement with the original reports and look for important omissions. Good grammar and a confident tone do not show that the clinical information is correct.",
    wrongKindFeedback: {
      rule: "The model generates wording from the reports. The proposal does not describe an analyst entering fixed conditions for copying particular sentences.",
      supervised:
        "Supervised training could be used for a generative model, but this choice specifies an image model. This proposal describes generating text and does not specify the training method.",
      unsupervised:
        "Clustering puts similar examples into groups. This model produces a summary from a patient's reports.",
    },
    wrongReviewFeedback: {
      boundaries:
        "Testing a hold/release rule would not reveal an invented finding in this summary. Compare its statements and omissions with the original reports.",
      local:
        "There are no slide marks to compare here. Check the generated text against the reports it summarizes.",
      meaning:
        "This proposal does not group tumors into clusters. Its errors would appear as incorrect statements or missing information in the summary.",
    },
  },
] satisfies {
  id: string;
  title: string;
  record: string;
  kind: string;
  review: string;
  why: string;
  wrongKindFeedback: Record<string, string>;
  wrongReviewFeedback: Record<string, string>;
}[];
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
      "Prevalence affects how reliable a positive call is. These slides are already known to contain metastases; prevalence alone does not explain why the model missed them.",
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
    label: "Change the pathologists' diagnoses to agree with the model",
    feedback:
      "Ask pathologists to re-examine slides where their diagnosis and the model's call differ. They should resolve the difference by reviewing the tissue. Automatically changing diagnoses to match the model would hide its mistakes.",
  },
];
export const governanceKinds = [
  {
    id: "equity",
    label: "Local test results listing metastases found and missed by site and deposit size",
  },
  {
    id: "accountability",
    label: "The laboratory procedure naming who reviews slides, handles errors and can pause use",
  },
  {
    id: "documentation",
    label: "The saved model version and scanner, stain and threshold settings for each result",
  },
  {
    id: "device",
    label: "The product's current regulatory authorization and instructions for use",
  },
];
export const governance = [
  {
    id: "G1",
    context:
      "The hospital serves patients at several sites. The mix of disease, slide preparation and available scanners may differ between sites. The laboratory wants to know whether one group of patients is more likely to have a metastasis missed.",
    prompt:
      "Which records would show whether the model misses a larger fraction of metastases at one site?",
    answer: "equity",
    why: "These results give the number of positive slides found and missed at each site. Divide misses by all known-positive slides at that site, and compare the same deposit-size groups. Otherwise, a site with more micrometastases could appear to perform worse simply because it tested more difficult cases. Compare relevant patient groups too, when enough cases are available.",
    wrongFeedback: {
      accountability:
        "The procedure tells staff who reviews slides and handles errors. It does not count missed metastases at each site. Review the local slide-test results, separated by site and deposit size.",
      documentation:
        "Version and setting records show how the model was run. They do not tell you how many positive slides it missed at each site. Review the local slide-test results to answer that question.",
      device:
        "The authorization states the permitted use and conditions. It does not show how often this laboratory's model missed metastases at each site. You need the local slide-test results.",
    },
  },
  {
    id: "G2",
    context:
      "A pathologist still has to examine the whole slide, including areas the model does not mark. Staff also need to know whom to contact about a suspected error and who can pause use during an investigation.",
    prompt:
      "Which document should assign slide review, error reporting and the decision to pause use?",
    answer: "accountability",
    why: "The laboratory procedure should assign each job to a named role: reviewing the whole slide, receiving error reports and deciding when to pause use. It should also state which findings require a pause. These responsibilities need to be agreed before staff rely on the model's marks.",
    wrongFeedback: {
      equity:
        "Detection counts may show a problem, but they do not assign responsibility for acting on it. Staff need a laboratory procedure naming the reviewer, contact and person who can pause use.",
      documentation:
        "Saved versions and settings help reconstruct a result. They do not tell staff who must review unmarked tissue or respond to an error. Those assignments belong in the laboratory procedure.",
      device:
        "The product's instructions may require pathologist review. The laboratory must still assign that work locally and name who receives error reports and can pause use in its own procedure.",
    },
  },
  {
    id: "G3",
    context:
      "The vendor may release a new version of the model, and staff may change scanner or stain settings. The threshold is the score at which the program calls a finding positive. To investigate an error later, the laboratory needs a record of which version and settings were used at the time.",
    prompt:
      "Which record would let the team reconstruct how the model produced a particular result?",
    answer: "documentation",
    why: "The saved record should link each result to the model version and scanner, stain and threshold settings used at that time. A list of today's settings would not tell you how an older result was produced. The team needs the historical record when investigating a missed metastasis.",
    wrongFeedback: {
      equity:
        "Found and missed counts describe performance across cases. They do not identify the version and settings used for one result. Review the record saved with that result.",
      accountability:
        "The procedure assigns responsibility for an investigation. It does not show which software version and settings produced the result. The team needs the saved result-specific record.",
      device:
        "The authorization and instructions describe permitted configurations. They do not establish which configuration was actually used for a particular slide. Check that result's saved version and settings.",
    },
  },
  {
    id: "G4",
    context:
      "Software used in patient care may be regulated as a medical device. Any authorization has a defined use, which may specify the tissue, scanner and role of the pathologist. The hospital's regulatory team helps check whether the proposed use is covered.",
    prompt:
      "Which documents should the regulatory team compare with the laboratory's proposed use?",
    answer: "device",
    why: "Review the current authorization and instructions for use with the hospital's regulatory team. Compare the permitted tissue types, scanners and role of the pathologist with the laboratory's plan. Good local detection results do not establish that the proposed use is covered.",
    wrongFeedback: {
      equity:
        "Local detection results show performance on the tested slides. They do not establish the product's authorized use. The regulatory team needs the current authorization and instructions for use.",
      accountability:
        "A local procedure can assign review and stopping responsibilities. It cannot establish which uses the product's authorization covers. Compare the authorization and instructions with the proposed use.",
      documentation:
        "Version and setting records show how the model was run. They do not establish whether that use is covered by its authorization. Check the current authorization and instructions for use.",
    },
  },
] satisfies {
  id: string;
  context: string;
  prompt: string;
  answer: string;
  why: string;
  wrongFeedback: Record<string, string>;
}[];
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
