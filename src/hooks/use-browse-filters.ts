import { useSearchParams } from "next/navigation";
import { browseHref, noFilters, parseFilters, type Filters } from "@/lib/browse";

/** The link is the only place the filters are kept, so Back and sharing work. */
export function useBrowseFilters() {
  const filters = parseFilters(useSearchParams());

  function update(changes: Partial<Filters>) {
    window.history.pushState(null, "", browseHref({ ...filters, ...changes }));
  }

  return { filters, update, clear: () => update({ ...noFilters, sort: filters.sort }) };
}
