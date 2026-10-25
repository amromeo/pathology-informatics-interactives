# Improvement Instructions: Pathology Informatics Interactives

Oct 23, 2026 · @Am

## How to use these instructions

You are a coding agent improving the Pathology Informatics Interactives site ([live site](https://amromeo.github.io/pathology-informatics-interactives/), repository `amromeo/pathology-informatics-interactives`). Work through the phases below in order, except ENG-01 and ENG-02 in Phase 7, which come first. The review was done on 2026-10-23 against commit `c0e415b`.

**Before you change anything**

1. Read `AGENTS.md` in full. It is the author's house style. Where an item below conflicts with it, `AGENTS.md` wins; note the conflict in your pull request.
2. Read `README.md`, `content/README.md`, `content/COVERAGE.md` and `content/HARRISON-SLIDE-MAP.md`.
3. Run `npm install` and `npm test` (Node 22 or newer) and confirm the baseline passes.

**Ground rules**

- Learner prose stays in the lesson MDX files. Structured prompts, choices and feedback stay in each lesson's `interaction.ts`. Do not move teaching copy into React components.
- Keep every stable `id`, `answer`, `correct` and `owner` value and every lesson slug, unless an item tells you to change an answer key. When it does, update the tests that item names.
- Keep all cases and artifacts synthetic and original. Paraphrase PIER objectives; never paste PIER text.
- Each item has an ID (for example `ACC-03`). Cite it in the commit message. Use one pull request per phase, or one per lesson for a rebuild.
- Items marked **Author decision** are not to be implemented. List them in the pull request and ask.
- Line numbers may drift. Find the quoted text with search rather than editing by line number. The eight full reviewer reports (the file reviewer-reports.md, supplied alongside this document) give more line-level detail and code snippets; where they differ from this document, follow this document.
- If you disagree with an item on clinical or laboratory grounds, do not skip it silently. Explain why in the pull request.

**After each phase**

1. Run `npm test` and `npm run build:pages`, then `npm run preview:pages`.
2. Open every changed lesson at 1365 px and 390 px wide. Complete each changed interaction once with a wrong answer and once with the right one.
3. Save desktop and phone screenshots to `review/<phase-name>/`, as the earlier topic reviews did.

**Severity key:** P0 = wrong or broken, fix first · P1 = misleading or a significant gap · P2 = moderate · P3 = polish.

## Review summary

Twenty-one of the 23 lessons are strong case-based teaching. The main problems are one regulatory error, two unfinished lessons counted as full coverage, no path from one lesson to the next, objectives shown only as codes, three serious accessibility gaps, and code that is hard to edit safely.

Eight reviewers each read the source independently (commit `c0e415b`), and the live site was walked through in Chrome at desktop width. The build could not be run in the review environment, so findings rest on the source, the repository's saved QA screenshots and the live site.

| Review | What it covered | Findings | Most severe |
| --- | --- | --- | --- |
| Accuracy, lessons 1–12 | Clinical, regulatory and statistical content; case realism; numbers recomputed from the CSVs | 24 | P0: HIPAA Safe Harbor ZIP rule |
| Accuracy, lessons 13–23 | The same, with codes and guideline figures checked against sources | 20 | P1: HbA1c window, pilot volumes, missing HL7 message |
| PIER R5 alignment | All 34 objectives against the R5 list | 16 | P1: 2.3 and 4.2 mapped but not taught |
| Teaching design | Case sequence, interactions, feedback, debriefs, faculty guides | 25 | P0: lessons 5 and 6 |
| Writing and terminology | Voice against AGENTS.md, acronyms, consistency | 17 patterns plus lesson edits | P1: lessons 5 and 6; reader-study counts |
| Usability and visual design | Navigation, layout, phone use, print | 21 | P1: no next-lesson link; selected answers look correct |
| Accessibility | WCAG 2.2 AA | 22 | P1: focus ring, unannounced feedback, lost focus |
| Engineering | Architecture, tests, build, metadata | 20 | P1: no CI on pull requests; very long lines |

**Keep these strengths.**

- Case-first lessons with realistic artifacts: paper requisitions with a received stamp, LIS audit trails, real OBX segments, paper downtime records reconciled against restored charts.
- The numbers hold up. Every recomputed figure matched its lesson text and tests, and the LOINC codes, CAP whole-slide imaging figures and CLIA citation checked out against sources.
- Replay sets include cases that should still pass, so "hold everything" fails. Changing a setting clears earlier test results.
- Feedback in most lessons explains what happens in the laboratory, and 21 lessons let the learner open the debrief early.
- Strong logic tests and a curriculum validator gate every deploy; PIER is paraphrased, never copied.

**Top priorities.**

1. Correct the Safe Harbor error and the clinically unrealistic details (ACC-01, ACC-03, ACC-05 to ACC-07).
2. Add CI on pull requests and a formatter before other edits (ENG-01, ENG-02).
3. Give learners a path: next-lesson links, the answer key out of the way, objective text (NAV-01 to NAV-03).
4. Make lessons 5 and 6 honest now (ACC-02), then rebuild them (TEACH-01).
5. Fix the focus ring, feedback announcements and lost focus (A11Y-01 to A11Y-03).
6. Make answers harder to guess and stop revealing them early (TEACH-02, TEACH-03).
7. Make the validator check teaching, not just mapping (ENG-05).

## Phase 1 — Correctness and broken behavior

Do this phase first. Reviewers recomputed every headline number in all 23 lessons, and almost all match; no answer key is outright wrong. What follows is one regulatory error, several clinically unrealistic case details, data that contradict the lessons' own definitions, and interaction bugs.

**ACC-01 · P0 · Correct the HIPAA Safe Harbor ZIP code rule (lesson 9).**

- `src/data/curriculum.ts` (about line 225, choice `narrow`) says Safe Harbor removes "most five-digit ZIP codes". It requires removing all of them. The first three digits may stay only when that three-digit area has more than 20,000 people.
- Replace the sentence with: "Safe Harbor requires more than removing names and record numbers. All elements of dates except the year, and all five-digit ZIP codes, must be removed; the first three ZIP digits may be kept only when that three-digit area contains more than 20,000 people. Any retained study code must not be derived from patient information, and the key cannot be disclosed."
- In `PrivacyExperience.tsx` (about line 41), change the transform note to: "02108 becomes 021\*\*. Safe Harbor permits this only because the 021 area has more than 20,000 residents."
- Add one sentence on the 20,000-person rule and the condition for keeping a code to `not-anonymous-enough/concepts.mdx`. Keep ids `narrow` and `correct`.
- Verify: a search for "most five-digit" returns nothing.

**ACC-02 · P1 · Make lessons 5 and 6 honest until they are rebuilt (TEACH-01).**

- Append `"generic"` to the end of the `allowsEarlyDebrief` array in `App.tsx` (about line 111) so both debriefs open early, as AGENTS.md requires. Append rather than insert: `tests/topic7.test.tsx` (about line 60) matches the array's first three entries.
- Add `status?: "draft" | "published"` to `LessonManifest`, set both lessons to "draft", and show "In development: does not yet fully teach this objective" on the lesson page and topic page.
- Make the hub coverage sentence count only published lessons. It currently says "Every objective has at least one primary lesson and an observable learner decision", which is false for 2.3 and 4.2.
- Lesson 5: the "Peak ingest 8.4 GB/s" figure is 15–30 times too high (1.9 PB a year averages about 60 MB/s). Use: annual volume 1.9 PB (about 1.2 million slides at about 1.6 GB); peak ingest 0.5 GB/s from 18 scanners during the overnight batch; unlinked slides 1.8% (2,160 of 120,000 scanned last quarter had no matching case, part or block in the LIS); retrieval under 2 seconds to the first displayed field of view. Replace "The five Vs are independent design constraints" with "The five Vs are separate questions that interact; each needs its own design check."
- Lesson 6: remove the promise to distinguish supervised learning, convolutional models and generative AI until the lesson teaches them. "Subgroup brittleness" misuses brittleness. Relabel the correct diagnosis "Generalizability failure from scanner and stain differences, with poor sensitivity in a clinically important subgroup (micrometastases)" and match `debrief.mdx`. Give counts: local verification detected 42/50 metastasis-positive slides (84%), 17/25 micrometastases (68%) and 25/25 macrometastases; vendor 96% = 192/200 on its supported scanner. Reword the distractor to "Use the tool only for macrometastasis cases without a governance review."
- Verify: both lessons offer "Open debrief" before any answer, and every percentage shows n/N.

**ACC-03 · P1 · Lesson 2: give the waiting ED the hemoglobin before troubleshooting.**

- The ED is waiting on a hemoglobin in a suspected GI bleed. At the first step the lab finds a final Hgb of 7.4 g/dL, but the learner is never prompted to phone it. The safe first action is to read the result to the clinician, have it read back and document the call.
- Change the correct `firstChecks` feedback (`ResultJourneyExperience.tsx`, about line 20; move it into `interaction.ts` per AGENTS.md) to: "Yes. The ED can only see Pending. The LIS shows a final CBC verified at 09:42. Read the hemoglobin to the ED clinician now, have it read back, and document the call under the downtime procedure. Then find out why the report did not reach the EHR."
- Move the downtime note's reporting sentence before the evidence section, or refer back to the call already made. Keep ids.

**ACC-04 · P1 · Lesson 3: fix weekend sign-out times in `report.csv` without changing any TAT value.**

- 15 rows are finalized on a Saturday between 00:13 and 03:02, contradicting the lesson's working-day TAT definition (IDs prefixed SP26-: B088, B123, C035, P020–P021, P055–P056, P090–P091, P125–P126, P160–P161, P195–P196). The cause is `addWorkingDays` in `scripts/generate-lesson3-report.mjs` (about lines 58–69), which adds the fractional day as clock minutes.
- **Constraint:** B088 and B123 are the only baseline 2.7 values, and they set the pre-go-live median of 2.7. Changing their TAT to 1.7 would make both medians 2.5, erase the "modest improvement" conclusion and break `tests/data-quality.test.ts`. Fix the timestamps, not the TAT values.
- After the `setMinutes` call, add `while (result.getDay() === 0 || result.getDay() === 6) result.setDate(result.getDate() + 1);`, then run `npm run data:lesson3`. Add a test that, for every row, `workingDaysBetween(accessionedAt, finalizedAt)` equals `tatWorkingDays` to one decimal and the finalization day is a weekday.
- Verify: the new test passes and the existing summary assertions are unchanged.

**ACC-05 · P1 · Lesson 11: stop the delta rule from holding most first ED troponins.**

- The approved policy holds any troponin without a same-assay prior in 24 hours, and the lesson scores "Let other gates decide" as a defect. In a chest-pain pathway the first (0-hour) troponin usually has no prior, so this holds most of the most time-critical results. Real delta checks mark the delta "not applicable" when no prior exists.
- Do option (a) now; it needs no test changes. In `autoverification-at-the-edge/concepts.mdx` and `introduction.mdx`, scope the rule: "This delta rule applies to the laboratory's serial troponin order (the 1-hour and 3-hour draws in the ED chest-pain pathway). A serial order without a same-assay prior result within 24 hours suggests an ordering or identification problem, so it is held. Initial (0-hour) troponins are released through a separate rule with no delta check." Add to `faculty.mdx` that most laboratories treat absent history as "delta not applicable" for initial specimens.
- Option (b), changing the rule model, is decision D-04.

**ACC-06 · P1 · Lesson 18: make the pilot denominators realistic.**

- The pilot assumes 1,000 HbA1c order decisions per ward per week. The lesson's own hospital-wide count is 3,000 per month (about 690 per week).
- In `alert-everyone-ignores/interaction.ts` (about lines 42–45), use `denominator: 100` with pilot 8, 8, 4, 4 and comparison 6, 6, 5, 5. The rates stay 80→40 and 60→50 per 1,000, and the adjusted change stays −30.
- In `bridge.mdx` (about line 3), say each of two general-medicine services had about 100 eligible decisions per week, and add: "With only four to eight avoidable repeats per week in each group, chance alone can produce differences of this size." Update `faculty.mdx` (about line 19) to 16/200 and 12/200 before, 8/200 and 10/200 after.
- In `AlertEvaluationExperience.tsx` (about line 20), show cells as count/denominator with the rate in brackets.
- In `tests/topic6.test.tsx`, change the denominator total from 4000 to 400; `pilotComparison(true)` should still return `{before:80, after:40, change:-40, comparisonChange:-10, adjusted:-30}`.

**ACC-07 · P1 · Lessons 17 and 18: use a realistic HbA1c repeat window.**

- The approved review window is 168 hours (7 days). HbA1c reflects 2–3 months of glucose and is usually repeated quarterly or twice a year, so the case treats an 8-day repeat as needing no review.
- Change the window to 90 days, inclusive, and display it in days. In `five-rights-right-test/interaction.ts`: CD-01, 02, 05, 06 `hours: 720`; CD-04 `2161` ("90 days and 1 hour ago"); CD-08 `2160` ("exactly 90 days ago"); condition `row.hours <= 2160`. In `alert-everyone-ignores/interaction.ts`: E01–E03, E06, E08, E09 `720`; E05 `2161`; E10 `721`.
- In `CdsDesignExperience.tsx` (about line 20), show days instead of hours. Replace "168 hours" in both lessons' introduction, bridge and faculty files, `content/README.md` and `content/TOPIC6-BUILDOUT.md`.
- The author confirms the window before merge (D-05). Tests reference ids only and should pass unchanged.

**ACC-08 · P1 · Lesson 21: fix the contradictory reader-study description.**

- `human-plus-algorithm/bridge.mdx` (about line 3) says four pathologists "each reviewed the same five slides", then says there are 20 slides and 40 reference figures. Both cannot be true.
- Keep the data and tests (20 slides, 40 figures). Replace the sentences with: "In a crossover evaluation, four trained pathologists each reviewed a different set of five slides (20 slides in total, containing 40 consensus reference mitotic figures). Each reader reviewed their own five slides under all three conditions, in separate sessions three weeks apart, with the slide order changed each time. The table pools the 20 slide reviews in each condition." Change `faculty.mdx` (about line 9) to match.
- The author confirms which design was intended (D-06).

**ACC-09 · P1 · Fix debrief and lesson-state bugs.**

- Lesson 15: `TerminologyExperience.tsx` (about line 15) calls `onAttempt(false)` on every change, so an opened debrief closes when the learner edits an answer.
- Lesson 16: `QueueExperience.tsx` (about line 9) calls `onAttempt(true)` on the first dropdown change, showing the full debrief before any analysis. The lesson 21 slider does the same (`MitosisReviewExperience.tsx`, about line 11).
- In `LessonPage`, replace the shared `attempted` flag with `debriefOpen`. Only "Open debrief" and the lesson's final check set it true; only Reset sets it false. Remove the calls listed above.
- Reset wipes everything with one tap on a low-contrast link. Add a two-step confirmation and a 44 px tap target.
- In `LessonPage`, `useState` runs after the early `return <NotFound/>` (`App.tsx`, about lines 105–106), which breaks React's rules of hooks. Move it above the return.
- Verify: in lesson 15, open the debrief and change an answer; the debrief stays open. In lesson 16, change the extract dropdown; no debrief appears.

**ACC-10 · P1 · Lesson 1: make the instruction, the control and the feedback agree.**

- `OrientationExperience.tsx` (about line 63) asks the learner to "decide who needs to be involved and who should coordinate the response", but each call allows one choice. Change it to "For each call, choose who should lead the response." Optionally add an "Also involve" checkbox group with feedback.
- The feedback "The laboratory should lead" does not match an option on screen; two options could be "the laboratory". Start every explanation with the exact option label, for example "Pathologist or laboratory director should lead…".
- Revise the repeat-alert ticket explanation (keep `answer: "clinical-informatics"`, locked by `tests/curriculum.test.ts`) in `interaction.ts`, `debrief.mdx` and `faculty.mdx`: "Clinical informatics should coordinate because the alert logic and its firing behavior are EHR decision support configuration. Pathology informatics and the LIS team must first confirm how the correction was sent: a corrected result should replace the original (in HL7 v2, result status C on the same observation), not arrive as a new result. If it arrived as a new result, the fix is on the laboratory side."

**ACC-11 · P1 · Lesson 13: show a whole HL7 v2 message, not one segment.**

- No lesson shows MSH, PID or OBR segments, message types or HL7 versions, though lesson 13 is mapped to PIER 5.2.
- Export the outbound message from `follow-the-flag/interaction.ts` and render it in `FlagExperience.tsx` in place of the hard-coded OBX block. This example was checked field by field (in a TypeScript string, escape the encoding characters as `^~\\&`):

```
MSH|^~\&|LIS|CORE_LAB|EHR|HOSP|20261022080400||ORU^R01^ORU_R01|F001|P|2.5.1
PID|1||MRN0041872^^^HOSP^MR||RIVERA^ANA||19580314|F
OBR|1|ORD55120^EHR|FL-01^LIS|K^Potassium^L|||20261022071500|||||||||||||||20261022080300|||F
OBX|1|NM|K^Potassium^L||6.8|mmol/L|3.5-5.0|CH|||F
```

- Add field explanations for MSH-9 (message type and trigger event; ORU^R01 is an unsolicited result), MSH-10 (control ID, echoed in the acknowledgment's MSA-2), MSH-12 (version), PID-3 (patient identifier with assigning authority), and OBR-3 and OBR-25 (filler order number; result status). Name OBX-8 "Abnormal Flags" (renamed "Interpretation Codes" from v2.7) and note that CH, CL and XH are this sender's local codes.
- Add a short subsection to `concepts.mdx`, "Which HL7 standard is this?": v2.x carries most laboratory orders and results (OML^O21 or older ORM^O01 for orders, ORU^R01 for results, ADT for registration, ACK for acknowledgments; US laboratory and public-health guides use v2.5.1). It is widely implemented, but many fields and codes are optional or local, so each interface needs its own specification and testing. HL7 v3/CDA defines clinical documents. FHIR exposes resources such as Observation and DiagnosticReport through web interfaces and still needs profiles, terminology bindings and testing.
- Verify: the `aria-label="Observation fields"` assertion in `tests/topic5.test.tsx` still passes.

**ACC-12 · P2 · Lesson 3: state the export details and fix three inconsistencies.**

- In `introduction.mdx`, add: "The analyst ran the export on April 20, after every case accessioned through April 3 had an initial final report." Extend the TAT definition: "Weekends are excluded; a partial day is counted as a fraction of 24 hours from the accession clock time." In `investigation.mdx`, add that accessioning "remained offline through Friday afternoon".
- Pre-go-live weekly medians jump from 2.5 to 3.5 in the last two weeks because the baseline values have a gap between 2.7 and 3.5. Grade the baseline values (some 2.6–3.2) while keeping n = 210, mean 3.3 and median 2.7, or explain the drift in one sentence. Do this together with ACC-04.
- The "accuracy" feedback (`interaction.ts`, about line 164) uses a blank field, which is a completeness example. Replace with: "This checks accuracy: a recorded LIS accession time should agree with the requisition. For the 428 cases with a structured time, the two can be compared. For the 27 blank fields, accuracy cannot be judged until a value exists — that gap is a completeness problem (next check)." Keep `answer: "accuracy"`.
- The requisition stamp says "RECEIVED" but the feedback treats it as the accession time. Either change the stamp to "ACCESSIONED (paper) · 08:56", or explain that during cutover paper accessioning was done at receipt and the coordinator confirmed this.

**ACC-13 · P2 · Lessons 7–9: fix internal contradictions.**

- Lesson 9 faculty guide says only all three transforms raise *k* to 4. Every record shares one admission date, so ZIP plus diagnosis alone reaches *k* = 4. Replace with: "Generalizing ZIP and diagnosis together raises the smallest group to four. Because every record shares the outage admission date, generalizing the date does not change *k* in this table — but Safe Harbor still requires removing date elements other than year, and the cohort definition itself reveals the date to anyone who knows the study."
- Lesson 7 marks Integrity wrong for the heat and power finding, but its own shutdown control claims integrity protection. Change `heat-vent` to `["integrity", "availability"]`, add "an abrupt power loss or overheating can corrupt queued messages or the middleware database" to the feedback, and update `tests/topic3-security.test.ts` (about line 21).
- Lesson 8 cites a "redundant network path" that lesson 7 never mentions. Rewrite `twelve-hours-offline/introduction.mdx` (about line 3): "…identified several open controls; network segmentation and the backup-restoration drill were not completed before go-live, and the middleware server had a single network connection." Change line 7 to "…and the laboratory had never restored the middleware from backup or rehearsed its downtime recovery procedure."

**ACC-14 · P2 · Single-lesson accuracy fixes.**

- Lesson 4: state the decision concentration before the data (for example, "this laboratory's 99th-percentile limit is 20 ng/L"), and state all three acceptance criteria as set before testing: average shift between −2 and +2 ng/L near 20 ng/L; the same "<2 ng/L" category for the six very low specimens; within ±10% for the six elevated specimens. Add: "Patient specimens are used because QC material can respond differently from patient samples to a lot change."
- Lesson 15: "HER2 … result 2+" does indicate immunohistochemistry, so the item's ambiguity is false. Change the source to "result: Positive" and the reason to: "‘Positive’ can be reported for an immunohistochemistry score of 3+ or for an amplified in situ hybridization result, and the specimen is not stated. Obtain the assay definition, specimen, method and scale before choosing a term." Keep `expected: "review"`.
- Lessons 14 and 22 describe retransmission differently. In `build-the-new-test/concepts.mdx` (about line 21), explain both: an interface engine resending the identical message keeps the original control ID; a resend from the LIS gets a new control ID with the same accession, component and result version, so matching on those handles both.
- Lesson 14: the preliminary "immediate referral" result (NB-08) reads as if it can wait. Add: "Because its answer requires immediate referral, the program's urgent communication procedure still applies, and the preliminary-review queue must be monitored with the same urgency."
- Lesson 20: concordance is pooled, but the CAP 2021 guideline defines it per pathologist. Attribute V12 to Rao and V44 to Chen, add "Rao 29/30; Chen 29/30", and explain that a pooled figure can hide one reader below 95%.
- Lesson 22: define CLIA verification (unmodified FDA-cleared tests, 42 CFR 493.1253(b)(1)) versus establishing performance specifications (modified or laboratory-developed tests, 493.1253(b)(2)), and say that "validating" the build here means testing LIS, interface and EHR configuration.

**ACC-15 · P2 · Use this verified wording when filling the content gaps in TEACH-11 and TEACH-12.**

- Lesson 7 (3.1, 3.2): the HIPAA Security Rule requires administrative, physical and technical safeguards (unique user IDs, access and audit controls, transmission security). A vendor that can reach patient data on the server is a business associate and needs a signed agreement. Unauthorized access to unsecured patient information triggers a breach risk assessment; if notice is required, individuals are notified without unreasonable delay and within 60 days, HHS is notified, and the media too when more than 500 residents of a state are affected. Properly encrypted data are not "unsecured". Add periodic vulnerability scanning.
- Lesson 8 (3.3): full, incremental and differential backups; on-site versus off-site or rotating media versus a replicated hot standby; recovery point and recovery time objectives; restore testing; analytic copies kept in a governed data warehouse separate from production.
- Lesson 9 (3.4): define public data (released without access controls, so it must be deidentified and low risk), deidentified data (meets Safe Harbor or Expert Determination; no longer PHI), and coded data (identifiers replaced by a code whose key is held elsewhere; still PHI unless a standard is met). Note extra restrictions on substance-use treatment records (42 CFR Part 2) and, in many states, HIV results, and the IRB's role in waivers of authorization.
- Lesson 10 (4.4, 4.2): linear Code 128 on specimen labels, 2D Data Matrix on cassettes and slides, ISBT 128 for blood products, CLSI AUTO12 for label content and placement; RFID and location dashboards; AP (case → part → block → slide) versus CP (order → specimen → test). Change the receipt check from one patient identifier to "two patient identifiers (name and date of birth) against the requisition, and the part".
- Lesson 12 (4.3): an assay change can require revalidating calculated results such as eGFR from creatinine or calculated LDL cholesterol, because they use the reported values and units.
- Lesson 13 (5.4): laboratories run ADT, EHR order and result, billing, reference-laboratory and instrument interfaces. A unidirectional instrument interface only sends results; a bidirectional one also receives orders by host query (the analyzer asks for tests for a scanned barcode) or download (the LIS sends a worklist ahead). Instrument messages often use ASTM/CLSI LIS2-A2 or HL7. Middleware can apply autoverification, delta and reflex rules and hold results for technologist review.
- Lesson 14 (5.1): IHE publishes integration profiles that combine existing standards for a workflow; ISO publishes international standards including ISO 15189 for laboratory quality; ONC (now ASTP/ONC) is a federal office, not a standards developer, whose certification criteria name standards such as LOINC, SNOMED CT and UCUM that certified EHRs must support.
- Lesson 17 (6.1): summarize Bates and colleagues' "ten commandments" for effective decision support (JAMIA 2003;10:523–530): speed matters; fit the workflow; usability details matter; redirect rather than stop; keep it simple; ask for extra data only when needed; monitor impact; maintain the rules.
- Lesson 18 (6.4): name the analysis as a difference-in-differences comparison; explain longitudinal (interrupted time-series) and randomized designs.
- Lesson 20 (7.4): current CMS guidance (memo QSO-23-15-CLIA, revised 23 September 2025) allows remote review of digital images, including at home, under the primary laboratory's CLIA certificate when its conditions are met, and excludes digital cytology. Recheck the memo's status before publishing. Regulatory permission does not replace validation of the home workstation, network and fallback.

**ACC-16 · P3 · Realism polish.**

- Lesson 8: the critical potassium is phoned 8 minutes after collection. Change `calledAt` to "10:52" and update `tests/topic3-downtime.test.ts` (about line 38).
- Lesson 9: three women born in 1988 with Ewing sarcoma admitted the same day is implausible; diagnoses come from the EHR encounter, not the LIS; reword "is called *k*-anonymity" to "the file is *k*-anonymous, with *k* equal to that smallest group size".
- Lesson 2: explain that the interface engine keeps a result queued and retries until it receives an acknowledgment (ACK).
- Lesson 4: vary the six very-low differences (currently all +0.1). Lesson 11: retitle AV-17 (10,001) "Above the measuring range".
- Lesson 15: make Hospital C a partner hospital in Canada so mmol/L glucose is natural. Lesson 19: add the common 0.5 µm/pixel ≈ "20×" and 0.25 µm/pixel ≈ "40×" correspondence and that a pyramid adds about one third to the base size.
- Lesson 16: explain why Q-13 and Q-14 stay unresolved (for example, held for a hemolysis index above the potassium limit; recollection requested). Lesson 21: Site B already appears in development data, so do not call it "a new site".
- Lesson 18: relabel "unsafe blocks" as "documented-reason blocks" so it matches lesson 17's rule. Lesson 23: label the planning terms RTO and RPO, and note the vendor costs are for "this single-site module replacement". Lesson 22: add "under this procedure" to the invalid-run note.
- Unused legacy seed data in `curriculum.ts` (about lines 164–255) contradicts current lessons (for example "Acceptance 4.8%", "12,480/month"). Delete it with the generic path (TEACH-01) or mark it "Not rendered".

## Phase 2 — Learner path and navigation

Right now the only forward link from a lesson is the faculty guide, which holds the answers, and objectives appear only as codes. Fix both before the content work, because later phases rely on this navigation.

**NAV-01 · P1 · Add previous and next lesson links.**

- Where: `src/App.tsx`, `LessonPage` end navigation (`.lesson-end-nav`, about line 131); `TopicPage` and `LessonListItem` (about lines 94–99).
- Do: compute previous and next from the global `lessons` array order. Replace `.lesson-end-nav` with `<nav className="lesson-pager" aria-label="Lesson navigation">` holding two link cards: "← Lesson {id}: {title}" and "Lesson {id}: {title} · {minutes} min →". When the next lesson starts a new topic, prefix it with "Next topic: {topic title}".
- Style Next as the primary action. At ≤720 px, stack the cards with Next first.
- Render the same pager under the "Open debrief" card and at the end of the opened debrief.
- Add previous and next topic links at the bottom of `TopicPage`.
- Turn prose cross-references into links, starting with `follow-the-flag/debrief.mdx`, `pixel-budget/debrief.mdx` and `five-rights-right-test/debrief.mdx`.
- Verify: from lesson 1, Next walks through all 23 lessons in order. Lesson 23 shows "Back to curriculum" instead of Next.

**NAV-02 · P1 · Stop the faculty guide from being the main forward link.**

- Where: `src/App.tsx` lesson meta row (about line 115), end navigation (about 131), `FacultyPage` (about 141).
- Do: relabel every faculty link "Facilitator guide (contains answers)". Open it in a new tab (`target="_blank" rel="noopener"`) so lesson answers are not lost. Place it under the pager as a small text link.
- On the faculty page, change the eyebrow "Editable faculty material" to "For faculty: facilitation notes and expected reasoning". Add a top line, "Learners: finish the lesson first", linking back to the lesson.
- Whether to also remove the link from the lesson header is decision D-02. Leave it there until the author decides.
- Verify: opening the guide from a lesson with answers chosen leaves the lesson tab unchanged.

**NAV-03 · P1 · Show what each PIER objective means wherever its code appears.**

- Create `src/data/pierObjectives.ts` exporting `{ id, topic, summary }` for all 34 objectives. Each `summary` is an original paraphrase of 12 words or fewer, with acronyms spelled out. Do not copy PIER wording. Seed text is in the table below.
- Hub coverage table (`Coverage()` in `App.tsx`, about lines 84–87): one row per objective with ID, summary, and primary and secondary lessons as links. Build it from lesson mappings, not `manifest.topic`, so lessons from other topics appear (8.1 → lesson 13; 2.1 → lesson 16; 2.4 → lesson 21). Give each row `id="objective-<id>"`.
- Topic page: replace the bare chips with a list of ID, summary and covering lessons. Mark lessons from another topic "(from Topic 5)".
- Lesson page: replace the "PIER 1.1" chips with a disclosure, "PIER objectives in this lesson", listing ID, summary and the existing `pierCoverage[].learnerAction` text where present (it is never rendered today). Link each code to `#objective-<id>` on the hub.
- Faculty page: add the same list above the faculty text.
- Verify: every page that shows an objective code also shows its summary, and lesson 13 appears under 8.1 on the Topic 8 page.

**NAV-04 · P2 · Add a contents list and section anchors inside lessons.**

- Where: `LessonPage`; `Topic5Section` in `src/components/Topic5Common.tsx`; `src/styles.css`.
- Do: give every lesson section an `id` and `aria-labelledby`. Add `src/components/LessonToc.tsx`, built from the section headings plus "Introduction" and "Debrief". At ≥1200 px, show it as a sticky right-hand list; below that, as a `<details>` element titled "In this lesson · N steps" under the lesson header. Mark the current step with `aria-current`.
- Add `[id] { scroll-margin-top: 96px }` so deep links land below the sticky header.
- Verify: lesson 3 (about 13,300 px tall at desktop width) shows the list at 1365 px, and a section link lands with its heading visible.

**NAV-05 · P2 · Make lesson numbers, times and summaries consistent.**

- Topic pages number lessons 01–04 within the topic, while breadcrumbs say "Lesson 15". Show the global number (`manifest.id`) everywhere.
- Show "N lessons · M min" on topic cards and topic headers, and the total on the hub (about 754 minutes, roughly 12.5 hours). Compute both from `durationMinutes`.
- Add `summary: string` (one sentence that states the case) to `LessonManifest` in `src/data/types.ts`. Fill it for all 23 lessons and show it under each title on topic pages.
- The Topic 4 home card wraps "3 LESSONS" beside its objective list. Stack the card footer (`flex-direction: column`, `white-space: nowrap` on the count).
- Verify: lesson numbers match between topic page and breadcrumb at both widths.

**NAV-06 · P2 · Make the home page say who it is for, how long it takes and how to use it.**

- Where: `HubPage` in `App.tsx` (about line 81); `.hub-hero` in `styles.css` (about line 47).
- Set `.hub-hero` `min-height` to 0. Under the buttons, add a facts row: "23 case-based lessons · 20–50 minutes each · about 12.5 hours in total · no account, nothing is saved · works on phone and laptop".
- Replace the "Curriculum route" steps ("Diagnose the failure layer", "Repair and regression-test") with plain ones: "Read the case → Inspect the laboratory records → Make and test a decision → Read the debrief".
- Add a short "How to use this" section before the topics, with one or two sentences each for residents, faculty and program directors.
- Replace project-internal phrases ("coverage contract", "observable learner decision", "Aligned, attributed, and independently authored"). Replace "Lessons progress from foundational vocabulary to applied configuration and stewardship decisions"; difficulty does not rise steadily, so describe the topic order plainly instead.
- Verify: at 1365×900 the facts row is above the fold.

**NAV-07 · P2 · Restore site navigation on phones.**

- `styles.css` hides `.topbar nav` at ≤720 px and puts nothing in its place (about lines 811–812). Keep it visible as a wrapping row under the brand, with 44 px tap targets. Rename the items "Topics", "Coverage" and "About".
- Pad breadcrumb links to 44 px tall at ≤720 px.
- Verify: at 390 px every navigation item is reachable and the page has no horizontal scroll.

**Seed summaries for NAV-03.** These are the reviewer's paraphrases. Check each against the [PIER Essentials R5 PDF](https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf) and spell out acronyms before use. Also restore "Standards" in the Topic 5 title: "Messaging Standards, Interoperability, and Interfaces".

| ID | Summary (seed) |
| --- | --- |
| 1.1 | Distinguish informatics from IT; locate pathology IT in laboratory administration |
| 1.2 | Explain why informatics knowledge and data skills matter in practice |
| 1.3 | Relate pathology informatics to clinical informatics across the health system |
| 1.4 | Use correct hardware, software and network terminology |
| 2.1 | Define data structure, quality dimensions and creation-to-use flow |
| 2.2 | Apply descriptive and inferential statistics to pathology data |
| 2.3 | Describe big-data characteristics and sources relevant to pathology |
| 2.4 | Define AI and machine learning, model types and deployment risks |
| 3.1 | Balance availability against security; know threats and protective controls |
| 3.2 | Identify regulations governing protected laboratory and patient information |
| 3.3 | Define high reliability: backups, recovery, dependable data access |
| 3.4 | Manage patient information for research and education; recognize reidentification risk |
| 4.1 | Describe core LIS functions: dictionaries, interfaces, audit trails |
| 4.2 | Explain how the LIS supports appropriate clinician test ordering |
| 4.3 | Name and define common automated laboratory rules |
| 4.4 | Explain barcodes and tracking for positive patient identification |
| 4.5 | Explain the LIS role in quality monitoring and error reduction |
| 5.1 | Outline standards development and the pathologist's role in it |
| 5.2 | List key features, versions and limits of HL7 |
| 5.3 | Describe standard terminologies used for pathology data |
| 5.4 | Describe middleware, its relationship to the LIS, and laboratory roles |
| 5.5 | Explain how ancillary data improves laboratory performance |
| 6.1 | Describe clinical decision support role, architecture and design guidelines |
| 6.2 | List decision support categories and common laboratory applications |
| 6.3 | Explain decision support limits: alert fatigue, automation bias, governance |
| 6.4 | Describe methods for evaluating decision support effectiveness |
| 7.1 | Describe uses of digital pathology systems in practice |
| 7.2 | Explain how image format and resolution affect applications |
| 7.3 | Explain image analysis roles in care and productivity |
| 7.4 | Explain validation and regulatory requirements for digital pathology |
| 8.1 | Explain the pathologist's role in EHR ordering and result display |
| 8.2 | Describe the process and requirements for building test definitions |
| 8.3 | List the steps to evaluate, select and implement a new LIS |
| 8.4 | Describe accreditation and regulatory aspects of maintaining LIS information |

## Phase 3 — Teaching design

Twenty-one of the 23 lessons are strong case-based teaching; keep their case-first setup, realistic artifacts and consequence-based feedback. The work here is to rebuild the two placeholder lessons, make answers harder to guess, and add retrieval, transfer and faculty support. All new clinical or regulatory text needs the author's review before merge.

**TEACH-01 · P0 · Rebuild lessons 5 and 6 as full case-based lessons.**

- `five-vs-slide-archive` (PIER 2.3) and `model-under-pressure` (2.4) still use the old generic template: a one-sentence case, a four-step trace, two multiple-choice questions with stock feedback (`feedbackFor()` in `src/data/curriculum.ts`, about lines 258–268), and about 40 words of faculty notes. Lesson 6 promises to distinguish supervised learning, convolutional image models and generative AI; no lesson teaches these. The replacements planned in `src/data/topic2Plan.ts` are marked unpublished.
- Keep both slugs. Use the Topic 7 file set: introduction, concepts, bridge, debrief, faculty and practicum MDX, plus `interaction.ts` and a dedicated component registered in `experienceRegistry` in `App.tsx`.
- Lesson 5 (`experience: "multimodal"`): follow the tumor-board plan in `topic2Plan.ts` (about lines 167–177). Build a lung cancer tumor-board dataset that combines slide images, a PD-L1 result, a genomic report and EHR staging. Define volume, velocity, variety, veracity and value against that dataset. The learner repairs records at patient, specimen, block and case level whose links do not match. Define storage and throughput units (PB, GB/s) inline.
- Lesson 6 (`experience: "ai-deployment"`): Part A, classify four proposals (a programmed rule, a supervised slide-image detector, unsupervised clustering, a generative tumor-board summary) and name the main review each needs. Part B, local verification stratified by scanner and lesion size, then separate a generalizability failure from drift using a month-by-month monitor. Add two sliders (local prevalence, class separation) showing how sensitivity and positive predictive value change, modeled on Activity 2 of [nspies13.github.io](https://nspies13.github.io/). Part C, sort equity, accountability, documentation and device-status questions. Define sensitivity and positive predictive value in the lesson.
- Use the coverage claims in `topic2Plan.ts` (about lines 179–202) and set those entries to `published: true`.
- After both lessons are rebuilt, delete the legacy generic path (`LegacyCaseSeed`, `feedbackFor()` and `GenericExperience.tsx` if unused). Add a test that no published lesson uses `experience` "generic" or leaves it undefined.
- One lesson or two for 2.4 is decision D-01.
- Verify: both lessons have choice-specific feedback, a case setup that names the learner's role and what happened, and an early-open debrief.

**TEACH-02 · P1 · Make correct answers impossible to pick by length or position.**

- The correct option is the longest in 32 of 34 generic choice sets and 19 of 23 purpose-built ones. In generic sets it is always first.
- Apply to every `interaction.ts`: the correct label is no longer than 1.25× the median length of the wrong options; move qualifiers into feedback. Order options through a shared helper, `orderedChoices(slug, choices)`, with a stable per-lesson seed so screenshots and tests stay deterministic.
- Replace absurd distractors with things a resident or analyst might really propose: a narrow fix that solves the reported case but breaks another, or the right action at the wrong time. Examples to replace: "Abandon digital pathology permanently." (`validate-before-go-live/interaction.ts`, about line 28), "Make the alert red", "Buy more disk". Each wrong option needs feedback on its laboratory consequence.
- Checklists where every item is correct are reading tasks, not decisions: `releaseRequirements` in `build-the-new-test/interaction.ts`, `monitorItems` in `human-plus-algorithm/interaction.ts`, `measures` in `alert-everyone-ignores/interaction.ts`. Add two or three plausible wrong items with feedback, and grade both what is ticked and what is left out.
- Add a test enforcing the length rule.
- Verify: the correct option is the longest in no more than 30% of choice sets.

**TEACH-03 · P1 · Do not reveal answers before the learner commits.**

- Split each control note into `describe` (neutral, shown live) and `evaluate` (approved or not, plus the consequence, shown only after the lesson's check or replay button). Current notes give the answer as soon as a setting changes: "The approved limit is 50 ng/L" (`autoverification-at-the-edge/interaction.ts`, about lines 50–59); "Addressed." and "Needs review." (`WsiValidationExperience.tsx`, about line 13); approved-policy notes in `five-rights-right-test/interaction.ts` (about 34–40) and `build-the-new-test/interaction.ts` (about 5–11).
- Lesson 1 (`OrientationExperience.tsx`, about line 51) shows the correct owner on the first miss, then says "try again". On a first miss, show a hint ("Reconsider who performs the work and who approves it"); reveal the answer on a second miss or a "Show answer" button.
- Lesson 3: Section 05 shows the three-period table and "The cutover week explains the disagreement" before Section 07 asks the learner to choose (`DataQualityExperience.tsx`, about lines 266–270). Show it after the choice. Also let the learner notice the odd week first: after the opening choice, show a compact weekly table and ask which week stands out before `investigation.mdx` explains the cutover (AGENTS.md: notice the pattern, then learn what happened).
- Lesson 4: the guidance at `StatisticsExperience.tsx` (about line 201) states the result. Cut it to "Choose the next step."
- Verify: with defaults loaded, no control in lessons 11, 17, 20 or 22 shows "approved", "Addressed" or "Needs review" until a check has run.

**TEACH-04 · P1 · Explain partly correct answers.**

- Check consoles in lessons 2, 3 and 4 pass or fail every row together (`ResultJourneyExperience.tsx` about 295–300; `DataQualityExperience.tsx` about 286–290; `StatisticsExperience.tsx` about 204). Reuse the `ValidationCase { passingRepairs, failNotes }` pattern from `src/data/types.ts` so each row passes or fails on its own, with a reason.
- Lesson 2: "Try again. This item is application software." gives the answer without a reason. Add an explanation per item, and a `whyNext` sentence per node in the path builder. Under each evidence tab, add one question, "What does this check rule out?", with feedback; for example, the interface server at 18% CPU and 46% memory rules out overload.
- Lesson 8: wrong reconciliation actions say only "… remains unresolved" (`twelve-hours-offline/interaction.ts`, about 284–300; `DowntimeExperience.tsx`, about 103). Give each action its own feedback, shown after "Check reconciliation".
- Verify: in lesson 3, choosing "Remove the 27 cutover cases" gives a mix of pass and fail rows, each with a reason.

**TEACH-05 · P1 · Tell learners what they will be able to do, and what to do first.**

- In every `introduction.mdx`, after the case setup, add `## What you will be able to do` with three or four observable statements, each matching one interaction. Draw on the existing `learnerAction` strings.
- Add `prerequisites?: string[]` (slugs) to `LessonManifest`. Render "Helpful first: Lesson 13 — Tracing a Missing Critical Flag" as a link under the lesson header.
- Test: every introduction contains the new heading.

**TEACH-06 · P1 · Add a short "Check yourself" block after each debrief.**

- No lesson asks the learner to retrieve or apply the principle afterwards. Add a lesson-local `check.ts` exporting three items `{ id, kind: "principle" | "transfer" | "spaced", fromLesson?, prompt, choices: { id, label, correct?, feedback }[] }`.
- Render a shared `<CheckYourself>` component after the debrief, titled "Check yourself (3 questions)", with per-choice feedback and retry. Store nothing.
- The three items: the principle applied to a different analyte or laboratory section; what you would check first at your own institution; one spaced item reusing an earlier lesson ("From Lesson 3"). Good spaced threads: result arrival versus meaning (lessons 13→14→15), report ownership (1→22), denominators (3→4→16→18→21).
- Seed from the faculty "Assess transfer" prompts in `five-rights-right-test/faculty.mdx` and `build-the-new-test/faculty.mdx`.
- Optional: a `/glossary/` page generated from `glossary.ts` (`term`, plain explanation, pathology example, lesson link). It supplements teaching terms in context; it does not replace it.
- Test: every published lesson has three items, at least one of kind "spaced".

**TEACH-07 · P1 · Show the institution practicum to learners and give it one format.**

- `Practicum` renders only on the faculty page (`App.tsx`, about line 141), and `manifest.hasLocalPracticum` is unused. Render it on the lesson page after the debrief as "Apply it at your institution (optional, with a supervisor)".
- Use one template: Apply it at your institution · Who to meet · Time (30–60 min) · Steps (3–6, numbered) · Bring back (a concrete product, such as a one-page trace with five timestamps) · Discuss with faculty · Privacy.
- Write practicums for lessons 4, 5, 6, 12, 13 and 16, and expand the one-sentence ones in lessons 10, 11 and 14. Models to copy: `twelve-hours-offline/practicum.mdx`, `alert-everyone-ignores/practicum.mdx`.
- Test: every published lesson renders the practicum with all template headings.

**TEACH-08 · P1 · Give every faculty guide the same usable structure.**

- Only 11 of 23 guides give a time allowance, two give a minute-by-minute plan (lessons 17 and 22) and two list common misconceptions (lessons 1 and 19).
- Reorganize each `faculty.mdx` under: At a glance (objectives, PIER codes, time, solo or group, what to project) · Run of show (table of minutes, activity, what the facilitator asks) · Expected answers · Common misconceptions (3–5, each with a redirecting question) · Discussion prompts (3, each with "a strong answer includes…") · Group variant · Assess transfer · Sources. Keep all existing content; move it under these headings.
- Group variant: adapt the stakeholder role-play from nspies13 Activity 3 with laboratory roles (laboratory director, LIS analyst, clinical informatics, laboratory operations, clinical service, patient advocate). Start with lessons 1, 7, 17, 18, 20, 22 and 23.
- Add a PIER coverage section to every guide that lacks one, following `steward-at-morning-huddle/faculty.mdx`.
- Test: every faculty file contains "Run of show" and "Common misconceptions".

**TEACH-09 · P2 · Give every lesson the same section and debrief structure.**

- Topics 1–4 number their sections and state each step's purpose; Topics 5–8 (`Topic5Section` in `Topic5Common.tsx`) render a bare heading. Replace both with one `LessonSection({ number, eyebrow, title, purpose, children })` in which `purpose` is a required one-sentence string.
- Debriefs start with `# Debrief`, `## Debrief` or `## Debrief: …` in different lessons. Standardize to `## Debrief: <principle in plain words>`, then `### What happened in this case`, `### Who does what`, `### Connection to PIER <code>` (one plain sentence).
- Move the slide-number source list out of the lesson 1 debrief (`steward-at-morning-huddle/debrief.mdx`, about lines 38–46) to its faculty guide, per AGENTS.md.
- Test: every debrief follows the heading pattern.

**TEACH-10 · P2 · Reduce load in the longest lessons.**

- Lesson 3 (about 1,530 learner words; a 455-row, 11-column table): show six columns by default with a "Show all columns" toggle.
- Lesson 15 (about 1,710 words): wrap reference-only definitions in `<details><summary>Need a refresher?</summary>`.
- Lesson 2: the hosting-terms table (`inside-a-results-journey/concepts.mdx`, about lines 22–32) is used by no task. Add one classification item for it or move it to the debrief.
- Verify: in lesson 3 at 1365 px, no concept paragraph is more than one screen from the control that uses it.

**TEACH-11 · P1 · Teach the two objectives that are mapped but not taught (4.2 and 3.2).**

- 4.2, how the LIS supports appropriate ordering: `where-is-the-specimen` (its primary lesson) never covers ordering. Add a concepts section, "From the order to the worklist": the order catalog, specimen requirements, order-time questions, duplicate checks, reflex orderables and clear test names. Add a short AP-versus-CP comparison (case, part, block and slide versus order, test and result; accession structure; worklists; reporting; specialized systems for blood bank, microbiology and molecular). Add a five-item "AP, CP or both" classification in `interaction.ts`, rendered by `SpecimenRoutingExperience.tsx`. Add 4.2 as a secondary objective to lessons 12, 17 and 22.
- 3.2, regulations for protected information: lesson 7 (`server-behind-the-analyzer`) is mapped to 3.2 but has no regulatory content. Add a section, "What the rules require for this server": HIPAA Security Rule safeguards and risk analysis; a business associate agreement for the vendor's remote access, contrasted with lesson 9's data use agreement; the privacy office's breach-risk assessment after ransomware; extra federal or state protections for some results (for example substance-use treatment or HIV testing); and that the accreditation checklist includes LIS security and access requirements (name categories, do not quote). Add a five-item "finding → obligation" step after the stress test in `SecurityReviewExperience.tsx`. Add HHS sources to `content/SOURCES.md`.
- Verify: run the Topic 3 tests after the new step; the coverage row for each objective names an interaction.

**TEACH-12 · P2 · Fill subtopic gaps and correct objective mappings.**

- 5.4 middleware: middleware is taught in lessons 11 and 16, but 5.4 is mapped to lesson 13, an interface-engine case. Make lesson 11 primary and add a concepts section on what middleware does between the analyzer and the LIS. Add an "Interfaces in the laboratory" table and a four-item classification to `follow-the-flag`. Keep lesson 13 as secondary.
- 5.1 standards development: add a "Request a standards change" step to `newborn-screen-to-public-health` (order the steps; match HL7 International, Regenstrief/LOINC, SNOMED International, IHE, ISO and ONC to their roles). Name IHE, ISO and ONC in its concepts.
- 6.2 decision support categories: add a six-example sort to `five-rights-right-test` (order set, duplicate-order suggestion, interpretive comment on a hemoglobin electrophoresis report, critical-result notification, test information at order entry, reflex protocol), by purpose and by whether it interrupts.
- Topic 4: in `where-is-the-specimen`, add the parts of an LIS (including billing, outreach and dictation) and a section on labels, barcodes, RFID and tracking dashboards. In `autoverification-at-the-edge`, add one calculated-result record (eGFR with age missing should hold). In `reflex-rule-ripple-effect`, add a quality-indicator step for 4.5.
- 8.4: add a "Maintain the record" step to `build-the-new-test` (complete a change-control record; choose which procedure-manual sections to update). Explain in learner copy, paraphrased, that accreditation requires verifying accurate result transmission to the EHR.
- 3.1 and 3.3: in lesson 7, add vulnerability scans, patching, penetration tests, phishing and multifactor sign-in, plus one availability-versus-security decision. In lesson 8, add backups and redundant paths: explain recovery time and acceptable data loss in plain words before naming RTO and RPO; compare hot, warm and cold standby with rotation and an offsite copy.
- Add secondary mappings where lessons already teach an objective: lesson 1 +8.1; lesson 3 +1.2; lesson 11 +8.2; lesson 12 +8.2; lesson 8 +4.5. Teach specimen-centered versus patient-centered records in lesson 1, since its practicum already asks about them.
- In `follow-the-flag/concepts.mdx`, after the plain-language explanation, name the terms "syntactic" and "semantic" interoperability.
- Update `content/COVERAGE.md`, the faculty coverage sections and `tests/curriculum.test.ts` (which pins lesson 1's mapping). When case records change, update the counts in MDX and tests together.

**TEACH-13 · P2 · Lesson-specific design fixes.**

- Lesson 1: state the learner's role in the introduction ("You are the chemistry pathology resident at Friday's go-live readiness meeting"). Open with the readiness evidence as a "predict: approve Monday?" choice, then revisit the decision with feedback at the end.
- Lesson 4: the three statistics items (`can-we-accept-this-lot/interaction.ts`, about lines 29–48) test definitions printed just above them. Replace with interpretation items, for example "Mean +1.2, median +0.8: what does this suggest?" and "If the SD were 4.0 ng/L, how would the interval and the decision change?"
- Lesson 16: the introduction lists the three repairs before the learner investigates (`invisible-bottleneck/introduction.mdx`, about lines 15–16). Replace with the question: can the dashboard answer the manager's question, and if not, what must change?
- Lesson 20: render Concepts before Bridge (`WsiValidationExperience.tsx`, about lines 12–13) so "intraobserver" and "washout" are defined before use. Introduce Elena in the introduction.
- Lesson 23 (P3): the "outage" lifecycle case repeats lesson 8. Replace it with a hosted-service contract question (support hours, notice of changes, data export at termination, who reconciles), and refer back to lesson 8 where the theme recurs.

## Phase 4 — Writing and terminology

Most lessons already follow the AGENTS.md voice rules: case first, process before term, stated denominators, and no AI filler words. The fixes below are mostly consistency. Before changing visible copy, note the tests that assert it: `tests/accessibility.test.tsx` matches button labels such as "Reset lesson interactions" and "Run stress test"; `tests/curriculum.test.ts` asserts four lesson titles; and `scripts/validate-curriculum.ts` (about lines 39–41) fails a Topic 3 lesson whose correct choice is more than 1.5 times the mean distractor length. Update them together.

**WRT-01 · P2 · Spell out every acronym at its first use in each lesson.**

- Lessons open independently, so count first use per lesson in page order. LIS and EHR are undefined in nine lessons, including lesson 1 ("The analyzer is talking to the LIS and the result reaches the EHR"). Also undefined somewhere: CBC (in a lesson title), CDS, ED, IP, TCP, HL7, FHIR, SNOMED CT, UCUM, ICD, CPT, DICOM, CAP, FDA, CLIA, H&E, FFPE, HbA1c, FT4, TSH, MRN, PHI, QC, AP, CP, AI, PNG, JPEG, RGB.
- Examples: lesson 1 → "The analyzer sends results to the laboratory information system (LIS), and the LIS sends them to the electronic health record (EHR)." Lesson 13 → "the OBX (observation result) segment". Lesson 20 → "hematoxylin and eosin (H&E)".
- Add an acronym first-use check to `scripts/validate-curriculum.ts`.

**WRT-02 · P2 · Replace software and engineering jargon with laboratory words.**

- "Gate", "branch" and "predicate" (lessons 11, 12, 13) → "check", "criterion", "condition". "This configuration skips the QC check" instead of "QC gate is bypassed".
- "Portfolio" and "stress test" (lesson 7, about 30 uses) → "control plan" and "test the plan against five events".
- "Freeze transitions" and "degraded operation" (lesson 8) → "pause new electronic orders and result entry" and "working on paper while systems are down".
- "Data lineage", "analytic store", "execution plan" (lesson 16) → explain the hourly copy in plain words: "Each hour, a scheduled query copies finalized results from the LIS into a separate reporting database, and the dashboard summarizes that copy." "Join by accession key" → "link by accession number".
- "Promote", "deployment owner" (lesson 22) → "move the tested version into the live system (production)" and "the person responsible for the release". "Patient-facing result fields" → "reported result fields", since "patient-facing" usually means a patient portal.
- "Receiver contract" (lesson 13) → "interface agreement", as lesson 14 says. "Workbench" → "this exercise" or the table's name. "Replay" → "run the test cases again", explained once as regression testing.
- "Conjunction", "sequester" (lesson 9) → "filter combination", "move the linkage key to restricted storage".
- Verify: `rg -n "\bgates?\b|branch|predicate|portfolio|stress test|conjunction|sequester|freeze (new )?transitions|degraded|lineage|execution plan|\bpromot|receiver contract|workbench|end-to-end|patient-facing" content/lessons src` returns only defined first uses.

**WRT-03 · P2 · Move teaching copy out of React components.**

- AGENTS.md says substantial teaching copy stays out of components. `DataQualityExperience`, `ResultJourneyExperience`, `StatisticsExperience`, `PrivacyExperience`, `DowntimeExperience`, `SecurityReviewExperience` and `OrientationExperience` each hold 300–565 words of prompts, choices and feedback, and some type computed numbers by hand (8.4, 9.5, 3.8, 455, the 0.6–1.8 interval).
- Move each block into a `copy` object in the lesson's `interaction.ts` (the pattern of `buildCopy` in `build-the-new-test/interaction.ts`, `selectionCopy`, `terminologyCopy`, `monitoringFeedback`) or into MDX when it is prose. Compute numbers in feedback from the data rather than typing them. Delete `PilotLabs.tsx`, which never renders.
- Verify: no JSX text node in `src/components/*Experience.tsx` is longer than about 80 characters.

**WRT-04 · P2 · Replace generic verdicts with case-specific ones.**

- "Correct.", "Not quite.", "Try again.", "Try another term." and "Good. Select the next component." appear in `OrientationExperience`, `GenericExperience`, `DataQualityExperience`, `StatisticsExperience` and `ResultJourneyExperience`.
- Use a short case-specific heading ("Accuracy fits this check.", "A paired t-test fits this design.") followed by the reason. For the lesson 1 go-live decision: "Not ready. The interface test shows only that results reach the EHR. The interpretive comment is cut off in the verified EHR report location, pathology has not reviewed the troponin alert logic, and procedures, training and staffing are incomplete."
- Verify: `rg -n '"Correct\.|"Not quite\.|"Try again|"Good\. ' src/components` returns nothing.

**WRT-05 · P2 · Remove slogan lines.**

- "**Informatics principle:**" opens eight debriefs, and "## Key point" appears in nine introductions, where it also gives away the answer. Examples: "Security and availability must be designed together."; "Deidentification is a governed risk-management process, not a synonym for removing names."
- Replace each principle with a plain sentence about this case (lesson 10: "The barcode scan identified the right patient and case, but the SP-EX entry in the procedure dictionary sent the case to the cytology worklist."). Delete "Key point" sections or merge a needed sentence into "Your task".
- Verify: `rg -n "Informatics principle|## Key point" content/lessons` returns nothing.

**WRT-06 · P2 · Cut repeated caveats about what an exercise does not prove.**

- "Establish" appears 86 times in learner copy, 50 of them as "does not establish". Keep one short "About this case" note per lesson for real limits, move the rest to `faculty.mdx`, and use plain verbs (show, prove, confirm, tell you).
- Example: "A correct barcode scan does not establish that the specimen was routed correctly" → "A correct barcode scan does not show that the specimen went to the right work area or that the next team received it." Remove developer detail such as "decoded from the existing WebP asset" and "deterministic application of your configuration".
- Verify: "establish" appears fewer than about 25 times across learner MDX.

**WRT-07 · P2 · Give each person one name and use terms consistently.**

- "Chen" is a pathology informatics fellow (Topic 3), a technologist (lesson 2), a pathologists' assistant (lesson 10) and the director of surgical pathology (lesson 20). "Elena" is both the digital pathology technologist and Dr. Elena Ruiz, the medical director. Give each recurring person one full name and role, restate the role in each lesson, and record the cast in `content/README.md`. Suggested: "M. Okafor, MLS" (lesson 2), "T. Nguyen, pathologists' assistant" (lesson 10), "Elena Park, digital pathology technologist".
- Use "interface engine" for the application that "runs on the interface server" (lesson 2 mixes engine, server and application). Use "worklist" for a team's work and "queue" only for messages waiting to send. Use one phrase for the designated EHR report location across lessons 1, 13 and 22.
- US spelling and style: "acknowledgment", "sign-out", "US", 24-hour times ("08:30"), one spelling of "canceled", straight apostrophes, lowercase "hospital IT" mid-sentence. Use one case callout label, "**Synthetic case:**".
- Verify: `rg -n "Chen|Elena" content` shows one person per name.

**WRT-08 · P2 · Show readable labels, not internal identifiers.**

- Learners see raw ids: "phi at rest", "heat vent", "ransomware traversal" (`SecurityReviewExperience.tsx`, about lines 80 and 95); "duplicate chart" (`DowntimeExperience.tsx`, about 103); "A-correction evidence" (`LisSelectionExperience.tsx`, about 21); "referral · F" (`NewbornExperience.tsx`, about 13). Add display labels in each `interaction.ts`, for example "Stored patient information", "Alder: corrected reports", "Immediate referral · final".
- Make buttons say what happens: "Rerun the report checks" on first press → "Run the report checks"; "Review release recommendation" → "Check my release recommendation"; "Reset lesson interactions" → "Clear my answers and start this lesson over" (update `tests/accessibility.test.tsx`). Rename the lesson 21 metric "True mitoses among marks" to "Marks that are true mitoses (positive predictive value)".

**WRT-09 · P2 · Introduce facts and people before relying on them.**

- Give the learner a role where it is missing: lesson 19 ("You are the pathology resident on the digital pathology committee"), lesson 20 (and Elena's role), lesson 21 ("You are the pathology resident helping Dr. Rao, a breast pathologist, decide whether…").
- Name lessons instead of "the next lesson" or "the preceding lesson" (`five-rights-right-test/debrief.mdx`, `follow-the-flag/debrief.mdx`, `pixel-budget/debrief.mdx`, `validate-before-go-live/introduction.mdx`), and link them (NAV-01). Replace "part of the fixed chronology shared by all three Topic 3 cases" (`server-behind-the-analyzer/introduction.mdx`) with a plain pointer to *Twelve Hours Offline*. Delete the meta paragraph about "the preceding lessons" and LOINC in `invisible-bottleneck/introduction.mdx` (about lines 18–23).
- Define terms before use with a case example: Safe Harbor and Expert Determination (lesson 9 concepts); value set, using the three newborn answer codes (lesson 14); soft stop, hard stop and order composer (lesson 17); "initial final report" (lesson 3); incident command (lesson 8); automatic release, also called autoverification, in the first paragraph of lesson 11.

**WRT-10 · P2 · Move source and curriculum commentary to faculty pages.**

- Learner pages carry slide-number source lists (`steward-at-morning-huddle/debrief.mdx`), a "PIER R5 connection" section (`inside-a-results-journey/debrief.mdx`), a PIER and slide-set mention (`can-we-trust-this-report/bridge.mdx`) and a "PIER 2.1" eyebrow (`DataQualityExperience.tsx`). Move them to the faculty guides; keep the PIER disclosure from NAV-03.
- Rename the downloadable CSV columns `current_post_included` and `fair_post_included` (lesson 3) to `original_two_period_group` and `revised_three_period_group`, and rename `fairPostIncluded` in code. AGENTS.md names "fair inclusion rule" as a phrase to avoid, and the column would not appear in a real export.

**WRT-11 · P3 · Headings, long sentences and small rewrites.**

- Heading levels: debriefs use `## Debrief: <finding>` (TEACH-09), practicums `## Local practicum: <action>`, and embedded concepts and bridge files start at `###` so they do not create sibling H2s inside a section (or demote them in code, as A11Y-06 describes). Introductions without headings get the standard case paragraphs then `## Your task`.
- Split sentences of 38 words or more into lists, for example the six findings in `server-behind-the-analyzer/introduction.mdx` (about line 7) and the five checks in `not-anonymous-enough/introduction.mdx` (about line 13).
- Remove remaining descriptions of software as people: "The receiver recognizes H" → "The EHR display table has an entry for H"; "The cutover cases should not disappear from the report" → "should not be removed from the report"; "Audit what the code claims" → "Check what the assigned code says the result is".
- Fix garbled or confusing lines: "A needed or unsupported-to-block order is prevented." (`alert-everyone-ignores/interaction.ts`, about line 27); "Deferring an unsupported mapping is a completed review decision." (lesson 15); "record the properties and five shared dimensions" versus "seven comparison fields" (lesson 15).

**Preferred terms.** Use this list across all lessons.

| In use now | Use instead |
| --- | --- |
| LIS, EHR, IT, CDS | Spell out at first use in each lesson; "hospital IT" in lowercase |
| gate, branch, predicate | check, criterion, condition |
| replay, regression testing | "rerun the full set of test cases after a change (regression testing)" at first use |
| production, promote, deploy | "the live patient-care system (production)"; "move the tested version into production" |
| portfolio, stress test | control plan; test the plan against named events |
| degraded operation, freeze transitions | working on paper while systems are down; pause new electronic orders and result entry |
| quasi-identifier, conjunction | fields that could identify a patient when combined; filter combination |
| receiver, receiver contract | receiving system; interface agreement |
| interface engine, server, application | interface engine (application) running on the interface server |
| worklist, queue | worklist for a team's work; queue only for messages waiting to send |
| automatic release, autoverification | "automatic release (autoverification)" at first use |
| acknowledgement | acknowledgment (ACK); name the code, "AA (application accept)" |
| reference range | reference interval |
| critical value | critical result (the event); critical limit (the threshold) |
| limited dataset | limited data set (HIPAA term) |
| signout, go live (noun) | sign-out (noun), go-live (noun) |
| U.S., United States | US |
| establish, does not establish | show, prove, confirm, tell you |

## Phase 5 — Accessibility (WCAG 2.2 AA)

The basics are in place: page language, a title on every route, table captions, a text equivalent for every chart, native fieldsets in Topics 3–8, reduced-motion support and text verdicts on feedback. Three problems block keyboard and screen-reader users: an almost invisible focus ring, feedback that is often not announced, and focus that drops to the page body. This review read the source only; confirm each fix with a keyboard and a screen reader.

**Color changes for this phase.** Each was measured against every surface where it is used.

| Token | Now | Change to | Result |
| --- | --- | --- | --- |
| Focus ring, light surfaces | `#f0b94c` (1.58:1 on cream) plus four other colors | `--focus: #8a4b00` | 5.3–6.8:1 |
| Focus ring, dark surfaces | same | `--focus: #ffd47a` inside dark sections | 8.4:1 or more |
| Secondary text `--muted` | `#60716c` (4.19–4.26:1 on tints) | `#55665f` | 4.95–5.98:1 |
| Input and select borders | `#aeb8b2`, `#9caaa3`, `#c8cec7` (1.6–2.4:1) | `--control-border: #768781` | 3.55–3.78:1 |

Phase 6 uses these same values wherever it mentions these tokens.

**A11Y-01 · P1 · Use one visible focus ring everywhere.**

- Five focus colors are defined (`styles.css` about lines 28, 596, 686, 928, 966, 1008; `Topic7.css` about line 20). The main one is 1.58:1 on cream, 1.76:1 on paper.
- Replace them with `:root { --focus: #8a4b00; }`, `--focus: #ffd47a` inside `.coverage-section`, `.hero-card`, `.debrief-content`, `.source-panel`, the footer and dark code blocks, and `:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }`. For radios and checkboxes inside card labels, add `label:has(> input:focus-visible) { outline: 3px solid var(--focus); outline-offset: 2px; }`. Delete the per-topic overrides.
- Verify: tab through the hub, a topic page and lessons 1, 3, 10, 13 and 19; the ring is clearly visible on cream, paper, mint, grey bars and the dark debrief.

**A11Y-02 · P1 · Announce feedback reliably.**

- Almost every feedback block creates its `role="status"` or `aria-live` container in the same render as its text, so screen readers often stay silent on the first choice in each question (about 60 places across all `*Experience.tsx` files).
- Mount one persistent, empty status container per question and change only its contents. Build the `Feedback` component from VIS-01 this way: an always-present `<div role="status" aria-live="polite" aria-atomic="true">` that renders the verdict and text inside it when there is something to say. For the inline notes in Topics 7 and 8, render `<small id=… role="status">` unconditionally (empty when unchecked) and link it with `aria-describedby`.
- Put `aria-live` only on a console's summary line, not on a whole console that also contains a button. Drop `role="status"` from notes that do not change because of their own control (every `Topic5Select` note; eight notes in `AutoverificationExperience.tsx`).
- Verify: with NVDA and Chrome, and VoiceOver and Safari, the first choice in each question is spoken.

**A11Y-03 · P1 · Keep focus when a control disappears or is disabled.**

- "Open debrief" unmounts the focused button, so focus falls to the page body (confirmed on the live site). Give the debrief `tabIndex={-1}` and a ref, and focus it after opening.
- Lesson 2 path palette (`ResultJourneyExperience.tsx`, about line 171): use `aria-disabled` instead of `disabled` on a placed node, and add hidden text "(placed)".
- Lesson 3 "Open scanned requisition" (`DataQualityExperience.tsx`, about 237): focus the requisition after it opens. Lesson 3 pagination (about 118–120): use `aria-disabled` at the ends.
- Lesson 8 phase buttons (`DowntimeExperience.tsx`, about 89): focus the new phase heading after Continue or Previous; use `aria-disabled` on Previous at the first phase.
- Verify: after each of these actions, `document.activeElement` is not `body`.

**A11Y-04 · P2 · Replace custom radio buttons with native radios.**

- In `GenericExperience`, `OrientationExperience`, `ResultJourneyExperience`, `DataQualityExperience` (about line 282) and `StatisticsExperience` (about 202), buttons with `role="radio"` have no arrow-key support, each is a separate Tab stop, groups are named "Diagnosis choices" instead of the question, and the selected state vanishes in Windows high-contrast mode.
- Use `<fieldset aria-labelledby="<question heading id>">` with native `<input type="radio">` inside the existing card labels, as Topics 3–8 already do. Add `@media (forced-colors: active) { .selected { outline: 3px solid Highlight; outline-offset: -3px; } }`. Remove the inner `role="radiogroup" aria-label=…` wrappers inside fieldsets.
- Keep the native controls in Topics 5–8; only match their size and accent color (VIS-05).
- Update `tests/accessibility.test.tsx`, which currently asserts `role="radio"` and the generic labels.

**A11Y-05 · P2 · Complete the tab widgets.**

- Tabs in `GenericExperience`, `PrivacyExperience`, `DowntimeExperience`, `SecurityReviewExperience` and `ResultJourneyExperience` have no arrow keys, no `aria-controls`, unnamed panels, and names that run numbers into labels ("1Analyzer").
- Add one shared `TabList` with roving `tabIndex`, Arrow, Home and End keys, `id` and `aria-controls` on each tab, and `aria-labelledby` on the panel. Hide the number spans with `aria-hidden="true"`. Where arrow-key tabs are not wanted, use `aria-pressed` toggle buttons instead, as `SourceInspector` does.

**A11Y-06 · P2 · Give each page one H1 and a logical heading order.**

- Every faculty page has two or three H1s (page title, `# Faculty guide…`, `# Local practicum`), and three debriefs add a second H1 to the lesson page. Embedded concepts files that start at `##` nest an H2 inside a section H2.
- Map heading levels where MDX is embedded instead of editing 40 files: `<Faculty components={{ h1: "h2", h2: "h3", h3: "h4" }}/>` (same for `Practicum`), `<Debrief components={{ h1: "h2" }}/>`, and `{ h2: "h3" }` for embedded concepts, bridge and comparison blocks. This meets the heading rules in WRT-11 and TEACH-09.
- Fix the skips in `code-the-meaning/faculty.mdx` (H1 to H3) and the requisition `<h4>` under an H2 in `DataQualityExperience.tsx`.
- Verify: a test renders each route and asserts exactly one H1 and no level jump greater than one.

**A11Y-07 · P2 · Make the page reflow at 320 px and keep scroll areas reachable.**

- At 320 px (400% zoom), 48–58 px titles cannot wrap words like "Interoperability,", forcing sideways scrolling. In addition to VIS-02, add `h1, h2, h3 { overflow-wrap: break-word; hyphens: auto; }` and at ≤480 px `h1 { font-size: clamp(2rem, 10vw, 2.75rem); }`.
- Wide tables and charts are in scroll containers that cannot receive focus (`DataQualityExperience`, `StatisticsExperience`, `TerminologyExperience`, `QueueExperience`, `AlertEvaluationExperience`, and MDX tables at ≤720 px). Wrap them in a shared `ScrollRegion` (`role="region"`, `aria-label`, `tabIndex={0}`), as the privacy and downtime tables already do.
- The sticky header can cover the focused element. Add `html { scroll-padding-top: 96px; }` above 720 px.
- Verify: at 320×640 on every route, `scrollWidth` does not exceed `clientWidth`; every wide table scrolls with the arrow keys.

**A11Y-08 · P2 · Give controls short, stable and distinct names.**

- In lesson 18 (`AlertEvaluationExperience.tsx`, about lines 23–24), a note inside each label makes the control's name grow when it is checked. In lessons 7 and 9 the checkbox name includes whole descriptions. Keep the label short and link the note with `aria-describedby`.
- Repeated controls share one name: "Data-quality dimension" seven times (lesson 3), "Statistic" and "Best initial choice" (lesson 4), "Responsible role or group" (lesson 1), "Properties threatened" and "Check this mapping" (lesson 7). Add the item's title to each name, for example "Properties threatened by {finding}". Add a `.visually-hidden` utility class.
- Lesson 4's dot plot is rendered twice with the same ids, so the second chart gets the first chart's description. Use `useId()` and give the summary version its own description of the mean and median lines.

**A11Y-09 · P2 · Do not show correctness by color alone.**

- Specimen routing feedback in lesson 10 (`SpecimenRoutingExperience.tsx`, about lines 23 and 38) differs only by background color. Route it through the `Feedback` component with a text verdict.
- The home coverage table uses `role="table"` with no cells, and missing objectives would show only as red. Use a native `<table>` with a hidden caption and `th scope`, and add visible and hidden text for "not covered". Add `scope="col"` to headers in `TerminologyExperience`, `QueueExperience` and `AlertEvaluationExperience`.

**A11Y-10 · P2 · Describe the image comparisons in lesson 19.**

- The alt text is only the variant name ("Glands and stroma; reduced pixel grid"), but the question asks what the comparison shows. Add `alt` and `description` fields to `pixel-budget/images.json` and show the description in a `<details>` titled "Describe the visible differences". The author checks each description against the images (drafts to start from: "Same field from a 128 × 128 grid enlarged four times: nuclei appear as blocky squares, gland borders are stair-stepped, and chromatin detail is gone" for the reduced grid; "Same field at JPEG quality 12: square block artifacts in the stroma and halos along the gland edges; nuclear outlines are smeared" for the compressed image).

**A11Y-11 · P3 · Smaller fixes.**

- Home topic cards: the whole card is one link whose name is all its text. Put the link on the title only and stretch its click area with CSS. On topic pages, drop the duplicate arrow link to each lesson from the Tab order. Remove the brand link's `aria-label`, which does not match its visible text.
- Add a skip link ("Skip to main content") and `id="main" tabIndex={-1}` on `<main>`.
- Use `<div role="group" aria-label=…>` instead of `<nav>` for in-page toggle groups (`Topic5Common`, `SpecimenRoutingExperience`, `ReflexRuleExperience`, `FlagExperience`). Label the lesson-end `<nav>`. Hide breadcrumb arrows from screen readers and mark the current page with `aria-current="page"`. Name the budget `<progress>` in lesson 7.
- Disabled buttons give no reason. Use `aria-disabled` with a visible hint such as "Choose a corrective action first."
- Mark links that open a new tab.

**Automated checks to add** (wire them into ENG-04):

- axe-core in jsdom for every experience and route, inside the existing `node:test` runner (contrast disabled in jsdom).
- One H1 and no skipped heading levels per route; unique ids per page; a status container present for each question before any choice; every fieldset named; no `role="radiogroup"` inside a fieldset.
- A token contrast test that parses `:root` in `styles.css` and asserts text pairs at 4.5:1 and focus and border tokens at 3:1.
- Playwright with `@axe-core/playwright` on the built site at 1365 px and 320 px, before and after "Open debrief": focus checks from A11Y-03, arrow keys in tabs and radio groups, and a forced-colors screenshot of the choice groups.

## Phase 6 — Visual design and layout

The visual identity is distinctive and worth keeping: serif display type, cream and deep-green palette, and paper requisitions and spreadsheets that look real. Topics 5–8 have drifted from the design system of Topics 1–4, and a few styles actively mislead learners.

**VIS-01 · P1 · Stop styling a selected answer as if it were correct.**

- A selected wrong answer is filled mint with a green border, the same tokens as `.feedback.correct`, while its feedback is red. In Topics 5–8, correct and incorrect feedback share one gold or grey style (`.topic5-note`, `.topic5-control small` in `styles.css`; `.t7-choices small` in `Topic7.css`).
- Add `--selected-bg: #eef2f6` and `--selected-border: var(--ink)`. Use them in every `.selected` rule (about `styles.css` lines 160, 196, 201, 249, 382, 469, 613, 657, 744). Keep mint and red only for evaluated feedback.
- Create `src/components/Feedback.tsx`: `<Feedback tone="correct" | "incorrect" | "partial" | "info">`, rendered with a text label ("Supported", "Not supported", "Incomplete", "Note") so the outcome never depends on color alone. Route `Topic5Select` notes and `.t7-choices` notes through it, passing the tone their callers already know. Keep `.topic5-note` for neutral annotations only.
- Verify: in lesson 1, choosing "Clinical informatics" shows a neutral selected card and red "Not supported" feedback.

**VIS-02 · P1 · Bring headings down to a usable size.**

- Lesson H1s render at about 105 px and topic H1s at about 96 px at 1365 px wide (`styles.css`, about lines 32, 95, 115). The title fills the first screen, the topic page's lessons fall below the fold, and the Topic 5 title probably overflows at 390 px.
- Add a type scale on `:root` and replace the ad-hoc `clamp()` values: `--fs-display: clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)` (home hero only); `--fs-h1: clamp(2.1rem, 1.5rem + 2.4vw, 3.5rem)` with `max-width: 22ch; overflow-wrap: break-word; hyphens: auto`; `--fs-h2: clamp(1.6rem, 1.3rem + 1.2vw, 2.25rem)`; `--fs-h3: 1.25rem`. Delete the per-topic overrides (about lines 1017–1019 and 1038). Apply the same scale to the "Debrief" heading.
- On topic pages, reduce `.topic-hero` padding to `24px 0 40px`, `.lesson-list-item h3` to 1.4rem, and drop its `min-height`.
- Verify: at 1365×900 a lesson title takes at most two lines and the first paragraph is visible; the topic page shows at least two lessons above the fold; at 390 px `document.documentElement.scrollWidth` equals 390 on `/topics/interoperability/` and every lesson route.

**VIS-03 · P2 · On phones, keep results next to the control that changed them.**

- AGENTS.md requires feedback beside its control on narrow screens. At 390 px, the privacy, security and LIS-selection workbenches update a counter a screen or more away (`PrivacyExperience.tsx` about 165–170; `SecurityReviewExperience.tsx` about 87–88; `LisSelectionExperience.tsx` about 27–30; `MitosisReviewExperience.tsx` about 11–13).
- At ≤720 px, make `.privacy-metric-grid` and `.security-budget-summary` sticky at the bottom of their section in a compact one-row form. Also add a one-line live delta under each toggled control (for example "Smallest group now 3"). In LIS selection, move the cost checkbox and a compact score strip directly under the sliders. Add `scroll-padding-bottom: 96px` so the sticky bar never hides the focused control.
- Verify: at 390 px, toggling the last control in each stack shows the updated value without scrolling.

**VIS-04 · P2 · Make wide tables usable on phones.**

- The downtime reconciliation table is 1,280 px wide with its "Match to MRN" control in the last column (`styles.css`, about line 687). At ≤720 px, reflow it into one card per row using `data-label` attributes, with the select full-width at the bottom of each card.
- `.report-table-wrap` scrolls in two directions inside the page (`min-width: 1500px; max-height: 650px`). At ≤720 px, remove `max-height` and add a "Scroll sideways →" hint shown only when the table overflows.
- Topic 5 tables break words mid-word ("Serum/plas ma") because of `overflow-wrap: anywhere` and `table-layout: fixed` (about lines 1014–1015). Use `overflow-wrap: break-word; hyphens: auto`, drop the fixed layout, and wrap the table in a horizontal scroller.
- Where a select's option text exceeds about 45 characters (downtime actions, long `Topic5Select` options), use radio cards instead of a native select.
- Verify: at 390 px every MRN select is visible without sideways panning, and no catalog word breaks mid-word.

**VIS-05 · P2 · Bring Topics 5–8 into the same design system as Topics 1–4.**

- Add `accent-color: var(--green)` to checkboxes, radios, range sliders and progress bars; Topics 5–8 currently show browser-default blue controls.
- Give the unstyled grey buttons in `CdsDesignExperience.tsx` (about line 22) `className="secondary-button"` inside an `.action-row`. Rule: the button that evaluates the learner's work ("Run…", "Check…", "Review…") is always `.primary-button`.
- Use one corner radius: either square everywhere or a single `--radius: 4px` (`.t7-choices`, `.t7-discordance`, `.cds-preview`, `.topic8-preview` are rounded inside square sections).
- Wrap every reset link in `.reset-row`, right-aligned as in Topics 1–4.
- The CSS uses 131 distinct hex colors, including eight near-identical greens. Replace hard-coded colors in `styles.css` (about lines 908–1044) and `Topic7.css` with tokens.
- Verify: lessons 10 and 22 side by side at both widths show the same section header, control colors, button hierarchy and reset placement.

**VIS-06 · P2 · Shorten line length and align content edges.**

- Prose runs to 110–140 characters per line (`.mdx-content` max-width 920 px; `.embedded-mdx` has none). Set `max-width: 68ch` on paragraphs and list items in `.mdx-content`, `.embedded-mdx` and `.section-guidance`; keep tables and figures full width.
- Give `.lesson-main` one `max-width: 1180px` and let the introduction, sections and debrief share its edges.
- Verify: at 1365 px no prose line exceeds about 75 characters.

**VIS-07 · P2 · Make the record, the explanation and the feedback look different.**

- AGENTS.md asks for the original artifact to stay separate from the teaching annotation. Teaching copy is boxed in Topic 3 but plain inside Topics 5–8, and the gold note serves as both annotation and feedback.
- Define five block styles and use them everywhere: `.teaching-block` (pale blue, blue left rule, eyebrow "Background"); `.artifact-card` (a screen with a title bar showing system name, record ID and a "Synthetic record" tag; key-value rows in monospace); `.annotation` (white, dashed border, eyebrow "What this shows"); `Feedback` tones from VIS-01; and the existing debrief panel.
- Have `SourceInspector` split record lines on the first colon into a `<dl>`. Give the decision-support preview in lesson 17 an order-composer header bar.
- Verify: in lessons 10, 17 and 22, each record, explanation and feedback block is identifiable by style alone.

**VIS-08 · P2 · Fix printing.**

- The print block (`styles.css`, about lines 897–901) hides `.experience` and `.pilot-lab`, but Topic 5–8 experiences lack that class and print with their controls. Debrief and source-panel text (`#d8e7e2`, `#c6d7d2`) disappears on white paper. H1s print at about 7rem.
- Hide navigation, pager, contents list, reset and "Open debrief" in print. Force black text and no background on `.debrief-content`, `.source-panel` and `.coverage-section`. Set `h1 { font-size: 24pt }`, `h2 { font-size: 16pt; break-after: avoid }`, and `break-inside: avoid` on sections, artifacts, figures and tables. Print link URLs after external links.
- Add the class `experience` to every experience root and print workbenches in their current state. Keep the debrief in the DOM with `hidden` when closed, and show it in print.
- Verify: print preview of `/faculty/choose-and-govern-lis/` and `/lessons/build-the-new-test/` with background graphics off shows only black, readable text.

**VIS-09 · P2 · Make labels readable when projected.**

- The CSS sets text at 8 px once, 9 px ten times, 10 px 33 times and 11 px 27 times, mostly uppercase labels and table headers. Convert all font sizes to rem with a floor of `.75rem` (12 px); keep `letter-spacing: .06em` for uppercase labels. The handwriting fields on the paper requisition may stay small for realism.
- Darken `--muted` from `#60716c` to `#55665f` (Phase 5 lists the measured ratios; it is 4.2:1 today on the `#e6e9e2` header bars).
- Optional: a `?present` query flag that sets `html.present { font-size: 125% }` for faculty projecting a lesson.
- Verify: with the browser font size at 20 px, labels scale, and no computed font size is below 12 px outside the requisition.

**VIS-10 · P3 · Small styling defects.**

- `--green-pale` is used (about `styles.css` lines 128 and 254) but never defined, so `.debrief-ready` loses its background. Add `--green-pale: #e9f2ed`.
- Breakpoints sit at both 700 and 720 px. Change every `max-width: 700px` to 720 px.
- `.lesson-meta > div:last-child { text-transform: capitalize }` (about line 112) renders "35 Minutes" and "Faculty Guide". Remove it.
- `theme-color` in `index.html` is dark green (`#122724`) above a cream header; set it to `#f4f1e8`. Make the favicon (a gold "P") match the "PI" header mark.
- Add `<meta name="color-scheme" content="only light">` so phone browsers do not auto-darken the paper artifacts. A designed dark theme can come later, after VIS-05's tokens exist.

## Phase 7 — Engineering, tests and build

The architecture is simple and fits the job: a static Vite and React site, deep links that work on GitHub Pages, strict TypeScript, about 96 strong logic tests, and a deploy that runs only after tests pass. The problems are maintainability, missing tests for what learners actually see, and no license. **Do ENG-01 and ENG-02 before Phase 1**: CI on pull requests catches mistakes in every later phase, and a format-only commit made after content edits causes merge conflicts.

**ENG-01 · P1 · Run CI on every pull request.**

- `.github/workflows/publish.yml` runs only on pushes to `main`, so pull requests merge on the agent's own test logs. Add `.github/workflows/ci.yml` on `pull_request` and non-main pushes: Node 22 with npm cache, `npm ci`, then `npm run test:curriculum && npm run test:unit && npm run build:pages`. Upload `pages-dist` as a downloadable artifact. Set `permissions: contents: read`.
- Add the format, lint and browser checks to this workflow as they land. Document in README that the author should turn on branch protection requiring the `ci` check.
- Verify: a pull request with a deliberately broken test shows a red check.

**ENG-02 · P1 · Add a formatter and linter, then reformat once.**

- 63% of component code and 81% of `src/data` sits on lines over 160 characters, up to 2,269 characters (`curriculum.ts`, about line 289). Diffs, reviews, merges and exact-string edits all suffer. There is no Prettier, ESLint or `.editorconfig`.
- First replace the test that regex-matches `App.tsx` source text (`tests/topic7.test.tsx`, about lines 59–60) with an assertion on an exported value, or delete it once the early-debrief allowlist is removed (ENG-03 below).
- Add Prettier (`printWidth: 100`, double quotes, trailing commas), `.prettierignore` (`pages-dist`, `src/generated`, `review`, `package-lock.json`, `*.mdx` — MDX is excluded so learner prose is not reflowed), and `.editorconfig`. Run Prettier on `src`, `scripts`, `tests`, `content/lessons/*/interaction.ts` and `vite.config.ts` in one formatting-only commit, and add its SHA to `.git-blame-ignore-revs`.
- Add ESLint with `typescript-eslint`, `eslint-plugin-react-hooks` and `eslint-plugin-jsx-a11y`. Add `format`, `format:check` and `lint` scripts and run the checks in CI and `npm test`.
- Add an "Engineering conventions" section to AGENTS.md: run `npm run format` before committing; do not hand-compress JSX.
- Verify: `format:check` and `lint` pass, and the built site looks identical to the screenshots in `review/`.

**ENG-03 · P1 · Put each lesson's data in its own folder and delete the dead copy.**

- About 40 KB of case data in `src/data/curriculum.ts` (about lines 163–256) is never shown for 18 of the 23 lessons, yet it is validated, tested, and both READMEs tell editors to edit it. Editors who follow the docs change text nobody sees.
- Move the entries that are rendered (lessons 5–9) into each lesson's `interaction.ts`. Delete the other 18, plus `LegacyCaseSeed`, `toChoices` and `feedbackFor` once lessons 5 and 6 are rebuilt (TEACH-01).
- Delete the `allowsEarlyDebrief` array and the locked-debrief branch in `App.tsx`, so every lesson shows "Open debrief". Make `experience` required in `LessonManifest` so nothing silently falls back to "generic".
- Update `scripts/validate-curriculum.ts` and `tests/curriculum.test.ts`, which pin text learners never see. Rewrite `README.md` and `content/README.md` to say each lesson's structured data is in `content/lessons/<slug>/interaction.ts`.
- Verify: all 23 lesson routes render unchanged; spot-check lessons 5–9.

**ENG-04 · P1 · Test what learners actually see.**

- Nothing renders routes or MDX, there is no browser or automated accessibility test, four experiences (Autoverification, Orientation, ReflexRule, SpecimenRouting) are never rendered in a test, and `tests/` is outside `tsc`.
- Add `"tests"` to `tsconfig.json` `include`.
- Add `tests/routes.test.tsx`: render every lesson page (export `LessonPage` or a `renderRoute(path)` helper from `App.tsx`) and assert one H1 and the "Open debrief" control.
- Add `@playwright/test` and `@axe-core/playwright` with a `playwright.config.ts` whose web server is `npm run build:pages && npm run preview:pages`. Test all 55 routes (read them from `pages-dist/curriculum-coverage.json`) at 1365×900 and 390×844, plus 320 px for reflow: no page or console errors, no horizontal overflow, a visible H1, no serious or critical axe violations, and "Open debrief" reveals and focuses `#lesson-debrief`. Move the useful flows from `review/*/check-browser.cjs` into `tests/e2e/`. Add `test:e2e` and run it in CI.
- Add the accessibility checks listed at the end of Phase 5, and a link checker for internal routes (external links weekly, with retries).
- In the validator, derive the lesson count from the folders in `content/lessons` and the objective count from `topics`, instead of hard-coding 23 and 34.
- Verify: throwing inside one experience on a scratch branch fails both the route test and the browser test.

**ENG-05 · P1 · Make the curriculum validator check teaching, not just mapping.**

- `scripts/validate-curriculum.ts` (about lines 9–13) only checks that each objective ID is mapped somewhere. Its Topic 2 check (about lines 117–126) cannot fail and counts unpublished plans. Only 5 of 23 lessons have coverage claims.
- Using the registry from NAV-03: each topic's objectives must equal the registry's (counts 4, 4, 4, 5, 5, 4, 4, 4); each summary has 12 words or fewer.
- Extend `PierCoverageClaim` in `src/data/types.ts` with `taughtIn: ("interaction" | "learner-mdx" | "faculty" | "practicum")[]` and `evidence: { file: string; contains: string }[]`. Require claims on every lesson, matching `pierObjectives` in both directions, and check that each evidence file contains its text.
- Fail unless each objective has at least one published (non-draft) lesson with a primary claim taught in an interaction. Report objectives covered only in faculty or practicum material. Fail a primary claim on a "generic" lesson unless it is a draft.
- Compute the hub coverage sentence from the claims, for example "31 of 34 objectives have a primary interactive lesson; 3 in development".
- Also check: the faculty guide's "Allow N minutes" is within 10 minutes of `durationMinutes`; acronyms are spelled out at first use (WRT-01); the correct-option length rule (TEACH-02) for every lesson, not only Topic 3; each `introduction.mdx` H1 matches the manifest title.
- Verify: removing "4.2" from lesson 10's claims makes the validator fail.

**ENG-06 · P1 · Add a license, citation and version.**

- There is no LICENSE, `CITATION.cff`, version or "last updated" date, so by default no one else may legally reuse or adapt the lessons. The license choice is decision D-07.
- Once decided: add `LICENSE` for code and a content license for `content/**`; keep third-party material under its own terms, as `content/SOURCES.md` records. Add `CITATION.cff` (author, title, URL, version, release date, license). Add "How to cite and reuse" to the README and the About section.
- Inject build metadata in `vite.config.ts` (`__BUILD_DATE__`, `__COMMIT__` from `GITHUB_SHA`) and show "Version \<sha> · Updated \<date>" in the footer. Add `CHANGELOG.md`, updated per merged pull request.

**ENG-07 · P1 · Split the JavaScript bundle by lesson.**

- One chunk of about 934 kB (about 260 kB gzipped) holds all 23 lessons, every MDX file and every faculty guide, and is re-parsed on every page load. Lesson 3's CSV ships twice.
- Switch the `import.meta.glob` calls in `src/content.tsx` to lazy loading and expose `lessonContent(slug)` returning cached `React.lazy` components. Load experiences with `React.lazy`. Wrap the lesson body in `<Suspense>` with a short "Loading lesson…" placeholder of fixed height. Keep the hub, topic pages and site frame in the entry chunk. Set `build.chunkSizeWarningLimit: 300`.
- Optional: serve lesson 3's download from a `Blob` of the inlined CSV string.
- Verify: the entry chunk is under about 120 kB gzipped, and `/lessons/pixel-budget/` loads only the entry chunk plus that lesson's chunks.

**ENG-08 · P2 · Check that numbers in MDX match the data, and validate the CSVs.**

- MDX states numbers (210, 245, 455, 35, 27, 3.3, 2.7, 8.4, 9.5, 3.0, 2.5, 3.8 in lesson 3) that nothing checks against the data. Add `facts.ts` for lessons 3, 4, 16 and 19 and a `tests/mdx-facts.test.ts` that fails with a readable message such as "debrief.mdx says 8.4 but the data gives 8.5".
- `scripts/compile-lesson-data.mjs` copies the CSV without checks. Validate the header, column count per row, allowed values (`period` is baseline, cutover or stabilized; yes or no), and that numeric columns parse, and exit with a plain message naming the line.
- Replace hard-coded counts with array lengths: `of 6` and `=== 6` (`FlagExperience`), `of 8` and `=== 8` (`NewbornExperience`), `roles === 7` (`TerminologyExperience`), `monitor.length === 4` (`MitosisReviewExperience`), `of 3` (`PrivacyExperience`), `of 7` (`DataQualityExperience`).

**ENG-09 · P2 · Contain errors to one lesson.**

- There is no error boundary. Renaming an id in an `interaction.ts` makes a `find(...)!` return undefined and blanks the whole page, including navigation.
- Add `LessonErrorBoundary` around the experience and, separately, around each MDX block, keyed by slug, with the fallback "This interactive exercise could not load. The case introduction, debrief and faculty guide are still available below." Replace `find(...)!` on editor-controlled data with `mustFind(list, pred, label)`, which names the missing id.
- Verify: changing "AV-01" to "AV-99" in a scratch branch still shows the introduction, fallback and debrief button.

**ENG-10 · P2 · Build one set of shared lesson components.**

- Topics 1–4 and 5–8 implement section headings, feedback, selects and reset separately; reset is hand-written 22 times, and two lessons keep table filters through reset.
- Create `src/components/lesson-ui/` with `LessonSection` (TEACH-09), `Feedback` (VIS-01 and A11Y-02 — one component), `ChoiceGroup` (native radios, A11Y-04), `SelectField` (was `Topic5Select`), `TabList` (A11Y-05), `ScrollRegion` (A11Y-07), `DataTable`, `ReplayResultList`, `SourceInspector` and `MdxBlock` (was `Teaching`).
- Make reset generic: `LessonPage` holds `resetKey` and renders `<Experience key={resetKey} …/>`; Reset increments it after confirmation (ACC-09). Delete the hand-written reset functions as each lesson migrates.
- Migrate one lesson per pull request, smallest first (Newborn, Flag, Queue … DataQuality), re-exporting the old names from `Topic5Common.tsx` until the last caller moves. Replace topic-number CSS classes (`topic5-page`, `topic8-page`) with a manifest `layout` field.

**ENG-11 · P2 · Remove dead code and stale assets.**

- Delete `PilotLabs.tsx`, the `pilot` field and values, its validator lines and its test, and fix README line 9 ("Four distinct pilot interaction patterns").
- Remove unused `LessonExperience` members once TEACH-01 uses or drops them, and `@mdx-js/react`, which is never imported.
- Move `public/assets/synthetic-wsi-field.webp` (259 KB, deployed but unused) to `content/source-assets/` and update the image scripts and `content/SOURCES.md`.
- Move `src/data/topic2Plan.ts` to `content/plans/`; rename `topic7Plan.ts` to `topic7Coverage.ts` or fold it into the manifests (ENG-14).

**ENG-12 · P2 · Fix the build and preview scripts.**

- `npm test` ends with `npm run build`, which overwrites `pages-dist` with base `/`, so a later `preview:pages` shows a blank page. Set `base` once in `vite.config.ts` (`process.env.PAGES_BASE ?? "/pathology-informatics-interactives/"`), let `dev` override it, and make `build:pages` an alias of `build`.
- In `scripts/serve-pages-build.mjs`: add PNG, JPEG and WOFF2 MIME types; return 400 on malformed URLs; check `target === root || target.startsWith(root + sep)`; return status 404 (not 200) with `404.html`.
- Verify: `build:pages`, then `npm test`, then `preview:pages` still renders the site.

**ENG-13 · P2 · Give each route its own title, description and link preview.**

- `scripts/create-pages-fallback.mjs` copies one identical HTML shell into all 54 route folders, so link previews in email, Slack or a learning management system all read "Pathology Informatics Interactives".
- Per route, write the title ("Lesson title | Pathology Informatics Interactives"), meta description (the lesson `summary` from NAV-05), canonical link, Open Graph and Twitter tags, and one default 1200×630 preview image. Generate `sitemap.xml` and `robots.txt`. Add an `apple-touch-icon` and a minimal web manifest.
- Whether faculty routes get `noindex` is decision D-08.

**ENG-14 · P2 · Keep each lesson's manifest in its folder.**

- Editing one lesson touches four to six files, lesson numbers come from array position (inserting a lesson renumbers all later ones), and titles are duplicated between the manifest and `introduction.mdx`.
- Create `content/lessons/<slug>/lesson.ts` with an explicit `id`, title, topic, objectives, coverage claims, sources, `experience`, duration, difficulty, `summary` and practicum flag. Build `lessons` from a glob sorted by `id`; give the Node scripts a small `loadLessons()`. Fold `topic7Plan.ts` into the Topic 7 lessons.

**ENG-15 · P3 · Housekeeping.**

- Workflow: move `pages: write` and `id-token: write` into the deploy job only; set `cancel-in-progress: false`; add Dependabot for npm and GitHub Actions. Remove or document `allowScripts` in `package.json`.
- Images: add `width`, `height`, `loading="lazy"` and `decoding="async"` to the lesson 19 images. Do not convert those PNGs to another format; their byte sizes are part of the lesson.
- Stop committing screenshots to `review/` once the browser tests upload them as CI artifacts; keep the `QA.md` text notes.
- Add a CSS check that every `var(--x)` has a definition. Define one `ExperienceProps` type so the experience registry needs no inline lambdas, and replace select-value casts with a typed `SelectField<T>`.
- Optional, if the author wants work to survive navigation (D-03): a small client-side router and `sessionStorage` lesson state. The hooks-order fix in ACC-09 must come first.

## Decisions for the author

The implementing AI must not settle these on its own. Record an answer in the last column before the related phase starts; until then, do the items' other parts and leave these as they are. Separately, the author reviews all new clinical and regulatory text (ACC-15, TEACH-11, TEACH-12) before it merges.

| ID | Decision | Options | Reviewers' recommendation | Your decision |
| --- | --- | --- | --- | --- |
| D-01 | How many lessons for PIER 2.4 (AI) | One rebuilt `model-under-pressure`; or two, following `topic2Plan.ts` | One lesson with three parts (TEACH-01); two only if 26 minutes is too short |  |
| D-02 | Where the faculty guide link sits | Keep it in the lesson header; or move it to the end of the lesson only | Move it to the end, labeled "contains answers" (NAV-02) |  |
| D-03 | Whether to keep any learner progress | None; answers kept for the current tab only (`sessionStorage`); a learner-controlled "reviewed" checkmark saved only in the browser | None for now, plus new-tab faculty links; README promises no durable progress records |  |
| D-04 | Lesson 11 delta rule | (a) Scope the rule to serial troponins (no test changes); (b) treat a missing prior as "not applicable" (AV-06 and AV-07 become Release; tests change) | (a) now (ACC-05) |  |
| D-05 | HbA1c repeat-review window in lessons 17 and 18 | 90 days; another local interval | 90 days, inclusive (ACC-07) |  |
| D-06 | Lesson 21 reader-study design | Each reader read a different five slides (keeps data and tests); all four read the same five (counts change) | Different five slides each (ACC-08) |  |
| D-07 | License | Code: MIT or similar. Content: CC BY 4.0, or CC BY-NC-SA 4.0 to bar commercial reuse | Choose before ENG-06 |  |
| D-08 | Whether search engines index faculty guides | Index them; or add `noindex` to `/faculty/` routes | Author's call (ENG-13) |  |
| D-09 | Lesson titles | Keep current titles; adopt one parallel form (table below) | Present options five at a time, about three choices each, per AGENTS.md |  |
| D-10 | Recommended order | Numeric order only; also show a suggested path (below) | Show both; numeric order stays the default (NAV-01) |  |
| D-11 | Lesson 3 requisition stamp | Change to "ACCESSIONED (paper)"; or keep "RECEIVED" and explain receipt equalled accession during cutover | Either (ACC-12) |  |

**D-09 proposed titles.** Slugs and URLs stay the same. Lessons 11–14 and 16–23 already use the proposed form and are unchanged. Changing a title means updating the manifest, the introduction and faculty H1s, and `tests/curriculum.test.ts`.

| Lesson | Current title | Proposed title |
| --- | --- | --- |
| 1 | Who Does What in Laboratory Informatics? | Assigning Roles Before a Troponin Go-Live |
| 2 | The Missing CBC | Tracing a Delayed Complete Blood Count Result |
| 3 | Can We Trust This Report? | Checking a Turnaround-Time Report After an LIS Go-Live |
| 4 | Can We Accept This Lot? | Evaluating a New Troponin Reagent Lot |
| 5 | Five Vs in the Slide Archive | Planning Storage and Data Flow for a Digital Slide Archive |
| 6 | Model Under Pressure | Verifying an AI Metastasis Detector Locally |
| 7 | The Server Behind the Analyzer | Reviewing Security for a Laboratory Middleware Server |
| 8 | Twelve Hours Offline | Running the Laboratory Through a 12-Hour Network Outage |
| 9 | Not Anonymous Enough | Reviewing a Research Export for Identifiable Data |
| 10 | Where Is the Specimen? | Tracing a Specimen Sent to the Wrong Worklist |
| 15 | Why Laboratory Results Need LOINC | Mapping Glucose Results to LOINC |

**D-10 suggested path.** It respects prerequisites; for example, lessons 5 and 6 rely on imaging and accuracy terms taught in lessons 19 and 21.

1. Foundations: lessons 1, 2
2. LIS and messages: 10, 13, 14, 15
3. Data: 3, 4, 16
4. Rules and builds: 11, 12, 22
5. Security and continuity: 7, 8, 9
6. Decision support: 17, 18
7. Images, then big data and AI: 19, 20, 21, 5, 6
8. Capstone: 23

## Final acceptance checklist

The work is done when every box below is true on the deployed site.

- [ ] CI runs on every pull request, and `npm test`, `npm run build:pages`, `format:check`, `lint` and the browser tests pass.
- [ ] All 55 routes render without console errors and without horizontal scrolling at 1365, 390 and 320 px.
- [ ] Every lesson shows "Open debrief" before any interaction, and opening it moves focus to the debrief.
- [ ] Every lesson has previous and next links, and the faculty guide opens in a new tab labeled as containing answers.
- [ ] Every objective code on the site shows its plain-language summary.
- [ ] Lessons 5 and 6 are rebuilt, or marked as drafts and excluded from the hub's coverage count.
- [ ] The validator fails when an objective lacks a published primary lesson that teaches it through an interaction, and the hub sentence is computed from the claims.
- [ ] Every number in MDX that comes from data is checked by a test.
- [ ] No learner sees generic feedback: `rg -n "This explains the findings|This does not explain all|\"Correct\.|\"Not quite\." src content` returns nothing.
- [ ] Each Phase 1 item is fixed, and its "Verify" step has been run.
- [ ] axe reports no serious or critical violations; the focus ring is visible on every surface; feedback is announced in NVDA with Chrome and VoiceOver with Safari, checked in one lesson per topic.
- [ ] A license, citation file, version and "last updated" date are on the site and in the repository.
- [ ] README, `content/README.md`, AGENTS.md and CHANGELOG describe the new structure.
- [ ] The author has recorded every decision in the table above and reviewed all new clinical and regulatory text.
- [ ] Desktop and phone screenshots of each changed lesson are attached to its pull request or CI run.
