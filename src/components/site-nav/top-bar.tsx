import { IconBasketFilled, IconBellFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { SearchButton } from "@/components/search/search-button";
import { cn } from "@/lib/cn";
import avatar from "../../../public/profile/avatar.webp";
import symbol from "../../../public/brand/steam-symbol-white.svg";
import { AnnouncementToggle } from "./announcement-toggle";
import { TopLinks } from "./top-links";

const round =
  "grid size-11 shrink-0 place-content-center rounded-full bg-page-product text-text-menu hover:text-text-strong";

export function TopBar() {
  return (
    <header className="flex items-center gap-2 pt-3 pb-5 md:gap-3 md:pb-8">
      <Link href="/" aria-label="Steam, home" className="mr-auto rounded-full md:hidden">
        <Image src={symbol} alt="" unoptimized loading="eager" className="size-11 object-contain" />
      </Link>
      <SearchButton
        variant="field"
        className="hidden h-11 min-w-0 flex-1 items-center gap-3 rounded-full bg-page-product pr-2.5 pl-4 text-sm text-text-long hover:text-text-strong md:flex lg:max-w-md"
      />
      <nav aria-label="Steam" className="hidden lg:block">
        <Suspense fallback={<div className="h-11" />}>
          <TopLinks />
        </Suspense>
      </nav>
      <div className="flex items-center gap-2 md:ml-auto">
        <SearchButton variant="icon" className={cn(round, "md:hidden")} />
        <Suspense>
          <AnnouncementToggle className={cn(round, "cursor-pointer")} />
        </Suspense>
        <Link href="/cart" aria-label="Cart" className={round}>
          <IconBasketFilled aria-hidden="true" size={20} />
        </Link>
        <Link href="/notifications" aria-label="Notifications, new" className={cn(round, "relative")}>
          <IconBellFilled aria-hidden="true" size={20} />
          <span className="absolute top-2 right-2 size-3 rounded-full border-2 border-page-product bg-alert" />
        </Link>
        <Link
          href="/wallet"
          aria-label="Wallet, 0,00€"
          className="hidden h-11 items-center px-2 text-sm text-text-menu hover:text-text-strong xl:flex"
        >
          0,00€
        </Link>
        <Link href="/profile" aria-label="Your profile, demo player" className={cn(round, "overflow-hidden")}>
          <Image src={avatar} alt="" sizes="44px" loading="eager" className="size-11 object-cover" />
        </Link>
      </div>
    </header>
  );
}
