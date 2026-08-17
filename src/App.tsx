import { useState } from "react";
import { lessonContent } from "./content";
import { GenericExperience } from "./components/GenericExperience";
import { PilotLab } from "./components/PilotLabs";
import { SiteChrome, href } from "./components/SiteChrome";
import { lessonBySlug, lessons, PIER_URL, API_URL, topicBySlug, topics } from "./data/curriculum";
import type { LessonDefinition } from "./data/types";

const routePath = () => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = window.location.pathname;
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
};

function HubPage() {
  return <main><section className="hub-hero"><div><p className="eyebrow">23 cases · 8 PIER topics · 34 objectives</p><h1>Learn informatics by following the evidence.</h1><p className="hero-lede">An independent, case-based curriculum for pathology residents, aligned to PIER Essentials Release 5.</p><div className="hero-actions"><a className="primary-button" href={href("lessons/steward-at-morning-huddle/")}>Start lesson 1</a><a className="secondary-button" href="#topics">Browse all topics</a></div></div><aside className="hero-card"><span>Curriculum route</span><ol><li>Notice a clinical inconsistency</li><li>Trace systems and meaning</li><li>Diagnose the failure layer</li><li>Repair and regression-test</li></ol><small>All artifacts are synthetic and educational.</small></aside></section><section className="catalog-section" id="topics"><div className="section-copy"><p className="eyebrow">Curriculum catalog</p><h2>Eight connected topic areas</h2><p>Lessons progress from foundational vocabulary to applied configuration and stewardship decisions.</p></div><div className="topic-grid">{topics.map((topic) => { const count = lessons.filter((lesson) => lesson.manifest.topic === topic.id).length; return <a className="topic-card" href={href(`topics/${topic.slug}/`)} key={topic.id}><span>Topic {topic.id}</span><h3>{topic.title}</h3><p>{topic.summary}</p><footer><strong>{count} lessons</strong><small>{topic.objectives.join(" · ")}</small></footer></a>; })}</div></section><Coverage/><section className="about-section" id="about"><div><p className="eyebrow">Source and editorial model</p><h2>Aligned, attributed, and independently authored</h2></div><div><p><a href={PIER_URL}>PIER Essentials R5</a> defines the coverage contract. The <a href={API_URL}>API teaching slide sets</a> supplement foundational concepts under CC BY 4.0. Case narratives, artifacts, questions, and visuals are original.</p><p>This project is independently developed and is not an official PIER product.</p></div></section></main>;
}

function Coverage() {
  const covered = new Set(lessons.flatMap((lesson) => lesson.manifest.pierObjectives));
  return <section className="coverage-section" id="coverage"><div className="section-copy"><p className="eyebrow">Coverage contract</p><h2>{covered.size} of 34 objectives mapped</h2><p>Every objective has at least one primary lesson and an observable learner decision.</p></div><div className="coverage-table" role="table" aria-label="PIER objective coverage"><div className="coverage-row coverage-head" role="row"><span>Topic</span><span>Objectives</span><span>Lessons</span></div>{topics.map((topic) => <div className="coverage-row" role="row" key={topic.id}><strong>0{topic.id}</strong><span>{topic.objectives.map((objective) => <b className={covered.has(objective) ? "covered" : "missing"} key={objective}>{objective}</b>)}</span><span>{lessons.filter((lesson) => lesson.manifest.topic === topic.id).map((lesson) => lesson.manifest.id).join(", ")}</span></div>)}</div></section>;
}

function TopicPage({ slug }: { slug: string }) {
  const topic = topicBySlug.get(slug);
  if (!topic) return <NotFound/>;
  const topicLessons = lessons.filter((lesson) => lesson.manifest.topic === topic.id);
  return <main className="inner-main"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href={href()}>Curriculum</a><span>→</span><span>Topic {topic.id}</span></nav><header className="topic-hero"><p className="eyebrow">PIER Topic {topic.id}</p><h1>{topic.title}</h1><p>{topic.summary}</p><div className="objective-row">{topic.objectives.map((objective) => <span key={objective}>{objective}</span>)}</div></header><section className="lesson-list"><h2>{topicLessons.length} interactive lessons</h2>{topicLessons.map((lesson, index) => <LessonListItem key={lesson.manifest.slug} lesson={lesson} index={index}/>)}</section></main>;
}

function LessonListItem({ lesson, index }: { lesson: LessonDefinition; index: number }) {
  const m = lesson.manifest;
  return <article className="lesson-list-item"><span className="lesson-index">{String(index + 1).padStart(2, "0")}</span><div><p>{m.difficulty} · {m.durationMinutes} minutes</p><h3><a href={href(`lessons/${m.slug}/`)}>{m.title}</a></h3><div className="tag-row">{m.pierObjectives.map((objective) => <span key={objective}>{objective}</span>)}{m.pilot && <span className="pilot-tag">Pilot pattern</span>}</div></div><a className="arrow-link" href={href(`lessons/${m.slug}/`)} aria-label={`Open ${m.title}`}>→</a></article>;
}

function LessonPage({ slug }: { slug: string }) {
  const lesson = lessonBySlug.get(slug);
  if (!lesson) return <NotFound/>;
  const [attempted, setAttempted] = useState(false);
  const { Introduction, Debrief } = lessonContent(slug);
  const topic = topics.find((item) => item.id === lesson.manifest.topic)!;
  return <main className="lesson-main"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href={href()}>Curriculum</a><span>→</span><a href={href(`topics/${topic.slug}/`)}>Topic {topic.id}</a><span>→</span><span>Lesson {lesson.manifest.id}</span></nav><header className="lesson-meta"><div className="tag-row">{lesson.manifest.pierObjectives.map((objective) => <span key={objective}>PIER {objective}</span>)}</div><div><span>{lesson.manifest.durationMinutes} minutes</span><span>{lesson.manifest.difficulty}</span><a href={href(`faculty/${slug}/`)}>Faculty guide</a></div></header><section className="mdx-content introduction-content">{Introduction ? <Introduction/> : <p>Introduction content is missing.</p>}</section><PilotLab kind={lesson.manifest.pilot}/><GenericExperience lesson={lesson} onAttempt={setAttempted}/>{attempted ? <section className="mdx-content debrief-content">{Debrief ? <Debrief/> : <p>Debrief content is missing.</p>}</section> : <section className="debrief-locked" aria-label="Debrief locked"><span aria-hidden="true">04 → 05</span><div><strong>Complete the validation to continue</strong><p>Choose a change and run the validation cases to open the debrief.</p></div></section>}<nav className="lesson-end-nav"><a href={href(`topics/${topic.slug}/`)}>← Back to Topic {topic.id}</a><a href={href(`faculty/${slug}/`)}>Open faculty guide →</a></nav></main>;
}

function FacultyPage({ slug }: { slug: string }) {
  const lesson = lessonBySlug.get(slug);
  if (!lesson) return <NotFound/>;
  const { Faculty, Practicum } = lessonContent(slug);
  return <main className="inner-main faculty-main"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href={href()}>Curriculum</a><span>→</span><a href={href(`lessons/${slug}/`)}>{lesson.manifest.title}</a><span>→</span><span>Faculty</span></nav><header className="faculty-hero"><p className="eyebrow">Editable faculty material</p><h1>{lesson.manifest.title}</h1><p>Objectives: {lesson.manifest.pierObjectives.join(", ")}</p></header><section className="mdx-content faculty-content">{Faculty ? <Faculty/> : <p>Faculty guide is missing.</p>}</section>{Practicum && <section className="mdx-content practicum-content"><Practicum/></section>}<section className="source-panel"><h2>Lesson sources</h2>{lesson.manifest.sources.map((source) => <article key={source.label}><h3><a href={source.url}>{source.label}</a></h3><p>{source.use}</p><small>{source.license}</small></article>)}</section></main>;
}

function NotFound() { return <main className="not-found"><p className="eyebrow">404</p><h1>This curriculum route does not exist.</h1><a className="primary-button" href={href()}>Return to the catalog</a></main>; }

export default function App() {
  const parts = routePath().replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  let page = <HubPage/>;
  if (parts[0] === "topics" && parts[1]) page = <TopicPage slug={parts[1]}/>;
  else if (parts[0] === "lessons" && parts[1]) page = <LessonPage slug={parts[1]}/>;
  else if (parts[0] === "faculty" && parts[1]) page = <FacultyPage slug={parts[1]}/>;
  else if (parts.length) page = <NotFound/>;
  return <SiteChrome>{page}</SiteChrome>;
}
