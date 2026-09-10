import { useState } from "react";
import { flagFields, flagReplay, flagTrace, originalFlag } from "../../content/lessons/follow-the-flag/interaction";
import { SourceInspector, Teaching, Topic5Section, Topic5Select, type Topic5Props } from "./Topic5Common";

export function FlagExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [config, setConfig] = useState({ ...originalFlag });
  const [field, setField] = useState(0);
  const [tested, setTested] = useState(false);
  const [review, setReview] = useState(false);
  const results = flagReplay(config);
  const passed = results.filter(row => row.pass).length;
  function update(key: keyof typeof config, value: string) { setConfig({ ...config, [key]: value }); setTested(false); setReview(false); }
  return <div>
    <Topic5Section title="Compare the four system records"><SourceInspector records={flagTrace}/></Topic5Section>
    <Topic5Section title="Inspect the observation fields"><Teaching Content={Concepts}/><pre className="message-code">OBX|1|NM|K^Potassium^L||6.8|mmol/L|3.5-5.0|CH|||F</pre><nav className="topic5-tabs" aria-label="Observation fields">{flagFields.map((row,index) => <button type="button" key={row.id} aria-pressed={field === index} onClick={() => setField(index)}>{row.id} · {row.value}</button>)}</nav><aside className="topic5-note" role="status"><strong>{flagFields[field].id}</strong><p>{flagFields[field].meaning}</p></aside></Topic5Section>
    <Topic5Section title="Translate the flags and inspect the resulting display"><div className="topic5-controls">
      <Topic5Select label="Critical-high mapping" value={config.high} options={[["CH","CH · unchanged"],["H","H · high"],["HH","HH · critical high"]]} note={config.high === "HH" ? "The critical-high category is preserved." : config.high === "H" ? "The receiver recognizes high, but critical severity is lost." : "The receiver does not recognize the local CH category."} onChange={value => update("high",value)}/>
      <Topic5Select label="Critical-low mapping" value={config.low} options={[["CL","CL · unchanged"],["L","L · low"],["LL","LL · critical low"]]} note={config.low === "LL" ? "The critical-low category is preserved." : config.low === "L" ? "The receiver recognizes low, but critical severity is lost." : "The receiver does not recognize the local CL category."} onChange={value => update("low",value)}/>
      <Topic5Select label="Unmapped flag handling" value={config.unknown} options={[["review","Visible review exception"],["normal","Display as normal"]]} note={config.unknown === "review" ? "An unknown category remains visible for investigation." : "Unknown is being converted into normal, which the source did not establish."} onChange={value => update("unknown",value)}/>
    </div><button className="primary-button" type="button" onClick={() => { setTested(true); onAttempt?.(true); }}>Replay six flag categories</button><p role="status">{tested ? `${passed} of 6 category outcomes match.` : "Run the complete category set after each change."}</p><div className="rule-result-list">{results.map(row => <article key={row.id} className={tested ? row.pass ? "pass" : "fail" : "pending"}><h3>{row.id} · Potassium {row.value} mmol/L</h3><p>LIS flag: <code>{row.local}</code> → outbound flag: <code>{row.wire}</code></p><p><strong>EHR: {row.display}</strong></p>{tested && <p role="status">{row.pass ? "Matches" : "Does not match"} · Expected: {row.expected}</p>}</article>)}</div></Topic5Section>
    <Topic5Section title="Review the report and affected results"><Teaching Content={Bridge}/><label className="topic5-check"><input type="checkbox" checked={review} onChange={event => setReview(event.target.checked)}/>Verify actual EHR reports and reconcile already affected results.</label>{review && <p className="topic5-note" role="status">{tested && passed === 6 ? "The category replay supports report validation and review of affected results." : "Complete the matching six-category replay before recommending this mapping."}</p>}</Topic5Section>
    <button className="text-button" type="button" onClick={() => { setConfig({ ...originalFlag }); setField(0); setTested(false); setReview(false); onAttempt?.(false); }}>Reset lesson interactions</button>
  </div>;
}
