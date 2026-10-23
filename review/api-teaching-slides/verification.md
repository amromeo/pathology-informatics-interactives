# API teaching-slide integration review — 2026-10-23

Base: c0e415be123ab339e2ba0c437376320c248930da, remote main and the successful GitHub Pages publish run at inspection. Local main was cb29ddc. Existing worktrees for cybersecurity, digital pathology, and Topic 5 were inspected; the integrated remote main was selected. Unrelated AGENTS.md edits and review screenshots remain outside this commit.

## Content review

Reviewed the API teaching-slide page and the actual ten PowerPoint slide-text parts from its course ZIP. The web reader could not parse PowerPoint, but the original archive downloaded successfully. Slide numbers refer to slide XML order, including the title. No decks or images are included in this change. See mapping.md for all 22 implemented selections and the reagent-lot gap.

Readings follow the debrief so that external files are optional and the case explanations remain available. Faculty prompts ask for evidence from the lesson before comparison with slides. Existing routes, loaders, interaction data, and clinical criteria are unchanged.

Topic sequence review:
- Topic 1 separates responsibility for reports from the hardware/software path.
- Topic 2 separates data quality, archive retrieval, and model transfer. The statistical lot decision has no forced API reading.
- Topic 3 separates preventive controls, recovery/reconciliation, and review of a proposed export.
- Topic 4 separates specimen records, regression testing, and conditional orders.
- Topic 5 separates flag mapping, receiving-report meaning, terminology comparability, and analytical database timing.
- Topic 6 separates guidance design from evaluation of observed effects.
- Topic 7 separates image representation, workflow validation, and reader/tool performance.
- Topic 8 separates test configuration from system selection and ongoing management.

These are conceptual reading prompts, not new clinical or regulatory claims. Faculty notes direct current requirements to primary sources and local policies. The existing source ledger and Harrison planning map link to the implemented reading map.

## Verification

Curriculum check passed: 23 lessons, 34/34 objectives.
Unit checks passed: 96 tests.
Pages production build passed, including type checking, coverage export and 54 static route entries. Large-bundle warning remains.

Desktop/mobile browser QA is NOT complete. In-app browser attempts failed first with a timeout and then with sandbox initialization error orchestrator_helper_incomplete. No screenshots or visual/navigation passes are claimed. A local Pages preview was started on port 4186 because 4174 was already occupied. Required follow-up: desktop and phone-width review of all changed learner debriefs and faculty pages, link wrapping, navigation, and interaction preservation.

Not merged or deployed.

Standard production build also passed. Browser preview requires a fresh Pages build because the standard build uses the same output directory.
