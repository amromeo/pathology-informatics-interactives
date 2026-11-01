import { test, expect } from "@playwright/test";
import { pathwayOrder } from "../../content/lessons/inside-a-results-journey/interaction";

for (const width of [1365, 390]) {
  test(`${width} foundations explains the path before building it and updates evidence feedback`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/inside-a-results-journey/");
    await expect(
      page.getByRole("heading", { name: "Follow one report through the systems" }),
    ).toBeVisible();
    await expect(page.locator(".pathway-position strong").first()).toHaveText("Choose next");
    const names = {
      analyzer: "Analyzer",
      lis: "LIS",
      interface: "Interface engine",
      network: "Firewall and network",
      ehr: "EHR",
    };
    for (const id of pathwayOrder)
      await page
        .locator(".pathway-palette")
        .getByRole("button", { name: new RegExp("^" + names[id]) })
        .click();
    await expect(page.getByRole("heading", { name: "Classify the components" })).toBeVisible();
    const evidence = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: "See what each system recorded" }) });
    await evidence.getByRole("radio", { name: "An incorrect EHR display mapping" }).check();
    await expect(evidence.getByRole("status")).toContainText(
      "cannot establish how the EHR displays",
    );
    await evidence.getByRole("radio", { name: "Incomplete analyzer testing" }).check();
    await expect(evidence.getByRole("status")).toContainText("Correct");
    await expect(evidence.getByRole("status")).not.toContainText(
      "cannot establish how the EHR displays",
    );
    await evidence.getByRole("tab", { name: "LIS", exact: false }).click();
    await expect(evidence.locator(".feedback")).toHaveCount(0);
    await evidence.getByRole("tab", { name: "Analyzer", exact: false }).click();
    await expect(evidence.getByRole("status")).toContainText("Correct");
  });

  for (const [slug, target, name] of [
    ["can-we-trust-this-report", "tat-original-summary", "original summary"],
    ["can-we-accept-this-lot", "lot-results-table", "paired-results table"],
  ])
    test(`${width} foundations ${slug} faculty table link and reset`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`faculty/${slug}/`);
      await page.getByRole("link", { name, exact: true }).click();
      await expect(page.locator(`#${target}`)).toBeFocused();
      // The browser may focus the fragment before the lazy lesson prose and fonts
      // settle. Verify the completed scroll, rather than that intermediate layout.
      await expect
        .poll(async () => {
          const top = await page
            .locator(`#${target}`)
            .evaluate((element) => element.getBoundingClientRect().top);
          return top >= 0 && top < 250;
        })
        .toBe(true);
      await expect(page.locator(`#${target} caption`)).toBeVisible();
      await page
        .getByRole("button", { name: "Clear my answers and start this lesson over", exact: true })
        .first()
        .click();
      await page.getByRole("button", { name: "Clear all answers", exact: true }).click();
      await expect(page.locator("#lesson-introduction")).toBeFocused();
      await expect(page).toHaveURL(/#lesson-introduction$/);
      if (slug === "can-we-trust-this-report") {
        await page.getByRole("link", { name: "Data · 455 rows", exact: true }).first().click();
        await expect(page.locator("#tat-case-table")).toBeVisible();
      } else {
        await page
          .getByRole("combobox", { name: "Which specimens to show" })
          .selectOption("very-low");
        await expect(page.locator("#lot-results-table tbody tr")).toHaveCount(6);
        await expect(page.locator(".inference-summary")).toContainText("+1.2 ng/L");
        await expect(page.locator(".inference-summary")).toContainText("+0.6 to +1.8 ng/L");
      }
    });
}
