import {NgModule} from "@angular/core";
import {RouterModule, Routes, RouterOutlet} from "@angular/router";
import {GameComponent} from "@suzuki/modules/game-zone/components/game/game.component";
import {GameZoneComponent} from "@suzuki/modules/game-zone/game-zone.component";

@NgModule({
  imports: [GameZoneComponent],
})
export class GameZoneModule {}
