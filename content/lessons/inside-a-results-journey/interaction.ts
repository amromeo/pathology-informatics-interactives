export type PathwayNode = {
  id: string;
  label: string;
  location: string;
};

export const pathwayOrder = ["analyzer", "lis", "interface", "network", "ehr"] as const;

export const pathwayNodes: PathwayNode[] = [
  { id: "interface", label: "Interface engine", location: "Health-system data center" },
  { id: "ehr", label: "EHR", location: "Vendor-hosted service" },
  { id: "analyzer", label: "Analyzer", location: "Hematology lab" },
  { id: "network", label: "Firewall and network", location: "Hospital boundary" },
  { id: "lis", label: "LIS", location: "Health-system data center" },
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
      { label: "Specimen", value: "H26-01482" },
      { label: "Analysis completed", value: "09:40" },
      { label: "Instrument flags", value: "None" },
      { label: "Transmission", value: "Accepted by LIS" },
    ],
  },
  {
    id: "lis",
    tab: "LIS",
    heading: "The result is final in the LIS",
    summary:
      "The hematology lab can see that the CBC was reviewed and released. The ED cannot see this screen.",
    fields: [
      { label: "Status", value: "Final" },
      { label: "Verified by", value: "M. Okafor, MLS" },
      { label: "Verified", value: "09:42" },
      { label: "Hemoglobin", value: "7.4 g/dL · Low" },
      { label: "Hematocrit", value: "22.8% · Low" },
      { label: "Platelet count", value: "212 × 10⁹/L" },
    ],
  },
  {
    id: "interface",
    tab: "Interface server",
    heading: "The interface application is running, but its queue is growing",
    summary:
      "The server itself is not overloaded. Results are waiting because repeated delivery attempts fail.",
    fields: [
      { label: "Processor", value: "18%" },
      { label: "Memory", value: "46%" },
      { label: "Storage", value: "61% used" },
      { label: "Network adapter", value: "Connected" },
      { label: "Operating system", value: "Running" },
      { label: "Interface application", value: "Running" },
      { label: "Outbound queue", value: "214 results", tone: "critical" },
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
    summary:
      "The interface server can reach the hospital network, but the approved connection to the vendor-hosted EHR is being denied.",
    fields: [
      { label: "Recent change", value: "Firewall rules updated at 09:35" },
      { label: "Affected route", value: "Interface server → EHR service" },
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
    feedback:
      "The LIS received the CBC and shows it as final, so this connection carried the result.",
  },
  {
    id: "lis-interface",
    label: "LIS to interface engine",
    correct: false,
    feedback:
      "The result is in the interface queue, so it made it from the LIS to the interface engine.",
  },
  {
    id: "interface-ehr",
    label: "Interface engine to EHR",
    correct: true,
    feedback:
      "The analyzer completed the CBC, and the LIS released the result. The result is waiting in the interface queue because the connection between the interface engine and EHR is blocked.",
  },
] as const;

export const repairChoices = [
  {
    id: "restore-firewall",
    label: "Restore route; verify delivery.",
    correct: true,
    feedback:
      "This corrects the demonstrated failure. The queued results still need to be transmitted and reconciled before the incident is closed.",
  },
  {
    id: "repeat-cbc",
    label: "Repeat the CBC.",
    correct: false,
    feedback:
      "The CBC is already complete. Repeating it does not restore electronic reporting and may create an unnecessary recollection and another delayed result.",
  },
  {
    id: "restart-interface",
    label: "Restart the interface engine.",
    correct: false,
    feedback:
      "The interface application is running. Restarting it does not remove the firewall block, and the queued results still cannot reach the EHR.",
  },
  {
    id: "manual-entry",
    label: "Ask the EHR vendor to enter the CBC manually.",
    correct: false,
    feedback:
      "Manual entry would not restore the reporting path or address the other queued results. The laboratory should use its approved downtime procedure until the connection is restored.",
  },
] as const;

export const validationCases = [
  {
    passingRepairs: ["restore-firewall", "manual-entry"] as string[],
    failNote: "The original report still needs verified placement in the chart.",
    id: "original",
    name: "Original CBC",
    note: "Appears once in the correct patient chart",
  },
  {
    passingRepairs: ["restore-firewall"] as string[],
    failNote: "A one-result repair leaves other queued reports unresolved.",
    id: "queue",
    name: "Queued results",
    note: "All queued reports reach the correct patients without duplicates",
  },
  {
    passingRepairs: ["restore-firewall"] as string[],
    failNote: "The blocked connection still delays new reports.",
    id: "new-cbc",
    name: "New CBC",
    note: "Transmits to the EHR without delay",
  },
  {
    passingRepairs: ["restore-firewall"] as string[],
    failNote: "Other laboratory sections still use the blocked connection.",
    id: "other-section",
    name: "Another laboratory section",
    note: "A report using the same connection also reaches the EHR",
  },
  {
    passingRepairs: ["restore-firewall"] as string[],
    failNote: "Reconcile results already communicated during the interruption.",
    id: "downtime",
    name: "Downtime results",
    note: "Results communicated during the interruption are reconciled",
  },
] as const;

export const firstChecks = [
  {
    id: "lis",
    label: "Check the CBC in the LIS.",
    correct: true,
    feedback:
      "The ED can only see Pending. The LIS shows a final CBC verified at 09:42. Read the hemoglobin to the ED clinician now, have it read back, and document the call under the downtime procedure. Then find out why the report did not reach the EHR.",
  },
  {
    id: "repeat",
    label: "Repeat the CBC now.",
    correct: false,
    feedback:
      "First determine whether testing is actually delayed. Repeating a completed CBC would not explain why the report is missing from the EHR.",
  },
  {
    id: "refresh",
    label: "Ask the ED to refresh the patient chart.",
    correct: false,
    feedback:
      "A screen refresh is reasonable only after the laboratory checks whether the CBC was completed and released.",
  },
] as const;

export const lessonCopy = {
  text01:
    "Choose the best category for each item. Some systems include more than one kind of component; classify the item named in each row.",
  text02:
    "The LIS team starts with the laboratory systems, then follows the result toward the EHR. Open each check and decide what it rules in or out.",
  text03:
    "A single result appearing in the EHR is not enough. Check the delayed reports, a new report, and the downtime record.",
};

export const pathwayExplanations: Record<string, string> = {
  analyzer: "The analyzer produces the measurement and sends it to the LIS for laboratory review.",
  lis: "The LIS stores the verified report and sends it to the interface engine.",
  interface: "The interface application prepares and queues the outbound report.",
  network: "The network and firewall must permit the approved connection to the EHR.",
  ehr: "The clinical team must be able to view the complete report in the correct chart.",
};
export const classExplanations: Record<string, string> = {
  server:
    "These are physical computing components that provide processing, memory, storage and connectivity.",
  switch: "A network switch is physical equipment that forwards traffic between connected devices.",
  os: "The operating system manages hardware resources and provides services used by applications.",
  lis: "The LIS application manages laboratory orders, specimens and results; it runs on an operating system.",
  interface:
    "The interface engine is an application that transforms and routes messages; its server is the host hardware.",
  tcpip:
    "Transmission Control Protocol/Internet Protocol (TCP/IP) supplies communication rules, not the laboratory report application.",
};
export const evidenceQuestions: Record<
  string,
  { answer: string; choices: { id: string; label: string }[]; feedback: string }
> = {
  analyzer: {
    answer: "testing",
    choices: [
      { id: "testing", label: "Incomplete analyzer testing" },
      { id: "display", label: "An incorrect EHR display mapping" },
    ],
    feedback:
      "Normal analysis and LIS acceptance show that testing and the first transfer completed. They do not establish the later chart display.",
  },
  lis: {
    answer: "verification",
    choices: [
      { id: "verification", label: "An unverified laboratory result" },
      { id: "network", label: "A blocked EHR network connection" },
    ],
    feedback:
      "Final status and the 09:42 verification show the laboratory result is available. They do not prove delivery beyond the LIS.",
  },
  interface: {
    answer: "overload",
    choices: [
      { id: "overload", label: "Server processor or memory overload" },
      { id: "routing", label: "A firewall rule blocking the destination" },
    ],
    feedback:
      "Processor use of 18% and memory use of 46% do not suggest overload. Connection resets and a growing queue require checking the network route.",
  },
  firewall: {
    answer: "normal",
    choices: [
      { id: "normal", label: "Normal delivery over the approved route" },
      { id: "result", label: "An incorrect hemoglobin measurement" },
    ],
    feedback:
      "The deny log demonstrates a blocked route. It says nothing about the analytic accuracy of the hemoglobin measurement.",
  },
};
