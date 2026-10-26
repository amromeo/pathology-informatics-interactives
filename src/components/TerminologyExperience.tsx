import { sectionPurposes } from "../../content/lessons/code-the-meaning/interaction";
import { ResetLessonButton } from "./ResetLessonButton";
import { useState, type ComponentType } from "react";
import {
  mappingOptions,
  mappingRows,
  terminologyRoles,
  terminologyScore,
  localGlucoseRecords,
  terminologyDecisions,
  lookupFields,
  lookupReview,
  terminologyCopy,
} from "../../content/lessons/code-the-meaning/interaction";
import { Teaching, Topic5Section, Topic5Select, type Topic5Props } from "./Topic5Common";

export function TerminologyExperience({
  Concepts,
  Bridge,
  Investigation,
  onAttempt,
}: Topic5Props & { Investigation?: ComponentType }) {
  const [roles, setRoles] = useState<Record<string, string>>({});
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [lookup, setLookup] = useState<Record<string, string>>({});
  const [lookupTested, setLookupTested] = useState(false);
  const [tested, setTested] = useState(false);
  const score = terminologyScore(roles, mappings);
  const found = lookupReview(lookup);
  const complete =
    found.complete &&
    score.roles === terminologyRoles.length &&
    score.mappings === mappingRows.length &&
    Object.entries(terminologyDecisions).every(([id, row]) => decisions[id] === row.answer);
  const changed = () => {
    setTested(false);
    onAttempt?.(false);
  };
  function decision(id: keyof typeof terminologyDecisions) {
    const row = terminologyDecisions[id];
    return (
      <Topic5Select
        label={row.label}
        value={decisions[id] ?? ""}
        options={[["", "Choose a decision"], ...row.options]}
        onChange={(value) => {
          setDecisions({ ...decisions, [id]: value });
          changed();
        }}
        note={(row.notes as Record<string, string>)[decisions[id]]}
      />
    );
  }
  return (
    <div>
      <Topic5Section number={1} purpose={sectionPurposes[0]} title="Why do the local names fail?">
        <div
          className="topic5-table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Scrollable records 1"
        >
          <table>
            <caption>{terminologyCopy.catalogCaption}</caption>
            <thead>
              <tr>
                <th>Laboratory / local code</th>
                <th>Name</th>
                <th>Specimen</th>
                <th>Result and unit</th>
              </tr>
            </thead>
            <tbody>
              {localGlucoseRecords.map((row) => (
                <tr key={row.site}>
                  <th scope="row">
                    {row.site}
                    <br />
                    {row.code}
                  </th>
                  <td>{row.name}</td>
                  <td>{row.specimen}</td>
                  <td>
                    {row.value} {row.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>{terminologyCopy.catalogNote}</p>
        {decision("problem")}
      </Topic5Section>
      <Topic5Section
        number={2}
        purpose={sectionPurposes[1]}
        title="Use LOINC to identify the observation"
      >
        <Teaching Content={Concepts} />
        <fieldset className="topic5-plan loinc-lookup">
          <legend>Your LOINC website comparison</legend>
          <div className="topic5-controls">
            {(
              [
                ["codeAB", "LOINC code for Hospitals A and B"],
                ["codeC", "LOINC code for Hospital C"],
              ] as const
            ).map(([id, label]) => (
              <label className="topic5-control" key={id}>
                <span>{label}</span>
                <input
                  aria-label={label}
                  type="text"
                  value={lookup[id] ?? ""}
                  onChange={(event) => {
                    setLookup({ ...lookup, [id]: event.target.value });
                    setLookupTested(false);
                    changed();
                  }}
                  autoComplete="off"
                />
              </label>
            ))}
            {lookupFields.map((row) => (
              <Topic5Select
                key={row.id}
                label={row.label}
                value={lookup[row.id] ?? ""}
                options={[["", "Record what you found"], ...row.options]}
                note={
                  lookupTested && lookup[row.id] !== row.answer
                    ? "Recheck this dimension against the local catalog and the LOINC term page."
                    : undefined
                }
                onChange={(value) => {
                  setLookup({ ...lookup, [row.id]: value });
                  setLookupTested(false);
                  changed();
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setLookupTested(true);
              onAttempt?.(true);
            }}
          >
            Check the website comparison
          </button>
          <div role="status" aria-live="polite" aria-atomic="true">
            {lookupTested && (
              <p className="topic5-note">
                {found.complete ? terminologyCopy.lookupReady : terminologyCopy.lookupIncomplete}{" "}
                {found.codes ? "Both code assignments match." : "Check both code assignments."}{" "}
                {found.dimensions} / 7 comparison fields match.
              </p>
            )}
          </div>
        </fieldset>
      </Topic5Section>
      <Topic5Section
        number={3}
        purpose={sectionPurposes[2]}
        title="Distinguish the observation, finding, unit, and service"
      >
        <Teaching Content={Investigation} />
        <div className="topic5-card-grid">
          {terminologyRoles.map((row) => (
            <article className="artifact-card topic5-record" key={row.id}>
              <h3>{row.record}</h3>
              <Topic5Select
                label={`Standard for ${row.id}`}
                value={roles[row.id] ?? ""}
                options={[
                  ["", "Choose a standard"],
                  ...row.alternatives.map((value) => [value, value] as const),
                ]}
                onChange={(value) => {
                  setRoles({ ...roles, [row.id]: value });
                  changed();
                }}
                note={
                  roles[row.id]
                    ? `${roles[row.id] === row.answer ? "Fits this use." : "Does not fit the named use."} ${row.explanation}`
                    : undefined
                }
              />
            </article>
          ))}
        </div>
      </Topic5Section>
      <Topic5Section
        number={4}
        purpose={sectionPurposes[3]}
        title="Review the proposed observation mappings"
      >
        <div className="topic5-card-grid">
          {mappingRows.map((row) => (
            <article className="artifact-card topic5-record" key={row.id}>
              <h3>{row.id}</h3>
              <p>{row.source}</p>
              <Topic5Select
                label={`Mapping for ${row.id}`}
                value={mappings[row.id] ?? ""}
                options={mappingOptions(row.id)}
                onChange={(value) => {
                  setMappings({ ...mappings, [row.id]: value });
                  changed();
                }}
                note={
                  mappings[row.id]
                    ? `${mappings[row.id] === row.expected ? "Supported decision." : "Unsupported assignment."} ${row.reason}`
                    : undefined
                }
              />
            </article>
          ))}
        </div>
      </Topic5Section>
      <Topic5Section
        number={5}
        purpose={sectionPurposes[4]}
        title="Check what the mapping-error studies actually measured"
      >
        <Teaching Content={Bridge} />
        {decision("evidence")}
      </Topic5Section>
      <Topic5Section
        number={6}
        purpose={sectionPurposes[5]}
        title="Apply the comparison to a different specimen"
      >
        {decision("transfer")}
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setTested(true);
            onAttempt?.(true);
          }}
        >
          Check the mapping review
        </button>
        <div role="status" aria-live="polite" aria-atomic="true">
          {tested && (
            <p className="topic5-note">
              {complete ? terminologyCopy.reviewReady : terminologyCopy.reviewIncomplete}{" "}
              {score.roles} of {terminologyRoles.length} purpose assignments and {score.mappings} of{" "}
              {mappingRows.length} mapping decisions match.
            </p>
          )}
        </div>
      </Topic5Section>
      <ResetLessonButton
        fallback={() => {
          setRoles({});
          setMappings({});
          setDecisions({});
          setLookup({});
          setLookupTested(false);
          setTested(false);
          onAttempt?.(false);
        }}
      />
    </div>
  );
}
