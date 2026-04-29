// Небольшие вспомогательные функции проекта.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTabValue(pathName: string) {
  if (pathName === "/") return "home";
  if (pathName === "/dashboard" || pathName.startsWith("/dashboard/"))
    return "dashboard";
  if (pathName === "/builds" || pathName.startsWith("/builds")) return "builds";
  if (pathName === "/builds/explore" || pathName.startsWith("/builds/explore"))
    return "explore";
  if (pathName === "/signup") return "signup";
  if (pathName === "/login") return "login";
  return "";
}
