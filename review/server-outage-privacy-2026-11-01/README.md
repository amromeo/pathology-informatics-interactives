# Teaching review: server, outage and privacy cases

Date: November 1, 2026. Branch: `codex/server-outage-privacy`.
Base: freshly fetched `origin/main`, `8f46b8c7540e063e5482accb8f1a4509fd7d94e0`.
Repository: amromeo/pathology-informatics-interactives.
Scope: the three Topic 3 lessons. The other chat's workflow batch and the reference checkout were not edited. Shared workspace guidance was read; no skill or style-guide edits were made.

## Teaching changes

### The Server Behind the Analyzer

- Explain middleware, queued records, the installation review's source records and the resident's role before the task.
- Add visible terms and a worked shared-account example. Explain how interrupted storage writes support the existing integrity answer for heat/power risk.
- Teach control costs with a 6-budget/3-effort example. Preserve all six property maps, control costs, five scenario outcomes and both reference portfolios.
- Distinguish segmentation, an alternate network path and restoration. Construction causes the later outage; unfinished preparations affect resilience and recovery.
- Make the accreditation question identify the inspector's request, because access records also serve security reviews. Add separate explanations for all 20 wrong obligation choices. Rechecking a changed threat mapping is now required.
- Update faculty, debrief, retrieval questions and supervised practicum; retain the vendor-session supplement and its attribution.

### Twelve Hours Offline

- Add visible terms, RTO/RPO clock examples, incremental/differential restoration examples and the alternate-network dependency.
- Explain how registration, accessioning, benches and Jordan produced the recovery records. Work DT-201 through name, birth date, accession and MRN before asking for the remaining matches.
- Make denominators explicit: 17 people and 9 pending critical tests on the incident board; six selected specimen records for recovery; nine checks or ten with the extra chart.
- Add stable, focusable links to paper records, charts and call log. Put patient-match feedback in the same cell as its control. Stack records vertically on phones while retaining table semantics.
- Preserve phase logic, six specimens, times, three/four hazards, answer keys and call-log branching. Identify which two decisions change the record set; the other four teach coordination through feedback.
- Update debrief, faculty and practicum together; preserve the recovery supplement and attribution.

### Not Anonymous Enough

- Explain how Jordan assembled the fixed 18-row export, the distinction between a row code and its separate lookup key, and the relationship to the outage examples.
- Define the display as the patient-description portion of the proposed research export. Its fields alone cannot measure completion or critical-call outcomes. This is a clarification of case context; no rows or values changed.
- Add visible terms, a 3-to-1 filter example and a 4/4/5/5 group-size calculation. Explain why date generalization and key access leave k unchanged.
- Correct the obsolete Ewing-sarcoma transformation label to match the preserved Breast carcinoma → Malignant neoplasm data. Describe a small group in this file without asserting breast carcinoma is a rare disease.
- Remove an unverified ZIP-prefix population assertion. The preview does not perform that legal check. Explain the known April 18 cohort context, which remains relevant after date-column generalization.
- Teach the three-change proposal as this exercise's conservative proposal, not a universal research-release requirement. Preserve the limited-data-set alternative and distinguish it from deidentification.
- Put the chosen release proposal's explanation beside its controls; retain invalidation of release checks when inputs change. Preserve all transform/grouping/classification calculations and the original 18 rows.
- Update faculty, debrief, retrieval and practicum; preserve the slide-sharing supplement and both attributions.

## Shared files for integration

- `src/data/lessonExtensions.ts`: optional `feedbackByChoice` map. Existing extension data remain valid.
- `src/components/AdditionalReview.tsx`: use per-choice feedback and direct headings only when the optional map exists; other lessons retain the existing fallback.
- `src/App.tsx`: one import for the scoped downtime responsive stylesheet. No loader or route changes.
- `tests/accessibility.test.tsx`: accommodate explicit table row semantics and verify the named Diagnosis filter.
- `tests/e2e/routes.spec.ts`: recognize the three lessons' local Correct/Try again retrieval headings.

New MDX slots use the already supported `Bridge` and `Investigation` discovery and props, rendered by the affected lesson components. The original chat should inspect these shared changes alongside its own batch before integration.

## Author review points

No unresolved implementation question blocks the draft. Review the new description of the export as a selected patient-description extract, since its preserved records do not include the study outcomes. Review whether the lesson's existing 25/30/25-minute estimates allow enough discussion for the fuller explanations. No scoring or patient-data change is proposed.

Suggested guidance for the original chat: preserve the distinction between a disclosure-control change and a change to a displayed group count; distinguish a small group in a teaching file from a clinically rare disease. Do not copy these case-specific examples into a generic template.

## Verification record

See `verification.md` for completed commands, browser viewports, screenshots and limitations. Earlier test failures were corrected before the final validation. This branch is for draft review only; merging, integration checks and deployment remain with the original chat after author review.
