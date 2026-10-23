# Topic 8 QA — October 22, 2026

Automated checks: 88 tests pass, 34/34 mapped objectives, production build and
Pages build pass. Existing Vite large-bundle advisory remains.

Browser: separate headless Chrome/Playwright session, 1365×900 and 390×900.
The in-app browser connection had timed out in the preceding Topic 6 work;
this evidence is Chrome QA, not in-app-browser QA.

Both widths tested:
- New titles and no horizontal page overflow.
- Early debrief and both faculty/practicum pages.
- Test build starts at 0/8; revised settings reach 8/8.
- Release remains blocked without validation/readiness items.
- Corrected report contains prior-version and communication requirements.
- Configuration edits clear validation and readiness; reset restores the draft.
- Wrong evidence classification receives adjacent explanatory feedback.
- All nine correct classifications are recognized.
- Included cost totals are 695, 695, and 720 thousand dollars.
- Keyboard Home/End changes preference sliders; all-zero weights yield no score.
- Mandatory failures still block Alder regardless of preference score.
- Birch proceeds only to contract/local acceptance review; deferral is supported.
- Lifecycle edits clear an earlier recommendation; reset restores empty decisions.
- No page JavaScript errors.

Screenshots show both openings, report preview, and vendor costs at each width.
Visual review prompted a smaller Topic 8 title, card padding, and a full case
label beneath the narrow preview selector. Re-run check-browser.cjs with
Playwright on NODE_PATH. The default separate preview port is 4178.
