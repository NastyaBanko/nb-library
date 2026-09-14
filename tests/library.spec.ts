import {test, expect} from "@playwright/test";

test.describe("Routing", () => {
  test("should load default section and tab when query params are empty", async ({page}) => {
    await page.goto("/");
    await expect(page.locator(".taHighchartPage")).toBeVisible();
  });

  test("should update query parameters and switch content when menu item is clicked", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator(".taMenuItem").nth(1).click();
    await expect(page).toHaveURL(/.*section=cards/);
    await expect(page.locator(".taCardPage")).toBeVisible();
    await expect(page.locator(".taHighchartPage")).not.toBeVisible();
  });

  test("should update tab query parameter and preserve section", async ({page}) => {
    await page.goto("/library?section=cards");
    await expect(page.locator(".taCardPage")).toBeVisible();
    await page.locator(".taTabItem").nth(1).click();
    await expect(page).toHaveURL(/.*section=cards/);
    await expect(page).toHaveURL(/.*tab=examples/);
  });

  test("should correctly restore state when navigating directly via URL with query params", async ({
    page,
  }) => {
    await page.goto("/library?section=api");
    await expect(page.locator(".taApiPage")).toBeVisible();
  });

  test("should reset tab to OVERVIEW when switching menu section", async ({page}) => {
    await page.goto("/library?section=cards&tab=examples");
    await expect(page.locator(".taCardPageExamples")).toBeVisible();
    await page.locator(".taMenuItem").nth(0).click();
    await expect(page).toHaveURL(/.*section=highcharts/);
    await expect(page).toHaveURL(/.*tab=overview/);
  });
});
