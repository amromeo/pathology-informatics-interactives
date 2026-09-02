import assert from "node:assert/strict";
import test from "node:test";
import {
  applyTransforms,
  classifyDataset,
  filterFields,
  fullTransformSet,
  generalizedDiagnosis,
  hasUniqueVisibleMatch,
  matchCount,
  minGroupSize,
  privacyRows,
  rareDiagnosis,
  type PrivacyRow,
} from "../content/lessons/not-anonymous-enough/interaction";

const expectedRows: PrivacyRow[] = [
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

test("the synthetic privacy dataset is frozen at 18 exact outage-day rows", () => {
  assert.deepEqual(privacyRows, expectedRows);
  assert.equal(privacyRows.length, 18);
  assert.ok(privacyRows.every((row) => row.admissionDate === "2026-04-18"));
});

test("raw quasi-identifiers are unique while the rare cohort requires a conjunction", () => {
  assert.equal(minGroupSize(privacyRows, filterFields), 1);
  assert.equal(matchCount(privacyRows, { diagnosis: rareDiagnosis }), 3);
  const cohort = privacyRows.filter((row) => row.diagnosis === rareDiagnosis);
  for (const row of cohort) {
    assert.equal(matchCount(privacyRows, { diagnosis: rareDiagnosis, zip5: row.zip5 }), 1, row.recordId);
    assert.ok(matchCount(privacyRows, { zip5: row.zip5 }) > 1, `${row.zip5} should not identify a record by itself`);
  }
});

test("the full workbench creates groups of at least four with no unique filter conjunction", () => {
  const transformed = applyTransforms(privacyRows, fullTransformSet);
  assert.equal(minGroupSize(transformed, filterFields), 4);
  assert.equal(hasUniqueVisibleMatch(transformed, filterFields), false);
  assert.equal(matchCount(transformed, { diagnosis: generalizedDiagnosis, birthYear: 1988, sex: "F", zip5: "021**", admissionDate: "2026" }), 4);
});

test("each single data transformation still leaves a concrete isolating conjunction", () => {
  const dateOnly = applyTransforms(privacyRows, ["date-to-year"]);
  assert.equal(matchCount(dateOnly, { birthYear: 1988, sex: "F", zip5: "02108", admissionDate: "2026", diagnosis: rareDiagnosis }), 1);

  const zipOnly = applyTransforms(privacyRows, ["zip-to-three"]);
  assert.equal(matchCount(zipOnly, { birthYear: 1988, sex: "F", zip5: "021**", admissionDate: "2026-04-18", diagnosis: generalizedDiagnosis }), 1);

  const diagnosisOnly = applyTransforms(privacyRows, ["rare-diagnosis-to-category"]);
  assert.equal(matchCount(diagnosisOnly, { birthYear: 1988, sex: "F", zip5: "02108", admissionDate: "2026-04-18", diagnosis: generalizedDiagnosis }), 1);
});

test("key control changes governance classification without changing the table", () => {
  const validContext = { eligiblePurpose: true, namedRecipient: true, dataUseAgreement: true };
  const missingAgreement = { ...validContext, dataUseAgreement: false };

  assert.equal(classifyDataset([], false, validContext), "coded-reidentifiable");
  assert.equal(classifyDataset(fullTransformSet, false, validContext), "coded-reidentifiable");
  assert.equal(classifyDataset(["rare-diagnosis-to-category"], true, missingAgreement), "coded-reidentifiable");
  assert.equal(classifyDataset(["rare-diagnosis-to-category"], true, validContext), "limited-data-set-candidate");
  assert.equal(classifyDataset(fullTransformSet, true, validContext), "deidentification-review-required");
  assert.deepEqual(applyTransforms(privacyRows, []), privacyRows);
});
