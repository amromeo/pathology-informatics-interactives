import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { lessons, topics } from "../src/data/curriculum";
import { topic2CurriculumPlan } from "../src/data/topic2Plan";

const fail = (message: string): never => { throw new Error(message); };
if (lessons.length !== 23) fail(`Expected 23 lessons; found ${lessons.length}`);

const expected = new Set(topics.flatMap((topic) => topic.objectives));
const covered = new Set(lessons.flatMap((lesson) => lesson.manifest.pierObjectives));
if (expected.size !== 34) fail(`Expected 34 objective identifiers; found ${expected.size}`);
for (const objective of expected) if (!covered.has(objective)) fail(`Objective ${objective} has no primary lesson`);
for (const objective of covered) if (!expected.has(objective)) fail(`Unknown objective ${objective}`);

const ids = new Set<string>();
const slugs = new Set<string>();
const topic3Slugs = new Set(["server-behind-the-analyzer", "twelve-hours-offline", "not-anonymous-enough"]);
const topic3InstitutionName = "North River University Hospital";
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
  if (topic3Slugs.has(manifest.slug)) {
    if (!manifest.hasLocalPracticum) fail(`${manifest.slug} must enable its Topic 3 local practicum`);

    for (const [choiceKind, choices] of [["diagnosis", lesson.decisionChoices], ["repair", lesson.repairChoices]] as const) {
      const correctChoice = choices.find((choice) => choice.correct);
      const distractors = choices.filter((choice) => !choice.correct);
      if (!correctChoice || !distractors.length) fail(`${manifest.slug} lacks a complete ${choiceKind} choice set`);
      const meanDistractorLength = distractors.reduce((sum, choice) => sum + choice.label.length, 0) / distractors.length;
      if (correctChoice!.label.length > meanDistractorLength * 1.5) {
        fail(`${manifest.slug} ${choiceKind} answer is more than 1.5 times the mean distractor length`);
      }
    }

    const correctRepair = lesson.repairChoices.find((choice) => choice.correct)!;
    if (lesson.validationCases.some((testCase) => !testCase.passingRepairs.includes(correctRepair.id))) {
      fail(`${manifest.slug} controlled repair must pass every validation case`);
    }
    for (const repair of lesson.repairChoices.filter((choice) => !choice.correct)) {
      if (!lesson.validationCases.some((testCase) => testCase.passingRepairs.includes(repair.id))) {
        fail(`${manifest.slug} repair ${repair.id} must pass at least one validation case`);
      }
      for (const testCase of lesson.validationCases.filter((item) => !item.passingRepairs.includes(repair.id))) {
        if (!testCase.failNotes?.[repair.id]?.trim()) {
          fail(`${manifest.slug} repair ${repair.id} lacks a failure note for ${testCase.name}`);
        }
      }
    }
  }
  if (manifest.pierCoverage) {
    const claimIds = new Set<string>();
    for (const claim of manifest.pierCoverage) {
      if (claimIds.has(claim.id)) fail(`${manifest.slug} has duplicate coverage claim ${claim.id}`);
      claimIds.add(claim.id);
      if (!manifest.pierObjectives.includes(claim.objective)) fail(`${manifest.slug} claim ${claim.id} does not agree with pierObjectives`);
      if (!claim.learnerAction.trim()) fail(`${manifest.slug} claim ${claim.id} lacks an observable learner action`);
    }
  }

  const folder = resolve("content", "lessons", manifest.slug);
  for (const file of ["introduction.mdx", "debrief.mdx", "faculty.mdx"]) {
    if (!existsSync(resolve(folder, file))) fail(`${manifest.slug} is missing ${file}`);
  }
  if (topic3Slugs.has(manifest.slug)) {
    const introduction = readFileSync(resolve(folder, "introduction.mdx"), "utf8");
    if (!introduction.includes(topic3InstitutionName)) {
      fail(`${manifest.slug} introduction must name the shared Topic 3 institution: ${topic3InstitutionName}`);
    }
  }
  if (manifest.hasLocalPracticum && !existsSync(resolve(folder, "practicum.mdx"))) fail(`${manifest.slug} is missing practicum.mdx`);
  if (manifest.experience === "data-quality") {
    for (const file of ["concepts.mdx", "bridge.mdx", "interaction.ts", "report.csv"]) {
      if (!existsSync(resolve(folder, file))) fail(`${manifest.slug} is missing ${file}`);
    }
  }

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

const requiredTopic2Subtopics = new Set(topic2CurriculumPlan.flatMap((lesson) => lesson.claims.map((claim) => claim.id)));
const primaryTopic2Claims = new Map(topic2CurriculumPlan.flatMap((lesson) => lesson.claims.filter((claim) => claim.primary).map((claim) => [claim.id, claim] as const)));
for (const subtopic of requiredTopic2Subtopics) {
  const claim = primaryTopic2Claims.get(subtopic);
  if (!claim) {
    fail(`Topic 2 subtopic ${subtopic} lacks a primary lesson`);
    continue;
  }
  if (!claim.learnerAction.trim()) fail(`Topic 2 subtopic ${subtopic} lacks an observable learner action`);
}
const activeTopic2Plan = topic2CurriculumPlan.find((lesson) => lesson.slug === "can-we-trust-this-report");
const activeTopic2Manifest = lessons.find((lesson) => lesson.manifest.slug === "can-we-trust-this-report")?.manifest;
if (!activeTopic2Plan || !activeTopic2Manifest) fail("The active Lesson 3 Topic 2 plan is missing");
if (JSON.stringify(activeTopic2Plan!.claims.map((claim) => claim.id)) !== JSON.stringify((activeTopic2Manifest!.pierCoverage ?? []).map((claim) => claim.id))) {
  fail("The active Lesson 3 manifest does not agree with the staged Topic 2 plan");
}
if (topic2CurriculumPlan.filter((lesson) => lesson.published).length !== 1) fail("Only completed Lesson 3 may be published from the staged Topic 2 plan");

const pilots = lessons.filter((lesson) => lesson.manifest.pilot);
if (pilots.length !== 4) fail(`Expected four pilot interaction patterns; found ${pilots.length}`);

console.log(`Validated ${lessons.length} lessons, ${covered.size}/${expected.size} objectives, ${requiredTopic2Subtopics.size} staged Topic 2 subtopics, ${pilots.length} pilot patterns, all required MDX files, and 23 Harrison slide plans.`);
