import type { ReactNode } from "react";
import { ToggleChip } from "@/components/toggle-chip";
import { countGames, type BrowseGame, type Filters } from "@/lib/browse";
import { getFilterGroups } from "@/lib/filter-groups";
import { FilterDropdown } from "./filter-dropdown";

type TopFiltersProps = {
  games: BrowseGame[];
  filters: Filters;
  onChange: (changes: Partial<Filters>) => void;
  /** Sits at the right end: the sort menu. */
  children: ReactNode;
};

/** The wide-screen filters as a row of dropdowns above the games. */
export function TopFilters({ games, filters, onChange, children }: TopFiltersProps) {
  const onSaleCount = countGames(games, { ...filters, sale: true });

  return (
    <div role="group" aria-label="Filters" className="hidden flex-wrap items-center gap-2 lg:flex filters-side:hidden">
      {getFilterGroups(games, filters, onChange).map((group) => (
        <FilterDropdown key={group.key} group={group} />
      ))}
      <ToggleChip
        isOn={filters.sale}
        isDisabled={onSaleCount === 0 && !filters.sale}
        onToggle={() => onChange({ sale: !filters.sale })}
      >
        On sale
      </ToggleChip>
      <div className="ml-auto">{children}</div>
    </div>
  );
}
