import {test, expect} from "@playwright/test";

test.describe("Api Page", () => {
  test("should display users list successfully when API responds correctly", async ({page}) => {
    await page.goto("/library?section=api");
    const loader = page.locator(".taLoader");
    if ((await loader.count()) > 0) {
      await expect(loader).not.toBeVisible();
    }

    const userItems = page.locator(".taUser");
    await expect(userItems.first()).toBeVisible();
    const count = await userItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display error message when API request fails", async ({page}) => {
    await page.route("**/users**", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({error: "Internal Server Error"}),
      });
    });

    await page.goto("/library?section=api");
    const errorBlock = page.locator(".taApiPageError");
    await expect(errorBlock).toBeVisible();
    await expect(errorBlock).toHaveText("Failed to load data from external API.");
  });
});
