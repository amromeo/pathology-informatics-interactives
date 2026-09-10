export type Destination = "gross" | "cytology" | "frozen" | "review";
export const destinations: Record<Destination, string> = { gross: "Gross room", cytology: "Cytology", frozen: "Frozen-section team", review: "Hold for accessioning review" };
export const procedures = [
  { code: "SP-BX", name: "Routine tissue biopsy", approved: "gross" },
  { code: "SP-EX", name: "Tissue excision — added Monday", approved: "gross" },
  { code: "CY-FNA", name: "Fine-needle aspirate for cytology", approved: "cytology" },
  { code: "SP-FS", name: "Intraoperative frozen section", approved: "frozen" },
] as const;
export type ProcedureCode = typeof procedures[number]["code"];
export type RoutingConfig = { routes: Record<ProcedureCode, Destination>; unmatched: Destination };
export const initialRouting: RoutingConfig = { routes: { "SP-BX": "gross", "SP-EX": "cytology", "CY-FNA": "cytology", "SP-FS": "frozen" }, unmatched: "gross" };
export const routeSpecimen = (code: string, config: RoutingConfig): Destination => Object.hasOwn(config.routes, code) ? config.routes[code as ProcedureCode] : config.unmatched;
export const auditEvents = [
  { id: "collection", time: "07:42", title: "Operating-room collection", actor: "A. Rivera, RN", record: "C-1042-A / requisition SP-EX / patient EDU-2081", detail: "The nurse records a tissue excision and applies patient and container labels. The requisition identifies surgical pathology as the receiving service.", meaning: "This establishes the requested examination and container identity. It does not document laboratory receipt." },
  { id: "receipt", time: "08:11", title: "Accessioning receipt scan", actor: "J. Lee, accessioning", record: "ACC-02 / C-1042-A → S26-1042, part A / EDU-2081", detail: "At the accessioning desk, J. Lee scans the container and confirms the requisition, patient identifier, and part. The LIS records receipt at accessioning.", meaning: "This is the last documented physical location. A later queue assignment is not a later physical scan." },
  { id: "routing", time: "08:12", title: "Automated worklist assignment", actor: "LIS routing service", record: "Procedure SP-EX / dictionary revision 17 / destination CYTO", detail: "The routing process reads the procedure code on the accession. The SP-EX dictionary entry assigns the case to cytology. No staff scan is recorded by this event.", meaning: "The procedure entry explains the unexpected worklist. The barcode resolved to the intended case." },
  { id: "handoff", time: "08:40", title: "Gross-room review", actor: "M. Chen, pathologists’ assistant", record: "S26-1042 absent from gross worklist / no receiving scan", detail: "The assistant compares the operating-room delivery list with the gross-room worklist and asks accessioning to locate C-1042-A. Its current physical location has not yet been confirmed.", meaning: "Absence from a worklist does not prove the container is lost or in cytology. Staff must confirm its location and document the handoff." },
] as const;
export const questions = [
  { id: "location", prompt: "Which location is supported by the last physical scan?", choices: [
    { id: "accessioning", label: "Accessioning at 08:11; its present location still needs confirmation.", correct: true, feedback: "ACC-02 records physical receipt. The 08:12 event only assigns a worklist; it does not establish where the container moved." },
    { id: "cytology", label: "Cytology at 08:12, because that is the assigned worklist.", correct: false, feedback: "The cytology entry was created by software. There is no cytology receiving scan in the record." },
    { id: "gross", label: "The gross room, because surgical pathology is on the requisition.", correct: false, feedback: "The requisition identifies the intended service. It does not document a physical handoff." },
  ] },
  { id: "failure", prompt: "Which record should the LIS analyst inspect to explain the wrong worklist?", choices: [
    { id: "barcode", label: "The barcode format used for every surgical pathology container.", correct: false, feedback: "The scan resolved to S26-1042, part A, and the intended patient. Replacing the barcode does not change SP-EX routing." },
    { id: "dictionary", label: "The SP-EX procedure entry used by the worklist assignment process.", correct: true, feedback: "The audit event names SP-EX and revision 17. Compare its destination with the approved routing table." },
    { id: "patient", label: "The patient registration record used to identify the encounter.", correct: false, feedback: "The patient and part agree across the requisition and receipt scan. The unexpected destination comes from the procedure entry." },
  ] },
] as const;
export const routeCases = [
  { id: "reported", label: "Reported tissue excision", code: "SP-EX", expected: "gross", consequence: "An excision remains on the wrong worklist and gross-room processing may be delayed." },
  { id: "biopsy", label: "Routine biopsy", code: "SP-BX", expected: "gross", consequence: "A previously correct surgical pathology route has changed." },
  { id: "cytology", label: "Fine-needle aspirate", code: "CY-FNA", expected: "cytology", consequence: "A cytology specimen is diverted from its intended preparation team." },
  { id: "urgent", label: "Intraoperative frozen section", code: "SP-FS", expected: "frozen", consequence: "The dedicated intraoperative workflow is bypassed." },
  { id: "unknown", label: "Unrecognized procedure code", code: "SP-NEW", expected: "review", consequence: "A procedure with no approved destination is routed automatically instead of held for clarification." },
] as const;
export const runRoutingCases = (config: RoutingConfig) => routeCases.map((test) => ({ ...test, actual: routeSpecimen(test.code, config), passed: routeSpecimen(test.code, config) === test.expected }));
export const recoveryChoices = [
  { id: "queue-only", label: "Change the queue entry and mark gross-room receipt so the case appears on the worklist.", correct: false, feedback: "Changing the electronic destination cannot establish physical receipt. Do not add a receiving event for a handoff that has not occurred." },
  { id: "locate-handoff", label: "Locate and verify the container, correct its worklist with a documented reason, and record the actual handoff while preserving the original audit trail.", correct: true, feedback: "The recovery plan addresses the existing container separately from future routing. Staff must carry out and document the handoff; the simulation does not create physical evidence." },
  { id: "new-accession", label: "Create a replacement accession and relabel the container under the routine biopsy procedure.", correct: false, feedback: "Identity was already verified. A second accession or substituted procedure can break traceability and misrepresent the requested examination." },
] as const;
export const readyForReview = (config: RoutingConfig, recoveryId: string) => runRoutingCases(config).every((test) => test.passed) && recoveryId === "locate-handoff";
