import { useState } from "react";
import type { LessonDefinition } from "../data/types";
import { validationResult } from "../data/validation";

export function GenericExperience({ lesson, onAttempt }: { lesson: LessonDefinition; onAttempt?: (attempted: boolean) => void }) {
  const [activeTrace, setActiveTrace] = useState(0);
  const [decision, setDecision] = useState<string | null>(null);
  const [repair, setRepair] = useState<string | null>(null);
  const [testsRun, setTestsRun] = useState(false);
  const selectedDecision = lesson.decisionChoices.find((choice) => choice.id === decision);
  const selectedRepair = lesson.repairChoices.find((choice) => choice.id === repair);
  const validation = validationResult(lesson, repair);
  const passed = validation.passed;

  const reset = () => {
    setActiveTrace(0);
    setDecision(null);
    setRepair(null);
    setTestsRun(false);
    onAttempt?.(false);
  };

  return (
    <div className="experience">
      <section className="lesson-section evidence-section" aria-labelledby="evidence-title">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div><p className="eyebrow">Clinical artifact</p><h2 id="evidence-title">Inspect the evidence</h2></div>
        </div>
        <article className="artifact-card">
          <header><span>Synthetic educational artifact</span><strong>{lesson.artifactTitle}</strong></header>
          <dl className="evidence-grid">
            {lesson.evidence.map((item) => <div className={`tone-${item.tone ?? "neutral"}`} key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
        </article>
      </section>

      <section className="lesson-section" aria-labelledby="trace-title">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div><p className="eyebrow">Trace</p><h2 id="trace-title">Follow it through the system</h2></div>
        </div>
        <p className="section-guidance">Select each step in order. Look for where the data, meaning, or included cases change.</p>
        <div className="trace-tabs" role="tablist" aria-label="Trace steps">
          {lesson.trace.map((step, index) => <button key={step.system} type="button" role="tab" aria-selected={activeTrace === index} className={activeTrace === index ? "active" : ""} onClick={() => setActiveTrace(index)}><span>{index + 1}</span>{step.system}</button>)}
        </div>
        <article className="trace-panel" role="tabpanel">
          <div><p className="eyebrow">{lesson.trace[activeTrace].role}</p><h3>{lesson.trace[activeTrace].system}</h3><p>{lesson.trace[activeTrace].sees}</p></div>
          <aside><strong>Why it matters</strong><p>{lesson.trace[activeTrace].implication}</p></aside>
        </article>
      </section>

      <section className="lesson-section decision-section" aria-labelledby="decision-title">
        <div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">Diagnosis</p><h2 id="decision-title">{lesson.decisionPrompt}</h2></div></div>
        <div className="choice-grid" role="radiogroup" aria-label="Diagnosis choices">
          {lesson.decisionChoices.map((choice) => <button key={choice.id} type="button" role="radio" aria-checked={decision === choice.id} className={decision === choice.id ? "selected" : ""} onClick={() => setDecision(choice.id)}><span className="choice-marker"/><strong>{choice.label}</strong></button>)}
        </div>
        {selectedDecision && <div className={`feedback ${selectedDecision.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedDecision.correct ? "Correct." : "Not quite."}</strong><p>{selectedDecision.feedback}</p></div>}
      </section>

      <section className="lesson-section repair-section" aria-labelledby="repair-title">
        <div className="section-heading"><span className="section-number">04</span><div><p className="eyebrow">Corrective action</p><h2 id="repair-title">{lesson.repairPrompt}</h2></div></div>
        <div className="repair-layout">
          <div className="choice-stack" role="radiogroup" aria-label="Repair choices">
            {lesson.repairChoices.map((choice) => <button key={choice.id} type="button" role="radio" aria-checked={repair === choice.id} className={repair === choice.id ? "selected" : ""} onClick={() => { setRepair(choice.id); setTestsRun(false); }}><strong>{choice.label}</strong></button>)}
          </div>
          <article className="test-console" aria-live="polite">
            <header><span>Validation set</span><strong>{testsRun ? `${passed}/${lesson.validationCases.length} passed` : "Not run"}</strong></header>
            {validation.cases.map((item) => (
              <div className="test-row" key={item.name}>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.note}</small>
                  {testsRun && item.failNote && <small className="test-fail-note">{item.failNote}</small>}
                </span>
                <b className={!testsRun ? "pending" : item.passed ? "pass" : "fail"}>{!testsRun ? "Pending" : item.passed ? "Pass" : "Fail"}</b>
              </div>
            ))}
            <button className="primary-button" type="button" disabled={!repair} onClick={() => { setTestsRun(true); onAttempt?.(true); }}>Run validation cases</button>
          </article>
        </div>
        {testsRun && selectedRepair && <div className={`feedback ${passed === lesson.validationCases.length ? "correct" : "incorrect"}`} role="status"><strong>{passed === lesson.validationCases.length ? "Validation passed. Ready for review and approval." : "Validation is incomplete. Do not approve this change."}</strong><p>{selectedRepair.feedback}</p></div>}
      </section>

      <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
    </div>
  );
}
