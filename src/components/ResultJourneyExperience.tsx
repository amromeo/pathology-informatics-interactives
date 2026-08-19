import { useState, type ComponentType } from "react";
import {
  classLabels,
  componentClasses,
  connectionChoices,
  evidenceViews,
  pathwayNodes,
  repairChoices,
  validationCases,
} from "../../content/lessons/inside-a-results-journey/interaction";

type MdxComponent = ComponentType<Record<string, unknown>>;

const firstChecks = [
  {
    id: "lis",
    label: "Check the CBC in the LIS.",
    correct: true,
    feedback: "Yes. The ED can only see that the CBC is still pending in the EHR. Hematology checks the LIS and finds that the result is already final.",
  },
  {
    id: "repeat",
    label: "Repeat the CBC now.",
    correct: false,
    feedback: "First determine whether testing is actually delayed. Repeating a completed CBC would not explain why the report is missing from the EHR.",
  },
  {
    id: "refresh",
    label: "Ask the ED to refresh the patient chart.",
    correct: false,
    feedback: "A screen refresh is reasonable only after the laboratory checks whether the CBC was completed and released.",
  },
] as const;

const expectedPath = pathwayNodes.map((node) => node.id);

export function ResultJourneyExperience({
  Concepts,
  Downtime,
  onAttempt,
}: {
  Concepts?: MdxComponent;
  Downtime?: MdxComponent;
  onAttempt?: (attempted: boolean) => void;
}) {
  const [firstCheck, setFirstCheck] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [pathFeedback, setPathFeedback] = useState("Select the first component in the reporting path.");
  const [classifications, setClassifications] = useState<Record<string, string>>({});
  const [activeEvidence, setActiveEvidence] = useState("analyzer");
  const [seenEvidence, setSeenEvidence] = useState<string[]>(["analyzer"]);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [repair, setRepair] = useState<string | null>(null);
  const [testsRun, setTestsRun] = useState(false);

  const selectedFirstCheck = firstChecks.find((choice) => choice.id === firstCheck);
  const selectedEvidence = evidenceViews.find((view) => view.id === activeEvidence) ?? evidenceViews[0];
  const selectedDiagnosis = connectionChoices.find((choice) => choice.id === diagnosis);
  const selectedRepair = repairChoices.find((choice) => choice.id === repair);
  const mapComplete = path.length === expectedPath.length;
  const classifiedCount = componentClasses.filter((item) => classifications[item.id] === item.answer).length;
  const validationPassed = repair === "restore-firewall";

  const placeNode = (id: string) => {
    const expected = expectedPath[path.length];
    if (id !== expected) {
      setPathFeedback(path.length === 0
        ? "Start where testing occurs: the analyzer."
        : `That is not the next stop after ${pathwayNodes.find((node) => node.id === path[path.length - 1])?.label}.`);
      return;
    }
    const nextPath = [...path, id];
    setPath(nextPath);
    setPathFeedback(nextPath.length === expectedPath.length
      ? "The reporting path is complete."
      : "Good. Select the next component.");
  };

  const chooseEvidence = (id: string) => {
    setActiveEvidence(id);
    setSeenEvidence((current) => current.includes(id) ? current : [...current, id]);
  };

  const reset = () => {
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
          <div><p className="eyebrow">Call from the ED</p><h2 id="journey-call-title">Was the CBC ever completed?</h2></div>
        </div>
        <div className="journey-call-grid">
          <article className="ehr-pending-card">
            <header><span>Synthetic educational artifact</span><strong>Emergency department chart</strong></header>
            <div>
              <span>Suspected gastrointestinal bleed</span>
              <h3>Complete blood count</h3>
              <p><strong>Status in EHR:</strong> Pending</p>
              <small>“We are waiting for the hemoglobin. Can you tell us what is happening?”</small>
            </div>
          </article>
          <div>
            <p className="section-guidance journey-guidance">What should the laboratory do first?</p>
            <div className="choice-stack compact-choices" role="radiogroup" aria-label="First laboratory check">
              {firstChecks.map((choice) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={firstCheck === choice.id}
                  className={firstCheck === choice.id ? "selected" : ""}
                  key={choice.id}
                  onClick={() => setFirstCheck(choice.id)}
                >
                  <strong>{choice.label}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedFirstCheck && (
          <div className={`feedback ${selectedFirstCheck.correct ? "correct" : "incorrect"}`} role="status">
            <strong>{selectedFirstCheck.correct ? "Start in the LIS." : "Check the laboratory record first."}</strong>
            <p>{selectedFirstCheck.feedback}</p>
          </div>
        )}
        {firstCheck === "lis" && (
          <article className="lis-result-card" aria-label="LIS result record">
            <header><span>Laboratory information system</span><strong>CBC · H26-01482</strong></header>
            <dl>
              <div><dt>Status</dt><dd>Final</dd></div>
              <div><dt>Verified by</dt><dd>M. Chen, MLS</dd></div>
              <div><dt>Verified</dt><dd>09:42</dd></div>
              <div><dt>Hemoglobin</dt><dd>7.4 g/dL · Low</dd></div>
            </dl>
          </article>
        )}
      </section>

      <section className="lesson-section" aria-labelledby="pathway-title">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div><p className="eyebrow">Reporting path</p><h2 id="pathway-title">Build the path to the EHR</h2></div>
        </div>
        <p className="section-guidance">Starting with the analyzer, select each component in the order the result passes through it.</p>
        <div className="pathway-map" aria-label="Laboratory result reporting path">
          {expectedPath.map((_, index) => {
            const node = pathwayNodes.find((item) => item.id === path[index]);
            return (
              <div className="pathway-position" key={index}>
                <span className="pathway-node-number">{index + 1}</span>
                {node ? <><strong>{node.label}</strong><small>{node.location}</small></> : <><strong>Choose next</strong><small>Pathway position {index + 1}</small></>}
              </div>
            );
          })}
        </div>
        <div className="pathway-palette" role="group" aria-label="Components available for the reporting path">
          {pathwayNodes.map((node) => (
            <button type="button" key={node.id} disabled={path.includes(node.id)} onClick={() => placeNode(node.id)}>
              <strong>{node.label}</strong><small>{node.location}</small>
            </button>
          ))}
        </div>
        <div className="pathway-status" role="status"><span>{path.length} of {expectedPath.length} placed</span><p>{pathFeedback}</p>{path.length > 0 && <button type="button" className="text-button" onClick={() => { setPath([]); setPathFeedback("Select the first component in the reporting path."); }}>Start the map over</button>}</div>

        {mapComplete && (
          <div className="journey-concepts">
            {Concepts && <div className="mdx-content embedded-mdx"><Concepts /></div>}
            <h3>Classify the components</h3>
            <p>Choose the best category for each item. Some systems include more than one kind of component; classify the item named in each row.</p>
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
                          onChange={() => setClassifications((current) => ({ ...current, [item.id]: id }))}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {classifications[item.id] && (
                    <p className={classifications[item.id] === item.answer ? "class-correct" : "class-incorrect"} role="status">
                      {classifications[item.id] === item.answer ? `Yes — ${classLabels[item.answer]}.` : `Try again. This item is ${classLabels[item.answer].toLowerCase()}.`}
                    </p>
                  )}
                </fieldset>
              ))}
            </div>
            <p className="classification-summary" aria-live="polite">{classifiedCount} of {componentClasses.length} classified correctly</p>
          </div>
        )}
      </section>

      <section className="lesson-section" aria-labelledby="evidence-title">
        <div className="section-heading">
          <span className="section-number">03</span>
          <div><p className="eyebrow">System checks</p><h2 id="evidence-title">See what each system recorded</h2></div>
        </div>
        <p className="section-guidance">The LIS team starts with the laboratory systems, then follows the result toward the EHR. Open each check and decide what it rules in or out.</p>
        <div className="evidence-tabs" role="tablist" aria-label="Available system checks">
          {evidenceViews.map((view, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeEvidence === view.id}
              className={activeEvidence === view.id ? "active" : ""}
              key={view.id}
              onClick={() => chooseEvidence(view.id)}
            >
              <span>{index + 1}</span>{view.tab}{seenEvidence.includes(view.id) && <small>Viewed</small>}
            </button>
          ))}
        </div>
        <article className="system-evidence" role="tabpanel">
          <header><span>Synthetic educational artifact</span><strong>{selectedEvidence.tab} check</strong></header>
          <div className="system-evidence-heading"><h3>{selectedEvidence.heading}</h3><p>{selectedEvidence.summary}</p></div>
          <dl>
            {selectedEvidence.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          {"log" in selectedEvidence && selectedEvidence.log && <pre aria-label={`${selectedEvidence.tab} log`}><code>{selectedEvidence.log.join("\n")}</code></pre>}
        </article>
      </section>

      <section className="lesson-section decision-section" aria-labelledby="diagnosis-title">
        <div className="section-heading">
          <span className="section-number">04</span>
          <div><p className="eyebrow">Find the break</p><h2 id="diagnosis-title">Where did reporting stop?</h2></div>
        </div>
        <p className="section-guidance">Select the connection that failed.</p>
        <div className="diagnosis-path" role="radiogroup" aria-label="Connections in the result reporting path">
          <div className="diagnosis-node">Analyzer</div>
          <button type="button" role="radio" aria-checked={diagnosis === "analyzer-lis"} className={diagnosis === "analyzer-lis" ? "selected" : ""} onClick={() => setDiagnosis("analyzer-lis")}><span>→</span><strong>Analyzer to LIS</strong></button>
          <div className="diagnosis-node">LIS</div>
          <button type="button" role="radio" aria-checked={diagnosis === "lis-interface"} className={diagnosis === "lis-interface" ? "selected" : ""} onClick={() => setDiagnosis("lis-interface")}><span>→</span><strong>LIS to interface</strong></button>
          <div className="diagnosis-node">Interface engine</div>
          <button type="button" role="radio" aria-checked={diagnosis === "interface-ehr"} className={diagnosis === "interface-ehr" ? "selected" : ""} onClick={() => setDiagnosis("interface-ehr")}><span>→</span><strong>Interface to EHR</strong></button>
          <div className="diagnosis-node">EHR</div>
        </div>
        {selectedDiagnosis && (
          <div className={`feedback ${selectedDiagnosis.correct ? "correct" : "incorrect"}`} role="status">
            <strong>{selectedDiagnosis.correct ? "You found the failed connection." : "That part of the path carried the result."}</strong>
            <p>{selectedDiagnosis.feedback}</p>
          </div>
        )}
      </section>

      <section className="lesson-section repair-section" aria-labelledby="repair-title">
        <div className="section-heading">
          <span className="section-number">05</span>
          <div><p className="eyebrow">Corrective action</p><h2 id="repair-title">What needs to happen before results can flow again?</h2></div>
        </div>
        <div className="choice-stack" role="radiogroup" aria-label="Corrective action choices">
          {repairChoices.map((choice) => (
            <button type="button" role="radio" aria-checked={repair === choice.id} className={repair === choice.id ? "selected" : ""} key={choice.id} onClick={() => { setRepair(choice.id); setTestsRun(false); }}>
              <strong>{choice.label}</strong>
            </button>
          ))}
        </div>
        {selectedRepair && (
          <div className={`feedback ${selectedRepair.correct ? "correct" : "incorrect"}`} role="status">
            <strong>{selectedRepair.correct ? "This addresses the demonstrated failure." : "This does not restore the reporting path."}</strong>
            <p>{selectedRepair.feedback}</p>
          </div>
        )}
        {Downtime && <div className="mdx-content embedded-mdx downtime-note"><Downtime /></div>}
      </section>

      <section className="lesson-section" aria-labelledby="validation-title">
        <div className="section-heading">
          <span className="section-number">06</span>
          <div><p className="eyebrow">Restoration</p><h2 id="validation-title">Check the restored connection</h2></div>
        </div>
        <p className="section-guidance">A single result appearing in the EHR is not enough. Check the delayed reports, a new report, and the downtime record.</p>
        <article className="test-console journey-validation" aria-live="polite">
          <header><span>Post-restoration checks</span><strong>{testsRun ? validationPassed ? "5 of 5 passed" : "0 of 5 passed" : "Not run"}</strong></header>
          {validationCases.map((item) => (
            <div className="test-row" key={item.id}>
              <span><strong>{item.name}</strong><small>{item.note}</small></span>
              <b className={!testsRun ? "pending" : validationPassed ? "pass" : "fail"}>{!testsRun ? "Pending" : validationPassed ? "Pass" : "Fail"}</b>
            </div>
          ))}
          <button className="primary-button" type="button" disabled={!repair} onClick={() => { setTestsRun(true); onAttempt?.(true); }}>Run the checks</button>
        </article>
        {testsRun && (
          <div className={`feedback ${validationPassed ? "correct" : "incorrect"}`} role="status">
            <strong>{validationPassed ? "The incident can be closed." : "The connection has not been restored."}</strong>
            <p>{validationPassed
              ? "Hospital IT confirms the firewall correction. The LIS team confirms that the queue cleared and new results are moving. The laboratory confirms that reports reached the correct patient charts and completes downtime reconciliation."
              : "The selected action did not remove the firewall block. The queued and new reports still cannot reach the EHR."}</p>
          </div>
        )}
      </section>

      <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
    </div>
  );
}
