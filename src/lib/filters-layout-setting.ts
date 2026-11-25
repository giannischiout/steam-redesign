import { z } from "zod";

export const filtersLayoutSchema = z.enum(["top", "sidebar"]);
export type FiltersLayout = z.infer<typeof filtersLayoutSchema>;

export const defaultFiltersLayout: FiltersLayout = "top";
export const filtersLayoutStorageKey = "filters";

export const filtersLayoutOptions: { key: FiltersLayout; label: string }[] = [
  { key: "top", label: "Top bar" },
  { key: "sidebar", label: "Sidebar" },
];
