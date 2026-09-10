export const terminologyRoles = [
  { id: "observation", record: "Discrete result field: percentage of tumor cells staining for estrogen receptor", answer: "LOINC", alternatives: ["LOINC", "CPT", "DICOM"], explanation: "Identify the observation being reported, distinct from its numeric value and unit. The exact term must match the specimen, property, scale, and relevant method; the panel name alone is insufficient." },
  { id: "finding", record: "Clinical finding in the report: invasive carcinoma", answer: "SNOMED CT", alternatives: ["UCUM", "SNOMED CT", "DICOM"], explanation: "A clinical terminology can represent a finding. Selecting the specific concept still requires the documented morphology and site; it must not add a subtype that was not reported." },
  { id: "unit", record: "Numeric result: 85; separate unit field: percent", answer: "UCUM", alternatives: ["ICD", "CAP protocol", "UCUM"], explanation: "UCUM expresses units in a machine-readable form. The percent unit is %, but a unit does not identify which observation was measured." },
  { id: "classification", record: "Diagnosis classification for a United States administrative submission", answer: "ICD", alternatives: ["LOINC", "ICD", "DICOM"], explanation: "Use the applicable diagnosis classification and edition for the submission. Administrative classification may be less detailed than the pathology finding; do not replace the report with its classification." },
  { id: "service", record: "Procedure/service recorded for professional billing review", answer: "CPT", alternatives: ["CPT", "SNOMED CT", "UCUM"], explanation: "CPT describes services for this US billing workflow. A billed service is not evidence of a specific result. Actual coding depends on the work documented and current coding rules." },
  { id: "image", record: "Slide image pixels linked to specimen and acquisition metadata", answer: "DICOM", alternatives: ["CAP protocol", "DICOM", "ICD"], explanation: "DICOM specifies medical image objects and related metadata, including whole-slide microscopy. It is not a vocabulary of tumor diagnoses." },
  { id: "report", record: "Required cancer-report elements, response structure, and protocol version", answer: "CAP protocol", alternatives: ["UCUM", "CPT", "CAP protocol"], explanation: "CAP cancer protocols organize report elements. Individual responses may also carry terminology codes; a report template is not a substitute for those mappings." },
] as const;
export const mappingRows = [
  { id: "TM-01", source: "GLU · serum/plasma · mass concentration · point-in-time · numeric · mg/dL", expected: "2345-7", reason: "2345-7 identifies serum/plasma glucose as mass per volume. Keep the numeric value and mg/dL unit together." },
  { id: "TM-02", source: "GLU · serum/plasma · substance concentration · point-in-time · numeric · mmol/L", expected: "14749-6", reason: "14749-6 identifies serum/plasma glucose as moles per volume. Similar labels do not make mass and substance concentration interchangeable." },
  { id: "TM-03", source: "HER2 · specimen not documented · method not documented · result 2+", expected: "review", reason: "Obtain the assay definition, specimen, method, and scale. Do not infer immunohistochemistry versus another assay from a short label and number alone." },
  { id: "TM-04", source: "BREAST_PANEL · local order that requests several separately reported observations", expected: "order", reason: "Retain the local order identity and review its component mappings. One observation code cannot stand for every result requested by a panel." },
] as const;
export function mappingOptions(id: string): readonly (readonly [string,string])[] {
  const prompt = ["", "Choose a mapping decision"] as const;
  if (id === "TM-03") return [prompt,["ihc","Assume an immunostain result"],["amplification","Assume gene amplification"],["review","Obtain the assay definition"]];
  if (id === "TM-04") return [prompt,["single","Use one biomarker observation"],["finding","Treat the label as a diagnosis"],["order","Retain order; map components"]];
  return [prompt,["2345-7","2345-7 · mass/volume"],["14749-6","14749-6 · moles/volume"],["review","Obtain the assay definition"]];
}
export function terminologyScore(roles: Record<string,string>, mappings: Record<string,string>) {
  return { roles: terminologyRoles.filter(row => roles[row.id] === row.answer).length, mappings: mappingRows.filter(row => mappings[row.id] === row.expected).length };
}
