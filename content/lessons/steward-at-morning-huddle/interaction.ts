export type OrientationRoleId =
  | "it"
  | "lis-team"
  | "laboratory"
  | "pathology-informatics"
  | "clinical-informatics"
  | "shared-cds"
  | "laboratory-administration";

export type TicketOwnerId = "laboratory" | "pathology-informatics" | "clinical-informatics";

export const orientationRoles: { id: OrientationRoleId; label: string }[] = [
  { id: "it", label: "Hospital IT" },
  { id: "lis-team", label: "LIS team" },
  { id: "laboratory", label: "Pathologist or laboratory director" },
  { id: "pathology-informatics", label: "Pathology informatics" },
  { id: "clinical-informatics", label: "Clinical informatics" },
  { id: "shared-cds", label: "Pathology and clinical informatics" },
  { id: "laboratory-administration", label: "Laboratory operations" },
];

export const orientationTasks: {
  id: string;
  task: string;
  owner: OrientationRoleId;
  explanation: string;
}[] = [
  {
    id: "connection",
    task: "Keep the network and shared systems available so the LIS and instrument connections can operate.",
    owner: "it",
    explanation: "Hospital IT keeps the network and shared systems running. The LIS team supports the laboratory applications, and the laboratory still tests that orders and results work correctly.",
  },
  {
    id: "lis-build",
    task: "Build the new test in the LIS, make the required interface changes, and complete technical testing before laboratory review.",
    owner: "lis-team",
    explanation: "The LIS team performs and supports the technical build. The laboratory determines what should be reported and reviews the completed work.",
  },
  {
    id: "report",
    task: "Approve the order and complete result report, including how the report appears in the EHR.",
    owner: "laboratory",
    explanation: "The laboratory is responsible for the complete result report and for how the report appears in the EHR. The technical teams configure the systems to the laboratory's requirements.",
  },
  {
    id: "result-design",
    task: "Help chemistry fit the new assay into the laboratory's usual approach to orders and results, including names, units, comments, flags, corrections, and EHR display.",
    owner: "pathology-informatics",
    explanation: "Pathology informatics helps chemistry fit the new assay into the practices used across the laboratory for naming, reporting, corrections, and EHR display.",
  },
  {
    id: "cds",
    task: "Develop and review an EHR alert that uses the troponin result along with diagnoses and medications.",
    owner: "shared-cds",
    explanation: "Responsibility for CDS is not cleanly divided between pathology informatics and clinical informatics. Laboratory-related CDS may be led by pathology informatics, but its design and review often involve clinical informatics, the laboratory, and the clinical services affected by it.",
  },
  {
    id: "operations",
    task: "Make sure the procedures, staffing, training, supplies, and support plan are ready before patient testing begins.",
    owner: "laboratory-administration",
    explanation: "Laboratory operations prepares the section to perform the test routinely. The pathologist or laboratory director provides medical oversight.",
  },
];

export const orientationTickets: { id: string; prompt: string; answer: TicketOwnerId; explanation: string }[] = [
  {
    id: "wrong-report",
    prompt: "The laboratory issued a corrected troponin result report, but the report displayed in the EHR is still wrong.",
    answer: "laboratory",
    explanation: "The laboratory should lead. It is responsible for the complete result report and must verify that the corrected report appears properly in the EHR.",
  },
  {
    id: "wrong-trend",
    prompt: "The troponin report is correct. In the EHR trend graph, however, the result is plotted with results from a different assay.",
    answer: "pathology-informatics",
    explanation: "Although the error appears in the EHR, pathology informatics should lead because the problem is how two laboratory tests are represented in the patient's chart. Test identity, method changes, and whether results are sufficiently comparable to be trended together are laboratory questions. An EHR analyst may be needed to make the configuration change.",
  },
  {
    id: "repeat-alert",
    prompt: "A corrected troponin result causes the same EHR alert to fire again for the treating clinician.",
    answer: "clinical-informatics",
    explanation: "The alert firing is an EHR and CDS workflow problem, so clinical informatics should lead. Pathology contributes the laboratory information needed to set the rule correctly.",
  },
];

export const ticketOwnerOptions: { id: TicketOwnerId; label: string }[] = [
  { id: "laboratory", label: "Pathologist or laboratory director" },
  { id: "pathology-informatics", label: "Pathology informatics" },
  { id: "clinical-informatics", label: "Clinical informatics" },
];

export const goLiveEvidence = [
  { label: "Analyzer to EHR", value: "Test results transmitted successfully", tone: "positive" },
  { label: "Laboratory result report", value: "The interpretive comment does not appear in full in the verified EHR report location", tone: "critical" },
  { label: "Troponin alert", value: "The alert logic has not been reviewed by pathology or the chemistry laboratory", tone: "warning" },
  { label: "Operational readiness", value: "Procedures, training, and staffing coverage remain incomplete", tone: "critical" },
] as const;
