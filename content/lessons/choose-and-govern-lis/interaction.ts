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
      "Script C-2: the corrected result arrived in the chart as a second final report. The original final report was still displayed, with no link to the correction. Vendor says a patch next quarter will fix this.",
    answer: "fail",
    note: "The version Alder showed failed the test. The patch it promises has not been tested, so it cannot count yet.",
  },
  {
    id: "A-restore",
    vendor: "alder",
    requirement: "Recovery exercise",
    record:
      "Exercise R-1: back in service after 3 hours; the last 10 minutes of work had to be rechecked. Laboratory staff watched the open orders being reconciled.",
    answer: "pass",
    note: "Three hours and ten minutes of work to recheck are inside this case's limits of 4 hours and 15 minutes.",
  },
  {
    id: "A-export",
    vendor: "alder",
    requirement: "Record export and retrieval",
    record:
      "Proposal says a complete data export is available. No sample export, field list or demonstration of pulling up old reports was provided.",
    answer: "unknown",
    note: "Alder says it can export everything, but nobody has seen an export. Ask for a sample and try pulling up reports from it.",
  },
  {
    id: "B-correction",
    vendor: "birch",
    requirement: "Corrected reports",
    record:
      "Script C-2: current report marked Corrected; earlier version kept; the correction reached the chart; a task to notify the clinician was created and checked.",
    answer: "pass",
    note: "The correction worked in the version shown. It still has to be tested on the laboratory's own system after installation.",
  },
  {
    id: "B-restore",
    vendor: "birch",
    requirement: "Recovery exercise",
    record:
      "Exercise R-1: back in service after 3.5 hours; the last 12 minutes of work had to be rechecked. Laboratory staff reconciled open orders and reports.",
    answer: "pass",
    note: "Inside both limits, though with less to spare than Alder. Repeat the exercise once the system is installed.",
  },
  {
    id: "B-export",
    vendor: "birch",
    requirement: "Record export and retrieval",
    record:
      "Sample export included patient and accession numbers, every report version, timestamps and a field list. Ten chosen reports were pulled up from it and matched the originals.",
    answer: "pass",
    note: "The sample export worked. The contract should still say how the full export will be done, checked and paid for.",
  },
  {
    id: "C-correction",
    vendor: "cedar",
    requirement: "Corrected reports",
    record:
      "The demonstration stopped before the correction reached the chart. The vendor has booked another session.",
    answer: "unknown",
    note: "The test stopped partway, so nobody knows yet. It is not a failure until the vendor runs the whole test.",
  },
  {
    id: "C-restore",
    vendor: "cedar",
    requirement: "Recovery exercise",
    record:
      "Exercise R-1: back in service after 2 hours; the last 8 minutes of work had to be rechecked. Laboratory staff watched the open orders being reconciled.",
    answer: "pass",
    note: "Two hours and eight minutes of work to recheck are inside both limits.",
  },
  {
    id: "C-export",
    vendor: "cedar",
    requirement: "Record export and retrieval",
    record:
      "Sample export held only the latest text of each report. Earlier versions and accession numbers were missing, and the contract excludes a structured export.",
    answer: "fail",
    note: "Without earlier versions and accession numbers, the laboratory could not rebuild its record of what was reported. A fast recovery does not make up for that.",
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
    title: "Purchasing summary",
    record:
      "LIS replacement · first round of demonstrations\nPanel ratings (1 low, 5 high)\n                Usability  Analytics  Training\nAlder               5          5          4\nBirch               3          3          4\nCedar               4          4          3\nStarting weights: 50 / 30 / 20\nVendors rated: these three only",
    note: "These ratings record what the panel liked after the demonstrations. They do not show whether any vendor met the requirements.",
  },
  {
    title: "Agreed requirements",
    record:
      "Must be shown before a vendor is recommended:\nC-2: corrected report becomes current in the EHR; earlier version kept\nR-1: recovery time objective (RTO) 4 hours; recovery point objective (RPO) no more than 15 minutes of work to recheck\nE-1: export of identifiers, reports and every version, usable for pulling up old reports\nNice to have: usability, analytics, training\nClinical approval: laboratory director\nPurchasing and IT review: required before any contract",
    note: "The committee set these limits before the demonstrations. A vendor that fails one cannot make it up with better ratings.",
  },
  {
    title: "Five-year cost assumptions",
    record:
      "Covers: replacing this one module at this one hospital\nCurrency: USD thousands at today's prices\nPeriod: installation plus five years of service fees\nIncludes: installation, service, interfaces, data migration, exit\nLeaves out: discounting, tax, inflation, internal staff time\nAlder interface amount: committee estimate, not a quote\nAll other amounts: from vendor proposals; nothing signed",
    note: "This puts the vendors side by side; it is not a budget. Staff time, firm interface prices and other local costs still have to be added.",
  },
];
export const lifecycleCases = [
  {
    id: "install",
    title: "Before go-live",
    record:
      "The vendor's standard demonstration went well. Nobody has yet tested the connection to the hospital's EHR or how the night shift will use the new system.",
    options: [
      ["vendor", "Go live on the strength of the vendor's demonstration"],
      ["local", "Test with local interfaces and staff before go-live"],
    ],
    answer: "local",
    notes: {
      vendor:
        "The demonstration ran on the vendor's setup. It did not test your connection to the chart, your test definitions or your staff.",
      local:
        "Run real orders, corrections, user accounts, a busy shift and a downtime drill on the installed system, and train each group of staff, before the director approves go-live.",
    },
  },
  {
    id: "change",
    title: "An upgrade arrives",
    record:
      "An upgrade changes how corrected results are displayed. The analyst wants to install it during tonight's maintenance window.",
    options: [
      ["install", "Install tonight; the vendor has tested the release"],
      ["control", "Check what it changes and test before installing"],
    ],
    answer: "control",
    notes: {
      install:
        "The vendor tested its own system, not your reports and interfaces. A change to how corrected results look is exactly what needs checking.",
      control:
        "Find out which reports, interfaces and screens it touches, test them, plan how to undo it, tell the staff, and have the change approved and written down.",
    },
  },
  {
    id: "outage",
    title: "Before signing the hosted-service contract",
    record:
      "The proposal lists yearly hosting fees but does not say when support is available, how much notice you get before changes, how you get your records back at the end, or who rechecks work after an outage.",
    options: [
      ["wait", "Sign the standard hosting terms as written"],
      ["reconcile", "Get support, changes and exit spelled out first"],
    ],
    answer: "reconcile",
    notes: {
      wait: "A hosting fee does not say what the vendor will do for it. Gaps like these usually come to light in the middle of an outage.",
      reconcile:
        "Write down support hours and who to call, notice and testing before changes, a usable export of reports and their versions at the end, and who rechecks work after an outage. Twelve Hours Offline shows why the last one matters.",
    },
  },
  {
    id: "retire",
    title: "Before the old system is retired",
    record:
      "The new system is live. Old corrected reports were not moved across, and the contract for the old server ends next month.",
    options: [
      ["off", "Switch off the old server; the new system is live"],
      ["retain", "Confirm old reports can be found, then switch off"],
    ],
    answer: "retain",
    notes: {
      off: "Being live on the new system says nothing about whether old reports, including corrected ones, can still be found.",
      retain:
        "Pull up a sample of old reports, including corrected ones, check who can still reach them, agree how long they are kept and who looks after them, and only then switch off.",
    },
  },
] as const;
export const selectionCopy = {
  eligibility:
    "“All three shown working” means someone saw each requirement work at a demonstration. It does not mean the contract is approved.",
  wrong:
    "Some classifications do not match the records. A failed test and an unfinished one both keep a vendor out for now, but they lead to different next steps.",
  includeCosts:
    "Add the interface, data migration and exit costs before comparing five-year totals.",
  finishLifecycle:
    "Choose what to do at go-live, for the upgrade, for the hosting contract and at retirement before recommending a vendor.",
  ready:
    "Birch can go forward to contract talks and to testing on the laboratory's own systems. The costs, who does what during installation, and the plans for upgrades and retirement still need approval.",
  defer:
    "Waiting is reasonable if you say exactly what you still need to see, who will get it and when the committee will decide. Do not let a good score hide a failed test.",
  blocked:
    "This vendor cannot go forward on what the committee has seen. It has to fix and retest what failed, or show what has not been shown yet.",
};

export const sectionPurposes = [
  "Separate what the laboratory cannot do without from what the panel simply liked.",
  "Decide what each demonstration actually showed.",
  "See how the weights and the missing costs change the comparison.",
  "Decide what the laboratory must test or keep from installation to retirement.",
];

export function evidenceLabel(row: { vendor: string; requirement: string }) {
  const vendor = vendors.find((v) => v.id === row.vendor);
  if (!vendor) throw Error("Unknown vendor: " + row.vendor);
  return vendor.name + ": " + row.requirement.toLowerCase() + " evidence";
}
