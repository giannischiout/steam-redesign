"use client";

import { ScrollArea } from "@/components/scroll-area";
import { useBrowseFilters } from "@/hooks/use-browse-filters";
import { filterGames, type BrowseGame } from "@/lib/browse";
import { ActiveFilters } from "./active-filters";
import { FilterDrawer } from "./filter-drawer";
import { FilterPanel } from "./filter-panel";
import { Results } from "./results";
import { ResultsBar } from "./results-bar";

type BrowseViewProps = { games: BrowseGame[] };

export function BrowseView({ games }: BrowseViewProps) {
  const { filters, update, clear } = useBrowseFilters();
  const results = filterGames(games, filters);
  const panel = <FilterPanel games={games} filters={filters} onChange={update} />;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8">
      <aside aria-label="Filters" className="sticky top-4 hidden rounded-tile bg-page-product lg:block">
        <ScrollArea className="max-h-[calc(100dvh-2rem)]">
          <div className="p-4">{panel}</div>
        </ScrollArea>
      </aside>
      <div className="grid min-w-0 gap-4">
        <ResultsBar count={results.length} sort={filters.sort} onSort={(sort) => update({ sort })}>
          <FilterDrawer count={results.length} onClear={clear}>
            {panel}
          </FilterDrawer>
        </ResultsBar>
        <ActiveFilters filters={filters} onChange={update} onClear={clear} />
        <Results key={JSON.stringify(filters)} games={results} onClear={clear} />
      </div>
    </div>
  );
}
