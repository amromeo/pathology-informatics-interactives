import { test, expect } from "@playwright/test";
import {
  archiveQuestions,
  linkedRecords,
} from "../../content/lessons/five-vs-slide-archive/interaction";
import { proposals, governance } from "../../content/lessons/model-under-pressure/interaction";
import {
  approvedBuild,
  buildControls,
  releaseRequirements,
} from "../../content/lessons/build-the-new-test/interaction";
import { reviewedCds, cdsControls } from "../../content/lessons/five-rights-right-test/interaction";
import {
  revisedValidation,
  validationControls,
  discordances,
} from "../../content/lessons/validate-before-go-live/interaction";
import {
  approvedNbs,
  nbsFields,
} from "../../content/lessons/newborn-screen-to-public-health/interaction";
for (const width of [1365, 390]) {
  test(width + " archive wrong/correct links and changed answers", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/five-vs-slide-archive/");
    await page.getByRole("button", { name: "Check the archive plan", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("0 of 5");
    for (const q of archiveQuestions)
      await page
        .getByRole("group", { name: q.prompt, exact: true })
        .locator('input[value="' + q.answer + '"]')
        .check();
    for (const r of linkedRecords)
      await page
        .getByRole("group", { name: "Action for " + r.id, exact: true })
        .locator('input[value="' + r.answer + '"]')
        .check();
    await page
      .getByRole("group", { name: "Which plan addresses this workload?", exact: true })
      .locator('input[value="separate"]')
      .check();
    await page.getByRole("button", { name: "Check the archive plan", exact: true }).click();
    await expect(page.locator(".experience .feedback.incorrect")).toHaveCount(0);
    await expect(page.locator(".experience")).toContainText("5 of 5");
    await page
      .getByRole("group", { name: archiveQuestions[0].prompt, exact: true })
      .locator('input[value="Velocity"]')
      .check();
    await expect(page.locator(".experience .feedback")).toHaveCount(0);
    await expect(page.locator("#lesson-debrief")).toBeVisible();
  });
  test(width + " AI classifications, subgroup review and governance", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/model-under-pressure/");
    await page.getByRole("button", { name: "Check the AI review", exact: true }).click();
    await expect(page.locator(".experience .feedback.incorrect").first()).toBeVisible();
    for (const r of proposals) {
      await page
        .getByRole("group", { name: r.id + ": model type", exact: true })
        .locator('input[value="' + r.kind + '"]')
        .check();
      await page
        .getByRole("group", { name: r.id + ": first review", exact: true })
        .locator('input[value="' + r.review + '"]')
        .check();
    }
    await page
      .getByRole("group", { name: "What explains the gap at first local use?", exact: true })
      .locator('input[value="generalize"]')
      .check();
    await page.locator('input[value="change"]').check();
    for (const r of governance)
      await page
        .getByRole("group", { name: r.prompt, exact: true })
        .locator('input[value="' + r.answer + '"]')
        .check();
    await page.getByRole("button", { name: "Check the AI review", exact: true }).click();
    await expect(page.locator(".experience .feedback.incorrect")).toHaveCount(0);
  });
  test(width + " build wrong/correct reports and checklist omissions", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/build-the-new-test/");
    await page.getByRole("button", { name: "Run eight report checks", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("0 / 8");
    for (const c of buildControls)
      await page
        .getByRole("combobox", { name: c.label, exact: true })
        .selectOption(approvedBuild[c.key]);
    await page.getByRole("button", { name: "Run eight report checks", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("8 / 8");
    for (const r of releaseRequirements)
      await page.getByRole("checkbox", { name: r.label, exact: false }).check();
    await page.getByRole("button", { name: "Review release recommendation", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("Do not recommend release yet");
    for (const r of releaseRequirements.filter((r) => !r.correct))
      await page.getByRole("checkbox", { name: r.label, exact: false }).uncheck();
    await page.getByRole("button", { name: "Review release recommendation", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("All eight result checks");
    await page
      .getByRole("combobox", { name: buildControls[0].label, exact: true })
      .selectOption(buildControls[0].options[0][0]);
    await expect(page.locator(".experience")).not.toContainText("8 / 8");
  });
  test(width + " CDS wrong/correct delivery and boundary cases", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/five-rights-right-test/");
    await page.getByRole("button", { name: "Run eight encounter checks", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("3 / 8");
    for (const c of cdsControls)
      await page
        .getByRole("combobox", { name: c.label, exact: true })
        .selectOption(reviewedCds[c.key]);
    await page.getByRole("button", { name: "Run eight encounter checks", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("8 / 8");
  });
  test(width + " WSI plan and reader disagreements", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/validate-before-go-live/");
    await expect(page.locator(".topic5-control")).not.toContainText(["Addressed", "Needs review"]);
    await page.getByRole("button", { name: "Check the validation plan", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("0/7");
    for (const c of validationControls)
      await page
        .getByRole("combobox", { name: c.label, exact: true })
        .selectOption(revisedValidation[c.key]);
    for (const r of discordances)
      await page
        .getByRole("radio", { name: r.choices.find((c) => c.correct)!.label, exact: true })
        .check();
    await page.getByRole("button", { name: "Check the validation plan", exact: true }).click();
    await expect(page.locator(".experience")).toContainText("7/7");
  });
  test(width + " newborn identity and terminology repair", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/newborn-screen-to-public-health/");
    for (const c of nbsFields)
      await page
        .getByRole("combobox", { name: c.label, exact: true })
        .selectOption(approvedNbs[c.key]);
    await page.locator(".experience button.primary-button").first().click();
    await expect(page.locator(".experience")).toContainText("8 of 8");
  });
}
