# Foundational lessons: first revision batch

Date: November 1, 2026. Branch: `codex/foundational-lesson-explanations`.
Base: `1bf7264357ef0e225c444ab7688b10b53b2ca250`.
Status: implemented for author review; this batch is not deployed.

This record describes the initial batch at `abda3ac`. The subsequent Missing CBC
case revision and its verification are recorded in [the author-feedback follow-up](cbc-author-feedback.md).
The visible terms sections added to three lessons are recorded in
[the terms-section follow-up](terms-sections.md).

The author authorized publication of the reviewed Model Under Pressure revision
and continuation with the next batch. This batch applies the consolidated lesson
style guide to lessons 2, 3 and 4, including interactions and supporting materials.

## Teaching changes

| Lesson | Problem addressed | Revision |
| --- | --- | --- |
| The Missing CBC | The map preceded the explanation needed to build it; feedback and supporting material contained generic text. | Explain the message path before the map, distinguish hardware/software/transport/application acknowledgment/chart review, and explain each incorrect record interpretation. Replace repeated faculty and practicum text with this case's work. |
| Can We Trust This Report? | Mean and median were defined without a worked example; the report conclusion overstated what a before/after comparison proves. | Work through five example times, explain the recovered paper accession time and its separate spreadsheet column, keep all 455 cases visible, and distinguish the later observed improvement from a causal claim about the LIS. |
| Can We Accept This Lot? | Questions about uncertainty preceded sufficient explanation; the signed-rank example did not satisfy its stated assumptions. | Calculate a difference from an actual pair, sum the 18 differences, identify the two middle values, explain SD versus standard error, work through the interval and interpret the p-value. Specify roughly symmetric non-normal paired differences for signed-rank and independent samples for ANOVA. |

All three lessons have specific retrieval questions, feedback explaining the selected
choice, updated debriefs, faculty guides and local practicums. Table references link
to focusable targets. The lot plots now have distinct accessible title/description
IDs when both versions are displayed. Titles, routes and PIER coverage are retained.

## Preserved records and decisions

- The result-path records, timestamps, queue count, decision IDs and answers are unchanged.
- The 455-case surgical pathology CSV and generated dataset are unchanged.
- The 30-specimen lot CSV, concentration groups, calculations, acceptance limits and answer IDs are unchanged.
- The signed-rank scenario's description is corrected; its stable ID and correct test remain the same. The ANOVA scenario now states the independence assumption.
- The invariant comparison against the base passes for all three lessons. The checker now recognizes singular `failNote` as prose and compares an exported CSV URL's lesson/file target rather than the temporary baseline folder. CSV bytes are checked separately with Git.
- Numerical prose checks retain all previous quantities. Their patterns now locate those values in the revised wording; no calculated expected values or tolerances were relaxed.

## Verification

- Curriculum validation passes: 23 lessons and 34 objectives.
- All 132 unit tests pass. Initial failures identified required headings, an overlong correct choice and numerical prose patterns that needed to follow the new wording. Those were corrected while preserving the checks.
- ESLint and formatting by explicit source filename pass. Explicit filenames avoid the previously observed OneDrive glob-discovery problem.
- TypeScript and the Pages production build pass; 55 route pages are generated.
- Thirty-one distinct browser scenarios pass across the main run and focused follow-up: learner/faculty routes at 1365, 390 and 320 px, wrong/correct decisions, retrieval answers, reset, accessibility/reflow, the explanation before map building, tab-specific feedback, faculty-to-table navigation, reset after links, and unchanged lot statistics after filtering the worksheet. The main run includes Model Under Pressure as a check on shared table behavior.
- The first run passed 28 of 29 scenarios. One phone table-link assertion sampled the intermediate layout after native fragment focus but before the existing lazy-content scroll completed. The assertion now waits for the final target position. All six focused scenarios then passed, including the two additional CBC map/feedback scenarios.
- Actual in-app browser review at 1365×900 and 390×900 checked all three lessons' explanations, feedback beside the controls and table presentation. No browser console errors were recorded. Responsive testing used a browser viewport, not a physical phone.

The final small addition explains normal distribution and symmetry before the
test-selection question; the Pages build was repeated afterward. Existing nonfatal
bundle-size and font-cache warnings remain. Temporary logs and test helpers are in
ignored `tmp/`; no temporary server or test configuration is part of the release.

## Screenshots inspected

- [CBC: desktop record and incorrect answer](cbc-desktop-feedback.png)
- [CBC: phone correct-answer feedback](cbc-phone-feedback.png)
- [Report: summary and worked example](report-desktop-example.png)
- [Report: phone choice and feedback](report-phone-feedback.png)
- [Lot comparison: worked mean and median](lot-desktop-worked-example.png)
- [Lot comparison: phone p-value feedback](lot-phone-feedback.png)

## Model Under Pressure publication

The separately reviewed revision was merged in [PR 21](https://github.com/amromeo/pathology-informatics-interactives/pull/21).
The [publication workflow](https://github.com/amromeo/pathology-informatics-interactives/actions/runs/41340552860)
completed successfully for `1bf7264357ef0e225c444ab7688b10b53b2ca250`.
The live lesson footer showed that revision and November 1, 2026. Actual browser
checks verified the revised records question with wrong and correct feedback, a
phone-width Table 2 link and its keyboard focus, and the direct faculty route.
The live browser reported no console errors. See [the published phone table view](published-model-phone.png).

## Remaining curriculum review

Model Under Pressure is author-reviewed and deployed. These three foundational
lessons are the next completed candidate batch, awaiting author review. The other
19 lessons still need the latest full teaching review; earlier curriculum-wide
improvements and the earlier language batch do not count as completion of it.
