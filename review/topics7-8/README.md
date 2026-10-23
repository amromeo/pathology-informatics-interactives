# Topics 7 and 8 integration review

Completed October 22, 2026 on `codex/topics7-8-integration`.

Combined Topic 8 commit `9f7037b` with Topic 7 commit `e15eabc`, preserving both original branches. Shared conflict resolution retains all five bespoke experiences, existing lesson URLs, Topic 7 objective records, both source ledgers and editing guides, and early debrief access. Topic 7 uses its scoped styles; Topic 8 retains its page class.

## Changes found during integration QA

- Topic 8 release-readiness checkboxes now have stable accessible names, matching the Topic 7 accessibility repair. The explanation still appears beside each selected item.
- Faculty and practicum second-level headings wrap at phone widths. The LIS faculty heading “Recommendation and transfer” previously caused a small horizontal overflow.

## Verification

- Curriculum validation: 23 lessons, 34/34 objectives, all required MDX, 23 Harrison plans, two retained pilot metadata entries.
- 95 unit tests pass after the accessible-name change.
- Production build passes. The final Pages build passes after both fixes; TypeScript is checked during the build.
- 55 generated HTML entry points (home plus 54 routes) return HTTP 200 on the combined preview and reference the correct repository asset prefix.
- All five lessons tested in the in-app browser at 1365 × 900 and 390 × 900: plausible wrong answers, correct paths, changed-answer invalidation, reset, image loading, threshold boundaries, undefined denominators, independent reader observations, report checks, vendor evidence and release gates.
- Early debrief and faculty links checked for all five lessons at both widths; both topic pages checked. No horizontal overflow remains on those pages, and no browser warnings or errors were recorded.
- Eleven screenshots and machine-readable route/browser results are saved here. Phone tests use responsive viewports, not physical iOS/Android devices.

The build continues to report the existing warning about a JavaScript chunk over 500 kB (about 912 kB minified, 254 kB gzip). It does not prevent building or loading the lessons.

## Publication

The integration branch is prepared for one combined pull request. It includes the histories of PRs #3 and #4. Main and the deployed site are unchanged; merging the integration into main will trigger the existing Pages workflow. The original checkout and its user-owned changes were not modified.
