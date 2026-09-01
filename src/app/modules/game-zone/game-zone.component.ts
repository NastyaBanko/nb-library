import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "game-zone",
  templateUrl: "./game-zone.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GameZoneComponent {}
