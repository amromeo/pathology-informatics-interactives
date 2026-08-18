import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { lessons, topics } from "../src/data/curriculum";

const fail = (message: string): never => { throw new Error(message); };
if (lessons.length !== 23) fail(`Expected 23 lessons; found ${lessons.length}`);

const expected = new Set(topics.flatMap((topic) => topic.objectives));
const covered = new Set(lessons.flatMap((lesson) => lesson.manifest.pierObjectives));
if (expected.size !== 34) fail(`Expected 34 objective identifiers; found ${expected.size}`);
for (const objective of expected) if (!covered.has(objective)) fail(`Objective ${objective} has no primary lesson`);
for (const objective of covered) if (!expected.has(objective)) fail(`Unknown objective ${objective}`);

const ids = new Set<string>();
const slugs = new Set<string>();
const harrisonPlan = readFileSync(resolve("content", "HARRISON-SLIDE-MAP.md"), "utf8");
const plannedSlugs = [...harrisonPlan.matchAll(/Lesson slug: `([^`]+)`/g)].map((match) => match[1]);
if (new Set(plannedSlugs).size !== 23) fail(`Expected 23 unique lesson entries in the Harrison slide plan; found ${new Set(plannedSlugs).size}`);
for (const lesson of lessons) {
  const { manifest } = lesson;
  if (ids.has(manifest.id)) fail(`Duplicate lesson id ${manifest.id}`);
  if (slugs.has(manifest.slug)) fail(`Duplicate lesson slug ${manifest.slug}`);
  ids.add(manifest.id);
  slugs.add(manifest.slug);
  if (!lesson.evidence.length || !lesson.trace.length) fail(`${manifest.slug} lacks evidence or trace data`);
  if (lesson.decisionChoices.filter((choice) => choice.correct).length !== 1) fail(`${manifest.slug} must have one correct diagnosis`);
  if (lesson.repairChoices.filter((choice) => choice.correct).length !== 1) fail(`${manifest.slug} must have one controlled repair`);
  if (lesson.validationCases.length < 3) fail(`${manifest.slug} needs at least three validation cases`);

  const folder = resolve("content", "lessons", manifest.slug);
  for (const file of ["introduction.mdx", "debrief.mdx", "faculty.mdx"]) {
    if (!existsSync(resolve(folder, file))) fail(`${manifest.slug} is missing ${file}`);
  }
  if (manifest.hasLocalPracticum && !existsSync(resolve(folder, "practicum.mdx"))) fail(`${manifest.slug} is missing practicum.mdx`);

  const marker = `Lesson slug: \`${manifest.slug}\``;
  const sectionStart = harrisonPlan.indexOf(marker);
  if (sectionStart < 0) fail(`${manifest.slug} is missing from the Harrison slide plan`);
  const sectionEnd = harrisonPlan.indexOf("Lesson slug: `", sectionStart + marker.length);
  const section = harrisonPlan.slice(sectionStart, sectionEnd < 0 ? undefined : sectionEnd);
  const plannedSessions = new Set([...section.matchAll(/Session (\d+)/g)].map((match) => Number(match[1])));
  for (const session of manifest.apiSessions) {
    if (!plannedSessions.has(session)) fail(`${manifest.slug} is missing API Session ${session} in the Harrison slide plan`);
  }
}

const pilots = lessons.filter((lesson) => lesson.manifest.pilot);
if (pilots.length !== 4) fail(`Expected four pilot interaction patterns; found ${pilots.length}`);

console.log(`Validated ${lessons.length} lessons, ${covered.size}/${expected.size} objectives, ${pilots.length} pilot patterns, all required MDX files, and 23 Harrison slide plans.`);
