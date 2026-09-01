import { useMemo, useState, type ComponentType } from "react";
import {
  dataPath,
  dataPathChoices,
  dataPathInstruction,
  exampleMissingSource,
  openingChoices,
  qualityChecks,
  qualityTerms,
  repairChoices,
  reportTableInstructions,
  reportCsvUrl,
  reportRows,
  reportSummaries,
  validationCases,
  weeklyTat,
  type ReportPeriod,
  type ReportRow,
} from "../../content/lessons/can-we-trust-this-report/interaction";

type MdxComponent = ComponentType<Record<string, unknown>>;
type ReportView = "all" | "original" | "fair";
type SortKey = "accession" | "period" | "tat";
type SummaryMode = "two-period" | "three-period";

const oneDecimal = (value: number) => value.toFixed(1);

const reportLabel = (period: ReportPeriod) => period === "baseline" ? "Pre-go-live" : period === "cutover" ? "Cutover week" : "Post-go-live, after cutover";

function ReportSummary({ mode }: { mode: SummaryMode }) {
  const separated = mode === "three-period";
  return (
    <article className="quality-report-card" aria-label={separated ? "Three-period turnaround-time report" : "Original pre- and post-go-live turnaround-time report"}>
      <header>
        <div><span>Monthly_SurgPath_TAT.xlsx</span><strong>{separated ? "Summary tab — cutover shown separately" : "Summary tab — original pre/post comparison"}</strong></div>
        <span className={separated ? "report-status ready" : "report-status draft"}>{separated ? "Revised" : "Draft"}</span>
      </header>
      <div className="sheet-tabs" aria-label="Spreadsheet tabs"><span aria-current="page">Summary</span><a href="#rows-title">Data · 455 rows</a></div>
      <div className="report-summary-table-wrap">
        <table className="report-summary-table">
          <caption>{separated ? "Turnaround time with cutover week shown separately" : "Original pre- and post-go-live turnaround-time comparison"}</caption>
          <thead><tr><th scope="col">Period</th><th scope="col">N</th><th scope="col">Mean</th><th scope="col">Median</th></tr></thead>
          <tbody>
            <tr><th scope="row">Pre-go-live<small>Jan 5–Feb 13</small></th><td>{reportSummaries.baseline.cases}</td><td>{oneDecimal(reportSummaries.baseline.mean)} days</td><td>{oneDecimal(reportSummaries.baseline.median)} days</td></tr>
            {separated && <tr className="cutover-summary-row"><th scope="row">Cutover week<small>Feb 16–20</small></th><td>{reportSummaries.cutover.cases}</td><td>{oneDecimal(reportSummaries.cutover.mean)} days</td><td>{oneDecimal(reportSummaries.cutover.median)} days</td></tr>}
            <tr><th scope="row">{separated ? "Post-go-live after cutover" : "Post-go-live (includes cutover)"}<small>{separated ? "Feb 23–Apr 3" : "Feb 16–Apr 3"}</small></th><td>{separated ? reportSummaries.fairPost.cases : reportSummaries.originalPost.cases}</td><td>{oneDecimal(separated ? reportSummaries.fairPost.mean : reportSummaries.originalPost.mean)} days</td><td>{oneDecimal(separated ? reportSummaries.fairPost.median : reportSummaries.originalPost.median)} days</td></tr>
          </tbody>
        </table>
      </div>
      {separated && <div className="spreadsheet-note qualified"><strong>All 455 cases remain in the report</strong><span>The 35 cutover cases are shown in their own group rather than mixed with the later post-go-live cases</span></div>}
      <footer>
        <span>N = number of cases · TAT = working days from accession to initial final report</span>
      </footer>
    </article>
  );
}

function ReportTable() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState<"all" | ReportPeriod>("all");
  const [specimen, setSpecimen] = useState<"all" | "Biopsy" | "Resection">("all");
  const [view, setView] = useState<ReportView>("all");
  const [sortKey, setSortKey] = useState<SortKey>("accession");
  const [descending, setDescending] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return reportRows
      .filter((row) => !query || row.accessionId.toLowerCase().includes(query))
      .filter((row) => period === "all" || row.period === period)
      .filter((row) => specimen === "all" || row.specimenGroup === specimen)
      .filter((row) => view === "all" || (view === "original" ? row.currentPostIncluded : row.fairPostIncluded))
      .sort((a, b) => {
        const direction = descending ? -1 : 1;
        if (sortKey === "tat") return (a.tatWorkingDays - b.tatWorkingDays) * direction;
        const left = sortKey === "period" ? a.period : a.accessionId;
        const right = sortKey === "period" ? b.period : b.accessionId;
        return left.localeCompare(right) * direction;
      });
  }, [descending, period, search, sortKey, specimen, view]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const shownRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const updateFilters = (action: () => void) => { action(); setPage(1); };
  const resetTable = () => {
    setSearch("");
    setPeriod("all");
    setSpecimen("all");
    setView("all");
    setSortKey("accession");
    setDescending(false);
    setPage(1);
  };

  return (
    <div className="report-browser">
      <div className="report-toolbar">
        <label><span>Search accession</span><input value={search} onChange={(event) => updateFilters(() => setSearch(event.target.value))} /></label>
        <label><span>Period</span><select value={period} onChange={(event) => updateFilters(() => setPeriod(event.target.value as typeof period))}><option value="all">All periods</option><option value="baseline">Pre-go-live</option><option value="cutover">Cutover week</option><option value="stabilized">Post-go-live, after cutover</option></select></label>
        <label><span>Specimen group</span><select value={specimen} onChange={(event) => updateFilters(() => setSpecimen(event.target.value as typeof specimen))}><option value="all">Biopsy and resection</option><option value="Biopsy">Biopsy</option><option value="Resection">Resection</option></select></label>
        <label><span>Which cases to show</span><select value={view} onChange={(event) => updateFilters(() => setView(event.target.value as ReportView))}><option value="all">All 455 cases</option><option value="original">Original post-go-live group (245)</option><option value="fair">Post-go-live after cutover (210)</option></select></label>
        <label><span>Sort by</span><select value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}><option value="accession">Accession</option><option value="period">Period</option><option value="tat">TAT</option></select></label>
        <button type="button" className="secondary-button sort-direction" onClick={() => setDescending((current) => !current)}>Sort: {descending ? "descending" : "ascending"}</button>
        <button type="button" className="text-button reset-table" onClick={resetTable}>Reset table</button>
      </div>
      <div className="table-summary" role="status"><strong>{filtered.length} cases</strong><span>Showing {filtered.length ? (safePage - 1) * pageSize + 1 : 0}–{Math.min(safePage * pageSize, filtered.length)}</span><a href={reportCsvUrl} download="surgical-pathology-tat-report.csv">Download editable CSV</a></div>
      <div className="report-table-wrap">
        <table>
          <caption>All surgical pathology cases used to prepare the turnaround-time report</caption>
          <thead><tr><th scope="col">Accession</th><th scope="col">Period</th><th scope="col">Specimen</th><th scope="col">Structured LIS accession time</th><th scope="col">Accession time used for TAT</th><th scope="col">Source used</th><th scope="col">Initial final</th><th scope="col">TAT</th><th scope="col">Amended</th><th scope="col">Original two-period group</th><th scope="col">Revised three-period group</th></tr></thead>
          <tbody>{shownRows.map((row) => <ReportRowView row={row} key={row.accessionId}/>)}</tbody>
        </table>
      </div>
      <div className="pagination" aria-label="Report pages">
        <button type="button" className="secondary-button" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button>
        <span>Page {safePage} of {pageCount}</span>
        <button type="button" className="secondary-button" disabled={safePage === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next</button>
      </div>
    </div>
  );
}

function ReportRowView({ row }: { row: ReportRow }) {
  return <tr>
    <th scope="row">{row.accessionId}</th>
    <td>{reportLabel(row.period)}</td>
    <td>{row.specimenGroup}</td>
    <td>{row.structuredAccessionAt || <strong className="missing-value">Blank</strong>}</td>
    <td>{row.structuredAccessionAt || row.sourceDocumentTime}</td>
    <td>{row.structuredAccessionAt ? "LIS field" : "Requisition and cutover log"}</td>
    <td>{row.finalizedAt}</td>
    <td>{oneDecimal(row.tatWorkingDays)} days</td>
    <td>{row.amended ? "Yes — one accession row" : "No"}</td>
    <td>{row.period === "baseline" ? "Pre-go-live" : "Post-go-live"}</td>
    <td>{reportLabel(row.period)}</td>
  </tr>;
}

function TatTrendChart() {
  const width = 920;
  const height = 420;
  const margin = { top: 58, right: 28, bottom: 74, left: 66 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const yMax = 10;
  const xStep = plotWidth / (weeklyTat.length - 1);
  const x = (index: number) => margin.left + index * xStep;
  const y = (value: number) => margin.top + plotHeight - (value / yMax) * plotHeight;
  const line = (field: "mean" | "median") => weeklyTat.map((point, index) => `${index ? "L" : "M"} ${x(index).toFixed(1)} ${y(point[field]).toFixed(1)}`).join(" ");
  const cutoverIndex = weeklyTat.findIndex((point) => point.period === "cutover");
  const cutoverLeft = x(cutoverIndex) - xStep / 2;
  const labelIndexes = new Set([0, 2, 4, cutoverIndex, 8, 10, weeklyTat.length - 1]);

  return <figure className="tat-trend-figure">
    <div className="tat-chart-legend" aria-hidden="true"><span className="mean-line">Mean TAT</span><span className="median-line">Median TAT</span><span className="cutover-key">Cutover week</span></div>
    <div className="tat-chart-scroll">
      <svg className="tat-trend-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="tat-chart-title tat-chart-description">
        <title id="tat-chart-title">Weekly surgical pathology turnaround time before, during, and after LIS go-live</title>
        <desc id="tat-chart-description">Mean and median turnaround time are stable before go-live, rise sharply during cutover week, and then return slightly below the pre-go-live values.</desc>
        <rect x={cutoverLeft} y={margin.top} width={xStep} height={plotHeight} className="cutover-band"/>
        {[0, 2, 4, 6, 8, 10].map((tick) => <g key={tick}><line x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} className="chart-gridline"/><text x={margin.left - 12} y={y(tick) + 4} textAnchor="end" className="chart-axis-label">{tick}</text></g>)}
        <line x1={margin.left} x2={margin.left} y1={margin.top} y2={height - margin.bottom} className="chart-axis"/>
        <line x1={margin.left} x2={width - margin.right} y1={height - margin.bottom} y2={height - margin.bottom} className="chart-axis"/>
        <text x={18} y={margin.top + plotHeight / 2} transform={`rotate(-90 18 ${margin.top + plotHeight / 2})`} textAnchor="middle" className="chart-axis-title">Working days</text>
        <text x={(x(0) + x(5)) / 2} y={26} textAnchor="middle" className="chart-period-label">Pre-go-live</text>
        <text x={x(cutoverIndex)} y={26} textAnchor="middle" className="chart-period-label cutover-label">Cutover</text>
        <text x={(x(7) + x(weeklyTat.length - 1)) / 2} y={26} textAnchor="middle" className="chart-period-label">Post-go-live</text>
        <path d={line("mean")} className="chart-line mean"/>
        <path d={line("median")} className="chart-line median"/>
        {weeklyTat.map((point, index) => <g key={point.key}>
          <circle cx={x(index)} cy={y(point.mean)} r="4" className="chart-point mean"/>
          <circle cx={x(index)} cy={y(point.median)} r="4" className="chart-point median"/>
          {labelIndexes.has(index) && <text x={x(index)} y={height - margin.bottom + 25} textAnchor="middle" className="chart-date-label">{point.label}</text>}
        </g>)}
      </svg>
    </div>
    <figcaption>Each point summarizes the cases accessioned during one week. The solid line shows the mean; the dashed line shows the median. Cutover week is shaded.</figcaption>
    <details className="chart-data-table"><summary>View the weekly values in a table</summary><div className="report-table-wrap"><table><caption>Weekly mean and median TAT</caption><thead><tr><th scope="col">Week beginning</th><th scope="col">Period</th><th scope="col">Cases</th><th scope="col">Mean</th><th scope="col">Median</th></tr></thead><tbody>{weeklyTat.map((point) => <tr key={point.key}><th scope="row">{point.label}</th><td>{reportLabel(point.period)}</td><td>{point.cases}</td><td>{oneDecimal(point.mean)} days</td><td>{oneDecimal(point.median)} days</td></tr>)}</tbody></table></div></details>
  </figure>;
}

export function DataQualityExperience({ Concepts, Bridge, Comparison, Investigation, onAttempt }: { Concepts?: MdxComponent; Bridge?: MdxComponent; Comparison?: MdxComponent; Investigation?: MdxComponent; onAttempt?: (attempted: boolean) => void }) {
  const [openingChoice, setOpeningChoice] = useState<string | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [flowChoice, setFlowChoice] = useState<string | null>(null);
  const [qualityAnswers, setQualityAnswers] = useState<Record<string, string>>({});
  const [repair, setRepair] = useState<string | null>(null);
  const [testsRun, setTestsRun] = useState(false);

  const selectedOpening = openingChoices.find((choice) => choice.id === openingChoice);
  const selectedFlowChoice = dataPathChoices.find((choice) => choice.id === flowChoice);
  const selectedRepair = repairChoices.find((choice) => choice.id === repair);
  const passed = repair === "defined-cutover";
  const correctlyNamed = qualityChecks.filter((check) => qualityAnswers[check.id] === check.answer).length;

  const reset = () => {
    setOpeningChoice(null);
    setSourceOpen(false);
    setFlowChoice(null);
    setQualityAnswers({});
    setRepair(null);
    setTestsRun(false);
    onAttempt?.(false);
  };

  return (
    <div className="experience data-quality-experience">
      <section className="lesson-section" aria-labelledby="spreadsheet-title">
        <div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">Spreadsheet summary</p><h2 id="spreadsheet-title">Is this ready for the quality meeting?</h2></div></div>
        <p className="section-guidance">Start with the original comparison. Look at the pre- and post-go-live mean and median. Do they point to the same conclusion?</p>
        <ReportSummary mode="two-period"/>
        {Comparison && <div className="mdx-content embedded-mdx comparison-explanation"><Comparison/></div>}
        <fieldset className="opening-decision">
          <legend>What should you do next?</legend>
          <div className="choice-stack" role="radiogroup" aria-label="Report readiness choices">{openingChoices.map((choice) => <label className={openingChoice === choice.id ? "selected" : ""} key={choice.id}><input type="radio" name="opening-choice" checked={openingChoice === choice.id} onChange={() => setOpeningChoice(choice.id)}/><span>{choice.label}</span></label>)}</div>
        </fieldset>
        {selectedOpening && <div className={`feedback ${selectedOpening.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedOpening.correct ? "Look at when the long cases occurred." : "One summary statistic is not enough."}</strong><p>{selectedOpening.feedback}</p></div>}
      </section>

      {Investigation && <section className="lesson-section mdx-content embedded-mdx cutover-discovery" aria-label="Cutover investigation"><Investigation/></section>}

      <section className="lesson-section" aria-labelledby="source-title">
        <div className="section-heading"><span className="section-number">02</span><div><p className="eyebrow">One affected accession</p><h2 id="source-title">Compare the LIS with the scanned requisition</h2></div></div>
        <p className="section-guidance">This is one of the 27 cutover cases whose accession time was not entered into the structured LIS field. The quality coordinator still calculated its TAT using the time documented during cutover. Compare the LIS record with the scanned requisition and confirm where the time was recorded.</p>
        <div className="source-comparison">
          <article className="lis-source-card"><header><span>LIS accession record</span><strong>{exampleMissingSource.accessionId}</strong></header><dl><div><dt>Structured accession time</dt><dd className="missing-value">Blank</dd></div><div><dt>Initial final report</dt><dd>{exampleMissingSource.finalizedAt}</dd></div></dl></article>
          <article className={`requisition-card ${sourceOpen ? "open" : ""}`}><header><span>Scanned requisition</span><strong>{exampleMissingSource.accessionId}</strong></header>{sourceOpen ? <div className="requisition-paper" aria-label="Scanned surgical pathology requisition">
            <div className="requisition-form-header"><div><span>North Valley Medical Center</span><strong>Surgical Pathology Requisition</strong></div><small>FORM AP-101</small></div>
            <section className="requisition-form-section"><h4>Patient information</h4><dl className="requisition-fields patient-fields"><div><dt>Patient</dt><dd>SAMPLE, MORGAN</dd></div><div><dt>MRN</dt><dd>00004217</dd></div><div><dt>Date of birth</dt><dd>01/23/1971</dd></div><div><dt>Location</dt><dd>GI Clinic</dd></div></dl></section>
            <section className="requisition-form-section"><h4>Specimen information</h4><dl className="requisition-fields"><div><dt>Specimen</dt><dd>Colon biopsy</dd></div><div><dt>Procedure</dt><dd>Colonoscopy</dd></div><div className="wide-field"><dt>Clinical history</dt><dd>Chronic diarrhea; rule out microscopic colitis</dd></div></dl></section>
            <div className="requisition-options"><span className="checked-box">☒ Routine</span><span>☐ Frozen section</span><span>☐ Research</span></div>
            <div className="received-stamp"><span>RECEIVED</span><strong>FEB 17 2026</strong><em>{exampleMissingSource.sourceDocumentTime.slice(11)}</em></div>
            <div className="requisition-signoff"><span>Accessioning note</span><strong>Entered on cutover log</strong><span>Initials</span><strong>LR</strong></div>
          </div> : <button type="button" className="secondary-button" onClick={() => setSourceOpen(true)}>Open scanned requisition</button>}</article>
        </div>
        {sourceOpen && <div className="feedback incorrect" role="status"><strong>The accession time is on the requisition but missing from the LIS field.</strong><p>The quality coordinator used the time on the requisition and paper cutover log to calculate TAT for this case in the spreadsheet. The case remained in the post-go-live report, but its accession time came from a different source than usual.</p></div>}
      </section>

      <section className="lesson-section" aria-labelledby="quality-title">
        <div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">PIER 2.1</p><h2 id="quality-title">Audit the data</h2></div></div>
        {Concepts && <div className="mdx-content embedded-mdx"><Concepts/></div>}
        <p className="section-guidance audit-guidance">For each check, choose the data-quality dimension it tests. Feedback appears after each choice.</p>
        <div className="quality-audit-grid">{qualityChecks.map((check, index) => {
          const answer = qualityAnswers[check.id];
          const correct = answer === check.answer;
          return <article key={check.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{check.prompt}</h3><label><span>Data-quality dimension</span><select value={answer ?? ""} onChange={(event) => setQualityAnswers((current) => ({ ...current, [check.id]: event.target.value }))}>{qualityTerms.map(([value, label]) => <option value={value} disabled={!value} key={value || "empty"}>{label}</option>)}</select></label>{answer && <p className={correct ? "answer-note correct-note" : "answer-note incorrect-note"} role="status"><strong>{correct ? "Correct." : "Try another term."}</strong> {check.explanation}</p>}</article>;
        })}</div>
        <p className="audit-score" role="status">{correctlyNamed} of 7 checks correctly named.</p>
      </section>

      <section className="lesson-section" aria-labelledby="flow-title">
        <div className="section-heading"><span className="section-number">04</span><div><p className="eyebrow">One case, then the report</p><h2 id="flow-title">How this case was added to the report</h2></div></div>
        <p className="section-guidance">{dataPathInstruction}</p>
        <ol className="case-data-flow">{dataPath.map((step, index) => <li className={step.id === "lis" ? "problem-step" : ""} key={step.id}><span className="flow-step-number">{index + 1}</span><div>{step.id === "lis" && <small>Problem found here</small>}<strong>{step.label}</strong><p>{step.detail}</p></div></li>)}</ol>
        <fieldset className="opening-decision flow-question">
          <legend>How was TAT calculated for this case even though its structured LIS accession-time field is blank?</legend>
          <div className="choice-stack" role="radiogroup" aria-label="Source used for the cutover TAT calculation">{dataPathChoices.map((choice) => <label className={flowChoice === choice.id ? "selected" : ""} key={choice.id}><input type="radio" name="flow-choice" checked={flowChoice === choice.id} onChange={() => setFlowChoice(choice.id)}/><span>{choice.label}</span></label>)}</div>
        </fieldset>
        {selectedFlowChoice && <div className={`feedback ${selectedFlowChoice.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedFlowChoice.correct ? "The documented cutover time was used." : "Look again at the requisition and LIS record."}</strong><p>{selectedFlowChoice.feedback}</p></div>}
      </section>

      <section className="lesson-section" aria-labelledby="separated-title">
        <div className="section-heading"><span className="section-number">05</span><div><p className="eyebrow">Three time periods</p><h2 id="separated-title">Show cutover week separately</h2></div></div>
        <p className="section-guidance">The quality coordinator has now placed the 35 cutover cases in their own group. No cases were removed. Compare the three rows and decide whether they explain why the original post-go-live mean and median disagreed.</p>
        <ReportSummary mode="three-period"/>
        <div className="feedback correct"><strong>The cutover week explains the disagreement.</strong><p>Cutover cases had a mean TAT of 8.4 working days and a median of 9.5. After cutover, the mean was 3.0 and the median was 2.5. Mixing those periods produced a post-go-live mean of 3.8 even though the median was 2.5.</p></div>
      </section>

      <section className="lesson-section" aria-labelledby="rows-title">
        <div className="section-heading"><span className="section-number">06</span><div><p className="eyebrow">All 455 accessions</p><h2 id="rows-title">Inspect the report</h2></div></div>
        <p className="section-guidance"><strong>This is the Data tab of the spreadsheet.</strong> Use it to confirm that all 35 cutover cases were included in the original post-go-live group and that they remain visible after cutover week is shown separately.</p>
        <ol className="report-instructions">{reportTableInstructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol>
        <ReportTable/>
      </section>

      <section className="lesson-section" aria-labelledby="repair-title">
        <div className="section-heading"><span className="section-number">07</span><div><p className="eyebrow">Revise the report</p><h2 id="repair-title">How should the laboratory report these cases?</h2></div></div>
        <p className="section-guidance">The original two-period comparison mixes a difficult cutover week with six later weeks of routine operation. Choose a report structure that shows what happened without hiding any cases.</p>
        <div className="repair-choice-grid" role="radiogroup" aria-label="Report correction choices">{repairChoices.map((choice) => <button type="button" role="radio" aria-checked={repair === choice.id} className={repair === choice.id ? "selected" : ""} key={choice.id} onClick={() => { setRepair(choice.id); setTestsRun(false); }}><span className="choice-marker"/><strong>{choice.label}</strong><small>{choice.detail}</small></button>)}</div>
        {selectedRepair && <div className={`feedback ${selectedRepair.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedRepair.correct ? "Show cutover week as its own period." : "This still hides part of what happened."}</strong><p>{selectedRepair.feedback}</p></div>}
        {selectedRepair && <div className="corrected-report"><ReportSummary mode={passed ? "three-period" : "two-period"}/></div>}
        <div className="validation-console">
          <header><span>Report checks</span><strong>{testsRun ? (passed ? "7 passed" : "Checks failed") : "Not run"}</strong></header>
          {validationCases.map((item) => <div className="validation-row" key={item.label}><div><strong>{item.label}</strong><small>{item.result}</small></div><b className={!testsRun ? "pending" : passed ? "pass" : "fail"}>{!testsRun ? "Pending" : passed ? "Pass" : "Fail"}</b></div>)}
          <button className="primary-button" type="button" disabled={!repair} onClick={() => { setTestsRun(true); onAttempt?.(true); }}>Rerun the report checks</button>
        </div>
        {testsRun && passed && <div className="feedback correct" role="status"><strong>The revised report is ready for review.</strong><p>It shows a severe, temporary delay during cutover and a modest improvement afterward. All 455 cases remain visible, and the report states that 27 cutover accession times were recovered from requisitions and the paper cutover log.</p></div>}
      </section>

      <section className="lesson-section" aria-labelledby="trend-title">
        <div className="section-heading"><span className="section-number">08</span><div><p className="eyebrow">TAT over time</p><h2 id="trend-title">Before, during, and after go-live</h2></div></div>
        <p className="section-guidance">The weekly view shows why one pre/post summary was misleading. Follow both lines across the six pre-go-live weeks, cutover week, and the six weeks after cutover.</p>
        <TatTrendChart/>
      </section>

      {Bridge && <section className="lesson-section mdx-content embedded-mdx topic-bridge"><Bridge/></section>}
      <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
    </div>
  );
}
