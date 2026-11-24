"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/navigation";

type BottomBarLinkProps = { item: NavItem };

export function BottomBarLink({ item }: BottomBarLinkProps) {
  const isCurrent = usePathname() === item.href;

  return (
    <Link
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
      className="grid size-14 place-content-center justify-items-center gap-1 rounded-full text-xs text-text-menu aria-[current]:bg-page-product aria-[current]:text-text-strong"
    >
      <item.Icon aria-hidden="true" size={22} />
      {item.label}
    </Link>
  );
}
