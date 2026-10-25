import { lessonCheck } from "./checks";
import { LessonContents } from "./components/LessonContents";
import { AdditionalReview } from "./components/AdditionalReview";
const MultimodalExperience = lazy(() =>
  import("./components/MultimodalExperience").then((m) => ({ default: m.MultimodalExperience })),
);
const AiDeploymentExperience = lazy(() =>
  import("./components/AiDeploymentExperience").then((m) => ({
    default: m.AiDeploymentExperience,
  })),
);
import { LessonErrorBoundary } from "./components/lesson-ui";
import { objectiveById, pierObjectives } from "./data/pierObjectives";
import { suggestedPath } from "./data/lessonSummaries";
import { LessonResetContext } from "./components/ResetLessonButton";
const TestBuildExperience = lazy(() =>
  import("./components/TestBuildExperience").then((m) => ({ default: m.TestBuildExperience })),
);
const LisSelectionExperience = lazy(() =>
  import("./components/LisSelectionExperience").then((m) => ({
    default: m.LisSelectionExperience,
  })),
);
import "./components/Topic7.css";
const PixelBudgetExperience = lazy(() =>
  import("./components/PixelBudgetExperience").then((m) => ({ default: m.PixelBudgetExperience })),
);
const WsiValidationExperience = lazy(() =>
  import("./components/WsiValidationExperience").then((m) => ({
    default: m.WsiValidationExperience,
  })),
);
const MitosisReviewExperience = lazy(() =>
  import("./components/MitosisReviewExperience").then((m) => ({
    default: m.MitosisReviewExperience,
  })),
);
const CdsDesignExperience = lazy(() =>
  import("./components/CdsDesignExperience").then((m) => ({ default: m.CdsDesignExperience })),
);
const AlertEvaluationExperience = lazy(() =>
  import("./components/AlertEvaluationExperience").then((m) => ({
    default: m.AlertEvaluationExperience,
  })),
);
const FlagExperience = lazy(() =>
  import("./components/FlagExperience").then((m) => ({ default: m.FlagExperience })),
);
const NewbornExperience = lazy(() =>
  import("./components/NewbornExperience").then((m) => ({ default: m.NewbornExperience })),
);
const TerminologyExperience = lazy(() =>
  import("./components/TerminologyExperience").then((m) => ({ default: m.TerminologyExperience })),
);
const QueueExperience = lazy(() =>
  import("./components/QueueExperience").then((m) => ({ default: m.QueueExperience })),
);
import { lazy, Suspense, useEffect, useState, useRef, type ComponentType } from "react";
import { lessonContent } from "./content";
const DataQualityExperience = lazy(() =>
  import("./components/DataQualityExperience").then((m) => ({ default: m.DataQualityExperience })),
);
const DowntimeExperience = lazy(() =>
  import("./components/DowntimeExperience").then((m) => ({ default: m.DowntimeExperience })),
);
const OrientationExperience = lazy(() =>
  import("./components/OrientationExperience").then((m) => ({ default: m.OrientationExperience })),
);
const PrivacyExperience = lazy(() =>
  import("./components/PrivacyExperience").then((m) => ({ default: m.PrivacyExperience })),
);
const ResultJourneyExperience = lazy(() =>
  import("./components/ResultJourneyExperience").then((m) => ({
    default: m.ResultJourneyExperience,
  })),
);
const SecurityReviewExperience = lazy(() =>
  import("./components/SecurityReviewExperience").then((m) => ({
    default: m.SecurityReviewExperience,
  })),
);
const SpecimenRoutingExperience = lazy(() =>
  import("./components/SpecimenRoutingExperience").then((m) => ({
    default: m.SpecimenRoutingExperience,
  })),
);
const AutoverificationExperience = lazy(() =>
  import("./components/AutoverificationExperience").then((m) => ({
    default: m.AutoverificationExperience,
  })),
);
const ReflexRuleExperience = lazy(() =>
  import("./components/ReflexRuleExperience").then((m) => ({ default: m.ReflexRuleExperience })),
);
const StatisticsExperience = lazy(() =>
  import("./components/StatisticsExperience").then((m) => ({ default: m.StatisticsExperience })),
);
import { SiteChrome, href } from "./components/SiteChrome";
import { lessonBySlug, lessons, PIER_URL, API_URL, topicBySlug, topics } from "./data/curriculum";
import type { LessonDefinition } from "./data/types";
import type { LessonExperience } from "./data/types";

type MdxComponent = ComponentType<Record<string, unknown>>;
export type ExperienceProps = {
  lesson: LessonDefinition;
  Concepts?: MdxComponent;
  Bridge?: MdxComponent;
  Downtime?: MdxComponent;
  Comparison?: MdxComponent;
  Investigation?: MdxComponent;
  onAttempt: (attempted: boolean) => void;
};

const experienceRegistry: Partial<Record<LessonExperience, ComponentType<ExperienceProps>>> = {
  multimodal: MultimodalExperience,
  "ai-deployment": AiDeploymentExperience,
  "test-build": TestBuildExperience,
  "lis-selection": LisSelectionExperience,
  "pixel-budget": PixelBudgetExperience,
  "wsi-validation": WsiValidationExperience,
  "mitosis-review": MitosisReviewExperience,
  "cds-design": CdsDesignExperience,
  "alert-evaluation": AlertEvaluationExperience,
  "flag-trace": FlagExperience,
  "newborn-exchange": NewbornExperience,
  "terminology-review": TerminologyExperience,
  "queue-analysis": QueueExperience,
  autoverification: AutoverificationExperience,
  "reflex-rule": ReflexRuleExperience,
  "specimen-routing": SpecimenRoutingExperience,
  orientation: OrientationExperience,
  "result-journey": ResultJourneyExperience,
  "data-quality": DataQualityExperience,
  statistics: StatisticsExperience,
  privacy: PrivacyExperience,
  downtime: DowntimeExperience,
  "security-review": SecurityReviewExperience,
};

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const routePath = () => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = window.location.pathname;
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
};

function ObjectiveList({ ids, lesson }: { ids: string[]; lesson?: LessonDefinition }) {
  return (
    <ul className="objective-list">
      {ids.map((id) => (
        <li key={id}>
          <a href={href("#objective-" + id)}>{id}</a> — {objectiveById.get(id)?.summary}
          {lesson ? (
            <ul>
              {lesson.manifest.pierCoverage
                ?.filter((c) => c.objective === id)
                .map((c) => (
                  <li key={c.id}>{c.learnerAction}</li>
                ))}
            </ul>
          ) : (
            <p>
              {lessons
                .filter((l) => l.manifest.pierObjectives.includes(id))
                .map((l) => (
                  <a
                    className="objective-lesson"
                    key={l.manifest.slug}
                    href={href("lessons/" + l.manifest.slug + "/")}
                  >
                    Lesson {l.manifest.id}: {l.manifest.title} (Topic {l.manifest.topic})
                  </a>
                ))}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
function LessonPager({ lesson }: { lesson: LessonDefinition }) {
  const index = lessons.indexOf(lesson),
    previous = lessons[index - 1],
    next = lessons[index + 1];
  return (
    <nav className="lesson-pager" aria-label="Lesson navigation">
      {previous ? (
        <a className="secondary-button" href={href("lessons/" + previous.manifest.slug + "/")}>
          ← Lesson {previous.manifest.id}: {previous.manifest.title}
        </a>
      ) : (
        <a href={href()}>Back to curriculum</a>
      )}
      {next ? (
        <a className="primary-button" href={href("lessons/" + next.manifest.slug + "/")}>
          {next.manifest.topic !== lesson.manifest.topic && (
            <small>
              Next topic: {topics.find((t) => t.id === next.manifest.topic)?.title}
              <br />
            </small>
          )}
          Lesson {next.manifest.id}: {next.manifest.title} · {next.manifest.durationMinutes} min →
        </a>
      ) : (
        <a className="primary-button" href={href()}>
          Back to curriculum →
        </a>
      )}
    </nav>
  );
}
function FacultyLink({ slug }: { slug: string }) {
  return (
    <a className="faculty-link" href={href("faculty/" + slug + "/")} target="_blank" rel="noopener">
      Facilitator guide (contains answers; opens in a new tab)
    </a>
  );
}
function HubPage() {
  useDocumentTitle("Pathology Informatics Interactives");
  const minutes = lessons.reduce((n, l) => n + l.manifest.durationMinutes, 0);
  return (
    <main id="main" tabIndex={-1}>
      <section className="hub-hero">
        <div>
          <p className="eyebrow">Pathology resident curriculum</p>
          <h1>Learn informatics through laboratory cases.</h1>
          <p className="hero-lede">
            Inspect the records, make a decision, and see what changes for the laboratory.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={href("lessons/" + lessons[0].manifest.slug + "/")}>
              Start lesson 1
            </a>
            <a className="secondary-button" href="#topics">
              Browse all topics
            </a>
          </div>
          <p className="curriculum-facts">
            {lessons.length} lessons · 20–50 minutes each · {minutes} minutes total (about{" "}
            {(minutes / 60).toFixed(1)} hours) · No account; answers are not saved · Phone and
            laptop
          </p>
        </div>
        <aside className="hero-card">
          <span>How a lesson works</span>
          <ol>
            <li>Read the case</li>
            <li>Inspect the laboratory records</li>
            <li>Make and test a decision</li>
            <li>Read the debrief</li>
          </ol>
        </aside>
      </section>
      <section className="catalog-section">
        <h2>How to use this</h2>
        <div className="topic-grid">
          <article>
            <h3>Residents</h3>
            <p>
              Start with a case that fits your rotation. Try the decisions, then use the debrief to
              explain your reasoning.
            </p>
          </article>
          <article>
            <h3>Faculty</h3>
            <p>
              Project the records and ask the group what to check next. Each facilitator guide
              includes expected reasoning and discussion prompts.
            </p>
          </article>
          <article>
            <h3>Program directors</h3>
            <p>
              Use the objective summaries to assign lessons. Check the linked activities and
              development status before claiming coverage.
            </p>
          </article>
        </div>
        <details>
          <summary>Suggested learning path</summary>
          <ol>
            {suggestedPath.map((id) => {
              const l = lessons[id - 1];
              return (
                <li key={id}>
                  <a href={href("lessons/" + l.manifest.slug + "/")}>
                    Lesson {l.manifest.id}: {l.manifest.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </details>
      </section>
      <section className="catalog-section" id="topics">
        <h2>Eight topic areas</h2>
        <p>
          Browse laboratory roles, data, security, information systems, messages, decision support,
          images and system projects.
        </p>
        <div className="topic-grid">
          {topics.map((topic) => {
            const group = lessons.filter((l) => l.manifest.topic === topic.id);
            return (
              <article className="topic-card" key={topic.id}>
                <span>Topic {topic.id}</span>
                <h3>
                  <a href={href("topics/" + topic.slug + "/")}>{topic.title}</a>
                </h3>
                <p>{topic.summary}</p>
                <footer>
                  <strong>
                    {group.length} lessons ·{" "}
                    {group.reduce((n, l) => n + l.manifest.durationMinutes, 0)} min
                  </strong>
                </footer>
              </article>
            );
          })}
        </div>
      </section>
      <Coverage />
      <section className="about-section" id="about">
        <div>
          <h2>About the curriculum</h2>
        </div>
        <div>
          <p>
            This independently developed curriculum follows{" "}
            <a href={PIER_URL}>PIER Essentials Release 5</a>. The{" "}
            <a href={API_URL}>API teaching slide sets</a> support the teaching. Cases, artifacts and
            questions are original.
          </p>
          <p>
            This is not an official PIER product. Sources and their terms are listed in the
            facilitator guides. The author has deferred choosing a reuse license for this project.
          </p>
        </div>
      </section>
    </main>
  );
}
function Coverage() {
  const covered = new Set(
    lessons
      .filter((l) => l.manifest.status !== "draft")
      .flatMap((l) =>
        (l.manifest.pierCoverage ?? [])
          .filter((c) => c.primary && c.taughtIn?.includes("interaction"))
          .map((c) => c.objective),
      ),
  );
  return (
    <section className="coverage-section" id="coverage">
      <h2>PIER objective coverage</h2>
      <p>
        {covered.size} of {pierObjectives.length} objectives have a published primary interactive
        lesson. Review the activities below; a mapping alone does not show that every subtopic is
        taught.
      </p>
      <div className="table-scroll" role="region" aria-label="Curriculum coverage" tabIndex={0}>
        <table>
          <caption>Objectives and linked lessons, including lessons in other topics</caption>
          <thead>
            <tr>
              <th scope="col">Objective</th>
              <th scope="col">What it covers</th>
              <th scope="col">Lessons</th>
            </tr>
          </thead>
          <tbody>
            {pierObjectives.map((o) => (
              <tr id={"objective-" + o.id} key={o.id}>
                <th scope="row">{o.id}</th>
                <td>{o.summary}</td>
                <td>
                  {lessons
                    .filter((l) => l.manifest.pierObjectives.includes(o.id))
                    .map((l) => (
                      <p key={l.manifest.slug}>
                        <a href={href("lessons/" + l.manifest.slug + "/")}>
                          {l.manifest.id}: {l.manifest.title}
                        </a>{" "}
                        {l.manifest.status === "draft" ? "— in development" : ""}
                      </p>
                    ))}
                  {!covered.has(o.id) && <strong>In development</strong>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
function TopicPage({ slug }: { slug: string }) {
  const topic = topicBySlug.get(slug);
  useDocumentTitle(
    topic ? topic.title + " | Pathology Informatics Interactives" : "Topic not found",
  );
  if (!topic) return <NotFound />;
  const group = lessons.filter((l) => l.manifest.topic === topic.id),
    index = topics.indexOf(topic);
  return (
    <main id="main" tabIndex={-1} className="inner-main">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href={href()}>Curriculum</a>
        <span aria-hidden="true">→</span>
        <span aria-current="page">Topic {topic.id}</span>
      </nav>
      <header className="topic-hero">
        <p className="eyebrow">
          Topic {topic.id} · {group.length} lessons ·{" "}
          {group.reduce((n, l) => n + l.manifest.durationMinutes, 0)} min
        </p>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
      </header>
      <section className="lesson-list">
        <h2>Lessons</h2>
        {group.map((l) => (
          <LessonListItem key={l.manifest.slug} lesson={l} />
        ))}
      </section>
      <section>
        <h2>Objectives in this topic</h2>
        <ObjectiveList ids={topic.objectives} />
      </section>
      <nav className="lesson-pager" aria-label="Topic navigation">
        {topics[index - 1] && (
          <a href={href("topics/" + topics[index - 1].slug + "/")}>← {topics[index - 1].title}</a>
        )}
        {topics[index + 1] && (
          <a href={href("topics/" + topics[index + 1].slug + "/")}>{topics[index + 1].title} →</a>
        )}
      </nav>
    </main>
  );
}
function LessonListItem({ lesson }: { lesson: LessonDefinition }) {
  const m = lesson.manifest;
  return (
    <article className="lesson-list-item">
      <span className="lesson-index">{m.id}</span>
      <div>
        <p>
          {m.difficulty} · {m.durationMinutes} minutes
        </p>
        <h3>
          <a href={href("lessons/" + m.slug + "/")}>{m.title}</a>
        </h3>
        <p>{m.summary}</p>
        {m.status === "draft" && (
          <p className="draft-notice">In development: does not yet fully teach this objective</p>
        )}
      </div>
    </article>
  );
}
function LessonPage({ slug }: { slug: string }) {
  const lesson = lessonBySlug.get(slug);
  useDocumentTitle(
    lesson
      ? `${lesson.manifest.title} | Pathology Informatics Interactives`
      : "Lesson not found | Pathology Informatics Interactives",
  );
  const [debriefOpen, setDebriefOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const debriefRef = useRef<HTMLElement>(null);
  const focusDebriefOnOpen = useRef(false);
  const resetDialog = useRef<HTMLDialogElement>(null);
  const resetOrigin = useRef<HTMLElement | null>(null);
  const openDebrief = (value: boolean) => {
    if (value) setDebriefOpen(true);
  };
  const requestReset = () => {
    resetOrigin.current = document.activeElement as HTMLElement;
    resetDialog.current?.showModal();
  };
  useEffect(() => {
    if (debriefOpen && focusDebriefOnOpen.current) {
      debriefRef.current?.focus({ preventScroll: true });
      debriefRef.current?.scrollIntoView({ block: "start" });
      focusDebriefOnOpen.current = false;
    }
  }, [debriefOpen]);
  if (!lesson) return <NotFound />;
  const {
    Introduction,
    Debrief,
    Concepts,
    Bridge,
    Downtime,
    Comparison,
    Investigation,
    Practicum,
  } = lessonContent(slug);
  const Check = lessonCheck(slug);
  const topic = topics.find((item) => item.id === lesson.manifest.topic)!;
  const experience = lesson.manifest.experience ?? "generic";
  const Experience = experienceRegistry[experience];
  return (
    <main
      id="main"
      tabIndex={-1}
      className={
        "lesson-main " +
        (lesson.manifest.layout === "system"
          ? "wide-lesson system-lesson"
          : lesson.manifest.layout === "wide"
            ? "wide-lesson"
            : "")
      }
    >
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href={href()}>Curriculum</a>
        <span>→</span>
        <a href={href(`topics/${topic.slug}/`)}>Topic {topic.id}</a>
        <span>→</span>
        <span>Lesson {lesson.manifest.id}</span>
      </nav>
      <header className="lesson-meta">
        <details>
          <summary>PIER objectives in this lesson</summary>
          <ObjectiveList ids={lesson.manifest.pierObjectives} lesson={lesson} />
        </details>
        <div>
          {lesson.manifest.durationMinutes} minutes · {lesson.manifest.difficulty}
        </div>
      </header>

      {lesson.manifest.status === "draft" && (
        <p className="draft-notice">In development: does not yet fully teach this objective</p>
      )}
      {lesson.manifest.prerequisites?.length ? (
        <p className="prerequisites">
          Helpful first:{" "}
          {lesson.manifest.prerequisites.map((p) => {
            const prior = lessonBySlug.get(p);
            return prior ? (
              <a key={p} href={href("lessons/" + p + "/")}>
                Lesson {prior.manifest.id} — {prior.manifest.title}
              </a>
            ) : null;
          })}
        </p>
      ) : null}
      <div className="lesson-body">
        <LessonContents />
        <div className="lesson-material">
          <section
            className="mdx-content introduction-content"
            id="lesson-introduction"
            tabIndex={-1}
          >
            {Introduction ? <Introduction /> : <p>Introduction content is missing.</p>}
          </section>
          <LessonResetContext.Provider value={requestReset}>
            <div key={resetKey} className="experience">
              <LessonErrorBoundary>
                <Suspense
                  fallback={
                    <div className="loading-section" role="status">
                      Loading the exercise…
                    </div>
                  }
                >
                  {Experience ? (
                    <Experience
                      lesson={lesson}
                      Concepts={Concepts}
                      Bridge={Bridge}
                      Downtime={Downtime}
                      Comparison={Comparison}
                      Investigation={Investigation}
                      onAttempt={openDebrief}
                    />
                  ) : (
                    <p>
                      This interactive exercise could not load. Use the debrief and facilitator
                      guide below.
                    </p>
                  )}
                </Suspense>
              </LessonErrorBoundary>
              <AdditionalReview slug={slug} />
            </div>
          </LessonResetContext.Provider>
          <dialog ref={resetDialog} aria-labelledby="reset-title">
            <h2 id="reset-title">Clear every answer in this lesson?</h2>
            <p>Your choices and results will be removed.</p>
            <div className="action-row">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  resetDialog.current?.close();
                  resetOrigin.current?.focus();
                }}
              >
                Keep my answers
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setResetKey((key) => key + 1);
                  setDebriefOpen(false);
                  resetDialog.current?.close();
                  document.getElementById("lesson-introduction")?.focus();
                }}
              >
                Clear all answers
              </button>
            </div>
          </dialog>
          <div id="debrief-start" />
          {debriefOpen ? (
            <section
              className="mdx-content debrief-content"
              id="lesson-debrief"
              ref={debriefRef}
              tabIndex={-1}
            >
              {Debrief ? <Debrief components={{ h1: "h2" }} /> : <p>Debrief content is missing.</p>}
            </section>
          ) : (
            <section className="debrief-ready" aria-label="Debrief available">
              <span aria-hidden="true">Review</span>
              <div>
                <strong>Open the debrief when you are ready</strong>
                <p>You do not need to answer every question first.</p>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    focusDebriefOnOpen.current = true;
                    setDebriefOpen(true);
                  }}
                >
                  Open debrief
                </button>
              </div>
            </section>
          )}
          {debriefOpen && Check && (
            <Suspense
              fallback={
                <div className="loading-section" role="status">
                  Loading questions…
                </div>
              }
            >
              <Check key={resetKey} />
            </Suspense>
          )}
          {debriefOpen && Practicum && (
            <section className="mdx-content practicum-content">
              <h2>Apply it at your institution (optional, with a supervisor)</h2>
              <Practicum components={{ h1: "h3", h2: "h3", h3: "h4" }} />
            </section>
          )}
          <LessonPager lesson={lesson} />
          <FacultyLink slug={slug} />
        </div>
      </div>
    </main>
  );
}

function FacultyPage({ slug }: { slug: string }) {
  const lesson = lessonBySlug.get(slug);
  useDocumentTitle(
    lesson
      ? `${lesson.manifest.title} — Faculty Guide | Pathology Informatics Interactives`
      : "Faculty guide not found | Pathology Informatics Interactives",
  );
  if (!lesson) return <NotFound />;
  const { Faculty, Practicum } = lessonContent(slug);
  return (
    <main id="main" tabIndex={-1} className="inner-main faculty-main">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href={href()}>Curriculum</a>
        <span>→</span>
        <a href={href(`lessons/${slug}/`)}>{lesson.manifest.title}</a>
        <span>→</span>
        <span>Faculty</span>
      </nav>
      <header className="faculty-hero">
        <p className="eyebrow">For faculty: facilitation notes and expected reasoning</p>
        <h1>{lesson.manifest.title}</h1>
        <p>
          <a href={href("lessons/" + slug + "/")}>Learners: finish the lesson first</a>
        </p>
        <ObjectiveList ids={lesson.manifest.pierObjectives} lesson={lesson} />
      </header>
      <section className="mdx-content faculty-content">
        {Faculty ? (
          <Faculty components={{ h1: "h2", h2: "h3", h3: "h4" }} />
        ) : (
          <p>Faculty guide is missing.</p>
        )}
      </section>
      {Practicum && (
        <section className="mdx-content practicum-content">
          <Practicum components={{ h1: "h2", h2: "h3", h3: "h4" }} />
        </section>
      )}
      <section className="source-panel">
        <h2>Lesson sources</h2>
        {lesson.manifest.sources.map((source) => (
          <article key={source.label}>
            <h3>
              <a href={source.url}>{source.label}</a>
            </h3>
            <p>{source.use}</p>
            <small>{source.license}</small>
          </article>
        ))}
      </section>
    </main>
  );
}

function NotFound() {
  useDocumentTitle("Page not found | Pathology Informatics Interactives");
  return (
    <main id="main" tabIndex={-1} className="not-found">
      <p className="eyebrow">404</p>
      <h1>This curriculum route does not exist.</h1>
      <a className="primary-button" href={href()}>
        Return to the catalog
      </a>
    </main>
  );
}

export default function App() {
  const parts = routePath()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);
  let page = <HubPage />;
  if (parts[0] === "topics" && parts[1]) page = <TopicPage slug={parts[1]} />;
  else if (parts[0] === "lessons" && parts[1]) page = <LessonPage slug={parts[1]} />;
  else if (parts[0] === "faculty" && parts[1]) page = <FacultyPage slug={parts[1]} />;
  else if (parts.length) page = <NotFound />;
  return (
    <SiteChrome>
      <LessonErrorBoundary key={parts.join("/")}>
        <Suspense
          fallback={
            <main id="main" className="loading-lesson" aria-live="polite">
              Loading lesson…
            </main>
          }
        >
          {page}
        </Suspense>
      </LessonErrorBoundary>
    </SiteChrome>
  );
}
