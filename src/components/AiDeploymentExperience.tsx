import { useState } from "react";
import {
  proposals,
  modelKinds,
  reviewKinds,
  verificationRows,
  monitoring,
  performanceChoices,
  timeChoices,
  governance,
  governanceKinds,
  simulatedPerformance,
} from "../../content/lessons/model-under-pressure/interaction";
import {
  LessonSection as Section,
  Feedback,
  ChoiceGroup,
  DataTable,
  orderedChoices,
  MdxBlock,
} from "./lesson-ui";
import { ResetLessonButton } from "./ResetLessonButton";
import type { Topic5Props } from "./Topic5Common";
export function AiDeploymentExperience({ Concepts, Bridge, onAttempt }: Topic5Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({}),
    [prevalence, setPrevalence] = useState(10),
    [separation, setSeparation] = useState(2),
    [checked, setChecked] = useState(false);
  const choose = (id: string, v: string) => {
    setAnswers({ ...answers, [id]: v });
    setChecked(false);
  };
  const p = simulatedPerformance(prevalence / 100, separation);
  return (
    <div>
      <Section
        number={1}
        title="Identify what each tool does"
        purpose="Classify four proposals and choose the first review each needs."
      >
        <MdxBlock Content={Concepts} />
        {proposals.map((row) => (
          <article className="artifact-card" key={row.id}>
            <h3>{row.title}</h3>
            <p>{row.record}</p>
            <ChoiceGroup
              question={row.id + ": model type"}
              value={answers[row.id] ?? ""}
              choices={orderedChoices(row.id, modelKinds)}
              onChange={(v) => choose(row.id, v)}
            />
            <ChoiceGroup
              question={row.id + ": first review"}
              value={answers[row.id + "review"] ?? ""}
              choices={orderedChoices(row.id, reviewKinds)}
              onChange={(v) => choose(row.id + "review", v)}
            />
            <Feedback
              tone={
                answers[row.id] === row.kind && answers[row.id + "review"] === row.review
                  ? "correct"
                  : "incorrect"
              }
            >
              {checked && row.why}
            </Feedback>
          </article>
        ))}
      </Section>
      <Section
        number={2}
        title="Review local verification and later monitoring"
        purpose="Separate a failure on transfer from a subsequent change in performance."
      >
        <MdxBlock Content={Bridge} />
        <DataTable
          label="Local verification"
          caption={<>Detection among 50 metastasis-positive slides</>}
        >
          <thead>
            <tr>
              <th scope="col">Scanner</th>
              <th scope="col">Lesion</th>
              <th scope="col">Detected / positive</th>
            </tr>
          </thead>
          <tbody>
            {verificationRows.map((r) => (
              <tr key={r.scanner + r.lesion}>
                <td>{r.scanner}</td>
                <td>{r.lesion}</td>
                <td>
                  {r.detected}/{r.total} ({((100 * r.detected) / r.total).toFixed(1)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
        <ChoiceGroup
          question="What explains the gap at first local use?"
          value={answers.initial ?? ""}
          choices={orderedChoices("initial", performanceChoices)}
          onChange={(v) => choose("initial", v)}
        />
        <Feedback tone={answers.initial === "generalize" ? "correct" : "incorrect"}>
          {checked && performanceChoices.find((r) => r.id === answers.initial)?.feedback}
        </Feedback>
        <DataTable
          label="Monthly monitoring"
          caption={<>Each month: 25 positive micro- and 25 positive macrometastasis slides</>}
        >
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Micrometastases</th>
              <th scope="col">Macrometastases</th>
              <th scope="col">Context</th>
            </tr>
          </thead>
          <tbody>
            {monitoring.map((r) => (
              <tr key={r.month}>
                <th scope="row">{r.month}</th>
                <td>{r.micro}/25</td>
                <td>{r.macro}/25</td>
                <td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
        <ChoiceGroup
          question="What should happen after September's result?"
          value={answers.time ?? ""}
          choices={orderedChoices("time", timeChoices)}
          onChange={(v) => choose("time", v)}
        />
        <Feedback tone={answers.time === "change" ? "correct" : "incorrect"}>
          {checked && timeChoices.find((r) => r.id === answers.time)?.feedback}
        </Feedback>
        <fieldset>
          <legend>Explore prevalence and class separation</legend>
          <label>
            Local prevalence: {prevalence}%
            <input
              aria-label="Local prevalence"
              type="range"
              min="1"
              max="50"
              value={prevalence}
              onChange={(e) => setPrevalence(Number(e.target.value))}
            />
          </label>
          <label>
            Class separation: {separation.toFixed(1)}
            <input
              aria-label="Class separation"
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={separation}
              onChange={(e) => setSeparation(Number(e.target.value))}
            />
          </label>
          <p role="status">
            Modeled sensitivity {(p.sensitivity * 100).toFixed(1)}%; positive predictive value{" "}
            {(p.ppv * 100).toFixed(1)}%. Among 10,000 hypothetical classifications:{" "}
            {p.tp.toFixed(1)} true positives, {p.fn.toFixed(1)} false negatives, {p.fp.toFixed(1)}{" "}
            false positives and {p.tn.toFixed(1)} true negatives.
          </p>
        </fieldset>
      </Section>
      <Section
        number={3}
        title="Assign the review questions"
        purpose="Distinguish equity, responsibility, records and device-status checks before a pilot."
      >
        {governance.map((row) => (
          <div key={row.id}>
            <ChoiceGroup
              question={row.prompt}
              value={answers[row.id] ?? ""}
              choices={orderedChoices(row.id, governanceKinds)}
              onChange={(v) => choose(row.id, v)}
            />
            <Feedback tone={answers[row.id] === row.answer ? "correct" : "incorrect"}>
              {checked && row.why}
            </Feedback>
          </div>
        ))}
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setChecked(true);
            onAttempt?.(true);
          }}
        >
          Check the AI review
        </button>
      </Section>
      <ResetLessonButton
        fallback={() => {
          setAnswers({});
          setPrevalence(10);
          setSeparation(2);
          setChecked(false);
        }}
      />
    </div>
  );
}
