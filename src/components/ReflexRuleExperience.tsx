import { useState, type ComponentType } from "react";
import { dependencyRecords, originalReflex, reflexApprovalChoices, reflexReplay, reflexSummary, reflexControlNotes, type ReflexConfig } from "../../content/lessons/reflex-rule-ripple-effect/interaction";
type Mdx = ComponentType<Record<string, unknown>>;
export function ReflexRuleExperience({ Concepts, Bridge, onAttempt }: { Concepts?: Mdx; Bridge?: Mdx; onAttempt?: (value: boolean) => void }) {
  const [recordId, setRecordId] = useState("display");
  const [config, setConfig] = useState<ReflexConfig>({ ...originalReflex });
  const [tested, setTested] = useState(false);
  const [approval, setApproval] = useState("");
  const record = dependencyRecords.find((item) => item.id === recordId)!;
  const summary = reflexSummary(config);
  const baseline = reflexSummary(originalReflex);
  const rows = reflexReplay(config);
  const notes = reflexControlNotes(config);
  const update = (next: Partial<ReflexConfig>) => { setConfig((current) => ({ ...current, ...next })); setTested(false); setApproval(""); };
  return <div className="experience rule-lesson">
    <section className="lesson-section"><div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">Related records</p><h2>Find which configuration placed the FT4 order</h2></div></div>
      <nav className="specimen-event-nav" aria-label="Reflex investigation records">{dependencyRecords.map((item) => <button type="button" key={item.id} aria-pressed={recordId === item.id} onClick={() => setRecordId(item.id)}>{item.title}</button>)}</nav>
      <article className="artifact-card rule-record" aria-live="polite"><header><strong>{record.title}</strong></header><p>{record.text}</p></article><aside className="specimen-annotation"><strong>What to compare</strong><p>{record.meaning}</p></aside>
    </section>
    <section className="lesson-section"><div className="section-heading"><span className="section-number">02</span><div><p className="eyebrow">Order rule</p><h2>Configure when an FT4 order should be added</h2></div></div>{Concepts && <div className="mdx-content embedded-mdx"><Concepts/></div>}
      <fieldset className="rule-controls"><legend>Adult TSH reflex configuration</legend>
        <label>Lower TSH threshold (mIU/L)<select aria-label="Lower TSH threshold (mIU/L)" value={config.lower} onChange={(e) => update({ lower: Number(e.target.value) })}>{[0.10,0.27,0.40].map((n) => <option key={n} value={n}>{n.toFixed(2)}</option>)}</select><small role="status">{notes.lower}</small></label>
        <label>Upper TSH threshold (mIU/L)<select aria-label="Upper TSH threshold (mIU/L)" value={config.upper} onChange={(e) => update({ upper: Number(e.target.value) })}>{[4.0,4.2,5.0].map((n) => <option key={n} value={n}>{n.toFixed(2)}</option>)}</select><small role="status">{notes.upper}</small></label>
        <label>Boundary comparison<select aria-label="Boundary comparison" value={config.inclusive ? "inclusive" : "strict"} onChange={(e) => update({ inclusive: e.target.value === "inclusive" })}><option value="strict">Strictly outside limits</option><option value="inclusive">Include boundary values</option></select><small role="status">{notes.inclusive}</small></label>
        <label className="rule-check"><input type="checkbox" aria-label="Reuse pending or completed FT4 on this accession" checked={config.preventDuplicate} onChange={(e) => update({ preventDuplicate: e.target.checked })}/><span>Reuse pending or completed FT4 on this accession<small role="status">{notes.preventDuplicate}</small></span></label>
        <label className="rule-check"><input type="checkbox" aria-label="Require a final TSH result" checked={config.requireFinal} onChange={(e) => update({ requireFinal: e.target.checked })}/><span>Require a final TSH result<small role="status">{notes.requireFinal}</small></span></label>
        <label className="rule-check"><input type="checkbox" aria-label="Apply only to adults with a TSH-with-reflex order" checked={config.restrictScope} onChange={(e) => update({ restrictScope: e.target.checked })}/><span>Apply only to adults with a TSH-with-reflex order<small role="status">{notes.restrictScope}</small></span></label>
      </fieldset>
      <button type="button" className="primary-button" onClick={() => { setTested(true); onAttempt?.(true); }}>Replay accession records</button><p role="status">{tested ? `${summary.correct} of ${summary.total} expected actions match.` : "Run the records after changing the configuration."}</p>
      {tested && <div className="rule-counts" role="status"><article><span>Original rule</span><strong>{baseline.orders} new FT4 orders</strong></article><article><span>Your rule</span><strong>{summary.orders} new FT4 orders</strong></article><article><span>Compared with approved actions</span><strong>{summary.extraOrders} additional / {summary.missedOrders} missed</strong></article></div>}
      <div className="rule-result-list">{rows.map((row) => <details key={row.id} className={tested ? row.action === row.expected ? "pass" : "fail" : "pending"}><summary>{row.id} · TSH {row.tsh === null ? "missing" : `${row.tsh.toFixed(2)} mIU/L`}{tested && <strong>{row.action} · {row.action === row.expected ? "Matches" : "Does not match"}</strong>}</summary><p>Age {row.age}; {row.order}; {row.final ? "final" : "preliminary"}; linked FT4: {row.ft4}.</p><p>Expected: <strong>{row.expected}</strong>. {row.purpose}</p>{tested && <ol>{row.trace.map((step) => <li key={step}>{step}</li>)}</ol>}</details>)}</div>
    </section>
    <section className="lesson-section"><div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">Change review</p><h2>Review the orders and plan follow-up</h2></div></div>{Bridge && <div className="mdx-content embedded-mdx"><Bridge/></div>}
      <fieldset className="rule-approval"><legend>Recommendation to the laboratory director</legend>{reflexApprovalChoices.map((choice) => <label key={choice.id}><input type="radio" name="reflex-approval" checked={approval === choice.id} onChange={() => { setApproval(choice.id); onAttempt?.(true); }}/><span>{choice.label}</span></label>)}</fieldset>
      {approval && <div className={`feedback ${approval === "complete" && tested && summary.correct === summary.total ? "correct" : "incorrect"}`} role="status"><strong>{approval === "complete" && tested && summary.correct === summary.total ? "The rule and test record are ready for clinical review." : "The change is not ready for approval."}</strong><p>{reflexApprovalChoices.find((choice) => choice.id === approval)?.feedback}</p>{(!tested || summary.correct !== summary.total) && <p>Resolve the failed or untested actions before approval.</p>}</div>}
    </section><div className="reset-row"><button type="button" className="text-button" onClick={() => { setRecordId("display"); setConfig({ ...originalReflex }); setTested(false); setApproval(""); onAttempt?.(false); }}>Reset lesson interactions</button></div>
  </div>;
}
