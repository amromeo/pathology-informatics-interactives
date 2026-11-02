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
      "The proposed spot gets warm exhaust from the instruments and has no protected power and no temperature monitoring.",
    properties: ["integrity", "availability"],
    feedback:
      "Heat or local power loss can stop result routing (availability). A sudden stop during a write can leave queued messages incomplete or damage stored files (integrity). The finding does not describe someone reading patient information.",
  },
  {
    id: "shared-login",
    title: "Shared local login with no password",
    observation:
      "Laboratory and support staff would all use one computer account with no restrictions.",
    properties: ["confidentiality", "integrity"],
    feedback:
      "Opening patient results without permission breaks confidentiality. Changing routing files is an integrity problem, and with a shared login nobody can tell who did it. This finding is about access and changes, not the service stopping.",
  },
  {
    id: "flat-network",
    title: "Flat instrument network",
    observation:
      "The middleware server and the instrument workstations can all reach each other, with nothing on the network in between.",
    properties: ["confidentiality", "integrity", "availability"],
    feedback:
      "One infected device could expose data, change files or settings, and stop the middleware service.",
  },
  {
    id: "persistent-vendor",
    title: "Always-on vendor support channel",
    observation:
      "The vendor's connection stays open all the time, with no approval for each session and no log the laboratory reviews.",
    properties: ["confidentiality", "integrity"],
    feedback:
      "An always-open connection can expose patient data and let someone change settings without approval and without a full record of who did it.",
  },
  {
    id: "untested-backup",
    title: "Backup has never been restored",
    observation:
      "The backup jobs report success, but nobody has rebuilt the service from a backup and checked the waiting orders and results.",
    properties: ["integrity", "availability"],
    feedback:
      "The laboratory does not know whether the service can be brought back, or whether the restored orders, results and queues would be complete and correct.",
  },
  {
    id: "phi-at-rest",
    title: "Protected health information stored on the server",
    observation:
      "The server holds patient identifiers, orders, results and message queues, and nobody has reviewed and recorded how they are encrypted or who can reach them.",
    properties: ["confidentiality"],
    feedback:
      "This finding is about someone reading stored patient information without permission, which is a confidentiality risk. Encryption and access limits protect it. The finding does not describe a record being changed or the service stopping.",
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
      "Move the server away from instrument heat and foot traffic, with monitored cooling and protected power.",
    budgetPoints: 4,
    staffEffort: 1,
    supports: ["availability"],
    value: "high",
  },
  {
    id: "named-accounts",
    title: "Named least-privilege accounts",
    description:
      "Give each laboratory, IT and vendor user a named account that can do only that person's job, and review access regularly.",
    budgetPoints: 2,
    staffEffort: 2,
    supports: ["confidentiality", "integrity"],
    value: "high",
  },
  {
    id: "segmented-network",
    title: "Segmented instrument network",
    description:
      "Put the server behind a network boundary that lets through only the instrument, LIS, monitoring and support connections it needs.",
    budgetPoints: 4,
    staffEffort: 3,
    supports: ["confidentiality", "integrity", "availability"],
    value: "high",
  },
  {
    id: "controlled-vendor",
    title: "Approved, time-limited vendor sessions",
    description:
      "Each session needs a named request, laboratory approval, a set time limit and a record of the work, and is disconnected as soon as support ends.",
    budgetPoints: 2,
    staffEffort: 2,
    supports: ["confidentiality", "integrity"],
    value: "high",
  },
  {
    id: "restore-drill",
    title: "Documented backup-restoration drill",
    description:
      "Restore the server on a test system and check its settings, patient data, waiting orders, results and the steps to reconnect it.",
    budgetPoints: 3,
    staffEffort: 3,
    supports: ["integrity", "availability"],
    value: "high",
  },
  {
    id: "monitor-shutdown",
    title: "Environmental monitoring and controlled shutdown",
    description:
      "Warn staff about heat or power problems, and shut the server down in a practiced way before it or its storage is damaged.",
    budgetPoints: 2,
    staffEffort: 1,
    supports: ["integrity", "availability"],
    value: "supporting",
  },
  {
    id: "harden-encrypt",
    title: "Server hardening, encryption, and endpoint protection",
    description:
      "Switch off services that are not needed, encrypt stored patient data, install security updates and watch for malicious software.",
    budgetPoints: 3,
    staffEffort: 3,
    supports: ["confidentiality", "integrity", "availability"],
    value: "supporting",
  },
  {
    id: "keyboard-lock",
    title: "Locking cover over the keyboard",
    description:
      "Stops casual use of the keyboard, but changes nothing about the shared login, the network, the vendor connection or recovery.",
    budgetPoints: 1,
    staffEffort: 1,
    supports: ["confidentiality"],
    value: "low",
  },
  {
    id: "policy-memo",
    title: "Memo instructing staff not to change settings",
    description:
      "Sends a written reminder, but changes nothing about accounts, permissions, the network, vendor sessions or audit records.",
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
      "Instrument exhaust heats the room just as the power fails at the proposed server location.",
  },
  {
    id: "shared-credential-misuse",
    title: "Shared-credential misuse",
    event:
      "Someone at the server uses the shared login to open patient result queues and change a routing setting.",
  },
  {
    id: "ransomware-traversal",
    title: "Ransomware crosses the instrument segment",
    event:
      "Malicious software on an instrument workstation tries to reach and encrypt the middleware files and message queues.",
  },
  {
    id: "unapproved-vendor-change",
    title: "Unapproved vendor change",
    event:
      "A vendor technician uses the always-open connection to change a live routing setting without laboratory approval.",
  },
  {
    id: "failed-restore",
    title: "Backup cannot restore service",
    event:
      "The server fails, and the team has to rebuild the middleware settings, patient data, orders, results and waiting messages from backup.",
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
      "In the controlled room, with its own cooling and protected power, result routing is not affected by the heat and power problem.",
    partial:
      "Monitoring warns staff and a planned shutdown may protect the server, but result routing still stops until power and temperature are back to normal.",
    unmitigated:
      "The server is still beside the heat vent, with no protected power and no shutdown plan, so result routing can stop without warning.",
  },
  "shared-credential-misuse": {
    blocked:
      "With named, limited accounts, ordinary users cannot open every queue or change the routing setting, and each action is tied to a person.",
    partial:
      "Hardening and monitoring may catch or limit the change, but the shared login still cannot show which person made it.",
    unmitigated:
      "The shared login still lets anyone open patient data and change routing without showing who did it.",
  },
  "ransomware-traversal": {
    blocked:
      "The network boundary blocks the workstation from reaching the middleware files and message queues, which it never needed.",
    partial:
      "Endpoint protection and hardening may catch or slow the encryption, but the open network still gives the workstation a way in.",
    unmitigated:
      "The open instrument network still lets an infected workstation reach the middleware files and stop orders and results from moving.",
  },
  "unapproved-vendor-change": {
    blocked:
      "The vendor cannot connect until a named, time-limited session is approved and recorded, so the laboratory can review the change before it goes live.",
    partial:
      "A named account records who made the change, but the always-open connection still lets work happen without approval for that session.",
    unmitigated:
      "The always-open vendor connection still allows a live routing change with no laboratory approval and no record of the session.",
  },
  "failed-restore": {
    blocked:
      "The tested restore rebuilds the service and checks its settings, patient data, waiting orders and results before it is reconnected.",
    partial: "None of your fixes shows that the backup can rebuild the whole middleware service.",
    unmitigated:
      "A backup job that reports success does not prove the backup can be restored. The service and the waiting laboratory work may stay down or come back incomplete.",
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
    "For each server question, choose the review it needs before the installation is approved.",
  questions: [
    {
      id: "REG1",
      feedbackByChoice: {
        agreement:
          "A business associate agreement covers how the vendor handles PHI. Jordan still needs named accounts and permissions to tie a routing change to a person.",
        breach:
          "The shared login is a risk in the installation plan; nothing has been disclosed yet. Review account permissions and audit records before use.",
        special:
          "Extra protections depend on which records are involved. They do not give the person changing a routing rule a named account.",
        accreditation:
          "An inspector may look at the same account records later. The job right now is to fix access so each change is tied to a person.",
      },
      prompt:
        "Jordan needs to replace a shared login so that each change can be tied to a person. Which review should guide that change?",
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
        "Individual logins, access limits and audit records are among the HIPAA Security Rule safeguards. Write down the risks and the fixes; a shared password cannot show who changed a rule.",
    },
    {
      id: "REG2",
      feedbackByChoice: {
        security:
          "Technical safeguards limit what the vendor can reach, but the question asks which agreement covers how it handles PHI for the hospital. That is the business associate agreement.",
        breach:
          "Nothing has been disclosed; this is planned support access. Put the business associate agreement in place before the vendor handles PHI.",
        special:
          "Extra protections for some records may also apply, but the agreement covering how this vendor handles PHI is the business associate agreement.",
        accreditation:
          "An accreditation review cannot take the place of the hospital's agreement with the vendor that handles its PHI.",
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
        "A vendor that can see protected information while providing a service is a business associate. The business associate agreement sets out its safeguards and duties; a research data use agreement is for something else.",
    },
    {
      id: "REG3",
      feedbackByChoice: {
        security:
          "Security staff investigate and contain the ransomware, but possible exposure of patient data also needs the privacy office to assess it as a breach and decide on notification.",
        agreement:
          "An agreement may say how incidents are reported. The question now is whether this exposure counts as a breach, so bring in the privacy office.",
        special:
          "Extra protections for some records may affect the investigation, but possible exposure of unencrypted PHI needs a breach assessment now.",
        accreditation:
          "A later accreditation visit cannot deal with a possible disclosure happening now. Bring in the privacy office for a breach assessment.",
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
        "Bring in the privacy office to assess and record whether this is a breach, and to make any required notifications. Getting the service back does not settle that.",
    },
    {
      id: "REG4",
      feedbackByChoice: {
        security:
          "The usual HIPAA safeguards still apply. Because these records came from a treatment program, Part 2 and state protections also need checking.",
        agreement:
          "A vendor agreement covers the vendor's service. Whether extra confidentiality protections apply depends on which program the records came from.",
        breach:
          "Nothing has been exposed. Check which extra protections apply before deciding who may see or share these treatment records.",
        accreditation:
          "An accreditation visit may look at procedures, but this question is about extra confidentiality rules for the treatment-program records.",
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
        "Some records have extra protection under 42 CFR Part 2 or state law. Work out with the privacy office which rules apply to these records and to any planned sharing.",
    },
    {
      id: "REG5",
      feedbackByChoice: {
        security:
          "The access record is also part of security work, but here the inspector has asked for it for an accreditation visit. Prepare that review and explain who approves changes.",
        agreement:
          "A vendor agreement does not show which laboratory users can change result rules. Prepare the access review the inspector asked for.",
        breach:
          "Nothing has been disclosed. Staff need the access approvals and the record of regular reviews that the inspector asked for.",
        special:
          "No specially protected records are involved here. The inspector is asking for the laboratory's account permissions and how often they are reviewed.",
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
        "Accreditation covers who can get into laboratory systems and how they are secured. Keep the approvals and review records alongside the technical settings.",
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
      implication: "Service could stop.",
    },
    {
      system: "Host",
      role: "Laboratory",
      sees: "Access is shared.",
      implication: "Nobody can tell who did what.",
    },
    {
      system: "Network",
      role: "Security",
      sees: "Instrument segment is flat.",
      implication: "An infection can spread.",
    },
    {
      system: "Vendor",
      role: "Support",
      sees: "Remote channel is persistent.",
      implication: "Access and the contract both need checking.",
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
    "Select each area. Notice which team does the technical work, and why the laboratory still has to review what it means for patient testing.",
  text02:
    "Choose fixes that deal with different ways things can go wrong. You cannot afford everything, and a cheap paperwork step may not change the technical risk at all.",
  text03:
    "Read each event and its result. Blocked means the event as described is stopped; partially mitigated means some harm or interruption is still possible. The coverage count includes partial results, so it is not the number of events prevented.",
};
