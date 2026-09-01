# Pathology Informatics Curriculum Working Preferences

Apply these instructions whenever planning, writing, revising, or testing this curriculum.

## Voice and terminology

- Write for pathology residents and laboratorians. Prefer the words people use in the laboratory over corporate, software-development, or AI-generated language.
- Prefer clarity over brevity. Use enough words to explain an unfamiliar process completely; do not compress an explanation into a clever label or slogan.
- Use concrete language. Avoid vague phrases such as “evidence aligned,” “metric lineage,” “fair inclusion rule,” “end-to-end build,” “canonical report,” or “operational owner” unless the term is necessary, defined, and natural in context.
- Name the actual object or action: the report, accession, specimen, result field, worklist, interface, spreadsheet, rule, or person responsible.
- Do not describe software or data as if they were people. Avoid phrases such as “the export sees,” “the interface expects,” or “the cases disappeared.” State which field is read, copied, left blank, excluded, or used in a calculation.
- Use natural laboratory names such as “hematology lab,” “surgical pathology,” “LIS team,” and “director of surgical pathology.”
- When a technical term is necessary, explain the process in ordinary language first and then name the term. Define acronyms and technical terms at first use.
- Put vocabulary close to where the learner needs it and give a concrete pathology example for every abstract definition. Do not use a vocabulary word as a substitute for explaining what actually happened.
- Harrison/API teaching slides may inform planning, faculty notes, and the source ledger. Do not place Harrison terminology crosswalks or source-oriented commentary in the learner-facing lesson unless it directly helps the learner.

## Case setup and teaching sequence

- Establish the case before presenting vocabulary or an exercise. State who the learner is, what changed, when it happened, what the laboratory observed, why the issue matters, and what the learner has been asked to do.
- Do not rely on a fact before it has been introduced. If the case involves a new LIS, downtime, cutover, interface change, new assay, or EHR problem, explain that in the opening setup.
- State the central comparison or question before showing the numbers. For a pre- and post-go-live case, explicitly define both periods and say what the laboratory is trying to learn from the comparison.
- If the same information may exist in two places, identify both sources early and explain which source the report, interface, or calculation actually uses.
- Keep the sequence simple: case first, then the terms needed for the case, then the evidence and learner task.
- Explain the purpose of each interaction. Tell the learner exactly what to inspect, select, compare, or change and what question the exercise is meant to answer.
- On narrow screens, show feedback or explanatory text next to the control that produced it. Do not hide the explanation below a long stack of controls.
- Feedback should explain what happened in the laboratory and why the choice is safe, unsafe, or incomplete. Do not use generic praise or generic error language.
- Make the debrief available without requiring the learner to complete every interaction.

## Case and artifact realism

- Use a failure mechanism that could occur in an actual laboratory. Before building an exercise, explain who requested the work, who performed it, what system or record was used, what was selected, and how the resulting report or display was produced.
- Do not assume residents know how an LIS report, query, export, spreadsheet, dashboard, interface, or calculated field is created. Explain the steps in plain language before asking the learner to interpret the result.
- Every number must have an identifiable meaning: what was counted or measured, the relevant group of cases, the time period, and any cases left out. Do not expect the learner to infer a denominator or inclusion rule from a table heading.
- Make the source artifact look like something its named user might actually receive. Do not add a convenient warning, count, status, or quality-control field merely to reveal the lesson's answer if that item would not normally appear there.
- Keep the original artifact separate from the teaching annotation. For example, show the spreadsheet as prepared, then state what the resident notices when its summary is compared with the case list.
- When a spreadsheet calculation ignores blank cells or a report selects only certain records, state that behavior explicitly and show where the excluded or blank cases remain visible.
- Make paper requisitions and similar documents look like physical laboratory forms. Make electronic screens clinically credible and original rather than imitating proprietary LIS or EHR chrome.

## Quantitative cases and comparisons

- Begin with the comparison the laboratory actually planned to make and the report or spreadsheet the learner would realistically receive. Do not begin with a cleaned-up teaching table that already exposes the underlying problem.
- When presenting a pre- and post-change analysis, name the change, define the time periods, and explain why the laboratory is comparing them before asking the learner to interpret any statistics.
- Explain mean, median, spread, skew, confidence intervals, and statistical tests in the context of the actual laboratory question. Do not present statistical vocabulary as a detached glossary.
- If the mean and median differ because a small number of cases have much longer turnaround times, show the distribution or trend and explain the effect in ordinary language.
- Reveal data problems in a plausible order: review the initial comparison, notice an unexpected pattern, learn what occurred during the affected period, inspect representative source records, and then revise the analysis.
- Preserve affected cases unless there is a clinically and methodologically justified reason to exclude them. When a transition or downtime period is not comparable with routine operations, show it as a separate group and state why.
- End time-based analyses with a clearly labeled trend over time when that view helps the learner understand the event. Every chart must also have a readable table or text equivalent.

## Pathology and informatics roles

- The laboratory is responsible for its complete result reports and for verifying how those reports appear in the EHR. Reports include names, result fields, units, reference information, comments, flags, corrections, and display.
- A laboratory generally identifies a specific area of the chart where the complete official report is verified, even though the EHR may reuse report elements elsewhere.
- Pathology informatics is directly involved in laboratory orders, result-report design, implementation practices, validation, and consistency across laboratory sections. Clinical decision support that uses laboratory data is also within pathology informatics practice.
- Clinical informatics generally helps ensure that the EHR is configured and used to support patient care. It often leads broader EHR and clinical decision-support work and may consult on difficult ordering or result-display problems, but it does not assume ownership of the laboratory report.
- The LIS team builds, supports, and maintains laboratory systems. At some institutions it is part of the IT department; at others it is housed in pathology, although the trend is toward IT. Organization varies, roles overlap, and most work is collaborative.
- Describe who performs the technical work and who gives clinical approval without drawing artificial, absolute boundaries between collaborating groups.

## Content architecture and review

- Keep learner-facing prose in editable MDX and structured prompts or feedback in lesson-local TypeScript data. Keep substantial teaching copy out of React components.
- Treat PIER Essentials R5 as the curriculum authority. Paraphrase its objectives and create original cases and artifacts rather than reproducing PIER wording or pages.
- Use the API/Harrison slide sets across lesson planning, with detailed attribution in faculty materials and the source ledger.
- When asking the user to choose among wording alternatives, present no more than five numbered items at a time, with about three options per item.
- After each accepted revision batch, build the GitHub Pages version and test the actual learner interaction in the in-app browser at both desktop and narrow widths.
