import { ComponentCategory } from "./types";

export const componentCategories: ComponentCategory[] = [
  { id: "cpu", name: "CPU", icon: "Cpu" },
  { id: "gpu", name: "Видео карта", icon: "Monitor" },
  { id: "ram", name: "Оперативная память", icon: "MemoryStick" },
  { id: "storage", name: "Накопитель", icon: "HardDrive" },
  { id: "motherboard", name: "Материнская плата", icon: "Server" },
  { id: "case", name: "Корпус", icon: "Box" },
  { id: "cooling", name: "Охлаждение", icon: "Fan" },
  { id: "psu", name: "Блок питания", icon: "Zap" },
];
