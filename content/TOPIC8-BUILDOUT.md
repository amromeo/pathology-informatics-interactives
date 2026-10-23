# Topic 8 buildout and editing guide

Branch: codex/topic8-lis-ehr-projects. Existing URLs are retained. This branch
upgrades Topic 8 only; deployment is deferred until sequential integration with
Topic 7.

## Lessons and coverage

- Building and Validating a Laboratory Test (PIER 8.1, 8.2, 8.4): request and
  procedure trace, seven configuration decisions, a live report-section preview,
  eight independent expected reports, and clinical/operational release review.
- Selecting and Maintaining a Laboratory Information System (PIER 8.3, 8.4):
  nine evidence classifications, mandatory requirements independent of preference
  weights, scoped five-year costs, and four lifecycle decisions.

Both lessons include substantive introduction, concepts, bridge, debrief,
faculty, and practicum MDX. Edit structured records, controls, expected outputs,
calculations, and feedback in each lesson's interaction.ts. Expected reports are
explicit requirements, not generated from the approved configuration. Short UI
headings and action/status labels remain in the React components.

The specimen restriction, recovery thresholds, vendor records and costs are
case-specific. Analytical verification, full interface validation, local
accreditation review, real vendor selection and procurement authorization are
outside the simulated checks. Both lessons state these boundaries.

The complete curriculum still needs a separate content audit after Topic 7/8
integration; mapped objectives and bespoke components alone do not establish
teaching quality or comprehensive coverage.

## Shared files for integration

Small additive changes occur in src/App.tsx, src/data/types.ts,
src/data/curriculum.ts, scripts/validate-curriculum.ts, and src/styles.css.
Preserve both topics' registry entries, experience names, early-debrief entries,
and page styling when resolving conflicts. Append-only source/editing notes and
renamed Topic 8 headings in the Harrison map may also need simple reconciliation.
