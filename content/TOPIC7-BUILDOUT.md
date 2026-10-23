# Topic 7 buildout

Prepared October 22, 2026 on `codex/topic7-digital-pathology`, in a separate
worktree based on cb29ddc7721370c57ab5b1b93cc712ec2eed5b26. GitHub's connected
API confirmed this was main when implementation began; shell fetch was unavailable.
The original checkout and Topic 8 lesson content were not edited.

The three existing URLs are retained:

- `pixel-budget`: two fields, measured image derivatives, explanatory feedback,
  and a sampling/compression/plane/copy storage and transfer calculator.
- `validate-before-go-live`: intended scope, representative selection,
  same-reader comparison, read interval, complete-system evidence, two separate
  discordance investigations, plan checks, scope recommendation, and later changes.
- `human-plus-algorithm`: inclusive thresholds, candidate-level errors and
  denominators, site comparison, separate reader observations, and monitoring
  of failures, unmarked areas, final readers, and changed inputs.

Each has six substantial editable MDX sections and lesson-local TypeScript
records and feedback. Primary sources and image provenance are in SOURCES.md;
PIER 7.1–7.4 and existing 2.4 coverage have explicit learner actions. The obsolete
WSI pilot is removed from routing and code. Debriefs can be opened before work.

Validation evidence and remaining browser checks are in `review/topic7/`.
Browser navigation to the local preview was denied by policy; no desktop/phone
screenshots or completed browser-interaction claims are supplied. That QA remains
required before integration. Production and Pages builds retain Vite's existing
large-bundle advisory; no deployment or workflow changes are part of this branch.

Potential Topic 8 integration conflicts: small registrations in src/App.tsx,
src/data/types.ts, src/data/curriculum.ts; appended content/README.md and SOURCES.md;
updated pilot-count assertions in scripts/validate-curriculum.ts and
tests/curriculum.test.ts. Topic 7 metadata, components, styles, assets, and tests
are new separate files. Preserve both topics' registrations when reconciling.
