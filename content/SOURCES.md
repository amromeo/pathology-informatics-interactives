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


- **Henricks WH, Wilkerson ML, Castellani WJ, Whitsitt MS, Sinard JH — “Pathologists as Stewards of Laboratory Information.”** Used in Lesson 1 to explain why pathology remains responsible for the integrity and effective use of laboratory information even when it is displayed or used in systems outside the laboratory's direct administrative control. The article is cited and summarized; its wording is not reproduced.
- Source: <https://pubmed.ncbi.nlm.nih.gov/25724030/>

- **College of American Pathologists — “Don't Forget Your Rules When Harmonizing Laboratory Testing Across Multiple Sites.”** Used in Lesson 1 to support the laboratory's responsibility to verify accurate transmission of patient results into the EHR. The article discusses CAP checklist requirement GEN.48500 and validation in the downstream system clinicians use. The lesson cites and summarizes the principle; CAP wording is not reproduced.
- Source: <https://www.cap.org/member-resources/clinical-informatics-resources/dont-forget-your-rules-when-harmonizing-laboratory-testing-across-multiple-sites>

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
  20 asset is the optimized `public/assets/synthetic-wsi-field.webp` derivative.
