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
    hours: 720,
    exception: false,
  },
  {
    id: "E02",
    decision: "D101",
    time: "09:01",
    label: "Same decision; order panel reopened",
    role: "ordering",
    prior: "final",
    hours: 720,
    exception: false,
  },
  {
    id: "E03",
    decision: "D101",
    time: "09:02",
    label: "Collecting nurse opens chart",
    role: "collecting",
    prior: "final",
    hours: 720,
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
    label: "Prior final result 90 days and 1 hour ago",
    role: "ordering",
    prior: "final",
    hours: 2161,
    exception: false,
  },
  {
    id: "E06",
    decision: "D104",
    time: "09:05",
    label: "Previous result unusable",
    role: "ordering",
    prior: "unusable",
    hours: 720,
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
    hours: 720,
    exception: true,
  },
  {
    id: "E09",
    decision: "D106",
    time: "09:08",
    label: "Same decision reopened after reason entered",
    role: "ordering",
    prior: "final",
    hours: 720,
    exception: true,
  },
  {
    id: "E10",
    decision: "D107",
    time: "10:00",
    label: "New decision for D101's patient; context changed",
    role: "ordering",
    prior: "final",
    hours: 721,
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
        ? "An order with a documented reason, or without evidence supporting a block, is prevented."
        : suppressed
          ? "The same order decision has already received guidance."
          : row.id === "E10" && shown
            ? "A new decision is checked again; holding back repeats must not last for the whole admission."
            : shown && row.role !== "ordering"
              ? "Collection staff cannot revise the prescribing decision."
              : shown && !candidate(row)
                ? "The record does not meet the approved review criteria."
                : shown
                  ? "The earlier information is there to review; the log cannot tell us whether a test should be cancelled."
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
        "The case uses a 90-day inclusive review window and pending orders; unusable results are excluded.",
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
      every: "Reopening a panel can interrupt again with nothing new to say.",
      once: "Reopening the same decision does not bring the message back. A new decision, including one after the patient's situation changes, is checked again.",
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
      soft: "Each message interrupts work but lets the clinician carry on.",
      inline: "The suggestion is there to read without interrupting anyone.",
      hard: "This policy does not justify preventing a needed repeat or an order without a usable prior result.",
    },
  },
] as const;
export const alertSources = [
  {
    title: "Monthly message report",
    record:
      "August 2026 · HbA1c repeat-test message\nRole              Shown     Accept clicked\nAttending          2,400       120\nResident           7,200       180\nCollecting nurse   2,400       100\nTotal             12,000       400",
    note: "The acceptance rate shown is 400 / 12,000 = 3.3%. The button closes the message; it does not cancel the order. The counts are times the message was shown, not patients.",
  },
  {
    title: "Linked audit review",
    record:
      "August 2026\nDistinct order decisions linked to presentations: 3,000\nButton action: acknowledge and close\nOrder cancellation: separate order-audit field\nClinical appropriateness: not captured by message report",
    note: "On average, each decision got four displays. That does not mean every decision got four. Join the records on the decision identifier before linking messages to order changes.",
  },
  {
    title: "Pilot safety review",
    record:
      "Week 4 · Pilot ward · case SR-14\nPrior report marked usable in structured field\nReport comment questioned suitability for current use\nOrdering clinician accepted suggestion and cancelled test\nNext shift reordered after reviewing report comment\nIndicated test delayed: 1\nPatient consequence: review pending",
    note: "The structured usability field did not contain all relevant context. Investigate the data and display, assess the patient's course, and revise testing before extending the pilot. Accepting advice can be harmful when the underlying information is incomplete.",
  },
];
export const pilotWeeks = [
  { week: 1, period: "Before", pilot: 8, comparison: 6, denominator: 100 },
  { week: 2, period: "Before", pilot: 8, comparison: 6, denominator: 100 },
  { week: 3, period: "Pilot", pilot: 4, comparison: 5, denominator: 100 },
  { week: 4, period: "Pilot", pilot: 4, comparison: 5, denominator: 100 },
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
    correct: true,
    id: "process",
    label: "Order changes linked to unique decisions",
    note: "Count cancellations, and orders kept with a reason. Clicking the message is a different event.",
  },
  {
    correct: true,
    id: "outcome",
    label: "Clinically reviewed avoidable repeats per 1,000 decisions",
    note: "Use the same review criteria in both wards and periods. This measures test use, not patient health.",
  },
  {
    correct: true,
    id: "burden",
    label: "Presentations and time spent, by role",
    note: "Look for repeat messages and work pushed onto other staff; a lower total can hide extra work for some people.",
  },
  {
    correct: true,
    id: "harm",
    label: "Delayed indicated tests and missed testing",
    note: "Review safety events and a sample of cancellations. No reported event does not mean no harm happened.",
  },
  {
    id: "dismissals",
    label: "Count every dismissal as an avoided repeat",
    note: "Dismissing is just a click on the screen; the order may still go ahead. Link the click to the clinical decision.",
    correct: false,
  },
  {
    id: "volume-only",
    label: "Use total test volume without eligible decisions",
    note: "Volume can fall when patient mix or workload changes. Use a defined denominator and assess needed testing.",
    correct: false,
  },
];
export const rolloutPlans = [
  {
    id: "expand",
    label: "Expand because test use fell",
    note: "The comparison ward also improved, and one needed test was delayed. A before-and-after difference on its own does not show benefit or safety.",
  },
  {
    id: "review",
    label: "Investigate the delay, revise the rule and display, and reassess a limited pilot",
    note: "Review SR-14 with the treating team, the laboratory director and the CDS team. Fix the missing information, replay the exception cases, and agree how safety will be reviewed and when to pause before starting again.",
  },
  {
    id: "acceptance",
    label: "Keep only acceptance rate as the success measure",
    note: "A click does not show the right clinical action was taken. Clicks can go up even when needed tests are being cancelled.",
  },
];

export const lessonCopy = {
  text01:
    "These counts apply only to these 10 audit events from 7 order decisions. They are not estimated monthly effects or clinical outcomes.",
  text02:
    "Clinically reviewed avoidable repeat orders per 1,000 eligible order decisions each week in each ward. Weeks 1–2 precede the change; weeks 3–4 follow it.",
};

export const sectionPurposes = [
  "Link each message count to an actual ordering decision before interpreting alert use.",
  "Test whether the changed rule reaches the right decisions without blocking documented exceptions.",
  "Compare rates in both services and choose benefit, burden and safety measures.",
];
