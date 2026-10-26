import { useEffect, useState } from "react";
export function LessonContents() {
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);
  const [wide, setWide] = useState(false),
    [current, setCurrent] = useState("lesson-introduction");
  useEffect(() => {
    const query = matchMedia("(min-width:1200px)");
    const change = () => setWide(query.matches);
    change();
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const update = () => {
      const headings = [...document.querySelectorAll<HTMLElement>(".experience h2")];
      const next = headings.map((h, i) => {
        if (!h.id) h.id = "lesson-step-" + (i + 1);
        const section = h.closest("section");
        if (section && !section.getAttribute("aria-labelledby"))
          section.setAttribute("aria-labelledby", h.id);
        return { id: h.id, label: h.textContent ?? "" };
      });
      setItems((old) => (JSON.stringify(old) === JSON.stringify(next) ? old : next));
    };
    update();
    const observer = new MutationObserver(update);
    const main = document.getElementById("main");
    if (main) observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );
    for (const item of [{ id: "lesson-introduction" }, ...items, { id: "debrief-start" }]) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);
  const links = [
    { id: "lesson-introduction", label: "The case" },
    ...items,
    { id: "debrief-start", label: "Debrief and local application" },
  ];
  return (
    <nav className="lesson-contents" aria-label="Lesson contents">
      <details open={wide || undefined}>
        <summary>In this lesson · {items.length} steps</summary>
        <ol>
          {links.map((item) => (
            <li key={item.id}>
              <a href={"#" + item.id} aria-current={current === item.id ? "step" : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
