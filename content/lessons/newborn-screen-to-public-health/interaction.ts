export type NbsConfig = { observation: string; answers: string; identity: string; repeats: string };
export const originalNbs: NbsConfig = {
  observation: "local",
  answers: "text",
  identity: "authority",
  repeats: "version",
};
export const approvedNbs: NbsConfig = {
  observation: "overall",
  answers: "coded",
  identity: "authority",
  repeats: "version",
};
export const nbsCases = [
  {
    id: "NB-01",
    answer: "referral",
    identity: true,
    status: "F",
    duplicate: false,
    expected: "Referral worklist",
    note: "The laboratory has already called this an immediate referral. The program has to keep that meaning and put the case where its staff will see it.",
  },
  {
    id: "NB-02",
    answer: "range",
    identity: true,
    status: "F",
    duplicate: false,
    expected: "Routine record",
    note: "An in-range result should not turn into an urgent referral just because the message was fixed.",
  },
  {
    id: "NB-03",
    answer: "unsatisfactory",
    identity: true,
    status: "F",
    duplicate: false,
    expected: "Specimen follow-up",
    note: "An unsuitable specimen needs follow-up; it is not a normal screen.",
  },
  {
    id: "NB-04",
    answer: "referral",
    identity: false,
    status: "F",
    duplicate: false,
    expected: "Identity exception",
    note: "The infant's identifier has no assigning authority. On its own, a local identifier could belong to different infants at different hospitals.",
  },
  {
    id: "NB-05",
    answer: "referral",
    identity: true,
    status: "F",
    duplicate: true,
    expected: "Existing message retained",
    note: "This is NB-01 sent again, with the same control number and report version. It must not create a second referral.",
  },
  {
    id: "NB-06",
    answer: "range",
    identity: true,
    status: "C",
    duplicate: false,
    expected: "Correction review",
    note: "A corrected version of NB-01 replaces the earlier interpretation. Staff have to check the follow-up already under way; it must not be quietly closed.",
  },
  {
    id: "NB-07",
    answer: "unknown",
    identity: true,
    status: "F",
    duplicate: false,
    expected: "Terminology exception",
    note: "The unrecognized answer stays in view for review instead of becoming normal.",
  },
  {
    id: "NB-08",
    answer: "referral",
    identity: true,
    status: "P",
    duplicate: false,
    expected: "Preliminary review",
    note: "A preliminary result does not go through the routing this program uses for final reports.",
  },
] as const;
export function nbsReplay(config: NbsConfig) {
  return nbsCases.map((row) => {
    let action: string;
    if (!row.identity && config.identity === "authority") action = "Identity exception";
    else if (row.duplicate && config.repeats === "version") action = "Existing message retained";
    else if (row.status === "C" && config.repeats === "version") action = "Correction review";
    else if (row.status === "P") action = "Preliminary review";
    else if (
      config.observation !== "overall" ||
      config.answers !== "coded" ||
      row.answer === "unknown"
    )
      action = "Terminology exception";
    else
      action =
        row.answer === "referral"
          ? "Referral worklist"
          : row.answer === "range"
            ? "Routine record"
            : "Specimen follow-up";
    return { ...row, action, pass: action === row.expected };
  });
}
export const nbsFields = [
  {
    label: "Observation mapping",
    key: "observation",
    options: [
      ["local", "NBS_SUM · local"],
      ["overall", "57130-7 · overall screen"],
      ["condition", "46746-4 · PKU-related"],
    ],
    notes: {
      local:
        "The program has no translation for NBS_SUM. A name a person can read is not a test code the program can use.",
      overall:
        "This field sums up the whole screen. The LOINC code you chose covers exactly the same thing.",
      condition:
        "This code is for an interpretation about one condition. Using it for the overall screen changes what the result says.",
    },
  },
  {
    label: "Answer representation",
    key: "answers",
    options: [
      ["text", "Local answer text"],
      ["coded", "Agreed coded answers"],
    ],
    notes: {
      text: "The program stores this text but cannot use it in its routing rules, which need codes.",
      coded:
        "REFERRAL → LA25817-0; IN_RANGE → LA12428-1; UNSAT → LA16205-9, each marked with coding system LN. Unknown answers stay as exceptions.",
    },
  },
  {
    label: "Infant identity",
    key: "identity",
    options: [
      ["authority", "Identifier + authority"],
      ["number", "Identifier number only"],
    ],
    notes: {
      authority: "A missing authority is an identity problem that someone has to sort out.",
      number:
        "Identifier 004812 may exist at more than one hospital. Guessing which one can attach the report to the wrong infant.",
    },
  },
  {
    label: "Retransmissions and corrections",
    key: "repeats",
    options: [
      ["version", "Match message and version"],
      ["new", "Every message is new"],
    ],
    notes: {
      version:
        "An exact repeat uses the existing record; a corrected version goes for correction review.",
      new: "A repeat send can create a duplicate referral, and a correction can end up as a separate routine record that nobody links to the original.",
    },
  },
] as const;

export const additionalExercises = {
  order: [
    { id: "need", label: "Define the laboratory need and search existing terms", rank: 1 },
    { id: "evidence", label: "Document the missing definition and intended use", rank: 2 },
    {
      id: "submit",
      label: "Submit the request to the responsible standards organization",
      rank: 3,
    },
    { id: "review", label: "Review the published decision and approved definition", rank: 4 },
    { id: "test", label: "Test the implemented mapping with the receiving program", rank: 5 },
  ],
  title: "Request a standards change",
  purpose:
    "Match each laboratory need to the organization that maintains or applies the standard involved.",
  questions: [
    {
      id: "HL7",
      prompt: "A result-message field needs a clearer implementation rule.",
      answer: "HL7",
      choices: [
        {
          id: "HL7",
          label: "HL7 International",
        },
        {
          id: "LOINC",
          label: "Regenstrief / LOINC",
        },
        {
          id: "SNOMED",
          label: "SNOMED International",
        },
        {
          id: "IHE",
          label: "IHE",
        },
        {
          id: "ISO",
          label: "ISO",
        },
        {
          id: "ONC",
          label: "ASTP/ONC",
        },
      ],
      feedback:
        "HL7 writes the message and resource specifications; use its published process for proposals and review.",
    },
    {
      id: "LOINC",
      prompt: "A new observation needs an appropriate standardized test identifier.",
      answer: "LOINC",
      choices: [
        {
          id: "HL7",
          label: "HL7 International",
        },
        {
          id: "LOINC",
          label: "Regenstrief / LOINC",
        },
        {
          id: "SNOMED",
          label: "SNOMED International",
        },
        {
          id: "IHE",
          label: "IHE",
        },
        {
          id: "ISO",
          label: "ISO",
        },
        {
          id: "ONC",
          label: "ASTP/ONC",
        },
      ],
      feedback:
        "Search the existing LOINC codes and gather the details of the assay. If no code fits, send in a written request.",
    },
    {
      id: "SNOMED",
      prompt: "A clinical concept needs terminology review.",
      answer: "SNOMED",
      choices: [
        {
          id: "HL7",
          label: "HL7 International",
        },
        {
          id: "LOINC",
          label: "Regenstrief / LOINC",
        },
        {
          id: "SNOMED",
          label: "SNOMED International",
        },
        {
          id: "IHE",
          label: "IHE",
        },
        {
          id: "ISO",
          label: "ISO",
        },
        {
          id: "ONC",
          label: "ASTP/ONC",
        },
      ],
      feedback:
        "SNOMED CT covers clinical concepts. Send the definition and an example of its use through SNOMED's request process.",
    },
    {
      id: "IHE",
      prompt: "Several existing standards need combining into one tested process.",
      answer: "IHE",
      choices: [
        {
          id: "HL7",
          label: "HL7 International",
        },
        {
          id: "LOINC",
          label: "Regenstrief / LOINC",
        },
        {
          id: "SNOMED",
          label: "SNOMED International",
        },
        {
          id: "IHE",
          label: "IHE",
        },
        {
          id: "ISO",
          label: "ISO",
        },
        {
          id: "ONC",
          label: "ASTP/ONC",
        },
      ],
      feedback:
        "Integrating the Healthcare Enterprise publishes profiles that combine several standards for one task.",
    },
    {
      id: "ISO",
      prompt: "The laboratory needs an international quality standard.",
      answer: "ISO",
      choices: [
        {
          id: "HL7",
          label: "HL7 International",
        },
        {
          id: "LOINC",
          label: "Regenstrief / LOINC",
        },
        {
          id: "SNOMED",
          label: "SNOMED International",
        },
        {
          id: "IHE",
          label: "IHE",
        },
        {
          id: "ISO",
          label: "ISO",
        },
        {
          id: "ONC",
          label: "ASTP/ONC",
        },
      ],
      feedback:
        "The International Organization for Standardization publishes standards including ISO 15189 for medical laboratory quality.",
    },
    {
      id: "ONC",
      prompt: "The team needs the standards named in US EHR certification requirements.",
      answer: "ONC",
      choices: [
        {
          id: "HL7",
          label: "HL7 International",
        },
        {
          id: "LOINC",
          label: "Regenstrief / LOINC",
        },
        {
          id: "SNOMED",
          label: "SNOMED International",
        },
        {
          id: "IHE",
          label: "IHE",
        },
        {
          id: "ISO",
          label: "ISO",
        },
        {
          id: "ONC",
          label: "ASTP/ONC",
        },
      ],
      feedback:
        "ASTP/ONC is a US federal office that names the standards certified EHR software must use; it does not write terminologies.",
    },
    {
      id: "REQUEST",
      prompt: "What should the laboratory do before requesting a new term?",
      answer: "existing",
      choices: [
        {
          id: "existing",
          label: "Check existing terms and document the gap",
        },
        {
          id: "local",
          label: "Assign a standard-looking local code",
        },
        {
          id: "send",
          label: "Send an unlabeled report to the recipient",
        },
      ],
      feedback:
        "Describe the need, search the existing codes, write down the specimen, method, scale and intended use, send it to the maintainer, then test the approved code with the receiving organization.",
    },
  ],
};

export const sectionPurposes = [
  "Work out what the program has to understand beyond a message with a valid structure.",
  "Fix the test and answer codes without breaking identity checks, corrections or repeat sends.",
  "Choose the contact and follow-up checks needed once the connection is fixed.",
];

export const answerDisplay: Record<string, string> = {
  referral: "Immediate referral",
  range: "In range",
  unsatisfactory: "Unsatisfactory specimen",
};
export const statusDisplay: Record<string, string> = {
  F: "Final",
  C: "Corrected",
  P: "Preliminary",
};
