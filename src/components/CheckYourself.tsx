import { useState } from "react";
import type { RetrievalItem } from "../data/types";
import { ChoiceGroup, Feedback, orderedChoices } from "./lesson-ui";
export function CheckYourself({ slug, items }: { slug: string; items: RetrievalItem[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  return (
    <section className="retrieval-check" aria-labelledby="retrieval-title">
      <h2 id="retrieval-title">Check yourself (3 questions)</h2>
      <p>Choose an answer, read the explanation, and try another choice if needed.</p>
      {items.map((item) => {
        const chosen = item.choices.find((c) => c.id === answers[item.id]);
        return (
          <div key={item.id} className="retrieval-item">
            {item.fromLesson && <p className="eyebrow">From Lesson {item.fromLesson}</p>}
            <ChoiceGroup
              question={item.prompt}
              value={answers[item.id] ?? ""}
              choices={orderedChoices(slug + item.id, item.choices)}
              onChange={(value) => setAnswers({ ...answers, [item.id]: value })}
            />
            <Feedback tone={chosen?.correct ? "correct" : "incorrect"}>{chosen?.feedback}</Feedback>
          </div>
        );
      })}
    </section>
  );
}
