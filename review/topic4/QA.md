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
