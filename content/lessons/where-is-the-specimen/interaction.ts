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
      "The nurse recorded the examination requested and labeled the container at collection. Look for a later receiving event to follow it into the laboratory.",
  },
  {
    id: "receipt",
    time: "08:11",
    title: "Accessioning receipt scan",
    actor: "J. Lee, accessioning",
    record: "ACC-02 / C-1042-A → S26-1042, part A / EDU-2081",
    detail:
      "At the accessioning desk, J. Lee scans the container and checks the requisition, patient identifier and part. The LIS records receipt at accessioning.",
    meaning:
      "J. Lee recorded receipt at accessioning at 08:11. Look at who recorded the next event, and what it records, before deciding where the container went next.",
  },
  {
    id: "routing",
    time: "08:12",
    title: "Automated worklist assignment",
    actor: "LIS routing service",
    record: "Procedure SP-EX / dictionary revision 17 / destination CYTO",
    detail:
      "The routing program reads the procedure code on the accession. The SP-EX dictionary entry sends the case to cytology. Nobody scanned anything in this event.",
    meaning: "The procedure entry explains the wrong worklist. The barcode opened the right case.",
  },
  {
    id: "handoff",
    time: "08:40",
    title: "Gross-room review",
    actor: "T. Nguyen, pathologists’ assistant",
    record: "S26-1042 absent from gross worklist / no receiving scan",
    detail:
      "The assistant compares the operating room's delivery list with the gross-room worklist and asks accessioning to find C-1042-A. Nobody has yet confirmed where it is.",
    meaning:
      "The assistant has found a case missing from the worklist and a handoff nobody recorded. Staff need to find C-1042-A and record who receives it next.",
  },
] as const;
export const questions = [
  {
    id: "location",
    prompt: "Where does the last physical scan place the container?",
    choices: [
      {
        id: "accessioning",
        label: "Accessioning at 08:11; its present location still needs confirmation.",
        correct: true,
        feedback:
          "At 08:11, J. Lee recorded receiving the container at accessioning workstation ACC-02. The next event was recorded by the routing service, not a person. Staff still need to find the container and record its next handoff.",
      },
      {
        id: "cytology",
        label: "Cytology at 08:12, because that is the assigned worklist.",
        correct: false,
        feedback:
          "Software created the cytology entry. Nobody in cytology scanned the container in.",
      },
      {
        id: "gross",
        label: "The gross room, because surgical pathology is on the requisition.",
        correct: false,
        feedback:
          "Surgical pathology is where the container should go. To show that its staff received it, you need a receiving event with a person, a place and a time. The latest one is at accessioning.",
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
          "The scan opened S26-1042, part A, for the right patient. A new barcode would not change where SP-EX is routed.",
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
          "The patient and part match on the requisition and the receipt scan. The wrong destination comes from the procedure entry.",
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
      "An excision stays on the wrong worklist, and gross-room processing may be delayed.",
  },
  {
    id: "biopsy",
    label: "Routine biopsy",
    code: "SP-BX",
    expected: "gross",
    consequence: "A surgical pathology route that used to work has changed.",
  },
  {
    id: "cytology",
    label: "Fine-needle aspirate",
    code: "CY-FNA",
    expected: "cytology",
    consequence: "A cytology specimen goes to the wrong preparation team.",
  },
  {
    id: "urgent",
    label: "Intraoperative frozen section",
    code: "SP-FS",
    expected: "frozen",
    consequence: "The frozen section skips the team set up to handle it during surgery.",
  },
  {
    id: "unknown",
    label: "Unrecognized procedure code",
    code: "SP-NEW",
    expected: "review",
    consequence:
      "A procedure with no approved destination is sent somewhere automatically instead of being held until someone checks it.",
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
      "This would record receipt in the gross room before anyone had handed the container over. Correct the worklist assignment and ask staff to find the container. Record receipt when the gross-room team actually receives it.",
  },
  {
    id: "locate-handoff",
    label: "Verify the container, correct the worklist and document its handoff.",
    correct: true,
    feedback:
      "Ask accessioning staff to find C-1042-A and check its accession and part. Correct the worklist assignment following the local procedure, then have the receiving team record the handoff when it happens. Keep the original events in the history.",
  },
  {
    id: "new-accession",
    label:
      "Create a replacement accession and relabel the container under the routine biopsy procedure.",
    correct: false,
    feedback:
      "The container's identity was already checked. A second accession or a different procedure would break the trail back to the original order and misrecord what was requested.",
  },
] as const;
export const readyForReview = (config: RoutingConfig, recoveryId: string) =>
  runRoutingCases(config).every((test) => test.passed) && recoveryId === "locate-handoff";

export const additionalExercises = {
  title: "From the order to the worklist",
  purpose:
    "Decide which laboratory records help with ordering and tracking in anatomic and clinical pathology.",
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
        "Anatomic pathology records the case, parts, blocks and slides. The links between them have to stay intact through routing and image linking.",
      feedbackByChoice: {
        ap: "This structure follows an AP case into its parts, blocks and slides. The LIS has to keep those links intact when work is assigned or images are linked.",
        cp: "A chemistry order, test and result is the CP example. This question describes the linked parts, blocks and slides of an AP case.",
        both: "Both services need to identify and track specimens. But the structure described here, case to part to block to slide, is the AP example.",
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
        "Clinical pathology usually links an order, specimen, test and result. Blood bank, microbiology and molecular testing may use their own specialized systems.",
      feedbackByChoice: {
        ap: "The AP example follows parts, blocks and slides. Here the order creates individual chemistry tests with numeric results, which is the CP structure.",
        cp: "The order links the specimen to individual chemistry tests and their results. Each result must remain attached to that order and specimen through review and reporting.",
        both: "Both services use orders and specimens. But this example, a chemistry order that creates individual tests with numeric results, is the CP structure.",
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
        "Both need clear names and specimen requirements. The catalog helps clinicians choose the right test and helps staff collect the right material.",
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
        "Both use questions at ordering to collect what staff need for processing and interpretation. Check the question and the field its answer is saved in.",
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
        "Duplicate checks, reflex tests and test information can help clinicians order the right tests in every laboratory section. Leave room for exceptions when there is a clinical reason.",
      feedbackByChoice: {
        ap: "AP can use duplicate-order review, and repeated CP requests may also need clarification before another specimen or test is processed.",
        cp: "CP can use duplicate-order review, and AP staff may also need to clarify apparently repeated requests for the same examination.",
        both: "Duplicate-order review can help in every laboratory section. Staff need enough information to tell a repeated request from two examinations that were both meant.",
      },
    },
  ],
};
