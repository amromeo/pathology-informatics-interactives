## Combined Topic 7 and Topic 8 lessons

Integrates the five bespoke digital pathology and LIS/EHR project lessons from #4 and #3. Resolves shared registration and curriculum conflicts while preserving their lesson URLs, editable teaching content, faculty guides, coverage records, and early debrief access.

Combined browser review also fixes changing accessible names on Topic 8 readiness checkboxes and a narrow-screen faculty heading overflow.

## Validation

- 95 unit tests; curriculum checks retain 23 lessons and 34/34 objectives.
- Production and Pages builds pass; 55 static HTML entry points verified.
- All five lessons tested together in the in-app browser at desktop (1365 px) and phone (390 px) widths, including wrong/correct paths, changed answers, reset, calculations, keyboard sliders, image loading, debriefs, faculty links, and topic routes.
- No browser errors or remaining horizontal overflow in checked pages. Eleven screenshots and detailed evidence in `review/topics7-8/`.

Responsive viewport testing does not constitute physical-device Safari/Android verification. Existing bundle-size warning remains. This PR combines the histories of #3 and #4; merging into main triggers Pages deployment.
