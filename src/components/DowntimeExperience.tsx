import { useMemo, useState, type ComponentType } from "react";
import {
  applyDecision,
  buildReconciliationRecords,
  initialDowntimeState,
  resumptionChoices,
  scoreReconciliation,
  tabletopPhases,
  type DowntimeDecisionId,
  type DowntimePhaseId,
  type LearnerAssignments,
} from "../../content/lessons/twelve-hours-offline/interaction";
import type { LessonDefinition } from "../data/types";

type MdxComponent = ComponentType<Record<string, unknown>>;

const emptyAssignments = (): LearnerAssignments => ({ matches: {}, actions: {} });

export function DowntimeExperience({ lesson, Concepts, onAttempt }: { lesson: LessonDefinition; Concepts?: MdxComponent; onAttempt?: (attempted: boolean) => void }) {
  const [activeTrace, setActiveTrace] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [downtimeState, setDowntimeState] = useState(initialDowntimeState);
  const [assignments, setAssignments] = useState<LearnerAssignments>(emptyAssignments);
  const [reconciliationRun, setReconciliationRun] = useState(false);
  const [resumptionChoice, setResumptionChoice] = useState<string | null>(null);

  const records = useMemo(() => buildReconciliationRecords(downtimeState), [downtimeState]);
  const score = useMemo(() => scoreReconciliation(records, assignments), [records, assignments]);
  const phaseComplete = tabletopPhases.map((phase) => phase.decisions.every((decision) => Boolean(downtimeState.decisions[decision.id])));
  const allPhasesComplete = phaseComplete.every(Boolean);
  const currentPhase = tabletopPhases[activePhase];
  const selectedResumption = resumptionChoices.find((choice) => choice.id === resumptionChoice);
  const controlledIdentifiers = downtimeState.decisions["temporary-identifiers"] === "controlled-id-block";
  const controlledCalls = downtimeState.decisions["critical-results"] === "controlled-call-log";
  const reconciliationClean = reconciliationRun && score.hazardsMissed.length === 0;
  const readyToResume = reconciliationClean && selectedResumption?.preferred === true;
  const reconciliationNotes = reconciliationClean
    ? [`All ${records.paperRecords.length} temporary identifiers are matched to verified charts.`, `All ${records.hazards.length} recovery hazards have an approved action.`]
    : score.notes.filter((note) => note.includes("not matched") || note.endsWith("remains unresolved."));

  const chooseDecision = (phase: DowntimePhaseId, decisionId: DowntimeDecisionId, choiceId: string) => {
    setDowntimeState((current) => {
      const next = applyDecision(current, phase, choiceId);
      if (next.decisions[decisionId] !== choiceId) throw new Error(`Decision ${decisionId} did not accept ${choiceId}.`);
      return next;
    });
    setAssignments(emptyAssignments());
    setReconciliationRun(false);
    setResumptionChoice(null);
  };

  const reset = () => {
    setActiveTrace(0);
    setActivePhase(0);
    setDowntimeState(initialDowntimeState);
    setAssignments(emptyAssignments());
    setReconciliationRun(false);
    setResumptionChoice(null);
    onAttempt?.(false);
  };

  return <div className="experience downtime-experience">
    <section className="lesson-section evidence-section" aria-labelledby="downtime-evidence-title">
      <div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">Incident board</p><h2 id="downtime-evidence-title">Inspect the interruption at 06:20</h2></div></div>
      <article className="artifact-card"><header><span>Synthetic educational artifact</span><strong>{lesson.artifactTitle}</strong></header><dl className="evidence-grid">{lesson.evidence.map((item) => <div className={`tone-${item.tone ?? "neutral"}`} key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></article>
    </section>

    <section className="lesson-section" aria-labelledby="downtime-trace-title">
      <div className="section-heading"><span className="section-number">02</span><div><p className="eyebrow">System trace</p><h2 id="downtime-trace-title">Follow the work that moves to paper</h2></div></div>
      <p className="section-guidance">Select each area to see what stopped electronically and what the downtime procedure must preserve.</p>
      <div className="trace-tabs" role="tablist" aria-label="Downtime system trace">{lesson.trace.map((step, index) => <button key={step.system} type="button" role="tab" aria-selected={activeTrace === index} className={activeTrace === index ? "active" : ""} onClick={() => setActiveTrace(index)}><span>{index + 1}</span>{step.system}</button>)}</div>
      <article className="trace-panel" role="tabpanel"><div><p className="eyebrow">{lesson.trace[activeTrace].role}</p><h3>{lesson.trace[activeTrace].system}</h3><p>{lesson.trace[activeTrace].sees}</p></div><aside><strong>Why it matters</strong><p>{lesson.trace[activeTrace].implication}</p></aside></article>
    </section>

    <section className="lesson-section" aria-labelledby="tabletop-title">
      <div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">Phased tabletop</p><h2 id="tabletop-title">Make the decisions that shape recovery</h2></div></div>
      {Concepts && <div className="mdx-content embedded-mdx downtime-concepts"><Concepts/></div>}
      <div className="downtime-phase-tabs" role="tablist" aria-label="Downtime phases">{tabletopPhases.map((phase, index) => {
        const available = index === 0 || phaseComplete.slice(0, index).every(Boolean);
        return <button type="button" role="tab" aria-selected={activePhase === index} disabled={!available} className={activePhase === index ? "active" : phaseComplete[index] ? "complete" : ""} onClick={() => setActivePhase(index)} key={phase.id}><span>{index + 1}</span><strong>{phase.title}</strong><small>{phase.time}</small><b>{phaseComplete[index] ? "Complete" : available ? "Open" : "Locked"}</b></button>;
      })}</div>
      <article className="downtime-phase-panel" role="tabpanel" aria-labelledby={`phase-${currentPhase.id}-title`}>
        <header><div><p className="eyebrow">{currentPhase.time}</p><h3 id={`phase-${currentPhase.id}-title`}>{currentPhase.title}</h3></div><p>{currentPhase.situation}</p></header>
        <div className="downtime-decision-grid">{currentPhase.decisions.map((decision) => {
          const selectedId = downtimeState.decisions[decision.id];
          const selected = decision.choices.find((choice) => choice.id === selectedId);
          return <fieldset key={decision.id}><legend>{decision.prompt}</legend><div className="downtime-choice-stack">{decision.choices.map((choice) => <label className={selectedId === choice.id ? "selected" : ""} key={choice.id}><input type="radio" name={`downtime-${decision.id}`} checked={selectedId === choice.id} onChange={() => chooseDecision(currentPhase.id, decision.id, choice.id)}/><span>{choice.label}</span></label>)}</div>{selected && <div className={`feedback ${selected.preferred ? "correct" : "incorrect"}`} role="status"><strong>{selected.preferred ? "This creates a controlled handoff." : "This creates additional recovery work."}</strong><p>{selected.feedback}</p></div>}</fieldset>;
        })}</div>
        <div className="downtime-phase-nav"><button type="button" className="secondary-button" disabled={activePhase === 0} onClick={() => setActivePhase((index) => Math.max(0, index - 1))}>Previous phase</button>{activePhase < tabletopPhases.length - 1 && <button type="button" className="primary-button" disabled={!phaseComplete[activePhase]} onClick={() => setActivePhase((index) => Math.min(tabletopPhases.length - 1, index + 1))}>Continue to {tabletopPhases[activePhase + 1].title}</button>}</div>
      </article>
      <div className="downtime-path-summary" aria-live="polite"><article className={controlledIdentifiers ? "ready" : "warning"}><span>Temporary identifiers</span><strong>{controlledIdentifiers ? "Controlled block" : downtimeState.decisions["temporary-identifiers"] ? "Separate unit sequences" : "Not decided"}</strong><small>{controlledIdentifiers ? "One assignment index supports matching." : downtimeState.decisions["temporary-identifiers"] ? "Recovery includes a duplicate-chart pair." : "Choose an Activate response."}</small></article><article className={controlledCalls ? "ready" : "warning"}><span>Critical-result record</span><strong>{controlledCalls ? "Numbered call log" : downtimeState.decisions["critical-results"] ? "Unit-specific notes" : "Not decided"}</strong><small>{controlledCalls ? "The potassium call can be reconciled." : downtimeState.decisions["critical-results"] ? "The potassium call has no laboratory log entry." : "Choose an Operate response."}</small></article><article><span>Phase decisions</span><strong>{phaseComplete.filter(Boolean).length} of 3 complete</strong><small>Complete all phases before scoring reconciliation.</small></article></div>
    </section>

    <section className="lesson-section" aria-labelledby="reconciliation-title">
      <div className="section-heading"><span className="section-number">04</span><div><p className="eyebrow">Reconciliation</p><h2 id="reconciliation-title">Account for each paper record before recollection or result entry</h2></div></div>
      <p className="section-guidance">Match every temporary identifier to a restored chart. Then choose how to resolve the duplicate order, missing critical result, timestamp conflict, and any duplicate chart created by your tabletop path.</p>
      {!allPhasesComplete && <div className="downtime-lock-note" role="status"><strong>Complete Activate, Operate, and Recover to unlock scoring.</strong><p>The records remain visible so you can see what the recovery team will need to compare.</p></div>}
      <div className="downtime-reference-grid">
        <article><h3>Restored patient charts</h3><div className="downtime-chart-list">{records.restoredCharts.map((chart) => <div key={chart.mrn}><strong>{chart.mrn}</strong><span>{chart.patientName}</span><small>{chart.birthDate} · {chart.unit}</small></div>)}</div></article>
        <article className={records.callLogEntries.length ? "call-log-ready" : "call-log-missing"}><h3>Critical-result call log</h3>{records.callLogEntries.length ? records.callLogEntries.map((entry) => <div className="call-log-entry" key={entry.id}><strong>{entry.id} · {entry.tempId}</strong><span>Called {entry.calledAt} to {entry.recipient}</span><small>{entry.readBack ? "Read-back documented" : "Read-back not documented"}</small></div>) : <div className="call-log-entry"><strong>No matching laboratory entry</strong><span>The unit reports that the potassium was phoned, but the laboratory call log contains no entry for DT-202.</span></div>}</article>
      </div>
      <fieldset className="downtime-reconciliation-fieldset" disabled={!allPhasesComplete}><legend>Temporary identifier matches</legend><div className="downtime-table-wrap" role="region" aria-label="Downtime reconciliation records" tabIndex={0}><table><caption>Synthetic paper records compared with the restored laboratory information system</caption><thead><tr><th scope="col">Temporary ID</th><th scope="col">Paper record</th><th scope="col">Patient and unit</th><th scope="col">Test and result</th><th scope="col">Times</th><th scope="col">Restored status</th><th scope="col">Match to MRN</th></tr></thead><tbody>{records.paperRecords.map((record) => <tr key={record.tempId}><th scope="row">{record.tempId}</th><td><strong>{record.paperAccession}</strong><small>{record.restoredOrder}</small></td><td><strong>{record.patientName}</strong><small>{record.birthDate} · {record.unit}</small></td><td><strong>{record.test}</strong><small>{record.result}</small></td><td><strong>Collected {record.collectionTime}</strong>{record.backEntryTime && <small>Entered {record.backEntryTime}</small>}</td><td>{record.chartStatus}</td><td><label><select aria-label={`Medical record number for ${record.tempId}`} value={assignments.matches[record.tempId] ?? ""} onChange={(event) => { setAssignments((current) => ({ ...current, matches: { ...current.matches, [record.tempId]: event.target.value } })); setReconciliationRun(false); }}><option value="">Select MRN</option>{records.restoredCharts.map((chart) => <option value={chart.mrn} key={chart.mrn}>{chart.mrn}</option>)}</select></label></td></tr>)}</tbody></table></div></fieldset>
      <fieldset className="downtime-hazard-fieldset" disabled={!allPhasesComplete}><legend>Recovery actions</legend><div className="downtime-hazard-grid">{records.hazards.map((hazard) => <article key={hazard.id}><span>{hazard.kind.replaceAll("-", " ")}</span><h3>{hazard.title}</h3><p>{hazard.evidence}</p><label><strong>Choose an action</strong><select aria-label={`Action for ${hazard.title}`} value={assignments.actions[hazard.id] ?? ""} onChange={(event) => { setAssignments((current) => ({ ...current, actions: { ...current.actions, [hazard.id]: event.target.value } })); setReconciliationRun(false); }}><option value="">Select action</option>{hazard.actions.map((action) => <option value={action.id} key={action.id}>{action.label}</option>)}</select></label>{assignments.actions[hazard.id] && <p className="downtime-selected-action" role="status">{hazard.actions.find((action) => action.id === assignments.actions[hazard.id])?.label}</p>}</article>)}</div></fieldset>
      <div className="downtime-score-row"><button type="button" className="primary-button" disabled={!allPhasesComplete} onClick={() => { setReconciliationRun(true); onAttempt?.(true); }}>Check reconciliation</button><div aria-live="polite"><strong>{reconciliationRun ? `${score.resolved} of ${score.total} items resolved` : "Reconciliation not checked"}</strong><span>{reconciliationRun ? score.hazardsMissed.length ? `${score.hazardsMissed.length} identity or recovery hazards remain.` : "Every record and recovery hazard is resolved." : "Complete the selections, then check the work."}</span></div></div>
      {reconciliationRun && <div className={`feedback ${reconciliationClean ? "correct" : "incorrect"}`} role="status"><strong>{reconciliationClean ? "The downtime episode reconciles cleanly." : "Normal operation is not ready to resume."}</strong><ul>{reconciliationNotes.map((note) => <li key={note}>{note}</li>)}</ul></div>}
    </section>

    <section className="lesson-section" aria-labelledby="resumption-title">
      <div className="section-heading"><span className="section-number">05</span><div><p className="eyebrow">Return to normal operation</p><h2 id="resumption-title">What must be true before medical leadership approves resumption?</h2></div></div>
      <fieldset className="downtime-resumption-fieldset" disabled={!allPhasesComplete || !reconciliationRun}><legend>Choose the approval condition</legend><div className="downtime-choice-stack">{resumptionChoices.map((choice) => <label className={resumptionChoice === choice.id ? "selected" : ""} key={choice.id}><input type="radio" name="downtime-resumption" checked={resumptionChoice === choice.id} onChange={() => { setResumptionChoice(choice.id); onAttempt?.(true); }}/><span>{choice.label}</span></label>)}</div></fieldset>
      {selectedResumption && <div className={`feedback ${readyToResume ? "correct" : "incorrect"}`} role="status"><strong>{readyToResume ? "The laboratory is ready for medical review and approval." : "Do not approve normal operation yet."}</strong><p>{selectedResumption.feedback}</p><p>{controlledIdentifiers ? "Because registration used a controlled identifier block, the six paper records can be matched to established charts." : "Because units assigned separate identifiers, recovery includes a duplicate patient chart that must be held and reconciled."} {controlledCalls ? "The numbered call log provides the communication record for the critical potassium." : "The phoned potassium has no laboratory call-log entry, so communication must be verified from other source records."} {reconciliationRun ? `${score.resolved} of ${score.total} reconciliation items are resolved.` : "The reconciliation selections have not been checked."}</p></div>}
    </section>

    <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
  </div>;
}
