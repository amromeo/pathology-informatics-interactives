import type { ComponentType } from "react";

type MdxModule = { default: ComponentType<Record<string, unknown>> };

const introductions = import.meta.glob<MdxModule>("../content/lessons/*/introduction.mdx", { eager: true });
const debriefs = import.meta.glob<MdxModule>("../content/lessons/*/debrief.mdx", { eager: true });
const facultyGuides = import.meta.glob<MdxModule>("../content/lessons/*/faculty.mdx", { eager: true });
const practicums = import.meta.glob<MdxModule>("../content/lessons/*/practicum.mdx", { eager: true });

const componentFor = (modules: Record<string, MdxModule>, slug: string) => {
  const entry = Object.entries(modules).find(([path]) => path.includes(`/lessons/${slug}/`));
  return entry?.[1].default;
};

export const lessonContent = (slug: string) => ({
  Introduction: componentFor(introductions, slug),
  Debrief: componentFor(debriefs, slug),
  Faculty: componentFor(facultyGuides, slug),
  Practicum: componentFor(practicums, slug),
});
