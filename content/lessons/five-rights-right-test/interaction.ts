export type CdsConfig = {
  person: string;
  information: string;
  channel: string;
  format: string;
  timing: string;
};
export const originalCds: CdsConfig = {
  person: "all",
  information: "policy",
  channel: "inbox",
  format: "soft",
  timing: "after",
};
export const reviewedCds: CdsConfig = {
  person: "ordering",
  information: "context",
  channel: "composer",
  format: "inline",
  timing: "before",
};
export type OrderCase = {
  id: string;
  label: string;
  role: "ordering" | "collecting";
  prior: "final" | "pending" | "none" | "unusable";
  hours: number;
  exception: boolean;
};
export const orderCases: OrderCase[] = [
  {
    id: "CD-01",
    label: "Usable final result 30 days ago",
    role: "ordering",
    prior: "final",
    hours: 720,
    exception: false,
  },
  {
    id: "CD-02",
    label: "Collecting nurse opens the same chart",
    role: "collecting",
    prior: "final",
    hours: 720,
    exception: false,
  },
  {
    id: "CD-03",
    label: "No previous result or pending order",
    role: "ordering",
    prior: "none",
    hours: 0,
    exception: false,
  },
  {
    id: "CD-04",
    label: "Final result 90 days and 1 hour ago",
    role: "ordering",
    prior: "final",
    hours: 2161,
    exception: false,
  },
  {
    id: "CD-05",
    label: "Recent result; clinical reason to repeat documented",
    role: "ordering",
    prior: "final",
    hours: 720,
    exception: true,
  },
  {
    id: "CD-06",
    label: "Previous result marked unusable",
    role: "ordering",
    prior: "unusable",
    hours: 720,
    exception: false,
  },
  {
    id: "CD-07",
    label: "Previous order still pending",
    role: "ordering",
    prior: "pending",
    hours: 4,
    exception: false,
  },
  {
    id: "CD-08",
    label: "Final result exactly 90 days ago",
    role: "ordering",
    prior: "final",
    hours: 2160,
    exception: false,
  },
];
export const candidate = (row: OrderCase) =>
  row.prior === "pending" || (row.prior === "final" && row.hours <= 2160);
export function cdsOutcome(config: CdsConfig, row: OrderCase) {
  const eligible = candidate(row);
  const shown = eligible && (config.person === "all" || row.role === "ordering");
  const blocked = shown && config.format === "hard";
  const appropriate = row.role === "ordering" && eligible;
  const issues = !shown
    ? []
    : [
        ...(row.role !== "ordering"
          ? ["The collecting nurse cannot revise the prescriber's order."]
          : []),
        ...(config.information !== "context"
          ? ["The policy text leaves out the earlier result or pending order this decision needs."]
          : []),
        ...(config.channel !== "composer"
          ? ["An inbox message puts the advice somewhere other than the order being placed."]
          : []),
        ...(config.timing !== "before"
          ? ["The order is already signed; acting on the advice now means going back to change it."]
          : []),
        ...(blocked
          ? [
              row.exception
                ? "The hard stop blocks a documented clinical reason to repeat."
                : "A hard stop takes away the clinician's judgment, which the approved guidance requires.",
            ]
          : []),
      ];
  return {
    ...row,
    shown,
    blocked,
    pass: shown === appropriate && issues.length === 0,
    action: !shown
      ? "No guidance shown"
      : blocked
        ? "Order blocked"
        : config.format === "soft"
          ? "Interrupting review"
          : "Inline review",
    note: issues.length
      ? issues.join(" ")
      : !shown
        ? "No order guidance is needed for this role or available history."
        : row.exception
          ? "Show the earlier information and keep the documented reason to go ahead."
          : row.prior === "pending"
            ? "Review the pending order; do not show it as a finished result."
            : "Review the dated result before deciding whether another order is needed.",
  };
}
export const cdsReplay = (config: CdsConfig) => orderCases.map((row) => cdsOutcome(config, row));
export const cdsControls = [
  {
    key: "person",
    label: "Person receiving guidance",
    options: [
      ["all", "Everyone opening the chart"],
      ["ordering", "Clinician placing the order"],
    ],
    notes: {
      all: "The collecting nurse also receives an ordering message.",
      ordering: "The person who can change the proposed order receives the guidance.",
    },
  },
  {
    key: "information",
    label: "Information displayed",
    options: [
      ["policy", "Full repeat-testing policy"],
      ["context", "Dated result or pending order and available actions"],
    ],
    notes: {
      policy:
        "A policy alone does not show whether this patient's earlier test can answer today's question.",
      context:
        "Show the source, status, time, and result when available. A pending order has no final value.",
    },
  },
  {
    key: "channel",
    label: "Delivery channel",
    options: [
      ["inbox", "EHR inbox"],
      ["composer", "EHR order composer"],
    ],
    notes: {
      inbox: "The clinician must leave the order to find the message.",
      composer: "The suggestion appears where the clinician is choosing the test.",
    },
  },
  {
    key: "format",
    label: "Intervention format",
    options: [
      ["soft", "Interrupting message with a continue option"],
      ["inline", "Inline suggestion beside the order"],
      ["hard", "Hard stop without an override"],
    ],
    notes: {
      soft: "A soft stop leaves the decision to the clinician but adds an interruption. Have a good reason before choosing it.",
      inline: "The clinician can review the information without dismissing a modal message.",
      hard: "The approved policy asks for a review; it does not allow blocking every repeat order.",
    },
  },
  {
    key: "timing",
    label: "Time in the workflow",
    options: [
      ["after", "After the order is signed"],
      ["before", "Before the order is signed"],
    ],
    notes: {
      after: "The decision has already been made, so cancelling takes extra work.",
      before: "The clinician can look at the earlier test while the order can still be changed.",
    },
  },
] as const;
export const cdsSources = [
  {
    title: "Ordering audit",
    record:
      "09:14:02  Encounter 62018 · HbA1c selected\n09:14:19  Order 80421 signed · Dr. Patel\n09:14:20  Repeat-test message sent to inbox\n09:22:10  Chart opened · collecting nurse\n09:22:11  Repeat-test message sent to inbox",
    note: "The audit shows who got the message and when. It does not show whether either person read the policy, or whether the repeat was appropriate.",
  },
  {
    title: "Prior laboratory report",
    record:
      "Patient 62018 · Accession A26090718\nCollected: 11 Aug 2026 09:14\nHbA1c: 6.8 %\nStatus: Final\nReport quality: Usable\nCurrent order time: 10 Sep 2026 09:14",
    note: "The earlier specimen was collected 30 days before the current order. Check the patient, collection time, report status and whether the result is usable before relying on it.",
  },
  {
    title: "Approved review specification",
    record:
      "Repeat-test guidance · version 2\nScope: HbA1c order review\nShow a usable final result collected within 90 days,\nor an existing pending order for the same patient/test.\nRetain the option to proceed with a clinical reason.\nDo not interrupt collection staff.\nClinical approval: laboratory director and CDS committee",
    note: "The 90-day window comes from this hospital's specification for the case. It is a prompt to look at the information already available, not a general rule for how often to test, and it does not mean every repeat is unnecessary.",
  },
];
export const responseNotes = {
  cancel:
    "The order is cancelled after review. Record the earlier order or report that was shown and the clinician's decision; a cancellation on its own does not show the decision was right.",
  continue:
    "The order is kept, with a documented clinical reason. Overriding can be good care; check the reasons and review some of the cases.",
};

export const additionalExercises = {
  title: "Compare decision support categories",
  purpose:
    "Choose what kind of support each laboratory example is, and think about whether it interrupts people's work.",
  questions: [
    {
      id: "CDS1",
      prompt: "A sepsis order set offers a coordinated group of tests.",
      answer: "order",
      choices: [
        {
          id: "order",
          label: "Order set",
        },
        {
          id: "duplicate",
          label: "Duplicate-order guidance",
        },
        {
          id: "interpret",
          label: "Interpretive comment",
        },
        {
          id: "notify",
          label: "Critical-result notification",
        },
        {
          id: "information",
          label: "Test information",
        },
        {
          id: "reflex",
          label: "Reflex protocol",
        },
      ],
      feedback:
        "An order set groups the choices together; it can guide ordering without interrupting anyone.",
    },
    {
      id: "CDS2",
      prompt: "An inline message shows the prior HbA1c beside the proposed order.",
      answer: "duplicate",
      choices: [
        {
          id: "order",
          label: "Order set",
        },
        {
          id: "duplicate",
          label: "Duplicate-order guidance",
        },
        {
          id: "interpret",
          label: "Interpretive comment",
        },
        {
          id: "notify",
          label: "Critical-result notification",
        },
        {
          id: "information",
          label: "Test information",
        },
        {
          id: "reflex",
          label: "Reflex protocol",
        },
      ],
      feedback:
        "This suggestion helps with the decision using earlier results, without interrupting, and still allows an exception.",
    },
    {
      id: "CDS3",
      prompt: "A hemoglobin electrophoresis report includes an interpretation.",
      answer: "interpret",
      choices: [
        {
          id: "order",
          label: "Order set",
        },
        {
          id: "duplicate",
          label: "Duplicate-order guidance",
        },
        {
          id: "interpret",
          label: "Interpretive comment",
        },
        {
          id: "notify",
          label: "Critical-result notification",
        },
        {
          id: "information",
          label: "Test information",
        },
        {
          id: "reflex",
          label: "Reflex protocol",
        },
      ],
      feedback:
        "A report comment helps interpret the result after testing; it is not a pop-up at ordering.",
    },
    {
      id: "CDS4",
      prompt: "A critical potassium result requires a documented call.",
      answer: "notify",
      choices: [
        {
          id: "order",
          label: "Order set",
        },
        {
          id: "duplicate",
          label: "Duplicate-order guidance",
        },
        {
          id: "interpret",
          label: "Interpretive comment",
        },
        {
          id: "notify",
          label: "Critical-result notification",
        },
        {
          id: "information",
          label: "Test information",
        },
        {
          id: "reflex",
          label: "Reflex protocol",
        },
      ],
      feedback:
        "This call interrupts work on purpose, because the result needs to reach a named person quickly.",
    },
    {
      id: "CDS5",
      prompt: "The order screen shows the required tube and collection instructions.",
      answer: "information",
      choices: [
        {
          id: "order",
          label: "Order set",
        },
        {
          id: "duplicate",
          label: "Duplicate-order guidance",
        },
        {
          id: "interpret",
          label: "Interpretive comment",
        },
        {
          id: "notify",
          label: "Critical-result notification",
        },
        {
          id: "information",
          label: "Test information",
        },
        {
          id: "reflex",
          label: "Reflex protocol",
        },
      ],
      feedback:
        "Information shown at ordering can prevent collection errors without a pop-up alert.",
    },
    {
      id: "CDS6",
      prompt: "A defined thyroid result adds the indicated follow-up assay.",
      answer: "reflex",
      choices: [
        {
          id: "order",
          label: "Order set",
        },
        {
          id: "duplicate",
          label: "Duplicate-order guidance",
        },
        {
          id: "interpret",
          label: "Interpretive comment",
        },
        {
          id: "notify",
          label: "Critical-result notification",
        },
        {
          id: "information",
          label: "Test information",
        },
        {
          id: "reflex",
          label: "Reflex protocol",
        },
      ],
      feedback:
        "A reflex rule acts on an earlier result. Its approved conditions and exceptions need testing even though nobody sees a message.",
    },
  ],
};

export const sectionPurposes = [
  "Find who received the guidance and whether it arrived before the ordering decision.",
  "Choose the recipient, timing, display and exception handling for a repeat-test review.",
  "Check the intended interruptions and the justified orders across all the encounters.",
];
