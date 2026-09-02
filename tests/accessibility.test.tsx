import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GenericExperience } from "../src/components/GenericExperience";
import { WsiValidationLab } from "../src/components/PilotLabs";
import { ResultJourneyExperience } from "../src/components/ResultJourneyExperience";
import { DataQualityExperience } from "../src/components/DataQualityExperience";
import { StatisticsExperience } from "../src/components/StatisticsExperience";
import { PrivacyExperience } from "../src/components/PrivacyExperience";
import { DowntimeExperience } from "../src/components/DowntimeExperience";
import { SecurityReviewExperience } from "../src/components/SecurityReviewExperience";
import { lessons } from "../src/data/curriculum";

test("shared lesson controls expose semantic groups and labels", () => {
  const html = renderToStaticMarkup(<GenericExperience lesson={lessons[0]} />);
  assert.match(html, /role="radiogroup"/);
  assert.match(html, /role="radio"/);
  assert.match(html, /aria-label="Diagnosis choices"/);
  assert.match(html, /aria-label="Repair choices"/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /<button(?![^>]*type="button")/);
  assert.doesNotMatch(html, /Evidence-supported|Incomplete correction|Unsafe shortcut/);
});

test("the WSI viewer has text alternatives and labeled controls", () => {
  const html = renderToStaticMarkup(<WsiValidationLab />);
  assert.match(html, /alt="Synthetic H&amp;E-style tissue field/);
  assert.match(html, /aria-label="Image navigation"/);
  assert.match(html, /<legend>Evidence required for the intended scope<\/legend>/);
  assert.match(html, /type="checkbox"/);
});

test("the missing CBC map and decisions expose labeled controls", () => {
  const html = renderToStaticMarkup(<ResultJourneyExperience />);
  assert.match(html, /aria-label="First laboratory check"/);
  assert.match(html, /aria-label="Laboratory result reporting path"/);
  assert.match(html, /aria-label="Available system checks"/);
  assert.match(html, /aria-label="Connections in the result reporting path"/);
  assert.match(html, /aria-label="Corrective action choices"/);
  assert.doesNotMatch(html, /<button(?![^>]*type="button")/);
});

test("the surgical pathology report has labeled controls and a semantic table", () => {
  const html = renderToStaticMarkup(<DataQualityExperience/>);
  assert.match(html, /aria-label="Report readiness choices"/);
  assert.match(html, /<ol class="case-data-flow">/);
  assert.match(html, /aria-label="Source used for the cutover TAT calculation"/);
  assert.match(html, /<caption>All surgical pathology cases used to prepare the turnaround-time report/);
  assert.match(html, /<th scope="col">Accession<\/th>/);
  assert.match(html, /Download editable CSV/);
  assert.match(html, /role="img" aria-labelledby="tat-chart-title tat-chart-description"/);
  assert.match(html, /<caption>Weekly mean and median TAT<\/caption>/);
  assert.match(html, /Reset lesson interactions/);
  assert.doesNotMatch(html, /<button(?![^>]*type="button")/);
});

test("the reagent-lot lesson exposes tables, chart alternatives, and labeled choices", () => {
  const html = renderToStaticMarkup(<StatisticsExperience/>);
  assert.match(html, /<caption>Paired current- and new-lot troponin results<\/caption>/);
  assert.match(html, /Download editable CSV/);
  assert.match(html, /role="img" aria-labelledby="difference-chart-title difference-chart-description"/);
  assert.match(html, /<caption>Values shown in the paired-difference plot<\/caption>/);
  assert.match(html, /role="img" aria-labelledby="ci-chart-title ci-chart-description"/);
  assert.match(html, /aria-label="Paired-difference pattern choices"/);
  assert.match(html, /aria-label="P-value interpretation choices"/);
  assert.match(html, /aria-label="Confidence-interval interpretation choices"/);
  assert.match(html, /aria-label="Reagent-lot decision choices"/);
  assert.match(html, /Reset lesson interactions/);
  assert.doesNotMatch(html, /<button(?![^>]*type="button")/);
});

test("the privacy workbench exposes native filters, semantic tables, and live results", () => {
  const lesson = lessons.find((item) => item.manifest.slug === "not-anonymous-enough")!;
  const html = renderToStaticMarkup(<PrivacyExperience lesson={lesson}/>);
  assert.match(html, /<caption>Synthetic educational research export — matching records<\/caption>/);
  assert.match(html, /<th scope="col">Record<\/th>/);
  assert.match(html, /<th scope="row">NR-001<\/th>/);
  assert.match(html, /<select>/);
  assert.match(html, /<legend>Transform displayed fields<\/legend>/);
  assert.match(html, /type="checkbox"/);
  assert.match(html, /type="radio"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /Run release checks/);
  assert.match(html, /Reset lesson interactions/);
  assert.doesNotMatch(html, /<button(?![^>]*type="button")/);
});

test("the downtime tabletop exposes phased choices and semantic reconciliation controls", () => {
  const lesson = lessons.find((item) => item.manifest.slug === "twelve-hours-offline")!;
  const html = renderToStaticMarkup(<DowntimeExperience lesson={lesson}/>);
  assert.match(html, /aria-label="Downtime phases"/);
  assert.match(html, /<legend>How will staff assign temporary patient identifiers\?<\/legend>/);
  assert.match(html, /type="radio"/);
  assert.match(html, /<caption>Synthetic paper records compared with the restored laboratory information system<\/caption>/);
  assert.match(html, /<th scope="col">Temporary ID<\/th>/);
  assert.match(html, /<th scope="row">DT-201<\/th>/);
  assert.match(html, /aria-label="Medical record number for DT-201"/);
  assert.match(html, /<legend>Recovery actions<\/legend>/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /Check reconciliation/);
  assert.match(html, /Reset lesson interactions/);
  assert.doesNotMatch(html, /<button(?![^>]*type="button")/);
});

test("the security review exposes native threat mapping and portfolio controls", () => {
  const lesson = lessons.find((item) => item.manifest.slug === "server-behind-the-analyzer")!;
  const html = renderToStaticMarkup(<SecurityReviewExperience lesson={lesson}/>);
  assert.match(html, /aria-label="Security review areas"/);
  assert.match(html, /<legend>Properties threatened<\/legend>/);
  assert.match(html, /type="checkbox"/);
  assert.match(html, /<progress value="0" max="15">/);
  assert.match(html, /<strong>0 \/ 15<\/strong>/);
  assert.match(html, /<strong>0 \/ 11<\/strong>/);
  assert.match(html, /Run stress test/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /Reset lesson interactions/);
  assert.doesNotMatch(html, /<button(?![^>]*type="button")/);
});
