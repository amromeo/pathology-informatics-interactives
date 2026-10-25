import { ChoiceGroup, Feedback } from "./lesson-ui";
import {
  pathwayExplanations,
  classExplanations,
  evidenceQuestions,
} from "../../content/lessons/inside-a-results-journey/interaction";
import { lessonCopy } from "../../content/lessons/inside-a-results-journey/interaction";
import { orderedChoices } from "./lesson-ui";
import { tabKeys } from "./lesson-ui/tabKeys";
import { ResetLessonButton } from "./ResetLessonButton";
import { useState, type ComponentType } from "react";
import {
  firstChecks,
  classLabels,
  componentClasses,
  connectionChoices,
  evidenceViews,
  pathwayOrder,
  pathwayNodes,
  repairChoices,
  validationCases,
} from "../../content/lessons/inside-a-results-journey/interaction";

type MdxComponent = ComponentType<Record<string, unknown>>;

const expectedPath = [...pathwayOrder];

export function ResultJourneyExperience({
  Concepts,
  Downtime,
  onAttempt,
}: {
  Concepts?: MdxComponent;
  Downtime?: MdxComponent;
  onAttempt?: (attempted: boolean) => void;
}) {
  const [evidenceAnswers, setEvidenceAnswers] = useState<Record<string, string>>({});
  const [firstCheck, setFirstCheck] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [pathFeedback, setPathFeedback] = useState(
    "Select the first component in the reporting path.",
  );
  const [classifications, setClassifications] = useState<Record<string, string>>({});
  const [activeEvidence, setActiveEvidence] = useState("analyzer");
  const [seenEvidence, setSeenEvidence] = useState<string[]>(["analyzer"]);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [repair, setRepair] = useState<string | null>(null);
  const [testsRun, setTestsRun] = useState(false);

  const selectedFirstCheck = firstChecks.find((choice) => choice.id === firstCheck);
  const selectedEvidence =
    evidenceViews.find((view) => view.id === activeEvidence) ?? evidenceViews[0];
  const selectedDiagnosis = connectionChoices.find((choice) => choice.id === diagnosis);
  const selectedRepair = repairChoices.find((choice) => choice.id === repair);
  const mapComplete = path.length === expectedPath.length;
  const classifiedCount = componentClasses.filter(
    (item) => classifications[item.id] === item.answer,
  ).length;
  const validationPassed = repair === "restore-firewall";

  const placeNode = (id: string) => {
    const expected = expectedPath[path.length];
    if (id !== expected) {
      setPathFeedback(
        path.length === 0
          ? "Start where testing occurs: the analyzer."
          : `That is not the next stop after ${pathwayNodes.find((node) => node.id === path[path.length - 1])?.label}.`,
      );
      return;
    }
    const nextPath = [...path, id];
    setPath(nextPath);
    setPathFeedback(
      nextPath.length === expectedPath.length
        ? "The reporting path is complete. " + pathwayExplanations[id]
        : pathwayExplanations[id] + " Select the next component.",
    );
  };

  const chooseEvidence = (id: string) => {
    setActiveEvidence(id);
    setSeenEvidence((current) => (current.includes(id) ? current : [...current, id]));
  };

  const reset = () => {
    setEvidenceAnswers({});
    setFirstCheck(null);
    setPath([]);
    setPathFeedback("Select the first component in the reporting path.");
    setClassifications({});
    setActiveEvidence("analyzer");
    setSeenEvidence(["analyzer"]);
    setDiagnosis(null);
    setRepair(null);
    setTestsRun(false);
    onAttempt?.(false);
  };

  return (
    <div className="experience result-journey">
      <section className="lesson-section journey-call-section" aria-labelledby="journey-call-title">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div>
            <p className="eyebrow">Call from the ED</p>
            <h2 id="journey-call-title">Was the CBC ever completed?</h2>
          </div>
        </div>
        <div className="journey-call-grid">
          <article className="ehr-pending-card">
            <header>
              <span>System record</span>
              <strong>Emergency department chart</strong>
            </header>
            <div>
              <span>Suspected gastrointestinal bleed</span>
              <h3>Complete blood count</h3>
              <p>
                <strong>Status in EHR:</strong> Pending
              </p>
              <small>“We are waiting for the hemoglobin. Can you tell us what is happening?”</small>
            </div>
          </article>
          <div>
            <p className="section-guidance journey-guidance">
              What should the laboratory do first?
            </p>
            <div
              className="choice-stack compact-choices"
              role="radiogroup"
              aria-label="First laboratory check"
            >
              {firstChecks.map((choice) => (
                <label key={choice.id} className={firstCheck === choice.id ? "selected" : ""}>
                  <input
                    type="radio"
                    name="ResultJourneyExperience.tsx-1"
                    checked={firstCheck === choice.id}
                    onChange={() => setFirstCheck(choice.id)}
                  />
                  <span>
                    <strong>{choice.label}</strong>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
          {selectedFirstCheck && (
            <div className={`feedback ${selectedFirstCheck.correct ? "correct" : "incorrect"}`}>
              <strong>
                {selectedFirstCheck.correct
                  ? "Start in the LIS."
                  : "Check the laboratory record first."}
              </strong>
              <p>{selectedFirstCheck.feedback}</p>
            </div>
          )}
        </div>
        {firstCheck === "lis" && (
          <article className="lis-result-card" aria-label="LIS result record">
            <header>
              <span>Laboratory information system</span>
              <strong>CBC · H26-01482</strong>
            </header>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>Final</dd>
              </div>
              <div>
                <dt>Verified by</dt>
                <dd>M. Okafor, MLS</dd>
              </div>
              <div>
                <dt>Verified</dt>
                <dd>09:42</dd>
              </div>
              <div>
                <dt>Hemoglobin</dt>
                <dd>7.4 g/dL · Low</dd>
              </div>
            </dl>
          </article>
        )}
      </section>

      <section className="lesson-section" aria-labelledby="pathway-title">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div>
            <p className="eyebrow">Reporting path</p>
            <h2 id="pathway-title">Build the path to the EHR</h2>
          </div>
        </div>
        <p className="section-guidance">
          Starting with the analyzer, select each component in the order the result passes through
          it.
        </p>
        <div className="pathway-map" aria-label="Laboratory result reporting path">
          {expectedPath.map((_, index) => {
            const node = pathwayNodes.find((item) => item.id === path[index]);
            return (
              <div className="pathway-position" key={index}>
                <span className="pathway-node-number">{index + 1}</span>
                {node ? (
                  <>
                    <strong>{node.label}</strong>
                    <small>{node.location}</small>
                  </>
                ) : (
                  <>
                    <strong>Choose next</strong>
                    <small>Pathway position {index + 1}</small>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div
          className="pathway-palette"
          role="group"
          aria-label="Components available for the reporting path"
        >
          {pathwayNodes.map((node) => (
            <button
              type="button"
              key={node.id}
              aria-disabled={path.includes(node.id)}
              onClick={() => {
                if (!path.includes(node.id)) placeNode(node.id);
              }}
            >
              <strong>{node.label}</strong>
              <small>{node.location}</small>
            </button>
          ))}
        </div>
        <div className="pathway-status">
          <span>
            {path.length} of {expectedPath.length} placed
          </span>
          <p role="status">{pathFeedback}</p>
          {path.length > 0 && (
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setPath([]);
                setPathFeedback("Select the first component in the reporting path.");
              }}
            >
              Start the map over
            </button>
          )}
        </div>

        {mapComplete && (
          <div className="journey-concepts">
            {Concepts && (
              <div className="mdx-content embedded-mdx">
                <Concepts />
              </div>
            )}
            <h3>Classify the components</h3>
            <p>{lessonCopy.text01}</p>
            <div className="classification-list">
              {componentClasses.map((item) => (
                <fieldset key={item.id}>
                  <legend>{item.label}</legend>
                  <div>
                    {Object.entries(classLabels).map(([id, label]) => (
                      <label className={classifications[item.id] === id ? "selected" : ""} key={id}>
                        <input
                          type="radio"
                          name={`class-${item.id}`}
                          value={id}
                          checked={classifications[item.id] === id}
                          onChange={() =>
                            setClassifications((current) => ({ ...current, [item.id]: id }))
                          }
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  <div role="status" aria-live="polite" aria-atomic="true">
                    {classifications[item.id] && (
                      <p
                        className={
                          classifications[item.id] === item.answer
                            ? "class-correct"
                            : "class-incorrect"
                        }
                      >
                        {classifications[item.id] === item.answer
                          ? classExplanations[item.id]
                          : `Reconsider the function of this item. ${classExplanations[item.id]}`}
                      </p>
                    )}
                  </div>
                </fieldset>
              ))}
            </div>
            <p className="classification-summary" aria-live="polite">
              {classifiedCount} of {componentClasses.length} classified correctly
            </p>
          </div>
        )}
      </section>

      <section className="lesson-section" aria-labelledby="evidence-title">
        <div className="section-heading">
          <span className="section-number">03</span>
          <div>
            <p className="eyebrow">System checks</p>
            <h2 id="evidence-title">See what each system recorded</h2>
          </div>
        </div>
        <p className="section-guidance">{lessonCopy.text02}</p>
        <div className="evidence-tabs" role="tablist" aria-label="Available system checks">
          {evidenceViews.map((view, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeEvidence === view.id}
              tabIndex={activeEvidence === view.id ? 0 : -1}
              id={"system-evidence-tab-" + view.id}
              aria-controls="system-evidence-panel"
              onKeyDown={tabKeys}
              className={activeEvidence === view.id ? "active" : ""}
              key={view.id}
              onClick={() => chooseEvidence(view.id)}
            >
              <span>{index + 1}</span>
              {view.tab}
              {seenEvidence.includes(view.id) && <small>Viewed</small>}
            </button>
          ))}
        </div>
        <article
          className="system-evidence"
          role="tabpanel"
          id="system-evidence-panel"
          aria-labelledby={"system-evidence-tab-" + activeEvidence}
        >
          <header>
            <span>System record</span>
            <strong>{selectedEvidence.tab} check</strong>
          </header>
          <div className="system-evidence-heading">
            <h3>{selectedEvidence.heading}</h3>
            <p>{selectedEvidence.summary}</p>
          </div>
          <dl>
            {selectedEvidence.fields.map((field) => (
              <div className={`tone-${"tone" in field ? field.tone : "neutral"}`} key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
          {"log" in selectedEvidence && selectedEvidence.log && (
            <pre aria-label={`${selectedEvidence.tab} log`}>
              <code>{selectedEvidence.log.join("\n")}</code>
            </pre>
          )}
        </article>
        <ChoiceGroup
          question="What does this check rule out?"
          value={evidenceAnswers[activeEvidence] ?? ""}
          choices={evidenceQuestions[activeEvidence].choices}
          onChange={(value) => setEvidenceAnswers({ ...evidenceAnswers, [activeEvidence]: value })}
        />
        <Feedback
          tone={
            evidenceAnswers[activeEvidence] === evidenceQuestions[activeEvidence].answer
              ? "correct"
              : "incorrect"
          }
        >
          {evidenceAnswers[activeEvidence] && evidenceQuestions[activeEvidence].feedback}
        </Feedback>
      </section>

      <section className="lesson-section decision-section" aria-labelledby="diagnosis-title">
        <div className="section-heading">
          <span className="section-number">04</span>
          <div>
            <p className="eyebrow">Find the break</p>
            <h2 id="diagnosis-title">Where did reporting stop?</h2>
          </div>
        </div>
        <p className="section-guidance">Select the connection that failed.</p>
        <div
          className="diagnosis-path"
          role="radiogroup"
          aria-label="Connections in the result reporting path"
        >
          <div className="diagnosis-node">Analyzer</div>
          <label className={diagnosis === "analyzer-lis" ? "selected" : ""}>
            <input
              type="radio"
              name="ResultJourneyExperience.tsx-2"
              checked={diagnosis === "analyzer-lis"}
              onChange={() => setDiagnosis("analyzer-lis")}
            />
            <span>
              <span>→</span>
              <strong>Analyzer to LIS</strong>
            </span>
          </label>
          <div className="diagnosis-node">LIS</div>
          <label className={diagnosis === "lis-interface" ? "selected" : ""}>
            <input
              type="radio"
              name="ResultJourneyExperience.tsx-2"
              checked={diagnosis === "lis-interface"}
              onChange={() => setDiagnosis("lis-interface")}
            />
            <span>
              <span>→</span>
              <strong>LIS to interface</strong>
            </span>
          </label>
          <div className="diagnosis-node">Interface engine</div>
          <label className={diagnosis === "interface-ehr" ? "selected" : ""}>
            <input
              type="radio"
              name="ResultJourneyExperience.tsx-2"
              checked={diagnosis === "interface-ehr"}
              onChange={() => setDiagnosis("interface-ehr")}
            />
            <span>
              <span>→</span>
              <strong>Interface to EHR</strong>
            </span>
          </label>
          <div className="diagnosis-node">EHR</div>
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
          {selectedDiagnosis && (
            <div className={`feedback ${selectedDiagnosis.correct ? "correct" : "incorrect"}`}>
              <strong>
                {selectedDiagnosis.correct
                  ? "You found the failed connection."
                  : "That part of the path carried the result."}
              </strong>
              <p>{selectedDiagnosis.feedback}</p>
            </div>
          )}
        </div>
      </section>

      <section className="lesson-section repair-section" aria-labelledby="repair-title">
        <div className="section-heading">
          <span className="section-number">05</span>
          <div>
            <p className="eyebrow">Corrective action</p>
            <h2 id="repair-title">What needs to happen before results can flow again?</h2>
          </div>
        </div>
        <div className="choice-stack" role="radiogroup" aria-label="Corrective action choices">
          {orderedChoices("ResultJourneyExperience.tsx", repairChoices).map((choice) => (
            <label key={choice.id} className={repair === choice.id ? "selected" : ""}>
              <input
                type="radio"
                name="ResultJourneyExperience.tsx-3"
                checked={repair === choice.id}
                onChange={() => {
                  setRepair(choice.id);
                  setTestsRun(false);
                }}
              />
              <span>
                <strong>{choice.label}</strong>
              </span>
            </label>
          ))}
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
          {selectedRepair && (
            <div className={`feedback ${selectedRepair.correct ? "correct" : "incorrect"}`}>
              <strong>
                {selectedRepair.correct
                  ? "This addresses the demonstrated failure."
                  : "This does not restore the reporting path."}
              </strong>
              <p>{selectedRepair.feedback}</p>
            </div>
          )}
        </div>
        {Downtime && (
          <div className="mdx-content embedded-mdx downtime-note">
            <Downtime />
          </div>
        )}
      </section>

      <section className="lesson-section" aria-labelledby="validation-title">
        <div className="section-heading">
          <span className="section-number">06</span>
          <div>
            <p className="eyebrow">Restoration</p>
            <h2 id="validation-title">Check the restored connection</h2>
          </div>
        </div>
        <p className="section-guidance">{lessonCopy.text03}</p>
        <article className="test-console journey-validation">
          <header>
            <span>Post-restoration checks</span>
            <strong>
              {testsRun
                ? validationCases.filter((item) => item.passingRepairs.includes(repair ?? ""))
                    .length +
                  " of " +
                  validationCases.length +
                  " passed"
                : "Not run"}
            </strong>
          </header>
          {validationCases.map((item) => (
            <div className="test-row" key={item.id}>
              <span>
                <strong>{item.name}</strong>
                <small>
                  {testsRun && !item.passingRepairs.includes(repair ?? "")
                    ? item.failNote
                    : item.note}
                </small>
              </span>
              <b
                className={
                  !testsRun
                    ? "pending"
                    : item.passingRepairs.includes(repair ?? "")
                      ? "pass"
                      : "fail"
                }
              >
                {!testsRun
                  ? "Pending"
                  : item.passingRepairs.includes(repair ?? "")
                    ? "Pass"
                    : "Fail"}
              </b>
            </div>
          ))}
          <button
            className="primary-button"
            type="button"
            disabled={!repair}
            onClick={() => {
              setTestsRun(true);
              onAttempt?.(true);
            }}
          >
            Run the checks
          </button>
        </article>
        <div role="status" aria-live="polite" aria-atomic="true">
          {testsRun && (
            <div className={`feedback ${validationPassed ? "correct" : "incorrect"}`}>
              <strong>
                {validationPassed
                  ? "The incident can be closed."
                  : "The connection has not been restored."}
              </strong>
              <p>
                {validationPassed
                  ? "hospital IT confirms the firewall correction. The LIS team confirms that the queue cleared and new results are moving. The laboratory confirms that reports reached the correct patient charts and completes downtime reconciliation."
                  : "The selected action did not remove the firewall block. The queued and new reports still cannot reach the EHR."}
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="reset-row">
        <ResetLessonButton fallback={reset} />
      </div>
    </div>
  );
}
