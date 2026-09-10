import { useState, type ComponentType, type ReactNode } from "react";

export type Topic5Props = { Concepts?: ComponentType; Bridge?: ComponentType; onAttempt?: (value: boolean) => void };
export function Teaching({ Content }: { Content?: ComponentType }) {
  return Content ? <div className="mdx-content embedded-mdx"><Content/></div> : null;
}
export function Topic5Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="lesson-section topic5-section"><h2>{title}</h2>{children}</section>;
}
export function SourceInspector({ records }: { records: readonly { title: string; record: string; note: string }[] }) {
  const [selected, setSelected] = useState(0);
  return <div className="topic5-source"><nav aria-label="Source records">{records.map((row, index) => <button key={row.title} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{row.title}</button>)}</nav><article className="artifact-card"><h3>{records[selected].title}</h3><pre>{records[selected].record}</pre></article><aside className="topic5-note" role="status"><strong>What this record establishes</strong><p>{records[selected].note}</p></aside></div>;
}
export function Topic5Select({ label, value, options, note, onChange }: { label: string; value: string; options: readonly (readonly [string,string])[]; note?: string; onChange: (value: string) => void }) {
  return <label className="topic5-control"><span>{label}</span><select aria-label={label} value={value} onChange={event => onChange(event.target.value)}>{options.map(([id,text]) => <option key={id} value={id}>{text}</option>)}</select>{note && <small role="status">{note}</small>}</label>;
}
