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
    summary: "The specimen ran without problems, and the analyzer sent the result to the LIS.",
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
      "The LIS analyst opens the server status, the outgoing connection settings and the delivery log. Results are piling up after repeated failed attempts to send them.",
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
      "The EHR analyst opens the settings and status of the laboratory receiving service. Compare its address and port with the settings the interface engine is using.",
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
    feedback: "The LIS received the CBC and shows it as final, so this connection worked.",
  },
  {
    id: "lis-interface",
    label: "LIS to interface engine",
    correct: false,
    feedback:
      "The result is sitting in the interface queue, so it got from the LIS to the interface engine.",
  },
  {
    id: "interface-ehr",
    label: "Interface engine to EHR",
    correct: true,
    feedback:
      "The CBC reached the interface queue. The interface engine is trying port 5100, but the EHR's laboratory receiving service listens on port 5000. The report is stuck at this connection.",
  },
] as const;

export const repairChoices = [
  {
    id: "correct-port",
    label: "Correct the destination port and check delivery.",
    correct: true,
    feedback:
      "The interface analyst changes the destination port from 5100 to the agreed 5000 and tests the connection with the EHR analyst. Then the team checks that the waiting reports and new ones arrive, and checks the results phoned during the outage against the chart.",
  },
  {
    id: "repeat-cbc",
    label: "Repeat the patient's CBC on the analyzer.",
    correct: false,
    feedback:
      "The LIS already has the verified CBC. Running it again would only add another result to the same stuck queue. Phone the result you have, and investigate the connection.",
  },
  {
    id: "restart-interface",
    label: "Restart the running interface application.",
    correct: false,
    feedback:
      "Restarting the application reloads the saved destination port, 5100. The EHR listens on 5000, so the analyst has to correct that setting first, then test delivery.",
  },
  {
    id: "manual-entry",
    label: "Have the EHR team enter this CBC manually.",
    correct: false,
    feedback:
      "Typing in this CBC fixes one report. The other queued reports, and every new result, would still be stuck at the failed connection. Keep phoning results under the downtime procedure while the interface team corrects the port.",
  },
] as const;

export const validationCases = [
  {
    passingRepairs: ["correct-port", "manual-entry"] as string[],
    failNote: "The original report still has to be checked in the right chart.",
    id: "original",
    name: "Original CBC",
    note: "Appears once in the correct patient chart",
  },
  {
    passingRepairs: ["correct-port"] as string[],
    failNote: "Fixing one result leaves the other queued reports stuck.",
    id: "queue",
    name: "Queued results",
    note: "All queued reports reach the correct patients without duplicates",
  },
  {
    passingRepairs: ["correct-port"] as string[],
    failNote: "The wrong destination port still holds up new reports.",
    id: "new-cbc",
    name: "New CBC",
    note: "Transmits to the EHR without delay",
  },
  {
    passingRepairs: ["correct-port"] as string[],
    failNote: "Other laboratory sections send through the same broken connection.",
    id: "other-section",
    name: "Another laboratory section",
    note: "A report using the same connection also reaches the EHR",
  },
  {
    passingRepairs: ["correct-port"] as string[],
    failNote: "Check the results phoned during the outage against the chart.",
    id: "downtime",
    name: "Downtime results",
    note: "Results phoned during the outage match the chart",
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
      "First find out whether testing is actually delayed. Repeating a finished CBC would not explain why the report is missing from the EHR.",
  },
  {
    id: "refresh",
    label: "Ask the ED to refresh the patient chart.",
    correct: false,
    feedback:
      "Refreshing the screen will not help until the laboratory knows whether the CBC was finished and released.",
  },
] as const;

export const lessonCopy = {
  text01:
    "Decide whether each item is physical equipment, system software, application software or a set of network rules. For example, the server is physical equipment, and the interface application is software that runs on it.",
  text02:
    "The LIS analyst starts with the laboratory's own systems, then follows the result toward the EHR. Open each check and decide what it rules out.",
  text03:
    "Run the checks to see what your chosen action would do. Read each row: would it get the waiting reports and new ones through, and let staff check the results phoned during the outage?",
};

export const pathwayExplanations: Record<string, string> = {
  analyzer: "The analyzer produces the measurement and sends it to the LIS for laboratory review.",
  lis: "The LIS stores the verified report and sends it to the interface engine.",
  interface:
    "The interface application reformats the report and holds it in the queue until it can be sent.",
  network:
    "The internal network carries the data to the EHR computer. The destination port picks out the receiving service on that computer.",
  ehr: "The clinical team must be able to view the complete report in the correct chart.",
};
export const classExplanations: Record<string, string> = {
  server:
    "These are the physical parts of the computer: they do the processing, hold the data and connect to the network.",
  switch: "A network switch is physical equipment that forwards traffic between connected devices.",
  os: "The operating system runs the computer itself and lets applications use its memory, storage and network.",
  lis: "The LIS is an application that manages laboratory orders, specimens and results. It runs on an operating system.",
  interface:
    "The interface engine is an application that reformats messages and sends them on. The server it runs on is the hardware.",
  tcpip:
    "TCP/IP is the set of rules for sending data across a network. IP handles the addresses; TCP makes sure the data arrive complete and in order.",
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
      "To judge how the EHR displays the result, staff need to inspect the report in the chart. This record shows the analyzer finished the test and the LIS accepted it, so it rules out unfinished testing.",
    answer: "testing",
    choices: [
      { id: "testing", label: "Incomplete analyzer testing" },
      { id: "display", label: "An incorrect EHR display mapping" },
    ],
    feedback:
      "The completion time and the LIS acceptance show that testing finished and the result reached the LIS. Follow the report into the LIS next.",
  },
  lis: {
    incorrectFeedback:
      "To check the connection to the EHR, look at the interface's delivery log and the EHR's receiving service. The Final status here shows only that the laboratory released the result at 09:42.",
    answer: "verification",
    choices: [
      { id: "verification", label: "An unverified laboratory result" },
      { id: "network", label: "A failed connection to the EHR" },
    ],
    feedback:
      "The Final status and the 09:42 verification show that the laboratory released the report. Staff can phone that result through while the analyst follows the electronic report.",
  },
  interface: {
    incorrectFeedback:
      "The refused connection is a reason to compare the destination settings with the EHR's receiving service, which comes next. What this record rules out is overload: look at the processor and memory readings.",
    answer: "overload",
    choices: [
      { id: "overload", label: "Server processor or memory overload" },
      { id: "routing", label: "An incorrect destination port" },
    ],
    feedback:
      "With the processor at 18% and memory at 46%, the server had plenty of room. Next, compare the address and port in the failed connection with the EHR's receiving settings.",
  },
  "ehr-receiver": {
    incorrectFeedback:
      "Checking the hemoglobin itself would mean looking at the analyzer and its quality control. These records are about message delivery: the EHR listens on port 5000 and the interface engine is trying port 5100.",
    answer: "normal",
    choices: [
      { id: "normal", label: "Matching sender and receiver port settings" },
      { id: "result", label: "An incorrect hemoglobin measurement" },
    ],
    feedback:
      "The sender has the right address. But the EHR receives laboratory messages on port 5000, and the sender is trying 5100. The next step is to correct the sender's port.",
  },
};
