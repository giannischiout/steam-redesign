"use client";

import { useState } from "react";
import { useShortcut } from "@/hooks/use-shortcut";
import { cn } from "@/lib/cn";
import { settingsItem, sidebarGroups } from "@/lib/navigation";
import { SidebarEdgeToggle } from "./sidebar-edge-toggle";
import { SidebarList } from "./sidebar-list";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarToggle } from "./sidebar-toggle";

/**
 * A group of links. A floating block in the dock, bare in quiet and classic.
 * The dock's corner is the row's corner (12px) plus the padding (6px), so the curves run together.
 */
const block =
  "rounded-[1.125rem] bg-page-product p-1.5 quiet:rounded-none quiet:bg-transparent classic:rounded-none classic:bg-transparent classic:p-0";

/**
 * Desktop only. Phones use BottomBar. The look is the visitor's choice in Settings:
 * the dock is the default, `quiet:` and `classic:` change it (see globals.css).
 * `classic` is the original: button on the edge, group lines and Settings at the bottom.
 */
export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded((wasExpanded) => !wasExpanded);
  useShortcut("b", toggle);

  return (
    <nav
      aria-label="Main"
      className={cn(
        // Dock: 12px all round, and none on the right, where the page brings its own 24px.
        "sticky top-0 z-10 hidden h-dvh flex-col p-3 pr-0 motion-safe:transition-[width] motion-safe:duration-200 md:flex classic:border-r classic:border-text-quiet/25 classic:p-5",
        isExpanded ? "w-60" : "w-17 classic:w-[5.25rem]",
      )}
    >
      <div className="px-1.5 classic:px-0">
        <SidebarLogo isExpanded={isExpanded} />
      </div>
      <SidebarEdgeToggle isExpanded={isExpanded} onToggle={toggle} />
      <div className="mt-4 grid gap-3 quiet:gap-5 classic:mt-0">
        {sidebarGroups.map((items, index) => (
          <div
            key={items[0]?.href}
            className={cn(block, index > 0 && "classic:border-t classic:border-text-quiet/25 classic:pt-3")}
          >
            <SidebarList items={items} isExpanded={isExpanded} />
          </div>
        ))}
      </div>
      <div className={cn(block, "mt-auto classic:hidden")}>
        <SidebarToggle isExpanded={isExpanded} onToggle={toggle} />
      </div>
      <div className="mt-auto hidden pt-3 classic:block">
        <SidebarList items={[settingsItem]} isExpanded={isExpanded} />
      </div>
    </nav>
  );
}
