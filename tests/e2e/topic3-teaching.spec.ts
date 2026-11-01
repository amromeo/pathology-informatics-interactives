import { test, expect, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import {
  securityFindings,
  securityControls,
  referencePortfolio,
  additionalExercises,
} from "../../content/lessons/server-behind-the-analyzer/interaction";
import {
  tabletopPhases,
  buildReconciliationRecords,
  applyDecision,
  initialDowntimeState,
  resumptionChoices,
} from "../../content/lessons/twelve-hours-offline/interaction";
import {
  transformOptions,
  caseOverview,
} from "../../content/lessons/not-anonymous-enough/interaction";

const review = "review/server-outage-privacy-2026-11-01";
async function capture(page: Page, name: string) {
  await mkdir(review, { recursive: true });
  await page.screenshot({ path: `${review}/${name}.png` });
}
async function reset(page: Page) {
  await page
    .getByRole("button", { name: "Clear my answers and start this lesson over", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Clear all answers", exact: true }).click();
  await expect(page.locator("#lesson-introduction")).toBeFocused();
}
async function enter(page: Page, slug: string, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`lessons/${slug}/`);
  await expect(
    page.getByRole("heading", { name: "Terms used in this case", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("heading", { name: "Terms used in this case", exact: true })
    .scrollIntoViewIfNeeded();
  await capture(page, `${slug}-${width}-terms`);
  await page.getByRole("button", { name: "Open debrief", exact: true }).click();
  await expect(page.locator("#lesson-debrief")).toBeFocused();
  await reset(page);
}
for (const width of [1365, 390]) {
  test(`${width} server explanations, changed mapping and control plan`, async ({ page }) => {
    await enter(page, "server-behind-the-analyzer", width);
    const finding = page.locator(".security-finding-grid > article").first();
    await finding.getByRole("checkbox", { name: "Confidentiality", exact: true }).check();
    await finding.getByRole("button", { name: "Check this mapping" }).click();
    await expect(finding).toContainText("incomplete");
    await finding.scrollIntoViewIfNeeded();
    await capture(page, `server-${width}-wrong`);
    await finding.getByRole("checkbox", { name: "Confidentiality", exact: true }).uncheck();
    await expect(finding.locator(".security-map-feedback")).toHaveCount(0);
    for (const [index, item] of securityFindings.entries()) {
      const card = page.locator(".security-finding-grid > article").nth(index);
      for (const property of item.properties)
        await card.getByRole("checkbox", { name: new RegExp(`^${property}$`, "i") }).check();
      await card.getByRole("button", { name: "Check this mapping" }).click();
    }
    await expect(page.locator(".security-map-summary")).toContainText("6 of 6");
    const low = securityControls.find((c) => c.id === "keyboard-lock")!;
    await page.getByRole("checkbox", { name: new RegExp(low.title) }).check();
    await page.getByRole("button", { name: "Test the control plan", exact: true }).click();
    await expect(page.locator(".security-stress-summary")).toContainText("0 of 5");
    await page.getByRole("checkbox", { name: new RegExp(low.title) }).uncheck();
    await expect(page.locator(".security-stress-summary")).toContainText("not run");
    for (const id of referencePortfolio)
      await page
        .getByRole("checkbox", {
          name: new RegExp(securityControls.find((c) => c.id === id)!.title),
        })
        .check();
    await page.getByRole("button", { name: "Test the control plan", exact: true }).click();
    await expect(page.locator(".security-stress-summary")).toContainText("5 of 5");
    await expect(page.locator(".security-scenario-grid .status-partial")).toHaveCount(1);
    await page.locator(".security-stress-summary").scrollIntoViewIfNeeded();
    await capture(page, `server-${width}-plan`);
    const section = page.getByRole("region", { name: additionalExercises.title, exact: true });
    for (const q of additionalExercises.questions) {
      const group = section.getByRole("group", { name: q.prompt, exact: true });
      for (const wrong of q.choices.filter((c) => c.id !== q.answer)) {
        await group.locator(`input[value="${wrong.id}"]`).check();
        await section.getByRole("button", { name: "Check these decisions" }).click();
        await expect(section).toContainText(
          q.feedbackByChoice[wrong.id as keyof typeof q.feedbackByChoice]!,
        );
      }
      await group.locator(`input[value="${q.answer}"]`).check();
    }
    await section.getByRole("button", { name: "Check these decisions" }).click();
    await expect(section.locator(".feedback.correct")).toHaveCount(5);
    await reset(page);
    await expect(page.locator(".security-control-grid input:checked")).toHaveCount(0);
  });

  test(`${width} downtime wrong matches, recovery actions and earlier decisions`, async ({
    page,
  }) => {
    await enter(page, "twelve-hours-offline", width);
    let state = initialDowntimeState;
    for (const [index, phase] of tabletopPhases.entries()) {
      for (const decision of phase.decisions) {
        const group = page.getByRole("group", { name: decision.prompt, exact: true });
        const wrong = decision.choices.find((c) => !c.preferred)!;
        const right = decision.choices.find((c) => c.preferred)!;
        await group.getByRole("radio", { name: wrong.label, exact: true }).check();
        await expect(group).toContainText(wrong.feedback);
        await group.getByRole("radio", { name: right.label, exact: true }).check();
        state = applyDecision(state, phase.id, right.id);
      }
      if (index < 2)
        await page
          .getByRole("button", { name: `Continue to ${tabletopPhases[index + 1].title}` })
          .click();
    }
    await page.getByRole("link", { name: "paper-to-electronic comparison" }).click();
    await expect(page.locator("#downtime-records")).toBeFocused();
    const records = buildReconciliationRecords(state);
    for (const row of records.paperRecords)
      await page
        .getByRole("combobox", { name: `Medical record number for ${row.tempId}`, exact: true })
        .selectOption(row.expectedMrn);
    const firstMatch = page.getByRole("combobox", {
      name: "Medical record number for DT-201",
      exact: true,
    });
    await firstMatch.selectOption(records.paperRecords[1].expectedMrn);
    for (const hazard of records.hazards)
      await page
        .getByRole("combobox", { name: `Action for ${hazard.title}`, exact: true })
        .selectOption(hazard.actions.find((a) => a.id !== hazard.correctActionId)!.id);
    await page.getByRole("button", { name: "Check reconciliation", exact: true }).click();
    await expect(firstMatch.locator("xpath=../..")).toContainText("not the verified match");
    if (width === 390) {
      const recordRegion = page.getByRole("region", { name: "Downtime reconciliation records" });
      await expect
        .poll(() =>
          recordRegion.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
        )
        .toBe(true);
    }
    await firstMatch.scrollIntoViewIfNeeded();
    await capture(page, `downtime-${width}-wrong-match`);
    await firstMatch.selectOption(records.paperRecords[0].expectedMrn);
    await expect(page.locator(".downtime-score-row")).toContainText("not checked");
    for (const hazard of records.hazards)
      await page
        .getByRole("combobox", { name: `Action for ${hazard.title}`, exact: true })
        .selectOption(hazard.correctActionId);
    await page.getByRole("button", { name: "Check reconciliation", exact: true }).click();
    await expect(page.locator(".downtime-score-row")).toContainText("9 of 9");
    for (const choice of resumptionChoices) {
      await page.getByRole("radio", { name: choice.label, exact: true }).check();
      await expect(page.locator('section[aria-labelledby="resumption-title"]')).toContainText(
        choice.feedback,
      );
    }
    await page
      .getByRole("radio", { name: resumptionChoices.find((c) => c.preferred)!.label, exact: true })
      .check();
    await page.locator("#resumption-title").scrollIntoViewIfNeeded();
    await capture(page, `downtime-${width}-resumption`);
    await page.locator("#downtime-phase-tab-0").click();
    await page
      .getByRole("radio", { name: tabletopPhases[0].decisions[0].choices[1].label, exact: true })
      .check();
    await expect(firstMatch).toHaveValue("");
    await expect(page.locator(".downtime-score-row")).toContainText("not checked");
    await expect(page.locator(".downtime-hazard-grid")).toContainText("Two restored charts");
    await page.locator("#downtime-phase-tab-1").click();
    await page
      .getByRole("radio", { name: tabletopPhases[1].decisions[0].choices[1].label, exact: true })
      .check();
    await expect(page.locator("#downtime-call-log")).toContainText("No matching laboratory entry");
    await reset(page);
    await expect(page.locator("#downtime-phase-tab-1")).toBeDisabled();
  });

  test(`${width} privacy fixed export, transformations, feedback and reset`, async ({ page }) => {
    await enter(page, "not-anonymous-enough", width);
    await page.getByRole("link", { name: "proposed export", exact: true }).click();
    await expect(page.locator("#raw-privacy-table")).toBeFocused();
    await page
      .getByRole("combobox", { name: "Diagnosis", exact: true })
      .selectOption("Breast carcinoma");
    await expect(page.locator(".privacy-count")).toContainText("3 of 18");
    await page.getByRole("combobox", { name: "Five-digit ZIP", exact: true }).selectOption("02108");
    await expect(page.locator(".privacy-count")).toContainText("1 of 18");
    await page.getByRole("button", { name: "Confirm isolated record" }).click();
    await expect(page.locator('section[aria-labelledby="reidentification-title"]')).toContainText(
      "returns NR-001",
    );
    await page.getByRole("button", { name: "Confirm isolated record" }).scrollIntoViewIfNeeded();
    await capture(page, `privacy-${width}-isolated`);
    await page.getByRole("combobox", { name: "Five-digit ZIP", exact: true }).selectOption("");
    await expect(
      page.getByText("One record is isolated without a name or medical record number.", {
        exact: true,
      }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.locator("#raw-privacy-table tbody tr")).toHaveCount(18);
    for (const choice of caseOverview.decisionChoices) {
      await page.getByRole("radio", { name: choice.label, exact: true }).check();
      await expect(page.locator("main")).toContainText(choice.feedback);
    }
    for (const option of transformOptions)
      await page.getByRole("checkbox", { name: new RegExp(option.label) }).check();
    await expect(page.locator(".privacy-metric-grid").first()).toContainText("4 records");
    await page.getByRole("link", { name: "transformed preview", exact: true }).first().click();
    await page.getByText("View all 18 transformed records", { exact: true }).click();
    await expect(page.locator("#transformed-privacy-table tbody tr")).toHaveCount(18);
    const workbench = page.locator(".privacy-workbench-grid");
    for (const box of await workbench.getByRole("checkbox").all()) await box.check();
    for (const choice of caseOverview.repairChoices.filter((c) => !c.correct)) {
      await page.getByRole("radio", { name: choice.label, exact: true }).check();
      await expect(page.locator(".privacy-release-layout fieldset")).toContainText(choice.feedback);
      await page.getByRole("button", { name: "Run release checks" }).click();
      await expect(page.locator(".test-console .fail")).not.toHaveCount(0);
    }
    await page.locator(".privacy-release-layout fieldset").scrollIntoViewIfNeeded();
    await capture(page, `privacy-${width}-wrong-release`);
    await page
      .getByRole("radio", {
        name: caseOverview.repairChoices.find((c) => c.correct)!.label,
        exact: true,
      })
      .check();
    await expect(page.locator(".test-console")).toContainText("Not run");
    await page.getByRole("button", { name: "Run release checks" }).click();
    await expect(page.locator(".test-console")).toContainText("5/5 passed");
    await page.getByRole("checkbox", { name: new RegExp(transformOptions[0].label) }).uncheck();
    await expect(page.locator(".test-console")).toContainText("Not run");
    await expect(page.locator(".privacy-metric-grid")).toContainText("4 records");
    await reset(page);
    await expect(page.locator(".privacy-count")).toContainText("18 of 18");
    await expect(page.locator(".privacy-workbench-grid input:checked")).toHaveCount(0);
  });
}
