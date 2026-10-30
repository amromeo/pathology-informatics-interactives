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
    explanation:
      "Hospital IT keeps these shared services running. The LIS team supports the laboratory software and tests orders and results with the laboratory.",
  },
  {
    id: "lis-build",
    task: "Add the test to the LIS and test the messages carrying its orders and results before laboratory review.",
    owner: "lis-team",
    explanation:
      "The LIS analyst adds the test and changes the interface. The laboratory tells the analyst what the report should contain, then checks the finished report.",
  },
  {
    id: "report",
    task: "Approve the order and complete result report, including how the report appears in the EHR.",
    owner: "laboratory",
    explanation:
      "The laboratory director approves what the report says and how it appears in the EHR. The LIS and EHR analysts make the required changes.",
  },
  {
    id: "result-design",
    task: "Help chemistry use the laboratory's usual naming and reporting practices for the new assay, including its display and corrections in the EHR.",
    owner: "pathology-informatics",
    explanation:
      "Pathology informatics works across laboratory sections. It helps chemistry check that the assay's name, report and corrections follow the laboratory's usual practices.",
  },
  {
    id: "cds",
    task: "Develop and review an EHR alert that uses the troponin result along with diagnoses and medications.",
    owner: "shared-cds",
    explanation:
      "Pathology informatics may lead an alert based on laboratory results. Clinical informatics and the treating clinicians also need to check how this alert uses diagnoses and medications.",
  },
  {
    id: "operations",
    task: "Prepare staff and procedures for patient testing. Check that each shift has supplies and knows whom to call for help.",
    owner: "laboratory-administration",
    explanation:
      "Laboratory operations staff arrange the day-to-day work at the bench. The laboratory director checks that the section can safely offer the test.",
  },
];

export const orientationTickets: {
  id: string;
  prompt: string;
  answer: TicketOwnerId;
  explanation: string;
}[] = [
  {
    id: "wrong-report",
    prompt:
      "The laboratory issued a corrected troponin result report, but the report displayed in the EHR is still wrong.",
    answer: "laboratory",
    explanation:
      "The pathologist or laboratory director should lead. The laboratory must check the complete corrected report in the EHR after the analyst repairs it.",
  },
  {
    id: "wrong-trend",
    prompt:
      "The troponin report is correct. In the EHR trend graph, however, the result is plotted with results from a different assay.",
    answer: "pathology-informatics",
    explanation:
      "Pathology informatics should review the assays with chemistry. The laboratory must decide whether their results can be compared before an EHR analyst changes the trend graph.",
  },
  {
    id: "repeat-alert",
    prompt:
      "A corrected troponin result causes the same EHR alert to fire again for the treating clinician.",
    answer: "clinical-informatics",
    explanation:
      "Clinical informatics should coordinate the alert review. First, pathology informatics and the LIS team check whether the correction replaced the original result. In Health Level Seven version 2 (HL7 v2), status C marks a correction to the same observation. If it arrived as a new result, the laboratory team must fix that first.",
  },
];

export const ticketOwnerOptions: { id: TicketOwnerId; label: string }[] = [
  { id: "laboratory", label: "Pathologist or laboratory director" },
  { id: "pathology-informatics", label: "Pathology informatics" },
  { id: "clinical-informatics", label: "Clinical informatics" },
];

export const goLiveEvidence = [
  { label: "Analyzer to EHR", value: "Test results transmitted successfully", tone: "positive" },
  {
    label: "Laboratory result report",
    value: "The interpretive comment does not appear in full in the verified EHR report location",
    tone: "critical",
  },
  {
    label: "Troponin alert",
    value: "The alert logic has not been reviewed by pathology or the chemistry laboratory",
    tone: "warning",
  },
  {
    label: "Procedures, training and staffing",
    value: "Procedures, training, and staffing coverage remain incomplete",
    tone: "critical",
  },
] as const;

export const orientationCopy = {
  hints: {
    connection:
      "Which team keeps shared hospital services running when several departments need them?",
    "lis-build": "Who can add a test definition and change the messages sent by the LIS?",
    report: "Who can decide that the full report is suitable for patient care?",
    "result-design":
      "Which group helps different laboratory sections use consistent test names and reports?",
    cds: "This alert uses both a laboratory result and other chart information. Who needs to review those together?",
    operations: "Who arranges the bench procedures and makes sure every shift has trained staff?",
  } as Record<string, string>,
  hold: "The team still needs to repair the comment and review the alert. The section also needs completed procedures, trained staff and shift coverage.",
  premature:
    "The clinician would receive a report with part of the comment missing. The alert has not had pathology review, and the bench preparation is unfinished.",
  complete:
    "You have assigned the build, report review and bench preparation, and identified who should lead each call. The director can use that list to follow up before Monday.",
};
