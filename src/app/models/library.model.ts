import {TabItem} from "@nb/models/tabs.model";
import {FormField, FieldType} from "@nb/models/dynamic-form.model";
import {HighchartType} from "@nb/models/highchart.model";

export enum Tabs {
  OVERVIEW = "OVERVIEW",
  EXAMPLES = "EXAMPLES",
}

export const mainTabs: TabItem[] = [
  {id: Tabs.OVERVIEW, label: "label.overview"},
  {id: Tabs.EXAMPLES, label: "label.examples"},
];

export const palettes: {label: string; value: any; colors: string[]}[] = [
  {
    value: "indigo",
    label: "Indigo Neon",
    colors: ["#6366f1", "#818cf8", "#a855f7", "#c084fc", "#ec4899", "#f43f5e"],
  },
  {
    value: "emerald",
    label: "Emerald Forest",
    colors: ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"],
  },
  {
    value: "sunset",
    label: "Sunset Warm",
    colors: ["#f97316", "#fb923c", "#ef4444", "#f87171", "#eab308", "#facc15"],
  },
  {
    value: "cyberpunk",
    label: "Cyberpunk 2077",
    colors: ["#06b6d4", "#22d3ee", "#8b5cf6", "#a78bfa", "#f43f5e", "#fb7185"],
  },
];

export const highchartFormConfig: FormField[] = [
  {
    key: "chartTitle",
    label: "label.chart.title",
    type: FieldType.TEXT,
    value: "Chart Title",
  },
  {
    key: "chartSubtitle",
    label: "label.chart.subtitle",
    type: FieldType.TEXT,
    value: "Chart Subtitle",
  },
  {
    key: "chartType",
    label: "label.chart.type",
    type: FieldType.SELECT,
    value: HighchartType.AREASPLINE,
    options: [
      {label: "Line", value: HighchartType.LINE},
      {label: "Area Spline", value: HighchartType.AREASPLINE},
      {label: "Area", value: HighchartType.AREA},
      {label: "Column", value: HighchartType.COLUMN},
    ],
  },
  {
    key: "colorPaletteId",
    label: "label.color.palette",
    type: FieldType.SELECT,
    value: palettes[0].value,
    options: palettes,
  },
  {
    key: "seriesJson",
    label: "label.chart.data",
    type: FieldType.MEMO,
    value: JSON.stringify(
      [
        {
          name: "Series 1",
          data: [1200, 2100, 1800, 3200, 2900],
        },
        {
          name: "Series 2",
          data: [800, 1500, 2300, 2900, 3400],
        },
        {
          name: "Series 3",
          data: [500, 1100, 1400, 2200, 2800],
        },
      ],
      null,
      2
    ),
  },
];
