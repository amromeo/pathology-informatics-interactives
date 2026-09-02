import { useMemo, useState, type ComponentType } from "react";
import {
  confidenceChoices,
  confidenceIntervalPasses,
  decisionResults,
  decisionSummary,
  descriptiveChecks,
  descriptiveTerms,
  elevatedRangePasses,
  elevatedResults,
  finalChoices,
  lotComparisonCsvUrl,
  lotResults,
  lowRangePasses,
  patternChoices,
  pValueChoices,
  testOptions,
  testScenarios,
  validationChecks,
  veryLowResults,
  type LotResultRow,
  type TroponinRange,
} from "../../content/lessons/can-we-accept-this-lot/interaction";

type MdxComponent = ComponentType<Record<string, unknown>>;
type RangeFilter = "all" | TroponinRange;

const oneDecimal = (value: number) => value.toFixed(1);
const signed = (value: number, unit = "") => `${value > 0 ? "+" : ""}${oneDecimal(value)}${unit}`;
const rangeLabel = (range: TroponinRange) => range === "very-low" ? "Very low" : range === "decision" ? "Near clinical decision concentration" : "Markedly elevated";

function LotWorksheet() {
  const [filter, setFilter] = useState<RangeFilter>("decision");
  const [search, setSearch] = useState("");
  const rows = useMemo(() => lotResults.filter((row) => {
    const rangeMatches = filter === "all" || row.rangeGroup === filter;
    return rangeMatches && row.specimenId.toLowerCase().includes(search.trim().toLowerCase());
  }), [filter, search]);

  const resultDisplay = (row: LotResultRow, value: number) => row.rangeGroup === "very-low" ? "<2" : oneDecimal(value);

  return <div className="lot-worksheet">
    <header><div><span>CHEMISTRY_LOT_COMPARISON.CSV</span><strong>High-sensitivity cardiac troponin I</strong></div><a href={lotComparisonCsvUrl} download>Download editable CSV</a></header>
    <div className="lot-toolbar">
      <label><span>Search specimen</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Enter a specimen ID"/></label>
      <label><span>Which specimens to show</span><select value={filter} onChange={(event) => setFilter(event.target.value as RangeFilter)}><option value="decision">Near clinical decision concentration (18)</option><option value="very-low">Very low (6)</option><option value="elevated">Markedly elevated (6)</option><option value="all">All specimens (30)</option></select></label>
    </div>
    <div className="report-table-wrap lot-table-wrap"><table><caption>Paired current- and new-lot troponin results</caption><thead><tr><th scope="col">Specimen</th><th scope="col">Range</th><th scope="col">Current lot<br/><small>ng/L</small></th><th scope="col">New lot<br/><small>ng/L</small></th><th scope="col">Difference<br/><small>new − current</small></th><th scope="col">Percent difference</th></tr></thead><tbody>{rows.map((row) => <tr key={row.specimenId}><th scope="row">{row.specimenId}</th><td>{rangeLabel(row.rangeGroup)}</td><td>{resultDisplay(row, row.currentLot)}</td><td>{resultDisplay(row, row.newLot)}</td><td>{row.rangeGroup === "very-low" ? "Same reported category" : signed(row.difference)}</td><td>{row.rangeGroup === "very-low" ? "—" : signed(row.percentDifference, "%")}</td></tr>)}</tbody></table></div>
    <p className="table-count" role="status">Showing {rows.length} of 30 specimens.</p>
  </div>;
}

function DifferenceDotPlot({ showSummaries = false }: { showSummaries?: boolean }) {
  const width = 820;
  const height = 235;
  const margin = { left: 70, right: 40, top: 34, bottom: 62 };
  const min = -1;
  const max = 4;
  const x = (value: number) => margin.left + ((value - min) / (max - min)) * (width - margin.left - margin.right);
  const rows = [70, 98, 126, 154];

  return <figure className="difference-figure" aria-labelledby="difference-chart-caption">
    <div className="chart-legend"><span className="dot-key">Individual specimen</span>{showSummaries && <><span className="mean-key">Mean</span><span className="median-key">Median</span></>}</div>
    <div className="chart-scroll"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="difference-chart-title difference-chart-description">
      <title id="difference-chart-title">Paired differences near the clinical decision concentration</title>
      <desc id="difference-chart-description">Most new-lot results are slightly higher. Several larger positive differences create a modest right-sided tail without one isolated extreme result.</desc>
      {[-1, 0, 1, 2, 3, 4].map((tick) => <g key={tick}><line x1={x(tick)} x2={x(tick)} y1={margin.top} y2={height - margin.bottom} className={tick === 0 ? "difference-zero" : "chart-gridline"}/><text x={x(tick)} y={height - margin.bottom + 28} textAnchor="middle" className="chart-axis-label">{tick > 0 ? `+${tick}` : tick}</text></g>)}
      <line x1={margin.left} x2={width - margin.right} y1={height - margin.bottom} y2={height - margin.bottom} className="chart-axis"/>
      {showSummaries && <><line x1={x(decisionSummary.mean)} x2={x(decisionSummary.mean)} y1={margin.top} y2={height - margin.bottom} className="difference-mean"/><line x1={x(decisionSummary.median)} x2={x(decisionSummary.median)} y1={margin.top} y2={height - margin.bottom} className="difference-median"/></>}
      {decisionResults.map((row, index) => <circle key={row.specimenId} cx={x(row.difference)} cy={rows[index % rows.length]} r="7" className="difference-point"><title>{`${row.specimenId}: ${signed(row.difference, " ng/L")}`}</title></circle>)}
      <text x={width / 2} y={height - 12} textAnchor="middle" className="chart-axis-title">Paired difference, new lot minus current lot (ng/L)</text>
    </svg></div>
    <figcaption id="difference-chart-caption">Each dot is one of the 18 specimens near the clinical decision concentration. Values above zero are higher with the new lot.</figcaption>
    <details className="chart-data-table"><summary>View the plotted differences in a table</summary><div className="report-table-wrap"><table><caption>Values shown in the paired-difference plot</caption><thead><tr><th scope="col">Specimen</th><th scope="col">Difference</th></tr></thead><tbody>{decisionResults.map((row) => <tr key={row.specimenId}><th scope="row">{row.specimenId}</th><td>{signed(row.difference, " ng/L")}</td></tr>)}</tbody></table></div></details>
  </figure>;
}

function StatisticalSummary() {
  return <div className="stat-summary" aria-label="Summary of paired differences">
    <article><span>Specimens</span><strong>{decisionSummary.specimens}</strong><small>Same specimens tested with both lots</small></article>
    <article><span>Mean difference</span><strong>{signed(decisionSummary.mean, " ng/L")}</strong><small>Average new-lot minus current-lot result</small></article>
    <article><span>Median difference</span><strong>{signed(decisionSummary.median, " ng/L")}</strong><small>Middle paired difference</small></article>
    <article><span>Standard deviation</span><strong>{oneDecimal(decisionSummary.standardDeviation)} ng/L</strong><small>Spread of the paired differences</small></article>
  </div>;
}

function ConfidenceIntervalPlot() {
  const width = 760;
  const height = 190;
  const min = -3;
  const max = 3;
  const x = (value: number) => 70 + ((value - min) / (max - min)) * (width - 110);
  return <figure className="confidence-figure">
    <div className="chart-scroll"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="ci-chart-title ci-chart-description">
      <title id="ci-chart-title">Confidence interval compared with the laboratory's acceptable average shift</title>
      <desc id="ci-chart-description">The 95 percent confidence interval runs from positive 0.6 to positive 1.8 nanograms per liter and remains within the laboratory's acceptable range of negative 2 to positive 2.</desc>
      <rect x={x(-2)} y="42" width={x(2) - x(-2)} height="55" className="acceptable-band"/>
      <text x={(x(-2) + x(2)) / 2} y="31" textAnchor="middle" className="chart-period-label">Laboratory's acceptable average shift</text>
      <line x1={x(decisionSummary.confidenceLow)} x2={x(decisionSummary.confidenceHigh)} y1="69" y2="69" className="confidence-line"/>
      <line x1={x(decisionSummary.confidenceLow)} x2={x(decisionSummary.confidenceLow)} y1="58" y2="80" className="confidence-cap"/>
      <line x1={x(decisionSummary.confidenceHigh)} x2={x(decisionSummary.confidenceHigh)} y1="58" y2="80" className="confidence-cap"/>
      <circle cx={x(decisionSummary.mean)} cy="69" r="8" className="confidence-mean"/>
      {[-3, -2, -1, 0, 1, 2, 3].map((tick) => <g key={tick}><line x1={x(tick)} x2={x(tick)} y1="103" y2="113" className="chart-axis"/><text x={x(tick)} y="137" textAnchor="middle" className="chart-axis-label">{tick > 0 ? `+${tick}` : tick}</text></g>)}
      <line x1={x(min)} x2={x(max)} y1="108" y2="108" className="chart-axis"/>
      <text x={width / 2} y="173" textAnchor="middle" className="chart-axis-title">Average paired difference (ng/L)</text>
    </svg></div>
    <figcaption>Point: mean paired difference of {signed(decisionSummary.mean, " ng/L")}. Line: 95% confidence interval from {signed(decisionSummary.confidenceLow, "")} to {signed(decisionSummary.confidenceHigh, " ng/L")}.</figcaption>
  </figure>;
}

function RangeChecks() {
  const elevatedPercents = elevatedResults.map((row) => Math.abs(row.percentDifference));
  return <div className="range-checks">
    <article className={lowRangePasses ? "pass" : "fail"}><span>Six very low specimens</span><strong>{lowRangePasses ? "Same reportable category" : "Review required"}</strong><p>Both lots report all six specimens as less than 2 ng/L.</p></article>
    <article className={elevatedRangePasses ? "pass" : "fail"}><span>Six markedly elevated specimens</span><strong>{elevatedRangePasses ? "Within ±10%" : "Review required"}</strong><p>The largest absolute percentage difference is {oneDecimal(Math.max(...elevatedPercents))}%.</p></article>
  </div>;
}

export function StatisticsExperience({ Concepts, Bridge, Comparison, Investigation, onAttempt }: { Concepts?: MdxComponent; Bridge?: MdxComponent; Comparison?: MdxComponent; Investigation?: MdxComponent; onAttempt?: (attempted: boolean) => void }) {
  const [pattern, setPattern] = useState<string | null>(null);
  const [descriptiveAnswers, setDescriptiveAnswers] = useState<Record<string, string>>({});
  const [pValueAnswer, setPValueAnswer] = useState<string | null>(null);
  const [confidenceAnswer, setConfidenceAnswer] = useState<string | null>(null);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [finalChoice, setFinalChoice] = useState<string | null>(null);
  const [checksRun, setChecksRun] = useState(false);

  const selectedPattern = patternChoices.find((choice) => choice.id === pattern);
  const selectedPValue = pValueChoices.find((choice) => choice.id === pValueAnswer);
  const selectedConfidence = confidenceChoices.find((choice) => choice.id === confidenceAnswer);
  const selectedFinal = finalChoices.find((choice) => choice.id === finalChoice);
  const descriptiveCorrect = descriptiveChecks.filter((item) => descriptiveAnswers[item.id] === item.answer).length;
  const testsCorrect = testScenarios.filter((item) => testAnswers[item.id] === item.answer).length;
  const finalPasses = finalChoice === "accept-monitor" && confidenceIntervalPasses && lowRangePasses && elevatedRangePasses;

  const reset = () => {
    setPattern(null);
    setDescriptiveAnswers({});
    setPValueAnswer(null);
    setConfidenceAnswer(null);
    setTestAnswers({});
    setFinalChoice(null);
    setChecksRun(false);
    onAttempt?.(false);
  };

  return <div className="experience statistics-experience">
    <section className="lesson-section" aria-labelledby="worksheet-title">
      <div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">Paired patient results</p><h2 id="worksheet-title">Inspect the comparison</h2></div></div>
      {Comparison && <div className="mdx-content embedded-mdx"><Comparison/></div>}
      <LotWorksheet/>
      <DifferenceDotPlot/>
      <fieldset className="opening-decision"><legend>What pattern do the paired differences show?</legend><div className="choice-stack" role="radiogroup" aria-label="Paired-difference pattern choices">{patternChoices.map((choice) => <label className={pattern === choice.id ? "selected" : ""} key={choice.id}><input type="radio" name="pattern-choice" checked={pattern === choice.id} onChange={() => setPattern(choice.id)}/><span>{choice.label}</span></label>)}</div></fieldset>
      {selectedPattern && <div className={`feedback ${selectedPattern.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedPattern.correct ? "The new lot usually reads slightly higher." : "Look again at the position of the dots."}</strong><p>{selectedPattern.feedback}</p></div>}
    </section>

    <section className="lesson-section" aria-labelledby="descriptive-title">
      <div className="section-heading"><span className="section-number">02</span><div><p className="eyebrow">Describe these specimens</p><h2 id="descriptive-title">Mean, median, and spread</h2></div></div>
      {Concepts && <div className="mdx-content embedded-mdx"><Concepts/></div>}
      <StatisticalSummary/>
      <DifferenceDotPlot showSummaries/>
      <div className="statistics-check-grid">{descriptiveChecks.map((item, index) => {
        const answer = descriptiveAnswers[item.id];
        const correct = answer === item.answer;
        return <article key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.prompt}</h3><label><span>Statistic</span><select value={answer ?? ""} onChange={(event) => setDescriptiveAnswers((current) => ({ ...current, [item.id]: event.target.value }))}>{descriptiveTerms.map(([value, label]) => <option value={value} disabled={!value} key={value || "empty"}>{label}</option>)}</select></label>{answer && <p className={correct ? "answer-note correct-note" : "answer-note incorrect-note"} role="status"><strong>{correct ? "Correct." : "Try another statistic."}</strong> {item.explanation}</p>}</article>;
      })}</div>
      <p className="audit-score" role="status">{descriptiveCorrect} of 3 descriptions correctly matched.</p>
    </section>

    <section className="lesson-section" aria-labelledby="inference-title">
      <div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">Draw a conclusion</p><h2 id="inference-title">Confidence interval and p-value</h2></div></div>
      {Investigation && <div className="mdx-content embedded-mdx"><Investigation/></div>}
      <div className="inference-summary"><article><span>Mean paired difference</span><strong>{signed(decisionSummary.mean, " ng/L")}</strong></article><article><span>95% confidence interval</span><strong>{signed(decisionSummary.confidenceLow)} to {signed(decisionSummary.confidenceHigh, " ng/L")}</strong></article><article><span>Paired t-test</span><strong>p {decisionSummary.pDisplay}</strong></article></div>
      <ConfidenceIntervalPlot/>
      <fieldset className="opening-decision"><legend>What does p &lt; 0.001 tell the laboratory?</legend><div className="choice-stack" role="radiogroup" aria-label="P-value interpretation choices">{pValueChoices.map((choice) => <label className={pValueAnswer === choice.id ? "selected" : ""} key={choice.id}><input type="radio" name="p-value-choice" checked={pValueAnswer === choice.id} onChange={() => setPValueAnswer(choice.id)}/><span>{choice.label}</span></label>)}</div></fieldset>
      {selectedPValue && <div className={`feedback ${selectedPValue.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedPValue.correct ? "The lots have a measurable average difference." : "The p-value answers a narrower question."}</strong><p>{selectedPValue.feedback}</p></div>}
      <fieldset className="opening-decision"><legend>What does the 95% confidence interval tell the laboratory?</legend><div className="choice-stack" role="radiogroup" aria-label="Confidence-interval interpretation choices">{confidenceChoices.map((choice) => <label className={confidenceAnswer === choice.id ? "selected" : ""} key={choice.id}><input type="radio" name="confidence-choice" checked={confidenceAnswer === choice.id} onChange={() => setConfidenceAnswer(choice.id)}/><span>{choice.label}</span></label>)}</div></fieldset>
      {selectedConfidence && <div className={`feedback ${selectedConfidence.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedConfidence.correct ? "The estimated average shift remains within the laboratory's limit." : "This interval describes uncertainty around the mean."}</strong><p>{selectedConfidence.feedback}</p></div>}
    </section>

    <section className="lesson-section" aria-labelledby="range-title">
      <div className="section-heading"><span className="section-number">04</span><div><p className="eyebrow">Complete measuring range</p><h2 id="range-title">Check the very low and elevated specimens</h2></div></div>
      <p className="section-guidance">The main statistics describe the 18 specimens near the clinical decision concentration. The laboratory also checks whether the two lots agree at the low and high ends of the comparison.</p>
      <RangeChecks/>
      <details className="range-details"><summary>View the 12 results used for these checks</summary><div className="report-table-wrap"><table><caption>Very low and markedly elevated lot-comparison results</caption><thead><tr><th scope="col">Specimen</th><th scope="col">Range</th><th scope="col">Current lot</th><th scope="col">New lot</th><th scope="col">Check</th></tr></thead><tbody>{[...veryLowResults, ...elevatedResults].map((row) => <tr key={row.specimenId}><th scope="row">{row.specimenId}</th><td>{rangeLabel(row.rangeGroup)}</td><td>{row.rangeGroup === "very-low" ? "<2 ng/L" : `${oneDecimal(row.currentLot)} ng/L`}</td><td>{row.rangeGroup === "very-low" ? "<2 ng/L" : `${oneDecimal(row.newLot)} ng/L`}</td><td>{row.rangeGroup === "very-low" ? "Same reportable category" : `${signed(row.percentDifference, "%")} (limit ±10%)`}</td></tr>)}</tbody></table></div></details>
    </section>

    <section className="lesson-section" aria-labelledby="tests-title">
      <div className="section-heading"><span className="section-number">05</span><div><p className="eyebrow">Other pathology questions</p><h2 id="tests-title">Which statistical test fits?</h2></div></div>
      {Bridge && <div className="mdx-content embedded-mdx"><Bridge/></div>}
      <div className="test-selection-grid">{testScenarios.map((item, index) => {
        const answer = testAnswers[item.id];
        const correct = answer === item.answer;
        return <article key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.prompt}</p><label><span>Best initial choice</span><select value={answer ?? ""} onChange={(event) => setTestAnswers((current) => ({ ...current, [item.id]: event.target.value }))}>{testOptions.map(([value, label]) => <option value={value} disabled={!value} key={value || "empty"}>{label}</option>)}</select></label>{answer && <p className={correct ? "answer-note correct-note" : "answer-note incorrect-note"} role="status"><strong>{correct ? "Correct." : "Choose another test."}</strong> {item.explanation}</p>}</article>;
      })}</div>
      <p className="audit-score" role="status">{testsCorrect} of 5 study questions correctly matched.</p>
    </section>

    <section className="lesson-section" aria-labelledby="decision-title">
      <div className="section-heading"><span className="section-number">06</span><div><p className="eyebrow">Laboratory decision</p><h2 id="decision-title">Can the laboratory use the new lot?</h2></div></div>
      <p className="section-guidance">The average shift is measurable, but its confidence interval remains within the range the laboratory accepted before testing. The low- and high-concentration checks also pass. Choose the next step.</p>
      <div className="repair-choice-grid" role="radiogroup" aria-label="Reagent-lot decision choices">{finalChoices.map((choice) => <button type="button" role="radio" aria-checked={finalChoice === choice.id} className={finalChoice === choice.id ? "selected" : ""} key={choice.id} onClick={() => { setFinalChoice(choice.id); setChecksRun(false); }}><span className="choice-marker"/><strong>{choice.label}</strong><small>{choice.detail}</small></button>)}</div>
      {selectedFinal && <div className={`feedback ${selectedFinal.correct ? "correct" : "incorrect"}`} role="status"><strong>{selectedFinal.correct ? "The new lot can be accepted with documentation and monitoring." : "This does not use all of the available evidence."}</strong><p>{selectedFinal.feedback}</p></div>}
      <div className="validation-console"><header><span>Lot-review checks</span><strong>{checksRun ? (finalPasses ? "7 passed" : "Checks failed") : "Not run"}</strong></header>{validationChecks.map((item) => <div className="validation-row" key={item.label}><div><strong>{item.label}</strong><small>{item.detail}</small></div><b className={!checksRun ? "pending" : finalPasses ? "pass" : "fail"}>{!checksRun ? "Pending" : finalPasses ? "Pass" : "Fail"}</b></div>)}<button className="primary-button" type="button" disabled={!finalChoice} onClick={() => { setChecksRun(true); onAttempt?.(true); }}>Run the lot-review checks</button></div>
      {checksRun && finalPasses && <div className="feedback correct" role="status"><strong>The comparison supports use of the new lot.</strong><p>The paired result pattern, summary statistics, confidence interval, predetermined medical limit, and checks at the low and high ends of the range all support acceptance after laboratory-director review.</p></div>}
    </section>

    <div className="reset-row"><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>
  </div>;
}
