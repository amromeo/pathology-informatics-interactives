import { test, expect } from "@playwright/test";
import { lessonExtensions } from "../../src/data/lessonExtensions";
for (const width of [1365, 390])
  for (const [slug, data] of Object.entries(lessonExtensions))
    test(`${width} ${slug} additional decisions`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`lessons/${slug}/`);
      const section = page.getByRole("region", { name: data.title, exact: true });
      await section.getByRole("button", { name: "Check these decisions", exact: true }).click();
      await expect(section.locator(".feedback.incorrect")).toHaveCount(
        data.questions.length + (data.order ? 1 : 0),
      );
      for (const q of data.questions)
        await section
          .getByRole("group", { name: q.prompt, exact: true })
          .locator(`input[value="${q.answer}"]`)
          .check();
      if (data.order)
        for (const row of data.order)
          await section.getByLabel(row.label, { exact: true }).selectOption(String(row.rank));
      await section.getByRole("button", { name: "Check these decisions", exact: true }).click();
      await expect(section.locator(".feedback.correct")).toHaveCount(
        data.questions.length + (data.order ? 1 : 0),
      );
      await section
        .getByRole("group", { name: data.questions[0].prompt, exact: true })
        .locator(
          `input[value="${data.questions[0].choices.find((c) => c.id !== data.questions[0].answer)!.id}"]`,
        )
        .check();
      await expect(section.locator(".feedback")).toHaveCount(0);
    });
test("tabs follow arrow Home and End keys; queue selection does not open debrief", async ({
  page,
}) => {
  await page.goto("lessons/not-anonymous-enough/");
  const tabs = page.getByRole("tablist").getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(page.getByRole("tabpanel")).toBeVisible();
  await page.goto("lessons/invisible-bottleneck/");
  await page.getByRole("combobox", { name: "Extract time", exact: true }).selectOption("current");
  await expect(page.locator("#lesson-debrief")).toHaveCount(0);
  await page.getByRole("button", { name: "Open debrief", exact: true }).click();
  await page.getByRole("combobox", { name: "Extract time", exact: true }).selectOption("stale");
  await expect(page.locator("#lesson-debrief")).toBeVisible();
});
test("radio arrows, visible focus, skip link and print debrief", async ({ page }) => {
  await page.goto("lessons/five-vs-slide-archive/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const radios = page.getByRole("radio");
  await radios.first().focus();
  const outline = await radios.first().evaluate((e) => getComputedStyle(e).outlineStyle);
  expect(outline).not.toBe("none");
  await page.keyboard.press("ArrowDown");
  await expect(radios.nth(1)).toBeChecked();
  await page.getByRole("button", { name: "Open debrief", exact: true }).click();
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("#lesson-debrief")).toBeVisible();
  expect(
    await page.locator("#lesson-debrief").evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(255, 255, 255)");
});
test("unknown routes keep navigation and return 404", async ({ page }) => {
  const response = await page.goto("lessons/does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("does not exist");
  await expect(page.getByRole("link", { name: "Return to the catalog" })).toBeVisible();
});
test("failed experience chunk leaves the case, navigation and debrief usable", async ({ page }) => {
  await page.route("**/AutoverificationExperience-*.js", (route) => route.abort());
  await page.goto("lessons/autoverification-at-the-edge/");
  await expect(
    page.getByText("This part of the lesson could not load.", { exact: false }),
  ).toBeVisible();
  await expect(page.locator("#lesson-introduction")).toBeVisible();
  await page.getByRole("button", { name: "Open debrief", exact: true }).click();
  await expect(page.locator("#lesson-debrief")).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
});
