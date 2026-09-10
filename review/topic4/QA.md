# Topic 4, Lesson 10 — browser review

September 10, 2026. Production Pages build in the Codex in-app browser.
Desktop: 1365 × 900; phone: 390 × 844. Responsive testing, not a physical device.

- Receipt event displays the accession, part, scanner, actor, and time. The
  incorrect cytology-location answer explains that software assignment is not
  physical receipt. Correct location and procedure-entry answers give local
  explanatory feedback. Enter activates the audit-event button.
- Original matrix: 3/5. Correcting SP-EX alone: 4/5. Holding unmatched codes:
  5/5. Changing routes invalidates the previous replay result.
- Changing cytology and frozen section to gross after the repair produces two
  new failures, with explicit workflow consequences. Unit tests also cover the
  all-gross configuration and unexpected procedure keys.
- Recording receipt based only on queue assignment fails the final review even
  with all five routes passing. The locate/verify/document plan passes with the
  repaired matrix and explains that staff must still complete the actual work.
- Reset restores the initial configuration, pending results, and early debrief.
- Phone document width remains within the viewport. Source interpretation and
  recovery feedback appear beside their controls. The initial three-column
  teaching comparison required panning, so it was rewritten as a numbered
  comparison that wraps at phone width.
- Browser returned no warning/error logs during the reviewed interactions.

53 automated tests pass, all curriculum checks pass, production and Pages builds
succeed. Main JavaScript bundle still triggers Vite's size advisory.

Teaching review: case context precedes vocabulary; the lesson explains accession
and part identity, dictionary lookup, worklists, physical scans, audit evidence,
unknown-code handling, regression checks, and the distinction between future
routing and recovery of an existing case. Faculty notes assess the learner's
explanation and proposed handoff, not just the selected answers.

## Lessons 11 and 12 — completed browser review

September 10, 2026. Same desktop and phone dimensions; production Pages build.

- Automatic release: original 20/22; OR repair 22/22; AND still releases AV-01.
  AV-04 releases with a 20 ng/L minimum but holds when that minimum is removed.
  Missing history holds, with the delta shown as not calculated. The source
  record includes QC and instrument flags; absent history has no displayed age.
- Reflex: source records identify the separate display and rule revisions.
  Original 10/13, five new orders; approved 13/13, two new orders. Inclusive
  boundaries produce two additional orders. Disabling duplicate prevention
  creates orders despite existing FT4s; TH-08 explicitly explains this failure.
- Correct final recommendations pass only with matching complete replays.
  Configuration changes clear replay and approval state. Reset restores the
  original controls. The debrief is available without completing the exercise.
- Phone feedback wraps beside controls. Both documents remain within the
  390-pixel viewport. Native controls show keyboard focus. Screenshots record
  desktop traces/replays and narrow result/duplicate views.
- No browser warning/error logs during the reviewed interactions.

61 automated tests pass, curriculum checks pass, and production/Pages builds
succeed. The existing Vite bundle-size advisory remains.

Teaching review: introductions explain the laboratory request and configuration
history. Concepts teach arithmetic, Boolean conditions, release eligibility,
reflex authorization, boundaries, and duplicate handling before final review.
Debriefs refer to the actual accession decisions. Faculty guides distinguish
case-specific approved policy from general practice and include primary sources.
The selected replay sets are explicitly not population utilization estimates.
