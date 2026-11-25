import { CONCEPT_NOTICE } from "@/lib/legal";

/**
 * On every page, above everything, and it cannot be closed. One line from md, where it is
 * exactly 32px: the sidebar is that much shorter than the screen.
 */
export function ConceptNotice() {
  return (
    <aside
      aria-label="About this site"
      className="flex min-h-8 items-center justify-center bg-nav px-4 py-1 text-center text-xs text-text-strong"
    >
      {CONCEPT_NOTICE}
    </aside>
  );
}
