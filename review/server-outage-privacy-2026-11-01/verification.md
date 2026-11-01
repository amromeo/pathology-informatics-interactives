# Verification — November 1, 2026

## Completed checks

| Check | Result | Saved log |
| --- | --- | --- |
| `npm test` | Passed formatting, ESLint, curriculum validation, all 133 unit tests and the production build | `validation.txt` |
| `npm run build:pages` after the phone-layout correction | Passed TypeScript and Vite; exported coverage and 55 route pages | `build-pages.txt` |
| Final `npm run format:check` | Passed | `format-final.txt` |
| Final `npm run lint` | Passed | `lint-final.txt` |
| Final `npm run test:unit` after moving patient-match wording into lesson data | 133 passed, 0 failed | `unit-final.txt` |
| Focused browser run against the completed Pages build | 28 passed, 0 failed | `browser-final.txt` |
| `git diff --cached --check` | Passed | Checked before commit |

Curriculum validation covered 23 lessons and 34 objectives. Voice-review messages are advisory; the flagged sentences in this batch were read in context. Existing exact-value tests continue to protect the case records and calculation behavior.

The browser run used installed Microsoft Edge, two workers, a 90-second test timeout and a separate local preview on port 4193 to avoid another chat's preview. The temporary configuration changed only those runner settings. The tests are committed and also run with the repository's standard configuration after a Pages build:

```powershell
npx playwright test topic3-teaching.spec.ts routes.spec.ts review.spec.ts --workers 2 --grep 'server explanations|downtime wrong|privacy fixed|px (lessons|faculty)/(server-behind-the-analyzer|twelve-hours-offline|not-anonymous-enough)/|(server-behind-the-analyzer|where-is-the-specimen) additional decisions'
```

## Browser coverage

- Six detailed interaction tests: all three lessons at 1365 × 900 and 390 × 900. They check visible terms, early debrief access, wrong answers, changed answers, invalidated checks and confirmed reset.
- Server: all six property maps; an ineffective plan and a five-scenario reference plan with its remaining partial result; all 20 wrong regulatory-review alternatives and the five correct answers.
- Downtime: both choices for every phase decision; a wrong MRN and wrong recovery actions; correct nine-check reconciliation; all resumption choices; changed identifier and call-log decisions; stable table/chart/log anchors. Phone records must fit the containing region without horizontal clipping.
- Privacy: three-row and one-row filtering; changed filters clearing confirmation; all classification choices; all transforms, 18-row preview and minimum group size 4; key/access controls; failed and successful release checks; changed transforms clearing checks while date removal leaves k unchanged.
- Eighteen route checks: learner and direct faculty pages for all three lessons at widths 1365, 390 and 320. These include axe checks for WCAG A/AA tags, page overflow, internal links, browser errors, retrieval answers, reset confirmation/cancellation and focus after debrief/reset.
- Four shared-component regression checks: the server's new per-choice review feedback and the existing `where-is-the-specimen` fallback at desktop and phone widths. No source in that other lesson was changed.

In-app browser inspection also covered the server's phone property feedback, desktop debrief and reset; downtime phone wrong/changed identifier choices and its direct desktop faculty page; and privacy phone filtering/confirmation and desktop classification feedback. The temporary viewport override was reset afterward.

## Visual evidence

The screenshots in this folder include each lesson's visible terms at desktop and phone widths; wrong server mapping and tested plan; wrong downtime patient match and resumption; privacy isolation and wrong release proposal; and all three direct faculty pages at desktop and phone widths. The interaction screenshots were captured by the final passing run. Faculty screenshots were copied from that same run's route artifacts.

The reviewed phone patient-match screenshot now shows the entire explanation beside the MRN selector. The privacy release explanation is directly below its choices. Wide privacy data tables retain their labelled horizontal scrolling region; the page itself reflows at 320 pixels. Desktop downtime records retain a labelled scrolling table, while phones use labelled stacked records with table semantics.

Representative files:

- [Server control-plan result](server-1365-plan.png)
- [Server phone wrong-answer feedback](server-390-wrong.png)
- [Downtime phone patient-match feedback](downtime-390-wrong-match.png)
- [Privacy phone release feedback](privacy-390-wrong-release.png)
- [Privacy desktop terms](not-anonymous-enough-1365-terms.png)
- [Downtime desktop faculty guide](faculty-twelve-hours-offline-1365.png)

## Corrections and limits

Initial checks found Windows line-ending formatting noise, an encoding error, a test selector that needed the new accessible filter name, and a phone table whose minimum width clipped feedback. These were corrected. Line-ending normalization produced no unrelated staged content changes. Two early browser runners shared an output directory, and a rebuild interrupted the preview server; the final run used one runner and a completed, stable build.

The build emits the existing large-chunk advisory and Fontconfig cache-directory warnings. It exits successfully and creates all route pages and the preview image. No dependency versions were changed.

These are local implementation and browser checks, not a live teaching session with residents or approval of a real disclosure. Legal/security sources and the two author-review points are recorded in `sources.md` and `README.md`. The branch is committed for draft review; merging, final integration and deployment remain with the original chat.
