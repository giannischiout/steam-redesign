"use client";

import { useRef } from "react";
import { ScrollArea } from "@/components/scroll-area";
import { useBrowseFilters } from "@/hooks/use-browse-filters";
import { useFitToScreen } from "@/hooks/use-fit-to-screen";
import { filterGames, type BrowseGame } from "@/lib/browse";
import { ActiveFilters } from "./active-filters";
import { FilterDrawer } from "./filter-drawer";
import { FilterPanel } from "./filter-panel";
import { GameCount } from "./game-count";
import { Results } from "./results";
import { ResultsBar } from "./results-bar";
import { SortSelect } from "./sort-select";
import { TopFilters } from "./top-filters";

type BrowseViewProps = { games: BrowseGame[] };

export function BrowseView({ games }: BrowseViewProps) {
  const { filters, update, clear } = useBrowseFilters();
  const sidebarRef = useRef<HTMLElement>(null);
  useFitToScreen(sidebarRef);
  const results = filterGames(games, filters);
  const panel = <FilterPanel games={games} filters={filters} onChange={update} />;
  const sortMenu = <SortSelect sort={filters.sort} onSort={(sort) => update({ sort })} />;

  // Both wide layouts are in the page; `filters-side:` shows the saved one, with no flash.
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 filters-side:lg:grid-cols-[16rem_minmax(0,1fr)] filters-side:lg:gap-8">
      <aside ref={sidebarRef} aria-label="Filters" className="sticky top-4 hidden rounded-tile bg-page-product filters-side:lg:block">
        <ScrollArea className="max-h-(--fit,calc(100dvh-2rem))">
          <div className="p-4">{panel}</div>
        </ScrollArea>
      </aside>
      <div className="grid min-w-0 gap-4">
        <TopFilters games={games} filters={filters} onChange={update}>
          {sortMenu}
        </TopFilters>
        <ResultsBar count={results.length}>
          <FilterDrawer count={results.length} onClear={clear}>
            {panel}
          </FilterDrawer>
          {sortMenu}
        </ResultsBar>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 empty:hidden">
          <ActiveFilters filters={filters} onChange={update} onClear={clear} />
          {/* With the top bar, the count sits under it, across from the chips. */}
          <GameCount count={results.length} className="ml-auto hidden lg:block filters-side:hidden" />
        </div>
        <Results key={JSON.stringify(filters)} games={results} onClear={clear} />
      </div>
    </div>
  );
}
