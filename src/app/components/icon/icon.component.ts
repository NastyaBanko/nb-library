import {Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

export enum Icons {
  ARROW_DOWN = "arrow-down",
  ARROW_UP_RIGHT = "arrow-up-right",
  SEARCH = "search",
  SPARKLES = "sparkles",
  STAR = "star",
  USER = "user",
}

@Component({
  selector: "nb-icon",
  templateUrl: "./icon.component.html",
  imports: [CommonModule],
})
export class IconComponent {
  @HostBinding("class") public hostClass = "nb-icon";
  @Input({required: true}) public name!: Icons | string;
  @Input() public size: string | number = 16;
}
