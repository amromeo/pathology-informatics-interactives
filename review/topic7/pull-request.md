# Build out Topic 7 digital pathology lessons

The three existing Topic 7 routes now have distinct, substantive experiences
instead of generic choices and the small WSI pilot. URLs and PIER coverage are
preserved, including the existing Topic 2.4 connection. Topic 8 lesson content
and unrelated changes in the original checkout are untouched.

## Educational changes

- Image settings: inspect two fields after downsampling and strong JPEG encoding;
  compare measured byte sizes; calculate sampling, compression, focal-plane,
  copy, annual-storage, and transfer tradeoffs. Explain source, display, and
  demonstration limits without claiming diagnostic equivalence.
- WSI validation: define intended use, representative selection, paired
  intraobserver comparison, read interval, complete-system checks, two
  discordance investigations, acceptance boundaries, and later change review.
  Keep original disagreements in their denominators. Distinguish a complete
  plan from completed evidence, and local signoff from device authorization.
- Mitosis assistance: inspect candidate errors at inclusive thresholds, site
  denominators, false marks and misses, undefined zero-mark predictive value,
  independent reader performance, and monitoring of failures and input changes.
  Candidate controls do not invent changes in observed reader performance.

Each lesson has editable introduction, concepts, bridge, debrief, faculty, and
practicum MDX, plus lesson-local records and feedback. Debriefs are available
without completing the work. Faculty and the ledger cite current DICOM PS3.3
2026d, CAP's active validation guideline, FDA primary material, IMDRF 2025 GMLP,
PIER R5, and the existing Harrison/API source plan.

## Validation

- `npm test`: 23 lessons, 34/34 objectives, 86 unit tests, TypeScript and production
  build passed. Includes meaningful wrong paths, boundary denominators, and
  semantic markup checks.
- `npm run build:pages`: passed, including 54 static route entry points.
- `node --check review/topic7/check-browser.cjs`: passed syntax checking.
- `git diff --check`: passed.
- Initial source and compressed derivative visually inspected. Follow-up browser screenshots
  and completed QA are now recorded in review/topic7, alongside the test/build logs.
- Vite retains its existing large-bundle advisory.

## Browser QA completed

The in-app browser granted access to this worktree preview in the follow-up task. Desktop (1365 x 900) and phone (390 x 900) interaction, overflow, keyboard slider, state invalidation, reset, images, and faculty routes passed. Six screenshots are saved in review/topic7. Stable accessible labels were added after QA exposed feedback changing choice names. All 86 unit tests and the Pages build pass after that fix. No browser errors or warnings were captured.

The standalone Playwright script remains available; equivalent checks were executed through the supported in-app browser API. Earlier access/publication blockers are resolved. Integration and final content review remain separate.

## Scope limits

The small generated image field demonstrates pixel operations, not diagnostic
adequacy. The finite candidate list and reader observations do not establish a
clinical threshold or patient benefit. No universal retention, compression,
display, or release policy is prescribed.

## Integration with Topic 8

Reconcile small registrations in src/App.tsx, src/data/types.ts, and
src/data/curriculum.ts. Preserve both topics' imports and registry entries.
Other shared edits: appended content/README.md and SOURCES.md; Topic 7 title
updates in HARRISON-SLIDE-MAP.md; removal of the obsolete WSI code in PilotLabs;
updated pilot-count assertions in scripts/validate-curriculum.ts and
tests/curriculum.test.ts; replacement of the old WSI accessibility check.
Topic 7's new metadata, components, styles, assets, and tests are separate files.

Do not merge or deploy this branch as part of this task. Integrate sequentially
after clinical/content review and combined integration checks.
