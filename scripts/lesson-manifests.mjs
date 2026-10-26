import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";
const root = fileURLToPath(new URL("../content/lessons/", import.meta.url));
export function lessonManifestPaths() {
  return readdirSync(root)
    .filter((slug) => existsSync(join(root, slug, "lesson.ts")))
    .sort()
    .map((slug) => join(root, slug, "lesson.ts"));
}
// Used by Node authoring tools running under tsx.
export async function loadLessons() {
  return (
    await Promise.all(
      lessonManifestPaths().map(async (path) => (await import(pathToFileURL(path).href)).manifest),
    )
  ).sort((a, b) => Number(a.id) - Number(b.id));
}
export function compileLessonManifestRegistry(directory) {
  const paths = lessonManifestPaths();
  writeFileSync(
    join(directory, "lessonManifests.ts"),
    "// Generated from content/lessons/*/lesson.ts. Do not edit.\n" +
      paths
        .map(
          (p, i) =>
            `import { manifest as m${i} } from "../../content/lessons/${p.replaceAll("\\\\", "/").replaceAll("\\", "/").split("/").at(-2)}/lesson";`,
        )
        .join("\n") +
      "\nexport const manifests = [" +
      paths.map((_, i) => "m" + i).join(", ") +
      "];\n",
  );
}
