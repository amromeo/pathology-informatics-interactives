import { createElement, lazy, Suspense, type ComponentType } from "react";

import { LessonErrorBoundary } from "./components/lesson-ui";

type MdxModule = { default: ComponentType<Record<string, unknown>> };

const introductions = import.meta.glob<MdxModule>("../content/lessons/*/introduction.mdx");
const debriefs = import.meta.glob<MdxModule>("../content/lessons/*/debrief.mdx");
const facultyGuides = import.meta.glob<MdxModule>("../content/lessons/*/faculty.mdx");
const practicums = import.meta.glob<MdxModule>("../content/lessons/*/practicum.mdx");
const concepts = import.meta.glob<MdxModule>("../content/lessons/*/concepts.mdx");
const bridges = import.meta.glob<MdxModule>("../content/lessons/*/bridge.mdx");
const downtimeNotes = import.meta.glob<MdxModule>("../content/lessons/*/downtime.mdx");
const comparisons = import.meta.glob<MdxModule>("../content/lessons/*/comparison.mdx");
const investigations = import.meta.glob<MdxModule>("../content/lessons/*/investigation.mdx");

const cache = new Map<string, ComponentType<Record<string, unknown>>>();
const componentFor = (modules: Record<string, () => Promise<MdxModule>>, slug: string) => {
  const entry = Object.entries(modules).find(([path]) => path.includes(`/lessons/${slug}/`));
  if (!entry) return undefined;
  if (!cache.has(entry[0])) {
    const Content = lazy(entry[1]);
    cache.set(entry[0], (props) =>
      createElement(LessonErrorBoundary, {
        children: createElement(
          Suspense,
          {
            fallback: createElement(
              "div",
              { className: "loading-section", role: "status" },
              "Loading this section…",
            ),
          },
          createElement(Content, props),
        ),
      }),
    );
  }
  return cache.get(entry[0]);
};

export const lessonContent = (slug: string) => ({
  Introduction: componentFor(introductions, slug),
  Debrief: componentFor(debriefs, slug),
  Faculty: componentFor(facultyGuides, slug),
  Practicum: componentFor(practicums, slug),
  Concepts: componentFor(concepts, slug),
  Bridge: componentFor(bridges, slug),
  Downtime: componentFor(downtimeNotes, slug),
  Comparison: componentFor(comparisons, slug),
  Investigation: componentFor(investigations, slug),
});
