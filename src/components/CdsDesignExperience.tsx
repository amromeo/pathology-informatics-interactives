import { mustFind } from "./lesson-ui/mustFind";
import { sectionPurposes } from "../../content/lessons/five-rights-right-test/interaction";
import { ResetLessonButton } from "./ResetLessonButton";
import { useState } from "react";
import {
  cdsControls,
  cdsOutcome,
  cdsReplay,
  cdsSources,
  orderCases,
  originalCds,
  responseNotes,
  type CdsConfig,
} from "../../content/lessons/five-rights-right-test/interaction";
import {
  SourceInspector,
  Teaching,
  Topic5Section as Section,
  Topic5Select as Select,
  type Topic5Props,
} from "./Topic5Common";

export function CdsDesignExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [config, setConfig] = useState<CdsConfig>({ ...originalCds });
  const [selected, setSelected] = useState("CD-01");
  const [tested, setTested] = useState(false);
  const [response, setResponse] = useState<keyof typeof responseNotes | "">("");
  const current = cdsOutcome(
    config,
    mustFind(orderCases, (row) => row.id === selected, "CdsDesignExperience.tsx orderCases"),
  );
  const results = cdsReplay(config);
  const update = (key: string, value: string) => {
    setConfig({ ...config, [key]: value });
    setTested(false);
    setResponse("");
  };
  return (
    <div>
      <Section
        number={1}
        purpose={sectionPurposes[0]}
        title="Inspect when the guidance was delivered"
      >
        <SourceInspector records={cdsSources} />
      </Section>
      <Section number={2} purpose={sectionPurposes[1]} title="Design the ordering guidance">
        <Teaching Content={Concepts} />
        <div className="topic5-controls">
          {cdsControls.map((control) => (
            <Select
              key={control.key}
              label={control.label}
              value={config[control.key]}
              options={control.options}
              note={
                tested ? (control.notes as Record<string, string>)[config[control.key]] : undefined
              }
              onChange={(value) => update(control.key, value)}
            />
          ))}
        </div>
        <div className="cds-preview">
          <h3>Preview the selected encounter</h3>
          <Select
            label="Encounter to preview"
            value={selected}
            options={orderCases.map((row) => [row.id, row.id + " · " + row.label])}
            onChange={(value) => {
              setSelected(value);
              setResponse("");
            }}
          />
          <p>
            {current.label} ·{" "}
            {current.role === "ordering" ? "Ordering clinician" : "Collecting nurse"}
          </p>
          <dl>
            <dt>Delivery</dt>
            <dd>
              {config.channel === "composer" ? "Order composer" : "Inbox"} ·{" "}
              {config.timing === "before" ? "before signing" : "after signing"}
            </dd>
            <dt>Result</dt>
            <dd>{current.action}</dd>
          </dl>
          {current.shown && (
            <blockquote>
              {config.information === "policy"
                ? "Review repeat-testing policy before ordering. Refer to the laboratory utilization manual for the full policy and exceptions."
                : current.prior === "pending"
                  ? "A previous HbA1c order is pending. Review that order before requesting another. Continue if a repeat is clinically needed."
                  : "A usable final HbA1c report is available from " +
                    (Math.floor(current.hours / 24) +
                      (current.hours % 24
                        ? " days and " + (current.hours % 24) + " hours"
                        : " days")) +
                    " ago. Review the report and clinical context before deciding whether to repeat."}
            </blockquote>
          )}
          <p className="topic5-note" role="status">
            {current.note}
          </p>
          {current.shown && (
            <div className="hero-actions">
              <button
                type="button"
                disabled={current.blocked || current.role !== "ordering"}
                onClick={() => setResponse("cancel")}
              >
                Record cancellation after review
              </button>
              <button
                type="button"
                disabled={current.blocked || current.role !== "ordering"}
                onClick={() => setResponse("continue")}
              >
                Record continued order with reason
              </button>
            </div>
          )}
          <div role="status" aria-live="polite" aria-atomic="true">
            {response && (
              <p>
                {responseNotes[response]}{" "}
                {config.timing === "after" &&
                  "Because the order was already signed, this action requires a separate order change."}
              </p>
            )}
          </div>
        </div>
      </Section>
      <Section
        number={3}
        purpose={sectionPurposes[2]}
        title="Test the guidance against other encounters"
      >
        <Teaching Content={Bridge} />
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setTested(true);
            onAttempt?.(true);
          }}
        >
          Run eight encounter checks
        </button>
        <div role="status" aria-live="polite" aria-atomic="true">
          {tested && (
            <div>
              <p className="topic5-note">
                <strong>
                  {results.filter((row) => row.pass).length} / 8 checks meet the review
                  specification.
                </strong>{" "}
                {results.every((row) => row.pass)
                  ? config.format === "soft"
                    ? "Clinical discretion is preserved, but every suggestion still interrupts work. Compare an inline design before approving this burden."
                    : "The design preserves clinical discretion and avoids mandatory interruptions. Clinical review and a monitored pilot are still needed."
                  : "Read the failed encounters and revise the delivery. A repaired opening case must also preserve the exceptions."}
              </p>
              <div className="topic5-card-grid">
                {results.map((row) => (
                  <article className="artifact-card" key={row.id}>
                    <h3>
                      {row.id} · {row.pass ? "Meets specification" : "Needs revision"}
                    </h3>
                    <p>{row.label}</p>
                    <strong>{row.action}</strong>
                    <p>{row.note}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
      <ResetLessonButton
        fallback={() => {
          setConfig({ ...originalCds });
          setSelected("CD-01");
          setTested(false);
          setResponse("");
          onAttempt?.(false);
        }}
      />
    </div>
  );
}
