import {TabItem} from "@nb/models/tabs.model";

export enum Tabs {
  OVERVIEW = "overview",
  EXAMPLES = "examples",
}

export const mainTabs: TabItem[] = [
  {id: Tabs.OVERVIEW, label: "label.overview"},
  {id: Tabs.EXAMPLES, label: "label.examples"},
];
