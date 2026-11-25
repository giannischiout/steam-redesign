"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/navigation";
import { sidebarIcon, sidebarLabel, sidebarRow, sidebarTooltip } from "./sidebar-item-styles";

type SidebarLinkProps = { item: NavItem; isExpanded: boolean };

export function SidebarLink({ item, isExpanded }: SidebarLinkProps) {
  const isCurrent = usePathname() === item.href;
  const content = (
    <>
      {item.label}
      {item.count && (
        <span className={cn("ml-2 opacity-70", isExpanded && "classic:text-text-long classic:opacity-100")}>{item.count}</span>
      )}
    </>
  );

  return (
    <Link
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        sidebarRow,
        // Dock: a solid square. Quiet: a blue mark at the edge. Classic: a soft square.
        "aria-[current]:bg-text-strong aria-[current]:text-page",
        "quiet:aria-[current]:bg-transparent quiet:aria-[current]:text-text-strong quiet:aria-[current]:before:absolute quiet:aria-[current]:before:-left-[1.125rem] quiet:aria-[current]:before:h-5 quiet:aria-[current]:before:w-[3px] quiet:aria-[current]:before:rounded-r-full quiet:aria-[current]:before:bg-accent",
        "classic:aria-[current]:bg-page-product classic:aria-[current]:text-text-strong",
      )}
    >
      <span className={sidebarIcon}>
        <item.Icon aria-hidden="true" size={22} />
      </span>
      <span className={sidebarLabel(isExpanded)}>{content}</span>
      {!isExpanded && (
        <span aria-hidden="true" className={sidebarTooltip}>
          {content}
        </span>
      )}
    </Link>
  );
}
