import type { LessonDefinition } from "../../../src/data/types";
export const filterFields = ["birthYear", "sex", "zip5", "admissionDate", "diagnosis"] as const;
export type FilterField = (typeof filterFields)[number];

export type PrivacyRow = {
  recordId: string;
  birthYear: number;
  sex: "F" | "M";
  zip5: string;
  admissionDate: string;
  diagnosis: string;
  linkageCode: string;
};

export type PrivacyFilters = Partial<Pick<PrivacyRow, FilterField>>;
export type TransformId = "date-to-year" | "zip-to-three" | "rare-diagnosis-to-category";
export type ReleaseContext = {
  eligiblePurpose: boolean;
  namedRecipient: boolean;
  dataUseAgreement: boolean;
};
export type DatasetClassification =
  "coded-reidentifiable" | "limited-data-set-candidate" | "deidentification-review-required";

export const rareDiagnosis = "Breast carcinoma";
export const generalizedDiagnosis = "Malignant neoplasm";
export const fullTransformSet: TransformId[] = [
  "date-to-year",
  "zip-to-three",
  "rare-diagnosis-to-category",
];

export const transformOptions: { id: TransformId; label: string; note: string }[] = [
  {
    id: "date-to-year",
    label: "Generalize exact dates to year",
    note: "2026-04-18 becomes 2026. The group count stays the same because every admission date was identical.",
  },
  {
    id: "zip-to-three",
    label: "Truncate five-digit ZIP to three digits",
    note: "02108 becomes 021** and 02445 becomes 024**. Under Safe Harbor, Priya has to check the population rule before either prefix can stay.",
  },
  {
    id: "rare-diagnosis-to-category",
    label: "Broaden the diagnosis shared by three rows",
    note: `${rareDiagnosis} becomes ${generalizedDiagnosis}. This puts the first three rows in one group with NR-004 when their other fields also match.`,
  },
];

// Frozen by exact-value tests. All records and identifiers are synthetic.
export const privacyRows: readonly PrivacyRow[] = [
  {
    recordId: "NR-001",
    birthYear: 1988,
    sex: "F",
    zip5: "02108",
    admissionDate: "2026-04-18",
    diagnosis: "Breast carcinoma",
    linkageCode: "LK-4A17",
  },
  {
    recordId: "NR-002",
    birthYear: 1988,
    sex: "F",
    zip5: "02109",
    admissionDate: "2026-04-18",
    diagnosis: "Breast carcinoma",
    linkageCode: "LK-7C22",
  },
  {
    recordId: "NR-003",
    birthYear: 1988,
    sex: "F",
    zip5: "02110",
    admissionDate: "2026-04-18",
    diagnosis: "Breast carcinoma",
    linkageCode: "LK-9D08",
  },
  {
    recordId: "NR-004",
    birthYear: 1988,
    sex: "F",
    zip5: "02111",
    admissionDate: "2026-04-18",
    diagnosis: "Malignant neoplasm",
    linkageCode: "LK-2B64",
  },
  {
    recordId: "NR-005",
    birthYear: 1975,
    sex: "M",
    zip5: "02108",
    admissionDate: "2026-04-18",
    diagnosis: "Malignant neoplasm",
    linkageCode: "LK-5F31",
  },
  {
    recordId: "NR-006",
    birthYear: 1975,
    sex: "M",
    zip5: "02109",
    admissionDate: "2026-04-18",
    diagnosis: "Malignant neoplasm",
    linkageCode: "LK-8E45",
  },
  {
    recordId: "NR-007",
    birthYear: 1975,
    sex: "M",
    zip5: "02110",
    admissionDate: "2026-04-18",
    diagnosis: "Malignant neoplasm",
    linkageCode: "LK-1A93",
  },
  {
    recordId: "NR-008",
    birthYear: 1975,
    sex: "M",
    zip5: "02111",
    admissionDate: "2026-04-18",
    diagnosis: "Malignant neoplasm",
    linkageCode: "LK-6C70",
  },
  {
    recordId: "NR-009",
    birthYear: 1962,
    sex: "F",
    zip5: "02445",
    admissionDate: "2026-04-18",
    diagnosis: "Community-acquired pneumonia",
    linkageCode: "LK-3D52",
  },
  {
    recordId: "NR-010",
    birthYear: 1962,
    sex: "F",
    zip5: "02446",
    admissionDate: "2026-04-18",
    diagnosis: "Community-acquired pneumonia",
    linkageCode: "LK-7B19",
  },
  {
    recordId: "NR-011",
    birthYear: 1962,
    sex: "F",
    zip5: "02447",
    admissionDate: "2026-04-18",
    diagnosis: "Community-acquired pneumonia",
    linkageCode: "LK-9A81",
  },
  {
    recordId: "NR-012",
    birthYear: 1962,
    sex: "F",
    zip5: "02448",
    admissionDate: "2026-04-18",
    diagnosis: "Community-acquired pneumonia",
    linkageCode: "LK-4E06",
  },
  {
    recordId: "NR-013",
    birthYear: 1962,
    sex: "F",
    zip5: "02449",
    admissionDate: "2026-04-18",
    diagnosis: "Community-acquired pneumonia",
    linkageCode: "LK-2C38",
  },
  {
    recordId: "NR-014",
    birthYear: 1994,
    sex: "M",
    zip5: "02445",
    admissionDate: "2026-04-18",
    diagnosis: "Diabetic ketoacidosis",
    linkageCode: "LK-8D27",
  },
  {
    recordId: "NR-015",
    birthYear: 1994,
    sex: "M",
    zip5: "02446",
    admissionDate: "2026-04-18",
    diagnosis: "Diabetic ketoacidosis",
    linkageCode: "LK-5A74",
  },
  {
    recordId: "NR-016",
    birthYear: 1994,
    sex: "M",
    zip5: "02447",
    admissionDate: "2026-04-18",
    diagnosis: "Diabetic ketoacidosis",
    linkageCode: "LK-1F60",
  },
  {
    recordId: "NR-017",
    birthYear: 1994,
    sex: "M",
    zip5: "02448",
    admissionDate: "2026-04-18",
    diagnosis: "Diabetic ketoacidosis",
    linkageCode: "LK-6B42",
  },
  {
    recordId: "NR-018",
    birthYear: 1994,
    sex: "M",
    zip5: "02449",
    admissionDate: "2026-04-18",
    diagnosis: "Diabetic ketoacidosis",
    linkageCode: "LK-3E95",
  },
];

export const applyTransforms = (
  rows: readonly PrivacyRow[],
  transforms: readonly TransformId[],
): PrivacyRow[] => {
  const selected = new Set(transforms);
  return rows.map((row) => ({
    ...row,
    zip5: selected.has("zip-to-three") ? `${row.zip5.slice(0, 3)}**` : row.zip5,
    admissionDate: selected.has("date-to-year") ? row.admissionDate.slice(0, 4) : row.admissionDate,
    diagnosis:
      selected.has("rare-diagnosis-to-category") && row.diagnosis === rareDiagnosis
        ? generalizedDiagnosis
        : row.diagnosis,
  }));
};

export const matchCount = (rows: readonly PrivacyRow[], filters: PrivacyFilters): number => {
  const active = Object.entries(filters).filter(
    ([, value]) => value !== undefined && value !== "",
  ) as [FilterField, PrivacyRow[FilterField]][];
  return rows.filter((row) => active.every(([field, value]) => row[field] === value)).length;
};

export const minGroupSize = (
  rows: readonly PrivacyRow[],
  quasiIdentifiers: readonly FilterField[] = filterFields,
): number => {
  if (!rows.length) return 0;
  const groups = new Map<string, number>();
  for (const row of rows) {
    const key = JSON.stringify(quasiIdentifiers.map((field) => row[field]));
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return Math.min(...groups.values());
};

export const hasUniqueVisibleMatch = (
  rows: readonly PrivacyRow[],
  availableFilters: readonly FilterField[] = filterFields,
): boolean => {
  for (let mask = 1; mask < 2 ** availableFilters.length; mask += 1) {
    const selectedFields = availableFilters.filter((_, index) => (mask & (1 << index)) !== 0);
    const groups = new Map<string, number>();
    for (const row of rows) {
      const key = JSON.stringify(selectedFields.map((field) => row[field]));
      groups.set(key, (groups.get(key) ?? 0) + 1);
    }
    if ([...groups.values()].some((count) => count === 1)) return true;
  }
  return false;
};

export const classifyDataset = (
  transforms: readonly TransformId[],
  keySequestered: boolean,
  releaseContext: ReleaseContext,
): DatasetClassification => {
  if (!keySequestered) return "coded-reidentifiable";
  if (fullTransformSet.every((transform) => transforms.includes(transform)))
    return "deidentification-review-required";
  if (
    releaseContext.eligiblePurpose &&
    releaseContext.namedRecipient &&
    releaseContext.dataUseAgreement
  )
    return "limited-data-set-candidate";
  return "coded-reidentifiable";
};

export const caseOverview: Omit<LessonDefinition, "manifest"> = {
  artifactTitle: "Research dataset release",
  evidence: [
    {
      label: "Names",
      value: "Removed",
      tone: "positive",
    },
    {
      label: "Exact dates",
      value: "Retained",
      tone: "warning",
    },
    {
      label: "Full ZIP",
      value: "Retained",
      tone: "warning",
    },
    {
      label: "Breast carcinoma group",
      value: "3 people",
      tone: "critical",
    },
    {
      label: "Linkage key",
      value: "Shared folder",
      tone: "critical",
    },
  ],
  trace: [
    {
      system: "Extract",
      role: "Analyst",
      sees: "Dates and geography remain.",
      implication: "Removing names is insufficient.",
    },
    {
      system: "Workspace",
      role: "Investigator",
      sees: "Three rows have breast carcinoma; ZIP distinguishes them.",
      implication: "Someone who knows the diagnosis and ZIP could link one row to a person.",
    },
    {
      system: "Linkage",
      role: "Data steward",
      sees: "The lookup file links each study code to a patient, and it is still in the shared folder.",
      implication:
        "Limit who can open the lookup file. This is separate from changing the exported fields.",
    },
    {
      system: "Release",
      role: "Privacy office",
      sees: "Recipient is undefined.",
      implication: "Controls depend on intended use.",
    },
  ],
  decisionPrompt: "As it stands, what kind of file is this export?",
  decisionChoices: [
    {
      id: "correct",
      label:
        "Coded PHI that can be reidentified, because the key and the revealing fields are still there.",
      correct: true,
      feedback:
        "Exact dates, five-digit ZIP codes and a diagnosis can single out records, and the key in the shared folder leads straight back to the patients. Removing names did not deidentify this file.",
    },
    {
      id: "narrow",
      label:
        "Deidentified under the HIPAA Safe Harbor method because names and medical record numbers were removed.",
      feedback:
        "Safe Harbor needs more than removing names and record numbers. Every part of a date except the year, and every five-digit ZIP code, has to go; the first three ZIP digits can stay only if that three-digit area holds more than 20,000 people. Any study code that stays must not be made from patient information, and its key cannot be shared.",
    },
    {
      id: "unsafe",
      label:
        "A limited data set that may be shared with the investigator under a data use agreement exactly as it is.",
      feedback:
        "A limited data set can keep dates and some geography, but it is still PHI. The hospital first has to confirm the purpose and the recipient, remove the direct identifiers that are not allowed, protect the key, and sign the data use agreement.",
    },
  ],
  repairPrompt: "Which proposal should the team put to Priya for review?",
  repairChoices: [
    {
      id: "validated",
      label:
        "Prepare a file with broader dates, geography and diagnosis groups; restrict the key and document the purpose, recipient and agreement for privacy review.",
      correct: true,
      feedback:
        "This proposal shows less detail and writes down the limits for the named recipient. Finish the field and access changes above, then ask Priya to review the whole file, the fact that everyone was admitted on April 18, and the detail the study loses. She decides which way of sharing applies.",
    },
    {
      id: "narrow",
      label:
        "Remove the linkage key but retain exact dates and five-digit ZIP codes, then release the file publicly because it has no names.",
      feedback:
        "Removing the key closes one direct route back to the patients, but the exact dates, locations and small diagnosis group can still single people out. A public release also drops the limits on who receives PHI.",
    },
    {
      id: "unsafe",
      label:
        "Keep the fields but require the investigator to sign a confidentiality agreement before receiving the file.",
      feedback:
        "A promise to keep the file confidential helps, but it does not remove fields the study does not need, lock down the key in the shared folder or deal with the small diagnosis group. It cannot replace the privacy office's review or the agreement the approved method requires.",
    },
  ],
  validationCases: [
    {
      name: "Minimum necessary fields",
      note: "The file contains only the detail needed to answer the approved research question.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "Removing the key does not explain why the study needs exact dates and five-digit ZIP codes.",
        unsafe:
          "A confidentiality agreement does not remove fields that the investigator does not need.",
      },
    },
    {
      name: "Linkage key control",
      note: "The key is kept apart from the released file, and only approved staff can open it.",
      passingRepairs: ["validated", "narrow"],
      failNotes: {
        unsafe: "The proposal leaves the key in the shared folder, where many people can open it.",
      },
    },
    {
      name: "Uniqueness-risk review",
      note: "Exact dates, locations and the three-person diagnosis group are reviewed and broadened where needed.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "The public file still contains exact dates, five-digit ZIP codes, and the small diagnosis group even though the linkage key was removed.",
        unsafe:
          "The confidentiality agreement does nothing about the combinations of fields that single out records.",
      },
    },
    {
      name: "Approved recipient and purpose",
      note: "The privacy office records who will receive the data, for what purpose and under which method of sharing.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "A public release has no named recipient, no stated purpose and no hospital approval.",
        unsafe:
          "The investigator's signature alone does not record the privacy office's approval or the method of sharing.",
      },
    },
    {
      name: "Recipient confidentiality commitment",
      note: "The recipient agrees, in a binding contract, to limits on use and sharing and not to try to identify anyone.",
      passingRepairs: ["validated", "unsafe"],
      failNotes: {
        narrow:
          "A public release has no binding promise from a recipient and nothing stopping attempts to identify people.",
      },
    },
  ],
};

export const lessonCopy = {
  redactionHeading: "Remove identifying details and protect the key",
  text01:
    "Read the worked example, then use two facts to single out a row and explain what someone could learn from them.",
  text02:
    "The table holds 18 records from the day of the April 18 outage. It shows five fields that could help identify someone, plus a study code; there are no names or medical record numbers.",
  text03:
    "Move the key out of the shared folder and let only approved staff open it. This does not change the table or its group sizes.",
  text04:
    "These 18 rows show the field changes you chose. The study code stays in each row; locking down the separate key changes who can link that code back to a patient.",
};
