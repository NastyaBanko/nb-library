import {ApplicationConfig, provideBrowserGlobalErrorListeners} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideHttpClient} from "@angular/common/http";
import {provideTranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideHighcharts} from "highcharts-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      lang: "en",
      loader: provideTranslateHttpLoader({
        prefix: "./assets/i18n/",
        suffix: ".json",
      }),
    }),
    provideHighcharts({
      instance: () =>
        import("highcharts/esm/highcharts").then((m) => {
          const Highcharts = m.default;
          Highcharts.AST.allowedAttributes.push("custom-attribute");
          Highcharts.AST.allowedTags.push("my-custom-tag");
          return Highcharts;
        }),
    }),
  ],
};
