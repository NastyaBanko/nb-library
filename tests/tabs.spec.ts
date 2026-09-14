import {test, expect} from "@playwright/test";

test.describe("Tabs", () => {
  test("should render tabs and apply active class to the correct tab", async ({page}) => {
    await page.goto("/");
    const tabButtons = page.locator(".taTabItem");
    const firstTab = tabButtons.nth(0);
    const secondTab = tabButtons.nth(1);
    await expect(tabButtons).toHaveCount(2);
    await expect(firstTab).toHaveClass(/active/);
    await expect(secondTab).not.toHaveClass(/active/);
    await secondTab.click();
    await expect(firstTab).not.toHaveClass(/active/);
    await expect(secondTab).toHaveClass(/active/);
  });
});
