export type ReflexAction = "Order FT4" | "Use existing FT4" | "No reflex" | "Review" | "Outside this rule";
export type ReflexConfig = { lower: number; upper: number; inclusive: boolean; preventDuplicate: boolean; requireFinal: boolean; restrictScope: boolean };
export const originalReflex: ReflexConfig = { lower: 0.40, upper: 4.20, inclusive: false, preventDuplicate: true, requireFinal: true, restrictScope: true };
export const approvedReflex: ReflexConfig = { ...originalReflex, lower: 0.27 };
export type ReflexCase = { id: string; tsh: number | null; age: number; order: "TSH with reflex" | "TSH only"; final: boolean; ft4: "none" | "pending" | "complete"; expected: ReflexAction; purpose: string };
const base = { age: 46, order: "TSH with reflex" as const, final: true, ft4: "none" as const };
export const reflexCases: readonly ReflexCase[] = [
  { ...base, id: "TH-01", tsh: 0.30, expected: "No reflex", purpose: "The displayed interval is current, but an old lower threshold creates an additional order." },
  { ...base, id: "TH-02", tsh: 0.39, expected: "No reflex", purpose: "A second case in the changed interval tests that the repair is not limited to one exact value." },
  { ...base, id: "TH-03", tsh: 0.26, expected: "Order FT4", purpose: "A value just below the approved lower threshold must retain the FT4 order." },
  { ...base, id: "TH-04", tsh: 0.27, expected: "No reflex", purpose: "Exactly at the lower boundary, the strict less-than comparison is false." },
  { ...base, id: "TH-05", tsh: 0.40, expected: "No reflex", purpose: "The old lower boundary and the current interval both permit no reflex here." },
  { ...base, id: "TH-06", tsh: 4.20, expected: "No reflex", purpose: "Exactly at the upper boundary, the strict greater-than comparison is false." },
  { ...base, id: "TH-07", tsh: 4.21, expected: "Order FT4", purpose: "The higher-TSH branch must be preserved during a change to the lower threshold." },
  { ...base, id: "TH-08", tsh: 0.10, ft4: "complete", expected: "Use existing FT4", purpose: "The linked accession already has a completed FT4; a new order would duplicate testing." },
  { ...base, id: "TH-09", tsh: 0.10, ft4: "pending", expected: "Use existing FT4", purpose: "A pending FT4 also prevents a second order for the same accession." },
  { ...base, id: "TH-10", tsh: null, final: false, expected: "Review", purpose: "A missing or preliminary TSH must not be converted to zero or used to place an order." },
  { ...base, id: "TH-11", tsh: 0.10, age: 12, expected: "Outside this rule", purpose: "The approved adult reflex rule does not apply to this pediatric order." },
  { ...base, id: "TH-12", tsh: 0.10, order: "TSH only", expected: "Outside this rule", purpose: "A standalone TSH order does not authorize this reflex sequence." },
  { ...base, id: "TH-13", tsh: 0.10, final: false, expected: "Review", purpose: "A numeric but preliminary result is not yet eligible to place a reflex order." },
];
export function evaluateReflex(row: ReflexCase, config: ReflexConfig) {
  const trace: string[] = [];
  if (config.restrictScope && (row.age < 18 || row.order !== "TSH with reflex")) return { action: "Outside this rule" as ReflexAction, trace: [`Age ${row.age}; order ${row.order}. The adult reflex order criteria are not met.`] };
  trace.push(config.restrictScope ? "Adult TSH-with-reflex order confirmed." : "Age and order-type restriction bypassed.");
  if (row.tsh === null || !Number.isFinite(row.tsh) || row.tsh < 0 || (config.requireFinal && !row.final)) return { action: "Review" as ReflexAction, trace: [...trace, "No eligible final numeric TSH result; review before deciding about further testing."] };
  trace.push(row.final ? "Final numeric TSH result available." : "Preliminary-result restriction bypassed.");
  const triggers = config.inclusive ? row.tsh <= config.lower || row.tsh >= config.upper : row.tsh < config.lower || row.tsh > config.upper;
  trace.push(`${row.tsh.toFixed(2)} mIU/L compared with ${config.inclusive ? "≤" : "<"} ${config.lower.toFixed(2)} or ${config.inclusive ? "≥" : ">"} ${config.upper.toFixed(2)}: ${triggers ? "criterion met" : "criterion not met"}.`);
  if (!triggers) return { action: "No reflex" as ReflexAction, trace };
  if (config.preventDuplicate && row.ft4 !== "none") return { action: "Use existing FT4" as ReflexAction, trace: [...trace, `A ${row.ft4} FT4 is already linked to this accession; no second order is placed.`] };
  return { action: "Order FT4" as ReflexAction, trace: [...trace, row.ft4 === "none" ? "No linked FT4 exists; create one FT4 order on this accession." : `Duplicate prevention is off despite a ${row.ft4} FT4 on this accession.`] };
}
export const reflexReplay = (config: ReflexConfig) => reflexCases.map((row) => ({ ...row, ...evaluateReflex(row, config) }));
export const reflexControlNotes = (config: ReflexConfig): Record<keyof ReflexConfig, string> => ({
  lower: `TH-01 at 0.30 mIU/L: ${evaluateReflex(reflexCases[0], config).action}. The approved lower threshold is 0.27.`,
  upper: `TH-07 at 4.21 mIU/L: ${evaluateReflex(reflexCases[6], config).action}. The approved upper threshold is 4.20.`,
  inclusive: config.inclusive ? "Values equal to either boundary now meet the order condition, contrary to the approved protocol." : "Values exactly equal to either threshold do not trigger FT4 under this protocol.",
  preventDuplicate: config.preventDuplicate ? "A pending or completed FT4 on this accession prevents a second order." : "The rule may create another FT4 even when one is already pending or complete.",
  requireFinal: config.requireFinal ? "A preliminary numeric TSH is reviewed before any reflex decision." : "A preliminary numeric result may place an order before final verification.",
  restrictScope: config.restrictScope ? "Pediatric and TSH-only records remain outside this adult reflex rule." : "The rule now applies to records outside the approved age and order scope.",
});
export function reflexSummary(config: ReflexConfig) {
  const results = reflexReplay(config);
  return { total: results.length, orders: results.filter((row) => row.action === "Order FT4").length, expectedOrders: results.filter((row) => row.expected === "Order FT4").length, extraOrders: results.filter((row) => row.action === "Order FT4" && row.expected !== "Order FT4").length, missedOrders: results.filter((row) => row.expected === "Order FT4" && row.action !== "Order FT4").length, correct: results.filter((row) => row.expected === row.action).length };
}
export const dependencyRecords = [
  { id: "display", title: "TSH display definition", text: "Adult reference interval 0.27–4.20 mIU/L, effective Monday 06:00. TH-01 displays 0.30 mIU/L without an interval flag.", meaning: "The report uses this definition to display the interval. The reflex process reads a separate configuration." },
  { id: "approval", title: "Approved adult reflex protocol", text: "For final numeric adult TSH-with-reflex orders: add FT4 when TSH is below 0.27 or above 4.20 mIU/L. Reuse a pending or completed FT4 on the same accession.", meaning: "The director approved these order criteria for this assay and population. Updating a reference interval alone does not authorize changing a clinical order rule." },
  { id: "rule", title: "Configured reflex rule", text: "Revision 8: adult TSH-with-reflex; final numeric result; TSH < 0.40 or > 4.20; do not duplicate a linked FT4.", meaning: "The separate lower threshold still contains 0.40. This is the value used for TH-01's downstream order." },
  { id: "order", title: "TH-01 order record", text: "TSH 0.30 mIU/L finalized at 07:18. Reflex revision 8 evaluated at 07:18. FT4 order created on TH-01 at 07:18; no earlier linked FT4.", meaning: "The order record connects an additional FT4 to a particular rule evaluation. A changed display does not prove that the order rule changed." },
];
export const reflexApprovalChoices = [
  { id: "display", label: "Approve because the TSH interval displays correctly on the report.", feedback: "The report and order rule are separate. Correct display does not validate the predicates, scope, or duplicate prevention." },
  { id: "count", label: "Approve once the number of FT4 orders decreases.", feedback: "A lower count can also mean indicated tests were missed. Compare every expected action, including retained orders and boundary cases." },
  { id: "complete", label: "Review all expected actions, document the approved rule revision, assess affected accessions, and monitor added and missed orders after release.", feedback: "The analyst documents the build and test results. Laboratory leadership approves clinical criteria and recovery of affected cases. Monitoring includes missed indicated orders, duplicate orders, and exceptions as well as total volume." },
];
