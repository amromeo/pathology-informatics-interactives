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
    meaning: "Message type, trigger event and structure: an unsolicited observation result.",
  },
  {
    id: "MSH-10",
    value: "F001",
    meaning:
      "Message control ID. The acknowledgment echoes it in MSA-2 so the sender can match the response.",
  },
  { id: "MSH-12", value: "2.5.1", meaning: "HL7 version used by this interface agreement." },
  {
    id: "PID-3",
    value: "MRN0041872^^^HOSP^MR",
    meaning:
      "Patient identifier with its assigning authority. The same number at another hospital may identify a different patient.",
  },
  { id: "OBR-3", value: "FL-01^LIS", meaning: "Filler order number assigned by the laboratory." },
  {
    id: "OBR-25",
    value: "F",
    meaning: "Result status for the order: final. This is separate from a critical flag.",
  },

  {
    id: "OBX-3",
    value: "K^Potassium^L",
    meaning:
      "Identifies the observation. K is this laboratory's local potassium identifier; L names the local coding system. It is not the result or severity.",
  },
  {
    id: "OBX-5",
    value: "6.8",
    meaning:
      "Carries the numerical result. Preserving this number does not prove that units, flags, or report status were preserved.",
  },
  {
    id: "OBX-6",
    value: "mmol/L",
    meaning:
      "Carries the unit. A changed unit without a corresponding validated numeric conversion changes clinical meaning.",
  },
  {
    id: "OBX-7",
    value: "3.5-5.0",
    meaning:
      "Carries reference information for this result. The reference interval is not a definition of the laboratory's critical limits.",
  },
  {
    id: "OBX-8",
    value: "CH",
    meaning:
      "Abnormal Flags in version 2.5.1, called Interpretation Codes from version 2.7. CH, CL and XH are this sender's local codes. The sender uses CH for critical high; this receiver's agreed table uses HH. The interface must preserve the category when translating it.",
  },
  {
    id: "OBX-11",
    value: "F",
    meaning:
      "Identifies a final observation. A final status is separate from the severity flag; F does not mean normal.",
  },
];
export const flagTrace = [
  {
    title: "LIS verified result",
    record:
      "Accession FL-01 · Potassium 6.8 mmol/L · CH · Final\nCritical-result call: documented at 08:03",
    note: "The LIS retains the critical category and its communication record. Inspect what was sent next.",
  },
  {
    title: "Interface outbound record",
    record: outboundMessage,
    note: "The outbound flag is still CH. The numeric value and status arrived in their expected fields.",
  },
  {
    title: "Receiver import log",
    record:
      "08:04 · F001 · MSA|AA|F001\nObservation stored · interpretation CH not in display table",
    note: "This receiver acknowledges application acceptance and logs an unknown interpretation. That behavior is specific to its contract; an acknowledgment is not a screenshot of the clinical report.",
  },
  {
    title: "EHR laboratory report",
    record:
      "FL-01 · Potassium 6.8 mmol/L\nReference 3.5–5.0 · Final · severity indicator unavailable",
    note: "The report is incomplete even though the number is correct. Verify the official laboratory report and any reused result views after the change.",
  },
];

export const additionalExercises = {
  title: "Identify the laboratory interface",
  purpose:
    "Distinguish message routing from the work performed between analyzers and the laboratory system.",
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
        "A unidirectional interface sends results in one direction. A valid result feed does not show that order download is supported.",
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
        "Host query retrieves orders for the scanned identifier. Verify the specimen association and the returned tests.",
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
        "Order download sends work ahead of testing. Test additions, cancellations and duplicates as well as the initial list.",
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
        "An interface engine routes and translates messages. Instrument middleware may also perform release, delta and reflex checks before the LIS receives a result.",
    },
  ],
};

export const sectionPurposes = [
  "Follow the same potassium result from the analyzer to the chart.",
  "Locate the message fields that identify the patient, order, result and critical flag.",
  "Repair the flag mapping while preserving high, low, normal and unrecognized values.",
  "Check whether the complete report and previously affected results need correction.",
];
