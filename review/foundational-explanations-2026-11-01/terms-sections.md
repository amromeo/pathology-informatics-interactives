# Visible terms sections

Date: November 1, 2026. Branch: `codex/foundational-lesson-explanations`.
Changes reviewed against `723fde6`. Local build label: `terms-review`.
Status: added to the existing review draft; not deployed.

Added a visible **Terms used in this case** section to the introductions for:

- **The Missing CBC:** systems and messages; computers and connections.
- **Can We Accept This Lot?:** paired results and descriptive statistics; uncertainty and acceptance criteria.
- **Model Under Pressure:** program types and training; model calls and their denominators; performance in new settings and over time.

Each section follows the opening case and precedes the learner task. Definitions
use laboratory examples and remain visible without opening a disclosure. Detailed
explanations and worked calculations remain in their original teaching locations.
The existing section in Can We Trust This Report? supplied the format. Case records,
calculations, controls, scoring and answer keys are unchanged.

Definitions were compared with the lessons' existing teaching. The NIST confidence
interval and p-value references and Google's introductory machine-learning and
classification references already cited by the lessons were checked again.

## Verification

- Curriculum validation passed for 23 lessons and 34 objectives.
- All four existing numerical-prose checks passed.
- TypeScript and the Pages build passed, generating 55 route pages. Existing
  nonfatal bundle-size and font-cache warnings remain.
- All nine affected learner-route browser checks passed at 1365, 390 and 320 px,
  including accessibility, reflow, debrief, retrieval feedback and reset.
- Actual in-app browser review at 1365×900 and 390×900 confirmed each terms section's
  placement, visible definitions and readable wrapping. The full teaching sections
  remain present. Automated route checks reported no browser errors; the final
  manual browser console check was also empty.

Verification was scoped to the prose additions. Phone-width review used browser
viewports rather than a physical device. Temporary logs and browser artifacts are
in ignored `tmp/` paths prefixed `terms-`.

Screenshots inspected:

| Lesson | Desktop | Phone |
| --- | --- | --- |
| The Missing CBC | [Terms section](terms-cbc-desktop.png) | [Terms section](terms-cbc-phone.png) |
| Can We Accept This Lot? | [Terms section](terms-lot-desktop.png) | [Terms section](terms-lot-phone.png) |
| Model Under Pressure | [Terms section](terms-model-desktop.png) | [Terms section](terms-model-phone.png) |

Model Under Pressure's previously approved revision remains live. Its new terms
section is included in this review draft with the foundational lesson revisions.
