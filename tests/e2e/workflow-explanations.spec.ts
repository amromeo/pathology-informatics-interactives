import { test, expect, type Page } from "@playwright/test";
import {
  questions,
  recoveryChoices,
  additionalExercises as specimenExtra,
} from "../../content/lessons/where-is-the-specimen/interaction";
import {
  releaseApprovalChoices,
  additionalExercises as releaseExtra,
} from "../../content/lessons/autoverification-at-the-edge/interaction";
import {
  reflexApprovalChoices,
  additionalExercises as reflexExtra,
} from "../../content/lessons/reflex-rule-ripple-effect/interaction";

async function resetLesson(page: Page) {
  await page
    .getByRole("button", { name: "Clear my answers and start this lesson over", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Clear all answers", exact: true }).click();
  await expect(page.locator("#lesson-introduction")).toBeFocused();
  await expect(page.getByRole("button", { name: "Open debrief", exact: true })).toBeVisible();
}

async function checkChoiceFeedback(
  page: Page,
  question: {
    prompt: string;
    answer: string;
    choices: { id: string; label: string }[];
    feedbackByChoice: Partial<Record<string, string>>;
  },
) {
  const group = page.getByRole("group", { name: question.prompt, exact: true });
  const wrong = question.choices.find((choice) => choice.id !== question.answer)!;
  const right = question.choices.find((choice) => choice.id === question.answer)!;
  await group.getByRole("radio", { name: wrong.label, exact: true }).check();
  await page.getByRole("button", { name: "Check these decisions", exact: true }).click();
  await expect(group.locator("..")).toContainText(question.feedbackByChoice[wrong.id]!);
  await group.getByRole("radio", { name: right.label, exact: true }).check();
  await expect(group.locator("..")).not.toContainText(question.feedbackByChoice[wrong.id]!);
  await page.getByRole("button", { name: "Check these decisions", exact: true }).click();
  await expect(group.locator("..")).toContainText(question.feedbackByChoice[right.id]!);
}

for (const width of [1365, 390]) {
  test(`${width} workflow specimen distinguishes receipt, tests both repairs and resets`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/where-is-the-specimen/");
    await expect(
      page.getByRole("heading", { name: "Terms used in this case", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: /08:11 Accessioning receipt scan/ }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".specimen-event-record")).toContainText("ACC-02");
    const location = questions[0];
    await page.getByRole("radio", { name: location.choices[1].label, exact: true }).check();
    await expect(page.locator(".specimen-question-grid")).toContainText(
      location.choices[1].feedback,
    );
    await page.getByRole("radio", { name: location.choices[0].label, exact: true }).check();
    await expect(page.locator(".specimen-question-grid")).toContainText(
      location.choices[0].feedback,
    );

    const replay = page.getByRole("button", { name: "Replay routing cases", exact: true });
    await replay.click();
    await expect(page.locator("main")).toContainText("3 of 5 routing cases pass.");
    await page
      .getByRole("combobox", { name: "Configured destination for SP-EX", exact: true })
      .selectOption("gross");
    await expect(page.locator(".specimen-results .pending")).toHaveCount(5);
    await replay.click();
    await expect(page.locator("main")).toContainText("4 of 5 routing cases pass.");
    await page
      .getByRole("combobox", { name: "Destination when no procedure entry matches", exact: true })
      .selectOption("review");
    await replay.click();
    await expect(page.locator(".specimen-results .passed")).toHaveCount(5);
    await page.getByRole("radio", { name: recoveryChoices[0].label, exact: true }).check();
    await expect(page.locator("main")).toContainText("The correction still needs work");
    await page.getByRole("radio", { name: recoveryChoices[1].label, exact: true }).check();
    await expect(page.locator("main")).toContainText(
      "Routing checks and the recovery plan are ready",
    );
    await page.getByRole("link", { name: "routing results", exact: true }).click();
    await expect(page.locator("#specimen-routing-results")).toBeFocused();
    await checkChoiceFeedback(page, specimenExtra.questions[0]);
    await resetLesson(page);
    await expect(
      page.getByRole("combobox", { name: "Configured destination for SP-EX", exact: true }),
    ).toHaveValue("cytology");
    await expect(page.locator(".specimen-results .pending")).toHaveCount(5);
    await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0);
  });

  test(`${width} workflow release tests branch logic, missing inputs and stale approval`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/autoverification-at-the-edge/");
    await expect(
      page.getByRole("heading", { name: "Terms used in this case", exact: true }),
    ).toBeVisible();
    await page.getByRole("link", { name: "this comparison", exact: true }).click();
    await expect(page.locator("#release-branch-examples")).toBeFocused();
    const replay = page.getByRole("button", { name: "Run all release checks", exact: true });
    await replay.click();
    await expect(page.locator("main")).toContainText("20 of 22 expected decisions match.");
    await page
      .getByRole("combobox", { name: "Combine the delta branches", exact: true })
      .selectOption("either");
    await expect(page.locator("main")).not.toContainText("20 of 22 expected decisions match.");
    await replay.click();
    await expect(page.locator("main")).toContainText("22 of 22 expected decisions match.");
    await page.getByRole("radio", { name: releaseApprovalChoices[1].label, exact: true }).check();
    await expect(page.locator("main")).toContainText("The test record supports laboratory review.");
    await page
      .getByRole("combobox", { name: "Combine the delta branches", exact: true })
      .selectOption("both");
    await expect(page.locator("main")).not.toContainText(
      "The test record supports laboratory review.",
    );
    await expect(page.locator(".rule-outcome > strong")).toHaveText("Release");
    await page
      .getByRole("combobox", { name: "Combine the delta branches", exact: true })
      .selectOption("either");
    await page
      .getByRole("combobox", { name: "Result to inspect", exact: true })
      .selectOption("AV-04");
    await expect(page.locator(".rule-outcome > strong")).toHaveText("Release");
    await page
      .getByRole("combobox", {
        name: "Minimum absolute change for the relative branch (ng/L)",
        exact: true,
      })
      .selectOption("0");
    await expect(page.locator(".rule-outcome > strong")).toHaveText("Hold");
    await page
      .getByRole("combobox", { name: "Result to inspect", exact: true })
      .selectOption("AV-06");
    await expect(page.locator(".rule-gates")).toContainText("Not calculated");
    await expect(page.locator(".rule-outcome > strong")).toHaveText("Hold");
    await checkChoiceFeedback(page, releaseExtra.questions[0]);
    await resetLesson(page);
    await expect(
      page.getByRole("combobox", { name: "Combine the delta branches", exact: true }),
    ).toHaveValue("absolute");
    await expect(
      page.getByRole("combobox", { name: "Result to inspect", exact: true }),
    ).toHaveValue("AV-01");
    await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0);
  });

  test(`${width} workflow reflex preserves source records, tests boundaries and clears results`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("lessons/reflex-rule-ripple-effect/");
    await expect(
      page.getByRole("heading", { name: "Terms used in this case", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Configured reflex rule", exact: true }).click();
    await expect(page.locator(".rule-record")).toContainText("Revision 8");
    await page.getByRole("link", { name: "boundary examples", exact: true }).click();
    await expect(page.locator("#reflex-boundary-examples")).toBeFocused();
    const replay = page.getByRole("button", { name: "Replay accession records", exact: true });
    await replay.click();
    await expect(page.locator("main")).toContainText("10 of 13 expected actions match.");
    await page
      .getByRole("combobox", { name: "Lower TSH threshold (mIU/L)", exact: true })
      .selectOption("0.27");
    await expect(page.locator(".rule-counts")).toHaveCount(0);
    await expect(page.locator(".rule-record")).toContainText("TSH < 0.40");
    await replay.click();
    await expect(page.locator("main")).toContainText("13 of 13 expected actions match.");
    await expect(page.locator(".rule-counts")).toContainText("2 new FT4 orders");
    await page.getByRole("radio", { name: reflexApprovalChoices[2].label, exact: true }).check();
    await expect(page.locator("main")).toContainText(
      "The rule and test record are ready for clinical review.",
    );
    await page
      .getByRole("combobox", { name: "Boundary comparison", exact: true })
      .selectOption("inclusive");
    await expect(page.locator("main")).not.toContainText(
      "The rule and test record are ready for clinical review.",
    );
    await replay.click();
    await expect(page.locator(".rule-result-list details.fail")).toHaveCount(2);
    await page
      .getByRole("combobox", { name: "Boundary comparison", exact: true })
      .selectOption("strict");
    await page
      .getByRole("checkbox", {
        name: "Reuse pending or completed FT4 on this accession",
        exact: true,
      })
      .uncheck();
    await replay.click();
    const completed = page.locator(".rule-result-list details").filter({ hasText: "TH-08" });
    await completed.locator("summary").click();
    await expect(completed).toContainText("Duplicate prevention is off despite a complete FT4");
    await checkChoiceFeedback(page, reflexExtra.questions[0]);
    await resetLesson(page);
    await expect(
      page.getByRole("combobox", { name: "Lower TSH threshold (mIU/L)", exact: true }),
    ).toHaveValue("0.4");
    await expect(page.locator(".rule-counts")).toHaveCount(0);
    await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0);
  });
}
