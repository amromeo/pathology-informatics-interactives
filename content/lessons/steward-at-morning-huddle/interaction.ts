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
    task: "Keep the hospital network and shared systems running so the LIS and instrument connections work.",
    owner: "it",
    explanation:
      "Hospital IT keeps these shared systems running. The LIS team looks after the laboratory software and tests orders and results with the laboratory.",
  },
  {
    id: "lis-build",
    task: "Add the test to the LIS and test the messages that carry its orders and results, before the laboratory reviews it.",
    owner: "lis-team",
    explanation:
      "The LIS analyst adds the test and changes the interface. The laboratory tells the analyst what the report should contain, then checks the finished report.",
  },
  {
    id: "report",
    task: "Approve how the test is ordered and what the complete report says, including how it looks in the EHR.",
    owner: "laboratory",
    explanation:
      "The laboratory director approves what the report says and how it looks in the EHR. The LIS and EHR analysts make the changes.",
  },
  {
    id: "result-design",
    task: "Help chemistry name and report the new assay like the laboratory's other tests, including how it displays and how corrections appear in the EHR.",
    owner: "pathology-informatics",
    explanation:
      "Pathology informatics works across laboratory sections. It helps chemistry check that the assay's name, report and corrections match the way the laboratory handles its other tests.",
  },
  {
    id: "cds",
    task: "Build and review an EHR alert that combines the troponin result with the patient's diagnoses and medications.",
    owner: "shared-cds",
    explanation:
      "Pathology informatics may lead an alert based on laboratory results. Clinical informatics and the treating clinicians also need to check how this alert uses diagnoses and medications.",
  },
  {
    id: "operations",
    task: "Prepare staff and procedures for patient testing. Check that each shift has supplies and knows whom to call for help.",
    owner: "laboratory-administration",
    explanation:
      "Laboratory operations staff run the day-to-day work at the bench. The laboratory director checks that the section is ready to offer the test safely.",
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
      "The pathologist or laboratory director should lead. Once the analyst fixes the display, the laboratory checks the complete corrected report in the EHR.",
  },
  {
    id: "wrong-trend",
    prompt:
      "The troponin report is correct. In the EHR trend graph, however, the result is plotted with results from a different assay.",
    answer: "pathology-informatics",
    explanation:
      "Pathology informatics should review the two assays with chemistry. Only the laboratory can say whether their results can be compared, and that has to be settled before an EHR analyst changes the trend graph.",
  },
  {
    id: "repeat-alert",
    prompt:
      "A corrected troponin result causes the same EHR alert to fire again for the treating clinician.",
    answer: "clinical-informatics",
    explanation:
      "Clinical informatics should coordinate the review of the alert. But first, pathology informatics and the LIS team check whether the correction replaced the original result. In Health Level Seven version 2 (HL7 v2), status C marks a correction to the same observation. If the correction arrived as a new result, the laboratory team fixes that first.",
  },
];

export const ticketOwnerOptions: { id: TicketOwnerId; label: string }[] = [
  { id: "laboratory", label: "Pathologist or laboratory director" },
  { id: "pathology-informatics", label: "Pathology informatics" },
  { id: "clinical-informatics", label: "Clinical informatics" },
];

export const goLiveEvidence = [
  { label: "Analyzer to EHR", value: "Test results reach the EHR", tone: "positive" },
  {
    label: "Laboratory result report",
    value: "Interpretive comment is cut off in the EHR report the laboratory checks",
    tone: "critical",
  },
  {
    label: "Troponin alert",
    value: "Pathology and chemistry have not yet reviewed the alert",
    tone: "warning",
  },
  {
    label: "Procedures, training and staffing",
    value: "Procedures, training and shift coverage not finished",
    tone: "critical",
  },
] as const;

export const orientationCopy = {
  hints: {
    connection: "Which team keeps the hospital's shared systems running for every department?",
    "lis-build": "Who adds new tests to the LIS and changes the messages it sends?",
    report: "Who decides that the full report is ready for patient care?",
    "result-design":
      "Which group helps every laboratory section name and report tests the same way?",
    cds: "This alert uses a laboratory result and other information from the chart. Who needs to look at both together?",
    operations: "Who writes the bench procedures and makes sure every shift has trained staff?",
  } as Record<string, string>,
  hold: "The comment still has to be fixed and the alert reviewed. The section also needs finished procedures, trained staff and every shift covered.",
  premature:
    "Clinicians would get a report with part of the comment missing. Pathology has not reviewed the alert, and the bench is not ready.",
  complete:
    "You have matched the build, report review and bench preparation to the right people, and chosen who should lead each call. The director can use your list to follow up before Monday.",
};
