import { z } from "zod";

export const sidebarSchema = z.enum(["dock", "quiet", "classic"]);
export type SidebarKey = z.infer<typeof sidebarSchema>;

export const defaultSidebar: SidebarKey = "dock";
export const sidebarStorageKey = "sidebar";

export const sidebarOptions: { key: SidebarKey; label: string; detail: string }[] = [
  { key: "dock", label: "Floating dock", detail: "Rounded blocks, off the edge" },
  { key: "quiet", label: "Quiet", detail: "No lines, a blue mark for the current page" },
  { key: "classic", label: "Original", detail: "Full-height bar, button on its edge" },
];
