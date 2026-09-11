export enum MenuItemId {
  HIGHCHARTS = "highcharts",
  CARDS = "cards",
}

export interface MenuItem {
  id: MenuItemId;
  label: string;
}

export const menuItems: MenuItem[] = [
  {
    id: MenuItemId.HIGHCHARTS,
    label: "label.highcharts",
  },
  {
    id: MenuItemId.CARDS,
    label: "label.cards",
  },
];
