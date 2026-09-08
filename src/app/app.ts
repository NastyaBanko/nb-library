import {Component, signal} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "@nb/modules/shared/shared.module";
import {Constants} from "@nb/utils/constants";
import {TranslateService} from "@ngx-translate/core";

export interface LocaleModel {
  localeCode: string;
  name: string;
}

const defaultLang: LocaleModel = {
  name: "English",
  localeCode: "en",
};

@Component({
  selector: "app-root",
  styleUrl: "./app.css",
  templateUrl: "./app.html",
  imports: [RouterOutlet, SharedModule],
})
export class App {
  protected readonly title = signal("nb-library");

  constructor(public translateService: TranslateService) {
    let currentLanguage: string | null = localStorage.getItem(Constants.LANGUAGE);
    if (!currentLanguage) {
      currentLanguage = defaultLang.localeCode;
      localStorage.setItem(Constants.LANGUAGE, currentLanguage);
    }
    this.translateService.use(currentLanguage);
  }
}
