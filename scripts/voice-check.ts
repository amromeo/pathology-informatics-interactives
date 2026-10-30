import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Port of the author's voice check. This flags prose for review, not automatic replacement.
const words =
  /\b(evidence|establish\w*|demonstrat(?:e|ed|es|ing)\b|unresolved|intended use|workflows?|scoped?|scopes|lifecycle|decision authority|mandatory|defensible|trade-?offs?|compensate\w*|aggregate|constitut\w*|implementation|responsibilit\w*|governance|governed|stakeholders?|leadership|readiness|operational|institutional|configuration|production|deploy\w*|explicit\w*|assessment)\b/gi;
const template =
  /incomplete approach|Start by reading the case records|person making a technical change|using laboratory records and explain|central problem unresolved|needed conclusion|without checking local policy/g;
export const voiceFiles = [
  "introduction.mdx",
  "concepts.mdx",
  "bridge.mdx",
  "investigation.mdx",
  "comparison.mdx",
  "downtime.mdx",
  "debrief.mdx",
  "practicum.mdx",
  "faculty.mdx",
  "interaction.ts",
  "check.ts",
];

export function scoreVoice(files: { name: string; text: string }[]) {
  const text = files
    .map((file) =>
      file.name.endsWith(".ts")
        ? [...file.text.matchAll(/"((?:[^"\\]|\\.){20,})"/g)]
            .map((m) => m[1])
            .filter((s) => s.includes(" "))
            .join("\n")
        : file.text,
    )
    .join("\n");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length || 1;
  const flagged = [...text.matchAll(words)].length;
  const templates = [...text.matchAll(template)].length;
  return { wordCount, flagged, perThousand: (flagged / wordCount) * 1000, templates };
}

export function lessonVoice(folder: string) {
  return scoreVoice(
    voiceFiles
      .filter((name) => existsSync(join(folder, name)))
      .map((name) => ({ name, text: readFileSync(join(folder, name), "utf8") })),
  );
}
