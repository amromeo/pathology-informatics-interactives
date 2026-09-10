export type NbsConfig = { observation: string; answers: string; identity: string; repeats: string };
export const originalNbs: NbsConfig = { observation: "local", answers: "text", identity: "authority", repeats: "version" };
export const approvedNbs: NbsConfig = { observation: "overall", answers: "coded", identity: "authority", repeats: "version" };
export const nbsCases = [
  { id: "NB-01", answer: "referral", identity: true, status: "F", duplicate: false, expected: "Referral worklist", note: "The laboratory has already assigned the immediate-referral interpretation. The receiver must preserve it and make the case visible to program staff." },
  { id: "NB-02", answer: "range", identity: true, status: "F", duplicate: false, expected: "Routine record", note: "An in-range result should not become an urgent referral merely because the message was repaired." },
  { id: "NB-03", answer: "unsatisfactory", identity: true, status: "F", duplicate: false, expected: "Specimen follow-up", note: "An unsuitable specimen needs follow-up; it is not an in-range screen." },
  { id: "NB-04", answer: "referral", identity: false, status: "F", duplicate: false, expected: "Identity exception", note: "The infant identifier lacks its assigning authority. A local identifier alone may refer to different infants at different facilities." },
  { id: "NB-05", answer: "referral", identity: true, status: "F", duplicate: true, expected: "Existing message retained", note: "This is a retransmission of NB-01 with the same control ID and report version. It must not create another referral." },
  { id: "NB-06", answer: "range", identity: true, status: "C", duplicate: false, expected: "Correction review", note: "A new corrected version of NB-01 replaces an earlier interpretation. Staff must reconcile the existing follow-up; do not silently close it." },
  { id: "NB-07", answer: "unknown", identity: true, status: "F", duplicate: false, expected: "Terminology exception", note: "The unrecognized answer remains visible for review rather than becoming normal." },
  { id: "NB-08", answer: "referral", identity: true, status: "P", duplicate: false, expected: "Preliminary review", note: "A preliminary result does not enter the final-report routing used in this receiver profile." },
] as const;
export function nbsReplay(config: NbsConfig) {
  return nbsCases.map(row => {
    let action: string;
    if (!row.identity && config.identity === "authority") action = "Identity exception";
    else if (row.duplicate && config.repeats === "version") action = "Existing message retained";
    else if (row.status === "C" && config.repeats === "version") action = "Correction review";
    else if (row.status === "P") action = "Preliminary review";
    else if (config.observation !== "overall" || config.answers !== "coded" || row.answer === "unknown") action = "Terminology exception";
    else action = row.answer === "referral" ? "Referral worklist" : row.answer === "range" ? "Routine record" : "Specimen follow-up";
    return { ...row, action, pass: action === row.expected };
  });
}
export const nbsFields = [
  { label: "Observation mapping", key: "observation", options: [["local", "NBS_SUM · local"], ["overall", "57130-7 · overall screen"], ["condition", "46746-4 · PKU-related"]], notes: { local: "The receiver has no NBS_SUM mapping. A readable display name does not establish an observation identifier.", overall: "This source field summarizes the entire screen. The selected LOINC observation has that same scope.", condition: "This code describes a condition-specific interpretation. Applying it to an overall screen changes what the result claims." } },
  { label: "Answer representation", key: "answers", options: [["text", "Local answer text"], ["coded", "Agreed coded answers"]], notes: { text: "The case receiver archives this text but cannot use it in its coded routing rules.", coded: "REFERRAL → LA25817-0; IN_RANGE → LA12428-1; UNSAT → LA16205-9, each with coding system LN. Unknown answers remain exceptions." } },
  { label: "Infant identity", key: "identity", options: [["authority", "Identifier + authority"], ["number", "Identifier number only"]], notes: { authority: "A missing authority is an identity exception requiring reconciliation.", number: "Identifier 004812 may exist at more than one hospital. Guessing the source can attach a report to the wrong infant." } },
  { label: "Retransmissions and corrections", key: "repeats", options: [["version", "Match message and version"], ["new", "Every message is new"]], notes: { version: "An exact retransmission reuses its existing record; a corrected version enters correction review.", new: "A retry can create a duplicate referral, and a correction can become a separate routine record without reconciliation." } },
] as const;
