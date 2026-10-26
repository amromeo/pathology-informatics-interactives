import { mustFind } from "./lesson-ui/mustFind";
import { sectionPurposes } from "../../content/lessons/choose-and-govern-lis/interaction";
import { ResetLessonButton } from "./ResetLessonButton";
import { useState } from "react";
import {
  vendors,
  evidenceRows,
  evidenceLabel,
  initialWeights,
  vendorSummary,
  selectionSources,
  lifecycleCases,
  selectionCopy,
  type Weights,
} from "../../content/lessons/choose-and-govern-lis/interaction";
import {
  SourceInspector,
  Teaching,
  Topic5Section as Section,
  Topic5Select as Select,
  type Topic5Props,
} from "./Topic5Common";

export function LisSelectionExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [weights, setWeights] = useState<Weights>({ ...initialWeights });
  const [extras, setExtras] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [lifecycle, setLifecycle] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState("");
  const summaries = vendors.map((v) => vendorSummary(v.id, weights, answers, extras));
  const accurate = summaries.every((row) => row.accurate);
  const complete = lifecycleCases.every((row) => lifecycle[row.id] === row.answer);
  const chosen = summaries.find((row) => row.id === recommendation);
  const feedback = !accurate
    ? selectionCopy.wrong
    : !extras
      ? selectionCopy.includeCosts
      : !complete
        ? selectionCopy.finishLifecycle
        : recommendation === "defer"
          ? selectionCopy.defer
          : chosen?.eligible
            ? selectionCopy.ready
            : selectionCopy.blocked;
  return (
    <div className="topic8-experience">
      <Section
        number={1}
        purpose={sectionPurposes[0]}
        title="Read the purchasing summary and requirements"
      >
        <SourceInspector records={selectionSources} />
      </Section>
      <Section
        number={2}
        purpose={sectionPurposes[1]}
        title="Decide what each demonstration showed"
      >
        <Teaching Content={Concepts} />
        <div className="topic5-card-grid">
          {evidenceRows.map((row) => (
            <article key={row.id} className="artifact-card">
              <h3>
                {
                  mustFind(
                    vendors,
                    (v) => v.id === row.vendor,
                    "LisSelectionExperience.tsx vendors",
                  ).name
                }{" "}
                · {row.requirement}
              </h3>
              <p className="topic8-report">{row.record}</p>
              <Select
                label={evidenceLabel(row)}
                value={answers[row.id] ?? ""}
                options={[
                  ["", "What did the demonstration show?"],
                  ["pass", "Shown working"],
                  ["fail", "Shown failing"],
                  ["unknown", "Not shown yet"],
                ]}
                onChange={(value) => {
                  setAnswers({ ...answers, [row.id]: value });
                  setReviewed(false);
                  setRecommendation("");
                }}
                note={
                  answers[row.id]
                    ? (answers[row.id] === row.answer
                        ? "Matches the record. "
                        : "Look at the record again. ") + row.note
                    : undefined
                }
              />
            </article>
          ))}
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setReviewed(true);
            onAttempt?.(true);
          }}
        >
          Check my nine classifications
        </button>
        <div role="status" aria-live="polite" aria-atomic="true">
          {reviewed && (
            <p>
              {evidenceRows.filter((row) => answers[row.id] === row.answer).length} of{" "}
              {evidenceRows.length} classifications match the records.
            </p>
          )}
        </div>
      </Section>
      <Section
        number={3}
        purpose={sectionPurposes[2]}
        title="Compare preferences and five-year costs"
      >
        <Teaching Content={Bridge} />
        <div className="topic5-controls">
          {(["usability", "analytics", "training"] as const).map((key) => (
            <label className="topic5-control" key={key}>
              <span>
                {key[0].toUpperCase() + key.slice(1)} weight: {weights[key]}
              </span>
              <input
                type="range"
                aria-label={key + " weight"}
                min="0"
                max="100"
                step="10"
                value={weights[key]}
                onChange={(event) => {
                  setWeights({ ...weights, [key]: Number(event.target.value) });
                  setRecommendation("");
                }}
              />
            </label>
          ))}
        </div>
        <label className="topic8-cost">
          <input
            type="checkbox"
            checked={extras}
            onChange={(event) => {
              setExtras(event.target.checked);
              setRecommendation("");
            }}
          />{" "}
          Add interface, data migration and exit costs
        </label>
        <p>
          {extras
            ? "All five cost items are now included. Staff time and other local costs are still left out."
            : "Only installation and five years of service fees are included. The other costs are missing from the total, but they still have to be paid."}
        </p>
        <div className="topic5-card-grid">
          {summaries.map((row) => (
            <article className="artifact-card" key={row.id}>
              <h3>{row.name}</h3>
              <p>
                Preference score:{" "}
                <strong>
                  {row.score === null ? "No weights selected" : row.score.toFixed(2) + " / 5"}
                </strong>
              </p>
              <p>
                Requirements:{" "}
                <strong>
                  {!reviewed
                    ? "Check your classifications first"
                    : row.eligible
                      ? "All three shown working"
                      : "Not all three shown working"}
                </strong>
              </p>
              <dl className="topic8-costs">
                <dt>Installation</dt>
                <dd>{row.upfront}</dd>
                <dt>Service: 5 × {row.annual}</dt>
                <dd>{5 * row.annual}</dd>
                <dt>Interfaces{row.id === "alder" ? " (committee estimate)" : ""}</dt>
                <dd>{row.interfaces}</dd>
                <dt>Data migration</dt>
                <dd>{row.migration}</dd>
                <dt>Exit</dt>
                <dd>{row.exit}</dd>
                <dt>Total (USD thousands)</dt>
                <dd>
                  <strong>{row.cost}</strong>
                </dd>
              </dl>
            </article>
          ))}
        </div>
        <p>{selectionCopy.eligibility}</p>
      </Section>
      <Section
        number={4}
        purpose={sectionPurposes[3]}
        title="Plan for go-live, upgrades and retirement"
      >
        {lifecycleCases.map((row) => (
          <article className="topic8-preview" key={row.id}>
            <h3>{row.title}</h3>
            <p>{row.record}</p>
            <Select
              label={row.title}
              value={lifecycle[row.id] ?? ""}
              options={[["", "Choose the next action"], ...row.options]}
              onChange={(value) => {
                setLifecycle({ ...lifecycle, [row.id]: value });
                setRecommendation("");
              }}
              note={
                lifecycle[row.id]
                  ? (row.notes as Record<string, string>)[lifecycle[row.id]]
                  : undefined
              }
            />
          </article>
        ))}
        <Select
          label="Selection recommendation"
          value={recommendation}
          options={[
            ["", "Choose a recommendation"],
            ...vendors.map((v) => [v.id, "Take " + v.name + " forward"] as const),
            ["defer", "Wait until the missing tests and contract questions are answered"],
          ]}
          onChange={(value) => {
            setRecommendation(value);
            setReviewed(true);
            onAttempt?.(true);
          }}
        />
        <div role="status" aria-live="polite" aria-atomic="true">
          {recommendation && <p className="topic5-note">{feedback}</p>}
        </div>
      </Section>
      <ResetLessonButton
        fallback={() => {
          setAnswers({});
          setWeights({ ...initialWeights });
          setExtras(false);
          setReviewed(false);
          setLifecycle({});
          setRecommendation("");
          onAttempt?.(false);
        }}
      />
    </div>
  );
}
