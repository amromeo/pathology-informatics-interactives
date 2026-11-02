import type { LessonDefinition } from "../../../src/data/types";
export type SecurityProperty = "confidentiality" | "integrity" | "availability";

export const securityPropertyLabels: Record<SecurityProperty, string> = {
  confidentiality: "Confidentiality",
  integrity: "Integrity",
  availability: "Availability",
};

export type SecurityFinding = {
  id: string;
  title: string;
  observation: string;
  properties: readonly SecurityProperty[];
  feedback: string;
};

export const securityFindings: readonly SecurityFinding[] = [
  {
    id: "heat-vent",
    title: "Server beside an instrument heat vent",
    observation:
      "The proposed floor location has warm exhaust, no protected power, and no environmental monitoring.",
    properties: ["integrity", "availability"],
    feedback:
      "Heat or local power loss can stop result routing (availability). A sudden stop during a write can leave queued messages incomplete or damage stored files (integrity). The finding does not describe someone reading patient information.",
  },
  {
    id: "shared-login",
    title: "Shared local login with no password",
    observation:
      "Laboratory and support staff would use one unrestricted operating-system account.",
    properties: ["confidentiality", "integrity"],
    feedback:
      "Opening patient results without permission threatens confidentiality. Changing routing files threatens integrity, and a shared account cannot identify who acted. This finding describes access and changes rather than a service interruption.",
  },
  {
    id: "flat-network",
    title: "Flat instrument network",
    observation:
      "The middleware server and instrument workstations can communicate without a restricted network boundary.",
    properties: ["confidentiality", "integrity", "availability"],
    feedback:
      "A compromised device can expose data, alter files or configuration, and interrupt the middleware service.",
  },
  {
    id: "persistent-vendor",
    title: "Always-on vendor support channel",
    observation:
      "The vendor connection stays active without session-by-session approval or a laboratory review log.",
    properties: ["confidentiality", "integrity"],
    feedback:
      "A persistent session can expose patient data and permit an unapproved configuration change without a complete record of who made it.",
  },
  {
    id: "untested-backup",
    title: "Backup has never been restored",
    observation:
      "Backup jobs report success, but staff have not rebuilt the service and verified queued orders and results.",
    properties: ["integrity", "availability"],
    feedback:
      "The laboratory does not know whether the service can return or whether restored orders, results, and queues will remain complete and correct.",
  },
  {
    id: "phi-at-rest",
    title: "Protected health information stored on the server",
    observation:
      "The server stores patient identifiers, orders, results, and message queues without a documented encryption and access review.",
    properties: ["confidentiality"],
    feedback:
      "This finding concerns someone reading stored patient information without permission, a confidentiality risk. Encryption and access limits protect that information. The stated observation does not describe a change to a record or loss of service.",
  },
];

export type FindingEvaluation = {
  correct: boolean;
  missing: SecurityProperty[];
  extra: SecurityProperty[];
};

export const evaluateFinding = (
  findingId: string,
  selected: readonly SecurityProperty[],
): FindingEvaluation => {
  const finding = securityFindings.find((item) => item.id === findingId);
  if (!finding) throw new Error(`Unknown security finding: ${findingId}`);
  const missing = finding.properties.filter((property) => !selected.includes(property));
  const extra = selected.filter((property) => !finding.properties.includes(property));
  return { correct: missing.length === 0 && extra.length === 0, missing, extra };
};

export type ControlId =
  | "controlled-hosting"
  | "named-accounts"
  | "segmented-network"
  | "controlled-vendor"
  | "restore-drill"
  | "monitor-shutdown"
  | "harden-encrypt"
  | "keyboard-lock"
  | "policy-memo";

export type SecurityControl = {
  id: ControlId;
  title: string;
  description: string;
  budgetPoints: number;
  staffEffort: number;
  supports: readonly SecurityProperty[];
  value: "high" | "supporting" | "low";
};

export const portfolioLimit = { budgetPoints: 15, staffEffort: 11 } as const;

export const securityControls: readonly SecurityControl[] = [
  {
    id: "controlled-hosting",
    title: "Controlled server room and protected power",
    description:
      "Move the server away from instrument heat and traffic; provide monitored cooling and protected power.",
    budgetPoints: 4,
    staffEffort: 1,
    supports: ["availability"],
    value: "high",
  },
  {
    id: "named-accounts",
    title: "Named least-privilege accounts",
    description:
      "Give each laboratory, IT, and vendor user a named account limited to the work that person performs; review access regularly.",
    budgetPoints: 2,
    staffEffort: 2,
    supports: ["confidentiality", "integrity"],
    value: "high",
  },
  {
    id: "segmented-network",
    title: "Segmented instrument network",
    description:
      "Place the server behind a restricted network boundary and allow only the required instrument, LIS, monitoring, and support connections.",
    budgetPoints: 4,
    staffEffort: 3,
    supports: ["confidentiality", "integrity", "availability"],
    value: "high",
  },
  {
    id: "controlled-vendor",
    title: "Approved, time-limited vendor sessions",
    description:
      "Require a named request, laboratory approval, limited session window, recorded work, and prompt disconnection after support.",
    budgetPoints: 2,
    staffEffort: 2,
    supports: ["confidentiality", "integrity"],
    value: "high",
  },
  {
    id: "restore-drill",
    title: "Documented backup-restoration drill",
    description:
      "Restore the server in a test environment and verify configuration, patient data, queued orders, results, and reconnection steps.",
    budgetPoints: 3,
    staffEffort: 3,
    supports: ["integrity", "availability"],
    value: "high",
  },
  {
    id: "monitor-shutdown",
    title: "Environmental monitoring and controlled shutdown",
    description:
      "Alert staff to heat or power problems and use a rehearsed shutdown procedure before the server or its storage is damaged.",
    budgetPoints: 2,
    staffEffort: 1,
    supports: ["integrity", "availability"],
    value: "supporting",
  },
  {
    id: "harden-encrypt",
    title: "Server hardening, encryption, and endpoint protection",
    description:
      "Remove unused services, encrypt stored patient data, apply supported security updates, and monitor for malicious activity.",
    budgetPoints: 3,
    staffEffort: 3,
    supports: ["confidentiality", "integrity", "availability"],
    value: "supporting",
  },
  {
    id: "keyboard-lock",
    title: "Locking cover over the keyboard",
    description:
      "Prevent casual use of the local keyboard without changing the shared account, network access, vendor channel, or recovery process.",
    budgetPoints: 1,
    staffEffort: 1,
    supports: ["confidentiality"],
    value: "low",
  },
  {
    id: "policy-memo",
    title: "Memo instructing staff not to change settings",
    description:
      "Send a written reminder without changing accounts, technical permissions, network paths, vendor sessions, or audit records.",
    budgetPoints: 1,
    staffEffort: 2,
    supports: ["integrity"],
    value: "low",
  },
];

export type PortfolioCost = {
  budgetPoints: number;
  staffEffort: number;
};

const controlFor = (controlId: ControlId): SecurityControl => {
  const control = securityControls.find((item) => item.id === controlId);
  if (!control) throw new Error(`Unknown security control: ${controlId}`);
  return control;
};

export const portfolioCost = (controlIds: readonly ControlId[]): PortfolioCost =>
  controlIds.reduce(
    (total, controlId) => {
      const control = controlFor(controlId);
      return {
        budgetPoints: total.budgetPoints + control.budgetPoints,
        staffEffort: total.staffEffort + control.staffEffort,
      };
    },
    { budgetPoints: 0, staffEffort: 0 },
  );

export const withinBudget = (controlIds: readonly ControlId[]): boolean => {
  const cost = portfolioCost(controlIds);
  return (
    cost.budgetPoints <= portfolioLimit.budgetPoints &&
    cost.staffEffort <= portfolioLimit.staffEffort
  );
};

export type ScenarioId =
  | "thermal-power-event"
  | "shared-credential-misuse"
  | "ransomware-traversal"
  | "unapproved-vendor-change"
  | "failed-restore";
export type ScenarioStatus = "blocked" | "partial" | "unmitigated";

export type SecurityScenario = {
  id: ScenarioId;
  title: string;
  event: string;
};

export const securityScenarios: readonly SecurityScenario[] = [
  {
    id: "thermal-power-event",
    title: "Heat and local power event",
    event:
      "Instrument exhaust raises the room temperature while a local power interruption affects the proposed server location.",
  },
  {
    id: "shared-credential-misuse",
    title: "Shared-credential misuse",
    event:
      "A person at the console opens patient result queues and changes a routing setting through the unrestricted shared account.",
  },
  {
    id: "ransomware-traversal",
    title: "Ransomware crosses the instrument segment",
    event:
      "Malware on an instrument workstation attempts to reach and encrypt middleware files and message queues.",
  },
  {
    id: "unapproved-vendor-change",
    title: "Unapproved vendor change",
    event:
      "A vendor technician uses the persistent support channel to change a production routing setting without laboratory approval.",
  },
  {
    id: "failed-restore",
    title: "Backup cannot restore service",
    event:
      "The server fails and the team must rebuild middleware configuration, patient data, orders, results, and queued messages from backup.",
  },
];

const includes = (controlIds: readonly ControlId[], controlId: ControlId) =>
  controlIds.includes(controlId);

export const evaluateScenario = (
  scenarioId: ScenarioId,
  controlIds: readonly ControlId[],
): ScenarioStatus => {
  switch (scenarioId) {
    case "thermal-power-event":
      if (includes(controlIds, "controlled-hosting")) return "blocked";
      if (includes(controlIds, "monitor-shutdown")) return "partial";
      return "unmitigated";
    case "shared-credential-misuse":
      if (includes(controlIds, "named-accounts")) return "blocked";
      if (includes(controlIds, "harden-encrypt")) return "partial";
      return "unmitigated";
    case "ransomware-traversal":
      if (includes(controlIds, "segmented-network")) return "blocked";
      if (includes(controlIds, "harden-encrypt")) return "partial";
      return "unmitigated";
    case "unapproved-vendor-change":
      if (includes(controlIds, "controlled-vendor")) return "blocked";
      if (includes(controlIds, "named-accounts")) return "partial";
      return "unmitigated";
    case "failed-restore":
      return includes(controlIds, "restore-drill") ? "blocked" : "unmitigated";
  }
};

const scenarioNotes: Record<ScenarioId, Record<ScenarioStatus, string>> = {
  "thermal-power-event": {
    blocked:
      "The controlled room, cooling, and protected power keep the result-routing service outside the local heat and power event.",
    partial:
      "Monitoring warns staff and the shutdown procedure may protect the server, but result routing still stops until power and temperature recover.",
    unmitigated:
      "The server remains beside the heat vent without protected power or an orderly shutdown plan, so result routing can stop abruptly.",
  },
  "shared-credential-misuse": {
    blocked:
      "Named least-privilege accounts prevent routine users from opening unrestricted queues or changing the routing setting, and actions are attributable.",
    partial:
      "Hardening and monitoring may detect or limit the change, but an authorized shared account still lacks individual accountability.",
    unmitigated:
      "The unrestricted shared account still permits patient-data access and routing changes without identifying the person responsible.",
  },
  "ransomware-traversal": {
    blocked:
      "The restricted network boundary denies the workstation's unneeded connection to middleware files and message queues.",
    partial:
      "Endpoint protection and server hardening may detect or slow encryption, but the flat network still provides a path from the workstation.",
    unmitigated:
      "The flat instrument segment still lets a compromised workstation reach middleware files and interrupt order and result routing.",
  },
  "unapproved-vendor-change": {
    blocked:
      "The vendor cannot connect until a named, time-limited session is approved and recorded; the laboratory can review the requested production change.",
    partial:
      "A named account records who made the change, but the persistent support channel still permits work without session-specific approval.",
    unmitigated:
      "The persistent vendor channel still permits a production routing change without laboratory approval or a session record.",
  },
  "failed-restore": {
    blocked:
      "The tested restoration procedure rebuilds the service and verifies configuration, patient data, queued orders, and results before reconnection.",
    partial:
      "No selected control demonstrates that the backup can rebuild the complete middleware service.",
    unmitigated:
      "A successful backup job is not evidence of a usable restore; service and queued laboratory work may remain unavailable or incomplete.",
  },
};

export const scenarioResult = (scenarioId: ScenarioId, controlIds: readonly ControlId[]) => {
  const status = evaluateScenario(scenarioId, controlIds);
  return { status, note: scenarioNotes[scenarioId][status] };
};

export const referencePortfolio: readonly ControlId[] = [
  "controlled-hosting",
  "named-accounts",
  "harden-encrypt",
  "controlled-vendor",
  "restore-drill",
];
export const alternatePortfolio: readonly ControlId[] = [
  "monitor-shutdown",
  "named-accounts",
  "segmented-network",
  "controlled-vendor",
  "restore-drill",
];

export const additionalExercises = {
  title: "Match the finding to the obligation",
  purpose:
    "Choose the review required for each server finding before the installation is approved.",
  questions: [
    {
      id: "REG1",
      feedbackByChoice: {
        agreement:
          "A business associate agreement covers the vendor's handling of PHI. Jordan still needs named accounts and permissions to attribute a routing change to a person.",
        breach:
          "The shared account is an installation risk; this question reports no disclosure incident. Review account permissions and audit records before use.",
        special:
          "Additional protections depend on the records involved. They do not supply a named account for the person changing a routing rule.",
        accreditation:
          "An inspector may review the same account records. The immediate work here is to correct access and attribution through security safeguards.",
      },
      prompt:
        "Jordan needs to replace a shared login so changes can be attributed to a person. Which review should guide that account change?",
      answer: "security",
      choices: [
        {
          id: "security",
          label: "Security safeguards and risk analysis",
        },
        {
          id: "agreement",
          label: "Business associate agreement",
        },
        {
          id: "breach",
          label: "Breach assessment and notification",
        },
        {
          id: "special",
          label: "Additional record protections",
        },
        {
          id: "accreditation",
          label: "Accreditation and access review",
        },
      ],
      feedback:
        "Unique user identification and access and audit controls support HIPAA Security Rule safeguards. Document risks and corrective actions; a shared password cannot identify who changed a rule.",
    },
    {
      id: "REG2",
      feedbackByChoice: {
        security:
          "Technical safeguards limit the vendor's access, but the question asks which agreement covers its handling of PHI for the hospital. Review the business associate agreement too.",
        breach:
          "The proposed support access is not a reported disclosure incident. Establish the business associate agreement before the vendor handles PHI.",
        special:
          "Additional record protections may also apply. The agreement for this service provider's handling of PHI is the business associate agreement.",
        accreditation:
          "An accreditation review cannot substitute for the hospital's agreement with the vendor handling its PHI.",
      },
      prompt: "The vendor can access patient information during support. What agreement is needed?",
      answer: "agreement",
      choices: [
        {
          id: "security",
          label: "Security safeguards and risk analysis",
        },
        {
          id: "agreement",
          label: "Business associate agreement",
        },
        {
          id: "breach",
          label: "Breach assessment and notification",
        },
        {
          id: "special",
          label: "Additional record protections",
        },
        {
          id: "accreditation",
          label: "Accreditation and access review",
        },
      ],
      feedback:
        "The vendor acts as a business associate when providing this service with access to protected information. A business associate agreement addresses safeguards and responsibilities; a research data use agreement serves a different purpose.",
    },
    {
      id: "REG3",
      feedbackByChoice: {
        security:
          "Security staff investigate and contain ransomware, but possible exposure also needs the privacy office's breach assessment and notification review.",
        agreement:
          "An agreement may specify incident reporting duties. The immediate question is whether this exposure triggers breach obligations; involve the privacy office.",
        special:
          "Additional record protections may affect the investigation. Possible exposure of unencrypted PHI still requires a breach assessment now.",
        accreditation:
          "A later accreditation review cannot resolve a current possible disclosure. Escalate to the privacy office for breach assessment now.",
      },
      prompt:
        "Ransomware may have exposed unencrypted patient information. What review starts now?",
      answer: "breach",
      choices: [
        {
          id: "security",
          label: "Security safeguards and risk analysis",
        },
        {
          id: "agreement",
          label: "Business associate agreement",
        },
        {
          id: "breach",
          label: "Breach assessment and notification",
        },
        {
          id: "special",
          label: "Additional record protections",
        },
        {
          id: "accreditation",
          label: "Accreditation and access review",
        },
      ],
      feedback:
        "Involve the privacy office for a documented breach risk assessment and required notifications. Restoring service does not resolve disclosure obligations.",
    },
    {
      id: "REG4",
      feedbackByChoice: {
        security:
          "General HIPAA safeguards still apply. The source treatment program raises the additional question of Part 2 and state protections for these records.",
        agreement:
          "A vendor agreement addresses its service relationship. The source program and records determine whether additional confidentiality protections apply.",
        breach:
          "No exposure is described in this question. Review which additional protections apply before deciding how these treatment records may be accessed or disclosed.",
        accreditation:
          "An accreditation review may examine procedures, but the specific question concerns additional confidentiality requirements for the treatment-program records.",
      },
      prompt:
        "The server contains records from a substance-use treatment program. What else needs review?",
      answer: "special",
      choices: [
        {
          id: "security",
          label: "Security safeguards and risk analysis",
        },
        {
          id: "agreement",
          label: "Business associate agreement",
        },
        {
          id: "breach",
          label: "Breach assessment and notification",
        },
        {
          id: "special",
          label: "Additional record protections",
        },
        {
          id: "accreditation",
          label: "Accreditation and access review",
        },
      ],
      feedback:
        "Some records have additional protections under 42 CFR Part 2 or state law. Determine which requirements apply to the records and proposed disclosure with the privacy office.",
    },
    {
      id: "REG5",
      feedbackByChoice: {
        security:
          "The access record also supports security safeguards. Here the inspector has requested it for an accreditation visit, so prepare that review and explain who approves changes.",
        agreement:
          "A vendor agreement does not show which laboratory users can change result rules. Prepare the access-review record requested for the accreditation visit.",
        breach:
          "The visit does not describe a disclosure incident. Staff need the access approvals and periodic review record requested by the accreditation inspector.",
        special:
          "No specially protected record category is identified here. The inspector is asking for the laboratory's account permissions and review history.",
      },
      prompt:
        "An accreditation inspector asks the laboratory to show who can change result rules and how access is reviewed. Which review should staff prepare for this visit?",
      answer: "accreditation",
      choices: [
        {
          id: "security",
          label: "Security safeguards and risk analysis",
        },
        {
          id: "agreement",
          label: "Business associate agreement",
        },
        {
          id: "breach",
          label: "Breach assessment and notification",
        },
        {
          id: "special",
          label: "Additional record protections",
        },
        {
          id: "accreditation",
          label: "Accreditation and access review",
        },
      ],
      feedback:
        "Accreditation review includes information-system access and security practices. Retain approval and review evidence alongside the technical configuration.",
    },
  ],
};

export const caseOverview: Omit<LessonDefinition, "manifest"> = {
  artifactTitle: "Middleware installation review",
  evidence: [
    {
      label: "Location",
      value: "Beside heat vent",
      tone: "critical",
    },
    {
      label: "Login",
      value: "Shared / no password",
      tone: "critical",
    },
    {
      label: "Vendor access",
      value: "Always on",
      tone: "warning",
    },
    {
      label: "Data",
      value: "Orders + results + PHI",
      tone: "neutral",
    },
  ],
  trace: [
    {
      system: "Room",
      role: "Facilities",
      sees: "Heat and walkway exposure.",
      implication: "Availability is weak.",
    },
    {
      system: "Host",
      role: "Laboratory",
      sees: "Access is shared.",
      implication: "Accountability is weak.",
    },
    {
      system: "Network",
      role: "Security",
      sees: "Instrument segment is flat.",
      implication: "Compromise can spread.",
    },
    {
      system: "Vendor",
      role: "Support",
      sees: "Remote channel is persistent.",
      implication: "Access and contracts require control.",
    },
  ],
  decisionPrompt: "What is the governance finding?",
  decisionChoices: [
    {
      id: "correct",
      label:
        "Layered confidentiality, integrity, and availability risks must be addressed together.",
      correct: true,
      feedback:
        "The room, shared account, flat network, persistent vendor channel, and untested recovery threaten different parts of laboratory service. Approval requires a coordinated control plan rather than one isolated correction.",
    },
    {
      id: "narrow",
      label:
        "The only material finding is the shared login; require individual passwords and approve the installation.",
      feedback:
        "Named accounts would improve accountability, but they would not correct the heat and power exposure, flat instrument network, persistent vendor channel, or untested recovery.",
    },
    {
      id: "unsafe",
      label:
        "Server placement and network configuration are IT infrastructure decisions outside the laboratory director's review.",
      feedback:
        "Facilities and IT perform much of the technical work, but the laboratory director must review how the installation protects patient data, result integrity, and continuity of testing.",
    },
  ],
  repairPrompt: "Which installation plan should be approved?",
  repairChoices: [
    {
      id: "validated",
      label:
        "Place the server in a controlled room; use named least-privilege accounts, segmented networking, controlled vendor sessions, and tested recovery.",
      correct: true,
      feedback:
        "This plan addresses the physical, identity, network, vendor, and recovery findings together. It requires facilities work, security configuration, vendor-contract changes, staff access review, and time for a documented restore test before approval.",
    },
    {
      id: "narrow",
      label:
        "Move the server to protected data-center power and cooling but keep the shared login and always-on vendor channel.",
      feedback:
        "Protected power and cooling reduce the environmental risk, but staff actions remain unattributed, vendor access remains persistent, the network remains flat, and backup restoration has not been demonstrated.",
    },
    {
      id: "unsafe",
      label:
        "Require the vendor to request each remote session, but leave local access shared and the network flat.",
      feedback:
        "Session approval improves vendor accountability, but shared local access, network spread, environmental exposure, and untested recovery still prevent approval.",
    },
  ],
  validationCases: [
    {
      name: "Environmental resilience",
      note: "The result-routing server remains available through a local heat or power event.",
      passingRepairs: ["validated", "narrow"],
      failNotes: {
        unsafe:
          "Controlling vendor sessions does not move the server away from the heat vent or provide protected power.",
      },
    },
    {
      name: "Named laboratory access",
      note: "Each technologist uses a named account with only the access required for the job.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "The data-center move leaves the shared local login unchanged, so laboratory actions still cannot be attributed to one person.",
        unsafe:
          "Vendor approval does not replace the shared local login with named least-privilege accounts.",
      },
    },
    {
      name: "Network containment",
      note: "A compromised device cannot move freely from the instrument segment to the middleware server.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow: "Protected hosting does not segment the flat instrument network.",
        unsafe: "The proposed vendor-session change leaves the instrument network flat.",
      },
    },
    {
      name: "Vendor access",
      note: "Each support session is approved, time-limited, and logged.",
      passingRepairs: ["validated", "unsafe"],
      failNotes: {
        narrow:
          "The always-on vendor channel remains available without approval or a session-specific audit record.",
      },
    },
    {
      name: "Tested recovery",
      note: "The laboratory restores the middleware service and verifies queued orders and results from backup.",
      passingRepairs: ["validated"],
      failNotes: {
        narrow:
          "Protected power reduces one outage risk but does not show that the backup can restore the service and its queued messages.",
        unsafe:
          "Vendor-session control does not test whether the laboratory can restore middleware data after a failure.",
      },
    },
  ],
};

export const lessonCopy = {
  text01:
    "Select each area. Notice which team performs the technical work and why the laboratory still needs to review the clinical service risk.",
  text02:
    "Select controls that address different failure paths. The limits do not permit buying everything, and a low-cost administrative step may not change the technical risk.",
  text03:
    "Read each event and its result. Blocked applies to the event as described; partial mitigation leaves some harm or interruption possible. The coverage count includes partial results, so it is not a count of events prevented.",
};
