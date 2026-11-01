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
    note: "02108 becomes 021** and 02445 becomes 024**. Priya must check the population condition before retaining either prefix under Safe Harbor.",
  },
  {
    id: "rare-diagnosis-to-category",
    label: "Generalize the three-row diagnosis group",
    note: `${rareDiagnosis} becomes ${generalizedDiagnosis}. This combines the first three rows with NR-004 when their other fields also match.`,
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
      sees: "The lookup file maps linkage codes to patient identities and remains in the shared folder.",
      implication:
        "Restrict who can open the lookup file, separately from changing the exported fields.",
    },
    {
      system: "Release",
      role: "Privacy office",
      sees: "Recipient is undefined.",
      implication: "Controls depend on intended use.",
    },
  ],
  decisionPrompt: "How should the privacy office classify this export as presented?",
  decisionChoices: [
    {
      id: "correct",
      label:
        "Coded and reidentifiable protected health information because the key and quasi-identifiers remain available.",
      correct: true,
      feedback:
        "Exact dates, five-digit ZIP codes, and a diagnosis can distinguish records, while the accessible key provides a direct route back to identity. Removing names did not make this export deidentified.",
    },
    {
      id: "narrow",
      label:
        "Deidentified under the HIPAA Safe Harbor method because names and medical record numbers were removed.",
      feedback:
        "Safe Harbor requires more than removing names and record numbers. All elements of dates except the year, and all five-digit ZIP codes, must be removed; the first three ZIP digits may be kept only when that three-digit area contains more than 20,000 people. Any retained study code must not be derived from patient information, and the key cannot be disclosed.",
    },
    {
      id: "unsafe",
      label:
        "A limited data set that may be shared with the investigator under a data use agreement exactly as it is.",
      feedback:
        "A limited data set may retain dates and some geography, but it remains protected health information. The institution must first confirm the permitted purpose and recipient, remove prohibited direct identifiers, protect the linkage mechanism, and execute the required data use agreement.",
    },
  ],
  repairPrompt: "Which proposal should the team prepare for Priya's privacy review?",
  repairChoices: [
    {
      id: "validated",
      label:
        "Prepare a file with broader dates, geography and diagnosis groups; restrict the key and document the purpose, recipient and agreement for privacy review.",
      correct: true,
      feedback:
        "This proposal reduces the displayed detail and documents controls for the intended recipient. Complete the field and access controls above, then ask Priya to review the full export, the known April 18 cohort and the research detail lost. She must determine which disclosure method applies.",
    },
    {
      id: "narrow",
      label:
        "Remove the linkage key but retain exact dates and five-digit ZIP codes, then release the file publicly because it has no names.",
      feedback:
        "Separating the key removes one direct route to identity, but the detailed dates, geography, and small diagnosis group still create a distinguishable dataset. Public release also removes the recipient controls needed for protected health information.",
    },
    {
      id: "unsafe",
      label:
        "Keep the fields but require the investigator to sign a confidentiality agreement before receiving the file.",
      feedback:
        "A confidentiality commitment is useful, but it does not minimize unnecessary fields, protect a broadly accessible linkage key, resolve the small diagnosis group, or substitute for privacy-office review and the agreement required for the approved release path.",
    },
  ],
  validationCases: [
    {
      name: "Minimum necessary fields",
      note: "The release contains only the detail needed to answer the approved research question.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "Removing the key does not explain why exact dates and five-digit ZIP codes are necessary for the research question.",
        unsafe:
          "A confidentiality agreement does not remove fields that the investigator does not need.",
      },
    },
    {
      name: "Linkage key control",
      note: "The reidentification key is separated from the released data and limited to approved stewards.",
      passingRepairs: ["validated", "narrow"],
      failNotes: {
        unsafe: "The proposal leaves the linkage key in the broadly accessible shared folder.",
      },
    },
    {
      name: "Uniqueness-risk review",
      note: "Detailed dates, geography, and the three-person diagnosis group are reviewed and reduced as required.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "The public file still contains exact dates, five-digit ZIP codes, and the small diagnosis group even though the linkage key was removed.",
        unsafe:
          "The confidentiality agreement does not reduce the combinations that distinguish distinctive records.",
      },
    },
    {
      name: "Approved recipient and purpose",
      note: "The privacy office documents who will receive the data, for which permitted purpose, and under which release path.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "A public release has no named recipient, bounded purpose, or institutional approval.",
        unsafe:
          "The investigator's signature alone does not document privacy-office approval or the permitted disclosure pathway.",
      },
    },
    {
      name: "Recipient confidentiality commitment",
      note: "The recipient accepts enforceable limits on use, disclosure, and attempts to identify individuals.",
      passingRepairs: ["validated", "unsafe"],
      failNotes: {
        narrow:
          "Public release provides no enforceable recipient commitment or restriction on reidentification.",
      },
    },
  ],
};

export const lessonCopy = {
  redactionHeading: "Remove identifying details and protect the key",
  text01:
    "Read the worked example, then use two facts to isolate a row and explain what someone could learn from that combination.",
  text02:
    "The table contains 18 records from the April 18 outage period. It displays five potential quasi-identifiers and a coded linkage value; names and medical record numbers are not present.",
  text03:
    "Move the key out of the shared folder and limit access to approved stewards. This does not change the table or its group size.",
  text04:
    "These 18 rows reflect the selected field changes. The linkage code stays in each row; restricting the separate lookup key changes who can reconnect that code to a patient.",
};
