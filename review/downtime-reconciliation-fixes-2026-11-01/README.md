# Twelve Hours Offline: reconciliation corrections

November 1, 2026. Follow-up to the independent review of PR #24 at `2add5e6a5bb1d0ab23319e475d94668e32288d13`. These changes address the two P2 teaching gaps identified in that review. They remain on the draft review branch.

## Registration confirms the chart before the learner selects it

When separate unit identifiers create two Liam Brooks charts, the DT-202 MRN selector is disabled. Its adjacent link takes the learner to the registration action. Choosing to hold entry and obtain confirmation immediately displays registration's response, identifying MRN-410118 as the existing chart and MRN-490118 as the duplicate. A return link focuses the now-enabled MRN selector.

Scoring also requires that confirmation; supplying the expected MRN alone cannot earn credit. Changing the registration action clears Liam's match, removes the response and invalidates the earlier score. A wrong MRN selected after confirmation receives feedback referring to that response.

## The duplicate order is now shown

The original six specimens and their results remain unchanged. Noah's case now includes a second electronic order, ORD-R-8840, alongside ORD-R-8821. The two order records show the same paper accession, D26-0418-004, and requested specimen collection at 09:44. Their entry times and origins are displayed. The Cardiac ICU nurse confirms that the second order was entered to record the same downtime test.

The correct action enters the verified paper result on ORD-R-8821 and cancels ORD-R-8840. Instructions and feedback explain why an independently requested later specimen needs its own review. A pending status by itself no longer serves as the reason for cancellation.

The investigation, phase decision, recovery choices, feedback, debrief, faculty key and practicum were revised together. There are still nine checks on the controlled path and ten when the duplicate chart is present. The fixed privacy export and other lessons are unchanged.

## Verification

- `npm test` passed: formatting, lint, curriculum validation, 135 unit tests and the production build.
- `npm run build:pages` passed after the final feedback refinement, producing 55 route pages. Existing nonfatal Fontconfig and chunk-size warnings remain.
- Added unit coverage for an unconfirmed guessed match, confirmation followed by a missing match, a confirmed match, changed registration action, and the two-order/same-specimen evidence.
- Added desktop and phone browser regression cases in `tests/e2e/downtime-reconciliation.spec.ts`. The PR's full browser suite runs in CI; local interactive verification used the in-app browser.
- Inspected the Pages preview at `http://127.0.0.1:4195/pathology-informatics-interactives/lessons/twelve-hours-offline/`, at 1365 × 900 and 390 × 900. The build was labelled `local-review`; it contained this commit's lesson changes.
- Verified that unresolved and wrong registration actions keep DT-202 disabled; the correct action exposes the confirmation before scoring; both navigation links reach and focus their targets; keyboard activation works.
- Verified a wrong MRN after confirmation gives 9/10 and the confirmed MRN gives 10/10 when all other selections are correct. Checked the final, refined wrong-MRN explanation after rebuilding and reloading.
- Verified that changing registration action clears the match, removes the confirmation and clears the score. Requesting confirmation again leaves the MRN blank until the learner selects it.
- Verified the two order cards, wrong-recollection feedback beside its selector, and reset returning to empty selections. The updated debrief was visible after checking the exercise.
- No browser console errors were recorded. Restored the normal browser viewport afterward.

Screenshots inspected:

- [Registration response and completed reconciliation, desktop](registration-response-desktop.png)
- [Registration response, phone](registration-response-phone.png)
- [Two order records, desktop](troponin-orders-desktop.png)
- [Order comparison, phone](troponin-orders-phone.png)
- [Recollection feedback, phone](troponin-feedback-phone.png)

The shared-file integration notes from the independent review still apply when PR #24 is combined with PR #23. These corrections do not combine the two branches or deploy the site.
