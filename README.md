# Pathology Informatics Interactives

An independent, editable, case-based curriculum for pathology residents aligned
to all 34 objectives in PIER Essentials Release 5.

## Curriculum

- 23 independently addressable lessons across eight PIER topics.
- Four distinct pilot interaction patterns: data quality, interoperability,
  downtime, and digital pathology validation.
- Formative practice only; no learner accounts, grades, analytics, or durable
  progress records.
- Synthetic educational artifacts and original cases throughout.

## Edit lesson content

Start with [`content/README.md`](content/README.md). Each lesson’s learner copy,
debrief, faculty guide, and optional local practicum are ordinary `.mdx` files
under `content/lessons/<lesson-slug>/`.

Structured evidence, answer choices, and validation cases live in
`src/data/curriculum.ts` because they drive interactive state.

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

The single workflow in `.github/workflows/publish.yml` validates, builds, and
deploys the site on commits to `main`. Repository visibility and GitHub Pages
must be enabled before the first public deployment.
