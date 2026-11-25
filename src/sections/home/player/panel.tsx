import Link from "next/link";
import type { ReactNode } from "react";

type PanelProps = { id: string; title: string; href: string; children: ReactNode };

export function Panel({ id, title, href, children }: PanelProps) {
  return (
    <section aria-labelledby={id} className="rounded-tile bg-page-product p-3 md:p-4">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 id={id} className="text-lg font-bold text-text-strong">
          {title}
        </h2>
        <Link href={href} aria-label={`See all, ${title}`} className="-my-2 flex min-h-11 min-w-11 items-center justify-end text-sm text-link hover:underline">
          See all
        </Link>
      </div>
      <ul className="grid gap-3">{children}</ul>
    </section>
  );
}
