import Link from "next/link";
import { VALVE_ATTRIBUTION } from "@/lib/legal";
import { footerLinks } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="grid gap-4 pt-16 pb-24 text-sm text-text-quiet">
      <nav aria-label="All sections">
        <ul className="flex flex-wrap gap-x-5">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="flex h-11 min-w-11 items-center justify-center text-text-menu hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="max-w-prose">{VALVE_ATTRIBUTION}</p>
    </footer>
  );
}
