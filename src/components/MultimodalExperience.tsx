import { useState } from "react";
import {
  archiveQuestions,
  dimensions,
  linkedRecords,
  linkChoices,
  archivePlans,
  checkLinks,
} from "../../content/lessons/five-vs-slide-archive/interaction";
import {
  LessonSection as Section,
  Feedback,
  ChoiceGroup,
  orderedChoices,
  MdxBlock,
} from "./lesson-ui";
import { ResetLessonButton } from "./ResetLessonButton";
import type { Topic5Props } from "./Topic5Common";
export function MultimodalExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [dimensionsChosen, setDimensions] = useState<Record<string, string>>({}),
    [links, setLinks] = useState<Record<string, string>>({}),
    [plan, setPlan] = useState(""),
    [checked, setChecked] = useState(false);
  const results = checkLinks(links);
  const change = () => setChecked(false);
  return (
    <div>
      <Section
        number={1}
        title="Five questions about the archive"
        purpose="Match each observation to the question the laboratory needs to answer."
      >
        <MdxBlock Content={Concepts} />
        {archiveQuestions.map((q) => (
          <div key={q.id}>
            <ChoiceGroup
              question={q.prompt}
              value={dimensionsChosen[q.id] ?? ""}
              choices={orderedChoices(
                q.id,
                dimensions.map((d) => ({ id: d, label: d })),
              )}
              onChange={(v) => {
                setDimensions({ ...dimensionsChosen, [q.id]: v });
                change();
              }}
            />
            <Feedback tone={dimensionsChosen[q.id] === q.answer ? "correct" : "incorrect"}>
              {checked && q.why}
            </Feedback>
          </div>
        ))}
      </Section>
      <Section
        number={2}
        title="Check the links in the tumor-board view"
        purpose="Compare each imported record with its source and choose the specific action needed."
      >
        {linkedRecords.map((row) => (
          <article className="artifact-card" key={row.id}>
            <h3>
              {row.id}: {row.title}
            </h3>
            <pre>{row.record}</pre>
            <ChoiceGroup
              question={"Action for " + row.id}
              value={links[row.id] ?? ""}
              choices={orderedChoices(row.id, linkChoices)}
              onChange={(v) => {
                setLinks({ ...links, [row.id]: v });
                change();
              }}
            />
            <Feedback tone={links[row.id] === row.answer ? "correct" : "incorrect"}>
              {checked && row.why}
            </Feedback>
          </article>
        ))}
      </Section>
      <Section
        number={3}
        title="Choose the archive test"
        purpose="Decide what to test before supporting clinical retrieval and research at the same time."
      >
        <MdxBlock Content={Bridge} />
        <ChoiceGroup
          question="Which plan addresses this workload?"
          value={plan}
          choices={orderedChoices("archive", archivePlans)}
          onChange={(v) => {
            setPlan(v);
            change();
          }}
        />
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setChecked(true);
            onAttempt?.(true);
          }}
        >
          Check the archive plan
        </button>
        <Feedback tone={plan === "separate" ? "correct" : "incorrect"}>
          {checked && archivePlans.find((p) => p.id === plan)?.feedback}
        </Feedback>
        <Feedback tone="info">
          {checked &&
            results.filter((r) => r.pass).length +
              " of " +
              results.length +
              " record actions match the source evidence. Recheck every failed link before presenting the combined view."}
        </Feedback>
      </Section>
      <ResetLessonButton
        fallback={() => {
          setDimensions({});
          setLinks({});
          setPlan("");
          setChecked(false);
        }}
      />
    </div>
  );
}
