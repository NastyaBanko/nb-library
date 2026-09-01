import {Routes} from "@angular/router";
import {Constants} from "@suzuki/utils/constants";
import {GameZoneComponent} from "@suzuki/modules/game-zone/game-zone.component";

export const routes: Routes = [
  {path: "", redirectTo: `/${Constants.GAME_ZONE_ROUTE}`, pathMatch: "full"},
  {path: Constants.GAME_ZONE_ROUTE, component: GameZoneComponent, data: {state: "game-zone"}},
  //   {
  //     path: Constants.GAME_ZONE_ROUTE,
  //     loadChildren: () =>
  //       import("./modules/game-zone/game-zone.module").then((m) => m.GameZoneModule),
  //     data: {state: "game-zone"},
  //   },
];
