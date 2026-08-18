export type OrientationRoleId =
  | "it"
  | "lis-team"
  | "laboratory"
  | "pathology-informatics"
  | "clinical-informatics"
  | "shared-cds"
  | "laboratory-administration";

export type TicketOwnerId = "laboratory" | "ehr" | "both";

export const orientationRoles: { id: OrientationRoleId; label: string }[] = [
  { id: "it", label: "Enterprise IT" },
  { id: "lis-team", label: "Laboratory IT / LIS team" },
  { id: "laboratory", label: "Pathologist / laboratory" },
  { id: "pathology-informatics", label: "Pathology informatics" },
  { id: "clinical-informatics", label: "Clinical informatics" },
  { id: "shared-cds", label: "Shared CDS group" },
  { id: "laboratory-administration", label: "Laboratory administration" },
];

export const orientationTasks: {
  id: string;
  task: string;
  owner: OrientationRoleId;
  explanation: string;
}[] = [
  {
    id: "connection",
    task: "Provide the servers, network, enterprise accounts, and secure connections used by the laboratory systems.",
    owner: "it",
    explanation: "Enterprise IT runs the shared infrastructure. The LIS team supports the laboratory applications, and the laboratory still tests that orders and results work correctly.",
  },
  {
    id: "lis-build",
    task: "Enter the approved order and result definitions in the LIS, configure the interface changes, and carry out technical testing.",
    owner: "lis-team",
    explanation: "The laboratory IT team, often called the LIS team, performs and supports the application build. The laboratory approves the clinical content, and pathology informatics helps keep the build consistent across laboratory sections.",
  },
  {
    id: "report",
    task: "Sets the order name, units, reference information, comments, flags, and required EHR display.",
    owner: "laboratory",
    explanation: "The laboratory owns the report and approves how it appears in the EHR. Analysts configure the build to the laboratory's requirements.",
  },
  {
    id: "result-design",
    task: "Review the proposed order and result build for the new assay. Make sure the names, result fields, units, reference information, comments, and correction handling follow laboratory-wide standards.",
    owner: "pathology-informatics",
    explanation: "Pathology informatics knows how laboratory orders and results are implemented across sections and helps keep those builds consistent. The laboratory determines and owns the clinical content, and the technical teams configure the systems.",
  },
  {
    id: "cds",
    task: "Design an EHR alert that uses the new result together with diagnoses and medications.",
    owner: "shared-cds",
    explanation: "Laboratory-related CDS is within the scope of pathology informatics. Clinical informatics and the clinical service are also involved when the rule uses broader EHR data or changes patient-care workflow. The laboratory remains responsible for how the laboratory result is interpreted and used.",
  },
  {
    id: "operations",
    task: "Drafts the SOPs, staffing, training, and go-live coverage.",
    owner: "laboratory-administration",
    explanation: "Laboratory administration prepares the service to run. The pathologist or laboratory director provides medical oversight.",
  },
];

export const orientationTickets: { id: string; prompt: string; answer: TicketOwnerId; explanation: string }[] = [
  {
    id: "wrong-report",
    prompt: "The corrected troponin result is wrong in the laboratory report.",
    answer: "laboratory",
    explanation: "The laboratory owns the report. Pathology and the laboratory determine the correct content and work with the analyst to correct the build.",
  },
  {
    id: "wrong-trend",
    prompt: "The laboratory report is correct, but the EHR trend graph groups the result with a different troponin assay.",
    answer: "ehr",
    explanation: "Clinical informatics and the EHR team lead because the problem is in a downstream patient-chart view. Pathology confirms the result identity and how it should be represented.",
  },
  {
    id: "repeat-alert",
    prompt: "A corrected troponin result causes an EHR alert to fire again.",
    answer: "both",
    explanation: "Both groups are needed. The laboratory explains the correction and the intended use of the result. Pathology informatics, clinical informatics, and the clinical service decide what the CDS rule should do.",
  },
];

export const ticketOwnerOptions: { id: TicketOwnerId; label: string }[] = [
  { id: "laboratory", label: "Pathology / laboratory" },
  { id: "ehr", label: "Clinical informatics / EHR team" },
  { id: "both", label: "Both groups" },
];

export const goLiveEvidence = [
  { label: "Analyzer to EHR", value: "Transmission tests passed", tone: "positive" },
  { label: "Laboratory report", value: "Interpretive comment is clipped", tone: "critical" },
  { label: "Proposed EHR alert", value: "Result use not reviewed by pathology", tone: "warning" },
  { label: "SOP and training", value: "Not complete", tone: "critical" },
] as const;
