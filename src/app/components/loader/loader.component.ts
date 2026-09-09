import {Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

export type LoaderMode = "fullscreen" | "inline";

@Component({
  selector: "nb-loader",
  templateUrl: "./loader.component.html",
  imports: [CommonModule],
})
export class LoaderComponent {
  @HostBinding("class") public hostClass = "nb-loader";
  @Input() visible: boolean = true;
  @Input() mode: LoaderMode = "inline";
}
