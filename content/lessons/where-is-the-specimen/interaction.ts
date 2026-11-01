export type Destination = "gross" | "cytology" | "frozen" | "review";
export const destinations: Record<Destination, string> = {
  gross: "Gross room",
  cytology: "Cytology",
  frozen: "Frozen-section team",
  review: "Hold for accessioning review",
};
export const procedures = [
  { code: "SP-BX", name: "Routine tissue biopsy", approved: "gross" },
  { code: "SP-EX", name: "Tissue excision — added Monday", approved: "gross" },
  { code: "CY-FNA", name: "Fine-needle aspirate for cytology", approved: "cytology" },
  { code: "SP-FS", name: "Intraoperative frozen section", approved: "frozen" },
] as const;
export type ProcedureCode = (typeof procedures)[number]["code"];
export type RoutingConfig = { routes: Record<ProcedureCode, Destination>; unmatched: Destination };
export const initialRouting: RoutingConfig = {
  routes: { "SP-BX": "gross", "SP-EX": "cytology", "CY-FNA": "cytology", "SP-FS": "frozen" },
  unmatched: "gross",
};
export const routeSpecimen = (code: string, config: RoutingConfig): Destination =>
  Object.hasOwn(config.routes, code) ? config.routes[code as ProcedureCode] : config.unmatched;
export const auditEvents = [
  {
    id: "collection",
    time: "07:42",
    title: "Operating-room collection",
    actor: "A. Rivera, RN",
    record: "C-1042-A / requisition SP-EX / patient EDU-2081",
    detail:
      "The nurse records a tissue excision and applies patient and container labels. The requisition identifies surgical pathology as the receiving service.",
    meaning:
      "The nurse documented the requested examination and labeled container at collection. Look for a later receiving event to follow it into the laboratory.",
  },
  {
    id: "receipt",
    time: "08:11",
    title: "Accessioning receipt scan",
    actor: "J. Lee, accessioning",
    record: "ACC-02 / C-1042-A → S26-1042, part A / EDU-2081",
    detail:
      "At the accessioning desk, J. Lee scans the container and confirms the requisition, patient identifier, and part. The LIS records receipt at accessioning.",
    meaning:
      "J. Lee documented receipt at accessioning at 08:11. Compare the author and action in the following event before concluding where the container went next.",
  },
  {
    id: "routing",
    time: "08:12",
    title: "Automated worklist assignment",
    actor: "LIS routing service",
    record: "Procedure SP-EX / dictionary revision 17 / destination CYTO",
    detail:
      "The routing process reads the procedure code on the accession. The SP-EX dictionary entry assigns the case to cytology. No staff scan is recorded by this event.",
    meaning:
      "The procedure entry explains the unexpected worklist. The barcode resolved to the intended case.",
  },
  {
    id: "handoff",
    time: "08:40",
    title: "Gross-room review",
    actor: "T. Nguyen, pathologists’ assistant",
    record: "S26-1042 absent from gross worklist / no receiving scan",
    detail:
      "The assistant compares the operating-room delivery list with the gross-room worklist and asks accessioning to locate C-1042-A. Its current physical location has not yet been confirmed.",
    meaning:
      "The assistant identifies a missing assignment and an undocumented handoff. Staff need to locate C-1042-A and record who receives it next.",
  },
] as const;
export const questions = [
  {
    id: "location",
    prompt: "Which location is supported by the last physical scan?",
    choices: [
      {
        id: "accessioning",
        label: "Accessioning at 08:11; its present location still needs confirmation.",
        correct: true,
        feedback:
          "At 08:11, J. Lee recorded physical receipt at accessioning workstation ACC-02. The next event names the routing service as its author. Staff still need to find the container and document its next handoff.",
      },
      {
        id: "cytology",
        label: "Cytology at 08:12, because that is the assigned worklist.",
        correct: false,
        feedback:
          "The cytology entry was created by software. There is no cytology receiving scan in the record.",
      },
      {
        id: "gross",
        label: "The gross room, because surgical pathology is on the requisition.",
        correct: false,
        feedback:
          "Surgical pathology is the intended service. To confirm that its staff received the container, look for a receiving event with a person, location and time. The latest such event is at accessioning.",
      },
    ],
  },
  {
    id: "failure",
    prompt: "Which record should the LIS analyst inspect to explain the wrong worklist?",
    choices: [
      {
        id: "barcode",
        label: "The barcode format used for every surgical pathology container.",
        correct: false,
        feedback:
          "The scan resolved to S26-1042, part A, and the intended patient. Replacing the barcode does not change SP-EX routing.",
      },
      {
        id: "dictionary",
        label: "The SP-EX procedure entry used by the worklist assignment process.",
        correct: true,
        feedback:
          "The audit event names SP-EX and revision 17. Compare its destination with the approved routing table.",
      },
      {
        id: "patient",
        label: "The patient registration record used to identify the encounter.",
        correct: false,
        feedback:
          "The patient and part agree across the requisition and receipt scan. The unexpected destination comes from the procedure entry.",
      },
    ],
  },
] as const;
export const routeCases = [
  {
    id: "reported",
    label: "Reported tissue excision",
    code: "SP-EX",
    expected: "gross",
    consequence:
      "An excision remains on the wrong worklist and gross-room processing may be delayed.",
  },
  {
    id: "biopsy",
    label: "Routine biopsy",
    code: "SP-BX",
    expected: "gross",
    consequence: "A previously correct surgical pathology route has changed.",
  },
  {
    id: "cytology",
    label: "Fine-needle aspirate",
    code: "CY-FNA",
    expected: "cytology",
    consequence: "A cytology specimen is diverted from its intended preparation team.",
  },
  {
    id: "urgent",
    label: "Intraoperative frozen section",
    code: "SP-FS",
    expected: "frozen",
    consequence: "The dedicated intraoperative workflow is bypassed.",
  },
  {
    id: "unknown",
    label: "Unrecognized procedure code",
    code: "SP-NEW",
    expected: "review",
    consequence:
      "A procedure with no approved destination is routed automatically instead of held for clarification.",
  },
] as const;
export const runRoutingCases = (config: RoutingConfig) =>
  routeCases.map((test) => ({
    ...test,
    actual: routeSpecimen(test.code, config),
    passed: routeSpecimen(test.code, config) === test.expected,
  }));
export const recoveryChoices = [
  {
    id: "queue-only",
    label:
      "Change the queue entry and mark gross-room receipt so the case appears on the worklist.",
    correct: false,
    feedback:
      "This would record gross-room receipt before anyone had confirmed a handoff. Correct the worklist assignment and ask staff to locate the container. Record receipt when the gross-room team receives it.",
  },
  {
    id: "locate-handoff",
    label: "Verify the container, correct the worklist and document its handoff.",
    correct: true,
    feedback:
      "Ask accessioning staff to locate C-1042-A and verify its accession and part. Correct the existing worklist assignment under the local procedure, then have the receiving team record the actual handoff. Keep the original events in the history.",
  },
  {
    id: "new-accession",
    label:
      "Create a replacement accession and relabel the container under the routine biopsy procedure.",
    correct: false,
    feedback:
      "Identity was already verified. A second accession or substituted procedure can break traceability and misrepresent the requested examination.",
  },
] as const;
export const readyForReview = (config: RoutingConfig, recoveryId: string) =>
  runRoutingCases(config).every((test) => test.passed) && recoveryId === "locate-handoff";

export const additionalExercises = {
  title: "From the order to the worklist",
  purpose:
    "Identify which laboratory records support ordering and tracking in anatomic and clinical pathology.",
  questions: [
    {
      id: "LIS1",
      prompt:
        "A case contains separately labeled parts, blocks and slides. Which workflow is illustrated?",
      answer: "ap",
      choices: [
        {
          id: "ap",
          label: "Anatomic pathology",
        },
        {
          id: "cp",
          label: "Clinical pathology",
        },
        {
          id: "both",
          label: "Both",
        },
      ],
      feedback:
        "Anatomic pathology records the case, parts, blocks and slides. Their relationships must survive routing and image linkage.",
      feedbackByChoice: {
        ap: "This record structure follows an AP case into its parts, blocks and slides. The LIS must preserve those relationships when work is assigned or images are linked.",
        cp: "A chemistry order/test/result record illustrates the CP example. This question describes the linked parts, blocks and slides of an AP case.",
        both: "Both services need specimen identity and tracking. The particular hierarchy described here—case, part, block and slide—is the AP example.",
      },
    },
    {
      id: "LIS2",
      prompt:
        "An order creates individual chemistry tests and numerical results. Which workflow is illustrated?",
      answer: "cp",
      choices: [
        {
          id: "ap",
          label: "Anatomic pathology",
        },
        {
          id: "cp",
          label: "Clinical pathology",
        },
        {
          id: "both",
          label: "Both",
        },
      ],
      feedback:
        "Clinical pathology commonly links an order, specimen, test and result. Specialized systems may handle blood bank, microbiology and molecular testing.",
      feedbackByChoice: {
        ap: "The AP example follows parts, blocks and slides. Here the order creates individual chemistry tests with numeric results, illustrating the CP record structure.",
        cp: "The order links the specimen to individual chemistry tests and their results. Each result must remain attached to that order and specimen through review and reporting.",
        both: "Both services use orders and specimens. The particular example here is a chemistry order generating individual tests and numeric results, the CP structure described above.",
      },
    },
    {
      id: "LIS3",
      prompt: "The catalog states specimen requirements before collection. Where is this useful?",
      answer: "both",
      choices: [
        {
          id: "ap",
          label: "Anatomic pathology",
        },
        {
          id: "cp",
          label: "Clinical pathology",
        },
        {
          id: "both",
          label: "Both",
        },
      ],
      feedback:
        "Both workflows need clear names and specimen requirements. The catalog helps clinicians choose an appropriate order and helps staff collect the right material.",
      feedbackByChoice: {
        ap: "AP benefits from specimen instructions, and CP does too. For example, a chemistry order can specify the collection tube and required volume.",
        cp: "CP benefits from specimen instructions, and AP does too. An examination may need fresh tissue or a particular fixative; the collector needs that instruction before collection.",
        both: "Both need clear names and specimen requirements before collection. The catalog supplies that information to the person requesting or collecting the specimen.",
      },
    },
    {
      id: "LIS4",
      prompt:
        "An order-time question asks the collection site or clinical context. Where is this useful?",
      answer: "both",
      choices: [
        {
          id: "ap",
          label: "Anatomic pathology",
        },
        {
          id: "cp",
          label: "Clinical pathology",
        },
        {
          id: "both",
          label: "Both",
        },
      ],
      feedback:
        "Both workflows use order-time questions to obtain information needed for processing and interpretation. Validate the question and its destination field.",
      feedbackByChoice: {
        ap: "AP can use a site or clinical-context question. CP orders may also need information such as a collection time related to a medication dose.",
        cp: "CP can use order-time questions. AP orders may also need the specimen site or clinical context, linked to the correct case and part.",
        both: "Both can collect information during ordering that staff need later. Check which field stores the answer and whether the receiving team can see it.",
      },
    },
    {
      id: "LIS5",
      prompt:
        "A duplicate check asks the clinician to review an existing order before adding another. Where is this useful?",
      answer: "both",
      choices: [
        {
          id: "ap",
          label: "Anatomic pathology",
        },
        {
          id: "cp",
          label: "Clinical pathology",
        },
        {
          id: "both",
          label: "Both",
        },
      ],
      feedback:
        "Duplicate checks, reflex orderables and test information can support appropriate ordering across laboratory sections. Preserve clinically justified exceptions.",
      feedbackByChoice: {
        ap: "AP can use duplicate-order review, and repeated CP requests may also need clarification before another specimen or test is processed.",
        cp: "CP can use duplicate-order review, and AP staff may also need to clarify apparently repeated requests for the same examination.",
        both: "Duplicate-order review can help across laboratory sections. Staff need enough information to distinguish a repeated request from separately intended examinations.",
      },
    },
  ],
};
