# Topic 7 verification

Prepared October 22, 2026. Baseline: cb29ddc7721370c57ab5b1b93cc712ec2eed5b26.

## Automated checks

- Curriculum: 23 lessons, 34/34 objectives, all required MDX and 23 Harrison plans.
- Unit tests: 86 passing, zero failures. New checks cover sampling and storage,
  measured asset sizes, validation gaps and correct investigations, inclusive
  threshold boundaries, all/no marks, site denominators, independent reader
  observations, stable routes, coverage, and semantic markup.
- Production build and Pages build passed. TypeScript checking is included.
  Vite still reports the existing large-bundle advisory.
- Source field visually inspected. No clinical adequacy claim was made.

## Browser limitation

The in-app browser inventory was available. Attempting to create a tab at
`http://127.0.0.1:4174/pathology-informatics-interactives/lessons/pixel-budget/`
was rejected by browser security policy. The tool reported that origin approval
was declined and explicitly prohibited alternate browser routes or indirect
execution to achieve the blocked action. No bypass was attempted.

**Desktop/mobile browser QA is NOT complete.** No screenshots, overflow result,
keyboard result, browser reset result, or real-browser state-invalidation result
is claimed. Automated semantic/logic checks do not substitute for that review.
The accompanying browser script is prepared but was not executed. Run it only
in an environment where access to the preview origin has been authorized.

## Remaining browser review

Use the Pages build at 1365 × 900 and 390 × 900. At each width:

1. Open all three stable lesson URLs and all three faculty guides. Confirm
   titles, MDX lists, source links, images, and absence of horizontal overflow.
2. Open the debrief before making a selection in each lesson.
3. Image lesson: compare both regions and all variants. Select each observation,
   inspect adjacent feedback, vary all calculator controls, and verify 180 TB
   and 57.6 seconds at 0.25 µm, 10:1, one plane, two copies. Change a setting
   after a recommendation and confirm it clears. Reset to original values.
4. WSI: initial plan should address 0/7 checks. The representative fixed scope,
   paired reads, 14 days, complete workflow, V12 rescan, and V44 interpretive
   review should address 7/7. The message must still require corrective evidence
   and clinical approval. Try the exclusions and rewritten-read wrong paths.
   Change any plan input after checking and confirm results/recommendation clear.
   Exercise all three change-review cases and reset the entire lesson.
5. Algorithm: at 0.50 verify TP 3, FN 2, FP 3, TN 4. At 0.60 include M03; at
   0.65 exclude it. At 1.00 predictive value must be undefined. Compare sites A
   and B, inspect marks-only and automatic-report feedback, and confirm reader
   study counts/times remain fixed. Test incomplete and complete monitoring
   plans, unsafe expansion, changed-plan invalidation, and reset.
6. Navigate controls with Tab, Shift+Tab, arrow keys, and Space. Check visible
   focus, native labels, radio grouping, range adjustment, adjacent feedback,
   image alternatives, and announcement of calculated/status changes. Inspect
   screenshots of openings, image pairs, study feedback, and monitoring.

Keep integration on hold until a reviewer completes these browser checks.
