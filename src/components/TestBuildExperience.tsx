import { useState } from "react";
import {
  initialBuild,
  buildControls,
  buildCases,
  buildReport,
  replayBuild,
  buildSources,
  releaseRequirements,
  buildCopy,
  type BuildConfig,
} from "../../content/lessons/build-the-new-test/interaction";
import {
  SourceInspector,
  Teaching,
  Topic5Section as Section,
  Topic5Select as Select,
  type Topic5Props,
} from "./Topic5Common";

export function TestBuildExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [config, setConfig] = useState<BuildConfig>({ ...initialBuild });
  const [selected, setSelected] = useState("TB01");
  const [tested, setTested] = useState(false);
  const [changed, setChanged] = useState(false);
  const [checks, setChecks] = useState<string[]>([]);
  const [decision, setDecision] = useState(false);
  const current = buildCases.find((row) => row.id === selected)!;
  const results = replayBuild(config);
  const ready =
    tested &&
    results.every((row) => row.pass) &&
    releaseRequirements.every((row) => checks.includes(row.id));
  function update(key: string, value: string) {
    setConfig({ ...config, [key]: value });
    setChanged(tested || changed);
    setTested(false);
    setChecks([]);
    setDecision(false);
  }
  return (
    <div className="topic8-experience">
      <Section title="Compare the request, procedure, and report">
        <SourceInspector records={buildSources} />
      </Section>
      <Section title="Configure the test definition">
        <Teaching Content={Concepts} />
        <div className="topic5-controls">
          {buildControls.map((row) => (
            <Select
              key={row.key}
              label={row.label}
              value={config[row.key]}
              options={row.options}
              note={(row.notes as Record<string, string>)[config[row.key]]}
              onChange={(value) => update(row.key, value)}
            />
          ))}
        </div>
        <article className="topic8-preview">
          <h3>{buildCopy.previewTitle}</h3>
          <p>{buildCopy.previewHelp}</p>
          <Select
            label="Validation case"
            value={selected}
            options={buildCases.map((row) => [row.id, row.id + " · " + row.label])}
            onChange={setSelected}
          />
          <p>{current.label}</p>
          <h4>Generated result section</h4>
          <p className="topic8-report" role="status">
            {buildReport(config, current)}
          </p>
          <details>
            <summary>Expected result and reason</summary>
            <p>{current.expected}</p>
            <p>{current.why}</p>
          </details>
        </article>
      </Section>
      <Section title="Validate the build and review release readiness">
        <Teaching Content={Bridge} />
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setTested(true);
            setChanged(false);
            setDecision(false);
            onAttempt?.(true);
          }}
        >
          Run eight report checks
        </button>
        {changed && (
          <p role="status" className="topic5-note">
            {buildCopy.changed}
          </p>
        )}
        {tested && (
          <div aria-live="polite">
            <p>
              <strong>{results.filter((row) => row.pass).length} / 8 report checks pass.</strong>
            </p>
            <div className="topic5-card-grid">
              {results.map((row) => (
                <article className="artifact-card" key={row.id}>
                  <h3>
                    {row.id} · {row.pass ? "Pass" : "Needs revision"}
                  </h3>
                  <p>{row.label}</p>
                  <p>
                    <strong>Produced:</strong> {row.actual}
                  </p>
                  <p>
                    <strong>Required:</strong> {row.expected}
                  </p>
                  <p>{row.why}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        <fieldset className="topic5-plan">
          <legend>Items addressed in the release recommendation</legend>
          {releaseRequirements.map((row) => (
            <label key={row.id}>
              <input
                type="checkbox"
                aria-label={row.label}
                checked={checks.includes(row.id)}
                onChange={() => {
                  setChecks(
                    checks.includes(row.id)
                      ? checks.filter((id) => id !== row.id)
                      : [...checks, row.id],
                  );
                  setDecision(false);
                }}
              />
              <span>
                {row.label}
                {checks.includes(row.id) && <small>{row.note}</small>}
              </span>
            </label>
          ))}
        </fieldset>
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            setDecision(true);
            onAttempt?.(true);
          }}
        >
          Review release recommendation
        </button>
        {decision && (
          <p className="topic5-note" role="status">
            {ready ? buildCopy.ready : buildCopy.notReady}
          </p>
        )}
      </Section>
      <button
        type="button"
        className="text-button"
        onClick={() => {
          setConfig({ ...initialBuild });
          setSelected("TB01");
          setTested(false);
          setChanged(false);
          setChecks([]);
          setDecision(false);
          onAttempt?.(false);
        }}
      >
        Reset lesson interactions
      </button>
    </div>
  );
}
