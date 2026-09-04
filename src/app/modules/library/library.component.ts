import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "@nb/modules/library/components/menu/menu.component";

@Component({
  selector: "library",
  templateUrl: "./library.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuComponent],
  // standalone: false,
})
export class LibraryComponent {
  currentTitle = "Дашборд";

  onMenuSelect(item: any) {
    this.currentTitle = item.label;
    console.log("Выбран элемент:", item);
  }
}
