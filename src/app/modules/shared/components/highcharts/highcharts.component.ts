import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  SimpleChanges,
  ElementRef,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import * as Highcharts from "highcharts";
import {HighchartType, defaultPalette, defaultPieConfig} from "@nb/models/highchart.model";

@Component({
  selector: "nb-highcharts",
  templateUrl: "./highcharts.component.html",
  imports: [CommonModule],
})
export class HighchartsComponent implements OnChanges, OnDestroy {
  @ViewChild("chartContainer", {static: true}) private chartContainer!: ElementRef<HTMLDivElement>;
  @HostBinding("class") public hostClass = "nb-highcharts taHighcharts";
  @Input() chartTitle: string = "";
  @Input() chartType: HighchartType = HighchartType.AREASPLINE;
  @Input() colorPalette: string[] = defaultPalette.colors;
  @Input() customConfig: string = "";
  public chartOptions: Highcharts.Options = {};
  private chartInstance: Highcharts.Chart | null = null;

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["chartType"] ||
      changes["customConfig"] ||
      changes["colorPalette"] ||
      changes["chartTitle"]
    ) {
      this.renderChart();
    }
  }

  public ngOnDestroy(): void {
    this.destroyChart();
  }

  private destroyChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }

  private renderChart() {
    this.destroyChart();

    const processedSeries = JSON.parse(this.customConfig) || {};

    this.chartOptions = {
      chart: {
        type: this.chartType,
        backgroundColor: "transparent",
      },
      title: {
        text: this.chartTitle,
        style: {color: "#f8fafc", fontSize: "16px"},
      },
      credits: {
        enabled: false,
      },
      colors: this.colorPalette,
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: 5,
              },
            },
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            style: {color: "#f8fafc"},
          },
        },
        areaspline: {
          lineWidth: 3,
          threshold: null,
          fillOpacity: 0.3,
        },
        line: {
          lineWidth: 3,
        },
        column: {
          borderRadius: 4,
        },
      },
      ...(this.chartType === HighchartType.PIE ? defaultPieConfig : {}),
      ...processedSeries,
    };

    this.chartInstance = Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }
}
