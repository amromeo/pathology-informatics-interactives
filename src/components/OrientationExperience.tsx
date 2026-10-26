import { ResetLessonButton } from "./ResetLessonButton";
import { useState } from "react";
import {
  goLiveEvidence,
  orientationRoles,
  orientationTasks,
  orientationTickets,
  ticketOwnerOptions,
  orientationCopy,
  type OrientationRoleId,
  type TicketOwnerId,
} from "../../content/lessons/steward-at-morning-huddle/interaction";

type RoleAnswers = Record<string, OrientationRoleId>;
type TicketAnswers = Record<string, TicketOwnerId>;

export function OrientationExperience({ onAttempt }: { onAttempt?: (attempted: boolean) => void }) {
  const [prediction, setPrediction] = useState("");
  const [roleAnswers, setRoleAnswers] = useState<RoleAnswers>({});
  const [ticketAnswers, setTicketAnswers] = useState<TicketAnswers>({});
  const [goLiveAnswer, setGoLiveAnswer] = useState<"yes" | "no" | null>(null);
  const [misses, setMisses] = useState<Record<string, number>>({});
  const [reviewed, setReviewed] = useState(false);

  const roleLabel = (id: OrientationRoleId) =>
    orientationRoles.find((role) => role.id === id)?.label ?? id;
  const allAnswered =
    orientationTasks.every((task) => roleAnswers[task.id]) &&
    orientationTickets.every((ticket) => ticketAnswers[ticket.id]) &&
    goLiveAnswer !== null;
  const roleScore = orientationTasks.filter((task) => roleAnswers[task.id] === task.owner).length;
  const ticketScore = orientationTickets.filter(
    (ticket) => ticketAnswers[ticket.id] === ticket.answer,
  ).length;
  const passed =
    roleScore === orientationTasks.length &&
    ticketScore === orientationTickets.length &&
    goLiveAnswer === "no";

  const reset = () => {
    setPrediction("");
    setRoleAnswers({});
    setMisses({});
    setTicketAnswers({});
    setGoLiveAnswer(null);
    setReviewed(false);
    onAttempt?.(false);
  };

  return (
    <div className="experience orientation-experience">
      <section className="lesson-section">
        <h2>Before the meeting: would you approve Monday?</h2>
        <dl>
          {goLiveEvidence.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <fieldset>
          <legend>Make an initial recommendation</legend>
          {[
            ["yes", "Approve Monday’s start"],
            ["no", "Finish the report checks and bench preparation first"],
          ].map(([id, label]) => (
            <label key={id}>
              <input
                type="radio"
                name="prediction"
                checked={prediction === id}
                onChange={() => setPrediction(id)}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <p>
          You will revisit this recommendation after assigning the work and reviewing the calls.
        </p>
      </section>
      <section className="lesson-section" aria-labelledby="role-title">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div>
            <p className="eyebrow">Before Monday</p>
            <h2 id="role-title">Assign the work</h2>
          </div>
        </div>
        <p className="section-guidance">
          Choose who should lead each job. Other people may need to help.
        </p>
        <div className="role-assignment-list">
          {orientationTasks.map((task, index) => {
            const answer = roleAnswers[task.id];
            const correct = answer === task.owner;
            return (
              <article className="role-assignment-card" key={task.id}>
                <span className="task-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{task.task}</h3>
                  <div role="status" aria-live="polite" aria-atomic="true">
                    {answer && (
                      <p
                        className={
                          correct ? "answer-note correct-note" : "answer-note incorrect-note"
                        }
                      >
                        {correct && <strong>{roleLabel(task.owner)}: </strong>}
                        {correct
                          ? task.explanation
                          : (misses[task.id] ?? 0) < 2
                            ? orientationCopy.hints[task.id]
                            : `${roleLabel(task.owner)} should lead this work. ${task.explanation}`}
                      </p>
                    )}
                  </div>
                </div>
                <label>
                  <span>Who should lead this job?</span>
                  <select
                    value={answer ?? ""}
                    onChange={(event) => {
                      if (event.target.value !== task.owner)
                        setMisses((current) => ({
                          ...current,
                          [task.id]: (current[task.id] ?? 0) + 1,
                        }));
                      setRoleAnswers((current) => ({
                        ...current,
                        [task.id]: event.target.value as OrientationRoleId,
                      }));
                      setReviewed(false);
                    }}
                  >
                    <option value="" disabled>
                      Choose a role or group
                    </option>
                    {orientationRoles.map((role) => (
                      <option value={role.id} key={role.id}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </label>
              </article>
            );
          })}
        </div>
      </section>

      <section className="lesson-section" aria-labelledby="ticket-title">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div>
            <p className="eyebrow">After go-live</p>
            <h2 id="ticket-title">Who should lead the investigation?</h2>
          </div>
        </div>
        <p className="section-guidance">
          After go-live, three calls reach the laboratory. For each call, choose who should lead the
          response.
        </p>
        <div className="perspective-list">
          {orientationTickets.map((ticket) => {
            const answer = ticketAnswers[ticket.id];
            const correct = answer === ticket.answer;
            return (
              <article className="perspective-card" key={ticket.id}>
                <h3>{ticket.prompt}</h3>
                <div className="perspective-options" role="radiogroup" aria-label={ticket.prompt}>
                  {ticketOwnerOptions.map((option) => (
                    <label key={option.id} className={answer === option.id ? "selected" : ""}>
                      <input
                        type="radio"
                        name="OrientationExperience.tsx-1"
                        checked={answer === option.id}
                        onChange={() => {
                          setTicketAnswers((current) => ({ ...current, [ticket.id]: option.id }));
                          setReviewed(false);
                        }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <div role="status" aria-live="polite" aria-atomic="true">
                  {answer && (
                    <p
                      className={
                        correct ? "answer-note correct-note" : "answer-note incorrect-note"
                      }
                    >
                      {correct && <strong>{roleLabel(ticket.answer)}: </strong>}
                      {ticket.explanation}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="lesson-section" aria-labelledby="go-live-title">
        <div className="section-heading">
          <span className="section-number">03</span>
          <div>
            <p className="eyebrow">Monday go-live</p>
            <h2 id="go-live-title">Would you approve the go-live?</h2>
          </div>
        </div>
        <article className="artifact-card go-live-brief">
          <header>
            <span>System record</span>
            <strong>Friday meeting notes</strong>
          </header>
          <dl className="evidence-grid">
            {goLiveEvidence.map((item) => (
              <div className={`tone-${item.tone}`} key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </article>
        <fieldset className="go-live-choice">
          <legend>Would you approve the go-live?</legend>
          <label className={goLiveAnswer === "yes" ? "selected" : ""}>
            <input
              type="radio"
              name="go-live"
              value="yes"
              checked={goLiveAnswer === "yes"}
              onChange={() => {
                setGoLiveAnswer("yes");
                setReviewed(false);
              }}
            />
            Yes — the interface test passed
          </label>
          <label className={goLiveAnswer === "no" ? "selected" : ""}>
            <input
              type="radio"
              name="go-live"
              value="no"
              checked={goLiveAnswer === "no"}
              onChange={() => {
                setGoLiveAnswer("no");
                setReviewed(false);
              }}
            />
            No — finish the report checks and bench preparation first
          </label>
        </fieldset>
        <div role="status" aria-live="polite" aria-atomic="true">
          {goLiveAnswer && (
            <div className={`feedback ${goLiveAnswer === "no" ? "correct" : "incorrect"}`}>
              <strong>
                {goLiveAnswer === "no"
                  ? "The assay is not ready."
                  : "Passing the interface test is not enough."}
              </strong>
              <p>{goLiveAnswer === "no" ? orientationCopy.hold : orientationCopy.premature}</p>
            </div>
          )}
        </div>
        {prediction && goLiveAnswer && (
          <p>
            Your initial recommendation {prediction === goLiveAnswer ? "is unchanged" : "changed"}.
            Which unfinished job matters most to your recommendation, and who will finish it?
          </p>
        )}
        <div className="orientation-review">
          <button
            className="primary-button"
            type="button"
            disabled={!allAnswered}
            onClick={() => {
              setReviewed(true);
              onAttempt?.(true);
            }}
          >
            Review my assignments
          </button>
          {!allAnswered && (
            <p>
              Complete all questions if you want a score. You can open the debrief below at any
              time.
            </p>
          )}
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
          {reviewed && (
            <div className={`feedback ${passed ? "correct" : "incorrect"}`}>
              <strong>
                {passed
                  ? "Your assignments are ready to discuss."
                  : "Review the jobs and calls marked above."}
              </strong>
              <p>
                {passed
                  ? orientationCopy.complete
                  : `You have ${roleScore} of ${orientationTasks.length} jobs and ${ticketScore} of ${orientationTickets.length} calls correct. Review the marked items and try again.`}
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
