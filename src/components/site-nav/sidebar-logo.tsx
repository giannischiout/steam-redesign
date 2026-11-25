import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import logo from "../../../public/brand/steam-logo-white.svg";
import symbol from "../../../public/brand/steam-symbol-white.svg";
import { sidebarMotion } from "./sidebar-item-styles";

type SidebarLogoProps = { isExpanded: boolean };

/**
 * Official Valve artwork, unmodified. Keep the space around it clear.
 * Both files are the same height and start at the same point, so at one size the circle
 * stays exactly where it is while the full logo appears over it.
 */
export function SidebarLogo({ isExpanded }: SidebarLogoProps) {
  return (
    <Link href="/" aria-label="Steam, home" className="relative block h-11 w-11 rounded-full">
      <Image
        src={symbol}
        alt=""
        unoptimized
        loading="eager"
        // Leaves only once the full logo is solid, so the circle never dims.
        className={cn("h-11 w-auto max-w-none", isExpanded && "opacity-0 motion-safe:transition-opacity motion-safe:delay-250 motion-safe:duration-0")}
      />
      <Image
        src={logo}
        alt=""
        unoptimized
        loading="eager"
        className={cn(
          "pointer-events-none absolute top-0 left-0 h-11 w-auto max-w-none",
          sidebarMotion,
          !isExpanded && "opacity-0",
        )}
      />
    </Link>
  );
}
