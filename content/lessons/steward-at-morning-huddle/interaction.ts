export type OrientationRoleId =
  | "it"
  | "laboratory"
  | "pathology-informatics"
  | "clinical-informatics"
  | "laboratory-administration";

export type OrientationViewId = "specimen" | "patient" | "both";

export const orientationRoles: { id: OrientationRoleId; label: string }[] = [
  { id: "it", label: "IT / application team" },
  { id: "laboratory", label: "Pathologist / laboratory" },
  { id: "pathology-informatics", label: "Pathology informatics" },
  { id: "clinical-informatics", label: "Clinical informatics" },
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
    task: "Install the interface connection and set system access controls.",
    owner: "it",
    explanation: "IT builds and runs the connection. The laboratory still tests that results arrive correctly.",
  },
  {
    id: "report",
    task: "Set the report name, units, reference information, comments, flags, and required EHR display.",
    owner: "laboratory",
    explanation: "The laboratory owns the report and approves how it appears in the EHR. Analysts configure the build to the laboratory's requirements.",
  },
  {
    id: "workflow",
    task: "Turn the laboratory workflow into an end-to-end build and test plan.",
    owner: "pathology-informatics",
    explanation: "Pathology informatics connects laboratory practice with the technical build. The pathologist or laboratory director still gives clinical approval.",
  },
  {
    id: "cds",
    task: "Help design an EHR alert that uses the new result together with diagnoses and medications.",
    owner: "clinical-informatics",
    explanation: "Clinical informatics helps design and govern the broader EHR and CDS workflow with the clinical service. Pathology reviews how the laboratory result is interpreted and used; clinical informatics does not own the laboratory report.",
  },
  {
    id: "operations",
    task: "Finish the SOPs, staffing, training, and go-live coverage.",
    owner: "laboratory-administration",
    explanation: "Laboratory administration prepares the service to run. The pathologist or laboratory director provides medical oversight.",
  },
];

export const orientationViews: { id: string; prompt: string; answer: OrientationViewId; explanation: string }[] = [
  {
    id: "corrected-specimen",
    prompt: "Which accession and specimen produced the corrected troponin result?",
    answer: "specimen",
    explanation: "Start with the specimen-centered record: patient and specimen identification, accession, processing, result history, verification, and correction.",
  },
  {
    id: "patient-trend",
    prompt: "How does the result appear with the patient's earlier values, encounter, and treatment?",
    answer: "patient",
    explanation: "This is the patient-centered EHR view: results over time and in the context of the rest of the patient's care.",
  },
  {
    id: "corrected-cds",
    prompt: "Should a corrected result trigger the EHR alert again?",
    answer: "both",
    explanation: "Both views are needed. The laboratory must establish what the corrected result means; the EHR and CDS teams must define what happens in the patient workflow.",
  },
];

export const orientationViewOptions: { id: OrientationViewId; label: string }[] = [
  { id: "specimen", label: "Specimen / laboratory view" },
  { id: "patient", label: "Patient / EHR view" },
  { id: "both", label: "Both views" },
];

export const goLiveEvidence = [
  { label: "Analyzer to EHR", value: "Transmission tests passed", tone: "positive" },
  { label: "Laboratory report", value: "Interpretive comment is clipped", tone: "critical" },
  { label: "Proposed EHR alert", value: "Result use not reviewed by pathology", tone: "warning" },
  { label: "SOP and training", value: "Not complete", tone: "critical" },
] as const;
