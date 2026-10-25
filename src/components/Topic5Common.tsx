import type { ComponentType } from "react";
export type Topic5Props = {
  Concepts?: ComponentType<Record<string, unknown>>;
  Bridge?: ComponentType<Record<string, unknown>>;
  onAttempt?: (value: boolean) => void;
};
export {
  LessonSection as Topic5Section,
  MdxBlock as Teaching,
  SourceInspector,
  SelectField as Topic5Select,
} from "./lesson-ui";
