import { Suspense } from "react";
import type { NavItem } from "@/lib/navigation";
import { SidebarLink } from "./sidebar-link";

type SidebarListProps = { items: NavItem[]; isExpanded: boolean };

export function SidebarList({ items, isExpanded }: SidebarListProps) {
  return (
    <ul className="grid grid-cols-[minmax(0,1fr)] gap-1">
      {items.map((item) => (
        <li key={item.href}>
          <Suspense fallback={<span className="block h-10" />}>
            <SidebarLink item={item} isExpanded={isExpanded} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}
