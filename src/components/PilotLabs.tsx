import { useMemo, useState } from "react";

const hl7Fields = [
  ["OBX-3", "Observation identifier", "K^Potassium"],
  ["OBX-5", "Observation value", "6.8"],
  ["OBX-6", "Units", "mmol/L"],
  ["OBX-7", "Reference range", "3.5–5.0"],
  ["OBX-8", "Abnormal flags", "CH"],
];

export function FlagLab() {
  const [field, setField] = useState("OBX-8");
  const [high, setHigh] = useState("CH");
  const [low, setLow] = useState("CL");
  const [run, setRun] = useState(false);
  const selected = hl7Fields.find(([id]) => id === field) ?? hl7Fields[0];
  const ready = high === "HH" && low === "LL";
  return <section className="pilot-lab" aria-labelledby="message-lab-title"><p className="eyebrow">Pilot lab · message and mapping</p><h2 id="message-lab-title">Inspect the field, then translate the category</h2><pre className="message-code"><code>OBX|1|NM|K^Potassium||6.8|mmol/L|3.5-5.0|<mark>CH</mark>|||F</code></pre><div className="field-repair-grid"><div className="field-list">{hl7Fields.map(([id, name, value]) => <button key={id} type="button" className={field === id ? "selected" : ""} onClick={() => setField(id)}><span>{id}</span><strong>{name}</strong><code>{value}</code></button>)}</div><article className="field-detail"><span>What this field carries</span><h3>{selected[0]} · {selected[1]}</h3><p>{selected[0] === "OBX-8" ? "The observation interpretation category. In this message, CH is the sender’s local code for critical high." : `In this message, the field carries “${selected[2]}”.`}</p><div className="map-row"><label>CH → <select value={high} onChange={(event) => { setHigh(event.target.value); setRun(false); }}><option>CH</option><option>H</option><option>HH</option></select></label><label>CL → <select value={low} onChange={(event) => { setLow(event.target.value); setRun(false); }}><option>CL</option><option>L</option><option>LL</option></select></label></div><button className="primary-button" type="button" onClick={() => setRun(true)}>Test flag set</button>{run && <p className={ready ? "lab-success" : "lab-failure"} role="status">{ready ? "All routine and critical categories preserve severity." : "The critical categories are still unrecognized or collapsed."}</p>}</article></div></section>;
}

const downtimeStages = [
  { title: "Activate", prompt: "Identifiers and electronic orders stop flowing.", good: "Declare downtime; establish temporary identifiers and command", bad: "Wait for systems to return" },
  { title: "Operate", prompt: "Nine critical results require communication.", good: "Use a controlled call/read-back log with ownership", bad: "Let each unit choose a method" },
  { title: "Recover", prompt: "Systems return with paper records still active.", good: "Freeze transitions; reconcile identities, orders, results, and repeats", bad: "Discard paper and resume normal work" },
];

export function DowntimeLab() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const risk = Object.values(answers).filter((answer) => !answer).length;
  return <section className="pilot-lab" aria-labelledby="downtime-lab-title"><p className="eyebrow">Pilot lab · staged tabletop</p><h2 id="downtime-lab-title">Keep a trustworthy record through every phase</h2><div className="timeline-lab">{downtimeStages.map((stage, index) => <article key={stage.title} className={answers[index] === true ? "complete" : answers[index] === false ? "at-risk" : ""}><span>{index + 1}</span><h3>{stage.title}</h3><p>{stage.prompt}</p><button type="button" onClick={() => setAnswers((current) => ({ ...current, [index]: true }))}>{stage.good}</button><button type="button" onClick={() => setAnswers((current) => ({ ...current, [index]: false }))}>{stage.bad}</button></article>)}</div><p className={risk ? "lab-failure" : Object.keys(answers).length === 3 ? "lab-success" : "lab-note"} role="status">{risk ? `${risk} phase${risk > 1 ? "s" : ""} introduces uncontrolled patient-record risk.` : Object.keys(answers).length === 3 ? "The plan controls activation, degraded operations, and reconciliation." : "Choose an action for each phase."}</p></section>;
}

export function PilotLab({ kind }: { kind?: string }) {
  return useMemo(() => {
    if (kind === "interoperability") return <FlagLab />;
    if (kind === "downtime") return <DowntimeLab />;
    return null;
  }, [kind]);
}
