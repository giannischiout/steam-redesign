"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/navigation";

type SidebarLinkProps = { item: NavItem; isExpanded: boolean };

export function SidebarLink({ item, isExpanded }: SidebarLinkProps) {
  const isCurrent = usePathname() === item.href;

  return (
    <Link
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
      className="group relative flex h-10 items-center rounded-full text-sm text-text-menu hover:text-text-strong aria-[current]:bg-page-product aria-[current]:text-text-strong"
    >
      <span className="grid h-10 w-11 shrink-0 place-content-center">
        <item.Icon aria-hidden="true" size={22} />
      </span>
      <span
        className={
          isExpanded
            ? "truncate pr-4"
            : "pointer-events-none absolute left-full z-20 ml-3 rounded-lg bg-text-strong px-3 py-2 whitespace-nowrap text-page opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }
      >
        {item.label}
        {item.count && <span className={isExpanded ? "ml-2 text-text-long" : "ml-2"}>{item.count}</span>}
      </span>
    </Link>
  );
}
