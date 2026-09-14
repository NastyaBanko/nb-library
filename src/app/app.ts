import {Component, signal} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {Constants} from "@nb/utils/constants";
import {SHARED_IMPORTS} from "@nb/modules/shared/shared.imports";
import {TranslateService} from "@ngx-translate/core";
import {Language, defaultLang} from "@nb/models/language.model";

@Component({
  selector: "app-root",
  styleUrl: "./app.css",
  templateUrl: "./app.html",
  imports: [RouterOutlet, ...SHARED_IMPORTS],
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
