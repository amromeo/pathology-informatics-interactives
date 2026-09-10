import { useState, type ComponentType } from "react";
import { auditEvents, destinations, initialRouting, procedures, questions, readyForReview, recoveryChoices, runRoutingCases, type Destination, type RoutingConfig } from "../../content/lessons/where-is-the-specimen/interaction";

export function SpecimenRoutingExperience({ Concepts, onAttempt }: { Concepts?: ComponentType<Record<string, unknown>>; onAttempt?: (attempted: boolean) => void }) {
  const [eventId, setEventId] = useState<string>(auditEvents[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [config, setConfig] = useState<RoutingConfig>(() => structuredClone(initialRouting));
  const [tested, setTested] = useState(false);
  const [recovery, setRecovery] = useState("");
  const event = auditEvents.find((item) => item.id === eventId)!;
  const results = runRoutingCases(config);
  const selectedRecovery = recoveryChoices.find((item) => item.id === recovery);
  const updateConfig = (next: RoutingConfig) => { setConfig(next); setTested(false); };
  const reset = () => { setEventId(auditEvents[0].id); setAnswers({}); setConfig(structuredClone(initialRouting)); setTested(false); setRecovery(""); onAttempt?.(false); };
  return <div className="experience specimen-routing-experience">
    <section className="lesson-section" aria-labelledby="specimen-audit-title">
      <div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">Source records</p><h2 id="specimen-audit-title">Reconstruct the container's documented journey</h2></div></div>
      <nav className="specimen-event-nav" aria-label="Specimen audit events">{auditEvents.map((item) => <button type="button" key={item.id} aria-pressed={eventId === item.id} onClick={() => setEventId(item.id)}><strong>{item.time}</strong><span>{item.title}</span></button>)}</nav>
      <article className="artifact-card specimen-event-record" aria-live="polite"><header><span>Source record · {event.time}</span><strong>{event.title}</strong></header><div><p><strong>{event.actor}</strong></p><p className="specimen-record-code">{event.record}</p><p>{event.detail}</p></div></article>
      <aside className="specimen-annotation"><strong>What this record establishes</strong><p>{event.meaning}</p></aside>
      <div className="specimen-question-grid">{questions.map((question) => {
        const selected = question.choices.find((choice) => choice.id === answers[question.id]);
        return <fieldset key={question.id}><legend>{question.prompt}</legend>{question.choices.map((choice) => <label key={choice.id}><input type="radio" name={`specimen-${question.id}`} checked={answers[question.id] === choice.id} onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))}/><span>{choice.label}</span></label>)}{selected && <div className={`feedback ${selected.correct ? "correct" : "incorrect"}`} role="status"><p>{selected.feedback}</p></div>}</fieldset>;
      })}</div>
    </section>
    <section className="lesson-section" aria-labelledby="specimen-routing-title">
      <div className="section-heading"><span className="section-number">02</span><div><p className="eyebrow">Procedure dictionary</p><h2 id="specimen-routing-title">Repair the routing table</h2></div></div>
      {Concepts && <div className="mdx-content embedded-mdx"><Concepts/></div>}
      <div className="specimen-route-grid">{procedures.map((procedure) => <article key={procedure.code}><h3>{procedure.name}</h3><p><code>{procedure.code}</code></p><p>Approved destination: <strong>{destinations[procedure.approved]}</strong></p><label><span>Configured destination for {procedure.code}</span><select value={config.routes[procedure.code]} onChange={(e) => updateConfig({ ...config, routes: { ...config.routes, [procedure.code]: e.target.value as Destination } })}>{Object.entries(destinations).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>{tested && <p className={config.routes[procedure.code] === procedure.approved ? "specimen-pass" : "specimen-fail"} role="status">{config.routes[procedure.code] === procedure.approved ? "Matches the approved route." : "This entry assigns the procedure to a different work area."}</p>}</article>)}</div>
      <label className="specimen-fallback"><span>Destination when no procedure entry matches</span><select value={config.unmatched} onChange={(e) => updateConfig({ ...config, unmatched: e.target.value as Destination })}>{Object.entries(destinations).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
      <button type="button" className="primary-button" onClick={() => { setTested(true); onAttempt?.(true); }}>Replay routing cases</button>
      <p role="status">{tested ? `${results.filter((result) => result.passed).length} of ${results.length} routing cases pass.` : "Replay the cases to evaluate the current configuration."}</p>
      <div className="specimen-results">{results.map((result) => <article key={result.id} className={tested ? result.passed ? "passed" : "failed" : "pending"}><h3>{result.label}</h3><p><code>{result.code}</code> · Expected: {destinations[result.expected]}</p>{tested && <div role="status"><strong>{result.passed ? "Pass" : "Revise"} · {destinations[result.actual]}</strong><p>{result.passed ? "The configured destination matches the approved route for this case." : result.consequence}</p></div>}</article>)}</div>
    </section>
    <section className="lesson-section" aria-labelledby="specimen-recovery-title">
      <div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">Existing specimen</p><h2 id="specimen-recovery-title">Plan the physical handoff</h2></div></div>
      <fieldset className="specimen-recovery"><legend>What must staff do about container C-1042-A?</legend>{recoveryChoices.map((choice) => <label key={choice.id}><input type="radio" name="specimen-recovery" checked={recovery === choice.id} onChange={() => { setRecovery(choice.id); onAttempt?.(true); }}/><span>{choice.label}</span></label>)}</fieldset>
      {selectedRecovery && <div className={`feedback ${selectedRecovery.correct ? "correct" : "incorrect"}`} role="status"><p>{selectedRecovery.feedback}</p></div>}
      {tested && selectedRecovery && <div className={`feedback ${readyForReview(config, recovery) ? "correct" : "incorrect"}`} role="status"><strong>{readyForReview(config, recovery) ? "Routing checks and the recovery plan are ready for laboratory review." : "The correction still needs work before laboratory review."}</strong><p>{readyForReview(config, recovery) ? "The LIS analyst can document the tested configuration for clinical approval. The receiving team still must verify the container and record its actual handoff." : "Both the complete routing matrix and a documented physical recovery plan are required. A passing routing test cannot create evidence of specimen receipt."}</p></div>}
    </section>
    <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
  </div>;
}
