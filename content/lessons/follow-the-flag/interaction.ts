export const outboundMessage =
  "MSH|^~\\&|LIS|CORE_LAB|EHR|HOSP|20261022080400||ORU^R01^ORU_R01|F001|P|2.5.1\nPID|1||MRN0041872^^^HOSP^MR||RIVERA^ANA||19580314|F\nOBR|1|ORD55120^EHR|FL-01^LIS|K^Potassium^L|||20261022071500|||||||||||||||20261022080300|||F\nOBX|1|NM|K^Potassium^L||6.8|mmol/L|3.5-5.0|CH|||F";
export const flagRecords = [
  { id: "FL-01", value: "6.8", local: "CH", expected: "Critical high" },
  { id: "FL-02", value: "2.4", local: "CL", expected: "Critical low" },
  { id: "FL-03", value: "5.3", local: "H", expected: "High" },
  { id: "FL-04", value: "3.2", local: "L", expected: "Low" },
  { id: "FL-05", value: "4.2", local: "N", expected: "Normal" },
  { id: "FL-06", value: "5.8", local: "XH", expected: "Review unmapped flag" },
] as const;
export type FlagConfig = { high: string; low: string; unknown: string };
export const originalFlag: FlagConfig = { high: "CH", low: "CL", unknown: "review" };
export const approvedFlag: FlagConfig = { high: "HH", low: "LL", unknown: "review" };
export const flagDisplays: Record<string, string> = {
  HH: "Critical high",
  LL: "Critical low",
  H: "High",
  L: "Low",
  N: "Normal",
};
export function flagReplay(config: FlagConfig) {
  return flagRecords.map((row) => {
    const wire = row.local === "CH" ? config.high : row.local === "CL" ? config.low : row.local;
    const display =
      flagDisplays[wire] ?? (config.unknown === "normal" ? "Normal" : "Review unmapped flag");
    return { ...row, wire, display, pass: display === row.expected };
  });
}
export const flagFields = [
  {
    id: "MSH-9",
    value: "ORU^R01^ORU_R01",
    meaning: "Message type, trigger event and structure: a result sent without being asked for.",
  },
  {
    id: "MSH-10",
    value: "F001",
    meaning:
      "Message control number. The acknowledgment repeats it in MSA-2 so the sender can match the reply to the message.",
  },
  { id: "MSH-12", value: "2.5.1", meaning: "HL7 version used by this interface agreement." },
  {
    id: "PID-3",
    value: "MRN0041872^^^HOSP^MR",
    meaning:
      "Patient identifier, with the organization that issued it. The same number at another hospital may belong to a different patient.",
  },
  { id: "OBR-3", value: "FL-01^LIS", meaning: "Filler order number assigned by the laboratory." },
  {
    id: "OBR-25",
    value: "F",
    meaning: "Status of the order's results: final. This has nothing to do with the critical flag.",
  },

  {
    id: "OBX-3",
    value: "K^Potassium^L",
    meaning:
      "Names the test. K is this laboratory's own code for potassium, and L says the code is a local one. It is not the result or its severity.",
  },
  {
    id: "OBX-5",
    value: "6.8",
    meaning:
      "Carries the number. The number coming through correctly does not show that the unit, flag or status did.",
  },
  {
    id: "OBX-6",
    value: "mmol/L",
    meaning:
      "Carries the unit. Changing the unit without correctly converting the number changes what the result means.",
  },
  {
    id: "OBX-7",
    value: "3.5-5.0",
    meaning:
      "Carries the reference interval for this result. The reference interval is not the laboratory's critical limits.",
  },
  {
    id: "OBX-8",
    value: "CH",
    meaning:
      "Called Abnormal Flags in version 2.5.1 and Interpretation Codes from version 2.7 on. CH, CL and XH are this laboratory's own codes. The laboratory uses CH for critical high; the EHR's agreed table uses HH. The interface has to keep the meaning when it translates the code.",
  },
  {
    id: "OBX-11",
    value: "F",
    meaning:
      "Marks the result as final. Final status has nothing to do with the flag; F does not mean normal.",
  },
];
export const flagTrace = [
  {
    title: "LIS verified result",
    record:
      "Accession FL-01 · Potassium 6.8 mmol/L · CH · Final\nCritical-result call: documented at 08:03",
    note: "The LIS still has the critical flag and the record of the phone call. Look at what was sent next.",
  },
  {
    title: "Interface outbound record",
    record: outboundMessage,
    note: "The flag going out is still CH. The number and status are in the right fields.",
  },
  {
    title: "Receiver import log",
    record:
      "08:04 · F001 · MSA|AA|F001\nObservation stored · interpretation CH not in display table",
    note: "This EHR confirms it accepted the message and logs the flag it did not recognize. That is how this particular EHR is set up; an acknowledgment is not a picture of the report clinicians see.",
  },
  {
    title: "EHR laboratory report",
    record:
      "FL-01 · Potassium 6.8 mmol/L\nReference 3.5–5.0 · Final · severity indicator unavailable",
    note: "The report is incomplete even though the number is right. After the fix, check the official laboratory report and any other screen that shows this result.",
  },
];

export const additionalExercises = {
  title: "Identify the laboratory interface",
  purpose:
    "Tell the program that passes messages between systems apart from the work done between the analyzers and the LIS.",
  questions: [
    {
      id: "IF1",
      prompt:
        "The analyzer sends results but cannot receive orders. What kind of interface is this?",
      answer: "one",
      choices: [
        {
          id: "one",
          label: "Unidirectional instrument interface",
        },
        {
          id: "query",
          label: "Bidirectional host query",
        },
        {
          id: "download",
          label: "Bidirectional order download",
        },
        {
          id: "engine",
          label: "Interface engine routing",
        },
      ],
      feedback:
        "A one-way interface only sends results. Results arriving correctly does not show that orders can be sent to the analyzer.",
    },
    {
      id: "IF2",
      prompt:
        "After a barcode scan, the analyzer asks which tests are ordered. What mechanism is used?",
      answer: "query",
      choices: [
        {
          id: "one",
          label: "Unidirectional instrument interface",
        },
        {
          id: "query",
          label: "Bidirectional host query",
        },
        {
          id: "download",
          label: "Bidirectional order download",
        },
        {
          id: "engine",
          label: "Interface engine routing",
        },
      ],
      feedback:
        "Host query fetches the orders for the barcode just scanned. Check that the right specimen and the right tests come back.",
    },
    {
      id: "IF3",
      prompt: "The LIS sends the next worklist to the analyzer in advance. What mechanism is used?",
      answer: "download",
      choices: [
        {
          id: "one",
          label: "Unidirectional instrument interface",
        },
        {
          id: "query",
          label: "Bidirectional host query",
        },
        {
          id: "download",
          label: "Bidirectional order download",
        },
        {
          id: "engine",
          label: "Interface engine routing",
        },
      ],
      feedback:
        "Order download sends the work ahead of testing. Test added tests, cancellations and duplicates as well as the first list.",
    },
    {
      id: "IF4",
      prompt: "An application translates a result message for the EHR. What role is illustrated?",
      answer: "engine",
      choices: [
        {
          id: "one",
          label: "Unidirectional instrument interface",
        },
        {
          id: "query",
          label: "Bidirectional host query",
        },
        {
          id: "download",
          label: "Bidirectional order download",
        },
        {
          id: "engine",
          label: "Interface engine routing",
        },
      ],
      feedback:
        "An interface engine passes messages on and translates them. Instrument middleware may also run release, delta and reflex checks before a result reaches the LIS.",
    },
  ],
};

export const sectionPurposes = [
  "Follow the same potassium result from the analyzer to the chart.",
  "Locate the message fields that identify the patient, order, result and critical flag.",
  "Fix the flag translation without breaking high, low, normal or unrecognized flags.",
  "Check whether the full report, and results already sent, need correcting.",
];
