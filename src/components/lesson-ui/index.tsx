import { Component, useId, useState, type ReactNode, type ComponentType } from "react";
export type FeedbackTone = "correct" | "incorrect" | "partial" | "info";
export function Feedback({
  tone = "info",
  children,
}: {
  tone?: FeedbackTone;
  children?: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {children && (
        <div className={"feedback " + tone}>
          <strong>
            {
              {
                correct: "Supported",
                incorrect: "Not supported",
                partial: "Incomplete",
                info: "Note",
              }[tone]
            }
          </strong>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}
export function LessonSection({
  title,
  purpose,
  children,
  number,
  eyebrow,
}: {
  title: string;
  purpose: string;
  children: ReactNode;
  number?: number;
  eyebrow?: string;
}) {
  const id = useId();
  return (
    <section
      className="lesson-section"
      id={"section-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      aria-labelledby={id}
    >
      <header>
        {(number || eyebrow) && (
          <p className="eyebrow">
            {number} {eyebrow}
          </p>
        )}
        <h2 id={id}>{title}</h2>
        <p className="section-guidance">{purpose}</p>
      </header>
      {children}
    </section>
  );
}
export function ChoiceGroup({
  question,
  value,
  choices,
  onChange,
}: {
  question: string;
  value: string;
  choices: readonly { id: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <fieldset className="choice-group">
      <legend>{question}</legend>
      {choices.map((c) => (
        <label key={c.id} className={value === c.id ? "choice-card selected" : "choice-card"}>
          <input
            type="radio"
            name={id}
            value={c.id}
            checked={value === c.id}
            onChange={() => onChange(c.id)}
          />
          <span>{c.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
export function ScrollRegion({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="table-scroll" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}
export function TabList({
  label,
  tabs,
  value,
  onChange,
  children,
}: {
  label: string;
  tabs: readonly { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <div role="tablist" aria-label={label}>
        {tabs.map((t, i) => (
          <button
            type="button"
            key={t.id}
            id={id + t.id}
            role="tab"
            aria-controls={id + "-panel"}
            aria-selected={value === t.id}
            tabIndex={value === t.id ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => {
              const n =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? tabs.length - 1
                    : e.key === "ArrowRight"
                      ? (i + 1) % tabs.length
                      : e.key === "ArrowLeft"
                        ? (i + tabs.length - 1) % tabs.length
                        : -1;
              if (n >= 0) {
                e.preventDefault();
                onChange(tabs[n].id);
                document.getElementById(id + tabs[n].id)?.focus();
              }
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={id + "-panel"} aria-labelledby={id + value}>
        {children}
      </div>
    </div>
  );
}
export function MdxBlock({ Content }: { Content?: ComponentType<Record<string, unknown>> }) {
  return Content ? (
    <div className="mdx-content embedded-mdx">
      <Content components={{ h1: "h3", h2: "h3", h3: "h3" }} />
    </div>
  ) : null;
}
export class LessonErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="feedback incorrect" role="alert">
        This part of the lesson could not load. The introduction, debrief and facilitator guide
        remain available. Please report which section failed.
      </div>
    ) : (
      this.props.children
    );
  }
}
export const orderedChoices = <T extends readonly { id: string }[]>(
  slug: string,
  choices: T,
): T[number][] => [...choices].sort((a, b) => hash(slug + a.id) - hash(slug + b.id));
function hash(text: string) {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

export { SourceInspector, SelectField } from "./controls";

export function DataTable({
  label,
  caption,
  children,
}: {
  label: string;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <ScrollRegion label={label}>
      <table>
        <caption>{caption}</caption>
        {children}
      </table>
    </ScrollRegion>
  );
}
export function ReplayResultList<T extends { id: string; pass: boolean }>({
  items,
  tested,
  disclosure = false,
  render,
}: {
  items: readonly T[];
  tested: boolean;
  disclosure?: boolean;
  render: (row: T) => ReactNode;
}) {
  const Entry = disclosure ? "details" : "article";
  return (
    <div className="rule-result-list">
      {items.map((row) => (
        <Entry key={row.id} className={tested ? (row.pass ? "pass" : "fail") : "pending"}>
          {render(row)}
        </Entry>
      ))}
    </div>
  );
}
