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
    note: "Rao 29/30; Chen 29/30. Two discordances: V12 (Rao) and V44 (Chen). Hospital scanner S1, viewer 3.2, workstation D1; trained readers Rao and Chen each completed paired reads on their assigned cases.",
  },
  {
    category: "Frozen sections",
    total: 17,
    agree: 14,
    days: 8,
    note: "Three disagreements; focus problems being looked into. An early series, not a finished frozen-section validation.",
  },
];
export const discordances = [
  {
    id: "V12",
    record:
      "Reader: Rao\nGastric biopsy · fixed H&E\nGlass: rare organisms suspected; special stain requested\nDigital: no organisms seen\nScan QC: locally blurred mucosal surface\nAdjudication: focal blur affected the search; rescan requested",
    choices: [
      {
        id: "rescan",
        label: "Rescan and repeat the affected checks.",
        note: "A rescan may fix the scanning problem, but the original disagreement stays in the study. Add more difficult cases of this kind and record the result before clinical approval.",
        correct: true,
      },
      {
        id: "exclude",
        label: "Remove this difficult biopsy from the denominator.",
        note: "Difficult biopsies are part of the work the service will do. Removing a failure would make performance look better than it is and hide a scanning problem that could be fixed.",
        correct: false,
      },
      {
        id: "zoom",
        label: "Increase viewer zoom and count it as resolved.",
        note: "Enlarging the image cannot bring back detail that was never captured in focus. Look at the glass, the preparation, the scan and the viewer before deciding on a cause.",
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
        label: "Retain and investigate the disagreement.",
        note: "Not every disagreement is the scanner's fault. Record both readings and how they were reconciled, sort major from minor clinical effects, and compare with how much pathologists disagree on glass.",
        correct: true,
      },
      {
        id: "scanner",
        label: "Assign every disagreement to scanner failure.",
        note: "Nothing so far shows a technical fault. Look into how the slide was interpreted and how much readers vary, without erasing the event.",
        correct: false,
      },
      {
        id: "replace",
        label: "Replace the first digital answer with the adjudicated answer.",
        note: "Reconciling the readings explains the disagreement; it does not change the original pair of readings used to calculate agreement.",
        correct: false,
      },
    ],
  },
] as const;
export const decisions = [
  {
    id: "full",
    label: "Approve the entire requested scope now.",
    note: "The frozen-section series has only 17 cases, an 8-day gap and 3 disagreements. Home reporting has not been tested at all. The fixed-tissue total cannot cover those gaps.",
  },
  {
    id: "limited",
    label:
      "Consider fixed-tissue approval only after documented corrective review; keep other uses on hold.",
    note: "The 58/60 result supports review of the fixed-tissue application, with both discordances retained. It does not settle V12, authorize home reporting, or validate frozen sections. The director still needs the corrective evidence and signed plan.",
  },
  {
    id: "reject",
    label: "Repeat the whole study before investigating the scan.",
    note: "These findings show gaps and a scanning problem that may be fixable. Holding the specific uses and gathering more evidence makes more sense than reaching a final verdict on all digital pathology.",
  },
] as const;
export function reviewValidation(c: ValidationConfig, answers: Record<string, string>) {
  return [
    {
      label: "Scope supported by this study",
      pass: c.scope === "fixed",
      note: "Limit the review to fixed H&E at the hospital workstation that was tested; other uses and locations need their own evidence.",
    },
    {
      label: "Representative selection",
      pass: c.cases === "spectrum",
      note: "A large number of cases cannot make up for leaving out difficult cases, small foci, artifacts and the diagnoses the service will see.",
    },
    {
      label: "Intraobserver comparison",
      pass: c.method === "paired",
      note: "Compare each pathologist with their own separate glass reading; the original report is a different comparison.",
    },
    {
      label: "At least two weeks between reads",
      pass: Number(c.washout) >= 14,
      note: "A gap of 14 days or more meets the guideline's recommendation for time between readings; shuffle the order and keep earlier answers out of sight.",
    },
    {
      label: "Complete intended system",
      pass: c.system === "intended",
      note: "How the scanner performs says nothing about slide identity, retrieval, display, moving around the slide or falling back to glass.",
    },
    {
      label: "Acquisition discordance investigated",
      pass: answers.V12 === "rescan",
      note: "Keep V12, look into the blur and require evidence that it is fixed.",
    },
    {
      label: "Interpretive discordance retained",
      pass: answers.V44 === "review",
      note: "Keep V44 and record how much it matters clinically, rather than rewriting the original reading.",
    },
  ];
}
export const changes = [
  {
    id: "viewer",
    label: "Viewer update changes image rendering.",
    answer: "targeted",
    note: "Compare how images now look, and the work affected, with what was recorded before the change; decide with the director how much needs revalidating before release.",
  },
  {
    id: "frozen",
    label: "Add frozen sections for intraoperative consultation.",
    answer: "new",
    note: "A new use needs its own clinical validation on typical cases, testing of the urgent workflow and fallback to glass, and a check of the device labeling and any rules that apply.",
  },
  {
    id: "account",
    label: "Correct a user phone number; image workflow is unchanged.",
    answer: "document",
    note: "Record and check the administrative edit. The change review should say why a change like this does not need the images revalidated.",
  },
] as const;

export const sectionPurposes = [
  "Find out which readers, cases and uses the evidence actually covers.",
  "Choose a comparison that fits the proposed clinical use.",
  "Keep both disagreements in the study and choose how to investigate their causes.",
  "Tell administrative changes apart from changes that need targeted checks or a new validation.",
];
