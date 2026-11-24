"use client";

import { IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";
import { sidebarFooter, sidebarGroups } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { SidebarList } from "./sidebar-list";
import { SidebarLogo } from "./sidebar-logo";

/** Desktop only. Phones use BottomBar. */
export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      aria-label="Main"
      className={cn(
        "sticky top-0 z-10 hidden h-dvh flex-col border-r border-text-quiet/25 px-5 py-5 motion-safe:transition-[width] motion-safe:duration-200 md:flex",
        isExpanded ? "w-60" : "w-[5.25rem]",
      )}
    >
      <SidebarLogo isExpanded={isExpanded} />
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Close sidebar" : "Open sidebar"}
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-20 right-0 grid size-8 translate-x-1/2 cursor-pointer place-content-center rounded-full border border-text-quiet/40 bg-page-product text-text-strong after:absolute after:-inset-1.5"
      >
        <IconChevronsRight
          aria-hidden="true"
          size={18}
          className={cn(isExpanded && "rotate-180")}
        />
      </button>
      <div className="mt-8 grid gap-3">
        {sidebarGroups.map((items, index) => (
          <div
            key={items[0]?.href}
            className={cn(index > 0 && "border-t border-text-quiet/25 pt-3")}
          >
            <SidebarList items={items} isExpanded={isExpanded} />
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3">
        <SidebarList items={sidebarFooter} isExpanded={isExpanded} />
      </div>
    </nav>
  );
}
