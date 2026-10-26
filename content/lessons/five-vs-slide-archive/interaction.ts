export const dimensions = ["Volume", "Velocity", "Variety", "Veracity", "Value"];
export const archiveQuestions = [
  {
    id: "volume",
    prompt: "The archive will receive 1.9 PB each year. Which question does this raise?",
    answer: "Volume",
    why: "Volume concerns how much must be stored. A petabyte (PB) is one million gigabytes (GB), using decimal units here. Copies and retention multiply the storage requirement.",
  },
  {
    id: "velocity",
    prompt: "Eighteen scanners write up to 0.5 GB/s overnight. Which question does this raise?",
    answer: "Velocity",
    why: "Velocity concerns the arrival rate. GB/s means gigabytes each second. The annual average cannot show whether a short overnight batch will overwhelm writing and retrieval.",
  },
  {
    id: "variety",
    prompt:
      "Images, protein scores, gene variants and staging notes arrive in different forms. Which question does this raise?",
    answer: "Variety",
    why: "Variety concerns the different records and meanings. A pathology image, a gene variant and a clinical stage need different fields and interpretation.",
  },
  {
    id: "veracity",
    prompt:
      "2,160 of 120,000 slides last quarter lacked a confirmed case, part or block link. Which question does this raise?",
    answer: "Veracity",
    why: "Veracity concerns whether the records and links are trustworthy. The missing-link rate is 2,160 / 120,000 = 1.8%; more storage cannot repair identity.",
  },
  {
    id: "value",
    prompt:
      "The team must decide whether the combined view answers the tumor-board question. Which question does this raise?",
    answer: "Value",
    why: "Value concerns usefulness for a defined decision. The board needs to know which findings belong to the current lung tumor, not merely how many records can be displayed.",
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
    why: "The displayed block is A1 but the image label identifies A2. Check the scanner log and label, then attach the image to its documented block. Do not relabel the image to make the mismatch disappear.",
  },
  {
    id: "TB-02",
    title: "PD-L1 report",
    record:
      "Patient MRN 77120 · SP26-441-A1 · lung biopsy\nCollected 10 Oct 2026 · tumor proportion score 40%\nThe case and block agree with the signed pathology report",
    answer: "keep",
    why: "The protein staining score belongs to the documented current lung biopsy and block. Keep this valid link while repairing the others.",
  },
  {
    id: "TB-03",
    title: "Genomic report",
    record:
      "External case GEN-418 · patient MRN 77102\nSource laboratory confirms MRN 77120 and SP26-441-A1\nLocal import transposed the final two patient digits",
    answer: "patient",
    why: "The source report and accession record agree on MRN 77120. Correct the documented import error with an audit record; a name match alone would not justify merging patients.",
  },
  {
    id: "TB-04",
    title: "Specimen selection",
    record:
      "Patient MRN 77120 · archived variant report SP24-119-A1\nCollected 06 Apr 2024 · colon resection\nCurrent question: lung biopsy SP26-441, collected 10 Oct 2026",
    answer: "specimen",
    why: "A matching patient does not make the old colon specimen evidence about the current lung tumor. Verify the current specimen and genomic report; retain the old result as separate history.",
  },
  {
    id: "TB-05",
    title: "Staging note",
    record:
      "Patient MRN 77120 · encounter 2024-04-12 · colon cancer stage\nCurrent lung cancer staging encounter: 2026-10-18\nNo final lung stage entered in this extract",
    answer: "case",
    why: "Do not copy the colon stage into the lung case. Select the current encounter and leave staging pending until the clinical team provides a verified stage.",
  },
];
export const archivePlans = [
  {
    id: "average",
    label: "Size the system for average traffic",
    feedback:
      "1.9 PB per year averages about 60 MB/s. That does not test the 500 MB/s overnight peak or concurrent clinical retrieval.",
  },
  {
    id: "separate",
    label: "Test peak traffic with clinical retrieval",
    correct: true,
    feedback:
      "Test the overnight writing load while clinicians retrieve the first field of view within two seconds. Run research jobs on a governed copy and verify the links before presenting the combined view.",
  },
  {
    id: "linklater",
    label: "Add storage and repair links later",
    feedback:
      "Extra capacity cannot prevent the wrong block or old stage appearing in a patient discussion. Hold unmatched records while investigating their source.",
  },
];
export function checkLinks(answers: Record<string, string>) {
  return linkedRecords.map((row) => ({ ...row, pass: answers[row.id] === row.answer }));
}
