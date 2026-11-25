import type { ReactNode } from "react";
import { SectionTitle } from "./section-title";

type SectionHeaderProps = { id: string; title: string; detail?: string; children?: ReactNode };

/**
 * A title, an optional line under it, and whatever belongs on the right. Buttons on the right
 * are pulled in top and bottom, so they never push the title down or away from its content.
 */
export function SectionHeader({ id, title, detail, children }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4 md:mb-4">
      <div className="grid gap-1">
        <SectionTitle id={id}>{title}</SectionTitle>
        {detail && <p className="text-text-long">{detail}</p>}
      </div>
      {children && <div className="-my-2 flex shrink-0 self-center">{children}</div>}
    </div>
  );
}
