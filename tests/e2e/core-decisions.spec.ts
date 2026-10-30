import { test, expect } from "@playwright/test";
import { firstChecks } from "../../content/lessons/inside-a-results-journey/interaction";
import { finalChoices } from "../../content/lessons/can-we-accept-this-lot/interaction";
import { repairChoices } from "../../content/lessons/can-we-trust-this-report/interaction";
import { storageChoices } from "../../content/lessons/pixel-budget/interaction";
import {
  reviewChoices,
  monitorItems,
  monitoringFeedback,
} from "../../content/lessons/human-plus-algorithm/interaction";
import {
  orientationTasks,
  orientationCopy,
} from "../../content/lessons/steward-at-morning-huddle/interaction";
import {
  evidenceRows,
  evidenceLabel,
} from "../../content/lessons/choose-and-govern-lis/interaction";
for (const width of [1365, 390]) {
  for (const [slug, choices] of [
    ["inside-a-results-journey", firstChecks],
    ["can-we-accept-this-lot", finalChoices],
    ["can-we-trust-this-report", repairChoices],
    ["pixel-budget", storageChoices],
    ["human-plus-algorithm", reviewChoices],
  ] as const)
    test(`${width} ${slug} wrong and supported decision`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`lessons/${slug}/`);
      const wrong = choices.find(
          (c) => !("correct" in c ? c.correct : c.id === "validate" || c.id === "full"),
        )!,
        right = choices.find((c) =>
          "correct" in c ? c.correct : c.id === "validate" || c.id === "full",
        )!;
      await page.getByRole("radio", { name: wrong.label, exact: false }).check();
      await expect(page.locator(".experience").first()).toContainText(
        "feedback" in wrong ? wrong.feedback : wrong.note,
      );
      await page.getByRole("radio", { name: right.label, exact: false }).check();
      await expect(page.locator(".experience").first()).toContainText(
        "feedback" in right ? right.feedback : right.note,
      );
    });
  test(`${width} role assignment gives another attempt before revealing the lead`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/steward-at-morning-huddle/");
    const first = page.locator(".role-assignment-card").first(),
      select = first.getByRole("combobox");
    await select.selectOption(orientationTasks[0].owner === "it" ? "laboratory" : "it");
    await expect(first).toContainText(orientationCopy.hints[orientationTasks[0].id]);
    await expect(first).not.toContainText("should lead this work");
    await select.selectOption(orientationTasks[0].owner);
    await expect(first.locator(".correct-note")).toBeVisible();
  });
  test(`${width} LIS evidence decisions and independent preference weights`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/choose-and-govern-lis/");
    await page
      .getByRole("combobox", { name: "Alder: corrected reports evidence", exact: true })
      .selectOption("pass");
    await expect(page.locator("main")).toContainText("Look at the record again");
    for (const r of evidenceRows)
      await page
        .getByRole("combobox", { name: evidenceLabel(r), exact: true })
        .selectOption(r.answer);
    await page.getByRole("button", { name: "Check my nine classifications" }).click();
    await expect(page.locator("main")).toContainText("9 of 9");
    await page.getByRole("slider", { name: "training weight", exact: true }).focus();
    await page.keyboard.press("End");
    await expect(page.locator("main")).toContainText("Not all three shown working");
  });
  test(`${width} mitosis monitor rejects selecting every item`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/human-plus-algorithm/");
    await expect(page.getByRole("checkbox")).toHaveCount(monitorItems.length);
    for (const b of await page.getByRole("checkbox").all()) await b.check();
    await page
      .getByRole("combobox", { name: "Response to the Month 2 findings", exact: true })
      .selectOption("review");
    await expect(page.locator("main")).toContainText(monitoringFeedback.incomplete);
    for (const item of monitorItems.filter((m) => !m.correct))
      await page.getByRole("checkbox", { name: item.label, exact: true }).uncheck();
    await page
      .getByRole("combobox", { name: "Response to the Month 2 findings", exact: true })
      .selectOption("review");
    await expect(page.locator("main")).toContainText(monitoringFeedback.complete);
  });
}
