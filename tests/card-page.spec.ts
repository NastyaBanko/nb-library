import {test, expect} from "@playwright/test";

test.describe("Card Page", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/library?section=cards&tab=overview");
  });

  test("should update card title in real time", async ({page}) => {
    const card = page.locator(".taCard");
    const text = "New Title";
    const titleInput = page.locator(".taDynamicForm input").first();
    await titleInput.fill(text);
    await expect(card).toContainText(text);
  });

  test("should update card description in real time", async ({page}) => {
    const card = page.locator(".taCard");
    const descriptionInput = page.locator(".taDynamicForm input").nth(1);
    const text = "New Description";
    await descriptionInput.fill(text);
    await expect(card).toContainText(text);
  });

  test("should update card color in real time", async ({page}) => {
    const card = page.locator(".taCard .taCardContainer");
    const colorInput = page.locator(".taDynamicForm input[type='color']");
    await colorInput.fill("#ff0000");
    await colorInput.dispatchEvent("input");
    const cardStyle = await card.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(cardStyle).toBe("rgb(255, 0, 0)");
  });

  test("should toggle favourite icon visibility based on checkbox", async ({page}) => {
    const favouriteCheckbox = page.locator('.taDynamicForm input[type="checkbox"]');
    const favouriteIcon = page.locator(".taFavouriteIcon");
    await favouriteCheckbox.uncheck();
    await expect(favouriteIcon).not.toBeVisible();
    await favouriteCheckbox.check();
    await expect(favouriteIcon).toBeVisible();
  });

  test("should show ellipsis when title is too long", async ({page}) => {
    const titleInput = page.locator(".taDynamicForm input").first();
    const veryLongText = "Very long title text ".repeat(20);
    await titleInput.fill(veryLongText);
    const cardTitle = page.locator(".taCardTitle");
    await expect(cardTitle).toHaveCSS("text-overflow", "ellipsis");
    await expect(cardTitle).toHaveCSS("overflow", "hidden");
  });

  test("should render all card examples correctly in examples tab", async ({page}) => {
    await page.goto("/library?section=cards&tab=examples");
    const exampleContainers = page.locator(".taCardPageExamples .taCard");
    const count = await exampleContainers.count();
    expect(count).toBeGreaterThan(0);
  });
});
