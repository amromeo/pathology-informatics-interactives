export type Difficulty = "foundational" | "applied" | "stewardship";

export type LessonExperience =
  | "generic"
  | "orientation"
  | "result-journey"
  | "data-quality"
  | "statistics"
  | "multimodal"
  | "ai-foundations"
  | "ai-deployment";

export type PierCoverageClaim = {
  id: string;
  objective: string;
  summary: string;
  learnerAction: string;
  primary: boolean;
};

export type SourceReference = {
  label: string;
  url: string;
  license: string;
  use: string;
};

export type LessonManifest = {
  id: string;
  slug: string;
  title: string;
  topic: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  pierObjectives: string[];
  durationMinutes: number;
  difficulty: Difficulty;
  interactionKinds: string[];
  apiSessions: number[];
  sources: SourceReference[];
  hasLocalPracticum: boolean;
  experience?: LessonExperience;
  pierCoverage?: PierCoverageClaim[];
  pilot?: "data-quality" | "interoperability" | "downtime" | "digital-pathology";
};

export type EvidenceItem = {
  label: string;
  value: string;
  tone?: "neutral" | "warning" | "critical" | "positive";
};

export type TraceStep = {
  system: string;
  role: string;
  sees: string;
  implication: string;
};

export type Choice = {
  id: string;
  label: string;
  correct?: boolean;
  feedback: string;
};

export type ValidationCase = {
  name: string;
  note: string;
  passingRepairs: string[];
  failNotes?: Record<string, string>;
};

export type LessonDefinition = {
  manifest: LessonManifest;
  artifactTitle: string;
  evidence: EvidenceItem[];
  trace: TraceStep[];
  decisionPrompt: string;
  decisionChoices: Choice[];
  repairPrompt: string;
  repairChoices: Choice[];
  validationCases: ValidationCase[];
};

export type TopicDefinition = {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  slug: string;
  title: string;
  objectives: string[];
  summary: string;
};
