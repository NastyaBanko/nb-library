import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "@nb/modules/library/components/menu/menu.component";
import {TabsComponent} from "@nb/modules/library/components/tabs/tabs.component";
import {HighchartsComponent} from "@nb/modules/library/components/highcharts/highcharts.component";
import {DynamicFormComponent} from "@nb/modules/library/components/dynamic-form/dynamic-form.component";
import {CardComponent} from "@nb/modules/library/components/card/card.component";
import {
  Tabs,
  mainTabs,
  highchartFormConfig,
  palettes,
  chartExamples,
  cardFormConfig,
} from "@nb/models/library.model";
import {MenuItem, MenuItemId} from "@nb/models/menu.model";
import {FormField} from "@nb/models/dynamic-form.model";

@Component({
  selector: "library",
  templateUrl: "./library.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MenuComponent,
    TabsComponent,
    HighchartsComponent,
    DynamicFormComponent,
    CardComponent,
  ],
})
export class LibraryComponent {
  @HostBinding("class") public hostClass = "nb-library";
  public _menuItemId: MenuItemId = MenuItemId.HIGHCHARTS;
  public _currentTab: Tabs = Tabs.OVERVIEW;
  public highchartFormValues: any = this.getInitialFormValues(highchartFormConfig);
  public cardFormValues: any = this.getInitialFormValues(cardFormConfig);
  public readonly _mainTabs = mainTabs;
  public readonly _tabsId = Tabs;
  public readonly _menuItemIds = MenuItemId;
  public readonly _highchartFormConfig = highchartFormConfig;
  public readonly _chartExamples = chartExamples;
  public readonly _cardFormConfig = cardFormConfig;

  public get colorPalette(): string[] {
    const palette = palettes.find((p) => p.value === this.highchartFormValues.colorPaletteId);
    return palette?.colors || palettes[0].colors;
  }

  public _onMenuSelect(item: MenuItem) {
    this._menuItemId = item.id;
  }

  public _onTabSelect($event: string) {
    this._currentTab = $event as Tabs;
  }

  public _onHighchartFormChange(values: any) {
    this.highchartFormValues = values;
  }

  public _onCardFormChange(values: any) {
    this.cardFormValues = values;
  }

  private getInitialFormValues(config: FormField[]): Record<string, any> {
    const values: Record<string, any> = {};
    config.forEach((field: FormField) => {
      values[field.key] = field.value;
    });
    return values;
  }
}
