import {Routes} from "@angular/router";
import {Constants} from "@nb/utils/constants";
import {LibraryComponent} from "@nb/modules/library/library.component";

export const routes: Routes = [
  {path: "", redirectTo: `/${Constants.LIBRARY_ROUTE}`, pathMatch: "full"},
  {path: Constants.LIBRARY_ROUTE, component: LibraryComponent, data: {state: "library"}},
  //   {
  //     path: Constants.GAME_ZONE_ROUTE,
  //     loadChildren: () =>
  //       import("./modules/game-zone/game-zone.module").then((m) => m.GameZoneModule),
  //     data: {state: "game-zone"},
  //   },
];
