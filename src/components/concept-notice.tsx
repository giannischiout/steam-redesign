import { CONCEPT_NOTICE } from "@/lib/legal";

export function ConceptNotice() {
  return (
    <aside
      aria-label="About this site"
      className="bg-nav px-4 py-2 text-xs text-text-strong md:px-8"
    >
      {CONCEPT_NOTICE}
    </aside>
  );
}
