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
export const flagDisplays: Record<string, string> = { HH: "Critical high", LL: "Critical low", H: "High", L: "Low", N: "Normal" };
export function flagReplay(config: FlagConfig) {
  return flagRecords.map(row => {
    const wire = row.local === "CH" ? config.high : row.local === "CL" ? config.low : row.local;
    const display = flagDisplays[wire] ?? (config.unknown === "normal" ? "Normal" : "Review unmapped flag");
    return { ...row, wire, display, pass: display === row.expected };
  });
}
export const flagFields = [
  { id: "OBX-3", value: "K^Potassium^L", meaning: "Identifies the observation. K is this laboratory's local potassium identifier; L names the local coding system. It is not the result or severity." },
  { id: "OBX-5", value: "6.8", meaning: "Carries the numerical result. Preserving this number does not prove that units, flags, or report status were preserved." },
  { id: "OBX-6", value: "mmol/L", meaning: "Carries the unit. A changed unit without a corresponding validated numeric conversion changes clinical meaning." },
  { id: "OBX-7", value: "3.5-5.0", meaning: "Carries reference information for this result. The reference interval is not a definition of the laboratory's critical limits." },
  { id: "OBX-8", value: "CH", meaning: "Carries the interpretation flag. The sender uses CH for critical high; this receiver's agreed table uses HH. The interface must preserve the category when translating it." },
  { id: "OBX-11", value: "F", meaning: "Identifies a final observation. A final status is separate from the severity flag; F does not mean normal." },
];
export const flagTrace = [
  { title: "LIS verified result", record: "Accession FL-01 · Potassium 6.8 mmol/L · CH · Final\nCritical-result call: documented at 08:03", note: "The LIS retains the critical category and its communication record. Inspect what was sent next." },
  { title: "Interface outbound record", record: "08:04 · message F001 · transformation revision 12\nOBX|1|NM|K^Potassium^L||6.8|mmol/L|3.5-5.0|CH|||F", note: "The outbound flag is still CH. The numeric value and status arrived in their expected fields." },
  { title: "Receiver import log", record: "08:04 · F001 · MSA|AA|F001\nObservation stored · interpretation CH not in display table", note: "This receiver acknowledges application acceptance and logs an unknown interpretation. That behavior is specific to its contract; an acknowledgment is not a screenshot of the clinical report." },
  { title: "EHR laboratory report", record: "FL-01 · Potassium 6.8 mmol/L\nReference 3.5–5.0 · Final · severity indicator unavailable", note: "The report is incomplete even though the number is correct. Verify the official laboratory report and any reused result views after the change." },
];
