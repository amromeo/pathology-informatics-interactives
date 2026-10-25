import { sectionPurposes } from "../../content/lessons/validate-before-go-live/interaction";
import { orderedChoices } from "./lesson-ui";
import { ResetLessonButton } from "./ResetLessonButton";
import { useState } from "react";
import {
  changes,
  decisions,
  discordances,
  initialValidation,
  reviewValidation,
  studyRows,
  validationControls,
  type ValidationConfig,
} from "../../content/lessons/validate-before-go-live/interaction";
import {
  Teaching,
  Topic5Section as Section,
  Topic5Select as Select,
  type Topic5Props,
} from "./Topic5Common";

export function WsiValidationExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [config, setConfig] = useState<ValidationConfig>({ ...initialValidation });
  const [answers, setAnswers] = useState<Record<string, string>>({}),
    [changeAnswers, setChangeAnswers] = useState<Record<string, string>>({});
  const [tested, setTested] = useState(false),
    [decision, setDecision] = useState("");
  const results = reviewValidation(config, answers),
    complete = results.every((r) => r.pass);
  const invalidate = () => {
    setTested(false);
    setDecision("");
  };
  return (
    <div className="topic7">
      <Section number={1} purpose={sectionPurposes[0]} title="Inspect the study packet">
        <Teaching Content={Concepts} />
        <div className="topic5-card-grid">
          {studyRows.map((r) => (
            <article className="artifact-card" key={r.category}>
              <h3>{r.category}</h3>
              <strong>
                {r.agree}/{r.total} agreements · {((100 * r.agree) / r.total).toFixed(1)}%
              </strong>
              <p>{r.days} days between reads</p>
              <p>{r.note}</p>
            </article>
          ))}
        </div>
        <Teaching Content={Bridge} />
      </Section>
      <Section number={2} purpose={sectionPurposes[1]} title="Build the validation plan">
        <div className="topic5-controls">
          {validationControls.map((r, i) => (
            <Select
              key={r.key}
              label={r.label}
              options={r.options}
              value={config[r.key]}
              note={
                tested
                  ? (results[i].pass ? "Addressed. " : "Needs review. ") + results[i].note
                  : undefined
              }
              onChange={(v) => {
                setConfig({ ...config, [r.key]: v });
                invalidate();
              }}
            />
          ))}
        </div>
      </Section>
      <Section
        number={3}
        purpose={sectionPurposes[2]}
        title="Investigate the two fixed-tissue disagreements"
      >
        {discordances.map((r) => (
          <article className="t7-discordance" key={r.id}>
            <h3>{r.id}</h3>
            <pre>{r.record}</pre>
            <fieldset className="t7-choices">
              <legend>Next action for {r.id}</legend>
              {orderedChoices("WsiValidationExperience.tsx", r.choices).map((c) => (
                <label key={c.id}>
                  <input
                    aria-label={c.label}
                    type="radio"
                    name={r.id}
                    checked={answers[r.id] === c.id}
                    onChange={() => {
                      setAnswers({ ...answers, [r.id]: c.id });
                      invalidate();
                    }}
                  />
                  <span>
                    {c.label}
                    <div role="status" aria-live="polite" aria-atomic="true">
                      {answers[r.id] === c.id && <small>{c.note}</small>}
                    </div>
                  </span>
                </label>
              ))}
            </fieldset>
          </article>
        ))}
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setTested(true);
            onAttempt?.(true);
          }}
        >
          Check the validation plan
        </button>
        <div role="status" aria-live="polite" aria-atomic="true">
          {tested && (
            <div>
              <p className="topic5-note">
                {results.filter((r) => r.pass).length}/7 plan checks addressed.{" "}
                {complete
                  ? "The plan is ready for faculty review; corrective work and clinical approval remain outstanding."
                  : "Revise the gaps before recommending a scope."}
              </p>
              {results.map((r) => (
                <article className="t7-result" key={r.label}>
                  <strong>
                    {r.pass ? "Addressed" : "Needs review"} · {r.label}
                  </strong>
                  <p>{r.note}</p>
                </article>
              ))}
            </div>
          )}
        </div>
        <fieldset className="t7-choices">
          <legend>Recommendation to the director</legend>
          {decisions.map((r) => (
            <label key={r.id}>
              <input
                aria-label={r.label}
                type="radio"
                name="wsi-decision"
                checked={decision === r.id}
                onChange={() => {
                  setDecision(r.id);
                  onAttempt?.(true);
                }}
              />
              <span>
                {r.label}
                <div role="status" aria-live="polite" aria-atomic="true">
                  {decision === r.id && (
                    <small>
                      {r.note}
                      {r.id === "limited" &&
                        !complete &&
                        " Your plan still has gaps; complete the comparison design and both investigations."}
                    </small>
                  )}
                </div>
              </span>
            </label>
          ))}
        </fieldset>
      </Section>
      <Section number={4} purpose={sectionPurposes[3]} title="Review changes after approval">
        {changes.map((r) => (
          <div className="t7-change" key={r.id}>
            <Select
              label={r.label}
              value={changeAnswers[r.id] ?? ""}
              options={[
                ["", "Choose a response"],
                ["document", "Document and verify the administrative change"],
                ["targeted", "Assess impact and perform targeted checks or revalidation"],
                ["new", "Validate the new application and review regulatory scope"],
              ]}
              onChange={(v) => setChangeAnswers({ ...changeAnswers, [r.id]: v })}
            />
            <div role="status" aria-live="polite" aria-atomic="true">
              {changeAnswers[r.id] && (
                <p className="topic5-note">
                  {changeAnswers[r.id] === r.answer
                    ? "Appropriate review scope. "
                    : "Reconsider the effect of this change. "}
                  {r.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </Section>
      <ResetLessonButton
        fallback={() => {
          setConfig({ ...initialValidation });
          setAnswers({});
          setChangeAnswers({});
          setDecision("");
          setTested(false);
          onAttempt?.(false);
        }}
      />
    </div>
  );
}
