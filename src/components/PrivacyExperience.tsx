import { lessonCopy } from "../../content/lessons/not-anonymous-enough/interaction";
import { orderedChoices } from "./lesson-ui";
import { tabKeys } from "./lesson-ui/tabKeys";
import { ResetLessonButton } from "./ResetLessonButton";
import { useMemo, useState, type ComponentType } from "react";
import {
  applyTransforms,
  classifyDataset,
  filterFields,
  fullTransformSet,
  hasUniqueVisibleMatch,
  matchCount,
  minGroupSize,
  privacyRows,
  type DatasetClassification,
  type FilterField,
  type PrivacyFilters,
  type PrivacyRow,
  type ReleaseContext,
  type TransformId,
} from "../../content/lessons/not-anonymous-enough/interaction";
import type { LessonDefinition } from "../data/types";
import { validationResult } from "../data/validation";

type MdxComponent = ComponentType<Record<string, unknown>>;

const filterLabels: Record<FilterField, string> = {
  birthYear: "Birth year",
  sex: "Sex",
  zip5: "Five-digit ZIP",
  admissionDate: "Admission date",
  diagnosis: "Diagnosis",
};

const filterFeedbackLabels: Record<FilterField, string> = {
  birthYear: "birth year",
  sex: "sex",
  zip5: "five-digit ZIP",
  admissionDate: "admission date",
  diagnosis: "diagnosis",
};

const transformOptions: { id: TransformId; label: string; note: string }[] = [
  { id: "date-to-year", label: "Generalize exact dates to year", note: "2026-04-18 becomes 2026." },
  {
    id: "zip-to-three",
    label: "Truncate five-digit ZIP to three digits",
    note: "02108 becomes 021**. Safe Harbor permits this only because the 021 area has more than 20,000 residents.",
  },
  {
    id: "rare-diagnosis-to-category",
    label: "Generalize the rare diagnosis",
    note: "Ewing sarcoma becomes bone and soft tissue neoplasm.",
  },
];

const classificationLabels: Record<DatasetClassification, string> = {
  "coded-reidentifiable": "Coded, reidentifiable protected health information",
  "limited-data-set-candidate": "Possible limited data set pathway — privacy review required",
  "deidentification-review-required":
    "Candidate for documented Safe Harbor or Expert Determination review",
};

const releaseContextOptions: { id: keyof ReleaseContext; label: string }[] = [
  {
    id: "eligiblePurpose",
    label: "An eligible research, public-health, or health-care-operations purpose is documented",
  },
  { id: "namedRecipient", label: "The recipient is named and approved" },
  {
    id: "dataUseAgreement",
    label: "The required data use agreement and confidentiality limits are in place",
  },
];

function PrivacyTable({
  rows,
  caption,
  summaryId,
}: {
  rows: readonly PrivacyRow[];
  caption: string;
  summaryId: string;
}) {
  return (
    <div className="privacy-table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table aria-describedby={summaryId}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Record</th>
            <th scope="col">Birth year</th>
            <th scope="col">Sex</th>
            <th scope="col">ZIP</th>
            <th scope="col">Admission</th>
            <th scope="col">Diagnosis</th>
            <th scope="col">Linkage code</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.recordId}>
              <th scope="row">{row.recordId}</th>
              <td>{row.birthYear}</td>
              <td>{row.sex}</td>
              <td>{row.zip5}</td>
              <td>{row.admissionDate}</td>
              <td>{row.diagnosis}</td>
              <td>{row.linkageCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PrivacyExperience({
  lesson,
  Concepts,
  onAttempt,
}: {
  lesson: LessonDefinition;
  Concepts?: MdxComponent;
  onAttempt?: (attempted: boolean) => void;
}) {
  const [activeTrace, setActiveTrace] = useState(0);
  const [filters, setFilters] = useState<PrivacyFilters>({});
  const [attackConfirmed, setAttackConfirmed] = useState(false);
  const [transforms, setTransforms] = useState<TransformId[]>([]);
  const [keySequestered, setKeySequestered] = useState(false);
  const [releaseContext, setReleaseContext] = useState<ReleaseContext>({
    eligiblePurpose: false,
    namedRecipient: false,
    dataUseAgreement: false,
  });
  const [decision, setDecision] = useState<string | null>(null);
  const [repair, setRepair] = useState<string | null>(null);
  const [testsRun, setTestsRun] = useState(false);

  const filteredRows = useMemo(
    () => privacyRows.filter((row) => matchCount([row], filters) === 1),
    [filters],
  );
  const activeFilters = filterFields.filter(
    (field) => filters[field] !== undefined && filters[field] !== "",
  );
  const attackReady = filteredRows.length === 1 && activeFilters.length >= 2;
  const transformedRows = useMemo(() => applyTransforms(privacyRows, transforms), [transforms]);
  const smallestGroup = minGroupSize(transformedRows, filterFields);
  const uniqueVisibleMatch = hasUniqueVisibleMatch(transformedRows, filterFields);
  const classification = classifyDataset(transforms, keySequestered, releaseContext);
  const selectedDecision = lesson.decisionChoices.find((choice) => choice.id === decision);
  const selectedRepair = lesson.repairChoices.find((choice) => choice.id === repair);
  const baseValidation = validationResult(lesson, repair);

  const workbenchChecks: Record<string, { passed: boolean; failNote: string }> = {
    "Minimum necessary fields": {
      passed: fullTransformSet.every((item) => transforms.includes(item)),
      failNote:
        "The exercise still retains at least one detailed field that the release plan says should be generalized.",
    },
    "Linkage key control": {
      passed: keySequestered,
      failNote: "The linkage key remains in the shared project folder.",
    },
    "Uniqueness-risk review": {
      passed: !uniqueVisibleMatch,
      failNote: "At least one permitted filter combination still returns exactly one record.",
    },
    "Approved recipient and purpose": {
      passed: releaseContext.eligiblePurpose && releaseContext.namedRecipient,
      failNote:
        "The exercise does not yet document both an eligible purpose and a named recipient.",
    },
    "Recipient confidentiality commitment": {
      passed: releaseContext.dataUseAgreement,
      failNote: "The recipient agreement and its restrictions have not been documented.",
    },
  };
  const releaseChecks = baseValidation.cases.map((testCase) => {
    const workbench = workbenchChecks[testCase.name] ?? { passed: true, failNote: "" };
    return {
      ...testCase,
      passed: testCase.passed && workbench.passed,
      failNote: testCase.passed && !workbench.passed ? workbench.failNote : testCase.failNote,
    };
  });
  const releasePassed = releaseChecks.filter((testCase) => testCase.passed).length;

  const updateFilter = (field: FilterField, rawValue: string) => {
    const next: PrivacyFilters = { ...filters };
    if (!rawValue) delete next[field];
    else {
      const value = field === "birthYear" ? Number(rawValue) : rawValue;
      (next as Record<FilterField, string | number | undefined>)[field] = value;
    }
    setFilters(next);
    setAttackConfirmed(false);
  };

  const toggleTransform = (transform: TransformId) => {
    setTransforms((current) =>
      current.includes(transform)
        ? current.filter((item) => item !== transform)
        : [...current, transform],
    );
    setTestsRun(false);
  };

  const reset = () => {
    setActiveTrace(0);
    setFilters({});
    setAttackConfirmed(false);
    setTransforms([]);
    setKeySequestered(false);
    setReleaseContext({ eligiblePurpose: false, namedRecipient: false, dataUseAgreement: false });
    setDecision(null);
    setRepair(null);
    setTestsRun(false);
    onAttempt?.(false);
  };

  return (
    <div className="experience privacy-experience">
      <section className="lesson-section evidence-section" aria-labelledby="privacy-evidence-title">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div>
            <p className="eyebrow">Research export</p>
            <h2 id="privacy-evidence-title">Inspect the fields prepared for release</h2>
          </div>
        </div>
        <article className="artifact-card">
          <header>
            <span>System record</span>
            <strong>{lesson.artifactTitle}</strong>
          </header>
          <dl className="evidence-grid">
            {lesson.evidence.map((item) => (
              <div className={`tone-${item.tone ?? "neutral"}`} key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>

      <section className="lesson-section" aria-labelledby="privacy-trace-title">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div>
            <p className="eyebrow">Trace</p>
            <h2 id="privacy-trace-title">Follow the export from query to proposed release</h2>
          </div>
        </div>
        <p className="section-guidance">
          Select each step to identify who handles the file and which privacy question appears
          there.
        </p>
        <div className="trace-tabs" role="tablist" aria-label="Privacy review steps">
          {lesson.trace.map((step, index) => (
            <button
              key={step.system}
              type="button"
              role="tab"
              aria-selected={activeTrace === index}
              tabIndex={activeTrace === index ? 0 : -1}
              id={"privacy-trace-tab-" + index}
              aria-controls="privacy-trace-panel"
              onKeyDown={tabKeys}
              className={activeTrace === index ? "active" : ""}
              onClick={() => setActiveTrace(index)}
            >
              <span>{index + 1}</span>
              {step.system}
            </button>
          ))}
        </div>
        <article
          className="trace-panel"
          role="tabpanel"
          id="privacy-trace-panel"
          aria-labelledby={"privacy-trace-tab-" + activeTrace}
        >
          <div>
            <p className="eyebrow">{lesson.trace[activeTrace].role}</p>
            <h3>{lesson.trace[activeTrace].system}</h3>
            <p>{lesson.trace[activeTrace].sees}</p>
          </div>
          <aside>
            <strong>Why it matters</strong>
            <p>{lesson.trace[activeTrace].implication}</p>
          </aside>
        </article>
      </section>

      <section className="lesson-section" aria-labelledby="reidentification-title">
        <div className="section-heading">
          <span className="section-number">03</span>
          <div>
            <p className="eyebrow">Reidentification attempt</p>
            <h2 id="reidentification-title">Can retained details isolate one record?</h2>
          </div>
        </div>
        <p className="section-guidance">{lessonCopy.text01}</p>
        <div className="privacy-filter-grid">
          {filterFields.map((field) => {
            const options = [...new Set(privacyRows.map((row) => String(row[field])))].sort(
              (left, right) => left.localeCompare(right, undefined, { numeric: true }),
            );
            return (
              <label key={field}>
                <span>{filterLabels[field]}</span>
                <select
                  value={filters[field] === undefined ? "" : String(filters[field])}
                  onChange={(event) => updateFilter(field, event.target.value)}
                >
                  <option value="">Any</option>
                  {options.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
        </div>
        <div className="privacy-count" aria-live="polite">
          <strong>
            {filteredRows.length} of {privacyRows.length} records match
          </strong>
          <span>
            {activeFilters.length
              ? `Filters: ${activeFilters.map((field) => filterLabels[field]).join(" + ")}`
              : "No filters selected"}
          </span>
        </div>
        <p className="privacy-table-summary" id="raw-privacy-summary">
          {lessonCopy.text02}
        </p>
        <PrivacyTable
          rows={filteredRows}
          caption="Proposed research export — matching records"
          summaryId="raw-privacy-summary"
        />
        <div className="privacy-confirm-row">
          <button
            type="button"
            className="primary-button"
            disabled={!attackReady}
            onClick={() => setAttackConfirmed(true)}
          >
            Confirm isolated record
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setFilters({});
              setAttackConfirmed(false);
            }}
          >
            Clear filters
          </button>
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
          {attackConfirmed && (
            <div className="feedback incorrect">
              <strong>One record is isolated without a name or medical record number.</strong>
              <p>
                The combination of{" "}
                {activeFilters.map((field) => filterFeedbackLabels[field]).join(" and ")} returns{" "}
                {filteredRows[0].recordId}. Outside information containing those same facts could
                connect this record to a person.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="lesson-section" aria-labelledby="workbench-title">
        <div className="section-heading">
          <span className="section-number">04</span>
          <div>
            <p className="eyebrow">Redaction exercise</p>
            <h2 id="workbench-title">{lessonCopy.redactionHeading}</h2>
          </div>
        </div>
        {Concepts && (
          <div className="mdx-content embedded-mdx privacy-concepts">
            <Concepts />
          </div>
        )}
        <div className="privacy-workbench-grid">
          <fieldset>
            <legend>Transform displayed fields</legend>
            {transformOptions.map((option) => (
              <label className={transforms.includes(option.id) ? "selected" : ""} key={option.id}>
                <input
                  type="checkbox"
                  checked={transforms.includes(option.id)}
                  onChange={() => toggleTransform(option.id)}
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.note}</small>
                </span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Control the release</legend>
            <label className={keySequestered ? "selected" : ""}>
              <input
                type="checkbox"
                checked={keySequestered}
                onChange={(event) => {
                  setKeySequestered(event.target.checked);
                  setTestsRun(false);
                }}
              />
              <span>
                <strong>Sequester the linkage key</strong>
                <small>{lessonCopy.text03}</small>
              </span>
            </label>
            {releaseContextOptions.map((option) => (
              <label className={releaseContext[option.id] ? "selected" : ""} key={option.id}>
                <input
                  type="checkbox"
                  checked={releaseContext[option.id]}
                  onChange={(event) => {
                    setReleaseContext((current) => ({
                      ...current,
                      [option.id]: event.target.checked,
                    }));
                    setTestsRun(false);
                  }}
                />
                <span>
                  <strong>{option.label}</strong>
                </span>
              </label>
            ))}
          </fieldset>
        </div>
        <div className="privacy-metric-grid" aria-live="polite">
          <article>
            <span>Smallest displayed group</span>
            <strong>
              {smallestGroup} {smallestGroup === 1 ? "record" : "records"}
            </strong>
            <small>
              This is the current <em>k</em> value for the five displayed fields.
            </small>
          </article>
          <article className={uniqueVisibleMatch ? "warning" : "ready"}>
            <span>Single-record filter combination</span>
            <strong>{uniqueVisibleMatch ? "Still possible" : "Not found"}</strong>
            <small>All filter combinations permitted by this exercise are checked.</small>
          </article>
          <article>
            <span>Linkage key</span>
            <strong>{keySequestered ? "Sequestered" : "Shared"}</strong>
            <small>
              The key is excluded from the <em>k</em> calculation.
            </small>
          </article>
          <article>
            <span>Educational routing result</span>
            <strong>{classificationLabels[classification]}</strong>
            <small>
              The privacy office—not this counter—determines the permitted release path.
            </small>
          </article>
        </div>
        <details className="privacy-preview">
          <summary>View all 18 transformed records</summary>
          <p className="privacy-table-summary" id="transformed-privacy-summary">
            {lessonCopy.text04}
          </p>
          <PrivacyTable
            rows={transformedRows}
            caption="Transformation exercise preview"
            summaryId="transformed-privacy-summary"
          />
        </details>
      </section>

      <section
        className="lesson-section decision-section"
        aria-labelledby="privacy-diagnosis-title"
      >
        <div className="section-heading">
          <span className="section-number">05</span>
          <div>
            <p className="eyebrow">Diagnosis and release decision</p>
            <h2 id="privacy-diagnosis-title">
              Classify the original export, then test a release path
            </h2>
          </div>
        </div>
        <fieldset className="privacy-choice-fieldset">
          <legend>{lesson.decisionPrompt}</legend>
          <div className="choice-stack">
            {orderedChoices("PrivacyExperience.tsx", lesson.decisionChoices).map((choice) => (
              <label className={decision === choice.id ? "selected" : ""} key={choice.id}>
                <input
                  type="radio"
                  name="privacy-diagnosis"
                  checked={decision === choice.id}
                  onChange={() => setDecision(choice.id)}
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div role="status" aria-live="polite" aria-atomic="true">
          {selectedDecision && (
            <div className={`feedback ${selectedDecision.correct ? "correct" : "incorrect"}`}>
              <strong>
                {selectedDecision.correct
                  ? "The original export remains identifiable."
                  : "That classification does not match the retained fields."}
              </strong>
              <p>{selectedDecision.feedback}</p>
            </div>
          )}
        </div>
        <div className="privacy-release-layout">
          <fieldset className="privacy-choice-fieldset">
            <legend>{lesson.repairPrompt}</legend>
            <div className="choice-stack">
              {orderedChoices("PrivacyExperience.tsx", lesson.repairChoices).map((choice) => (
                <label className={repair === choice.id ? "selected" : ""} key={choice.id}>
                  <input
                    type="radio"
                    name="privacy-release"
                    checked={repair === choice.id}
                    onChange={() => {
                      setRepair(choice.id);
                      setTestsRun(false);
                    }}
                  />
                  <span>{choice.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <article className="test-console" aria-live="polite">
            <header>
              <span>Release checks</span>
              <strong>
                {testsRun ? `${releasePassed}/${releaseChecks.length} passed` : "Not run"}
              </strong>
            </header>
            {releaseChecks.map((testCase) => (
              <div className="test-row" key={testCase.name}>
                <span>
                  <strong>{testCase.name}</strong>
                  <small>{testCase.note}</small>
                  {testsRun && !testCase.passed && testCase.failNote && (
                    <small className="test-fail-note">{testCase.failNote}</small>
                  )}
                </span>
                <b className={!testsRun ? "pending" : testCase.passed ? "pass" : "fail"}>
                  {!testsRun ? "Pending" : testCase.passed ? "Pass" : "Fail"}
                </b>
              </div>
            ))}
            <button
              type="button"
              className="primary-button"
              disabled={!repair}
              onClick={() => {
                setTestsRun(true);
                onAttempt?.(true);
              }}
            >
              Run release checks
            </button>
          </article>
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
          {testsRun && selectedRepair && (
            <div
              className={`feedback ${releasePassed === releaseChecks.length ? "correct" : "incorrect"}`}
            >
              <strong>
                {releasePassed === releaseChecks.length
                  ? "The proposal is ready for documented privacy review."
                  : "The proposal is not ready for release."}
              </strong>
              <p>{selectedRepair.feedback}</p>
              <p>
                Your exercise applies {transforms.length} of {transformOptions.length} field
                transformations, leaves the key {keySequestered ? "sequestered" : "shared"}, and
                routes the file as: {classificationLabels[classification]}. The privacy office must
                make the release determination.
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
