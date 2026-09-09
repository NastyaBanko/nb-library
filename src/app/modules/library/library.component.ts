import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "@nb/modules/library/components/menu/menu.component";
import {TabsComponent} from "@nb/modules/library/components/tabs/tabs.component";
import {HighchartsComponent} from "@nb/modules/library/components/highcharts/highcharts.component";
import {DynamicFormComponent} from "@nb/modules/library/components/dynamic-form/dynamic-form.component";
import {
  Tabs,
  mainTabs,
  highchartFormConfig,
  palettes,
  chartExamples,
} from "@nb/models/library.model";
import {MenuItem, MenuItemId} from "@nb/models/menu.model";

@Component({
  selector: "library",
  templateUrl: "./library.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MenuComponent, TabsComponent, HighchartsComponent, DynamicFormComponent],
})
export class LibraryComponent {
  @HostBinding("class") public hostClass = "nb-library";
  public _menuItemId: MenuItemId = MenuItemId.HIGHCHARTS;
  public _currentTab: Tabs = Tabs.OVERVIEW;
  public formValues: any = {};
  public readonly _mainTabs = mainTabs;
  public readonly _tabsId = Tabs;
  public readonly _menuItemIds = MenuItemId;
  public readonly _highchartFormConfig = highchartFormConfig;
  public readonly _chartExamples = chartExamples;

  public get colorPalette(): string[] {
    const palette = palettes.find((p) => p.value === this.formValues.colorPaletteId);
    return palette?.colors || palettes[0].colors;
  }

  public _onMenuSelect(item: MenuItem) {
    this._menuItemId = item.id;
  }

  public _onTabSelect($event: string) {
    this._currentTab = $event as Tabs;
  }

  public _onFormChange(values: any) {
    this.formValues = values;
  }
}
