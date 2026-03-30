export type ComponentCategory = {
  id: string;
  name: string;
  icon: string;
};

export type ComponentType =
  | "cpu"
  | "gpu"
  | "psu"
  | "ram"
  | "ssd"
  | "motherboard"
  | "case"
  | "cooler";

export type Component = {
  id: string;
  name: string;
  price: number;
  type: ComponentType;
  socket: string | null;
};
export const categoryIdToDbType: Record<string, ComponentType> = {
  cpu: "cpu",
  gpu: "gpu",
  psu: "psu",
  ram: "ram",
  storage: "ssd",
  motherboard: "motherboard",
  case: "case",
  cooling: "cooler",
};

export const dbTypeToCategoryId: Record<ComponentType, string> = {
  cpu: "cpu",
  gpu: "gpu",
  psu: "psu",
  ram: "ram",
  ssd: "storage",
  motherboard: "motherboard",
  case: "case",
  cooler: "cooling",
};
