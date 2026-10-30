# Machine-learning lesson: fuller explanations for a new learner

October 26, 2026. Baseline: `be61a2954c7e7bbbc9690f7504e2895a3ddf2edd` on the existing draft PR #19.

This revision responds to the author's three annotated photographs and request to explain the lesson for someone with a college or high-school student's background. It expands lesson 6, Model Under Pressure. The earlier first-batch language review remains in [its QA record](../plain-laboratory-language/QA.md).

## Changes prompted by the notes

| Note or teaching problem | Revision |
| --- | --- |
| The opening and task assume too much knowledge. | Explain the pathologist's work, lymph nodes, metastases, tissue preparation and scanning. Walk through what the learner will read, choose and change. |
| Models, training and parameters need more explanation. | Describe an image as numbers, parameters as adjustable numbers in calculations, and training as a three-step cycle. Explain separate test cases and the difference between training and use. Add an expandable reading section. |
| Quality control and a test run are unfamiliar. | Explain control material, the allowed range, a run, and what holding patient results means. Name the boundary and missing-control checks. |
| The proposal questions are too compressed. | Replace “model type” and “first review” with complete questions. Give each proposal a local feedback button and fuller feedback. Changing an answer clears only that proposal's old feedback. |
| “Reference positive” and “true positive” are easily confused. | Explain independently reviewed diagnoses, true positives and false negatives before Table 1. Work through 10 detections and two misses among 12 known-positive slides. Add a derived missed-count column. |
| “First transfer” and “the table” are unclear. | Name first local testing, place teaching directly before each numbered table, and distinguish the local result from the later September decline. |
| The slider explanation starts with a formula rather than a question. | Begin with missed cancer and false alarms. Work from 10% to 1% prevalence in 10,000 slides. Show all four outcomes, then explain the different denominators. Put the formula and its assumptions in an expandable explanation. |
| The new teaching needs to persist beyond this lesson. | Add the requested level of explanation to the project writing preferences. Expand the faculty guide with worked counts and common misconceptions. |

The local case remains 192/200 detections in the vendor's test and 42/50 locally. Local subgroup counts and all three monthly records are unchanged. The calculator still uses the same function and fixed threshold; the display now rounds expected counts to whole slides. Its equal sensitivity and specificity are explained as assumptions of the calculation. The observed tables do not change with the sliders.

## Verification

- `npm test` passed: formatting, lint, curriculum validation, 132 unit tests, type checking and the Pages build.
- After the final button and phone-layout refinements, `npm run build:pages` passed again and generated all 55 routes. The final eight scoped browser checks also each reported success: two decision tests plus lesson and faculty routes at 1365, 390 and 320 pixels, including the route accessibility checks.
- `npx tsx scripts/check-lesson-invariants.ts be61a29 model-under-pressure` passed. IDs, answer keys, choice values, case records, numerical literals and protected manifest fields match the baseline. The calculator function is unchanged.
- Updated decision tests check proposal feedback, clearing stale feedback without clearing another proposal's feedback, fixed observed tables while both sliders change, expected values at 1% prevalence, and a full reset.
- A separate walkthrough exited successfully at 1365 and 390 pixels. It exercised every model-type and first-review option for each proposal, all first-local-result and September choices, each correct patient-use answer, all nine retrieval choices, the explanatory disclosures, calculator, faculty page and keyboard scrolling of wide tables. It found no browser errors or page-level horizontal overflow.
- All 14 final screenshots in [screenshots](screenshots/) were inspected: the case, training explanation, proposal feedback, local table, calculator controls, calculated outcomes and faculty page at each width. On narrow screens, wide tables scroll within their own region and include an instruction to scroll sideways. The two sliders have separate labels and controls.
- The rendered lesson and faculty text were checked against the source paragraphs and calculations. The word checker reports two flagged words in 6,205 lesson words and no repeated template phrases; this is a review aid, not a measure of teaching quality.

The final GitHub CI result is recorded in [draft PR #19](https://github.com/amromeo/pathology-informatics-interactives/pull/19), where the full suite runs on Linux.

## Environment and limits

The production Pages build was served locally at port 4183 and tested with Microsoft Edge controlled by Playwright. This was responsive browser testing, not a physical phone test. The in-app browser connection timed out, so no in-app-browser verification is claimed.

Both scoped Windows test runs reported all eight tests successful but stalled during runner cleanup. They were interrupted after the checks finished; a clean local runner exit is not claimed. The standalone walkthrough exited normally. Its first attempt had an ambiguous selector for an open disclosure; that test-script selector was corrected before the successful runs.

The build reported nonfatal font-cache and bundle-size warnings. It completed successfully. The existing lesson 1 radio-group defect and lesson 6 coverage differences described in the earlier QA record remain outside this revision. Lesson 6 still explains brittleness without performing a paired-image experiment, and the proposal choices still ask for a program type and first check rather than approval or rejection.

Primary introductory sources from Google, NCI and FDA were checked and recorded in the lesson and source ledger. The separate source-link repair in PR #20 is not part of this draft; a full external-link pass for PR #19 is not claimed.

The draft remains for author review. This revision does not merge or publish the site, expand the rewrite to the remaining lessons, or change the deferred licensing decision.
