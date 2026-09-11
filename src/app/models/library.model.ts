import {TabItem} from "@nb/models/tabs.model";
import {FormField, FieldType} from "@nb/models/dynamic-form.model";
import {HighchartType, defaultPalette} from "@nb/models/highchart.model";
import {Icons} from "@nb/components/icon/icon.component";

export enum Tabs {
  OVERVIEW = "overview",
  EXAMPLES = "examples",
}

export const mainTabs: TabItem[] = [
  {id: Tabs.OVERVIEW, label: "label.overview"},
  {id: Tabs.EXAMPLES, label: "label.examples"},
];

export interface ChartExample {
  name: string;
  title: string;
  subTitle: string;
  type: HighchartType;
  data: any;
}

export interface CardExample {
  name: string;
  title: string;
  description?: string;
  icon: Icons;
  color?: string;
  isFavourite: boolean;
}

export const cardExamples: CardExample[] = [
  {
    name: "Card Example",
    title: "Infrastructure",
    description: "Description",
    icon: Icons.SPARKLES,
    isFavourite: true,
  },
  {
    name: "Card with a long text",
    title: "Enterprise Infrastructure Scalability and Load Balancing Overview",
    description:
      "This is a detailed breakdown of how modern microservices handle high-load traffic surges across distributed global server nodes without performance degradation.",
    icon: Icons.SPARKLES,
    color: "#1e293b",
    isFavourite: true,
  },
  {
    name: "Card with white background",
    title: "Light Mode",
    description: "Demonstration",
    icon: Icons.STAR,
    color: "#f8fafc",
    isFavourite: true,
  },
  {
    name: "Card with black background",
    title: "Dark Mode",
    description: "Demonstration",
    icon: Icons.USER,
    color: "#000000",
    isFavourite: true,
  },
  {
    name: "Card with random color",
    title: "Financial Growth",
    description:
      "Quarterly revenue targets have been successfully exceeded by 24.5% compared to the previous operational period.",
    icon: Icons.FLAME,
    color: "#31103f",
    isFavourite: true,
  },
  {
    name: "Card without description",
    title: "Financial Growth",
    icon: Icons.FLAME,
    isFavourite: true,
    color: "#b600be",
  },
  {
    name: "Card without favourite flag",
    title: "Financial Growth",
    icon: Icons.FLAME,
    isFavourite: false,
    description: "Description",
    color: "#00b3c9",
  },
];

export const palettes: {label: string; value: any; colors: string[]}[] = [
  defaultPalette,
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
      {label: "Bar", value: HighchartType.BAR},
      {label: "Pie", value: HighchartType.PIE},
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
      {
        series: [
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
      },
      null,
      2
    ),
  },
];

export const lineExample: ChartExample = {
  name: "Line Chart Example",
  title: "Monthly Active Users",
  subTitle: "Platform growth over the last half-year",
  type: HighchartType.LINE,
  data: `{
  "series": [
    {
      "name": "2024",
      "data": [
        3200,
        4900,
        4500,
        6200,
        7800,
        5100
      ]
    },
    {
      "name": "2025",
      "data": [
        1200,
        1900,
        1500,
        2200,
        2800,
        3100
      ]
    },
    {
      "name": "2026",
      "data": [
        1500,
        2100,
        1800,
        2900,
        3400,
        3900
      ]
    }
  ]
}`,
};

export const areasplineExample: ChartExample = {
  name: "Area Spline Chart Example",
  title: "Traffic Flow Dynamics",
  subTitle: "Smooth visualization of inbound requests",
  type: HighchartType.AREASPLINE,
  data: `{
  "series": [
    {
      "name": "Server A",
      "data": [
        800,
        1200,
        1100,
        2400,
        1900,
        2800
      ]
    },
    {
      "name": "Server B",
      "data": [
        900,
        2000,
        1600,
        2000,
        1800,
        3000
      ]
    }
  ]
}`,
};

export const areaExample: ChartExample = {
  name: "Area Chart Example",
  title: "Revenue Overview",
  subTitle: "Cumulative financial growth by quarters",
  type: HighchartType.AREA,
  data: `{
  "series": [
    {
      "name": "Product X",
      "data": [
        3000,
        4500,
        4700,
        6100,
        7800
      ]
    },
    {
      "name": "Product Y",
      "data": [
        2000,
        3100,
        3900,
        4800,
        5600
      ]
    }
  ]
}`,
};

export const columnExample: ChartExample = {
  name: "Column Chart Example",
  title: "Sales by Region",
  subTitle: "Comparative analysis across key markets",
  type: HighchartType.COLUMN,
  data: `{
  "series": [
    {
      "name": "North America",
      "data": [
        5400,
        6200,
        5800,
        7100
      ]
    },
    {
      "name": "Europe",
      "data": [
        4200,
        4900,
        5100,
        6300
      ]
    }
  ]
}`,
};

export const barExample: ChartExample = {
  name: "Bar Chart Example",
  title: "Task Completion Rate",
  subTitle: "Team efficiency score comparison",
  type: HighchartType.BAR,
  data: `{
  "series": [
    {
      "name": "Completed",
      "data": [
        45,
        52,
        38,
        65,
        59
      ]
    },
    {
      "name": "In Progress",
      "data": [
        12,
        19,
        15,
        8,
        22
      ]
    }
  ]
}`,
};

export const pieExample: ChartExample = {
  name: "Pie Chart Example",
  title: "Browser Market Share",
  subTitle: "Distribution of active clients",
  type: HighchartType.PIE,
  data: `{
  "series": [
    {
      "name": "Browsers",
      "data": [
        {
          "name": "Chrome",
          "y": 63.4
        },
        {
          "name": "Safari",
          "y": 20.2
        },
        {
          "name": "Firefox",
          "y": 4.5
        },
        {
          "name": "Edge",
          "y": 3.8
        },
        {
          "name": "Other",
          "y": 8.1
        }
      ]
    }
  ]
}`,
};

export const chartExamples = [
  lineExample,
  areasplineExample,
  areaExample,
  columnExample,
  barExample,
  pieExample,
];

export const iconOptions = (Object.values(Icons) as Icons[]).map((iconValue) => ({
  label: iconValue
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  value: iconValue,
}));

export const cardFormConfig: FormField[] = [
  {
    key: "title",
    label: "label.title",
    type: FieldType.TEXT,
    value: "Title",
  },
  {
    key: "description",
    label: "label.description",
    type: FieldType.TEXT,
    value: "Description",
  },
  {
    key: "color",
    label: "label.color",
    type: FieldType.COLOR,
    value: "#9b58f5",
  },
  {
    key: "icon",
    label: "label.icon",
    type: FieldType.SELECT,
    value: Icons.SPARKLES,
    options: iconOptions,
  },
  {
    key: "isFavourite",
    label: "label.favourite",
    type: FieldType.CHECKBOX,
    value: true,
  },
];
