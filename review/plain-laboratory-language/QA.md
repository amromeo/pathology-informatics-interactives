# Plain laboratory language: first author-review batch

Date: October 26, 2026. Baseline: `67c5b4461252822b6a7af9a7f2e9800acdf3f3df`.

The checked lesson and code changes were committed as `09149ea`. Screenshots show the working-tree Pages build of those files.

This batch applies the author's supplied lesson 23 model and rewrites lessons 1, 6 and 8. It follows the October 25 handoff's instruction to stop for voice review before revising the remaining lessons. It is not a release.

## What changed

The introductions name the person, laboratory problem and task. The debriefs follow the case records. Wrong answers now explain the consequence of that particular choice. Each practicum names the people to meet, the records to inspect and the work to bring back. Faculty materials have case-specific expected answers, misconceptions and discussion prompts.

The supplied model was read in full and applied first. Its two statements labeling the case as invented were removed to follow the author's house rule. The case-specific prices and recovery limits remain explained. No exercise answer, identifier, title, slug or numerical case value was intentionally changed.

The requested voice rules are in `AGENTS.md`. `scripts/voice-check.ts` ports the supplied Python check into the curriculum validator as warnings. These warnings do not fail the build for the 19 lessons awaiting review. They identify sentences to read, rather than words to replace automatically.

## Three wording examples

| Lesson | Before | After |
| --- | --- | --- |
| 1, first wrong report-review answer | “This leaves the central problem unresolved.” | “The analyst can repair the field and show that it reached the chart. The laboratory still needs to check and approve the complete report.” |
| 6, local testing feedback | “Supervised learning uses labeled examples. Convolutional networks learn local image patterns; they still require representative local testing…” | “Pathologists supplied the labels on the training slides. Now compare the detector's marks with independent diagnoses on local slides, including small lesions and each supported scanner.” |
| 8, collection-time feedback | “Back-entry time describes documentation, not collection. Substituting it changes the clinical sequence and turnaround calculation.” | “The specimen was collected earlier than the result was entered. Using the entry time would move it to the wrong point in the patient's history and change the turnaround calculation.” |

## Author's word check

The supplied Python script was run against the baseline and the revised files. The limit requested by the handoff is 3 flagged words per 1,000. These scores are a warning aid, not a measure of teaching quality.

| Lesson | Before | After | Repeated phrases after |
| --- | ---: | ---: | ---: |
| 23: Selecting and Maintaining a Laboratory Information System | 50.3 | 0.2 | 0 |
| 1: Who Does What in Laboratory Informatics? | 10.2 | 0.0 | 0 |
| 6: Model Under Pressure | 15.9 | 0.3 | 0 |
| 8: Twelve Hours Offline | 10.2 | 1.2 | 0 |

## Verification

- `npm test`: 132 unit checks passed; formatting, lint, curriculum validation, type checking and the Pages build passed.
- The supplied model also received its requested separate `npm run build:pages` check before the other lessons were rewritten.
- `scripts/check-lesson-invariants.ts` imports baseline and revised lesson data. It checks IDs, answer keys, choice tuple values, numeric literals, record numbers and protected patient/result fields. All four lessons pass. For downtime it checks all four combinations of identifier and call-log choices. Manifest changes are limited to summaries and descriptions of learner actions.
- Text-dependent assertions in `tests/curriculum.test.ts` and `tests/e2e/core-decisions.spec.ts` were updated with the wording. The underlying answer assertions remain intact.
- Both local full browser runs reported 221 successful checks. The final Windows runner again stalled after its last check, so a clean runner exit will be verified by the pull request's Linux CI.
- The additional walkthrough completed all six lesson/viewport combinations, with the existing lesson 1 radio-group defect recorded below. It checked every retrieval answer's feedback, fixed AI observation counts while moving prevalence, blocked downtime approval with missing matches, successful reconciliation, reset and faculty routes. No page overflow or browser console errors were found.
- All 16 saved screenshots were inspected. The complete rendered lesson, debrief, faculty and practicum text was read again for the three rewritten lessons. The model files were read in full before application.

## Browser environment and scope

Windows, Node 24.18, Microsoft Edge controlled by Playwright. The new worktree's Pages build was served at `http://127.0.0.1:4183/pathology-informatics-interactives/`. The in-app browser timed out on two connection attempts, so browser interaction and screenshot review used the project's Playwright tools. This is responsive browser testing, not a physical phone test.

The model walkthrough checked nine record classifications, included costs, all four decisions from installation to retirement, a blocked Alder recommendation and a supported Birch recommendation at 1365 and 390 pixels. Opening and decision screenshots were inspected.

The regular browser suite covers all 55 routes at widths of 1365, 390 and 320 pixels, plus decision and keyboard checks. The additional first-batch walkthrough checks role assignments, the AI classifications and fixed slide counts, downtime matching and approval, all retrieval choices, reset and faculty pages at 1365 and 390 pixels.

The first model browser run reported all 221 checks successful but stalled during Windows cleanup; it was interrupted after the tests finished. The final run used the already-running preview and the list reporter, and also stalled after its 221st successful check. The additional walkthrough exited successfully. It initially needed corrections to its own debrief/reset handling and its comparison of table whitespace; those were test-script errors, not changes to lesson behavior.

## Existing issues for author review

1. **Lesson 1 radio buttons:** all three support-call questions use the same radio `name` in the baseline component. Selecting answers updates the exercise's feedback and score, but only one of the three answers remains visibly selected. The extra browser walkthrough reproduced this. The wording pass leaves the group behavior unchanged; it needs a separate repair before release.
2. **Lesson 6 proposal decisions:** coverage claim `2.4-pathology-applications` describes deciding whether to proceed, revise or decline. The exercise asks for the model type and first review, without a proceed/revise/decline choice. This mismatch predates the rewrite.
3. **Lesson 6 brittleness:** the text explains brittleness, but the exercise does not ask the learner to test a small input change or make a separate brittleness decision. The coverage description should be reviewed against that teaching activity.

No changes to these teaching decisions or to the remaining 19 lessons are included. Licensing remains deferred. Author review of the voice is the next step; this branch must not be merged or deployed as part of this handoff.
