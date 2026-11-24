import Image from "next/image";
import logo from "../../../public/brand/steam-logo-white.svg";
import symbol from "../../../public/brand/steam-symbol-white.svg";

export function LogoSection() {
  return (
    <section aria-labelledby="logo-title" className="grid gap-4">
      <h2 id="logo-title" className="text-2xl font-bold text-text-strong">
        Logo
      </h2>
      <Image src={logo} alt="Steam logo" unoptimized className="h-[50px] w-auto" />
      <Image src={symbol} alt="Steam symbol" unoptimized className="size-11" />
      <p className="max-w-prose text-text-long">
        Official Valve artwork from steam_brandAssets.eps, unmodified.
      </p>
    </section>
  );
}
