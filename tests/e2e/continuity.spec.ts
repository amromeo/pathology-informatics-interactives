import { test, expect } from "@playwright/test";
import {
  tabletopPhases,
  initialDowntimeState,
  applyDecision,
  buildReconciliationRecords,
} from "../../content/lessons/twelve-hours-offline/interaction";
import { caseOverview } from "../../content/lessons/not-anonymous-enough/interaction";
import { terminologyDecisions } from "../../content/lessons/code-the-meaning/interaction";
import { rolloutPlans } from "../../content/lessons/alert-everyone-ignores/interaction";
for (const width of [1365, 390]) {
  test(`${width} downtime phases and reconciliation preserve focus`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/twelve-hours-offline/");
    let state = initialDowntimeState;
    for (const [i, phase] of tabletopPhases.entries()) {
      for (const decision of phase.decisions) {
        const group = page.getByRole("group", { name: decision.prompt, exact: true });
        const wrong = decision.choices.find((c) => !c.preferred)!,
          right = decision.choices.find((c) => c.preferred)!;
        await group.getByRole("radio", { name: wrong.label, exact: true }).check();
        await expect(group.getByRole("status")).toContainText(wrong.feedback);
        await group.getByRole("radio", { name: right.label, exact: true }).check();
        state = applyDecision(state, phase.id, right.id);
      }
      if (i < tabletopPhases.length - 1) {
        await page
          .getByRole("button", { name: "Continue to " + tabletopPhases[i + 1].title, exact: true })
          .click();
        await expect(page.locator("#downtime-phase-tab-" + (i + 1))).toBeFocused();
      }
    }
    await page.getByRole("button", { name: "Check reconciliation", exact: true }).click();
    await expect(page.locator("main")).toContainText("0 of");
    const records = buildReconciliationRecords(state);
    for (const r of records.paperRecords)
      await page
        .getByRole("combobox", { name: "Medical record number for " + r.tempId, exact: true })
        .selectOption(r.expectedMrn);
    for (const h of records.hazards)
      await page
        .getByRole("combobox", { name: "Action for " + h.title, exact: true })
        .selectOption(h.correctActionId);
    await page.getByRole("button", { name: "Check reconciliation", exact: true }).click();
    const n = records.paperRecords.length + records.hazards.length;
    await expect(page.locator("main")).toContainText(`${n} of ${n} items resolved`);
  });
  test(`${width} privacy decision explains both choices`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/not-anonymous-enough/");
    for (const c of [
      caseOverview.decisionChoices.find((c) => !c.correct)!,
      caseOverview.decisionChoices.find((c) => c.correct)!,
    ]) {
      await page.getByRole("radio", { name: c.label, exact: false }).check();
      await expect(page.locator("main")).toContainText(c.feedback);
    }
  });
  test(`${width} terminology preserves an open debrief after a revised decision`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/code-the-meaning/");
    const row = terminologyDecisions.problem;
    const select = page.getByRole("combobox", { name: row.label, exact: true });
    await select.selectOption(row.options.find((o) => o[0] !== row.answer)![0]);
    await page.getByRole("button", { name: "Open debrief", exact: true }).click();
    await select.selectOption(row.answer);
    await expect(page.locator("#lesson-debrief")).toBeVisible();
    await expect(page.locator("main")).toContainText(row.notes[row.answer]);
  });
  test(`${width} alert rollout explains expansion and review`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/alert-everyone-ignores/");
    for (const c of [
      rolloutPlans.find((c) => c.id !== "review")!,
      rolloutPlans.find((c) => c.id === "review")!,
    ]) {
      await page.getByRole("radio", { name: c.label, exact: false }).check();
      await expect(page.locator("main")).toContainText(c.note);
    }
  });
}
