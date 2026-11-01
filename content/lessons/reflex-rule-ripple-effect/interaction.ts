export type ReflexAction =
  "Order FT4" | "Use existing FT4" | "No reflex" | "Review" | "Outside this rule";
export type ReflexConfig = {
  lower: number;
  upper: number;
  inclusive: boolean;
  preventDuplicate: boolean;
  requireFinal: boolean;
  restrictScope: boolean;
};
export const originalReflex: ReflexConfig = {
  lower: 0.4,
  upper: 4.2,
  inclusive: false,
  preventDuplicate: true,
  requireFinal: true,
  restrictScope: true,
};
export const approvedReflex: ReflexConfig = { ...originalReflex, lower: 0.27 };
export type ReflexCase = {
  id: string;
  tsh: number | null;
  age: number;
  order: "TSH with reflex" | "TSH only";
  final: boolean;
  ft4: "none" | "pending" | "complete";
  expected: ReflexAction;
  purpose: string;
};
const base = { age: 46, order: "TSH with reflex" as const, final: true, ft4: "none" as const };
export const reflexCases: readonly ReflexCase[] = [
  {
    ...base,
    id: "TH-01",
    tsh: 0.3,
    expected: "No reflex",
    purpose:
      "The displayed interval is current, but an old lower threshold creates an additional order.",
  },
  {
    ...base,
    id: "TH-02",
    tsh: 0.39,
    expected: "No reflex",
    purpose:
      "A second case in the changed interval tests that the repair is not limited to one exact value.",
  },
  {
    ...base,
    id: "TH-03",
    tsh: 0.26,
    expected: "Order FT4",
    purpose: "A value just below the approved lower threshold must retain the FT4 order.",
  },
  {
    ...base,
    id: "TH-04",
    tsh: 0.27,
    expected: "No reflex",
    purpose: "Exactly at the lower boundary, the strict less-than comparison is false.",
  },
  {
    ...base,
    id: "TH-05",
    tsh: 0.4,
    expected: "No reflex",
    purpose: "The old lower boundary and the current interval both permit no reflex here.",
  },
  {
    ...base,
    id: "TH-06",
    tsh: 4.2,
    expected: "No reflex",
    purpose: "Exactly at the upper boundary, the strict greater-than comparison is false.",
  },
  {
    ...base,
    id: "TH-07",
    tsh: 4.21,
    expected: "Order FT4",
    purpose: "The higher-TSH branch must be preserved during a change to the lower threshold.",
  },
  {
    ...base,
    id: "TH-08",
    tsh: 0.1,
    ft4: "complete",
    expected: "Use existing FT4",
    purpose:
      "The linked accession already has a completed FT4; a new order would duplicate testing.",
  },
  {
    ...base,
    id: "TH-09",
    tsh: 0.1,
    ft4: "pending",
    expected: "Use existing FT4",
    purpose: "A pending FT4 also prevents a second order for the same accession.",
  },
  {
    ...base,
    id: "TH-10",
    tsh: null,
    final: false,
    expected: "Review",
    purpose:
      "A missing or preliminary TSH must not be converted to zero or used to place an order.",
  },
  {
    ...base,
    id: "TH-11",
    tsh: 0.1,
    age: 12,
    expected: "Outside this rule",
    purpose: "The approved adult reflex rule does not apply to this pediatric order.",
  },
  {
    ...base,
    id: "TH-12",
    tsh: 0.1,
    order: "TSH only",
    expected: "Outside this rule",
    purpose: "A standalone TSH order does not authorize this reflex sequence.",
  },
  {
    ...base,
    id: "TH-13",
    tsh: 0.1,
    final: false,
    expected: "Review",
    purpose: "A numeric but preliminary result is not yet eligible to place a reflex order.",
  },
];
export function evaluateReflex(row: ReflexCase, config: ReflexConfig) {
  const trace: string[] = [];
  if (config.restrictScope && (row.age < 18 || row.order !== "TSH with reflex"))
    return {
      action: "Outside this rule" as ReflexAction,
      trace: [`Age ${row.age}; order ${row.order}. The adult reflex order criteria are not met.`],
    };
  trace.push(
    config.restrictScope
      ? "Adult TSH-with-reflex order confirmed."
      : "Age and order-type restriction bypassed.",
  );
  if (
    row.tsh === null ||
    !Number.isFinite(row.tsh) ||
    row.tsh < 0 ||
    (config.requireFinal && !row.final)
  )
    return {
      action: "Review" as ReflexAction,
      trace: [
        ...trace,
        "No eligible final numeric TSH result; review before deciding about further testing.",
      ],
    };
  trace.push(
    row.final ? "Final numeric TSH result available." : "Preliminary-result restriction bypassed.",
  );
  const triggers = config.inclusive
    ? row.tsh <= config.lower || row.tsh >= config.upper
    : row.tsh < config.lower || row.tsh > config.upper;
  trace.push(
    `${row.tsh.toFixed(2)} mIU/L compared with ${config.inclusive ? "≤" : "<"} ${config.lower.toFixed(2)} or ${config.inclusive ? "≥" : ">"} ${config.upper.toFixed(2)}: ${triggers ? "criterion met" : "criterion not met"}.`,
  );
  if (!triggers) return { action: "No reflex" as ReflexAction, trace };
  if (config.preventDuplicate && row.ft4 !== "none")
    return {
      action: "Use existing FT4" as ReflexAction,
      trace: [
        ...trace,
        `A ${row.ft4} FT4 is already linked to this accession; no second order is placed.`,
      ],
    };
  return {
    action: "Order FT4" as ReflexAction,
    trace: [
      ...trace,
      row.ft4 === "none"
        ? "No linked FT4 exists; create one FT4 order on this accession."
        : `Duplicate prevention is off despite a ${row.ft4} FT4 on this accession.`,
    ],
  };
}
export const reflexReplay = (config: ReflexConfig) =>
  reflexCases.map((row) => ({ ...row, ...evaluateReflex(row, config) }));
export const reflexControlDescriptions: Record<keyof ReflexConfig, string> = {
  lower: "Compare TSH with this lower value when deciding whether to add FT4.",
  upper: "Compare TSH with this upper value when deciding whether to add FT4.",
  inclusive: "Choose whether a result exactly equal to a limit meets the order condition.",
  preventDuplicate:
    "Check for an FT4 already linked to the accession before creating another order.",
  requireFinal: "Check whether the TSH result is final before using it for a reflex decision.",
  restrictScope: "Check the patient's age and the requested order type before applying the rule.",
};
export const reflexControlNotes = (config: ReflexConfig): Record<keyof ReflexConfig, string> => ({
  lower: `TH-01 at 0.30 mIU/L: ${evaluateReflex(reflexCases[0], config).action}. The approved lower threshold is 0.27.`,
  upper: `TH-07 at 4.21 mIU/L: ${evaluateReflex(reflexCases[6], config).action}. The approved upper threshold is 4.20.`,
  inclusive: config.inclusive
    ? "Values equal to either boundary now meet the order condition, contrary to the approved protocol."
    : "Values exactly equal to either threshold do not trigger FT4 under this protocol.",
  preventDuplicate: config.preventDuplicate
    ? "A pending or completed FT4 on this accession prevents a second order."
    : "The rule may create another FT4 even when one is already pending or complete.",
  requireFinal: config.requireFinal
    ? "A preliminary numeric TSH is reviewed before any reflex decision."
    : "A preliminary numeric result may place an order before final verification.",
  restrictScope: config.restrictScope
    ? "Pediatric and TSH-only records remain outside this adult reflex rule."
    : "The rule now applies to records outside the approved age and order scope.",
});
export function reflexSummary(config: ReflexConfig) {
  const results = reflexReplay(config);
  return {
    total: results.length,
    orders: results.filter((row) => row.action === "Order FT4").length,
    expectedOrders: results.filter((row) => row.expected === "Order FT4").length,
    extraOrders: results.filter((row) => row.action === "Order FT4" && row.expected !== "Order FT4")
      .length,
    missedOrders: results.filter(
      (row) => row.expected === "Order FT4" && row.action !== "Order FT4",
    ).length,
    correct: results.filter((row) => row.expected === row.action).length,
  };
}
export const dependencyRecords = [
  {
    id: "display",
    title: "TSH display definition",
    text: "Adult reference interval 0.27–4.20 mIU/L, effective Monday 06:00. TH-01 displays 0.30 mIU/L without an interval flag.",
    meaning:
      "The report uses this definition to display the interval. The reflex process reads a separate configuration.",
  },
  {
    id: "approval",
    title: "Approved adult reflex protocol",
    text: "For final numeric adult TSH-with-reflex orders: add FT4 when TSH is below 0.27 or above 4.20 mIU/L. Reuse a pending or completed FT4 on the same accession.",
    meaning:
      "The director approved these order criteria for this assay and population. Updating a reference interval alone does not authorize changing a clinical order rule.",
  },
  {
    id: "rule",
    title: "Configured reflex rule",
    text: "Revision 8: adult TSH-with-reflex; final numeric result; TSH < 0.40 or > 4.20; do not duplicate a linked FT4.",
    meaning:
      "The separate lower threshold still contains 0.40. This is the value used for TH-01's downstream order.",
  },
  {
    id: "order",
    title: "TH-01 order record",
    text: "TSH 0.30 mIU/L finalized at 07:18. Reflex revision 8 evaluated at 07:18. FT4 order created on TH-01 at 07:18; no earlier linked FT4.",
    meaning:
      "The order record connects an additional FT4 to a particular rule evaluation. A changed display does not prove that the order rule changed.",
  },
];
export const reflexApprovalChoices = [
  {
    id: "display",
    label: "Approve because the TSH interval displays correctly on the report.",
    feedback:
      "The report definition already displays the approved interval for TH-01. Revision 8 still orders from a lower threshold of 0.40. Test the ordering conditions, age and order type, result status and existing FT4 orders.",
  },
  {
    id: "count",
    label: "Approve once the number of FT4 orders decreases.",
    feedback:
      "Widening the thresholds enough would reduce the count by missing FT4s needed at TH-03 and TH-07. Compare every expected action, including those retained orders and the exact boundaries.",
  },
  {
    id: "complete",
    label:
      "Review all expected actions, document the approved rule revision, assess affected accessions, and monitor added and missed orders after release.",
    feedback:
      "The analyst documents the build and test results. Laboratory leadership approves clinical criteria and recovery of affected cases. Monitoring includes missed indicated orders, duplicate orders, and exceptions as well as total volume.",
  },
];

export const additionalExercises = {
  title: "Choose a quality indicator after the change",
  purpose: "Define a denominator that can detect unnecessary additions and missed indicated tests.",
  questions: [
    {
      id: "QI1",
      prompt:
        "To check for both missed and unnecessary FT4 additions, which accessions should the team review during a defined period?",
      answer: "eligible",
      choices: [
        {
          id: "eligible",
          label: "Every eligible adult reflex accession in the period",
        },
        {
          id: "added",
          label: "Only eligible accessions with a new FT4 order",
        },
        {
          id: "released",
          label: "Only accessions whose TSH was released automatically",
        },
      ],
      feedback:
        "Review all eligible orders and compare expected with observed follow-up actions. Selecting only added tests hides missed additions; selecting only released orders hides holds.",
      feedbackByChoice: {
        eligible:
          "Include all adult TSH-with-reflex accessions with final numeric results in the defined period. Compare the expected action with what happened for each, including those without an added FT4. Account separately for unresolved results and records outside scope.",
        added:
          "A missed FT4 addition leaves no new FT4 order to select. Start with all eligible TSH-with-reflex accessions so those missing orders remain visible.",
        released:
          "A final result may have required staff review before release. Selecting only automatic releases would omit those eligible accessions. Define the review group from age, order type, final result and period.",
      },
    },
    {
      id: "QI2",
      prompt: "What should the team monitor as well as the number of follow-up assays?",
      answer: "both",
      choices: [
        {
          id: "both",
          label: "Missed indicated tests and unnecessary additions",
        },
        {
          id: "fewer",
          label: "Only whether fewer assays were performed",
        },
        {
          id: "revenue",
          label: "Only the change in billing totals",
        },
      ],
      feedback:
        "Fewer tests is not sufficient evidence of improvement. Include erroneous omissions, unnecessary additions, turnaround time and clinical review of exceptions.",
      feedbackByChoice: {
        both: "Compare expected and actual actions to find both missing FT4s and additions that the protocol did not call for. Also inspect duplicates, unresolved exceptions and reporting delays.",
        fewer:
          "A rule that never adds FT4 would produce a low count while missing indicated tests. Check each accession's expected action before interpreting the total.",
        revenue:
          "Billing totals combine prices, volumes and other work. They do not identify which eligible accession missed an FT4 or received an unnecessary one. Review the order records against the protocol.",
      },
    },
  ],
};
