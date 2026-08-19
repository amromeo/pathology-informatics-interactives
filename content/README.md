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

Do not paste patient information, proprietary screenshots, or text copied from
the PIER PDF. All cases and artifacts must remain synthetic and independently
written.
