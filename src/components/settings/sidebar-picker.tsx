"use client";

import { useSidebarSetting } from "@/hooks/use-sidebar-setting";
import { sidebarOptions } from "@/lib/sidebar-setting";
import { ChoiceList } from "./choice-list";

export function SidebarPicker() {
  const { sidebar, setSidebar } = useSidebarSetting();

  return <ChoiceList legend="Sidebar" options={sidebarOptions} value={sidebar} onChange={setSidebar} />;
}
