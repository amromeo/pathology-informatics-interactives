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

const matrixItems = ["Frozen sections", "All display sites", "All intended users", "Adequate washout", "Discordance review"];

export function WsiValidationLab() {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState("center");
  const [matrix, setMatrix] = useState<string[]>([]);
  const ready = matrix.length === matrixItems.length;
  const imageUrl = `${import.meta.env?.BASE_URL ?? "/"}assets/synthetic-wsi-field.webp`;
  const transformOrigin = position === "fold" ? "80% 18%" : position === "detail" ? "28% 70%" : "50% 50%";
  return <section className="pilot-lab" aria-labelledby="wsi-lab-title"><p className="eyebrow">Pilot lab · synthetic WSI review</p><h2 id="wsi-lab-title">Inspect discordance and complete the validation matrix</h2><div className="wsi-layout"><div><div className="wsi-toolbar" role="group" aria-label="Image navigation"><button type="button" onClick={() => setZoom(Math.max(1, zoom - 0.5))}>−</button><span>{zoom.toFixed(1)}×</span><button type="button" onClick={() => setZoom(Math.min(2.5, zoom + 0.5))}>+</button><button type="button" onClick={() => setPosition("detail")}>Diagnostic field</button><button type="button" onClick={() => setPosition("fold")}>Fold / focus risk</button></div><div className="wsi-viewport"><img src={imageUrl} alt="Synthetic H&E-style tissue field with focused glands and a blurred folded region" style={{ transform: `scale(${zoom})`, transformOrigin }} /></div><p className="synthetic-note">AI-generated synthetic educational image · not a diagnostic specimen</p></div><fieldset className="validation-matrix"><legend>Evidence required for the intended scope</legend>{matrixItems.map((item) => <label key={item}><input type="checkbox" checked={matrix.includes(item)} onChange={(event) => setMatrix((current) => event.target.checked ? [...current, item] : current.filter((entry) => entry !== item))}/>{item}</label>)}<strong className={ready ? "status-good" : "status-warn"}>{ready ? "Matrix complete for review" : `${matrixItems.length - matrix.length} evidence areas remain`}</strong></fieldset></div></section>;
}

export function PilotLab({ kind }: { kind?: string }) {
  return useMemo(() => {
    if (kind === "interoperability") return <FlagLab />;
    if (kind === "downtime") return <DowntimeLab />;
    if (kind === "digital-pathology") return <WsiValidationLab />;
    return null;
  }, [kind]);
}
