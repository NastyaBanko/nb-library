import {Component, Input, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Tabs} from "@nb/models/library.model";
import {getInitialFormValues} from "@nb/models/dynamic-form.model";
import {cardFormConfig, cardExamples, CardFormValues} from "@nb/models/card-page.model";
import {SHARED_IMPORTS} from "@nb/modules/shared/shared.imports";

@Component({
  selector: "nb-card-page",
  templateUrl: "./card-page.component.html",
  imports: [CommonModule, ...SHARED_IMPORTS],
})
export class CardPageComponent {
  @HostBinding("class") public hostClass = "nb-card-page";
  @Input() tabId: Tabs = Tabs.OVERVIEW;
  public cardFormValues: CardFormValues = getInitialFormValues<CardFormValues>(cardFormConfig);
  public readonly _tabs = Tabs;
  public readonly _cardExamples = cardExamples;
  public readonly _cardFormConfig = cardFormConfig;

  public _onCardFormChange(values: CardFormValues) {
    this.cardFormValues = values;
  }
}
