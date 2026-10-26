export const terminologyRoles = [
  {
    id: "observation",
    record: "Discrete result field: percentage of tumor cells staining for estrogen receptor",
    answer: "LOINC",
    alternatives: ["LOINC", "CPT", "DICOM"],
    explanation:
      "Identify the observation being reported, distinct from its numeric value and unit. The exact term must match the specimen, property, scale, and relevant method; the panel name alone is insufficient.",
  },
  {
    id: "finding",
    record: "Clinical finding in the report: invasive carcinoma",
    answer: "SNOMED CT",
    alternatives: ["UCUM", "SNOMED CT", "DICOM"],
    explanation:
      "A clinical terminology can represent a finding. Selecting the specific concept still requires the documented morphology and site; it must not add a subtype that was not reported.",
  },
  {
    id: "unit",
    record: "Numeric result: 85; separate unit field: percent",
    answer: "UCUM",
    alternatives: ["ICD", "CAP protocol", "UCUM"],
    explanation:
      "UCUM expresses units in a machine-readable form. The percent unit is %, but a unit does not identify which observation was measured.",
  },
  {
    id: "classification",
    record: "Diagnosis classification for a United States administrative submission",
    answer: "ICD",
    alternatives: ["LOINC", "ICD", "DICOM"],
    explanation:
      "Use the applicable diagnosis classification and edition for the submission. Administrative classification may be less detailed than the pathology finding; do not replace the report with its classification.",
  },
  {
    id: "service",
    record: "Procedure/service recorded for professional billing review",
    answer: "CPT",
    alternatives: ["CPT", "SNOMED CT", "UCUM"],
    explanation:
      "CPT describes services for this US billing workflow. A billed service is not evidence of a specific result. Actual coding depends on the work documented and current coding rules.",
  },
  {
    id: "image",
    record: "Slide image pixels linked to specimen and acquisition metadata",
    answer: "DICOM",
    alternatives: ["CAP protocol", "DICOM", "ICD"],
    explanation:
      "DICOM specifies medical image objects and related metadata, including whole-slide microscopy. It is not a vocabulary of tumor diagnoses.",
  },
  {
    id: "report",
    record: "Required cancer-report elements, response structure, and protocol version",
    answer: "CAP protocol",
    alternatives: ["UCUM", "CPT", "CAP protocol"],
    explanation:
      "CAP cancer protocols organize report elements. Individual responses may also carry terminology codes; a report template is not a substitute for those mappings.",
  },
] as const;
export const mappingRows = [
  {
    id: "TM-01",
    source: "GLU · serum/plasma · mass concentration · point-in-time · numeric · mg/dL",
    expected: "2345-7",
    reason:
      "2345-7 identifies serum/plasma glucose as mass per volume. Keep the numeric value and mg/dL unit together.",
  },
  {
    id: "TM-02",
    source: "GLU · serum/plasma · substance concentration · point-in-time · numeric · mmol/L",
    expected: "14749-6",
    reason:
      "14749-6 identifies serum/plasma glucose as moles per volume. Similar labels do not make mass and substance concentration interchangeable.",
  },
  {
    id: "TM-03",
    source: "HER2 · specimen not documented · method not documented · result: Positive",
    expected: "review",
    reason:
      "Obtain the assay definition, specimen, method, and scale. Positive can describe an immunohistochemistry score of 3+ or an amplified in situ hybridization result, and the specimen is not stated. Obtain the assay definition, specimen, method and scale before choosing a term.",
  },
  {
    id: "TM-04",
    source: "BREAST_PANEL · local order that requests several separately reported observations",
    expected: "order",
    reason:
      "Retain the local order identity and review its component mappings. One observation code cannot stand for every result requested by a panel.",
  },
] as const;
export function mappingOptions(id: string): readonly (readonly [string, string])[] {
  const prompt = ["", "Choose a mapping decision"] as const;
  if (id === "TM-03")
    return [
      prompt,
      ["ihc", "Assume an immunostain result"],
      ["amplification", "Assume gene amplification"],
      ["review", "Obtain the assay definition"],
    ];
  if (id === "TM-04")
    return [
      prompt,
      ["single", "Use one biomarker observation"],
      ["finding", "Treat the label as a diagnosis"],
      ["order", "Retain order; map components"],
    ];
  return [
    prompt,
    ["2345-7", "2345-7 · mass/volume"],
    ["14749-6", "14749-6 · moles/volume"],
    ["review", "Obtain the assay definition"],
  ];
}
export function terminologyScore(roles: Record<string, string>, mappings: Record<string, string>) {
  return {
    roles: terminologyRoles.filter((row) => roles[row.id] === row.answer).length,
    mappings: mappingRows.filter((row) => mappings[row.id] === row.expected).length,
  };
}

export const localGlucoseRecords = [
  {
    site: "Hospital A",
    code: "CHEM17",
    name: "GLU",
    specimen: "Serum/plasma",
    value: "99",
    unit: "mg/dL",
  },
  {
    site: "Hospital B",
    code: "G002",
    name: "GLUC",
    specimen: "Serum/plasma",
    value: "102",
    unit: "mg/dL",
  },
  {
    site: "Hospital C, a partner hospital in Canada",
    code: "BIO8",
    name: "GLU",
    specimen: "Serum/plasma",
    value: "5.5",
    unit: "mmol/L",
  },
] as const;
export const terminologyDecisions = {
  problem: {
    label: "How should the receiving system identify these observations?",
    answer: "definition",
    options: [
      ["name", "Group by the display name"],
      ["definition", "Compare catalog definitions and assign shared observation identifiers"],
      ["number", "Group by similar numeric results"],
    ],
    notes: {
      name: "This joins A with C despite different concentration properties and leaves B out. A local abbreviation is not a shared definition.",
      definition:
        "A and B describe mass-concentration observations despite different labels. C uses a different concentration property. A shared identifier must follow that definition, with units and other context retained.",
      number:
        "A result value cannot identify the test. Similar numbers may represent different measurements, and different units can produce different numbers for comparable quantities.",
    },
  },
  evidence: {
    label: "What do the two mapping-error studies support?",
    answer: "audit",
    options: [
      ["universal", "About one fifth of every laboratory's patient results are wrong"],
      ["trend", "Mapping errors fell from 19.6% to 4.6% over time"],
      ["audit", "Audit local mappings; the study populations and denominators differ"],
    ],
    notes: {
      universal:
        "The CAP survey counted submitted codes among responding laboratories. It did not estimate errors in every laboratory's patient results.",
      trend:
        "These were different studies, populations, and denominators, not repeated measurements of the same population.",
      audit:
        "The studies demonstrate real mapping problems. Local review is needed to establish local performance; code-level and result-weighted percentages cannot be treated as interchangeable.",
    },
  },
  transfer: {
    label:
      "Urine glucose, quantitative mg/dL, is proposed for the verified serum/plasma code. What should happen?",
    answer: "specimen",
    options: [
      ["accept", "Accept because glucose and mg/dL match"],
      ["convert", "Convert the number and retain the serum/plasma code"],
      ["specimen", "Reject this assignment and look up a term matching the urine observation"],
    ],
    notes: {
      accept:
        "The component and unit are not enough. The System part of the candidate describes serum/plasma, while the source is urine.",
      convert:
        "Changing a value or unit cannot change the specimen. Preserve the source record and find a supported term.",
      specimen:
        "This is a specimen mismatch. Obtain the full urine test definition and review a suitable candidate; do not infer its code from the serum/plasma term.",
    },
  },
} as const;
export const lookupFields = [
  {
    id: "component",
    label: "Component for both terms",
    answer: "glucose",
    options: [
      ["glucose", "Glucose"],
      ["insulin", "Insulin"],
    ],
  },
  {
    id: "propertyAB",
    label: "Property for Hospitals A and B",
    answer: "MCnc",
    options: [
      ["MCnc", "MCnc · mass concentration"],
      ["SCnc", "SCnc · substance concentration"],
    ],
  },
  {
    id: "propertyC",
    label: "Property for Hospital C, a partner hospital in Canada",
    answer: "SCnc",
    options: [
      ["MCnc", "MCnc · mass concentration"],
      ["SCnc", "SCnc · substance concentration"],
    ],
  },
  {
    id: "time",
    label: "Time for both terms",
    answer: "Pt",
    options: [
      ["Pt", "Pt · point in time"],
      ["24H", "24H · 24-hour collection"],
    ],
  },
  {
    id: "system",
    label: "System for both terms",
    answer: "Ser/Plas",
    options: [
      ["Ser/Plas", "Ser/Plas · serum or plasma"],
      ["Urine", "Urine"],
    ],
  },
  {
    id: "scale",
    label: "Scale for both terms",
    answer: "Qn",
    options: [
      ["Qn", "Qn · quantitative"],
      ["Ord", "Ord · ordinal category"],
    ],
  },
  {
    id: "method",
    label: "Method part for these terms",
    answer: "unspecified",
    options: [
      ["unspecified", "No method specified by the term"],
      ["none", "No laboratory method was used"],
      ["specified", "A specific method is required by the term"],
    ],
  },
] as const;
export function lookupReview(values: Record<string, string>) {
  const codes =
    (values.codeAB ?? "").trim() === "2345-7" && (values.codeC ?? "").trim() === "14749-6";
  const dimensions = lookupFields.filter((row) => values[row.id] === row.answer).length;
  return { codes, dimensions, complete: codes && dimensions === lookupFields.length };
}
export const terminologyCopy = {
  catalogCaption:
    "Local catalog entries and example reports; each is a separate accession, not a serial patient trend.",
  catalogNote:
    "All three entries are point-in-time quantitative observations. The supplied catalog review supports a method-unspecified term. The draft groups by local display name; the examples are not evidence of analytical equivalence.",
  lookupReady:
    "Both codes and all seven comparison fields agree with the supplied catalog definitions. Explain why the properties differ and why assigning a code does not convert the result.",
  lookupIncomplete:
    "The lookup record is incomplete or inconsistent. Reopen the term pages and compare the property and specimen with the local catalog; do not choose a code from the abbreviation alone.",
  reviewReady:
    "The review addresses the naming problem, website comparison, mapping decisions, study interpretation, and urine transfer case. Document the evidence and obtain the appropriate local review before changing a real feed.",
  reviewIncomplete:
    "Some decisions still need review. Check the lookup record and the feedback beside each selection; a matching code number alone is insufficient.",
};

export const sectionPurposes = [
  "Compare local reports to identify which differences a test name hides.",
  "Match each part of the assay definition before choosing an observation code.",
  "Assign each terminology to the question it is designed to answer.",
  "Accept supported mappings and request missing assay details for ambiguous ones.",
  "Inspect each study’s denominator before comparing its error rate.",
  "Use the same definition checks when the specimen and local test name change.",
];
