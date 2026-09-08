import {ChangeDetectionStrategy, Component, EventEmitter, Output, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MenuItem, menuItems} from "@nb/models/menu.model";

@Component({
  selector: "nb-menu",
  templateUrl: "./menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, TranslatePipe],
})
export class MenuComponent {
  @HostBinding("class") public hostClass = "nb-menu";
  public searchQuery: string = "";
  public activeId: string = menuItems[0].id;
  @Output() itemClick = new EventEmitter<MenuItem>();

  public get filteredItems(): MenuItem[] {
    if (!this.searchQuery.trim()) {
      return menuItems;
    }
    const query = this.searchQuery.toLowerCase();
    return menuItems.filter((item: MenuItem) => item.label.toLowerCase().includes(query));
  }

  public _selectItem(item: MenuItem) {
    this.activeId = item.id;
    this.itemClick.emit(item);
  }
}
