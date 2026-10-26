import { sectionPurposes } from "../../content/lessons/alert-everyone-ignores/interaction";
import { lessonCopy } from "../../content/lessons/alert-everyone-ignores/interaction";
import { ResetLessonButton } from "./ResetLessonButton";
import { useState } from "react";
import {
  alertControls,
  alertReplay,
  alertSources,
  measures,
  originalAlert,
  pilotComparison,
  pilotWeeks,
  rolloutPlans,
  type AlertConfig,
} from "../../content/lessons/alert-everyone-ignores/interaction";
import {
  SourceInspector,
  Teaching,
  Topic5Section as Section,
  Topic5Select as Select,
  type Topic5Props,
} from "./Topic5Common";

export function AlertEvaluationExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [config, setConfig] = useState<AlertConfig>({ ...originalAlert });
  const [comparison, setComparison] = useState("yes");
  const [selected, setSelected] = useState<string[]>([]);
  const [plan, setPlan] = useState("");
  const events = alertReplay(config);
  const report = pilotComparison(comparison === "yes");
  const suitable =
    config.target === "recent" &&
    config.person === "ordering" &&
    config.frequency === "once" &&
    config.format !== "hard";
  const complete =
    suitable &&
    comparison === "yes" &&
    measures.every((row) => selected.includes(row.id) === row.correct) &&
    plan === "review";
  return (
    <div>
      <Section
        number={1}
        purpose={sectionPurposes[0]}
        title="Read the message report and linked records"
      >
        <SourceInspector records={alertSources} />
      </Section>
      <Section
        number={2}
        purpose={sectionPurposes[1]}
        title="Retarget the alert and replay the audit"
      >
        <Teaching Content={Concepts} />
        <div className="topic5-controls">
          {alertControls.map((control) => (
            <Select
              key={control.key}
              label={control.label}
              value={config[control.key]}
              options={control.options}
              note={(control.notes as Record<string, string>)[config[control.key]]}
              onChange={(value) => {
                setConfig({ ...config, [control.key]: value });
                setPlan("");
              }}
            />
          ))}
        </div>
        <div className="topic5-dashboard" role="status">
          <p>
            <strong>{events.filter((row) => row.shown).length} presentations</strong> ·{" "}
            {events.filter((row) => row.interrupt).length} mandatory interruptions ·{" "}
            {events.filter((row) => row.blocked).length} documented-reason blocks
          </p>
          <p>{lessonCopy.text01}</p>
        </div>
        <div className="topic5-card-grid">
          {events.map((row) => (
            <article className="artifact-card" key={row.id}>
              <h3>
                {row.id} · {row.time} · {row.decision}
              </h3>
              <p>{row.label}</p>
              <strong>{row.action}</strong>
              <p>{row.note}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section number={3} purpose={sectionPurposes[2]} title="Interpret the ward pilot">
        <Teaching Content={Bridge} />
        <Select
          label="Comparison included"
          value={comparison}
          options={[
            ["yes", "Pilot and comparison wards"],
            ["no", "Pilot ward only"],
          ]}
          onChange={(value) => {
            setComparison(value);
            setPlan("");
          }}
          note={
            comparison === "yes"
              ? "The comparison ward helps identify a change occurring outside the pilot, although the wards may still differ."
              : "The pilot-only view cannot distinguish the intervention from changes affecting both wards."
          }
        />
        <div
          className="topic5-table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Scrollable records 1"
        >
          <table>
            <caption>{lessonCopy.text02}</caption>
            <thead>
              <tr>
                <th>Week</th>
                <th>Period</th>
                <th>Pilot</th>
                {comparison === "yes" && <th>Comparison</th>}
              </tr>
            </thead>
            <tbody>
              {pilotWeeks.map((row) => (
                <tr key={row.week}>
                  <th scope="row">{row.week}</th>
                  <td>{row.period}</td>
                  <td>
                    {row.pilot}/{row.denominator} [{(row.pilot / row.denominator) * 1000} per 1,000]
                  </td>
                  {comparison === "yes" && (
                    <td>
                      {row.comparison}/{row.denominator} [
                      {(row.comparison / row.denominator) * 1000} per 1,000]
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="cds-trend"
          aria-label="Weekly avoidable repeat rates, same data as the table"
        >
          {pilotWeeks.map((row) => (
            <div key={row.week}>
              <strong>Week {row.week}</strong>
              <span style={{ width: (row.pilot / row.denominator) * 1000 + "%" }}>
                Pilot {(row.pilot / row.denominator) * 1000}
              </span>
              {comparison === "yes" && (
                <span
                  className="comparison-bar"
                  style={{ width: (row.comparison / row.denominator) * 1000 + "%" }}
                >
                  Comparison {(row.comparison / row.denominator) * 1000}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="topic5-note" role="status">
          Pilot: {report.before} → {report.after} per 1,000, a change of {report.change}.{" "}
          {report.adjusted !== null
            ? "Comparison change: " +
              report.comparisonChange +
              ". Difference between changes: " +
              report.adjusted +
              " per 1,000. This observational comparison does not establish causation."
            : "The 40-per-1,000 decrease cannot all be attributed to the alert."}
        </p>
        <fieldset className="topic5-plan">
          <legend>Include measures in the review plan</legend>
          {measures.map((row) => (
            <label key={row.id}>
              <input
                type="checkbox"
                checked={selected.includes(row.id)}
                onChange={() => {
                  setSelected(
                    selected.includes(row.id)
                      ? selected.filter((id) => id !== row.id)
                      : [...selected, row.id],
                  );
                  setPlan("");
                }}
              />
              <span>
                {row.label}
                <div role="status" aria-live="polite" aria-atomic="true">
                  {selected.includes(row.id) && <small>{row.note}</small>}
                </div>
              </span>
            </label>
          ))}
        </fieldset>
        <fieldset className="topic5-plan">
          <legend>Recommendation after reviewing SR-14</legend>
          {rolloutPlans.map((row) => (
            <label key={row.id}>
              <input
                type="radio"
                name="cds-rollout"
                checked={plan === row.id}
                onChange={() => {
                  setPlan(row.id);
                  onAttempt?.(true);
                }}
              />
              <span>
                {row.label}
                <div role="status" aria-live="polite" aria-atomic="true">
                  {plan === row.id && <small>{row.note}</small>}
                </div>
              </span>
            </label>
          ))}
        </fieldset>
        <div role="status" aria-live="polite" aria-atomic="true">
          {plan && (
            <p className="topic5-note">
              {complete
                ? "The review plan includes targeting, comparison data, benefit, burden, and safety. This supports investigating and revising the limited pilot, not immediate expansion."
                : "Before completing the review, target the relevant ordering decisions, suppress repeated presentations, preserve the ability to proceed, include the comparison ward and all four measure categories, and address the delayed test."}
            </p>
          )}
        </div>
      </Section>
      <ResetLessonButton
        fallback={() => {
          setConfig({ ...originalAlert });
          setComparison("yes");
          setSelected([]);
          setPlan("");
          onAttempt?.(false);
        }}
      />
    </div>
  );
}
