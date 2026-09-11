import {ChangeDetectionStrategy, Component, HostBinding, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
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
  cardExamples,
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
  public readonly _cardExamples = cardExamples;
  public readonly _cardFormConfig = cardFormConfig;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public get colorPalette(): string[] {
    const palette = palettes.find((p) => p.value === this.highchartFormValues.colorPaletteId);
    return palette?.colors || palettes[0].colors;
  }

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      const section = params["section"];
      const tab = params["tab"];

      if (section && Object.values(MenuItemId).includes(section as MenuItemId)) {
        this._menuItemId = section as MenuItemId;
      }

      if (tab && Object.values(Tabs).includes(tab as Tabs)) {
        this._currentTab = tab as Tabs;
      }
    });
  }

  public _onMenuSelect(item: MenuItem) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        section: item.id,
        tab: Tabs.OVERVIEW,
      },
      queryParamsHandling: "merge",
    });
  }

  public _onTabSelect($event: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: $event},
      queryParamsHandling: "merge",
    });
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
