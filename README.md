# Pathology Informatics Interactives

An independent, editable, case-based curriculum for pathology residents aligned
to all 34 objectives in PIER Essentials Release 5.

## Curriculum

- 23 independently addressable lessons across eight PIER topics.
- Dedicated interactions for all 23 lessons, including record tracing, quantitative comparisons, rule testing, image review and system selection.
- Formative practice only; no learner accounts, grades, analytics, or durable
  progress records.
- Original cases and laboratory artifacts throughout.

## Edit lesson content

Start with [`content/README.md`](content/README.md). Each lesson’s learner copy,
debrief, faculty guide, and optional local practicum are ordinary `.mdx` files
under `content/lessons/<lesson-slug>/`.

Structured records, prompts and feedback live in each lesson’s `interaction.ts`. Its `lesson.ts` contains the stable ID, metadata and evidence for objective coverage; `check.ts` contains three retrieval questions. `src/data/curriculum.ts` assembles the manifests and compatibility data for shared navigation.

## Develop and verify

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
npm test
```

The production build is written to `pages-dist/`. The build also creates a
`404.html` SPA fallback so direct GitHub Pages lesson URLs survive refreshes.

## Publish

The deployment workflow in `.github/workflows/publish.yml` validates, builds, and
deploys the site on commits to `main`. Repository visibility and GitHub Pages
must be enabled before the first public deployment.


## Review and browser checks

`npm test` checks formatting, accessibility lint rules, curriculum evidence, calculations and the production build. `npm run test:e2e` checks the static routes at 1365, 390 and 320 pixels, runs axe, exercises retrieval feedback and confirmed reset, and saves traces and screenshots on failure. Install the browser first with `npx playwright install chromium` (local Windows checks use installed Edge). CI uploads preview and browser-review artifacts. Automated axe checks do not replace a screen-reader review.

The Pages base path is the production default for both build commands. `npm run dev` overrides it for local development. Use `PORT` to choose the static preview port.

## How to cite and reuse

Cite the project title, repository URL, commit and access date. A release footer shows the build date and revision. The author has deferred selecting a reuse license; no new code or content license is granted by this review. Third-party material retains the terms recorded in `content/SOURCES.md`.

## Curriculum revision

The full-curriculum review is recorded in `review/curriculum-improvements/`. It preserves lesson titles, uses one three-part AI lesson, keeps no saved progress and places faculty answer links at the end. Clinical and regulatory additions require author review before merge; local implementation is not a deployed release.

Source links in `content/SOURCES.md` are checked weekly by `.github/workflows/source-links.yml`, with retries and a downloadable report. A server rejecting automated requests needs a browser review before declaring a source unavailable.
