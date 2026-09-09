import {Component, signal} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "@nb/modules/shared/shared.module";
import {LoaderComponent} from "@nb/components/loader/loader.component";
import {Constants} from "@nb/utils/constants";
import {TranslateService} from "@ngx-translate/core";

export enum Language {
  EN = "en",
  RU = "ru",
}

const defaultLang: Language = Language.EN;

@Component({
  selector: "app-root",
  styleUrl: "./app.css",
  templateUrl: "./app.html",
  imports: [RouterOutlet, SharedModule, LoaderComponent],
})
export class App {
  protected readonly title = signal("nb-library");

  constructor(public translateService: TranslateService) {
    let currentLanguage: Language = localStorage.getItem(Constants.LANGUAGE) as Language;
    if (!currentLanguage) {
      currentLanguage = defaultLang;
      localStorage.setItem(Constants.LANGUAGE, currentLanguage);
    }
    this.translateService.use(currentLanguage);
  }
}
