export type ValidationConfig = {
  scope: string;
  cases: string;
  method: string;
  washout: string;
  system: string;
};
export const initialValidation: ValidationConfig = {
  scope: "all",
  cases: "easy",
  method: "report",
  washout: "8",
  system: "one",
};
export const revisedValidation: ValidationConfig = {
  scope: "fixed",
  cases: "spectrum",
  method: "paired",
  washout: "14",
  system: "intended",
};
export const validationControls = [
  {
    key: "scope",
    label: "Intended use for this review",
    options: [
      ["all", "Fixed tissue, frozen sections, and home reporting"],
      ["fixed", "Fixed H&E tissue at the tested hospital workstation"],
    ],
  },
  {
    key: "cases",
    label: "Case selection",
    options: [
      ["easy", "60 convenient straightforward cases"],
      ["spectrum", "60 cases spanning the expected complexity and diagnoses"],
    ],
  },
  {
    key: "method",
    label: "Comparison method",
    options: [
      ["report", "Digital reader versus the historical report"],
      ["paired", "Same reader: separate digital and glass interpretations"],
    ],
  },
  {
    key: "washout",
    label: "Time between digital and glass reads",
    options: [
      ["8", "8 days"],
      ["14", "14 days"],
      ["21", "21 days"],
    ],
  },
  {
    key: "system",
    label: "System and workflow evidence",
    options: [
      ["one", "Scanner test only; assume other components work"],
      [
        "intended",
        "Document acquisition, identity, retrieval, viewer, display, users, and fallback",
      ],
    ],
  },
] as const;
export const studyRows = [
  {
    category: "Fixed H&E tissue",
    total: 60,
    agree: 58,
    days: 14,
    note: "Two discordances: V12 and V44. Hospital scanner S1, viewer 3.2, workstation D1; trained readers Rao and Chen each completed paired reads on their assigned cases.",
  },
  {
    category: "Frozen sections",
    total: 17,
    agree: 14,
    days: 8,
    note: "Three discordances; focus problems under review. Exploratory series, not a completed frozen-section validation.",
  },
];
export const discordances = [
  {
    id: "V12",
    record:
      "Gastric biopsy · fixed H&E\nGlass: rare organisms suspected; special stain requested\nDigital: no organisms seen\nScan QC: locally blurred mucosal surface\nAdjudication: focal blur affected the search; rescan requested",
    choices: [
      {
        id: "rescan",
        label: "Review scan quality, rescan, and repeat affected workflow checks.",
        note: "A rescan may correct acquisition, but the original discordance stays in the study. Add targeted difficult cases and document the effect before clinical approval.",
        correct: true,
      },
      {
        id: "exclude",
        label: "Remove this difficult biopsy from the denominator.",
        note: "Difficult biopsies are part of the proposed use. Removing a failure would exaggerate performance and hide a correctable acquisition problem.",
        correct: false,
      },
      {
        id: "zoom",
        label: "Increase viewer zoom and count it as resolved.",
        note: "Display enlargement cannot recover detail not captured in focus. Inspect the glass, preparation, scan, and viewer before assigning a cause.",
        correct: false,
      },
    ],
  },
  {
    id: "V44",
    record:
      "Colon polyp · fixed H&E\nGlass: low-grade dysplasia\nDigital: high-grade dysplasia\nScan QC: tissue complete and in focus\nAdjudication: diagnostic interpretation differed; no technical cause established",
    choices: [
      {
        id: "review",
        label:
          "Keep the disagreement, review clinical significance, and assess reader variability.",
        note: "Not every disagreement is caused by the scanner. Document both reads and adjudication, distinguish major from minor clinical effects, and compare with glass-reader variability as appropriate.",
        correct: true,
      },
      {
        id: "scanner",
        label: "Assign every disagreement to scanner failure.",
        note: "The current evidence does not establish a technical defect. Investigate interpretation and reader variability without erasing the event.",
        correct: false,
      },
      {
        id: "replace",
        label: "Replace the first digital answer with the adjudicated answer.",
        note: "Adjudication explains the disagreement; it does not change the original paired observations used to calculate concordance.",
        correct: false,
      },
    ],
  },
] as const;
export const decisions = [
  {
    id: "full",
    label: "Approve the entire requested scope now.",
    note: "The frozen-section series has only 17 cases, an 8-day interval, and 3 disagreements. Home reporting has no completed system evidence. The fixed-tissue aggregate cannot cover these gaps.",
  },
  {
    id: "limited",
    label:
      "Consider fixed-tissue approval only after documented corrective review; keep other uses on hold.",
    note: "The 58/60 result supports review of the fixed-tissue application, with both discordances retained. It does not settle V12, authorize home reporting, or validate frozen sections. The director still needs the corrective evidence and signed plan.",
  },
  {
    id: "reject",
    label: "Abandon digital pathology permanently.",
    note: "These findings identify gaps and a potentially correctable acquisition issue. A targeted hold and further evidence are more proportionate than a permanent conclusion about all digital pathology.",
  },
] as const;
export function reviewValidation(c: ValidationConfig, answers: Record<string, string>) {
  return [
    {
      label: "Scope supported by this study",
      pass: c.scope === "fixed",
      note: "Limit the review to fixed H&E at the tested hospital workstation; other applications and sites need their own evidence.",
    },
    {
      label: "Representative selection",
      pass: c.cases === "spectrum",
      note: "Case count alone cannot compensate for missing complexity, small foci, artifacts, and expected diagnoses.",
    },
    {
      label: "Intraobserver comparison",
      pass: c.method === "paired",
      note: "Compare each pathologist with their own separate glass read; a historical report is not the same comparison.",
    },
    {
      label: "At least two weeks between reads",
      pass: Number(c.washout) >= 14,
      note: "A 14-day or longer interval addresses the guideline washout recommendation; randomize order and avoid access to prior answers.",
    },
    {
      label: "Complete intended system",
      pass: c.system === "intended",
      note: "Scanner performance alone does not demonstrate identity, retrieval, display, navigation, or fallback behavior.",
    },
    {
      label: "Acquisition discordance investigated",
      pass: answers.V12 === "rescan",
      note: "Retain V12, investigate blur, and require corrective evidence.",
    },
    {
      label: "Interpretive discordance retained",
      pass: answers.V44 === "review",
      note: "Retain V44 and document clinical significance rather than rewriting the original read.",
    },
  ];
}
export const changes = [
  {
    id: "viewer",
    label: "Viewer update changes image rendering.",
    answer: "targeted",
    note: "Assess the changed rendering and affected workflows against documented baseline behavior; determine the scope of revalidation with clinical leadership before release.",
  },
  {
    id: "frozen",
    label: "Add frozen sections for intraoperative consultation.",
    answer: "new",
    note: "A new application needs representative clinical validation, time-critical workflow and fallback testing, and review of device labeling and applicable requirements.",
  },
  {
    id: "account",
    label: "Correct a user phone number; image workflow is unchanged.",
    answer: "document",
    note: "Document and verify the administrative edit. Risk-based change review should explain why image-performance revalidation is unnecessary for this edit.",
  },
] as const;
