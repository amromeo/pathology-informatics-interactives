export const terminologyRoles = [
  {
    id: "observation",
    record: "Discrete result field: percentage of tumor cells staining for estrogen receptor",
    answer: "LOINC",
    alternatives: ["LOINC", "CPT", "DICOM"],
    explanation:
      "Identify the result being reported, separately from its number and unit. The exact code has to match the specimen, property, scale and, where it matters, the method; the panel name alone is not enough.",
  },
  {
    id: "finding",
    record: "Clinical finding in the report: invasive carcinoma",
    answer: "SNOMED CT",
    alternatives: ["UCUM", "SNOMED CT", "DICOM"],
    explanation:
      "A clinical terminology can represent a finding. Choosing the exact concept still needs the morphology and site from the report, and must not add a subtype the report did not give.",
  },
  {
    id: "unit",
    record: "Numeric result: 85; separate unit field: percent",
    answer: "UCUM",
    alternatives: ["ICD", "CAP protocol", "UCUM"],
    explanation:
      "UCUM writes units in a form computers can read. The unit for percent is %, but a unit does not say what was measured.",
  },
  {
    id: "classification",
    record: "Diagnosis classification for a United States administrative submission",
    answer: "ICD",
    alternatives: ["LOINC", "ICD", "DICOM"],
    explanation:
      "Use the diagnosis classification and edition the submission requires. A billing classification may be less detailed than the pathology finding; it must not take the place of the report.",
  },
  {
    id: "service",
    record: "Procedure/service recorded for professional billing review",
    answer: "CPT",
    alternatives: ["CPT", "SNOMED CT", "UCUM"],
    explanation:
      "CPT describes services for US billing. A billed service says nothing about what the result was. The actual code depends on the work documented and the current coding rules.",
  },
  {
    id: "image",
    record: "Slide image pixels linked to specimen and acquisition metadata",
    answer: "DICOM",
    alternatives: ["CAP protocol", "DICOM", "ICD"],
    explanation:
      "DICOM describes medical images and the information stored with them, including whole-slide microscopy images. It is not a list of tumor diagnoses.",
  },
  {
    id: "report",
    record: "Required cancer-report elements, response structure, and protocol version",
    answer: "CAP protocol",
    alternatives: ["UCUM", "CPT", "CAP protocol"],
    explanation:
      "CAP cancer protocols organize what goes in the report. Individual answers may also carry terminology codes; a report template does not replace those mappings.",
  },
] as const;
export const mappingRows = [
  {
    id: "TM-01",
    source: "GLU · serum/plasma · mass concentration · point-in-time · numeric · mg/dL",
    expected: "2345-7",
    reason:
      "2345-7 identifies serum/plasma glucose as mass per volume. Keep the number and the mg/dL unit together.",
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
      "Positive could mean an immunohistochemistry score of 3+ or an amplified in situ hybridization result, and the specimen is not stated. Get the assay definition, specimen, method and scale before choosing a code.",
  },
  {
    id: "TM-04",
    source: "BREAST_PANEL · local order that requests several separately reported observations",
    expected: "order",
    reason:
      "Keep the local order code and review the mappings for each result in the panel. One result code cannot stand for every result a panel orders.",
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
      name: "This puts A with C even though they measure concentration differently, and leaves B out. A local abbreviation is not a shared definition.",
      definition:
        "A and B both report mass concentration, despite their different labels. C reports a different kind of concentration. A shared code has to follow that definition, with the units and other details kept.",
      number:
        "A result value cannot tell you what the test is. Similar numbers can come from different measurements, and different units give different numbers for the same amount.",
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
        "The CAP survey counted the codes that responding laboratories sent in. It did not estimate errors in every laboratory's patient results.",
      trend:
        "These were different studies, with different populations and denominators, not the same group measured twice.",
      audit:
        "The studies show that mapping errors really happen. Only a local review can tell you how your own mappings are doing, and a percentage of codes cannot be compared directly with a percentage of results.",
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
        "The component and unit are not enough. The System part of the candidate says serum/plasma, but the specimen is urine.",
      convert:
        "Changing the number or the unit cannot change the specimen. Keep the original record and find a code that fits.",
      specimen:
        "The specimens do not match. Get the full definition of the urine test and review a suitable candidate; do not guess its code from the serum/plasma one.",
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
    "Entries from each local test list, with example reports; each is a separate accession, not a series of results for one patient.",
  catalogNote:
    "All three are single numeric results at one point in time. The test-list review supports a code with no method specified. The draft groups by local display name; the examples do not show that the assays give the same results.",
  lookupReady:
    "Both codes and all seven comparison fields agree with the local test definitions. Explain why the properties differ and why giving a result a code does not convert it.",
  lookupIncomplete:
    "Your lookup record is incomplete or does not add up. Go back to the code pages and compare the property and specimen with the local test list; do not choose a code from the abbreviation alone.",
  reviewReady:
    "The review covers the naming problem, the website comparison, the mapping decisions, the studies and the urine example. Record the evidence, and get the local review, before changing a real feed.",
  reviewIncomplete:
    "Some decisions still need another look. Check the lookup record and the feedback beside each choice; a matching code number is not enough.",
};

export const sectionPurposes = [
  "Compare local reports to identify which differences a test name hides.",
  "Match each part of the assay definition before choosing an observation code.",
  "Match each terminology to the question it is meant to answer.",
  "Accept the mappings the evidence supports, and ask for the missing assay details for the unclear ones.",
  "Inspect each study’s denominator before comparing its error rate.",
  "Use the same definition checks when the specimen and local test name change.",
];
