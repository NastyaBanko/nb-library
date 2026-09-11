import {Routes} from "@angular/router";
import {Constants} from "@nb/utils/constants";
import {LibraryComponent} from "@nb/modules/library/library.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: `/${Constants.LIBRARY_ROUTE}?section=highcharts&tab=overview`,
    pathMatch: "full",
  },
  {path: Constants.LIBRARY_ROUTE, component: LibraryComponent, data: {state: "library"}},
];
