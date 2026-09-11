import {FormField, FieldType} from "@nb/models/dynamic-form.model";
import {Icons} from "@nb/components/icon/icon.component";

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
