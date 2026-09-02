export const filterFields = ["birthYear", "sex", "zip5", "admissionDate", "diagnosis"] as const;
export type FilterField = typeof filterFields[number];

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
export type DatasetClassification = "coded-reidentifiable" | "limited-data-set-candidate" | "deidentification-review-required";

export const rareDiagnosis = "Ewing sarcoma";
export const generalizedDiagnosis = "Bone and soft tissue neoplasm";
export const fullTransformSet: TransformId[] = ["date-to-year", "zip-to-three", "rare-diagnosis-to-category"];

// Frozen by exact-value tests. All records and identifiers are synthetic.
export const privacyRows: readonly PrivacyRow[] = [
  { recordId: "NR-001", birthYear: 1988, sex: "F", zip5: "02108", admissionDate: "2026-04-18", diagnosis: "Ewing sarcoma", linkageCode: "LK-4A17" },
  { recordId: "NR-002", birthYear: 1988, sex: "F", zip5: "02109", admissionDate: "2026-04-18", diagnosis: "Ewing sarcoma", linkageCode: "LK-7C22" },
  { recordId: "NR-003", birthYear: 1988, sex: "F", zip5: "02110", admissionDate: "2026-04-18", diagnosis: "Ewing sarcoma", linkageCode: "LK-9D08" },
  { recordId: "NR-004", birthYear: 1988, sex: "F", zip5: "02111", admissionDate: "2026-04-18", diagnosis: "Bone and soft tissue neoplasm", linkageCode: "LK-2B64" },
  { recordId: "NR-005", birthYear: 1975, sex: "M", zip5: "02108", admissionDate: "2026-04-18", diagnosis: "Bone and soft tissue neoplasm", linkageCode: "LK-5F31" },
  { recordId: "NR-006", birthYear: 1975, sex: "M", zip5: "02109", admissionDate: "2026-04-18", diagnosis: "Bone and soft tissue neoplasm", linkageCode: "LK-8E45" },
  { recordId: "NR-007", birthYear: 1975, sex: "M", zip5: "02110", admissionDate: "2026-04-18", diagnosis: "Bone and soft tissue neoplasm", linkageCode: "LK-1A93" },
  { recordId: "NR-008", birthYear: 1975, sex: "M", zip5: "02111", admissionDate: "2026-04-18", diagnosis: "Bone and soft tissue neoplasm", linkageCode: "LK-6C70" },
  { recordId: "NR-009", birthYear: 1962, sex: "F", zip5: "02445", admissionDate: "2026-04-18", diagnosis: "Community-acquired pneumonia", linkageCode: "LK-3D52" },
  { recordId: "NR-010", birthYear: 1962, sex: "F", zip5: "02446", admissionDate: "2026-04-18", diagnosis: "Community-acquired pneumonia", linkageCode: "LK-7B19" },
  { recordId: "NR-011", birthYear: 1962, sex: "F", zip5: "02447", admissionDate: "2026-04-18", diagnosis: "Community-acquired pneumonia", linkageCode: "LK-9A81" },
  { recordId: "NR-012", birthYear: 1962, sex: "F", zip5: "02448", admissionDate: "2026-04-18", diagnosis: "Community-acquired pneumonia", linkageCode: "LK-4E06" },
  { recordId: "NR-013", birthYear: 1962, sex: "F", zip5: "02449", admissionDate: "2026-04-18", diagnosis: "Community-acquired pneumonia", linkageCode: "LK-2C38" },
  { recordId: "NR-014", birthYear: 1994, sex: "M", zip5: "02445", admissionDate: "2026-04-18", diagnosis: "Diabetic ketoacidosis", linkageCode: "LK-8D27" },
  { recordId: "NR-015", birthYear: 1994, sex: "M", zip5: "02446", admissionDate: "2026-04-18", diagnosis: "Diabetic ketoacidosis", linkageCode: "LK-5A74" },
  { recordId: "NR-016", birthYear: 1994, sex: "M", zip5: "02447", admissionDate: "2026-04-18", diagnosis: "Diabetic ketoacidosis", linkageCode: "LK-1F60" },
  { recordId: "NR-017", birthYear: 1994, sex: "M", zip5: "02448", admissionDate: "2026-04-18", diagnosis: "Diabetic ketoacidosis", linkageCode: "LK-6B42" },
  { recordId: "NR-018", birthYear: 1994, sex: "M", zip5: "02449", admissionDate: "2026-04-18", diagnosis: "Diabetic ketoacidosis", linkageCode: "LK-3E95" },
];

export const applyTransforms = (rows: readonly PrivacyRow[], transforms: readonly TransformId[]): PrivacyRow[] => {
  const selected = new Set(transforms);
  return rows.map((row) => ({
    ...row,
    zip5: selected.has("zip-to-three") ? `${row.zip5.slice(0, 3)}**` : row.zip5,
    admissionDate: selected.has("date-to-year") ? row.admissionDate.slice(0, 4) : row.admissionDate,
    diagnosis: selected.has("rare-diagnosis-to-category") && row.diagnosis === rareDiagnosis ? generalizedDiagnosis : row.diagnosis,
  }));
};

export const matchCount = (rows: readonly PrivacyRow[], filters: PrivacyFilters): number => {
  const active = Object.entries(filters).filter(([, value]) => value !== undefined && value !== "") as [FilterField, PrivacyRow[FilterField]][];
  return rows.filter((row) => active.every(([field, value]) => row[field] === value)).length;
};

export const minGroupSize = (rows: readonly PrivacyRow[], quasiIdentifiers: readonly FilterField[] = filterFields): number => {
  if (!rows.length) return 0;
  const groups = new Map<string, number>();
  for (const row of rows) {
    const key = JSON.stringify(quasiIdentifiers.map((field) => row[field]));
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return Math.min(...groups.values());
};

export const hasUniqueVisibleMatch = (rows: readonly PrivacyRow[], availableFilters: readonly FilterField[] = filterFields): boolean => {
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
  if (fullTransformSet.every((transform) => transforms.includes(transform))) return "deidentification-review-required";
  if (releaseContext.eligiblePurpose && releaseContext.namedRecipient && releaseContext.dataUseAgreement) return "limited-data-set-candidate";
  return "coded-reidentifiable";
};
