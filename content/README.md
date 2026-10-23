# Editing the curriculum

Learner-facing teaching copy is stored in Markdown/MDX, not React components.
Each lesson has a folder under `content/lessons/` containing:

- `introduction.mdx` — title, case hook, learner task, and key point.
- `debrief.mdx` — principle, failure layers, roles, and safety implications.
- `faculty.mdx` — facilitation notes, expected reasoning, and review cautions.
- `practicum.mdx` — optional institution-based extension when present.

Some lessons use additional MDX files when teaching copy appears between
interactive sections. Lesson 2, for example, uses `concepts.mdx` for its
hardware, software, networking, and hosting explanation and `downtime.mdx` for
the downtime note. These files can be edited in the same way as the standard
lesson files.

Lesson 3 uses `concepts.mdx` for the data-quality teaching and `bridge.mdx` for
the closing examples of pathology data science. Its complete synthetic case
table is `content/lessons/can-we-trust-this-report/report.csv`. You may edit the
CSV in a spreadsheet program or as text. Development, testing, and production
builds compile it automatically; no React edit is needed. The visible prompts,
choices, feedback, and report checks are in the lesson's `interaction.ts` file.

You can edit ordinary paragraphs, headings, links, bold text, and lists directly
on GitHub. Commit the change to `main`; the Pages workflow rebuilds and
republishes the curriculum automatically.

Before revising a lesson, check `content/HARRISON-SLIDE-MAP.md`. It gives the
Harrison/API session and slide ranges planned for every tutorial, plus the
specific ideas that should shape the case and learner decisions. Update that
map if you change a lesson's source plan.

Structured interaction content—evidence labels, answer choices, system-trace
steps, and validation cases—usually lives in `src/data/curriculum.ts`. Lesson 1
keeps its role assignments and support-ticket questions beside the MDX files in
`content/lessons/steward-at-morning-huddle/interaction.ts`. These items drive
application state, so preserve the `id`, `owner`, and `answer` values when
editing the visible wording.

Lesson 2 keeps its pathway components, synthetic system records, answer
choices, and restoration checks in
`content/lessons/inside-a-results-journey/interaction.ts`. Preserve the `id`,
`answer`, and `correct` values when editing the visible wording.

Lesson 3 keeps its audit prompts, correction choices, and report checks in
`content/lessons/can-we-trust-this-report/interaction.ts`. Preserve each `id`,
`answer`, and `correct` value when changing visible wording. The command
`npm run data:lesson3` resets the CSV to the original 455-case teaching dataset,
so do not run it after making your own CSV edits unless you intend to replace
them.

Do not paste patient information, proprietary screenshots, or text copied from
the PIER PDF. All cases and artifacts must remain synthetic and independently
written.

Topic 3 lessons (`server-behind-the-analyzer`, `twelve-hours-offline`, and
`not-anonymous-enough`) keep their simulation data and scoring in their own
`interaction.ts` files. Their `concepts.mdx` files teach the concepts used by
the workbenches; `debrief.mdx` and `faculty.mdx` explain the resulting choices.
Preserve stable identifiers when editing. Downtime call-record actions depend
on the communication decision, and security coverage includes partial
mitigation. Run `npm test` and `npm run build:pages` after interaction edits.
Desktop and phone review captures and the verification record are in
`review/topic3/`.

Topic 4's `where-is-the-specimen` lesson now uses a dedicated audit-trail and
routing workbench. Edit `concepts.mdx` for the LIS explanation and `interaction.ts`
for timestamped records, procedure entries, routing cases, and feedback. The
five-case replay computes destinations from the learner's configuration; changing
a route clears its prior test result.

The other Topic 4 lessons now also use dedicated interactions. In
`autoverification-at-the-edge/interaction.ts`, edit the release cases, policy
configuration, gate explanations, and review choices. In
`reflex-rule-ripple-effect/interaction.ts`, edit the related records, accession
set, order predicates, and expected actions. Each has `concepts.mdx` for the
substantive teaching and `bridge.mdx` for validation and implementation review.
All numeric counts in the interface are calculated from the case records.
Update the MDX counts and tests together if you change those records. Stable
lesson URLs retain their earlier slugs; the visible titles are now Checking
Automatic Result Release and Updating a Thyroid Reflex Rule.

## Topic 5 editing

The four Topic 5 lessons now use individual experiences. Each folder contains
`introduction.mdx`, `concepts.mdx`, `bridge.mdx`, `debrief.mdx`, `faculty.mdx`, and
`interaction.ts`. Edit narrative and teaching in MDX; edit records, expected
outcomes, and structured feedback in the lesson-local TypeScript file.

- `follow-the-flag`: six flag categories, field explanations, and source trace.
- `newborn-screen-to-public-health`: eight receiving situations and agreed
  observation/answer mappings. Preserve the distinction between the case profile
  and requirements of a particular public-health program.
- `code-the-meaning`: seven purpose assignments and four mapping decisions.
  Recheck published terminology definitions before changing real code numbers.
- `invisible-bottleneck`: 14 accession events in minutes from 08:00. Keep the
  times, completed/pending denominators, and MDX summary values consistent.

UI headings and short action/status labels remain in the Topic 5 React
components. Source records and longer per-control explanations live in lesson
files. Stable URLs retain the original slugs despite the revised plain titles.

## Topic 6 editing

The two Topic 6 folders now contain editable introduction, concepts, bridge,
debrief, faculty, and practicum MDX, plus interaction.ts for the case records,
choices, and feedback. The stable lesson URLs are unchanged.

The 168-hour window is an institution-specific review trigger, not a clinical
recommendation. Preserve clinical exceptions and distinguish acknowledgement,
order changes, appropriateness, and patient outcomes. The ten-event alert replay
and the four-week ward comparison are separate datasets; changing the replay
configuration must not change the observed pilot results.

Short UI labels and some preview/status sentences remain in CdsDesignExperience
and AlertEvaluationExperience. Substantial teaching text is in MDX.

## Topic 8 editing

See TOPIC8-BUILDOUT.md. The build-the-new-test and choose-and-govern-lis folders
contain introduction, concepts, bridge, debrief, faculty, practicum MDX and local
interaction.ts. Preserve explicit expected report cases, the separation of
mandatory eligibility from weighted preferences, and documented cost scope.

## Topic 7 editing

All three existing Topic 7 routes now use dedicated experiences. Each lesson
folder has introduction, concepts, bridge, debrief, faculty, practicum, and
interaction.ts. Keep narrative in MDX and structured choices, feedback, and
records in the local data file. Short UI headings and calculated status labels
remain in React.

- `pixel-budget`: run `node scripts/topic7-images.mjs` to regenerate the six
  derivatives and images.json. Measured asset byte sizes are separate from the
  hypothetical scanner forecast. The decoded reference is not a scanner original;
  do not attach a physical scale or diagnostic-equivalence claim to this field.
- `validate-before-go-live`: preserve original paired observations and their
  denominators. Changing a plan or investigation clears its previous check and
  recommendation. Completing the plan does not mean corrective evidence has
  been collected or that the director has approved the scope.
- `human-plus-algorithm`: the candidate list, reader study, and monthly report
  are separate datasets. The threshold is inclusive. Predictive value is
  undefined when there are no marks. Preserve location, figure, slide, and time
  denominators; do not infer reader effects from moving the threshold.

Explicit coverage and primary source links are in `src/data/topic7Plan.ts`.
Preserve the existing 2.4 cross-topic mapping. Styles are scoped in Topic7.css.
Run `npm test` and `npm run build:pages`. Completed desktop/phone checks and screenshots are recorded in `review/topic7/`.
