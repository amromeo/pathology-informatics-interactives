import { lazy } from "react";
import type { RetrievalItem } from "./data/types";
import { CheckYourself } from "./components/CheckYourself";
const modules = import.meta.glob<{
  checks: RetrievalItem[];
  feedbackHeadings?: { correct: string; incorrect: string };
}>("../content/lessons/*/check.ts");
const cache = new Map<string, ReturnType<typeof lazy>>();
export function lessonCheck(slug: string) {
  if (!cache.has(slug)) {
    const load = modules["../content/lessons/" + slug + "/check.ts"];
    if (!load) return undefined;
    cache.set(
      slug,
      lazy(async () => {
        const { checks, feedbackHeadings } = await load();
        return {
          default: () => (
            <CheckYourself slug={slug} items={checks} feedbackHeadings={feedbackHeadings} />
          ),
        };
      }),
    );
  }
  return cache.get(slug);
}
