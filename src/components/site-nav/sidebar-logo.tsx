import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/brand/steam-logo-white.svg";
import symbol from "../../../public/brand/steam-symbol-white.svg";

type SidebarLogoProps = { isExpanded: boolean };

/** Official Valve artwork, unmodified. Keep the space around it clear. */
export function SidebarLogo({ isExpanded }: SidebarLogoProps) {
  return (
    <Link href="/" aria-label="Steam, home" className="block w-fit rounded-full">
      <Image
        src={isExpanded ? logo : symbol}
        alt=""
        unoptimized
        loading="eager"
        className={isExpanded ? "h-[50px] w-auto max-w-none" : "size-11 object-contain"}
      />
    </Link>
  );
}
