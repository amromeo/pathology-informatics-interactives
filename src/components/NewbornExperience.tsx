import { ReplayResultList } from "./lesson-ui";
import { sectionPurposes } from "../../content/lessons/newborn-screen-to-public-health/interaction";
import { ResetLessonButton } from "./ResetLessonButton";
import { useState } from "react";
import {
  nbsFields,
  answerDisplay,
  statusDisplay,
  nbsReplay,
  originalNbs,
  type NbsConfig,
} from "../../content/lessons/newborn-screen-to-public-health/interaction";
import { Teaching, Topic5Section, Topic5Select, type Topic5Props } from "./Topic5Common";

export function NewbornExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [config, setConfig] = useState({ ...originalNbs });
  const [tested, setTested] = useState(false);
  const [review, setReview] = useState(false);
  const results = nbsReplay(config);
  const passed = results.filter((row) => row.pass).length;
  return (
    <div>
      <Topic5Section
        number={1}
        purpose={sectionPurposes[0]}
        title="Compare the received report with the interface agreement"
      >
        <article className="artifact-card topic5-record">
          <h3>Receiver record · NB-01 · 08:41</h3>
          <dl>
            <dt>Message control ID</dt>
            <dd>N001</dd>
            <dt>Infant identifier / authority</dt>
            <dd>004812 / NRH</dd>
            <dt>Specimen / report version</dt>
            <dd>DBS-081 / 1</dd>
            <dt>Observation identifier</dt>
            <dd>NBS_SUM · local dictionary</dd>
            <dt>Answer / status</dt>
            <dd>REFERRAL · local text / final</dd>
            <dt>Application acknowledgment</dt>
            <dd>AA · N001 · stored</dd>
            <dt>Routing service</dt>
            <dd>Exception: no matching coded interpretation rule</dd>
          </dl>
        </article>
        <Teaching Content={Concepts} />
      </Topic5Section>
      <Topic5Section number={2} purpose={sectionPurposes[1]} title="Configure the receiver profile">
        <div className="topic5-controls">
          {nbsFields.map((field) => (
            <Topic5Select
              key={field.key}
              label={field.label}
              value={config[field.key]}
              options={field.options}
              note={(field.notes as Record<string, string>)[config[field.key]]}
              onChange={(value) => {
                setConfig({ ...config, [field.key]: value } as NbsConfig);
                setTested(false);
                setReview(false);
              }}
            />
          ))}
        </div>
        <article className="artifact-card topic5-record">
          <h3>NB-01 proposed coded fields</h3>
          <p>
            Observation:{" "}
            <code>
              {config.observation === "overall"
                ? "57130-7 / LN"
                : config.observation === "condition"
                  ? "46746-4 / LN"
                  : "NBS_SUM / local"}
            </code>
          </p>
          <p>
            Answer:{" "}
            <code>{config.answers === "coded" ? "LA25817-0 / LN" : "REFERRAL / local text"}</code>
          </p>
          <p role="status">
            Receiver action: <strong>{results[0].action}</strong>
          </p>
        </article>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setTested(true);
            onAttempt?.(true);
          }}
        >
          Replay eight message situations
        </button>
        <p role="status">
          {tested
            ? `${passed} of ${results.length} receiving actions match.`
            : "Run the original configuration, then compare the complete repair."}
        </p>
        <ReplayResultList
          items={results}
          tested={tested}
          disclosure={true}
          render={(row) => (
            <>
              <summary>
                {row.id} · {answerDisplay[row.answer] ?? row.answer} ·{" "}
                {statusDisplay[row.status] ?? row.status}
                {tested && (
                  <strong>
                    {row.action} · {row.pass ? "Matches" : "Does not match"}
                  </strong>
                )}
              </summary>
              <p>
                Identity authority: {row.identity ? "present" : "missing"}; exact retransmission:{" "}
                {row.duplicate ? "yes" : "no"}.
              </p>
              <p>
                Expected: <strong>{row.expected}</strong>. {row.note}
              </p>
            </>
          )}
        />
      </Topic5Section>
      <Topic5Section number={3} purpose={sectionPurposes[2]} title="Confirm program follow-up">
        <Teaching Content={Bridge} />
        <label className="topic5-check">
          <input
            type="checkbox"
            checked={review}
            onChange={(event) => setReview(event.target.checked)}
          />
          Include worklists, exception ownership, and correction reconciliation in acceptance
          testing.
        </label>
        <div role="status" aria-live="polite" aria-atomic="true">
          {review && (
            <p className="topic5-note">
              {tested && passed === results.length
                ? "The replay supports joint laboratory and program acceptance review."
                : "The receiving actions must match before this configuration is ready for acceptance review."}
            </p>
          )}
        </div>
      </Topic5Section>
      <ResetLessonButton
        fallback={() => {
          setConfig({ ...originalNbs });
          setTested(false);
          setReview(false);
          onAttempt?.(false);
        }}
      />
    </div>
  );
}
