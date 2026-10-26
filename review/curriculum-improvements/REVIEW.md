# Curriculum improvement review

Reviewed against the October 23 improvement instructions and the eight reports in `../reviewer-reports.md`. Implementation started from `d41be03` on `codex/curriculum-review-foundation`. The author's decisions are recorded in [DECISIONS.md](DECISIONS.md). This is a local review, not a deployed release.

## What changed

| Instruction group | Implementation and evidence |
| --- | --- |
| ACC-01–08 | Corrected Safe Harbor ZIP/code conditions, the emergency-department call sequence, working-day timestamps, serial-only troponin scope, the 100-decision pilot denominators, inclusive 90-day repeat-review boundary and distinct-slide reader design. The archive and AI placeholders now have dedicated experiences. Lesson calculations and regression tests preserve the unaffected answer keys. |
| ACC-09–14 | Debrief state survives changed answers; explicit opening moves focus. Confirmed reset remounts controls and tables. Revised role ownership, whole HL7 message fields, export timing, reconciliation consequences, lot acceptance criteria, report corrections and reader-specific findings. |
| ACC-15–16 | Added ordering, laboratory-system, regulation, standards and maintenance teaching. Corrected critical-call timing, local case details, slide/storage assumptions, pending-specimen explanations and clinical exception wording. New clinical/regulatory text is awaiting author review. |
| NAV-01–07 | Previous/next links, topic counts and time totals, a suggested learning path, objective summaries and evidence, linked prerequisites, desktop contents sidebar, collapsed phone contents, visible phone navigation and faculty links at the end. Titles and faculty indexing are retained. |
| TEACH-01 | Rebuilt Five Vs in the Slide Archive: five data questions, record-link repairs and workload planning. Rebuilt Model Under Pressure: model/application classification, subgroup and drift review, prevalence/separation exploration and governance decisions. |
| TEACH-02–10 | Stable choice shuffling; option-length checks; delayed answer explanations; partial credit and failed-criterion feedback; observable outcomes; three retrieval questions in every lesson; structured supervised practicums and faculty guides; smaller default report table. |
| TEACH-11–13 | Added exercises for AP/CP ordering records, information safeguards, laboratory interfaces, standards organizations and change requests, decision-support categories, calculated-result completeness, quality indicators and change-control records. Added the report-trend question, statistics interpretation and checklist distractors. |
| WRT-01–11 | Expanded common first-use acronyms, replaced many engineering terms, removed early Key point reveals and slogan labels, moved substantial copy into lesson data, replaced generic verdicts, clarified recurring people and readable record labels, and moved source discussions into faculty material. Original records remain unlabeled, following AGENTS.md. |
| A11Y-01–11 / VIS-01–10 | Shared contrasting focus rings, neutral selection styling, native radios, persistent feedback containers, arrow/Home/End tabs, confirmed reset focus, reachable scroll regions, smaller headings, readable line lengths, mobile wrapping and print rules. Browser checks include axe and three viewport widths; manual screen-reader signoff remains outstanding. |
| ENG-01–05 | Formatting-only commit, lint and PR CI, lesson-local data, browser routes and decisions, test type checking, CSV validation and coverage checks tied to published interactive evidence. A negative test confirms that removing primary 4.2 coverage fails validation. |
| ENG-06–09 | Build date/revision and changelog; lazy experiences/MDX; numerical prose checks for lessons 3, 4, 16 and 19; lesson error boundaries and descriptive missing-record errors. A browser fault test verifies the case and debrief remain available after an experience chunk fails. Licensing/citation licensing fields are deferred by author decision. |
| ENG-10–15 | Shared sections, choices, feedback, tabs, select controls, source inspector, MDX wrapper and reset owner; manifest layout classes; one experience registry prop type; removed generic/pilot components and unused direct MDX dependency; moved unused imagery and plans out of deployment; route metadata, sitemap, preview image, Pages preview fixes, scoped deploy permissions and Dependabot. |

## Author review before merge

The attachment explicitly reserves clinical and regulatory review for the author. Review the following together with the related exercise feedback:

- `content/lessons/not-anonymous-enough/concepts.mdx`: Safe Harbor dates/ZIP codes, retained codes and reidentification limits.
- `content/lessons/server-behind-the-analyzer/concepts.mdx` and `interaction.ts`: safeguards, business associate agreement, breach assessment and additional protections for some records.
- `content/lessons/where-is-the-specimen/concepts.mdx` and `interaction.ts`: order catalog, duplicate checks, AP/CP organization and appropriate ordering.
- `content/lessons/autoverification-at-the-edge/introduction.mdx` and `concepts.mdx`: serial troponin scope and missing information in calculated results.
- `content/lessons/five-rights-right-test/` and `alert-everyone-ignores/`: the approved 90-day window, clinical exceptions and pilot interpretation.
- `content/lessons/validate-before-go-live/concepts.mdx`: conditional remote review and the cytology exception. The CMS memo was revised October 14, 2026; this is newer than the attachment's original reference. See `content/SOURCES.md`.
- `content/lessons/model-under-pressure/`: subgroup denominators, expected-count model and governance decisions.

## Implementation choices and remaining acceptance work

- The data compiler discovers folder-local manifests and generates a static import registry for both Node and Vite, sorted by explicit lesson ID. A Node loader is available to authoring tools. This avoids maintaining a second manual list.
- Shared controls and central reset are used across the curriculum. The AI lesson uses the shared DataTable and the flag/newborn exercises use ReplayResultList. Specialized legacy tables remain where their interaction is different. Older isolated-component reset fallbacks remain for compatibility.
- Browser tests supplement the existing static render tests. A validator checks common acronyms at first use in case introductions; conditional interaction text still needs editorial review rather than relying on an exhaustive acronym checker. Source-ledger external links have a weekly CI check with three attempts and a report artifact; that scheduled run has not yet occurred.
- The numerical prose tests cover the requested four calculation-heavy lessons; they do not assert that every numeric literal in every MDX file is derived automatically.
- No NVDA/Chrome or VoiceOver/Safari listening session has been performed. Automated axe and keyboard checks are evidence of those checks only, not a WCAG conformance certificate.
- The author deferred licensing (D-07). A new license and license-bearing citation file have not been added.
- Separate phase pull requests, CI artifact publication, author clinical/regulatory approval, merge and deployed-site verification remain release work. Nothing has been pushed, merged or deployed by this review.
- The pre-existing AGENTS.md edits and lesson-02 screenshots are preserved separately from this work.

See [QA.md](QA.md) for the exact automated and visual checks and their limitations.
