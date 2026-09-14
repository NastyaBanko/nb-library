import {ChangeDetectionStrategy, Component, HostBinding, inject, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuComponent} from "@nb/modules/library/components/menu/menu.component";
import {TabsComponent} from "@nb/modules/library/components/tabs/tabs.component";
import {HighchartPageComponent} from "@nb/modules/library/components/highchart-page/highchart-page.component";
import {CardPageComponent} from "@nb/modules/library/components/card-page/card-page.component";
import {ApiPageComponent} from "@nb/modules/library/components/api-page/api-page.component";
import {Tabs, mainTabs} from "@nb/models/library.model";
import {MenuItem, MenuItemId} from "@nb/models/menu.model";

@Component({
  selector: "library",
  templateUrl: "./library.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MenuComponent,
    TabsComponent,
    HighchartPageComponent,
    CardPageComponent,
    ApiPageComponent,
  ],
})
export class LibraryComponent {
  @HostBinding("class") public hostClass = "nb-library";
  public _menuItemId = signal<MenuItemId>(MenuItemId.HIGHCHARTS);
  public _currentTab = signal<Tabs>(Tabs.OVERVIEW);
  public readonly _mainTabs = mainTabs;
  public readonly _tabsId = Tabs;
  public readonly _menuItemIds = MenuItemId;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      const section = params["section"];
      const tab = params["tab"];

      if (section && Object.values(MenuItemId).includes(section as MenuItemId)) {
        this._menuItemId.set(section as MenuItemId);
      }

      if (tab && Object.values(Tabs).includes(tab as Tabs)) {
        this._currentTab.set(tab as Tabs);
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
}
