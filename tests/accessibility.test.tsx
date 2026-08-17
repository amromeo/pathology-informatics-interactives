import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GenericExperience } from "../src/components/GenericExperience";
import { WsiValidationLab } from "../src/components/PilotLabs";
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
