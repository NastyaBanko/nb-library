import {Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Icons} from "@nb/models/icon.model";

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
