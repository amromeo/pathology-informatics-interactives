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
      "A second result in the changed range checks that the fix works for more than one exact value.",
  },
  {
    ...base,
    id: "TH-03",
    tsh: 0.26,
    expected: "Order FT4",
    purpose: "A value just below the approved lower threshold must still get its FT4 order.",
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
    purpose: "Under both the old lower threshold and the new interval, no FT4 is added here.",
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
    purpose: "Changing the lower threshold must not break the high-TSH branch.",
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
    purpose: "The approved adult reflex rule does not apply to this child's order.",
  },
  {
    ...base,
    id: "TH-12",
    tsh: 0.1,
    order: "TSH only",
    expected: "Outside this rule",
    purpose: "A TSH-only order does not allow this reflex sequence.",
  },
  {
    ...base,
    id: "TH-13",
    tsh: 0.1,
    final: false,
    expected: "Review",
    purpose: "A preliminary result, even with a number, cannot place a reflex order yet.",
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
      : "Age and order-type restriction switched off.",
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
    row.final
      ? "Final numeric TSH result available."
      : "Preliminary-result restriction switched off.",
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
    : "The rule now applies to records outside the approved ages and order type.",
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
      "The report uses this definition to print the interval. The reflex program reads separate settings.",
  },
  {
    id: "approval",
    title: "Approved adult reflex protocol",
    text: "For final numeric adult TSH-with-reflex orders: add FT4 when TSH is below 0.27 or above 4.20 mIU/L. Reuse a pending or completed FT4 on the same accession.",
    meaning:
      "The director approved these ordering criteria for this assay and these patients. Updating a reference interval does not by itself approve a change to an ordering rule.",
  },
  {
    id: "rule",
    title: "Configured reflex rule",
    text: "Revision 8: adult TSH-with-reflex; final numeric result; TSH < 0.40 or > 4.20; do not duplicate a linked FT4.",
    meaning:
      "This separate lower threshold is still 0.40. That is the value that added TH-01's FT4.",
  },
  {
    id: "order",
    title: "TH-01 order record",
    text: "TSH 0.30 mIU/L finalized at 07:18. Reflex revision 8 evaluated at 07:18. FT4 order created on TH-01 at 07:18; no earlier linked FT4.",
    meaning:
      "The order record ties the extra FT4 to one particular run of the rule. A changed report does not prove that the ordering rule changed.",
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
      "Review all expected actions, record the approved rule revision, check the accessions already affected, and monitor added and missed orders once the rule is live.",
    feedback:
      "The analyst records the build and the test results. The laboratory director approves the ordering criteria and the plan for affected cases. Monitoring looks at missed orders, duplicate orders and exceptions, not just the total number of tests.",
  },
];

export const additionalExercises = {
  title: "Choose what to measure after the change",
  purpose: "Choose a denominator that can show both unnecessary additions and missed tests.",
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
        "Review every eligible order and compare the expected follow-up with what happened. Looking only at added tests hides missed additions; looking only at released results hides holds.",
      feedbackByChoice: {
        eligible:
          "Include every adult TSH-with-reflex accession with a final numeric result in the period. For each, compare the expected action with what happened, including those with no added FT4. Count results still under review, and records outside the rule, separately.",
        added:
          "A missed FT4 addition leaves no new FT4 order to select. Start with all eligible TSH-with-reflex accessions so those missing orders remain visible.",
        released:
          "Some final results needed staff review before release. Looking only at automatic releases would leave those accessions out. Choose the group by age, order type, final result and period.",
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
        "Fewer tests on its own does not show things got better. Look at tests wrongly left out, unnecessary additions, turnaround time and a clinical review of exceptions.",
      feedbackByChoice: {
        both: "Compare expected and actual actions to find both missing FT4s and additions the protocol did not call for. Also look at duplicates, exceptions still open and reporting delays.",
        fewer:
          "A rule that never adds FT4 would give a low count while missing tests that were needed. Check each accession's expected action before reading anything into the total.",
        revenue:
          "Billing totals combine prices, volumes and other work. They do not identify which eligible accession missed an FT4 or received an unnecessary one. Review the order records against the protocol.",
      },
    },
  ],
};
