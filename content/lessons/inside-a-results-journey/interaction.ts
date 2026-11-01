export type PathwayNode = {
  id: string;
  label: string;
  location: string;
};

export const pathwayOrder = ["analyzer", "lis", "interface", "network", "ehr"] as const;

export const pathwayNodes: PathwayNode[] = [
  { id: "interface", label: "Interface engine", location: "Health-system data center" },
  { id: "ehr", label: "EHR", location: "Health-system data center" },
  { id: "analyzer", label: "Analyzer", location: "Hematology lab" },
  { id: "network", label: "Hospital network", location: "Internal network" },
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
      "The LIS analyst opens the server status, outgoing connection settings and delivery log. Results are waiting after repeated failed delivery attempts.",
    fields: [
      { label: "Processor", value: "18%" },
      { label: "Memory", value: "46%" },
      { label: "Storage", value: "61% used" },
      { label: "Network adapter", value: "Connected" },
      { label: "Operating system", value: "Running" },
      { label: "Interface application", value: "Running" },
      { label: "Outbound queue", value: "214 results", tone: "critical" },
      { label: "Destination IP address", value: "10.20.30.40" },
      { label: "Destination TCP port", value: "5100" },
    ],
    log: [
      "09:35:00  Outgoing connection settings reloaded after maintenance",
      "10:21:04  Connecting to 10.20.30.40:5100",
      "10:21:04  TCP connection refused",
      "10:21:04  Result queued; retry scheduled",
    ],
  },
  {
    id: "ehr-receiver",
    tab: "EHR receiving service",
    heading: "Check where the EHR receives laboratory messages",
    summary:
      "The EHR analyst opens the settings and status for the laboratory receiving service. Compare its address and port with the outgoing interface settings.",
    fields: [
      { label: "Service", value: "Laboratory results" },
      { label: "Status", value: "Running" },
      { label: "IP address", value: "10.20.30.40" },
      { label: "Listening TCP port", value: "5000" },
      { label: "Last settings change", value: "October 12, 14:10" },
    ],
    log: [
      "10:18  Laboratory receiving service: running",
      "10:18  Listening at 10.20.30.40:5000",
      "10:18  Most recent laboratory message accepted: 09:34",
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
      "The CBC reached the interface queue. The interface engine is trying port 5100, while the EHR's laboratory receiving service listens on port 5000. The report is waiting at this connection.",
  },
] as const;

export const repairChoices = [
  {
    id: "correct-port",
    label: "Correct the destination port and check delivery.",
    correct: true,
    feedback:
      "The interface analyst changes the destination port from 5100 to the agreed port 5000 and tests the connection with the EHR analyst. The team then checks delivery of waiting and new reports and accounts for results communicated during the interruption.",
  },
  {
    id: "repeat-cbc",
    label: "Repeat the patient's CBC on the analyzer.",
    correct: false,
    feedback:
      "The LIS already contains the verified CBC. Repeating the analysis would add another result to the same waiting queue. Staff should communicate the existing result and investigate the connection.",
  },
  {
    id: "restart-interface",
    label: "Restart the running interface application.",
    correct: false,
    feedback:
      "Restarting the application reloads its saved destination port of 5100. The EHR service listens on 5000, so the analyst needs to correct that setting before testing delivery.",
  },
  {
    id: "manual-entry",
    label: "Have the EHR team enter this CBC manually.",
    correct: false,
    feedback:
      "Entering this CBC would address one report. Other queued reports and new results would keep waiting at the failed connection. Use the downtime process while the interface team corrects the destination port.",
  },
] as const;

export const validationCases = [
  {
    passingRepairs: ["correct-port", "manual-entry"] as string[],
    failNote: "The original report still needs verified placement in the chart.",
    id: "original",
    name: "Original CBC",
    note: "Appears once in the correct patient chart",
  },
  {
    passingRepairs: ["correct-port"] as string[],
    failNote: "A one-result repair leaves other queued reports unresolved.",
    id: "queue",
    name: "Queued results",
    note: "All queued reports reach the correct patients without duplicates",
  },
  {
    passingRepairs: ["correct-port"] as string[],
    failNote: "The incorrect destination port still delays new reports.",
    id: "new-cbc",
    name: "New CBC",
    note: "Transmits to the EHR without delay",
  },
  {
    passingRepairs: ["correct-port"] as string[],
    failNote: "Other laboratory sections still use the same outgoing connection settings.",
    id: "other-section",
    name: "Another laboratory section",
    note: "A report using the same connection also reaches the EHR",
  },
  {
    passingRepairs: ["correct-port"] as string[],
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
    "Choose whether each named item is physical equipment, system software, application software or a communication protocol. For example, the server is physical equipment and the interface application is software running on it.",
  text02:
    "The LIS team starts with the laboratory systems, then follows the result toward the EHR. Open each check and decide what it rules in or out.",
  text03:
    "Run the checks to see the expected result of your selected action. Read each row: would that action deliver the waiting reports and new reports, and let staff account for results communicated during the interruption?",
};

export const pathwayExplanations: Record<string, string> = {
  analyzer: "The analyzer produces the measurement and sends it to the LIS for laboratory review.",
  lis: "The LIS stores the verified report and sends it to the interface engine.",
  interface: "The interface application prepares and queues the outbound report.",
  network:
    "The internal network carries data to the EHR computer. The destination port selects the receiving service on that computer.",
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
    "TCP/IP supplies rules for sending data across a network. IP provides addressing, and TCP delivers an ordered stream of data between connected applications.",
};
export const evidenceQuestions: Record<
  string,
  {
    answer: string;
    choices: { id: string; label: string }[];
    feedback: string;
    incorrectFeedback: string;
  }
> = {
  analyzer: {
    incorrectFeedback:
      "To assess EHR display mapping, staff need to inspect the report in the chart. The analyzer record shows completed testing and LIS acceptance, which rules out unfinished analyzer testing.",
    answer: "testing",
    choices: [
      { id: "testing", label: "Incomplete analyzer testing" },
      { id: "display", label: "An incorrect EHR display mapping" },
    ],
    feedback:
      "The completion time and LIS acceptance show that testing and the first transfer finished. Follow the report into the LIS next.",
  },
  lis: {
    incorrectFeedback:
      "To investigate the connection to the EHR, inspect the interface's delivery log and the EHR's receiving service. The final status here establishes that the laboratory released the result at 09:42.",
    answer: "verification",
    choices: [
      { id: "verification", label: "An unverified laboratory result" },
      { id: "network", label: "A failed connection to the EHR" },
    ],
    feedback:
      "Final status and the 09:42 verification show that the laboratory released the report. Staff can communicate that result while the analyst follows its electronic delivery.",
  },
  interface: {
    incorrectFeedback:
      "A refused connection is a reason to compare the destination settings with the EHR's receiving service. The processor and memory readings address the other choice: overload.",
    answer: "overload",
    choices: [
      { id: "overload", label: "Server processor or memory overload" },
      { id: "routing", label: "An incorrect destination port" },
    ],
    feedback:
      "Processor use of 18% and memory use of 46% leave capacity available at the recorded time. Compare the destination address and port in the failed connection with the EHR's receiving settings next.",
  },
  "ehr-receiver": {
    incorrectFeedback:
      "Assessing a hemoglobin measurement would require laboratory analytical checks. These records concern message delivery: the EHR listens on port 5000 and the interface engine is trying port 5100.",
    answer: "normal",
    choices: [
      { id: "normal", label: "Matching sender and receiver port settings" },
      { id: "result", label: "An incorrect hemoglobin measurement" },
    ],
    feedback:
      "The sender's destination address matches the EHR's address. The EHR receives laboratory messages on port 5000; the sender is trying 5100. Correcting the sender's port is the next step.",
  },
};
