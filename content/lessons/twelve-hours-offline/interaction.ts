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
      "Registration messages and electronic orders stop. The emergency department and laboratory need to use the same paper records and patient identifiers.",
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
              "Two units can assign different identifiers to the same patient. Registration will have to check the resulting charts and correct the duplicate during recovery.",
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
              "Dr. Ruiz declares downtime and names one laboratory incident lead. That person gives scheduled updates to registration, nursing, the LIS team and hospital IT.",
            preferred: true,
            feedback:
              "The incident lead tells all areas which work comes first and how to identify patients. Staff receive the same instructions about returning to electronic work.",
          },
          {
            id: "section-led-response",
            label:
              "Each laboratory section manages its own workload and calls hospital IT when it needs an update.",
            preferred: false,
            feedback:
              "One section may restart electronic work while another is still using paper. The incident lead needs to coordinate those steps and keep all sections informed.",
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
              "The clinician may receive the result, but the laboratory has no complete call log. During recovery, staff will have to ask the units who received each call.",
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
              "Staff can use the accession record to match the specimen to its requisition. It also shows repeats when results are entered into the electronic chart.",
          },
          {
            id: "bench-accession-lists",
            label:
              "Each bench keeps its own order list and sends completed pages to accessioning at the end of the shift.",
            preferred: false,
            feedback:
              "The accessioning staff cannot see another bench's orders until the pages arrive. They may assign a second accession to work already recorded elsewhere.",
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
              "Pause the switch to electronic work while staff compare the records. Restart each area after its active paper tests have been matched to patients and orders.",
            preferred: true,
            feedback:
              "A brief pause gives staff time to compare paper and electronic orders. Otherwise, one team may request a specimen for testing another team has already completed.",
          },
          {
            id: "immediate-back-entry",
            label:
              "Begin entering completed paper results in collection order as soon as each electronic application becomes available.",
            preferred: false,
            feedback:
              "Entering results in collection order does not identify the right chart. Staff first need to match temporary identifiers and check for orders or repeats already recorded.",
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
              "Compare the paper and electronic records for the same patient and specimen. Link the completed result and cancel the duplicate order before asking for another collection.",
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
              "The laboratory may already have tested the specimen on paper. Check that record before sending someone to draw the patient's blood again.",
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
      "The patient's chart now includes the critical result and its matching call record.",
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
        "Hold result entry until registration confirms the existing medical record number and arranges correction of the duplicate chart.",
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
    "Registration confirms which chart belongs to the patient and starts correcting the duplicate before the laboratory enters results.",
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
            "Verify the patient and keep the original result and collection time. Ask the clinical team to help verify the missing call record before closing this check.",
        },
        ...hazard.actions,
      ],
      correctActionId: "verify-and-escalate-call",
      resolvedNote:
        "The clinical team must help check who received the call and whether read-back occurred. Staff need to finish and record that check before closing reconciliation.",
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
      "Resume after staff finish checking the paper records against the chart and Dr. Ruiz approves restarting. Include patient matches, orders and results, calls, repeats and timestamps.",
    preferred: true,
    feedback:
      "Dr. Ruiz needs the completed patient matches and record checks before approving routine work. A working network alone cannot tell her whether the charts are complete.",
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
      "A current-looking worklist can still have duplicate orders or results waiting for a patient match. The sections need to compare their paper and electronic records together.",
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
      sees: "Registration cannot send patient identifiers electronically.",
      implication:
        "Use one assignment index so each specimen can later be matched to its patient's chart.",
    },
    {
      system: "Laboratory",
      role: "Technologist",
      sees: "Staff record orders and results on paper.",
      implication: "Staff need to know which tests come first and where to record each accession.",
    },
    {
      system: "Clinical units",
      role: "Care teams",
      sees: "Staff receive results by telephone.",
      implication: "Record who received each critical result and the recipient's read-back.",
    },
    {
      system: "Recovery",
      role: "IT + LIS",
      sees: "Electronic orders return for tests that may already have been completed on paper.",
      implication: "Compare both records before entering results or requesting another specimen.",
    },
  ],
  decisionPrompt: "What should the laboratory do in the first hour?",
  decisionChoices: [
    {
      id: "correct",
      label:
        "Declare downtime, name the laboratory incident lead and use one method for assigning temporary patient identifiers.",
      correct: true,
      feedback:
        "Registration and laboratory staff use the same patient identifiers. The incident lead coordinates which tests come first and how the laboratory communicates results during the outage.",
    },
    {
      id: "narrow",
      label:
        "Hold all non-STAT testing until the network returns and run STAT work on paper in the meantime.",
      feedback:
        "Even urgent testing needs a patient identifier that can be matched later. Staff also need to know how to record the order and call the result.",
    },
    {
      id: "unsafe",
      label:
        "Have each unit start its own downtime forms now and consolidate the paperwork after restoration.",
      feedback:
        "Different unit forms can give the same patient several identifiers and leave calls off the laboratory log. Staff will have to resolve those differences when the chart returns.",
    },
  ],
  repairPrompt: "Which recovery plan should Dr. Ruiz approve?",
  repairChoices: [
    {
      id: "validated",
      label:
        "Return to electronic work in stages after matching paper records to patients and orders. Check results, calls and repeats before each section resumes routine work.",
      correct: true,
      feedback:
        "Staff pause the switch while they match the paper work to the electronic records. The laboratory needs people assigned to these checks and Dr. Ruiz's approval before restarting.",
    },
    {
      id: "narrow",
      label:
        "Begin back-entering all paper results, including documented critical calls, immediately and in collection order.",
      feedback:
        "Entering every result preserves more of the day's testing, but the patient matches come first. Otherwise, staff can put a correct result in the wrong chart.",
    },
    {
      id: "unsafe",
      label:
        "Back-enter only the results that were phoned as critical and retain the rest on paper for the record.",
      feedback:
        "Routine and other abnormal results would still be missing from the chart. Patient matches and duplicate orders also need checking before staff resume normal work.",
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
          "The order in which specimens were collected does not tell staff which chart belongs to each temporary identifier.",
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
    "The clinician heard the result, but it is still missing from the chart. Enter the verified paper result and link the call record.",
  "repeat-critical-only":
    "A later potassium does not replace the earlier critical episode. Preserve both collection times and document the earlier result and call.",
  "use-back-entry-time":
    "The specimen was collected earlier than the result was entered. Using the entry time would move it to the wrong point in the patient's history and change the turnaround calculation.",
  "use-restoration-time":
    "A single restoration time erases individual specimen collection times. Preserve the paper collection time and separately record entry time.",
  "use-newest-chart":
    "The newest chart may be the duplicate. Confirm the established medical record number through registration before entering results.",
  "split-results-between-charts":
    "A clinician opening one chart could miss results stored in the other. Registration must confirm the correct chart and arrange correction of the duplicate.",
};
