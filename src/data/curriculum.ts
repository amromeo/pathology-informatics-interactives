import { manifests } from "../generated/lessonManifests";
import type { LessonDefinition, TopicDefinition } from "./types";
import { caseOverview as c6 } from "../../content/lessons/server-behind-the-analyzer/interaction";
import { caseOverview as c7 } from "../../content/lessons/twelve-hours-offline/interaction";
import { caseOverview as c8 } from "../../content/lessons/not-anonymous-enough/interaction";
export const PIER_URL = "https://www.apcprods.org/assets/docs/pier/R5/PIER_Essentials_R5.pdf";
export const API_URL = "https://www.pathologyinformatics.org/teaching-slide-sets";
export const topics: TopicDefinition[] = [
  {
    id: 1,
    slug: "informatics-practice",
    title: "Informatics in Pathology Practice",
    objectives: ["1.1", "1.2", "1.3", "1.4"],
    summary: "Roles, stewardship, data literacy, and technical foundations.",
  },
  {
    id: 2,
    slug: "data-science",
    title: "Data Science",
    objectives: ["2.1", "2.2", "2.3", "2.4"],
    summary: "Data quality, statistics, scale, and responsible AI.",
  },
  {
    id: 3,
    slug: "availability-security",
    title: "Data Availability and Security",
    objectives: ["3.1", "3.2", "3.3", "3.4"],
    summary: "Confidentiality, integrity, availability, resilience, and responsible data use.",
  },
  {
    id: 4,
    slug: "lis-functions",
    title: "LIS Components and Functions",
    objectives: ["4.1", "4.2", "4.3", "4.4", "4.5"],
    summary: "Identity, rules, routing, tracking, and quality monitoring.",
  },
  {
    id: 5,
    slug: "interoperability",
    title: "Messaging Standards, Interoperability, and Interfaces",
    objectives: ["5.1", "5.2", "5.3", "5.4", "5.5"],
    summary: "Standards, terminology, middleware, and operational data use.",
  },
  {
    id: 6,
    slug: "clinical-decision-support",
    title: "Clinical Decision Support",
    objectives: ["6.1", "6.2", "6.3", "6.4"],
    summary: "Designing and evaluating support that fits clinical work.",
  },
  {
    id: 7,
    slug: "digital-pathology",
    title: "Digital Pathology Systems",
    objectives: ["7.1", "7.2", "7.3", "7.4"],
    summary: "Images, displays, analysis, validation, and oversight.",
  },
  {
    id: 8,
    slug: "lis-ehr-projects",
    title: "Pathologist Role in LIS and EHR Projects",
    objectives: ["8.1", "8.2", "8.3", "8.4"],
    summary: "Test builds, selection, change control, and lifecycle governance.",
  },
];
const overview: Record<string, Omit<LessonDefinition, "manifest">> = {
  "server-behind-the-analyzer": c6,
  "twelve-hours-offline": c7,
  "not-anonymous-enough": c8,
};
export const lessons: LessonDefinition[] = manifests
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map((manifest) => ({
    manifest,
    ...(overview[manifest.slug] ?? {
      artifactTitle: manifest.title,
      evidence: [],
      trace: [],
      decisionPrompt: "",
      decisionChoices: [],
      repairPrompt: "",
      repairChoices: [],
      validationCases: [],
    }),
  }));
export const lessonBySlug = new Map(lessons.map((l) => [l.manifest.slug, l]));
export const topicBySlug = new Map(topics.map((t) => [t.slug, t]));
