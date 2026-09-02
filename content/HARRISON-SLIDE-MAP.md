# Harrison/API slide plan for all lessons

This file is the lesson-by-lesson planning map for the API *Pathology Informatics Introductory Course*. It is meant for faculty and content editors. Use it when drafting or revising each lesson so the Harrison material informs the teaching, the case, and the learner decision—not just the bibliography.

The slide decks were downloaded from the [API teaching-slide page](https://www.pathologyinformatics.org/teaching-slide-sets) and inspected on August 17, 2026. API material is CC BY 4.0. Paraphrase and attribute it; do not copy slide layouts or third-party graphics into a lesson unless the asset-specific license has been checked. PIER R5 remains the curriculum authority.

## Deck inventory reviewed

| Session | Deck | Version reviewed |
| --- | --- | --- |
| 0 | Pathology Informatics and Data | 1.0.1 (2025) |
| 1 | Computer Hardware, Software, Networking, and Data Files | 1.0.3 (2025) |
| 2 | Databases | 1.0.2 (2024) |
| 3 | Laboratory Information Systems and Health Information Systems | 1.0.3 (2025) |
| 4 | Interfaces and Interoperability | 1.0.4 (2025) |
| 5 | Digital Imaging in Pathology | 1.02 (2026) |
| 6 | Artificial Intelligence in Pathology | 1.0.2 (2026) |
| 7 | Clinical Decision Support | 1.0.4 (2026; Harrison and Jackups) |
| 8 | Cybersecurity | 1.0.2 (2025) |
| 9 | System Implementation and Management | 1.0.3 (2026) |

## Lesson plans

### 01 — Who Does What in Laboratory Informatics?

Lesson slug: `steward-at-morning-huddle`

- **Harrison plan:** Session 0, slides 5–13 and 21; Session 3, slides 7–13 and 18; Session 9, slides 4–7.
- **Build into the lesson:** Distinguish hospital IT from the LIS team and from informatics work; introduce the pathologist's responsibility for laboratory information; show the practical roles pathologists have in order, result-report, interface, and CDS work; introduce the LIS team as the group that performs approved builds and technical testing; preserve laboratory review and approval of the complete result report in the EHR.

### 02 — Inside a Result's Journey

Lesson slug: `inside-a-results-journey`

- **Harrison plan:** Session 1, slides 5 and 10–15; Session 3, slide 20.
- **Build into the lesson:** Make learners identify hardware, operating system/application software, LAN components, protocols, and the interface engine as separate failure points. Use the connected-systems view to place the analyzer, LIS, interface engine, and EHR in one trace.

### 03 — Can We Trust This Report?

Lesson slug: `can-we-trust-this-report`

- **Harrison plan:** Session 0, slides 10 and 15–20; Session 2, slides 5–12 and 24–26.
- **Build into the lesson:** Start with structured and unstructured representation, then connect PIER's seven dimensions to Harrison's related terms without treating them as exact synonyms. Trace the accession time from the source document and LIS field through the export and spreadsheet to the quality meeting. The learner must identify the omitted cutover cases, inspect all 455 rows, and choose a fair comparison before the laboratory presents the report.

### 04 — Can We Accept This Lot?

Lesson slug: `can-we-accept-this-lot`

- **Harrison plan:** Session 0, slides 10 and 18–20; Session 2, slides 6, 12, and 24–26.
- **Build into the lesson:** Use the Harrison material only to establish where the paired results came from and how the worksheet is used. The statistical teaching comes from PIER Topic 2.2, the NIST statistical handbook, and reagent-lot guidance. Learners inspect paired troponin results, describe the distribution, interpret the confidence interval and p-value against a limit set before testing, choose common statistical tests, and make a laboratory lot decision.

### 05 — Five Vs in the Slide Archive

Lesson slug: `five-vs-slide-archive`

- **Harrison plan:** Session 2, slides 23–26; Session 5, slides 9, 13–16, and 23.
- **Build into the lesson:** Tie image size and image pyramids to volume and velocity; use PACS and analytic-database architecture to distinguish operational retrieval from secondary analytics; make learners account for metadata, compression, bandwidth, and partial-image access.

### 06 — Model Under Pressure

Lesson slug: `model-under-pressure`

- **Harrison plan:** Session 6, slides 4–13, 21–23, and 28–55.
- **Build into the lesson:** Teach supervised learning, training versus deployment, and model transparency only as needed for the transfer case. Center the decisions on local verification, site variation, artifacts, embedded bias, drift, brittleness, subgroup performance, prospective evaluation, and post-deployment monitoring.

### 07 — The Server Behind the Analyzer

Lesson slug: `server-behind-the-analyzer`

- **Harrison plan:** Session 8, slides 5, 7–8, 13–17, 19–28, and 31–32.
- **Build into the lesson:** Use confidentiality, integrity, and availability as the organizing frame. Have learners apply role-based access, authentication, patching, backup, encryption, VPN/firewall controls, and vendor-access safeguards to a laboratory server rather than recite definitions.

### 08 — Twelve Hours Offline

Lesson slug: `twelve-hours-offline`

- **Harrison plan:** Session 8, slides 13, 16, 21, 27, and 31; Session 9, slides 8, 10–12, and 25–26.
- **Build into the lesson:** Treat availability, backup, downtime/recovery procedures, change control, and go-live contingency planning as one operational problem. Make the recovery sequence account for data that must be reconstructed or reconciled after systems return.

### 09 — Not Anonymous Enough

Lesson slug: `not-anonymous-enough`

- **Harrison plan:** Session 8, slides 5–14.
- **Build into the lesson:** Distinguish permitted operational use, research use, PHI, a limited data set, and deidentification. Make learners confront reidentification from combinations of dates, geography, and rare conditions rather than equating removal of names with anonymity.

### 10 — Where Is the Specimen?

Lesson slug: `where-is-the-specimen`

- **Harrison plan:** Session 3, slides 6–10 and 16–18.
- **Build into the lesson:** Use the specimen-oriented LIS, accessioning links, barcodes, worklists, dictionaries, and specimen tracking to separate identity, location, status, routing, and audit trail. Let the learner diagnose configuration and workflow together.

### 11 — Autoverification at the Edge

Lesson slug: `autoverification-at-the-edge`

- **Harrison plan:** Session 3, slides 7–13; Session 9, slides 7–10.
- **Build into the lesson:** Ground the rule in LIS dictionaries and test parameters, then use build/test/production environments, regression testing, monitoring, and change control. Technical entry by the LIS team should remain separate from laboratory review and signoff.

### 12 — The Reflex Rule Ripple Effect

Lesson slug: `reflex-rule-ripple-effect`

- **Harrison plan:** Session 3, slides 7–13; Session 7, slides 17 and 27; Session 9, slides 7–10.
- **Build into the lesson:** Define reflex testing as an approved order sequence driven by intermediate results, then treat the assay change as configuration and change-control work. Test indicated, non-indicated, boundary, missing-data, and unaffected paths.

### 13 — Follow the Flag

Lesson slug: `follow-the-flag`

- **Harrison plan:** Session 3, slides 18–20; Session 4, slides 3–20.
- **Build into the lesson:** Distinguish message transport from interpretation. Use the LIS–EHR connection, interface engine, HL7 v2 structure, local mapping, and downstream display approval to explain how a message can be received successfully while a flag is interpreted incorrectly.

### 14 — Newborn Screen to Public Health

Lesson slug: `newborn-screen-to-public-health`

- **Harrison plan:** Session 4, slides 3–6, 10–12, 16–21, and 22–34.
- **Build into the lesson:** Use SDOs, HL7 v2, FHIR, LOINC, SNOMED CT/value sets, and UCUM according to their actual roles. The learner should separate syntactic acceptance from a complete, correctly identified, clinically usable public-health message.

### 15 — Code the Meaning, Not the Label

Lesson slug: `code-the-meaning`

- **Harrison plan:** Session 4, slides 16 and 22–32.
- **Build into the lesson:** Make the terminology purpose drive the selection: billing, diagnosis classification, observations, units, clinical concepts, images, and structured AP reporting are not interchangeable. Include LOINC limitations and explicitly reject superficial text matching as evidence of clinical equivalence.

### 16 — The Invisible Bottleneck

Lesson slug: `invisible-bottleneck`

- **Harrison plan:** Session 0, slides 10, 15, and 18–20; Session 2, slides 12 and 24–26; Session 3, slides 20–24; Session 4, slides 13–15.
- **Build into the lesson:** Trace data from operational systems through interfaces into analytic stores before interpreting the dashboard. Make learners check freshness, query performance, lineage, and missing workflow events, then define a measure and intervention that the laboratory can monitor.

### 17 — Five Rights for the Right Test

Lesson slug: `five-rights-right-test`

- **Harrison plan:** Session 7, slides 6–18 and 22–32.
- **Build into the lesson:** Use Type I/Type II decision demands and the Five Rights to choose person, content, format, channel, and timing. Compare search/display, order sets, protocols, reflexes, noninterruptive guidance, and soft/hard stops instead of treating every intervention as an alert.

### 18 — The Alert Everyone Ignores

Lesson slug: `alert-everyone-ignores`

- **Harrison plan:** Session 7, slides 28–45.
- **Build into the lesson:** Have learners diagnose alert fatigue, poor targeting, provider-role differences, automation bias, and weak evaluation. Require a redesign plus process, outcome, burden, and harm measures; do not use acceptance rate alone as the definition of success.

### 19 — The Pixel Budget

Lesson slug: `pixel-budget`

- **Harrison plan:** Session 5, slides 5–16 and 23–26.
- **Build into the lesson:** Connect pixel dimensions, optical resolution, color depth, compression, metadata, pyramids, PACS retrieval, bandwidth, and display calibration. The learner should choose a fit-for-purpose image path, not simply the smallest or lossless file.

### 20 — Validate Before Go-Live

Lesson slug: `validate-before-go-live`

- **Harrison plan:** Session 5, slides 20–29.
- **Build into the lesson:** Build the validation matrix from the intended clinical application, case mix, scanners, displays, users, workflows, washout, concordance, and discordance review. Investigate clustered failures and require corrective work before approving the weak specimen category.

### 21 — Human + Algorithm

Lesson slug: `human-plus-algorithm`

- **Harrison plan:** Session 5, slides 25–29; Session 6, slides 4–5, 17–23, 34–55.
- **Build into the lesson:** Place detection, annotation, counting, classification, and diagnosis on a clear spectrum. Evaluate the combined reader-plus-tool system, including threshold effects, artifacts, site variation, calibration, subgroup performance, workload, automation bias, drift, and monitoring.

### 22 — Build the New Test

Lesson slug: `build-the-new-test`

- **Harrison plan:** Session 3, slides 7–13 and 18; Session 9, slides 7–10 and 22–29.
- **Build into the lesson:** Use the complete LIS test definition, formal request/vetting, build/test/production separation, acceptance criteria, downstream display, interface testing, signoff, training, go-live support, monitoring, documentation, and change control. Keep LIS analyst configuration separate from laboratory clinical approval.

### 23 — Choose and Govern the LIS

Lesson slug: `choose-and-govern-lis`

- **Harrison plan:** Session 3, slides 3–13 and 20–25; Session 9, slides 3–29.
- **Build into the lesson:** Cover the real scope and governance of pathology IT, application-management tasks, lifecycle planning, requirements, use cases, RFI/RFP, demos, contracts, installation, testing, training, go-live, contingency plans, SaaS, maintenance, documentation, and retirement. The selection matrix must stay tied to laboratory workflows and measurable acceptance criteria.

## Editorial use

When a lesson is revised, record any additional slide or external source in `content/SOURCES.md`. Harrison provides a strong pathology-informatics frame, but a lesson may still need current professional standards, regulations, specialty guidance, or statistical references. Never stretch a Harrison slide beyond what it supports.
