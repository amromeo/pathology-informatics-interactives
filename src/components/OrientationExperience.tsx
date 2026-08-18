import { useState } from "react";
import {
  goLiveEvidence,
  orientationRoles,
  orientationTasks,
  orientationTickets,
  ticketOwnerOptions,
  type OrientationRoleId,
  type TicketOwnerId,
} from "../../content/lessons/steward-at-morning-huddle/interaction";

type RoleAnswers = Record<string, OrientationRoleId>;
type TicketAnswers = Record<string, TicketOwnerId>;

export function OrientationExperience({ onAttempt }: { onAttempt?: (attempted: boolean) => void }) {
  const [roleAnswers, setRoleAnswers] = useState<RoleAnswers>({});
  const [ticketAnswers, setTicketAnswers] = useState<TicketAnswers>({});
  const [goLiveAnswer, setGoLiveAnswer] = useState<"yes" | "no" | null>(null);
  const [reviewed, setReviewed] = useState(false);

  const roleLabel = (id: OrientationRoleId) => orientationRoles.find((role) => role.id === id)?.label ?? id;
  const allAnswered = orientationTasks.every((task) => roleAnswers[task.id])
    && orientationTickets.every((ticket) => ticketAnswers[ticket.id])
    && goLiveAnswer !== null;
  const roleScore = orientationTasks.filter((task) => roleAnswers[task.id] === task.owner).length;
  const ticketScore = orientationTickets.filter((ticket) => ticketAnswers[ticket.id] === ticket.answer).length;
  const passed = roleScore === orientationTasks.length && ticketScore === orientationTickets.length && goLiveAnswer === "no";

  const reset = () => {
    setRoleAnswers({});
    setTicketAnswers({});
    setGoLiveAnswer(null);
    setReviewed(false);
    onAttempt?.(false);
  };

  return (
    <div className="experience orientation-experience">
      <section className="lesson-section" aria-labelledby="role-title">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div><p className="eyebrow">People and responsibilities</p><h2 id="role-title">Assign the work</h2></div>
        </div>
        <p className="section-guidance">Choose the group primarily responsible for each part of the work.</p>
        <div className="role-assignment-list">
          {orientationTasks.map((task, index) => {
            const answer = roleAnswers[task.id];
            const correct = answer === task.owner;
            return <article className="role-assignment-card" key={task.id}>
              <span className="task-number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{task.task}</h3>{answer && <p className={correct ? "answer-note correct-note" : "answer-note incorrect-note"} aria-live="polite"><strong>{correct ? "Correct." : "Not quite."}</strong> {correct ? task.explanation : `${roleLabel(task.owner)} is the best choice here. ${task.explanation}`}</p>}</div>
              <label><span>Responsible role or group</span><select value={answer ?? ""} onChange={(event) => { setRoleAnswers((current) => ({ ...current, [task.id]: event.target.value as OrientationRoleId })); setReviewed(false); }}><option value="" disabled>Choose a role or group</option>{orientationRoles.map((role) => <option value={role.id} key={role.id}>{role.label}</option>)}</select></label>
            </article>;
          })}
        </div>
      </section>

      <section className="lesson-section" aria-labelledby="ticket-title">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div><p className="eyebrow">After go-live</p><h2 id="ticket-title">Who should lead the investigation?</h2></div>
        </div>
        <p className="section-guidance">After go-live, three calls reach the laboratory. For each call, decide who needs to be involved and who should coordinate the response.</p>
        <div className="perspective-list">
          {orientationTickets.map((ticket) => {
            const answer = ticketAnswers[ticket.id];
            const correct = answer === ticket.answer;
            return <article className="perspective-card" key={ticket.id}>
              <h3>{ticket.prompt}</h3>
              <div className="perspective-options" role="radiogroup" aria-label={ticket.prompt}>
                {ticketOwnerOptions.map((option) => <button type="button" role="radio" aria-checked={answer === option.id} className={answer === option.id ? "selected" : ""} key={option.id} onClick={() => { setTicketAnswers((current) => ({ ...current, [ticket.id]: option.id })); setReviewed(false); }}>{option.label}</button>)}
              </div>
              {answer && <p className={correct ? "answer-note correct-note" : "answer-note incorrect-note"} aria-live="polite"><strong>{correct ? "Correct." : "Not quite."}</strong> {ticket.explanation}</p>}
            </article>;
          })}
        </div>
      </section>

      <section className="lesson-section" aria-labelledby="go-live-title">
        <div className="section-heading">
          <span className="section-number">03</span>
          <div><p className="eyebrow">Monday go-live</p><h2 id="go-live-title">Would you approve the go-live?</h2></div>
        </div>
        <article className="artifact-card go-live-brief">
          <header><span>Synthetic educational artifact</span><strong>Go-live readiness review</strong></header>
          <dl className="evidence-grid">{goLiveEvidence.map((item) => <div className={`tone-${item.tone}`} key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
        </article>
        <fieldset className="go-live-choice">
          <legend>Would you approve the go-live?</legend>
          <label className={goLiveAnswer === "yes" ? "selected" : ""}><input type="radio" name="go-live" value="yes" checked={goLiveAnswer === "yes"} onChange={() => { setGoLiveAnswer("yes"); setReviewed(false); }}/>Yes — the interface test passed</label>
          <label className={goLiveAnswer === "no" ? "selected" : ""}><input type="radio" name="go-live" value="no" checked={goLiveAnswer === "no"} onChange={() => { setGoLiveAnswer("no"); setReviewed(false); }}/>No — the interface works, but the report and laboratory operation are not ready</label>
        </fieldset>
        {goLiveAnswer && <div className={`feedback ${goLiveAnswer === "no" ? "correct" : "incorrect"}`} role="status"><strong>{goLiveAnswer === "no" ? "Correct." : "Not quite."}</strong><p>{goLiveAnswer === "no" ? "Successful result transmission is only one part of go-live. The report, CDS, procedures, training, and staffing must also be ready." : "The interface test passed, but the assay is not ready for patient use."}</p></div>}
        <div className="orientation-review">
          <button className="primary-button" type="button" disabled={!allAnswered} onClick={() => { setReviewed(true); onAttempt?.(true); }}>Review my assignments</button>
          {!allAnswered && <p>Complete all questions if you want a score. You can open the debrief below at any time.</p>}
        </div>
        {reviewed && <div className={`feedback ${passed ? "correct" : "incorrect"}`} role="status"><strong>{passed ? "The responsibilities are clear. Open the debrief below." : "Some responsibilities are still assigned to the wrong group."}</strong><p>{passed ? "The laboratory can now see who builds, who advises, who runs the operation, and who owns the report." : `You have ${roleScore} of ${orientationTasks.length} responsibility assignments and ${ticketScore} of ${orientationTickets.length} support tickets correct. Review the marked items and try again.`}</p></div>}
      </section>

      <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
    </div>
  );
}
