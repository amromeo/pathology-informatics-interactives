import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { lessons, topics } from "../src/data/curriculum";

const output = {
  curriculum: "PIER Essentials Release 5",
  generatedAt: new Date().toISOString(),
  objectiveCount: topics.flatMap((topic) => topic.objectives).length,
  lessonCount: lessons.length,
  topics: topics.map((topic) => ({
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    objectives: topic.objectives,
    lessons: lessons.filter((lesson) => lesson.manifest.topic === topic.id).map((lesson) => ({
      id: lesson.manifest.id,
      slug: lesson.manifest.slug,
      title: lesson.manifest.title,
      objectives: lesson.manifest.pierObjectives,
    })),
  })),
};

await writeFile(resolve("pages-dist", "curriculum-coverage.json"), JSON.stringify(output, null, 2) + "\n", "utf8");
console.log("Exported pages-dist/curriculum-coverage.json");
