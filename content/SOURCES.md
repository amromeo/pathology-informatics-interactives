# Source and attribution ledger

## Curriculum authority

- **PIER Essentials, Release 5 (2025)** — CAP/AAPath/API. Used only to align
  lesson coverage to objective identifiers. The toolkit is licensed CC
  BY-NC-ND 4.0; its pages, tables, supplied messages, and exercise wording are
  not reproduced or modified in this project.
- Source: <https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf>

## Supplemental teaching source

- **Pathology Informatics Introductory Course** — James H. Harrison, Jr., MD,
  PhD, with Ronald Jackups, MD, PhD credited on the 2026 CDS session. The ten
  slide and term-list sets are licensed CC BY 4.0. This project adapts concepts
  and terminology while providing original narratives, artifacts, questions,
  and visuals. Changes include case-based sequencing, resident decisions,
  corrective configuration, and regression testing.
- Source: <https://www.pathologyinformatics.org/teaching-slide-sets>

| API session | Curriculum use |
| --- | --- |
| 0. Pathology Informatics and Data | Lessons 1, 3, 4, and 16 |
| 1. Hardware, Software, and Networking | Lesson 2 |
| 2. Databases | Lessons 3–5 and 16 |
| 3. LIS and Health Information Systems | Lessons 1–2, 10–13, 16, 22, and 23 |
| 4. Interoperability and Interfaces | Lessons 13–16 |
| 5. Digital Imaging | Lessons 5 and 19–21 |
| 6. Artificial Intelligence | Lessons 6 and 21 |
| 7. Clinical Decision Support | Lessons 12 and 17–18 |
| 8. Cybersecurity | Lessons 7–9 |
| 9. Implementation and Management | Lessons 1, 8, 11–12, and 22–23 |

The slide-level planning map for every tutorial is maintained in
[`content/HARRISON-SLIDE-MAP.md`](HARRISON-SLIDE-MAP.md). It records the exact
sessions and slide ranges that should shape each case and learner decision.

## Additional professional guidance

- **Krasowski et al. (2014), Autoverification in a core clinical chemistry
  laboratory at an academic medical center** — Primary institutional report,
  CC BY. Informs Lesson 11's distinction among multiple release checks,
  test-environment validation, and clinical approval. The original case policy,
  thresholds, records, and branching exercises are not reproduced from the
  reported institution. Source: <https://pmc.ncbi.nlm.nih.gov/articles/PMC4023033/>.
- **American Thyroid Association, Thyroid Function Tests** — Clinical background
  for Lesson 12's explanation of TSH and FT4. No text or figures reproduced;
  the exact reflex thresholds, population, and order workflow are the case's
  separately approved protocol, not an ATA reflex-testing recommendation.
  Source: <https://www.thyroid.org/thyroid-function-tests/>.

- **UK Government Data Quality Framework** — Used in Lesson 3 for the formal
  definitions of accuracy, completeness, consistency, timeliness, validity,
  and uniqueness. Definitions are paraphrased and followed by original
  surgical pathology examples. Fitness for purpose is taught as the overall
  judgment required by PIER Topic 2.1. Licensed under the Open Government
  Licence v3.0.
- Source: <https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework>

- **Harrison/API sessions 0 and 2** — Slides 15–20 in session 0 and slides
  24–26 in session 2 inform Lesson 3's explanation of data representation,
  related data-quality language, and the path from data creation to use. The
  lesson paraphrases the ideas, explicitly labels the PIER–Harrison pairs as
  related rather than identical, and uses an original surgical pathology case.

- **CLSI EP26 — User Evaluation of Acceptability of a Reagent Lot Change.**
  Used in Lesson 4 to support comparison with patient samples, acceptance
  criteria established before testing, and medical review of a reagent-lot
  change. The interactive case is an original teaching example and is not a
  complete EP26 procedure.
- Source: <https://clsi.org/shop/standards/ep26/>

- **NIST/SEMATECH e-Handbook of Statistical Methods.** Used in Lesson 4 for
  paired observations, descriptive statistics, confidence intervals,
  hypothesis testing, and the selection of common statistical tests. The
  explanations and all numerical examples are independently written.
- Source: <https://www.itl.nist.gov/div898/handbook/>

- **Harrison/API sessions 0 and 2** — Slides 10 and 18–20 in session 0 and
  slides 6, 12, and 24–26 in session 2 provide background on the source and use
  of the paired data in Lesson 4. They are not presented as the source of the
  lesson's statistical methods.

- **HHS Office for Civil Rights — Guidance Regarding Methods for
  De-identification of Protected Health Information.** Used in Lesson 9 to
  distinguish the HIPAA Safe Harbor and Expert Determination methods and to
  explain why a disclosed reidentification mechanism matters. The lesson's
  18-row dataset and uniqueness exercise are original and synthetic.
- Source: <https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html>

- **HHS Office for Civil Rights — HIPAA Audit Protocol.** Used in Lesson 9 for
  the limited-data-set pathway: retained dates or geography do not make a file
  deidentified, and an eligible purpose, appropriate recipient, and data use
  agreement are required. Local privacy-office and legal review remain
  authoritative.
- Source: <https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/audit/protocol/index.html>


- **Henricks WH, Wilkerson ML, Castellani WJ, Whitsitt MS, Sinard JH — “Pathologists as Stewards of Laboratory Information.”** Used in Lesson 1 to explain why pathology remains responsible for the integrity and effective use of laboratory information even when it is displayed or used in systems outside the laboratory's direct administrative control. The article is cited and summarized; its wording is not reproduced.
- Source: <https://pubmed.ncbi.nlm.nih.gov/25724030/>

- **College of American Pathologists — “Don't Forget Your Rules When Harmonizing Laboratory Testing Across Multiple Sites.”** Used in Lesson 1 to support the laboratory's responsibility to verify accurate transmission of patient results into the EHR. The article discusses CAP checklist requirement GEN.48500 and validation in the downstream system clinicians use. The lesson cites and summarizes the principle; CAP wording is not reproduced.
- Source: <https://www.cap.org/education/pathology-subspecialties/clinical-informatics/clinical-informatics-resources/dont-forget-your-rules-when-harmonizing-laboratory-testing-across-multiple-sites/>

## Asset policy

All interface displays, logs, tables, messages, and image artifacts in this
project are synthetic. API graphical assets are not reused. Any future external
asset must be added here with creator, URL, license, required attribution, and
the exact lesson in which it appears.

- `content/source-assets/synthetic-wsi-field.png` — AI-generated source for this project with
  the built-in OpenAI image-generation tool on August 17, 2026. Prompt: an
  original synthetic H&E-style field with focused tissue and a subtly blurred
  folded region for a digital-pathology validation exercise; no labels,
  identifiers, diagnosis, interface chrome, or watermark. The deployed Lesson
  20 asset is an archived optimized `content/source-assets/synthetic-wsi-field.webp` derivative.

## Topic 5 implementation sources

PIER R5 Topic 5 guides objectives 5.1–5.5; original cases replace the toolkit's
sample message. Harrison/API slide ranges are recorded in HARRISON-SLIDE-MAP.md.

- HL7 specification lifecycle: https://projectlifedashboard.hl7.org/specification-lifecycle/
- HL7 observation interpretations: https://terminology.hl7.org/4.0.0/CodeSystem-v3-ObservationInterpretation.html
- FHIR R4 Observation: https://hl7.org/fhir/R4/observation.html
- LOINC newborn-screening panel (54089-8): https://loinc.org/54089-8
- Overall interpretation and answer list: https://loinc.org/57130-7
- Condition-specific counterexample: https://loinc.org/46746-4
- LOINC dimensions: https://loinc.org/kb/users-guide/major-parts-of-a-loinc-term
- Glucose property comparison: https://loinc.org/2345-7 and https://loinc.org/14749-6
- SNOMED CT purpose: https://www.snomed.org/what-is-snomed-ct
- UCUM specification: https://ucum.org/ucum
- DICOM whole-slide microscopy: https://dicom.nema.org/medical/dicom/final/sup145_ft.pdf
- CAP cancer protocols: https://www.cap.org/protocols-and-guidelines/cancer-protocols/current-cancer-protocols/

Sources checked September 10, 2026. No production clinical threshold, universal
receiver behavior, billing assignment, or national public-health routing rule
is inferred. Queue records and interface contracts are original. LOINC codes
and short definitions are attributed to Regenstrief; see https://loinc.org/license.
Other sources are cited and paraphrased, not reproduced as teaching slides.

## Topic 6: clinical decision support

Primary framework sources checked during the September 10 build:
- CMS eCQI, About CDS: https://ecqi.healthit.gov/cds/about — five rights and CDS forms.
- AHRQ PSNet, Alert Fatigue: https://psnet.ahrq.gov/primer/alert-fatigue — relevance, repetition, and attention.
- PIER Essentials R5, Topic 6: https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf — curriculum coverage.

API/Harrison Session 7 informs the teaching sequence: slides 6–18 and 22–32
for workflow and forms; slides 28–45 for limitations and evaluation, as recorded
in the slide map. The records, rule specification, audit, pilot data, and safety
event are original. No source is offered as a universal HbA1c repeat interval.

## Topic 8 sources — checked October 22, 2026

- PIER Essentials R5, Topic 8: https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf
- 42 CFR 493.1291, report accuracy, content, availability and corrections: https://www.ecfr.gov/current/title-42/section-493.1291
- ASTP/ONC SAFER Guides, organizational responsibility, system management and contingency planning: https://healthit.gov/clinical-quality-and-safety/safer-guides/
- NIST SP 800-34 Rev. 1, contingency planning and lifecycle reference: https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final

Harrison/API source ranges remain Session 3 (7–13, 18) and Session 9 (7–10,
22–29) for lesson 22; Session 3 (3–13, 20–25) and Session 9 (3–29) for lesson 23.
The assay procedure, specimen restriction, vendor evidence, ratings, costs, and
recovery targets are original case specifications, not claims about a named
product or universal requirements. Consult authorized current accreditation
materials locally; no proprietary checklist is reproduced. NIST guidance is a
planning reference, not an asserted laboratory accreditation requirement.

## Topic 7: digital pathology systems

Primary sources checked October 22, 2026. PIER R5 page 16, objectives 7.1–7.4,
was inspected directly. Coverage includes capture/storage/retrieval/viewing,
static/live/whole-slide applications, formats/resolution/compression/displays,
image analysis and productivity, and validation/regulatory requirements. Existing
cross-topic 2.4 coverage is retained. the Topic 7 `lesson.ts` manifests records observable
learner actions. Harrison/API slide ranges remain those in the planning map;
concepts are adapted under CC BY 4.0, with original cases and interactions.

- DICOM PS3.3 **2026d**, A.32.8:
  https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_A.32.8.html
  — whole-slide tiles, frames, and resolution layers.
- DICOM PS3.3 C.8.12.4:
  https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.8.12.4.html
  — samples, bit allocation, acquisition information, and lossy-compression
  history. This replaces reliance on the historical Supplement 145 alone for
  current Topic 7 teaching. DICOM exchange is not clinical validation.
- CAP WSI validation guideline, online 2021 / print 2022, active when checked:
  https://www.cap.org/cap-guidelines/validating-whole-slide-imaging-for-diagnostic-purposes-in-pathology/
  and the formal summary:
  https://www.cap.org/wp-content/uploads/documents/wsi-summary-recommendations.pdf
  — representative application-specific cases, same-reader comparisons,
  discordance investigation, and read interval. The formal recommendation
  calls for investigation and attempted remedy below 95%; it is not an automatic
  approval rule above 95%. The case's corrective-evidence and signoff conditions
  are local decisions. No CAP table, figure, or checklist is reproduced.
- FDA DEN160056 decision summary:
  https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN160056.pdf
  — historical example of a system with defined components and specimen scope;
  not current labeling for every product. Local validation and device authorization
  answer different questions. Actual product labeling and jurisdiction must be checked.
- FDA statistical diagnostic-test guidance (2007, final):
  https://www.fda.gov/regulatory-information/search-fda-guidance-documents/statistical-guidance-reporting-results-studies-evaluating-diagnostic-tests-guidance-industry-and-fda
  — reference standards, sensitivity/specificity denominators, and case mix.
- IMDRF **N88 FINAL:2025**, GMLP:
  https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles
  — independent representative evaluation, human–AI use, and lifecycle monitoring.
- FDA/Health Canada/MHRA transparency principles:
  https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/transparency-machine-learning-enabled-medical-devices-guiding-principles
  — context of use, human–AI performance, and useful information for reviewers.

### Topic 7 asset provenance and limits

The existing project-generated `content/source-assets/synthetic-wsi-field.webp` was
visually inspected and reused. No external clinical image or proprietary display
was copied. `scripts/topic7-images.mjs` extracts 512 × 512 pixel fields at
(100,300) and (700,0), measured from the source's upper-left corner. Each field
is saved as a decoded-reference PNG, resized to 128 × 128 PNG, and encoded at
JPEG quality 12 with 4:2:0 chroma subsampling. Sharp performs the transformations;
`images.json` records actual dimensions and encoded byte counts.

The source already has WebP encoding and a blurred region. Lossless PNG preserves
decoded source pixels, not a never-compressed scanner original. The displayed
comparison demonstrates sampling and encoding effects only; it cannot support
diagnostic equivalence, morphology assessment, or a clinical compression limit.
The physical-scale storage calculator is a separate explicitly stated planning
model. Clinical cases, study observations, candidate scores, and monthly reports
are original, independently authored records; no observed reader effect is
predicted from the adjustable candidate threshold.

## Topic 5 LOINC teaching revision — October 22, 2026

Official term pages 2345-7 and 14749-6 and the LOINC major-parts guide were inspected. Both terms are active and method-unspecified; they differ in MCnc versus SCnc. SearchLOINC redirected to sign-in, so the lesson includes public term-page alternatives. A lookup does not validate analytical equivalence or perform unit conversion.

Primary publication abstracts retrieved through PubMed:
- Stram M et al. Archives of Pathology & Laboratory Medicine. 2020;144:586–596. DOI 10.5858/arpa.2019-0276-OA. PMID 31603714. https://pubmed.ncbi.nlm.nih.gov/31603714/
- McDonald CJ et al. JAMIA. 2023;30:301–307. DOI 10.1093/jamia/ocac215. PMID 36343113. https://pubmed.ncbi.nlm.nih.gov/36343113/

The CAP survey's code-level 54/275 estimate and the PCORnet result-weighted 4.6% are presented with their populations and denominators, not pooled or generalized to all laboratories. The lesson does not rely on claims beyond those abstracts. All catalog records and learner tasks are independently authored.

## API reading integration — 2026-10-23

The ten original PowerPoint decks were retrieved from the API course archive and their slide text inspected. Focused learner readings and faculty prompts are recorded in [the verified reading map](../review/api-teaching-slides/mapping.md). The older Harrison plan remains planning context; the new map records the narrower readings actually linked in the lessons. All links point to API originals. No deck or image is redistributed. Original slide content is CC BY 4.0; third-party assets retain their individual terms. No new clinical or standards requirements are adopted from these teaching slides.

## October 24, 2026 review additions

- [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html): safeguards, risk analysis and business associate responsibilities; paraphrased.
- [HHS breach notification guidance](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html): assessment and notification; paraphrased.
- [HHS Part 2 guidance](https://www.hhs.gov/hipaa/part-2/index.html): additional record protections; compliance date February 16, 2026.
- [CMS QSO-23-15-CLIA, October 14, 2026](https://www.cms.gov/files/document/qso-23-15-clia-revised-2026-10-14.pdf): remote digital review conditions and cytology exception. Supersedes the review's September 2025 reference.
- [42 CFR 493.1253](https://www.ecfr.gov/current/title-42/section-493.1253): verification versus establishment of performance specifications.
- [FDA good machine learning practice](https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/good-machine-learning-practice-medical-device-development-guiding-principles): representative evaluation and monitoring.
- [HL7 v2.5.1, chapter 7](https://www.hl7.eu/HL7v2x/v251/std251/ch07.html): result-message fields.

All new clinical and regulatory teaching remains subject to author review before merge. No source text or figures have been reproduced.
