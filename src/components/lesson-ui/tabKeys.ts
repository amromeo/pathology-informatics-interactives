import type { KeyboardEvent } from "react";
export function tabKeys(event: KeyboardEvent<HTMLButtonElement>) {
  const tabs = Array.from(
      event.currentTarget
        .closest('[role="tablist"]')
        ?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
    ),
    i = tabs.indexOf(event.currentTarget);
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : event.key === "ArrowRight"
          ? (i + 1) % tabs.length
          : event.key === "ArrowLeft"
            ? (i + tabs.length - 1) % tabs.length
            : -1;
  if (next >= 0) {
    event.preventDefault();
    tabs[next].click();
    tabs[next].focus();
  }
}
