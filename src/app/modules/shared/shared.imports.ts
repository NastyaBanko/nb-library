import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {CardComponent} from "@nb/modules/shared/components/card/card.component";
import {DynamicFormComponent} from "@nb/modules/shared/components/dynamic-form/dynamic-form.component";
import {HighchartsComponent} from "@nb/modules/shared/components/highcharts/highcharts.component";
import {MenuComponent} from "@nb/modules/shared/components/menu/menu.component";
import {TabsComponent} from "@nb/modules/shared/components/tabs/tabs.component";
import {LoaderComponent} from "@nb/modules/shared/components/loader/loader.component";
import {IconComponent} from "@nb/modules/shared/components/icon/icon.component";

export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  TranslatePipe,
  LoaderComponent,
  IconComponent,
  CardComponent,
  DynamicFormComponent,
  HighchartsComponent,
  MenuComponent,
  TabsComponent,
];
