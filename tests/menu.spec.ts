import {test, expect} from "@playwright/test";

test.describe("Menu", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("should highlight active menu item with active class", async ({page}) => {
    const menuItems = page.locator(".taMenuItem");
    const firstItem = menuItems.nth(0);
    await expect(firstItem).toHaveClass(/active/);
    const secondItem = menuItems.nth(1);
    await secondItem.click();
    await expect(firstItem).not.toHaveClass(/active/);
    await expect(secondItem).toHaveClass(/active/);
  });

  test("should filter menu items based on search query", async ({page}) => {
    const searchInput = page.locator(".taMenuSearch input");
    const menuItems = page.locator(".taMenuItem");
    const initialCount = await menuItems.count();
    expect(initialCount).toBeGreaterThan(0);
    await searchInput.fill("Highcharts");
    const filteredCount = await menuItems.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(initialCount);
    await searchInput.fill("NonExistentItem");
    await expect(page.locator(".taMenuNotFound")).toBeVisible();
  });

  test("should toggle language when clicking language button", async ({page}) => {
    const langButton = page.locator(".taLangToggleBtn");
    const langIcon = page.locator(".taLangIcon");
    const initialLang = await langIcon.textContent();
    await langButton.click();
    const newLang = await langIcon.textContent();
    expect(newLang).not.toEqual(initialLang);
    const savedLang = await page.evaluate(() => localStorage.getItem("language"));
    expect(savedLang).toEqual(newLang?.trim());
  });
});
