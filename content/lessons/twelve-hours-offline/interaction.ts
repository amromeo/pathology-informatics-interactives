import type { LessonDefinition } from "../../../src/data/types";
export type DowntimePhaseId = "activate" | "operate" | "recover";

export type DowntimeDecisionId =
  | "temporary-identifiers"
  | "incident-command"
  | "critical-results"
  | "paper-orders"
  | "recovery-transition"
  | "duplicate-orders";

export type DowntimeChoice = {
  id: string;
  label: string;
  feedback: string;
  preferred: boolean;
};

export type DowntimeDecision = {
  id: DowntimeDecisionId;
  prompt: string;
  choices: readonly DowntimeChoice[];
};

export type DowntimePhase = {
  id: DowntimePhaseId;
  title: string;
  time: string;
  situation: string;
  decisions: readonly DowntimeDecision[];
};

export type DowntimeState = {
  decisions: Partial<Record<DowntimeDecisionId, string>>;
};

export const initialDowntimeState: DowntimeState = { decisions: {} };

export const tabletopPhases: readonly DowntimePhase[] = [
  {
    id: "activate",
    title: "Activate",
    time: "06:20–07:00",
    situation:
      "Registration messages and electronic orders stop. The emergency department and laboratory must begin one coordinated paper workflow.",
    decisions: [
      {
        id: "temporary-identifiers",
        prompt: "How will staff assign temporary patient identifiers?",
        choices: [
          {
            id: "controlled-id-block",
            label:
              "Registration issues identifiers from one numbered downtime block and records each assignment in a shared paper index.",
            preferred: true,
            feedback:
              "One numbered block gives registration and the laboratory a common identity record that can be matched to the restored chart.",
          },
          {
            id: "unit-created-identifiers",
            label:
              "Each clinical unit uses its own prefix and sequence so testing can begin without waiting for central registration.",
            preferred: false,
            feedback:
              "Local sequences are fast, but two units can create separate records for the same patient. Recovery then includes a duplicate-chart investigation.",
          },
        ],
      },
      {
        id: "incident-command",
        prompt: "Who coordinates the laboratory response?",
        choices: [
          {
            id: "defined-command",
            label:
              "Dr. Ruiz declares downtime, names one laboratory incident lead, and sets scheduled updates with registration, nursing, the LIS team, and hospital IT.",
            preferred: true,
            feedback:
              "A named lead and scheduled updates give every area the same priorities, identity method, and recovery plan.",
          },
          {
            id: "section-led-response",
            label:
              "Each laboratory section manages its own workload and calls hospital IT when it needs an update.",
            preferred: false,
            feedback:
              "Section leaders understand their benches, but separate plans can change priorities and recovery steps without a shared decision.",
          },
        ],
      },
    ],
  },
  {
    id: "operate",
    title: "Operate",
    time: "07:00–18:20",
    situation:
      "Testing continues from paper orders. Critical results must reach clinical teams while the electronic chart remains unavailable.",
    decisions: [
      {
        id: "critical-results",
        prompt: "How will phoned critical results be documented?",
        choices: [
          {
            id: "controlled-call-log",
            label:
              "The laboratory uses one numbered call log with patient identity, result, caller, recipient, time, and read-back confirmation.",
            preferred: true,
            feedback:
              "The numbered log lets the recovery team compare the paper result, the call, and the restored chart entry.",
          },
          {
            id: "unit-call-methods",
            label:
              "Each clinical unit records phoned results in its usual local notes and confirms any questions with the laboratory later.",
            preferred: false,
            feedback:
              "The call may support immediate care, but the recovery team has no complete laboratory call log to compare with the chart.",
          },
        ],
      },
      {
        id: "paper-orders",
        prompt: "How will the laboratory control paper orders and accessions?",
        choices: [
          {
            id: "central-accession-log",
            label:
              "Accessioning records every paper order in sequence, labels the specimen from that record, and notes repeats on the original entry.",
            preferred: true,
            feedback:
              "One accession record connects the requisition, specimen, repeat testing, and later electronic entry.",
          },
          {
            id: "bench-accession-lists",
            label:
              "Each bench keeps its own order list and sends completed pages to accessioning at the end of the shift.",
            preferred: false,
            feedback:
              "Bench lists preserve local work, but they make it harder to recognize a repeat or duplicate order while the patient is still waiting.",
          },
        ],
      },
    ],
  },
  {
    id: "recover",
    title: "Recover",
    time: "18:20 onward",
    situation:
      "Connectivity returns while paper testing is still active. Restored electronic orders overlap with downtime work.",
    decisions: [
      {
        id: "recovery-transition",
        prompt: "How should electronic work resume?",
        choices: [
          {
            id: "freeze-and-stage",
            label:
              "Freeze new transitions, assign reconciliation work, restore in stages, and release each area only after its active paper records are accounted for.",
            preferred: true,
            feedback:
              "A brief controlled pause prevents staff from entering, recollecting, and reporting the same work through two workflows at once.",
          },
          {
            id: "immediate-back-entry",
            label:
              "Begin entering completed paper results in collection order as soon as each electronic application becomes available.",
            preferred: false,
            feedback:
              "Collection order is orderly, but entry begins before temporary identities, restored orders, and repeat tests have been compared.",
          },
        ],
      },
      {
        id: "duplicate-orders",
        prompt:
          "What should happen when a restored order appears to duplicate a paper order already tested?",
        choices: [
          {
            id: "compare-before-recollection",
            label:
              "Compare the patient, test, specimen, and collection record; link the paper result and cancel the duplicate order before recollection.",
            preferred: true,
            feedback:
              "The comparison preserves the completed result and prevents an unnecessary second collection.",
          },
          {
            id: "recollect-pending-orders",
            label:
              "Recollect any order that still appears pending in the restored electronic worklist, then resolve duplicates after result entry.",
            preferred: false,
            feedback:
              "A pending electronic status does not prove that testing was missed during downtime. Recollection can create duplicate results and avoidable phlebotomy.",
          },
        ],
      },
    ],
  },
];

export const applyDecision = (
  state: DowntimeState,
  phase: DowntimePhaseId,
  choiceId: string,
): DowntimeState => {
  const phaseDefinition = tabletopPhases.find((item) => item.id === phase);
  const decision = phaseDefinition?.decisions.find((item) =>
    item.choices.some((choice) => choice.id === choiceId),
  );
  if (!decision) throw new Error(`Choice ${choiceId} does not belong to phase ${phase}.`);
  return { decisions: { ...state.decisions, [decision.id]: choiceId } };
};

export type PaperRecord = {
  tempId: string;
  paperAccession: string;
  patientName: string;
  birthDate: string;
  unit: string;
  test: string;
  collectionTime: string;
  backEntryTime?: string;
  result: string;
  expectedMrn: string;
  restoredOrder: string;
  chartStatus: string;
};

export type RestoredChart = {
  mrn: string;
  patientName: string;
  birthDate: string;
  unit: string;
  duplicateOf?: string;
};

export type CallLogEntry = {
  id: string;
  tempId: string;
  calledAt: string;
  recipient: string;
  readBack: boolean;
};

export type ReconciliationAction = {
  id: string;
  label: string;
};

export type ReconciliationHazard = {
  id: string;
  kind: "duplicate-order" | "missing-critical-result" | "timestamp-conflict" | "duplicate-chart";
  title: string;
  evidence: string;
  relatedIds: readonly string[];
  actions: readonly ReconciliationAction[];
  correctActionId: string;
  resolvedNote: string;
};

export type ReconciliationRecords = {
  paperRecords: readonly PaperRecord[];
  restoredCharts: readonly RestoredChart[];
  callLogEntries: readonly CallLogEntry[];
  hazards: readonly ReconciliationHazard[];
};

const baselinePaperRecords: readonly PaperRecord[] = [
  {
    tempId: "DT-201",
    paperAccession: "D26-0418-001",
    patientName: "Amina Yusuf",
    birthDate: "1958-09-22",
    unit: "Trauma ICU",
    test: "CBC",
    collectionTime: "07:32",
    result: "Hemoglobin 8.1 g/dL",
    expectedMrn: "MRN-410052",
    restoredOrder: "ORD-R-8804",
    chartStatus: "Paper result not yet entered",
  },
  {
    tempId: "DT-202",
    paperAccession: "D26-0418-002",
    patientName: "Liam Brooks",
    birthDate: "1947-01-10",
    unit: "Emergency department",
    test: "Potassium",
    collectionTime: "10:06",
    result: "6.7 mmol/L · critical high",
    expectedMrn: "MRN-410118",
    restoredOrder: "ORD-R-8812",
    chartStatus: "Phoned result absent from chart",
  },
  {
    tempId: "DT-203",
    paperAccession: "D26-0418-003",
    patientName: "Sofia Alvarez",
    birthDate: "1991-06-04",
    unit: "Operating room",
    test: "Type and screen",
    collectionTime: "09:18",
    result: "O positive · screen negative",
    expectedMrn: "MRN-410233",
    restoredOrder: "ORD-R-8816",
    chartStatus: "Paper result not yet entered",
  },
  {
    tempId: "DT-204",
    paperAccession: "D26-0418-004",
    patientName: "Noah Patel",
    birthDate: "1969-02-17",
    unit: "Cardiac ICU",
    test: "High-sensitivity troponin",
    collectionTime: "09:44",
    result: "86 ng/L",
    expectedMrn: "MRN-410307",
    restoredOrder: "ORD-R-8821",
    chartStatus: "Same restored order remains pending",
  },
  {
    tempId: "DT-205",
    paperAccession: "D26-0418-005",
    patientName: "Grace Kim",
    birthDate: "1983-11-29",
    unit: "Trauma ICU",
    test: "Lactate",
    collectionTime: "11:06",
    backEntryTime: "18:48",
    result: "3.2 mmol/L",
    expectedMrn: "MRN-410364",
    restoredOrder: "ORD-R-8829",
    chartStatus: "Entry screen shows 18:48 as result time",
  },
  {
    tempId: "DT-206",
    paperAccession: "D26-0418-006",
    patientName: "Marcus Green",
    birthDate: "1976-05-13",
    unit: "Emergency department",
    test: "Creatinine",
    collectionTime: "13:27",
    result: "1.8 mg/dL",
    expectedMrn: "MRN-410419",
    restoredOrder: "ORD-R-8837",
    chartStatus: "Paper result not yet entered",
  },
];

const baselineCharts: readonly RestoredChart[] = baselinePaperRecords.map(
  ({ expectedMrn, patientName, birthDate, unit }) => ({
    mrn: expectedMrn,
    patientName,
    birthDate,
    unit,
  }),
);

const baselineHazards: readonly ReconciliationHazard[] = [
  {
    id: "duplicate-order-DT-204",
    kind: "duplicate-order",
    title: "Restored order overlaps completed paper testing",
    evidence:
      "DT-204 has a completed troponin result, while ORD-R-8821 is still pending in the restored worklist.",
    relatedIds: ["DT-204", "ORD-R-8821"],
    actions: [
      {
        id: "link-result-cancel-duplicate",
        label:
          "Link the paper result to the verified chart and cancel the duplicate restored order before recollection.",
      },
      {
        id: "recollect-restored-order",
        label: "Recollect ORD-R-8821 because its electronic status is pending.",
      },
      {
        id: "enter-both-orders",
        label: "Enter the paper result and leave the restored order active for the clinical team.",
      },
    ],
    correctActionId: "link-result-cancel-duplicate",
    resolvedNote:
      "The completed paper result is preserved and the pending duplicate order is cancelled before another collection.",
  },
  {
    id: "missing-critical-DT-202",
    kind: "missing-critical-result",
    title: "Phoned critical potassium is absent from the chart",
    evidence: "DT-202 contains potassium 6.7 mmol/L, but the restored chart has no result entry.",
    relatedIds: ["DT-202", "ORD-R-8812"],
    actions: [
      {
        id: "enter-critical-link-call",
        label:
          "Verify the patient match, enter the downtime result with its collection time, and link the call documentation.",
      },
      {
        id: "no-entry-result-called",
        label: "Do not enter the result because the clinical team already received it by phone.",
      },
      {
        id: "repeat-critical-only",
        label: "Repeat the potassium and enter only the new electronic result.",
      },
    ],
    correctActionId: "enter-critical-link-call",
    resolvedNote:
      "The critical result is added to the longitudinal chart and reconciled with the communication record.",
  },
  {
    id: "timestamp-conflict-DT-205",
    kind: "timestamp-conflict",
    title: "Collection time and back-entry time conflict",
    evidence:
      "The paper requisition records collection at 11:06; the result was entered into the restored system at 18:48.",
    relatedIds: ["DT-205"],
    actions: [
      {
        id: "preserve-collection-time",
        label: "Record 11:06 as collection time and 18:48 as the later data-entry time.",
      },
      {
        id: "use-back-entry-time",
        label: "Use 18:48 as collection time because that is the electronic entry timestamp.",
      },
      {
        id: "use-restoration-time",
        label: "Use 18:20, when connectivity returned, for every downtime result.",
      },
    ],
    correctActionId: "preserve-collection-time",
    resolvedNote:
      "The chart preserves when the specimen was collected and separately records when staff entered the result.",
  },
];

const duplicateChartHazard: ReconciliationHazard = {
  id: "duplicate-chart-MRN-410118-MRN-490118",
  kind: "duplicate-chart",
  title: "Two restored charts describe Liam Brooks",
  evidence:
    "MRN-410118 and MRN-490118 carry the same name, birth date, and emergency-department encounter after separate unit identifiers were used.",
  relatedIds: ["MRN-410118", "MRN-490118"],
  actions: [
    {
      id: "hold-and-reconcile-charts",
      label:
        "Hold result entry, verify the established MRN, and send the duplicate chart for controlled reconciliation.",
    },
    {
      id: "use-newest-chart",
      label: "Use the newly created chart because it was opened during recovery.",
    },
    {
      id: "split-results-between-charts",
      label: "Place the downtime result on one chart and future results on the other.",
    },
  ],
  correctActionId: "hold-and-reconcile-charts",
  resolvedNote:
    "Result entry waits until registration confirms the established chart and begins the approved duplicate-record correction process.",
};

export const buildReconciliationRecords = (state: DowntimeState): ReconciliationRecords => {
  const uncontrolledIdentifiers =
    state.decisions["temporary-identifiers"] === "unit-created-identifiers";
  const uncontrolledCalls = state.decisions["critical-results"] === "unit-call-methods";
  const hazards = baselineHazards.map((hazard): ReconciliationHazard => {
    if (!uncontrolledCalls || hazard.id !== "missing-critical-DT-202") return { ...hazard };
    return {
      ...hazard,
      evidence:
        "DT-202 contains potassium 6.7 mmol/L and no restored result. The unit reports a phone call, but no matching laboratory call-log entry verifies the recipient, time, or read-back.",
      actions: [
        {
          id: "verify-and-escalate-call",
          label:
            "Verify patient identity, preserve the original result and collection time, and escalate the missing call record for verification with the clinical team before closing reconciliation.",
        },
        ...hazard.actions,
      ],
      correctActionId: "verify-and-escalate-call",
      resolvedNote:
        "The missing communication record has a verification and escalation plan. The exercise scores that plan; staff must complete and document verification before actual return to service.",
    };
  });
  if (uncontrolledIdentifiers) hazards.push(duplicateChartHazard);
  return {
    paperRecords: baselinePaperRecords.map((record) => ({ ...record })),
    restoredCharts: uncontrolledIdentifiers
      ? [
          ...baselineCharts.map((chart) => ({ ...chart })),
          {
            mrn: "MRN-490118",
            patientName: "Liam Brooks",
            birthDate: "1947-01-10",
            unit: "Emergency department",
            duplicateOf: "MRN-410118",
          },
        ]
      : baselineCharts.map((chart) => ({ ...chart })),
    callLogEntries: uncontrolledCalls
      ? []
      : [
          {
            id: "CL-02",
            tempId: "DT-202",
            calledAt: "10:52",
            recipient: "R. Moore, RN",
            readBack: true,
          },
        ],
    hazards,
  };
};

export type LearnerAssignments = {
  matches: Record<string, string>;
  actions: Record<string, string>;
};

export type ReconciliationScore = {
  resolved: number;
  total: number;
  hazardsMissed: string[];
  notes: string[];
};

export const scoreReconciliation = (
  records: ReconciliationRecords,
  assignments: LearnerAssignments,
): ReconciliationScore => {
  const hazardsMissed: string[] = [];
  const notes: string[] = [];
  for (const record of records.paperRecords) {
    if (assignments.matches[record.tempId] === record.expectedMrn)
      notes.push(`${record.tempId} is matched to the verified chart.`);
    else {
      hazardsMissed.push(`identity-${record.tempId}`);
      notes.push(`${record.tempId} is not matched to its verified medical record number.`);
    }
  }
  for (const hazard of records.hazards) {
    if (assignments.actions[hazard.id] === hazard.correctActionId) notes.push(hazard.resolvedNote);
    else {
      hazardsMissed.push(hazard.id);
      notes.push(
        reconciliationActionNotes[assignments.actions[hazard.id]] ??
          `Choose an action for ${hazard.title}.`,
      );
    }
  }
  const total = records.paperRecords.length + records.hazards.length;
  return { resolved: total - hazardsMissed.length, total, hazardsMissed, notes };
};

export const resumptionChoices: readonly DowntimeChoice[] = [
  {
    id: "verified-medical-approval",
    label:
      "Resume normal operation only after identities, orders, results, critical calls, repeats, and timestamps reconcile and Dr. Ruiz approves the controlled handoff.",
    preferred: true,
    feedback:
      "Connectivity is necessary, but a verified patient record and medical approval are the conditions for returning to normal laboratory operation.",
  },
  {
    id: "network-and-criticals-ready",
    label:
      "Resume when the network is stable and every critical result has been entered; reconcile routine results during the next shift.",
    preferred: false,
    feedback:
      "A stable connection and critical-result entry do not account for routine results, duplicate orders, temporary identities, or timestamps.",
  },
  {
    id: "sections-resume-independently",
    label:
      "Allow each section to resume when its electronic worklist looks current and retain paper records for later audit.",
    preferred: false,
    feedback:
      "An apparently current worklist can still contain unmatched patients and duplicate orders. A shared reconciliation checkpoint is required.",
  },
];

export const caseOverview: Omit<LessonDefinition, "manifest"> = {
  artifactTitle: "Trauma-center downtime board",
  evidence: [
    {
      label: "Network",
      value: "Unavailable",
      tone: "critical",
    },
    {
      label: "Estimate",
      value: "12 hours",
      tone: "warning",
    },
    {
      label: "Active trauma patients",
      value: "17",
      tone: "neutral",
    },
    {
      label: "Pending critical tests",
      value: "9",
      tone: "critical",
    },
  ],
  trace: [
    {
      system: "Registration",
      role: "ED registrar",
      sees: "Identifiers do not flow.",
      implication: "Temporary identity control is essential.",
    },
    {
      system: "Laboratory",
      role: "Technologist",
      sees: "Orders and results are manual.",
      implication: "Priority and accession rules must be explicit.",
    },
    {
      system: "Clinical units",
      role: "Care teams",
      sees: "Phones carry results.",
      implication: "Read-back and documentation matter.",
    },
    {
      system: "Recovery",
      role: "IT + LIS",
      sees: "Records overlap after restoration.",
      implication: "Reconciliation is a high-risk phase.",
    },
  ],
  decisionPrompt: "What should the laboratory do in the first hour?",
  decisionChoices: [
    {
      id: "correct",
      label:
        "Declare downtime and activate coordinated procedures with controlled temporary identifiers and a defined command structure.",
      correct: true,
      feedback:
        "A declared, coordinated response gives registration, the laboratory, clinical units, and IT one identity method, communication plan, priority scheme, and incident lead while systems are unavailable.",
    },
    {
      id: "narrow",
      label:
        "Hold all non-STAT testing until the network returns and run STAT work on paper in the meantime.",
      feedback:
        "Restricting work may reduce volume, but STAT testing still needs controlled registration, temporary identifiers, result communication, and one coordinated incident plan.",
    },
    {
      id: "unsafe",
      label:
        "Have each unit start its own downtime forms now and consolidate the paperwork after restoration.",
      feedback:
        "Separate local methods create incompatible identifiers and call records. Those differences become patient-matching and result-reconciliation hazards after restoration.",
    },
  ],
  repairPrompt: "Which recovery plan should medical leadership approve?",
  repairChoices: [
    {
      id: "validated",
      label:
        "Freeze transitions, restore in stages, and reconcile temporary identities, orders, results, critical calls, and repeats before normal operation.",
      correct: true,
      feedback:
        "This plan controls the high-risk transition back to electronic work and accounts for each temporary record. It requires added staffing, an operational pause, and medical review before normal workflows resume.",
    },
    {
      id: "narrow",
      label:
        "Begin back-entering all paper results, including documented critical calls, immediately and in collection order.",
      feedback:
        "This captures all result categories and preserves documented critical calls, but entry before identity reconciliation can place a correct result on the wrong chart or create duplicate work.",
    },
    {
      id: "unsafe",
      label:
        "Back-enter only the results that were phoned as critical and retain the rest on paper for the record.",
      feedback:
        "This preserves the most urgent communicated results, but it leaves routine and abnormal results outside the longitudinal chart and does not resolve temporary identities or duplicate orders.",
    },
  ],
  validationCases: [
    {
      name: "Controlled transition",
      note: "New electronic work pauses while active paper records are identified and assigned for reconciliation.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "Immediate back-entry starts before staff know which temporary records belong to which restored charts.",
        unsafe:
          "Entering only critical results still begins without a controlled transition or assigned reconciliation work.",
      },
    },
    {
      name: "Temporary identities",
      note: "Every temporary identifier maps to one verified medical record number before result entry.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "Collection order does not establish which restored chart belongs to each temporary identifier.",
        unsafe:
          "The critical-only plan does not reconcile temporary identifiers before placing results in the chart.",
      },
    },
    {
      name: "Critical-result documentation",
      note: "Phoned critical results, read-backs, and restored chart entries agree.",
      passingRepairs: ["validated", "narrow", "unsafe"],
      failNotes: {},
    },
    {
      name: "Duplicate and repeat review",
      note: "Duplicate orders and tests repeated during downtime are resolved before recollection or billing.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "Back-entry in collection order does not compare restored orders with paper orders and repeat tests.",
        unsafe:
          "A critical-only entry process leaves duplicate routine orders and repeat testing unreconciled.",
      },
    },
    {
      name: "Complete result inclusion",
      note: "Routine, abnormal, and critical downtime results are represented in the longitudinal chart.",
      passingRepairs: ["validated", "narrow"],
      failNotes: {
        unsafe:
          "Retaining noncritical results only on paper leaves part of the downtime episode absent from the electronic chart.",
      },
    },
  ],
};

export const lessonCopy = {
  text01:
    "Match every temporary identifier to a restored chart. Then choose how to resolve the duplicate order, missing critical result, timestamp conflict, and any duplicate chart created by your tabletop path.",
  text02:
    "The unit reports that the potassium was phoned, but the laboratory call log contains no entry for DT-202.",
};

export const reconciliationActionNotes: Record<string, string> = {
  "recollect-restored-order":
    "Recollection repeats testing that is already complete. Reconcile the pending order with the verified paper result before requesting another specimen.",
  "enter-both-orders":
    "Leaving the duplicate active can trigger recollection and duplicate billing. Preserve the completed result and resolve the redundant order.",
  "no-entry-result-called":
    "A phone call does not add the result to the longitudinal chart. Enter the verified downtime result and link the communication record.",
  "repeat-critical-only":
    "A later potassium does not replace the earlier critical episode. Preserve both collection times and document the earlier result and call.",
  "use-back-entry-time":
    "Back-entry time describes documentation, not collection. Substituting it changes the clinical sequence and turnaround calculation.",
  "use-restoration-time":
    "A single restoration time erases individual specimen collection times. Preserve the paper collection time and separately record entry time.",
  "use-newest-chart":
    "The newest chart may be the duplicate. Confirm the established medical record number through registration before entering results.",
  "split-results-between-charts":
    "Splitting results fragments the patient history and can conceal a critical episode. Use controlled identity reconciliation.",
};
