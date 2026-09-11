import {Component, Input, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HighchartsComponent} from "@nb/modules/library/components/highcharts/highcharts.component";
import {DynamicFormComponent} from "@nb/modules/library/components/dynamic-form/dynamic-form.component";
import {Tabs} from "@nb/models/library.model";
import {getInitialFormValues} from "@nb/models/dynamic-form.model";
import {highchartFormConfig, chartExamples, palettes} from "@nb/models/highchart-page.model";

@Component({
  selector: "nb-highchart-page",
  templateUrl: "./highchart-page.component.html",
  imports: [CommonModule, HighchartsComponent, DynamicFormComponent],
})
export class HighchartPageComponent {
  @HostBinding("class") public hostClass = "nb-highchart-page";
  @Input() tabId: Tabs = Tabs.OVERVIEW;
  public highchartFormValues: any = getInitialFormValues(highchartFormConfig);
  public readonly _tabs = Tabs;
  public readonly _highchartFormConfig = highchartFormConfig;
  public readonly _chartExamples = chartExamples;

  public get colorPalette(): string[] {
    const palette = palettes.find((p) => p.value === this.highchartFormValues.colorPaletteId);
    return palette?.colors || palettes[0].colors;
  }

  public _onHighchartFormChange(values: any) {
    this.highchartFormValues = values;
  }
}
