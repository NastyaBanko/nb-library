export enum MenuItemId {
  HIGHCHARTS = "HIGHCHARTS",
  CARDS = "CARDS",
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
