import { useMemo, useState, type ComponentType } from "react";
import {
  evaluateFinding,
  portfolioCost,
  portfolioLimit,
  scenarioResult,
  securityControls,
  securityFindings,
  securityPropertyLabels,
  securityScenarios,
  withinBudget,
  type ControlId,
  type ScenarioStatus,
  type SecurityProperty,
} from "../../content/lessons/server-behind-the-analyzer/interaction";
import type { LessonDefinition } from "../data/types";

type MdxComponent = ComponentType<Record<string, unknown>>;

const properties = Object.keys(securityPropertyLabels) as SecurityProperty[];
const statusLabels: Record<ScenarioStatus, string> = { blocked: "Blocked", partial: "Partially mitigated", unmitigated: "Not mitigated" };

export function SecurityReviewExperience({ lesson, Concepts, onAttempt }: { lesson: LessonDefinition; Concepts?: MdxComponent; onAttempt?: (attempted: boolean) => void }) {
  const [activeTrace, setActiveTrace] = useState(0);
  const [findingAssignments, setFindingAssignments] = useState<Record<string, SecurityProperty[]>>({});
  const [reviewedFindings, setReviewedFindings] = useState<string[]>([]);
  const [selectedControls, setSelectedControls] = useState<ControlId[]>([]);
  const [testsRun, setTestsRun] = useState(false);

  const mapScore = securityFindings.filter((finding) => reviewedFindings.includes(finding.id) && evaluateFinding(finding.id, findingAssignments[finding.id] ?? []).correct).length;
  const cost = useMemo(() => portfolioCost(selectedControls), [selectedControls]);
  const affordable = withinBudget(selectedControls);
  const results = securityScenarios.map((scenario) => ({ ...scenario, ...scenarioResult(scenario.id, selectedControls) }));
  const covered = results.filter((result) => result.status !== "unmitigated").length;

  const toggleProperty = (findingId: string, property: SecurityProperty) => {
    setFindingAssignments((current) => {
      const selected = current[findingId] ?? [];
      return { ...current, [findingId]: selected.includes(property) ? selected.filter((item) => item !== property) : [...selected, property] };
    });
  };

  const toggleControl = (controlId: ControlId) => {
    setSelectedControls((current) => current.includes(controlId) ? current.filter((item) => item !== controlId) : [...current, controlId]);
    setTestsRun(false);
  };

  const reset = () => {
    setActiveTrace(0);
    setFindingAssignments({});
    setReviewedFindings([]);
    setSelectedControls([]);
    setTestsRun(false);
    onAttempt?.(false);
  };

  return <div className="experience security-review-experience">
    <section className="lesson-section evidence-section" aria-labelledby="security-evidence-title">
      <div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">Installation review</p><h2 id="security-evidence-title">Inspect the proposed middleware host</h2></div></div>
      <article className="artifact-card"><header><span>Synthetic educational artifact</span><strong>{lesson.artifactTitle}</strong></header><dl className="evidence-grid">{lesson.evidence.map((item) => <div className={`tone-${item.tone ?? "neutral"}`} key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></article>
    </section>

    <section className="lesson-section" aria-labelledby="security-trace-title">
      <div className="section-heading"><span className="section-number">02</span><div><p className="eyebrow">Responsibility trace</p><h2 id="security-trace-title">Follow each finding to the team that would encounter it</h2></div></div>
      <p className="section-guidance">Select each area. Notice which team performs the technical work and why the laboratory still needs to review the clinical service risk.</p>
      <div className="trace-tabs" role="tablist" aria-label="Security review areas">{lesson.trace.map((step, index) => <button key={step.system} type="button" role="tab" aria-selected={activeTrace === index} className={activeTrace === index ? "active" : ""} onClick={() => setActiveTrace(index)}><span>{index + 1}</span>{step.system}</button>)}</div>
      <article className="trace-panel" role="tabpanel"><div><p className="eyebrow">{lesson.trace[activeTrace].role}</p><h3>{lesson.trace[activeTrace].system}</h3><p>{lesson.trace[activeTrace].sees}</p></div><aside><strong>Why it matters</strong><p>{lesson.trace[activeTrace].implication}</p></aside></article>
    </section>

    <section className="lesson-section" aria-labelledby="threat-map-title">
      <div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">Threat map</p><h2 id="threat-map-title">What does each finding put at risk?</h2></div></div>
      {Concepts && <div className="mdx-content embedded-mdx security-concepts"><Concepts/></div>}
      <div className="security-map-summary" aria-live="polite"><strong>{mapScore} of {securityFindings.length} findings mapped correctly</strong><span>A finding may affect more than one property.</span></div>
      <div className="security-finding-grid">{securityFindings.map((finding) => {
        const selected = findingAssignments[finding.id] ?? [];
        const reviewed = reviewedFindings.includes(finding.id);
        const evaluation = evaluateFinding(finding.id, selected);
        const missing = evaluation.missing.map((property) => securityPropertyLabels[property]).join(", ");
        const extra = evaluation.extra.map((property) => securityPropertyLabels[property]).join(", ");
        return <article key={finding.id}><header><span>{finding.id.replaceAll("-", " ")}</span><h3>{finding.title}</h3></header><p>{finding.observation}</p><fieldset><legend>Properties threatened</legend>{properties.map((property) => <label className={selected.includes(property) ? "selected" : ""} key={property}><input type="checkbox" checked={selected.includes(property)} onChange={() => toggleProperty(finding.id, property)}/><span>{securityPropertyLabels[property]}</span></label>)}</fieldset><button type="button" className="secondary-button" disabled={!selected.length} onClick={() => setReviewedFindings((current) => current.includes(finding.id) ? current : [...current, finding.id])}>Check this mapping</button>{reviewed && <div className={`security-map-feedback ${evaluation.correct ? "correct" : "incorrect"}`} role="status"><strong>{evaluation.correct ? "This mapping fits the finding." : "Revise this mapping."}</strong>{!evaluation.correct && <p>{missing && `Add: ${missing}.`}{missing && extra ? " " : ""}{extra && `Remove: ${extra}.`}</p>}<p>{finding.feedback}</p></div>}</article>;
      })}</div>
    </section>

    <section className="lesson-section" aria-labelledby="portfolio-title">
      <div className="section-heading"><span className="section-number">04</span><div><p className="eyebrow">Control portfolio</p><h2 id="portfolio-title">Build a plan within the available budget and staff effort</h2></div></div>
      <p className="section-guidance">Select controls that address different failure paths. The limits do not permit buying everything, and a low-cost administrative step may not change the technical risk.</p>
      <div className={`security-budget-summary ${affordable ? "within" : "over"}`} aria-live="polite"><article><span>Budget points</span><strong>{cost.budgetPoints} / {portfolioLimit.budgetPoints}</strong><progress value={Math.min(cost.budgetPoints, portfolioLimit.budgetPoints)} max={portfolioLimit.budgetPoints}>Budget use</progress></article><article><span>Staff effort</span><strong>{cost.staffEffort} / {portfolioLimit.staffEffort}</strong><progress value={Math.min(cost.staffEffort, portfolioLimit.staffEffort)} max={portfolioLimit.staffEffort}>Staff effort use</progress></article><div><strong>{affordable ? "Portfolio is within both limits." : "Portfolio exceeds at least one limit."}</strong><span>{selectedControls.length} of {securityControls.length} controls selected</span></div></div>
      <div className="security-control-grid">{securityControls.map((control) => <label className={selectedControls.includes(control.id) ? "selected" : ""} key={control.id}><input type="checkbox" checked={selectedControls.includes(control.id)} onChange={() => toggleControl(control.id)}/><span className="security-control-copy"><strong>{control.title}</strong><small>{control.description}</small><span className="security-control-tags"><b>{control.budgetPoints} budget</b><b>{control.staffEffort} effort</b>{control.supports.map((property) => <em key={property}>{securityPropertyLabels[property]}</em>)}</span></span></label>)}</div>
    </section>

    <section className="lesson-section" aria-labelledby="stress-test-title">
      <div className="section-heading"><span className="section-number">05</span><div><p className="eyebrow">Stress test</p><h2 id="stress-test-title">Run the portfolio against five laboratory events</h2></div></div>
      <p className="section-guidance">A blocked event is prevented by the selected controls. Partial mitigation reduces harm but leaves a path open. Not mitigated means the proposed installation still has no selected control for that event.</p>
      <div className="security-stress-summary"><button type="button" className="primary-button" disabled={!selectedControls.length || !affordable} onClick={() => { setTestsRun(true); onAttempt?.(true); }}>Run stress test</button><div aria-live="polite"><strong>{testsRun ? `${covered} of ${securityScenarios.length} scenarios covered` : "Stress test not run"}</strong><span>{!affordable ? "Revise the portfolio to meet both limits." : testsRun ? covered === securityScenarios.length ? "No scenario is left unmitigated; review any partial result before approval." : `${securityScenarios.length - covered} scenario${securityScenarios.length - covered === 1 ? " is" : "s are"} still unmitigated.` : "Select an affordable portfolio, then run the scenarios."}</span></div></div>
      <div className="security-scenario-grid">{results.map((result) => <article className={testsRun ? `status-${result.status}` : "status-pending"} key={result.id}><header><span>{result.id.replaceAll("-", " ")}</span>{testsRun && <strong>{statusLabels[result.status]}</strong>}</header><h3>{result.title}</h3><p>{result.event}</p>{testsRun ? <div role="status"><strong>{statusLabels[result.status]}</strong><p>{result.note}</p></div> : <small>Run the stress test to evaluate the selected controls.</small>}</article>)}</div>
      {testsRun && <div className={`feedback ${covered === securityScenarios.length ? "correct" : "incorrect"}`} role="status"><strong>{covered === securityScenarios.length ? "The portfolio provides coverage for all five scenarios." : "The installation plan still leaves one or more scenarios unmitigated."}</strong><p>{covered === securityScenarios.length ? "Partial mitigation is not the same as prevention. The laboratory director, LIS team, security team, facilities team, and vendor-management team must review the remaining risk and the work required before approval." : "Revise the portfolio and rerun the same five scenarios. Do not approve the installation while a result-routing failure path has no control."}</p></div>}
    </section>

    <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
  </div>;
}
