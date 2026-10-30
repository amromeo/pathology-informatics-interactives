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
import type { ExperienceProps } from "../App";

export function AiDeploymentExperience({
  Concepts,
  Bridge,
  Investigation,
  Comparison,
  onAttempt,
}: ExperienceProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({}),
    [prevalence, setPrevalence] = useState(10),
    [separation, setSeparation] = useState(2),
    [checked, setChecked] = useState<Record<string, boolean>>({});
  const choose = (id: string, v: string, reviewKey = id) => {
    setAnswers((current) => ({ ...current, [id]: v }));
    setChecked((current) => ({ ...current, [reviewKey]: false }));
  };
  const check = (id: string) => {
    setChecked((current) => ({ ...current, [id]: true }));
    onAttempt?.(true);
  };
  const p = simulatedPerformance(prevalence / 100, separation);
  const outcomes = [
    {
      id: "tp",
      truth: "Metastasis present",
      call: "Positive",
      name: "True positive: cancer found",
      count: p.tp,
    },
    {
      id: "fn",
      truth: "Metastasis present",
      call: "Negative",
      name: "False negative: cancer missed",
      count: p.fn,
    },
    {
      id: "fp",
      truth: "No metastasis",
      call: "Positive",
      name: "False positive: a false alarm",
      count: p.fp,
    },
    {
      id: "tn",
      truth: "No metastasis",
      call: "Negative",
      name: "True negative: correctly left negative",
      count: p.tn,
    },
  ];
  return (
    <div className="ai-experience">
      <Section
        number={1}
        title="How does each program work?"
        purpose="Read how each program was made, then choose a first check that would reveal mistakes in its work."
      >
        <MdxBlock Content={Concepts} />
        {proposals.map((row) => (
          <article className="artifact-card" key={row.id} aria-labelledby={"proposal-" + row.id}>
            <h3 id={"proposal-" + row.id}>{row.title}</h3>
            <p>{row.record}</p>
            <ChoiceGroup
              question="How was this program made?"
              value={answers[row.id] ?? ""}
              choices={orderedChoices(row.id, modelKinds)}
              onChange={(v) => choose(row.id, v)}
            />
            <ChoiceGroup
              question="What should the team check first?"
              value={answers[row.id + "review"] ?? ""}
              choices={orderedChoices(row.id, reviewKinds)}
              onChange={(v) => choose(row.id + "review", v, row.id)}
            />
            <button type="button" className="secondary-button" onClick={() => check(row.id)}>
              Check this proposal
            </button>
            <Feedback
              tone={
                answers[row.id] === row.kind && answers[row.id + "review"] === row.review
                  ? "correct"
                  : "incorrect"
              }
            >
              {checked[row.id] && row.why}
            </Feedback>
          </article>
        ))}
      </Section>
      <Section
        number={2}
        title="What do the slide counts tell us?"
        purpose="First compare the local scanners and deposit sizes. Then look for a change over time and explore why false alarms matter."
      >
        <MdxBlock Content={Bridge} />
        <p className="ai-table-help">Scroll the table sideways to see every column.</p>
        <DataTable label="Local verification" caption={<>Table 1. First local test</>}>
          <thead>
            <tr>
              <th scope="col">Scanner</th>
              <th scope="col">Deposit size</th>
              <th scope="col">Found / positive slides</th>
              <th scope="col">Missed</th>
            </tr>
          </thead>
          <tbody>
            {verificationRows.map((r) => (
              <tr key={r.scanner + r.lesion}>
                <td>{r.scanner}</td>
                <td>
                  {r.lesion === "Micrometastasis"
                    ? "Small (micrometastasis)"
                    : "Large (macrometastasis)"}
                </td>
                <td>
                  {r.detected}/{r.total} ({((100 * r.detected) / r.total).toFixed(1)}%)
                </td>
                <td>{r.total - r.detected}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
        <ChoiceGroup
          question="What does the lower detection rate at the first local test suggest?"
          value={answers.initial ?? ""}
          choices={orderedChoices("initial", performanceChoices)}
          onChange={(v) => choose("initial", v)}
        />
        <button type="button" className="secondary-button" onClick={() => check("initial")}>
          Check the first local result
        </button>
        <Feedback tone={answers.initial === "generalize" ? "correct" : "incorrect"}>
          {checked.initial &&
            (performanceChoices.find((r) => r.id === answers.initial)?.feedback ??
              "Choose an explanation for the first local result, then check it.")}
        </Feedback>
        <MdxBlock Content={Investigation} />
        <p className="ai-table-help">Scroll the table sideways to see every column.</p>
        <DataTable label="Monthly monitoring" caption={<>Table 2. Monthly detection checks</>}>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Small deposits found</th>
              <th scope="col">Large deposits found</th>
              <th scope="col">What staff recorded</th>
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
        <button type="button" className="secondary-button" onClick={() => check("time")}>
          Check the September decision
        </button>
        <Feedback tone={answers.time === "change" ? "correct" : "incorrect"}>
          {checked.time &&
            (timeChoices.find((r) => r.id === answers.time)?.feedback ??
              "Choose what the laboratory should do about September, then check it.")}
        </Feedback>
        <MdxBlock Content={Comparison} />
        <fieldset className="ai-calculator-controls">
          <legend>Explore a group of 10,000 slides</legend>
          <label>
            Slides with metastases (prevalence): {prevalence}%
            <input
              aria-label="Slides with metastases (prevalence)"
              type="range"
              min="1"
              max="50"
              value={prevalence}
              onChange={(e) => setPrevalence(Number(e.target.value))}
            />
          </label>
          <label>
            Model separation: {separation.toFixed(1)} — higher values make the groups easier to
            distinguish
            <input
              aria-label="Model separation"
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={separation}
              onChange={(e) => setSeparation(Number(e.target.value))}
            />
          </label>
        </fieldset>
        <div className="ai-calculation" role="region" aria-label="Calculated results">
          <p role="status">
            With these settings, {prevalence * 100} of 10,000 slides contain metastases. Sensitivity
            is {(p.sensitivity * 100).toFixed(1)}%, specificity is{" "}
            {(p.specificity * 100).toFixed(1)}%, and positive predictive value is{" "}
            {(p.ppv * 100).toFixed(1)}%.
          </p>
          <p>The table shows expected counts, rounded to whole slides.</p>
          <p className="ai-table-help">Scroll the table sideways to see every column.</p>
          <DataTable label="Four calculated outcomes" caption={<>Table 3. Calculated outcomes</>}>
            <thead>
              <tr>
                <th scope="col">What is on the slide?</th>
                <th scope="col">Program's call</th>
                <th scope="col">Outcome</th>
                <th scope="col">Slides</th>
              </tr>
            </thead>
            <tbody>
              {outcomes.map((row) => (
                <tr key={row.id}>
                  <td>{row.truth}</td>
                  <td>{row.call}</td>
                  <th scope="row">{row.name}</th>
                  <td>{row.count.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
          <p>
            <strong>Start with the slides containing cancer:</strong> the program finds about{" "}
            {p.tp.toFixed(0)} of {(p.tp + p.fn).toFixed(0)}. That is{" "}
            {(p.sensitivity * 100).toFixed(1)}% sensitivity.
          </p>
          <p>
            <strong>Now start with the program's positive calls:</strong> about {p.tp.toFixed(0)}{" "}
            are true positives and {p.fp.toFixed(0)} are false alarms. Only{" "}
            {(p.ppv * 100).toFixed(1)}% of its positive calls contain cancer. That is the positive
            predictive value.
          </p>
        </div>
      </Section>
      <Section
        number={3}
        title="What needs checking before patient use?"
        purpose="The laboratory needs a plan for reviewing errors, protecting patients and keeping track of changes. Read each situation and identify the question it raises."
      >
        {governance.map((row) => (
          <article className="artifact-card" key={row.id} aria-label={row.prompt}>
            <p>{row.context}</p>
            <ChoiceGroup
              question={row.prompt}
              value={answers[row.id] ?? ""}
              choices={orderedChoices(row.id, governanceKinds)}
              onChange={(v) => choose(row.id, v)}
            />
            <button type="button" className="secondary-button" onClick={() => check(row.id)}>
              Check this answer
            </button>
            <Feedback tone={answers[row.id] === row.answer ? "correct" : "incorrect"}>
              {checked[row.id] && row.why}
            </Feedback>
          </article>
        ))}
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setChecked(
              Object.fromEntries(
                [
                  ...proposals.map((row) => row.id),
                  "initial",
                  "time",
                  ...governance.map((row) => row.id),
                ].map((id) => [id, true]),
              ),
            );
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
          setChecked({});
        }}
      />
    </div>
  );
}
