# QA — full curriculum improvements

Tested October 25, 2026. Implementation revision: `530ec64af97470542241e4f2f9bddd50f45f171c`, followed by the privacy-heading wording change in `29931fbb9ccd88df966d2aae16b47534eee25105`, on `codex/curriculum-review-foundation`. Environment: Windows, Node 24.18.0, installed Microsoft Edge controlled by Playwright. Local Pages preview: `http://127.0.0.1:4181/pathology-informatics-interactives/`. This is responsive browser testing, not physical-device testing.

## Automated checks

- `npm test`: passed, including formatting, lint, curriculum validation, 132 unit checks, TypeScript (including tests), production build and 55 route metadata pages.
- First complete browser sweep: 184 passed / 13 failed. Failures identified inaccessible disabled-table scrolling, message scrolling, mobile record wrapping, minimum-width topic cards, missing short names on ordering selects, and one test's wrong skip-link name. Fixes are in the final candidate.
- Complete 221-scenario browser sweep: 220 passed / 1 failed. The remaining failure was a long section heading in the privacy lesson overflowing at 320 px. Its flex child now allows shrinking and word wrapping. Screenshot inspection also led to spacing between prerequisite links.
- Final regression run of all 110 phone routes plus desktop archive/AI routes: **112 passed**, with no axe violations, page overflow or console errors. These are the routes affected by the last CSS changes. All 56 interaction/keyboard/failure scenarios passed in the complete sweep; no interaction logic changed afterward.
- Final privacy-heading edit: formatting and Pages build passed; **5 browser checks passed** (the privacy route at all three widths and wrong/right decisions at desktop/phone widths). Its 320-pixel viewport screenshot was inspected: the revised heading stays within the page without breaking words.

The browser suite visits the hub, eight topic pages, 23 lessons and 23 faculty guides at 1365×900, 390×844 and 320×640. It checks runtime/console errors, internal links, reflow, axe WCAG A/AA rules, early debrief focus, all retrieval questions with unsupported/supported answers, canceled/confirmed reset and return focus. Additional scenarios exercise wrong/correct decisions, changed answers, quantitative and checklist boundaries, keyboard tabs/radios/sliders, preservation of an open debrief, 404 navigation, and an intentionally failed experience chunk.

## Visual review

In-app browser: inspected the archive exercise and turnaround-time report. The report contents link lands below the sticky header; the active contents entry updates. Inspected saved screenshots of the desktop hub, archive and AI openings, the 390×844 archive/AI/downtime openings, and the 320×640 hub. Corrected overflowing preformatted records, prerequisite-link spacing and the privacy section heading. Final screenshot capture starts at the top of the page, preventing a scrolled sticky header from appearing mid-page in a full-page capture.

After the fixes, reinspected the archive and AI desktop screenshots in `test-results-final/` and the privacy heading at 320×640. The prerequisite links are separated and the privacy heading reads naturally. The final focused privacy report is under `tmp/privacy-check-report/`; the 112-route report is under `playwright-report/`.

## Build notes

The entry bundle is approximately 116.03 kB gzip, below the requested approximate 120 kB target. Vite warns because its raw minified size exceeds the intentionally low 300 kB warning threshold. On this Windows machine, the preview-image renderer reports that the normal Fontconfig cache directories are unwritable; image generation and the build still finish successfully. The generated 1200×630 preview image was visually inspected and is legible.

## Limits

No manual NVDA or VoiceOver listening check, physical-phone test, author clinical/regulatory signoff or deployed-site verification. Screenshots/traces from the browser suite are local under `test-results/`, `test-results-final/` and `playwright-report/`; the CI configuration uploads its standard output directories when a PR is run. They are not committed as a large image archive. Licensing remains deferred. Phase-specific pull requests and CI-hosted evidence have not yet been prepared.
