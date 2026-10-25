import { createContext, useContext } from "react";
export const LessonResetContext = createContext<(() => void) | null>(null);
export function ResetLessonButton({ fallback }: { fallback?: () => void }) {
  const request = useContext(LessonResetContext);
  return (
    <button type="button" className="text-button lesson-reset" onClick={request ?? fallback}>
      Clear my answers and start this lesson over
    </button>
  );
}
