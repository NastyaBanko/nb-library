import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: "game",
  templateUrl: "./game.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {}
