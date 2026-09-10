# Topic 5 buildout

Four individual experiences cover objectives 5.1–5.5, with the existing links to
2.1 and 8.1 retained. The original lesson URLs remain stable.

## Case mechanisms and observable work

- Tracing a Missing Critical Flag: a new EHR connection passes local CH/CL
  categories into a receiver table that uses HH/LL. Inspect four source records
  and six OBX fields, edit mappings, replay six categories, and plan report
  validation plus recovery. Initial 4/6; correct 6/6. Downgrading critical to high
  or low and treating unknown as normal remain failures.
- Sending a Newborn Screening Report: the receiver stores a report whose local
  observation and answer were never mapped into its routing profile. Configure
  scope and answer representation while preserving identity and version
  handling. Initial 5/8; correct 8/8. Wrong observation scope, identifier-only
  matching, duplicate messages, and corrections have distinct consequences.
- Reviewing Laboratory Terminology Mappings: a display-name mapping draft mixes
  orders, observations, findings, units, and administrative objects. Assign
  seven standards to named uses, then review four source definitions. The
  chemistry comparison distinguishes mass from substance concentration; missing
  HER2 definitions and a panel order require appropriate deferred/component work.
- Investigating Delayed Result Release: a stale completed-result extract
  conceals a later group and two unfinished accessions. Inspect operational
  logs, refresh and link records, select the arrival group and time interval,
  and recommend monitored review coverage without bypassing clinical controls.

## Teaching standard

Case setup precedes terminology. Each lesson has editable concepts, operational
review, debrief, and faculty guidance. Source records are separate from teaching
annotations. Feedback explains consequences beside controls; each debrief is
available before completion. Topic 5 sources are recorded in SOURCES.md and
Harrison ranges in HARRISON-SLIDE-MAP.md.

The queue chart has a record table. Counts identify their cohort, extract time,
and treatment of pending work. Codes were checked against primary terminology
pages; local interface policy is not presented as a universal clinical rule.
