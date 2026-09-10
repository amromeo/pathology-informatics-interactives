export type ReleaseConfig = { delta: "absolute" | "either" | "both"; absoluteLimit: number; relativeLimit: number; minimumChange: number; historyHours: number; missingHistory: "hold" | "release"; checkQc: boolean; checkFlags: boolean };
export const originalRelease: ReleaseConfig = { delta: "absolute", absoluteLimit: 50, relativeLimit: 200, minimumChange: 20, historyHours: 24, missingHistory: "hold", checkQc: true, checkFlags: true };
export const approvedRelease: ReleaseConfig = { ...originalRelease, delta: "either" };
export type ReleaseCase = { id: string; title: string; current: number | null; prior: number | null; hours: number; sameAssay: boolean; qc: boolean; flag: boolean; final: boolean; expected: "Hold" | "Release"; purpose: string };
const base = { hours: 3, sameAssay: true, qc: true, flag: false, final: true };
export const releaseCases: readonly ReleaseCase[] = [
  { ...base, id: "AV-01", title: "Reported increase", current: 48, prior: 12, expected: "Hold", purpose: "A 36 ng/L increase is below the absolute limit but meets the relative-change branch." },
  { ...base, id: "AV-02", title: "Absolute boundary", current: 150, prior: 100, expected: "Hold", purpose: "Exactly 50 ng/L meets the inclusive absolute boundary, even though the relative change is only 50%." },
  { ...base, id: "AV-03", title: "Relative boundary", current: 30, prior: 10, expected: "Hold", purpose: "Exactly 200% with a 20 ng/L difference meets both requirements of the relative branch." },
  { ...base, id: "AV-04", title: "Small concentration change", current: 8, prior: 2, expected: "Release", purpose: "A 300% change is only 6 ng/L. The minimum absolute difference prevents this ratio alone from causing a hold." },
  { ...base, id: "AV-05", title: "Stable higher result", current: 82, prior: 80, expected: "Release", purpose: "A higher concentration is not itself a release failure. The result passes this laboratory's stated technical and change checks." },
  { ...base, id: "AV-06", title: "Missing prior result", current: 18, prior: null, expected: "Hold", purpose: "The approved policy directs results without usable history to review; missing is not the same as zero." },
  { ...base, id: "AV-07", title: "Prior result from two days ago", current: 18, prior: 17, hours: 48, expected: "Hold", purpose: "The prior result is outside the approved 24-hour comparison window." },
  { ...base, id: "AV-08", title: "Different prior assay", current: 18, prior: 17, sameAssay: false, expected: "Hold", purpose: "A result from another assay is not a usable comparison under this policy." },
  { ...base, id: "AV-09", title: "QC not accepted", current: 18, prior: 17, qc: false, expected: "Hold", purpose: "A small delta cannot override an unresolved quality-control check." },
  { ...base, id: "AV-10", title: "Instrument flag", current: 18, prior: 17, flag: true, expected: "Hold", purpose: "The instrument flag requires review even though the numerical change is small." },
  { ...base, id: "AV-11", title: "Nonnumeric result", current: null, prior: 17, expected: "Hold", purpose: "A missing numeric result cannot be treated as zero or released by passing delta checks." },
  { ...base, id: "AV-12", title: "Preliminary result", current: 18, prior: 17, final: false, expected: "Hold", purpose: "Only final results are eligible for automatic release in this workflow." },
  { ...base, id: "AV-13", title: "Critical-result workflow", current: 1200, prior: 1190, expected: "Hold", purpose: "The case policy requires the critical-result review and communication workflow at 1,000 ng/L or above." },
  { ...base, id: "AV-14", title: "Routine small change", current: 12, prior: 11, expected: "Release", purpose: "A routine result should still release after the rule is corrected." },
  { ...base, id: "AV-15", title: "Prior value of zero", current: 8, prior: 0, expected: "Hold", purpose: "Division by zero cannot supply a relative delta. This comparison is sent for review." },
  { ...base, id: "AV-16", title: "Decrease across the absolute limit", current: 20, prior: 80, expected: "Hold", purpose: "The rule checks the size of a decrease as well as an increase: the absolute difference is 60 ng/L." },
  { ...base, id: "AV-17", title: "Outside the numeric release range", current: 10001, prior: 9999, expected: "Hold", purpose: "A small change does not make a result beyond the numeric release range eligible." },
  { ...base, id: "AV-18", title: "History exactly 24 hours old", current: 18, prior: 17, hours: 24, expected: "Release", purpose: "The approved history window includes its 24-hour boundary." },
  { ...base, id: "AV-19", title: "Below the minimum difference", current: 29, prior: 10, expected: "Release", purpose: "A 19 ng/L difference remains below both the absolute limit and the relative branch's 20 ng/L minimum." },
  { ...base, id: "AV-20", title: "Below the relative limit", current: 40, prior: 20, expected: "Release", purpose: "The difference reaches 20 ng/L, but a 100% change does not meet the approved 200% relative limit." },
  { ...base, id: "AV-21", title: "Below the absolute limit", current: 140, prior: 100, expected: "Release", purpose: "A 40 ng/L difference and 40% change meet neither approved delta branch." },
  { ...base, id: "AV-22", title: "Critical boundary", current: 1000, prior: 990, expected: "Hold", purpose: "Exactly 1,000 ng/L enters the critical-result pathway under the case policy." },
];
export type ReleaseGate = { name: string; pass: boolean; note: string; skipped?: boolean };
export function evaluateRelease(row: ReleaseCase, config: ReleaseConfig) {
  const numeric = row.current !== null && Number.isFinite(row.current) && row.current >= 2 && row.current <= 10000;
  const usable = row.prior !== null && Number.isFinite(row.prior) && row.prior > 0 && row.sameAssay && row.hours >= 0 && row.hours <= config.historyHours;
  const difference = numeric && usable ? Math.abs(row.current! - row.prior!) : null;
  const percentage = difference === null ? null : difference / row.prior! * 100;
  const absHit = difference !== null && difference >= config.absoluteLimit;
  const relHit = difference !== null && percentage !== null && difference >= config.minimumChange && percentage >= config.relativeLimit;
  const deltaHit = config.delta === "absolute" ? absHit : config.delta === "either" ? absHit || relHit : absHit && relHit;
  const gates: ReleaseGate[] = [
    { name: "Result eligibility", pass: numeric && row.final, note: `${row.final ? "Final" : "Preliminary"} result; ${numeric ? "numeric value within 2–10,000 ng/L" : "no eligible numeric value within 2–10,000 ng/L"}.` },
    { name: "Quality control", pass: !config.checkQc || row.qc, note: !config.checkQc ? "QC gate is bypassed by this configuration." : row.qc ? "QC is accepted for the run." : "QC is not accepted; staff must resolve the run before release." },
    { name: "Instrument flags", pass: !config.checkFlags || !row.flag, note: !config.checkFlags ? "Instrument-flag gate is bypassed by this configuration." : row.flag ? "An unresolved instrument flag is present." : "No unresolved instrument flag." },
    { name: "Critical-result pathway", pass: numeric && row.current! < 1000, note: !numeric ? "No eligible numeric result to compare." : row.current! >= 1000 ? "The result meets this laboratory's 1,000 ng/L review threshold." : "Below this laboratory's critical-result review threshold." },
    { name: "Usable patient history", pass: usable || config.missingHistory === "release", note: usable ? `Same-assay prior result is ${row.hours} hours old.` : `History is missing, zero, from another assay, or older than ${config.historyHours} hours. Configured action: ${config.missingHistory}.` },
    { name: "Change from prior result", pass: !deltaHit, skipped: difference === null, note: difference === null ? "Delta not calculated without eligible numbers and usable history; the other gates still apply." : `Absolute difference ${difference} ng/L; relative difference ${percentage!.toFixed(1)}%. Absolute branch ${absHit ? "met" : "not met"}; relative branch ${relHit ? "met" : "not met"}. Combination: ${config.delta === "either" ? "absolute OR relative" : config.delta === "both" ? "absolute AND relative" : "absolute only"}.` },
  ];
  return { outcome: gates.every((gate) => gate.pass) ? "Release" as const : "Hold" as const, gates, difference, percentage };
}
export const releaseReplay = (config: ReleaseConfig) => releaseCases.map((row) => ({ ...row, ...evaluateRelease(row, config) }));
export const releaseControlNotes = (config: ReleaseConfig): Record<keyof ReleaseConfig, string> => ({
  delta: config.delta === "either" ? "Either branch can hold the result, as the approved policy requires." : config.delta === "both" ? "Requiring both branches misses results that meet only one approved hold criterion." : "Only the absolute branch can hold a result; the relative branch is omitted.",
  absoluteLimit: `An absolute difference of ${config.absoluteLimit} ng/L or more meets this branch. The approved limit is 50 ng/L.`,
  relativeLimit: `A relative difference of ${config.relativeLimit}% or more must also meet the minimum ng/L change. The approved limit is 200%.`,
  minimumChange: config.minimumChange === 0 ? "Without a minimum difference, a large percentage from a small prior value can trigger a hold." : `The relative branch also requires at least ${config.minimumChange} ng/L. The approved minimum is 20 ng/L.`,
  historyHours: `History up to and including ${config.historyHours} hours is accepted. The approved window is 24 hours.`,
  missingHistory: config.missingHistory === "hold" ? "Unusable history causes review even if the other gates pass." : "Unusable history no longer causes a hold. A skipped delta calculation may therefore allow release.",
  checkQc: config.checkQc ? "Unaccepted QC blocks automatic release." : "QC is bypassed; an apparently stable result may release from an unaccepted run.",
  checkFlags: config.checkFlags ? "Unresolved instrument flags block automatic release." : "Instrument flags are bypassed even if they require investigation.",
});
export const releaseApprovalChoices = [
  { id: "incident", label: "Approve after the reported 12-to-48 result is held.", feedback: "That checks one branch. It does not show that missing history, flags, boundaries, and results that should release behave correctly." },
  { id: "validated", label: "Document the full test set, review the policy with the laboratory director, and plan monitoring and a rollback before production use.", feedback: "The LIS team documents expected and observed results. Laboratory leadership reviews the release policy and exceptions before authorizing production use; staff then monitor holds, release delays, and unexpected releases." },
  { id: "all-hold", label: "Hold every result and treat a zero automatic-release rate as successful validation.", feedback: "Holding everything avoids some releases but defeats the intended workflow and can delay reporting. Validation must also demonstrate correct automatic release." },
];
