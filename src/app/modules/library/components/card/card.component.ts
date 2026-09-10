import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnChanges,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IconComponent} from "@nb/components/icon/icon.component";

@Component({
  selector: "nb-card",
  imports: [CommonModule, IconComponent],
  templateUrl: "./card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges {
  @HostBinding("class") public hostClass = "nb-card";
  @Input({required: true}) public icon!: string;
  @Input({required: true}) public title!: string;
  @Input() public description: string = "";
  @Input() public showFavouriteIcon: boolean = true;
  @Input() public color: string = "#6366f1";

  @Output() public infoClick = new EventEmitter<MouseEvent>();

  public isLightBackground: boolean = false;

  public ngOnChanges(): void {
    this.isLightBackground = this.checkIsLightColor(this.color);
  }

  public onInfoClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.infoClick.emit(event);
  }

  private checkIsLightColor(color: string): boolean {
    let r = 30,
      g = 41,
      b = 59;

    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length >= 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
    } else if (color.startsWith("rgb")) {
      const match = color.match(/\d+/g);
      if (match && match.length >= 3) {
        r = parseInt(match[0], 10);
        g = parseInt(match[1], 10);
        b = parseInt(match[2], 10);
      }
    }

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 180;
  }
}
