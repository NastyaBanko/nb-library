import {Component, HostBinding, Input, OnChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import * as Highcharts from "highcharts";
import {HighchartsChartDirective} from "highcharts-angular";
import {HighchartType, defaultPalette, defaultPieConfig} from "@nb/models/highchart.model";

@Component({
  selector: "nb-highcharts",
  templateUrl: "./highcharts.component.html",
  imports: [CommonModule, HighchartsChartDirective],
})
export class HighchartsComponent implements OnChanges {
  @HostBinding("class") public hostClass = "nb-highcharts";
  @Input() chartTitle: string = "";
  @Input() chartType: HighchartType = HighchartType.AREASPLINE;
  @Input() colorPalette: string[] = defaultPalette.colors;
  @Input() seriesJson: string = "";
  public chartOptions: Highcharts.Options = {};

  public ngOnChanges() {
    this.updateChartOptions();
  }

  private updateChartOptions() {
    const processedSeries = this.processSeriesData(
      this.seriesJson,
      this.colorPalette,
      this.chartType
    );

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
        },
        line: {
          lineWidth: 3,
        },
        column: {
          borderRadius: 4,
        },
      },
      series: processedSeries,
      ...(this.chartType === HighchartType.PIE ? defaultPieConfig : {}),
    };
  }

  private processSeriesData(jsonString: string, paletteColors: string[], type: string): any[] {
    try {
      const parsed = JSON.parse(jsonString);
      const rawArray = Array.isArray(parsed) ? parsed : [parsed];

      return rawArray.map((serie, index) => {
        const color = paletteColors[index % paletteColors.length];

        const seriesConfig: any = {
          ...serie,
          type: type,
          color: color,
        };

        if (type === HighchartType.AREASPLINE || type === HighchartType.AREA) {
          seriesConfig.fillColor = {
            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
            stops: [
              [0, color + "70"],
              [1, color + "00"],
            ],
          };
        }

        return seriesConfig;
      });
    } catch (e) {
      return [];
    }
  }
}
