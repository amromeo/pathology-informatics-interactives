export type PathwayNode = {
  id: string;
  label: string;
  location: string;
};

export const pathwayNodes: PathwayNode[] = [
  { id: "analyzer", label: "Analyzer", location: "Hematology laboratory" },
  { id: "lis", label: "LIS", location: "Health-system data center" },
  { id: "interface", label: "Interface engine", location: "Health-system data center" },
  { id: "network", label: "Firewall and network", location: "Hospital boundary" },
  { id: "ehr", label: "EHR", location: "Vendor-hosted service" },
];

export const componentClasses = [
  {
    id: "server",
    label: "Server, processor, memory, storage, and network adapter",
    answer: "hardware",
  },
  {
    id: "switch",
    label: "Network switch",
    answer: "hardware",
  },
  {
    id: "os",
    label: "Operating system",
    answer: "system-software",
  },
  {
    id: "lis",
    label: "Laboratory information system",
    answer: "application-software",
  },
  {
    id: "interface",
    label: "Interface engine",
    answer: "application-software",
  },
  {
    id: "tcpip",
    label: "TCP/IP",
    answer: "network-rule",
  },
] as const;

export const classLabels = {
  hardware: "Hardware",
  "system-software": "System software",
  "application-software": "Application software",
  "network-rule": "Network communication",
} as const;

export const evidenceViews = [
  {
    id: "analyzer",
    tab: "Analyzer",
    heading: "The analyzer completed the CBC",
    summary: "The specimen ran normally, and the analyzer sent the result to the LIS.",
    fields: [
      ["Specimen", "H26-01482"],
      ["Analysis completed", "09:40"],
      ["Instrument flags", "None"],
      ["Transmission", "Accepted by LIS"],
    ],
  },
  {
    id: "lis",
    tab: "LIS",
    heading: "The result is final in the LIS",
    summary: "Hematology can see that the CBC was reviewed and released. The ED cannot see this screen.",
    fields: [
      ["Status", "Final"],
      ["Verified by", "M. Chen, MLS"],
      ["Verified", "09:42"],
      ["Hemoglobin", "7.4 g/dL · Low"],
      ["Hematocrit", "22.8% · Low"],
      ["Platelet count", "212 × 10⁹/L"],
    ],
  },
  {
    id: "interface",
    tab: "Interface server",
    heading: "The interface application is running, but its queue is growing",
    summary: "The server itself is not overloaded. Results are waiting because repeated delivery attempts fail.",
    fields: [
      ["Processor", "18%"],
      ["Memory", "46%"],
      ["Storage", "61% used"],
      ["Network adapter", "Connected"],
      ["Operating system", "Running"],
      ["Interface application", "Running"],
      ["Outbound queue", "214 results"],
    ],
    log: [
      "10:21:04  Delivery failed",
      "10:21:04  TCP connection reset",
      "10:21:04  Result queued; retry scheduled",
    ],
  },
  {
    id: "firewall",
    tab: "Firewall",
    heading: "The hospital firewall is blocking the EHR connection",
    summary: "The interface server can reach the hospital network, but the approved connection to the vendor-hosted EHR is being denied.",
    fields: [
      ["Recent change", "Firewall rules updated at 09:35"],
      ["Affected route", "Interface server → EHR service"],
    ],
    log: [
      "10:18  Interface server → EHR service",
      "10:18  Connection blocked by firewall rule",
      "10:18  Action: deny",
    ],
  },
] as const;

export const connectionChoices = [
  {
    id: "analyzer-lis",
    label: "Analyzer to LIS",
    correct: false,
    feedback: "The LIS received the CBC and shows it as final, so this connection carried the result.",
  },
  {
    id: "lis-interface",
    label: "LIS to interface engine",
    correct: false,
    feedback: "The result is in the interface queue, so it made it from the LIS to the interface engine.",
  },
  {
    id: "interface-ehr",
    label: "Interface engine to EHR",
    correct: true,
    feedback: "The analyzer completed the CBC, and the LIS released the result. The result is waiting in the interface queue because the connection between the interface engine and EHR is blocked.",
  },
] as const;

export const repairChoices = [
  {
    id: "restore-firewall",
    label: "Have Hospital IT remove the firewall block. Then have the LIS team check the interface queue and confirm that results are moving again.",
    correct: true,
    feedback: "This corrects the demonstrated failure. The queued results still need to be transmitted and reconciled before the incident is closed.",
  },
  {
    id: "repeat-cbc",
    label: "Repeat the CBC.",
    correct: false,
    feedback: "The CBC is already complete. Repeating it does not restore electronic reporting and may create an unnecessary recollection and another delayed result.",
  },
  {
    id: "restart-interface",
    label: "Restart the interface engine.",
    correct: false,
    feedback: "The interface application is running. Restarting it does not remove the firewall block, and the queued results still cannot reach the EHR.",
  },
  {
    id: "manual-entry",
    label: "Ask the EHR vendor to enter the CBC manually.",
    correct: false,
    feedback: "Manual entry would not restore the reporting path or address the other queued results. The laboratory should use its approved downtime procedure until the connection is restored.",
  },
] as const;

export const validationCases = [
  {
    id: "original",
    name: "Original CBC",
    note: "Appears once in the correct patient chart",
  },
  {
    id: "queue",
    name: "Queued results",
    note: "All queued reports reach the correct patients without duplicates",
  },
  {
    id: "new-cbc",
    name: "New CBC",
    note: "Transmits to the EHR without delay",
  },
  {
    id: "other-section",
    name: "Another laboratory section",
    note: "A report using the same connection also reaches the EHR",
  },
  {
    id: "downtime",
    name: "Downtime results",
    note: "Results communicated during the interruption are reconciled",
  },
] as const;
