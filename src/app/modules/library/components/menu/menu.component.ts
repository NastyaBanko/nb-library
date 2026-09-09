import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  HostBinding,
  OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TranslatePipe} from "@ngx-translate/core";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Constants} from "@nb/utils/constants";
import {Language} from "@nb/app";
import {MenuItem, menuItems} from "@nb/models/menu.model";
import {LoaderComponent} from "@nb/components/loader/loader.component";
import {IconComponent} from "@nb/components/icon/icon.component";

@Component({
  selector: "nb-menu",
  templateUrl: "./menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, TranslatePipe, LoaderComponent, IconComponent],
})
export class MenuComponent implements OnInit {
  @HostBinding("class") public hostClass = "nb-menu";
  public searchQuery: string = "";
  public activeId: string = menuItems[0].id;
  public _currentLanguage!: Language;
  public readonly _language = Language;
  @Output() itemClick = new EventEmitter<MenuItem>();

  public get filteredItems(): MenuItem[] {
    if (!this.searchQuery.trim()) {
      return menuItems;
    }
    const query = this.searchQuery.toLowerCase();
    return menuItems.filter((item: MenuItem) => item.label.toLowerCase().includes(query));
  }

  constructor(public translateService: TranslateService) {
    this.translateService.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe((langEvent: LangChangeEvent) => {
        localStorage.setItem(Constants.LANGUAGE, langEvent.lang);
      });
  }

  public ngOnInit(): void {
    this._currentLanguage = this.translateService.currentLang() as Language;
  }

  public _selectItem(item: MenuItem) {
    this.activeId = item.id;
    this.itemClick.emit(item);
  }

  public _toggleLanguage() {
    const updatedLanguage =
      this._currentLanguage === this._language.EN ? this._language.RU : this._language.EN;
    this._currentLanguage = updatedLanguage;
    this.translateService.use(updatedLanguage);
  }
}
