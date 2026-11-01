import { test, expect } from "@playwright/test";
import {
  tabletopPhases,
  applyDecision,
  initialDowntimeState,
  buildReconciliationRecords,
} from "../../content/lessons/twelve-hours-offline/interaction";

for (const width of [1365, 390]) {
  test(`${width} recovery answers follow visible registration and order records`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/twelve-hours-offline/");
    let state = initialDowntimeState;
    for (const [index, phase] of tabletopPhases.entries()) {
      for (const decision of phase.decisions) {
        const choice = decision.choices.find((item) =>
          decision.id === "temporary-identifiers"
            ? item.id === "unit-created-identifiers"
            : item.preferred,
        )!;
        await page.getByRole("radio", { name: choice.label, exact: true }).check();
        state = applyDecision(state, phase.id, choice.id);
      }
      if (index < 2)
        await page
          .getByRole("button", { name: `Continue to ${tabletopPhases[index + 1].title}` })
          .click();
    }

    const liamMatch = page.getByRole("combobox", {
      name: "Medical record number for DT-202",
      exact: true,
    });
    const registration = page.getByRole("combobox", {
      name: "Action for Two restored charts describe Liam Brooks",
      exact: true,
    });
    await expect(liamMatch).toBeDisabled();
    await page
      .getByRole("link", { name: "Ask registration to confirm the chart", exact: true })
      .click();
    await expect(page.locator("#recovery-duplicate-chart-MRN-410118-MRN-490118")).toBeFocused();
    await registration.selectOption("use-newest-chart");
    await expect(liamMatch).toBeDisabled();
    await expect(page.locator(".downtime-registration-response")).toHaveCount(0);

    const records = buildReconciliationRecords(state);
    for (const hazard of records.hazards)
      await page
        .getByRole("combobox", { name: `Action for ${hazard.title}`, exact: true })
        .selectOption(hazard.correctActionId);
    await expect(page.locator(".downtime-registration-response")).toContainText(
      "His existing chart is MRN-410118",
    );
    await expect(liamMatch).toBeEnabled();
    await page.getByRole("link", { name: "Return to the DT-202 match", exact: true }).click();
    await expect(liamMatch).toBeFocused();

    for (const record of records.paperRecords)
      await page
        .getByRole("combobox", { name: `Medical record number for ${record.tempId}`, exact: true })
        .selectOption(record.expectedMrn);
    await liamMatch.selectOption("MRN-490118");
    await page.getByRole("button", { name: "Check reconciliation", exact: true }).click();
    await expect(page.locator(".downtime-score-row")).toContainText("9 of 10");
    await liamMatch.selectOption("MRN-410118");
    await page.getByRole("button", { name: "Check reconciliation", exact: true }).click();
    await expect(page.locator(".downtime-score-row")).toContainText("10 of 10");

    const orderComparison = page.getByRole("group", {
      name: "Restored troponin orders",
      exact: true,
    });
    for (const orderId of ["ORD-R-8821", "ORD-R-8840"]) {
      const order = orderComparison.getByRole("article", { name: orderId, exact: true });
      await expect(order).toContainText("D26-0418-004");
      await expect(order).toContainText("09:44");
    }
    await expect(page.locator("#recovery-duplicate-order-DT-204")).toContainText(
      "the Cardiac ICU nurse confirms",
    );

    await registration.selectOption("split-results-between-charts");
    await expect(liamMatch).toHaveValue("");
    await expect(liamMatch).toBeDisabled();
    await expect(page.locator(".downtime-registration-response")).toHaveCount(0);
    await expect(page.locator(".downtime-score-row")).toContainText("not checked");
    await registration.selectOption("hold-and-reconcile-charts");
    await expect(liamMatch).toBeEnabled();
    await expect(liamMatch).toHaveValue("");

    await page
      .getByRole("button", { name: "Clear my answers and start this lesson over", exact: true })
      .first()
      .click();
    await page.getByRole("button", { name: "Clear all answers", exact: true }).click();
    await expect(page.locator(".downtime-registration-response")).toHaveCount(0);
    await expect(liamMatch).toBeDisabled();
    await expect(liamMatch).toHaveValue("");
    await expect(page.locator(".downtime-score-row")).toContainText("not checked");
  });
}
