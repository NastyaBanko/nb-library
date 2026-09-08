export enum HighchartType {
  LINE = "line",
  AREASPLINE = "areaspline",
  AREA = "area",
  COLUMN = "column",
  BAR = "bar",
  PIE = "pie",
}

export const defaultPalette = {
  value: "indigo",
  label: "Indigo Neon",
  colors: ["#6366f1", "#818cf8", "#a855f7", "#c084fc", "#ec4899", "#f43f5e"],
};

export const defaultPieConfig = {
    xAxis: undefined,
    yAxis: undefined,
};
