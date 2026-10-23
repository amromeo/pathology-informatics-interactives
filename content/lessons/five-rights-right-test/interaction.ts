export type CdsConfig = { person: string; information: string; channel: string; format: string; timing: string };
export const originalCds: CdsConfig = { person:"all", information:"policy", channel:"inbox", format:"soft", timing:"after" };
export const reviewedCds: CdsConfig = { person:"ordering", information:"context", channel:"composer", format:"inline", timing:"before" };
export type OrderCase = { id:string; label:string; role:"ordering"|"collecting"; prior:"final"|"pending"|"none"|"unusable"; hours:number; exception:boolean };
export const orderCases: OrderCase[] = [
 {id:"CD-01",label:"Usable final result 72 hours ago",role:"ordering",prior:"final",hours:72,exception:false},
 {id:"CD-02",label:"Collecting nurse opens the same chart",role:"collecting",prior:"final",hours:72,exception:false},
 {id:"CD-03",label:"No previous result or pending order",role:"ordering",prior:"none",hours:0,exception:false},
 {id:"CD-04",label:"Final result 169 hours ago",role:"ordering",prior:"final",hours:169,exception:false},
 {id:"CD-05",label:"Recent result; clinical reason to repeat documented",role:"ordering",prior:"final",hours:72,exception:true},
 {id:"CD-06",label:"Previous result marked unusable",role:"ordering",prior:"unusable",hours:72,exception:false},
 {id:"CD-07",label:"Previous order still pending",role:"ordering",prior:"pending",hours:4,exception:false},
 {id:"CD-08",label:"Final result exactly 168 hours ago",role:"ordering",prior:"final",hours:168,exception:false},
];
export const candidate = (row:OrderCase) => row.prior === "pending" || (row.prior === "final" && row.hours <= 168);
export function cdsOutcome(config:CdsConfig,row:OrderCase) {
 const eligible = candidate(row);
 const shown = eligible && (config.person === "all" || row.role === "ordering");
 const blocked = shown && config.format === "hard";
 const appropriate = row.role === "ordering" && eligible;
 const issues = !shown ? [] : [
  ...(row.role !== "ordering" ? ["The collecting nurse cannot revise the prescriber's order."] : []),
  ...(config.information !== "context" ? ["The policy text omits the prior result or pending order needed for this decision."] : []),
  ...(config.channel !== "composer" ? ["An inbox message separates the advice from the active order."] : []),
  ...(config.timing !== "before" ? ["The order is already signed; acting now requires another workflow."] : []),
  ...(blocked ? [row.exception ? "The hard stop blocks a documented clinical reason to repeat." : "A hard stop removes clinical discretion that the approved guidance requires."] : []),
 ];
 return { ...row, shown, blocked, pass:shown === appropriate && issues.length === 0,
  action:!shown ? "No guidance shown" : blocked ? "Order blocked" : config.format === "soft" ? "Interrupting review" : "Inline review",
  note:issues.length ? issues.join(" ") : !shown ? "No order guidance is needed for this role or available history." : row.exception ? "Show the context and preserve the documented reason to proceed." : row.prior === "pending" ? "Review the pending order; do not present it as a completed result." : "Review the dated result before deciding whether another order is needed."
 };
}
export const cdsReplay = (config:CdsConfig) => orderCases.map(row=>cdsOutcome(config,row));
export const cdsControls = [
 {key:"person",label:"Person receiving guidance",options:[["all","Everyone opening the chart"],["ordering","Clinician placing the order"]],notes:{all:"The collecting nurse also receives an ordering message.",ordering:"The person who can change the proposed order receives the guidance."}},
 {key:"information",label:"Information displayed",options:[["policy","Full repeat-testing policy"],["context","Dated result or pending order and available actions"]],notes:{policy:"A policy alone does not show whether this patient's earlier test can answer today's question.",context:"Show the source, status, time, and result when available. A pending order has no final value."}},
 {key:"channel",label:"Delivery channel",options:[["inbox","EHR inbox"],["composer","EHR order composer"]],notes:{inbox:"The clinician must leave the order to find the message.",composer:"The suggestion appears where the clinician is choosing the test."}},
 {key:"format",label:"Intervention format",options:[["soft","Interrupting message with a continue option"],["inline","Inline suggestion beside the order"],["hard","Hard stop without an override"]],notes:{soft:"A soft stop preserves discretion but adds an interruption. Justify this burden before choosing it.",inline:"The clinician can review the information without dismissing a modal message.",hard:"The approved policy asks for review; it does not authorize blocking all repeat orders."}},
 {key:"timing",label:"Time in the workflow",options:[["after","After the order is signed"],["before","Before the order is signed"]],notes:{after:"The decision has already been committed, so cancellation requires extra work.",before:"The clinician can review the earlier test while the order is still editable."}},
] as const;
export const cdsSources = [
 {title:"Ordering audit",record:"09:14:02  Encounter 62018 · HbA1c selected\n09:14:19  Order 80421 signed · Dr. Patel\n09:14:20  Repeat-test message sent to inbox\n09:22:10  Chart opened · collecting nurse\n09:22:11  Repeat-test message sent to inbox",note:"The audit establishes recipient and timing. It does not establish whether either person read the policy or whether the repeat was appropriate."},
 {title:"Prior laboratory report",record:"Patient 62018 · Accession A26090718\nCollected: 07 Sep 2026 09:14\nHbA1c: 6.8 %\nStatus: Final\nReport quality: Usable\nCurrent order time: 10 Sep 2026 09:14",note:"The prior report was collected 72 hours before the current order. Confirm patient identity, collection time, report status, and usability before using it."},
 {title:"Approved review specification",record:"Repeat-test guidance · version 2\nScope: HbA1c order review\nShow a usable final result collected within 168 hours,\nor an existing pending order for the same patient/test.\nRetain the option to proceed with a clinical reason.\nDo not interrupt collection staff.\nClinical approval: laboratory director and CDS committee",note:"The 168-hour window belongs to this institution's case specification. It is a trigger to review available information, not a universal testing interval or a determination that every repeat is unnecessary."},
];
export const responseNotes = {
 cancel:"The proposed order is cancelled after review. Record the linked earlier order/report and the clinician's decision; cancellation alone does not establish appropriateness.",
 continue:"The order is retained with a documented clinical reason. An override can represent appropriate care; audit the reason and review selected cases.",
};
