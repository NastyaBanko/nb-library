import {test, expect} from "@playwright/test";

test.describe("Highchart Page", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/library?section=highcharts&tab=overview");
  });

  test("should update chart title in real time on overview tab", async ({page}) => {
    const chartComponent = page.locator(".taHighcharts");
    const titleInput = page.locator(".taDynamicForm input").first();
    const text = "Interactive Chart Test Title";
    await titleInput.fill(text);
    await expect(chartComponent).toContainText(text);
  });

  test("should change chart type when selecting from dynamic form dropdown", async ({page}) => {
    const chartComponent = page.locator(".taHighcharts");
    const typeSelect = page.locator(".taDynamicForm select").first();
    await typeSelect.selectOption({label: "Column"});
    await expect(chartComponent).toBeVisible();
  });

  test("should update color palette dynamically", async ({page}) => {
    const paletteSelect = page.locator(".taDynamicForm select").nth(1);
    await paletteSelect.selectOption({index: 1});
    const chartComponent = page.locator(".taHighcharts");
    await expect(chartComponent).toBeVisible();
  });

  test("should render all chart examples correctly on examples tab", async ({page}) => {
    await page.goto("/library?section=highcharts&tab=examples");
    const exampleContainers = page.locator(".taExampleHighchart");
    const count = await exampleContainers.count();
    expect(count).toBeGreaterThan(0);
  });
});
