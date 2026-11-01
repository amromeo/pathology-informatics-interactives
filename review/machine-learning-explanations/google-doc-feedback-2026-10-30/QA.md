# Model Under Pressure: Google Doc revisions

Updated October 30, 2026, on `codex/model-under-pressure-feedback`, based on main
`edd09cef416146657c1a46e501ceadeaee74e5f5`. This is a local review build, not a deployment.

## Author feedback applied

Source: [revisions for model under pressure](https://docs.google.com/document/d/1_gahwEAaoS4srjethdsUtu0APh7knOS7K93n94qmgdU/edit),
plus the author's confirmed distinction: assume basic pathology and laboratory
knowledge; explain unfamiliar informatics and quantitative reasoning step by step.
The workspace's `LESSON_STYLE_GUIDE.md` consolidates the earlier writing guidance.

| Feedback | Revision |
| --- | --- |
| Pathology background is too elementary | Removed definitions of lymph nodes, metastasis, routine staining, pathologists, tumor boards and tissue blocks. Kept the actual local testing process. |
| Model, training and parameter reading is helpful | Preserved that expandable explanation and the Google readings. Kept the worked sensitivity and prevalence examples. |
| Supervised and generative overlap is unexplained | Added report/summary training pairs to distinguish training method from output. Revised the proposal prompt to ask which description fits the information given. |
| Tumor-cluster review is vague | Named diagnoses, measured gene activity and preparation methods, with biological and batch-related explanations to investigate. |
| Model/output/reference terminology is unclear | Used model consistently, named its marks and calls, and explained that pathologists' agreed diagnoses before running the model serve as the reference standard. |
| Supported/Not supported is the wrong feedback | Used Correct, Try again and missing-answer instructions for this lesson, including the retrieval questions. Added explanations for individual wrong proposal and record choices. Other lessons retain their existing default headings. |
| Table references need links | Linked learner and faculty references to stable, focusable table targets. Captioned the debrief summary as Table 4. Fixed navigation to tables loaded after a cross-page link and kept short table-link labels together. |
| Calculator qualification is cumbersome | Introduced the sliders plainly as an example model, while preserving the explanation of assumptions and the distinction from observed local results. |
| Patient-use exercise asks for unclear categories | Rebuilt all four questions around records and documents that answer a specific question. Updated choices, feedback, debrief, faculty key, practicum and objective descriptions together. |

## Data and behavior

- Preserved all stable lesson, proposal, answer and retrieval IDs and answer keys.
- Preserved vendor 192/200, local 42/50, scanner/deposit-size rows and monthly counts.
- Preserved the calculator formula and its 10,000-slide population.
- The invariant checker now recognizes the `context` field as editable prose, while
  still comparing any numbers in it. Its comparison with main passes.
- Selecting another answer clears that question's old feedback. Other questions
  keep their answers. Reset clears selections, feedback and slider changes.

## Verification

- Formatting: all 157 applicable source files checked by explicit filename.
- ESLint, curriculum validation (23 lessons / 34 objectives), and 132 unit tests pass.
- TypeScript and the Pages production build pass; 55 route pages generated.
- Sixteen targeted Playwright checks pass with a clean exit. These cover Model Under
  Pressure and the unchanged slide-archive lesson as a check of shared defaults.
  Learner/faculty routes were tested at 1365, 390 and 320 pixels, including automated
  accessibility checks, reflow, loading, retrieval answers and reset.
- The interaction tests cover wrong/correct proposal and record choices, changed
  answers, fixed observed tables, slider values and reset at 1365 and 390 pixels.
- Table-link tests cover Tables 1–4 within the lesson and navigation from the faculty
  guide into Table 2, including keyboard focus and the caption's viewport position.
  Reset after following a table link returns focus and the viewport to the case.
- Actual in-app browser review at 1365×900 and 390×900 checked wording, wrapping,
  feedback beside its question, table focus, keyboard horizontal scrolling and the
  prevalence example. At 1% prevalence and separation 2, sensitivity/specificity remain
  88.1% and PPV is 6.9%; the observed monthly results remain unchanged.

Windows/OneDrive reports some ordinary files as symbolic links. As a result, the
usual format glob skipped the scripts directory and Playwright initially discovered
only one spec file. Explicit filenames for formatting and a temporary test entry
importing both relevant spec files avoided that discovery problem. The original
`npm test` wrapper therefore did not complete as one command; its constituent checks
were run and verified separately. Temporary helpers and logs remain under ignored
`tmp/`. Initial cross-page table tests failed, prompted the navigation fix, and pass
on the revised build. Existing font-cache and bundle-size build warnings remain
nonfatal.

Two stale module requests occurred when an already-open preview tab spanned a
rebuild. A fresh load of the completed build rendered the debrief and revised
practicum successfully and recorded no new console errors.

## Inspected screenshots

- [Desktop table link](desktop-table-link.jpg)
- [Desktop record choice and feedback](desktop-record-feedback.jpg)
- [Phone section introduction](phone-record-question.jpg)
- [Phone feedback](phone-record-feedback.jpg)
- [Phone faculty link arriving at Table 2](phone-faculty-table-link.jpg)

This review is limited to the changed lesson and relevant shared controls. It does
not claim that the entire curriculum has been reviewed again or that a physical
phone was used.
