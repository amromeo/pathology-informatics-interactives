import { candidate, type OrderCase } from "../five-rights-right-test/interaction";
export type AlertConfig = { target: string; person: string; frequency: string; format: string };
export const originalAlert: AlertConfig = {
  target: "all",
  person: "all",
  frequency: "every",
  format: "soft",
};
export const reviewedAlert: AlertConfig = {
  target: "recent",
  person: "ordering",
  frequency: "once",
  format: "inline",
};
export const alertEvents: (OrderCase & { decision: string; time: string })[] = [
  {
    id: "E01",
    decision: "D101",
    time: "09:00",
    label: "Recent final result; order opened",
    role: "ordering",
    prior: "final",
    hours: 72,
    exception: false,
  },
  {
    id: "E02",
    decision: "D101",
    time: "09:01",
    label: "Same decision; order panel reopened",
    role: "ordering",
    prior: "final",
    hours: 72,
    exception: false,
  },
  {
    id: "E03",
    decision: "D101",
    time: "09:02",
    label: "Collecting nurse opens chart",
    role: "collecting",
    prior: "final",
    hours: 72,
    exception: false,
  },
  {
    id: "E04",
    decision: "D102",
    time: "09:03",
    label: "No previous test",
    role: "ordering",
    prior: "none",
    hours: 0,
    exception: false,
  },
  {
    id: "E05",
    decision: "D103",
    time: "09:04",
    label: "Prior final result 169 hours ago",
    role: "ordering",
    prior: "final",
    hours: 169,
    exception: false,
  },
  {
    id: "E06",
    decision: "D104",
    time: "09:05",
    label: "Previous result unusable",
    role: "ordering",
    prior: "unusable",
    hours: 72,
    exception: false,
  },
  {
    id: "E07",
    decision: "D105",
    time: "09:06",
    label: "Pending order",
    role: "ordering",
    prior: "pending",
    hours: 2,
    exception: false,
  },
  {
    id: "E08",
    decision: "D106",
    time: "09:07",
    label: "Recent final; documented reason to repeat",
    role: "ordering",
    prior: "final",
    hours: 72,
    exception: true,
  },
  {
    id: "E09",
    decision: "D106",
    time: "09:08",
    label: "Same decision reopened after reason entered",
    role: "ordering",
    prior: "final",
    hours: 72,
    exception: true,
  },
  {
    id: "E10",
    decision: "D107",
    time: "10:00",
    label: "New decision for D101's patient; context changed",
    role: "ordering",
    prior: "final",
    hours: 73,
    exception: true,
  },
];
export function alertReplay(config: AlertConfig) {
  const seen = new Set<string>();
  return alertEvents.map((row) => {
    const targeted =
      (config.target === "all" || candidate(row)) &&
      (config.person === "all" || row.role === "ordering");
    const suppressed = config.frequency === "once" && seen.has(row.decision);
    const shown = targeted && !suppressed;
    if (shown) seen.add(row.decision);
    const blocked = shown && config.format === "hard" && (row.exception || !candidate(row));
    return {
      ...row,
      shown,
      interrupt: shown && config.format !== "inline",
      blocked,
      action: !targeted
        ? "Outside selected target"
        : suppressed
          ? "Already shown for this decision"
          : config.format === "hard"
            ? "Hard stop"
            : config.format === "soft"
              ? "Interrupting message"
              : "Inline suggestion",
      note: blocked
        ? "A needed or unsupported-to-block order is prevented."
        : suppressed
          ? "The same order decision has already received guidance."
          : row.id === "E10" && shown
            ? "A new decision is reviewed again; suppression must not last for the whole admission."
            : shown && row.role !== "ordering"
              ? "Collection staff cannot revise the prescribing decision."
              : shown && !candidate(row)
                ? "The record does not meet the approved review criteria."
                : shown
                  ? "Context is available for review; the log cannot tell us whether a test should be cancelled."
                  : "No message is presented for this event.",
    };
  });
}
export const alertControls = [
  {
    key: "target",
    label: "Which orders receive guidance",
    options: [
      ["all", "Every HbA1c order"],
      ["recent", "Recent usable result or pending order"],
    ],
    notes: {
      all: "Orders without relevant prior information also receive messages.",
      recent:
        "The case uses a 168-hour inclusive review window and pending orders; unusable results are excluded.",
    },
  },
  {
    key: "person",
    label: "Recipient",
    options: [
      ["all", "All chart users"],
      ["ordering", "Ordering clinician"],
    ],
    notes: {
      all: "A collecting nurse receives advice about another clinician's ordering decision.",
      ordering: "Guidance reaches the person who can revise this order.",
    },
  },
  {
    key: "frequency",
    label: "Repeat presentations",
    options: [
      ["every", "Every eligible event"],
      ["once", "Once per order decision"],
    ],
    notes: {
      every: "Reopening a panel can create another interruption without new information.",
      once: "Reopening the same decision is suppressed. A new decision, including changed clinical context, is evaluated again.",
    },
  },
  {
    key: "format",
    label: "Alert format",
    options: [
      ["soft", "Soft stop"],
      ["inline", "Inline suggestion"],
      ["hard", "Hard stop"],
    ],
    notes: {
      soft: "Each displayed message interrupts work but permits the clinician to continue.",
      inline: "The suggestion remains available without a mandatory interruption.",
      hard: "This policy does not justify preventing a needed repeat or an order without a usable prior result.",
    },
  },
] as const;
export const alertSources = [
  {
    title: "Monthly message report",
    record:
      "August 2026 · HbA1c repeat-test message\nRole              Shown     Accept clicked\nAttending          2,400       120\nResident           7,200       180\nCollecting nurse   2,400       100\nTotal             12,000       400",
    note: "The displayed acceptance rate is 400 / 12,000 = 3.3%. The button acknowledges the message; it does not cancel the order. Counts are presentations, not unique patients.",
  },
  {
    title: "Linked audit review",
    record:
      "August 2026\nDistinct order decisions linked to presentations: 3,000\nButton action: acknowledge and close\nOrder cancellation: separate order-audit field\nClinical appropriateness: not captured by message report",
    note: "There were four presentations per linked decision on average. This average does not mean every decision received four. Join by decision identifier before relating messages to order changes.",
  },
  {
    title: "Pilot safety review",
    record:
      "Week 4 · Pilot ward · case SR-14\nPrior report marked usable in structured field\nReport comment questioned suitability for current use\nOrdering clinician accepted suggestion and cancelled test\nNext shift reordered after reviewing report comment\nIndicated test delayed: 1\nPatient consequence: review pending",
    note: "The structured usability field did not contain all relevant context. Investigate the data and display, assess the patient's course, and revise testing before extending the pilot. Accepting advice can be harmful when the underlying information is incomplete.",
  },
];
export const pilotWeeks = [
  { week: 1, period: "Before", pilot: 80, comparison: 60, denominator: 1000 },
  { week: 2, period: "Before", pilot: 80, comparison: 60, denominator: 1000 },
  { week: 3, period: "Pilot", pilot: 40, comparison: 50, denominator: 1000 },
  { week: 4, period: "Pilot", pilot: 40, comparison: 50, denominator: 1000 },
];
export function pilotComparison(includeComparison: boolean) {
  const rate = (group: "pilot" | "comparison", period: string) => {
    const rows = pilotWeeks.filter((row) => row.period === period);
    return (
      (rows.reduce((n, row) => n + row[group], 0) /
        rows.reduce((n, row) => n + row.denominator, 0)) *
      1000
    );
  };
  const change = rate("pilot", "Pilot") - rate("pilot", "Before");
  const comparisonChange = rate("comparison", "Pilot") - rate("comparison", "Before");
  return {
    before: rate("pilot", "Before"),
    after: rate("pilot", "Pilot"),
    change,
    comparisonChange,
    adjusted: includeComparison ? change - comparisonChange : null,
  };
}
export const measures = [
  {
    id: "process",
    label: "Order changes linked to unique decisions",
    note: "Count cancellations and retained orders with reasons. Message acknowledgement is a different event.",
  },
  {
    id: "outcome",
    label: "Clinically reviewed avoidable repeats per 1,000 decisions",
    note: "Use the same review criteria in both wards and periods. This measures test use, not patient health.",
  },
  {
    id: "burden",
    label: "Presentations and time spent, by role",
    note: "Look for repeat messages and work displaced to other staff; a lower total can hide unequal burden.",
  },
  {
    id: "harm",
    label: "Delayed indicated tests and missed testing",
    note: "Review safety events and sampled cancellations. No reported event does not establish that no harm occurred.",
  },
];
export const rolloutPlans = [
  {
    id: "expand",
    label: "Expand because test use fell",
    note: "The comparison ward also improved, and one indicated test was delayed. A before/after difference alone does not establish benefit or safety.",
  },
  {
    id: "review",
    label: "Investigate the delay, revise the rule and display, and reassess a limited pilot",
    note: "Review SR-14 with the treating team, laboratory director, and CDS team. Correct the missing context, replay exception cases, and agree on safety review and pause criteria before restarting.",
  },
  {
    id: "acceptance",
    label: "Keep only acceptance rate as the success measure",
    note: "Acknowledgement does not establish a correct clinical action. It can rise even when needed tests are cancelled.",
  },
];
