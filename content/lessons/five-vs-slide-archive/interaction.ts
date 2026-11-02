export const dimensions = ["Volume", "Velocity", "Variety", "Veracity", "Value"];
export const archiveQuestions = [
  {
    id: "volume",
    prompt: "The archive will receive 1.9 PB each year. Which question does this raise?",
    answer: "Volume",
    why: "Volume is about how much has to be stored. A petabyte (PB) is one million gigabytes (GB) here. Backup copies, and how long images must be kept, multiply the space needed.",
  },
  {
    id: "velocity",
    prompt: "Eighteen scanners write up to 0.5 GB/s overnight. Which question does this raise?",
    answer: "Velocity",
    why: "Velocity is about how fast data arrive. GB/s means gigabytes a second. A yearly average cannot show whether a short overnight burst will swamp scanning and viewing.",
  },
  {
    id: "variety",
    prompt:
      "Images, protein scores, gene variants and staging notes arrive in different forms. Which question does this raise?",
    answer: "Variety",
    why: "Variety is about the different kinds of record. A pathology image, a gene variant and a clinical stage are stored differently and read differently.",
  },
  {
    id: "veracity",
    prompt:
      "2,160 of 120,000 slides last quarter lacked a confirmed case, part or block link. Which question does this raise?",
    answer: "Veracity",
    why: "Veracity is about whether the records and links can be trusted. The missing-link rate is 2,160 / 120,000 = 1.8%. More storage cannot fix a wrong link.",
  },
  {
    id: "value",
    prompt:
      "The team must decide whether the combined view answers the tumor-board question. Which question does this raise?",
    answer: "Value",
    why: "Value is about whether the data help with a real decision. The board needs to know which findings belong to the current lung tumor, not how many records the view can show.",
  },
];
export const linkChoices = [
  { id: "patient", label: "Correct the patient identifier" },
  { id: "specimen", label: "Confirm the specimen and collection" },
  { id: "block", label: "Correct the part and block link" },
  { id: "case", label: "Select the current staging encounter" },
  { id: "keep", label: "Keep the confirmed link" },
];
export const linkedRecords = [
  {
    id: "TB-01",
    title: "Slide viewer",
    record:
      "Patient MRN 77120 · lung biopsy SP26-441 · part A · block A1\nImage label SP26-441-A2 · image UID IMG-702\nAccession log: A1 = lung; A2 = lymph node",
    answer: "block",
    why: "The view shows block A1, but the image label says A2. Check the scanner log and the label, then attach the image to the block it came from. Do not relabel the image just to make the mismatch go away.",
  },
  {
    id: "TB-02",
    title: "PD-L1 report",
    record:
      "Patient MRN 77120 · SP26-441-A1 · lung biopsy\nCollected 10 Oct 2026 · tumor proportion score 40%\nThe case and block agree with the signed pathology report",
    answer: "keep",
    why: "The staining score belongs to the current lung biopsy and block, as documented. Leave this link alone while you fix the others.",
  },
  {
    id: "TB-03",
    title: "Genomic report",
    record:
      "External case GEN-418 · patient MRN 77102\nSource laboratory confirms MRN 77120 and SP26-441-A1\nLocal import transposed the final two patient digits",
    answer: "patient",
    why: "The source report and the accession record both give MRN 77120. Correct the import error and record the change. A matching name alone would not be enough to merge two patients.",
  },
  {
    id: "TB-04",
    title: "Specimen selection",
    record:
      "Patient MRN 77120 · archived variant report SP24-119-A1\nCollected 06 Apr 2024 · colon resection\nCurrent question: lung biopsy SP26-441, collected 10 Oct 2026",
    answer: "specimen",
    why: "The same patient does not make an old colon specimen tell you anything about the current lung tumor. Confirm the current specimen and its genomic report, and keep the old result as separate history.",
  },
  {
    id: "TB-05",
    title: "Staging note",
    record:
      "Patient MRN 77120 · encounter 2024-04-12 · colon cancer stage\nCurrent lung cancer staging encounter: 2026-10-18\nNo final lung stage entered in this extract",
    answer: "case",
    why: "Do not copy the colon stage into the lung case. Select the current encounter and leave the stage blank until the clinical team confirms it.",
  },
];
export const archivePlans = [
  {
    id: "average",
    label: "Size the system for average traffic",
    feedback:
      "1.9 PB a year averages about 60 MB/s. Sizing for that ignores the 500 MB/s overnight peak and clinicians opening slides at the same time.",
  },
  {
    id: "separate",
    label: "Test peak traffic with clinical retrieval",
    correct: true,
    feedback:
      "Run the overnight scanning load while checking that clinicians still see the first field of view within two seconds. Keep research work on a separate copy, and check the links before the view goes to tumor board.",
  },
  {
    id: "linklater",
    label: "Add storage and repair links later",
    feedback:
      "More storage will not stop the wrong block or an old stage appearing at tumor board. Hold records that do not match until their source has been checked.",
  },
];
export function checkLinks(answers: Record<string, string>) {
  return linkedRecords.map((row) => ({ ...row, pass: answers[row.id] === row.answer }));
}
