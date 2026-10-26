import { useId, useState } from "react";
export function SourceInspector({
  records,
}: {
  records: readonly { title: string; record: string; note: string }[];
}) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="topic5-source">
      <nav aria-label="Source records">
        {records.map((row, index) => (
          <button
            key={row.title}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {row.title}
          </button>
        ))}
      </nav>
      <article className="artifact-card">
        <h3>{records[selected].title}</h3>
        <pre>{records[selected].record}</pre>
      </article>
      <aside className="topic5-note" role="status">
        <strong>What this record establishes</strong>
        <p>{records[selected].note}</p>
      </aside>
    </div>
  );
}
export function SelectField<T extends string>({
  label,
  value,
  options,
  note,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly (readonly [T, string])[];
  note?: string;
  onChange: (value: T) => void;
}) {
  const id = useId();
  return (
    <label className="topic5-control">
      <span>{label}</span>
      <select
        aria-describedby={note ? id : undefined}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(options.find(([value]) => value === event.target.value)![0])}
      >
        {options.map(([id, text]) => (
          <option key={id} value={id}>
            {text}
          </option>
        ))}
      </select>
      <small id={id}>{note}</small>
    </label>
  );
}
