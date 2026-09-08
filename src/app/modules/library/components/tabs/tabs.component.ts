import {Component, EventEmitter, Input, Output, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {TabItem} from "@nb/models/tabs.model";

@Component({
  selector: "nb-tabs",
  templateUrl: "./tabs.component.html",
  imports: [CommonModule, TranslatePipe],
})
export class TabsComponent {
  @HostBinding("class") public hostClass = "nb-tabs";
  @Input() tabs: TabItem[] = [];
  @Input() activeTabId: string = "";
  @Output() tabChange = new EventEmitter<string>();

  public _selectTab(tabId: string) {
    this.activeTabId = tabId;
    this.tabChange.emit(tabId);
  }
}
