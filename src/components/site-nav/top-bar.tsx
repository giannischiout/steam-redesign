import { IconBasketFilled, IconBellFilled, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import symbol from "../../../public/brand/steam-symbol-white.svg";
import type { ReactNode } from "react";

const round =
  "grid size-11 shrink-0 place-content-center rounded-full bg-page-product text-text-menu hover:text-text-strong";

type TopBarProps = { children?: ReactNode };

/** Children (the pinned strip) sit beside the buttons, or below them on phone. */
export function TopBar({ children }: TopBarProps) {
  return (
    <header className="flex flex-wrap items-center gap-3 py-4 md:flex-nowrap">
      <Link href="/" aria-label="Steam, home" className="mr-auto rounded-full md:hidden">
        <Image src={symbol} alt="" unoptimized loading="eager" className="size-11 object-contain" />
      </Link>
      {children && <div className="order-last w-full min-w-0 md:order-none md:w-auto md:flex-1">{children}</div>}
      <div className="flex gap-3 md:ml-auto">
        <Link href="/search" aria-label="Search" className={cn(round, "md:hidden")}>
          <IconSearch aria-hidden="true" size={20} />
        </Link>
        <Link href="/cart" aria-label="Cart" className={round}>
          <IconBasketFilled aria-hidden="true" size={20} />
        </Link>
        <Link href="/notifications" aria-label="Notifications" className={round}>
          <IconBellFilled aria-hidden="true" size={20} />
        </Link>
        <Link
          href="/profile"
          aria-label="Your profile, demo player"
          className={cn(round, "bg-link text-sm font-bold text-page hover:text-page")}
        >
          JD
        </Link>
      </div>
    </header>
  );
}
