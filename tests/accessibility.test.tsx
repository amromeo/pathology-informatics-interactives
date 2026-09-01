import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GenericExperience } from "../src/components/GenericExperience";
import { WsiValidationLab } from "../src/components/PilotLabs";
import { ResultJourneyExperience } from "../src/components/ResultJourneyExperience";
import { DataQualityExperience } from "../src/components/DataQualityExperience";
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
