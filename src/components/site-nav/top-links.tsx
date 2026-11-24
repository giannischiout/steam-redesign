"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { topLinks } from "@/lib/navigation";

export function TopLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex">
      {topLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className="flex h-11 items-center rounded-full px-3 text-sm font-medium text-text-menu hover:text-text-strong aria-[current]:text-accent 2xl:px-4"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
