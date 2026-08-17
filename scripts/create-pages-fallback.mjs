import { copyFile, mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("pages-dist");
const shellPath = resolve(outputDirectory, "index.html");
const coverage = JSON.parse(
  await readFile(resolve(outputDirectory, "curriculum-coverage.json"), "utf8"),
);

const routes = coverage.topics.flatMap((topic) => [
  `topics/${topic.slug}`,
  ...topic.lessons.flatMap((lesson) => [
    `lessons/${lesson.slug}`,
    `faculty/${lesson.slug}`,
  ]),
]);

for (const route of routes) {
  if (!/^(topics|lessons|faculty)\/[a-z0-9-]+$/.test(route)) {
    throw new Error(`Unsafe route in curriculum coverage: ${route}`);
  }

  const routeDirectory = resolve(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(shellPath, resolve(routeDirectory, "index.html"));
}

await copyFile(shellPath, resolve(outputDirectory, "404.html"));
console.log(
  `Created ${routes.length} static route entry points and the GitHub Pages fallback.`,
);
