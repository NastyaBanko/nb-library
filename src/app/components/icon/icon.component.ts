import {Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "nb-icon",
  templateUrl: "./icon.component.html",
  imports: [CommonModule],
})
export class IconComponent {
  @HostBinding("class") public hostClass = "nb-icon";
  @Input({required: true}) public name!: string;
  @Input() public size: string | number = 16;
}
