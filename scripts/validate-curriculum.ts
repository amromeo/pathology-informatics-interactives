import { suggestedPath } from "../src/data/lessonSummaries";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { lessons, topics } from "../src/data/curriculum";
import { pierObjectives } from "../src/data/pierObjectives";
const fail = (message: string): never => {
  throw Error(message);
};
const folders = readdirSync("content/lessons", { withFileTypes: true })
  .filter(
    (d) => d.isDirectory() && existsSync(resolve("content/lessons", d.name, "introduction.mdx")),
  )
  .map((d) => d.name);
if (lessons.length !== folders.length) fail("Lesson registry and content folders differ.");
const objectiveIds = new Set(pierObjectives.map((o) => o.id)),
  ids = new Set<string>(),
  slugs = new Set<string>();
for (const topic of topics) {
  const expected = pierObjectives
    .filter((o) => o.topic === topic.id)
    .map((o) => o.id)
    .sort();
  if (JSON.stringify(expected) !== JSON.stringify([...topic.objectives].sort()))
    fail("Topic " + topic.id + " disagrees with the objective registry.");
}
for (const o of pierObjectives)
  if (o.summary.trim().split(/\s+/).length > 12) fail(o.id + " summary exceeds 12 words.");
for (const { manifest: m } of lessons) {
  if (ids.has(m.id) || slugs.has(m.slug)) fail("Duplicate lesson identity: " + m.slug);
  ids.add(m.id);
  slugs.add(m.slug);
  if (!folders.includes(m.slug)) fail("Missing lesson folder: " + m.slug);
  if (!m.experience || (m.status !== "draft" && m.experience === "generic"))
    fail(m.slug + " lacks a dedicated published experience.");
  const folder = resolve("content/lessons", m.slug);
  for (const file of [
    "introduction.mdx",
    "debrief.mdx",
    "faculty.mdx",
    "interaction.ts",
    "lesson.ts",
    "check.ts",
  ]) {
    if (!existsSync(resolve(folder, file))) fail(m.slug + " missing " + file);
  }
  if (m.hasLocalPracticum && !existsSync(resolve(folder, "practicum.mdx")))
    fail(m.slug + " missing practicum.");
  const intro = readFileSync(resolve(folder, "introduction.mdx"), "utf8");
  if (intro.split(/\r?\n/)[0] !== "# " + m.title)
    fail(m.slug + " title differs from introduction.");
  if (!intro.includes("## What you will be able to do"))
    fail(m.slug + " lacks observable outcomes");

  // Titles retain the author's wording; expand common terms at first use in the case.
  const caseText = intro.split("\n").slice(1).join("\n").replaceAll("**", "");
  for (const [acronym, expanded] of Object.entries({
    LIS: "laboratory information system",
    EHR: "electronic health record",
    IT: "information technology",
    CDS: "clinical decision support",
    HL7: "Health Level Seven",
    LOINC: "Logical Observation Identifiers Names and Codes",
    HIPAA: "Health Insurance Portability and Accountability Act",
    CLIA: "Clinical Laboratory Improvement Amendments",
    CAP: "College of American Pathologists",
    WSI: "whole-slide imaging",
    RTO: "recovery time objective",
    RPO: "recovery point objective",
    ACK: "acknowledgment",
    QC: "quality control",
    AI: "artificial intelligence",
  })) {
    const first = new RegExp("\\b" + acronym + "\\b").exec(caseText);
    if (first && !caseText.slice(0, first.index).toLowerCase().includes(expanded.toLowerCase()))
      fail(m.slug + ": explain " + acronym + " before its first use in the introduction.");
  }
  const faculty = readFileSync(resolve(folder, "faculty.mdx"), "utf8");
  for (const heading of ["Run of show", "Common misconceptions"])
    if (!faculty.includes("## " + heading)) fail(m.slug + " lacks faculty " + heading);
  const allowance = faculty.match(/Allow (\d+) minutes/);
  if (!allowance || Math.abs(Number(allowance[1]) - m.durationMinutes) > 10)
    fail(m.slug + " faculty time differs from manifest");
  for (const prior of m.prerequisites ?? [])
    if (!lessons.some((l) => l.manifest.slug === prior))
      fail(m.slug + " unknown prerequisite " + prior);
  for (const prior of m.prerequisites ?? []) {
    const priorLesson = lessons.find((l) => l.manifest.slug === prior)!;
    if (
      suggestedPath.indexOf(Number(priorLesson.manifest.id)) >= suggestedPath.indexOf(Number(m.id))
    )
      fail(m.slug + ": suggested path places a prerequisite later: " + prior);
  }
  const claims = m.pierCoverage ?? [];
  for (const objective of m.pierObjectives) {
    if (!objectiveIds.has(objective)) fail("Unknown objective " + objective);
    if (!claims.some((c) => c.objective === objective))
      fail(m.slug + " lacks a claim for " + objective);
  }
  for (const c of claims) {
    if (!m.pierObjectives.includes(c.objective))
      fail(m.slug + " has an unmapped claim " + c.objective);
    if (!c.learnerAction.trim() || !c.taughtIn?.length || !c.evidence?.length)
      fail(m.slug + " lacks teaching evidence for " + c.id);
    for (const evidence of c.evidence ?? []) {
      const path = resolve(evidence.file);
      if (!path.startsWith(resolve("content") + "/") && !path.startsWith(resolve("content") + "\\"))
        fail("Evidence must be a content file.");
      if (!existsSync(path) || !readFileSync(path, "utf8").includes(evidence.contains))
        fail(m.slug + " evidence missing: " + evidence.file + " must contain " + evidence.contains);
    }
  }
}
for (const objective of objectiveIds)
  if (
    !lessons.some(
      (l) =>
        l.manifest.status !== "draft" &&
        l.manifest.pierCoverage?.some(
          (c) => c.objective === objective && c.primary && c.taughtIn?.includes("interaction"),
        ),
    )
  )
    fail(objective + " has no published primary interactive lesson.");
console.log(
  "Validated " +
    lessons.length +
    " lessons and " +
    objectiveIds.size +
    " objectives with published primary interaction evidence.",
);
