import { useState } from "react";
import { lessonExtensions } from "../data/lessonExtensions";
import { LessonSection, ChoiceGroup, Feedback, orderedChoices } from "./lesson-ui";
export function AdditionalReview({ slug }: { slug: string }) {
  const [ranks, setRanks] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({}),
    [checked, setChecked] = useState(false);
  const data = lessonExtensions[slug];
  if (!data) return null;
  return (
    <LessonSection title={data.title} purpose={data.purpose}>
      {data.questions.map((q) => (
        <div key={q.id}>
          <ChoiceGroup
            question={q.prompt}
            value={answers[q.id] ?? ""}
            choices={orderedChoices(slug + q.id, q.choices)}
            onChange={(v) => {
              setAnswers({ ...answers, [q.id]: v });
              setChecked(false);
            }}
          />
          <Feedback tone={answers[q.id] === q.answer ? "correct" : "incorrect"}>
            {checked && q.feedback}
          </Feedback>
        </div>
      ))}
      {data.order && (
        <fieldset>
          <legend>Put the standards-change request in order</legend>
          {orderedChoices(slug, data.order).map((step) => (
            <label key={step.id} className="topic5-control">
              <span>{step.label}</span>
              <select
                aria-label={step.label}
                value={ranks[step.id] ?? ""}
                onChange={(e) => {
                  setRanks({ ...ranks, [step.id]: e.target.value });
                  setChecked(false);
                }}
              >
                <option value="">Choose position</option>
                {data.order!.map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <Feedback
            tone={
              data.order.every((step) => Number(ranks[step.id]) === step.rank)
                ? "correct"
                : "incorrect"
            }
          >
            {checked &&
              "Define the need, document the gap, submit it to the maintainer, review the published decision, then test the implemented mapping with the recipient."}
          </Feedback>
        </fieldset>
      )}
      <button type="button" className="primary-button" onClick={() => setChecked(true)}>
        Check these decisions
      </button>
    </LessonSection>
  );
}
