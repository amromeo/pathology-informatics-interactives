export type EvidenceState = "pass" | "fail" | "unknown";
export const vendors = [
  {
    id: "alder",
    name: "Alder",
    usability: 5,
    analytics: 5,
    training: 4,
    upfront: 180,
    annual: 80,
    interfaces: 60,
    migration: 35,
    exit: 20,
  },
  {
    id: "birch",
    name: "Birch",
    usability: 3,
    analytics: 3,
    training: 4,
    upfront: 240,
    annual: 65,
    interfaces: 45,
    migration: 60,
    exit: 25,
  },
  {
    id: "cedar",
    name: "Cedar",
    usability: 4,
    analytics: 4,
    training: 3,
    upfront: 160,
    annual: 70,
    interfaces: 75,
    migration: 45,
    exit: 90,
  },
] as const;
export const evidenceRows: {
  id: string;
  vendor: string;
  requirement: string;
  record: string;
  answer: EvidenceState;
  note: string;
}[] = [
  {
    id: "A-correction",
    vendor: "alder",
    requirement: "Corrected reports",
    record:
      "Script C-2: changed result delivered as a second final report. Prior final still displayed without a correction link. Vendor proposes a future patch.",
    answer: "fail",
    note: "The current tested version failed. A promised patch is not a passing retest.",
  },
  {
    id: "A-restore",
    vendor: "alder",
    requirement: "Recovery exercise",
    record:
      "Exercise R-1: restored access in 3 hours; 10 minutes of data required reconciliation. Laboratory observed reconciliation of the open-order list.",
    answer: "pass",
    note: "The observed exercise meets this case's 4-hour recovery and 15-minute data-loss limits.",
  },
  {
    id: "A-export",
    vendor: "alder",
    requirement: "Record export and retrieval",
    record:
      "Proposal: complete data export available. No sample export, field dictionary, or retrieval demonstration supplied.",
    answer: "unknown",
    note: "A statement of capability is not evidence that reports, versions, and identifiers remain usable.",
  },
  {
    id: "B-correction",
    vendor: "birch",
    requirement: "Corrected reports",
    record:
      "Script C-2: current report marked Corrected; old version retained; correction reached the EHR; notification task created and checked.",
    answer: "pass",
    note: "The defined workflow was demonstrated in the tested version; local acceptance testing is still needed.",
  },
  {
    id: "B-restore",
    vendor: "birch",
    requirement: "Recovery exercise",
    record:
      "Exercise R-1: restored access in 3.5 hours; 12 minutes required reconciliation. Laboratory reconciled open orders and reports.",
    answer: "pass",
    note: "This meets the agreed case thresholds, with a smaller margin than Alder. Test the installed environment too.",
  },
  {
    id: "B-export",
    vendor: "birch",
    requirement: "Record export and retrieval",
    record:
      "Sample export included patient/accession keys, report versions, timestamps, and a field dictionary. Ten selected reports were retrieved and compared successfully.",
    answer: "pass",
    note: "The sample supports this requirement. Define full-scale export, verification, cost, and termination obligations in the contract.",
  },
  {
    id: "C-correction",
    vendor: "cedar",
    requirement: "Corrected reports",
    record:
      "Demonstration stopped before the correction reached the EHR. Vendor has scheduled another session.",
    answer: "unknown",
    note: "An incomplete demonstration is unverified, not proof of failure or success.",
  },
  {
    id: "C-restore",
    vendor: "cedar",
    requirement: "Recovery exercise",
    record:
      "Exercise R-1: restored access in 2 hours; 8 minutes required reconciliation. Open-order reconciliation observed.",
    answer: "pass",
    note: "The demonstrated exercise meets the case's thresholds.",
  },
  {
    id: "C-export",
    vendor: "cedar",
    requirement: "Record export and retrieval",
    record:
      "Sample export contained only each report's latest text. Prior versions and accession keys were absent; contract excludes structured export.",
    answer: "fail",
    note: "The provided export fails the institution's record-access requirement. Fast recovery does not compensate for missing record history.",
  },
];
export type Weights = { usability: number; analytics: number; training: number };
export const initialWeights: Weights = { usability: 50, analytics: 30, training: 20 };
export function vendorSummary(
  id: string,
  weights: Weights,
  answers: Record<string, string>,
  includeExtras: boolean,
) {
  const vendor = vendors.find((v) => v.id === id)!;
  const totalWeight = weights.usability + weights.analytics + weights.training;
  const score =
    totalWeight === 0
      ? null
      : (vendor.usability * weights.usability +
          vendor.analytics * weights.analytics +
          vendor.training * weights.training) /
        totalWeight;
  const rows = evidenceRows.filter((row) => row.vendor === id);
  const accurate = rows.every((row) => answers[row.id] === row.answer);
  const eligible = rows.every((row) => answers[row.id] === "pass" && row.answer === "pass");
  const base = vendor.upfront + 5 * vendor.annual;
  return {
    ...vendor,
    score,
    accurate,
    eligible,
    cost: base + (includeExtras ? vendor.interfaces + vendor.migration + vendor.exit : 0),
    base,
  };
}
export const selectionSources = [
  {
    title: "Initial procurement summary",
    record:
      "LIS replacement · first demonstration round\nPreference ratings (1 low, 5 high)\n                Usability  Analytics  Training\nAlder               5          5          4\nBirch               3          3          4\nCedar               4          4          3\nInitial weights: 50 / 30 / 20\nEvaluation population: these three vendors",
    note: "The ratings describe the panel's preferences after demonstrations. They do not establish compliance with mandatory requirements.",
  },
  {
    title: "Approved requirements",
    record:
      "Mandatory before selection recommendation:\nC-2: corrected report current in EHR; prior version retained\nR-1: recovery time objective (RTO): 4 hours; recovery point objective (RPO): at most 15 minutes of data to recover and reconcile\nE-1: export identifiers, reports and versions for retrieval\nPreferences: usability, analytics, training\nClinical approval: laboratory leadership\nProcurement and IT review: required before contract",
    note: "The recovery targets and evidence rules are local requirements. Mandatory failures cannot be traded away by increasing a preference score.",
  },
  {
    title: "Five-year planning assumptions",
    record:
      "Scope: this single-site module replacement\nCurrency: USD thousands, constant planning prices\nPeriod: implementation plus five annual service charges\nInclude: upfront, service, interfaces, migration, exit\nNo discounting, tax, inflation, or internal staffing included\nAlder interface amount: planning allowance, not a quote\nAll other line items: proposal amounts; not signed contracts",
    note: "This is a scoped comparison, not a complete budget. Obtain staffing estimates, binding interface responsibilities, and sensitivity analysis before approval.",
  },
];
export const lifecycleCases = [
  {
    id: "install",
    title: "Before installation is accepted",
    record:
      "The vendor's standard demonstration passed. The local EHR interface and overnight laboratory shift have not been tested.",
    options: [
      ["vendor", "Accept the standard demonstration"],
      ["local", "Run local acceptance scripts and role-based training"],
    ],
    answer: "local",
    notes: {
      vendor:
        "A demonstration does not test the installed interfaces, local dictionaries, or staff workflows.",
      local:
        "Use local specimens/orders, corrections, access roles, workload and downtime cases; document training and clinical acceptance before go-live.",
    },
  },
  {
    id: "change",
    title: "During routine operation",
    record:
      "An upgrade changes the default display of corrected results. The analyst proposes installing it during tonight's maintenance window.",
    options: [
      ["install", "Install because the vendor tested the release"],
      ["control", "Assess impact, test affected workflows, approve and document"],
    ],
    answer: "control",
    notes: {
      install:
        "Vendor testing does not establish that the local report display and interfaces remain correct.",
      control:
        "Record the change, impacted dictionaries/interfaces/reports, tests, approval, rollback plan, staff communication, and post-change checks.",
    },
  },
  {
    id: "outage",
    title: "Before signing the hosted-service contract",
    record:
      "The proposal lists annual hosting charges but leaves support hours, change notices, export at termination and downtime reconciliation responsibilities unspecified.",
    options: [
      ["wait", "Accept standard hosting terms without clarification"],
      ["reconcile", "Specify support, changes, export and reconciliation"],
    ],
    answer: "reconcile",
    notes: {
      wait: "A hosting fee does not define service obligations. Leaving support hours, changes and exit assistance unspecified creates gaps the laboratory may discover only during a disruption.",
      reconcile:
        "Document support hours and escalation, notice and testing of changes, usable export of reports and versions at termination, and who reconciles interrupted work. Connect the recovery responsibilities to the downtime process in Twelve Hours Offline.",
    },
  },
  {
    id: "retire",
    title: "Before the old system is retired",
    record:
      "The new system is live. Historical corrected reports were not migrated, and the old server contract ends next month.",
    options: [
      ["off", "Turn off the old server because the new system is live"],
      ["retain", "Verify historical retrieval and approved retention before shutdown"],
    ],
    answer: "retain",
    notes: {
      off: "Current operations do not establish that historical reports and versions remain accessible.",
      retain:
        "Test archived records and permissions, agree on retention and retrieval responsibilities, and document exit assistance before removing access.",
    },
  },
] as const;
export const selectionCopy = {
  eligibility:
    "Eligible here means the three mandatory case requirements have supporting evidence. It is not contract approval.",
  wrong:
    "Recheck the evidence classifications. Failed and unverified requirements both prevent selection now, but require different follow-up.",
  ready:
    "Birch can proceed to contract and local acceptance review on the supplied evidence. Costs, implementation responsibilities, and the lifecycle plan still need institutional approval.",
  defer:
    "Deferring selection is defensible if you name the remaining evidence or contract questions. Set an owner and due date; do not leave failed workflows hidden behind a score.",
  blocked:
    "The selected vendor cannot proceed on this evidence. Resolve and retest failed requirements or obtain missing evidence before reconsideration.",
};

export const sectionPurposes = [
  "Separate mandatory laboratory requirements from the panel’s preferences.",
  "Classify each vendor claim using the demonstrated result or missing evidence.",
  "Explore how weights and omitted charges affect the recommendation.",
  "Choose what must be tested, documented and retained throughout the system’s use.",
];

export function evidenceLabel(row: { vendor: string; requirement: string }) {
  const vendor = vendors.find((v) => v.id === row.vendor);
  if (!vendor) throw Error("Unknown vendor: " + row.vendor);
  return vendor.name + ": " + row.requirement.toLowerCase() + " evidence";
}
