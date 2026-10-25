import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { lessons, topics } from "../../src/data/curriculum";
const routes = [
  "",
  ...topics.map((t) => "topics/" + t.slug + "/"),
  ...lessons.flatMap((l) => [
    "lessons/" + l.manifest.slug + "/",
    "faculty/" + l.manifest.slug + "/",
  ]),
];
for (const width of [1365, 390, 320])
  for (const route of routes)
    test(width + "px " + (route || "hub"), async ({ page }, info) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.setViewportSize({
        width,
        height: width === 1365 ? 900 : width === 390 ? 844 : 640,
      });
      const response = await page.goto(route || "./");
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator(".loading-section, .loading-lesson")).toHaveCount(0);
      await expect(
        page.getByText("This part of the lesson could not load.", { exact: false }),
      ).toHaveCount(0);
      await page.evaluate(() => document.fonts.ready);
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), {
          message: "page must reflow after fonts and layout settle",
        })
        .toBe(false);
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      await info.attach("accessibility", {
        body: JSON.stringify(axe.violations, null, 2),
        contentType: "application/json",
      });
      expect(
        axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      ).toEqual([]);
      if (route.startsWith("lessons/")) {
        await page.getByRole("button", { name: "Open debrief", exact: true }).click();
        await expect(page.locator("#lesson-debrief")).toBeFocused();
        await expect(
          page.getByRole("heading", { name: "Check yourself (3 questions)", exact: true }),
        ).toBeVisible();
        const checks = page.locator(".retrieval-item");
        await expect(checks).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
          const group = checks.nth(i);
          await group.locator('input[value="shortcut"]').check();
          await expect(group.getByRole("status")).toContainText("Not supported");
          await group.locator('input[value="supported"]').check();
          await expect(group.getByRole("status")).toContainText("Supported");
        }
        await expect(page.locator("#lesson-debrief")).toBeVisible();
        await page
          .getByRole("button", { name: "Clear my answers and start this lesson over", exact: true })
          .first()
          .click();
        await page.getByRole("button", { name: "Keep my answers", exact: true }).click();
        await expect(page.locator("#lesson-debrief")).toBeVisible();
        await page
          .getByRole("button", { name: "Clear my answers and start this lesson over", exact: true })
          .first()
          .click();
        await page.getByRole("button", { name: "Clear all answers", exact: true }).click();
        await expect(page.getByRole("button", { name: "Open debrief", exact: true })).toBeVisible();
        await expect(page.locator("#lesson-introduction")).toBeFocused();
      }
      const links = await page
        .locator("a[href]")
        .evaluateAll((elements) =>
          elements
            .map((e) => (e as HTMLAnchorElement).href)
            .filter((h) => h.startsWith(location.origin)),
        );
      for (const link of links) {
        const path = new URL(link).pathname.replace("/pathology-informatics-interactives/", "");
        if (!path.startsWith("assets/"))
          expect(routes, "Unknown internal link: " + link).toContain(path);
      }
      expect(errors).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await page.screenshot({ path: info.outputPath("page.png"), fullPage: true });
    });
