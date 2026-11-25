import { useId } from "react";
import { countGames, type BrowseGame, type Filters } from "@/lib/browse";
import { getFilterGroups } from "@/lib/filter-groups";
import { FilterChoice } from "./filter-choice";
import { FilterGroup } from "./filter-group";
import { PlatformToggles } from "./platform-toggles";

type FilterPanelProps = { games: BrowseGame[]; filters: Filters; onChange: (changes: Partial<Filters>) => void };

/** The filters as one list: the sidebar and the phone drawer. */
export function FilterPanel({ games, filters, onChange }: FilterPanelProps) {
  const id = useId();

  return (
    <div className="grid gap-6">
      {getFilterGroups(games, filters, onChange).map((group) => (
        <FilterGroup key={group.key} title={group.title}>
          {group.key === "platform" ? (
            <PlatformToggles options={group.options} />
          ) : (
            group.options.map(({ key, ...option }) => (
              <FilterChoice key={key} type={group.type} name={`${id}-${group.key}`} {...option} />
            ))
          )}
          {group.key === "price" && (
            <FilterChoice
              type="checkbox"
              label="On sale"
              isChecked={filters.sale}
              count={countGames(games, { ...filters, sale: true })}
              onChange={() => onChange({ sale: !filters.sale })}
            />
          )}
        </FilterGroup>
      ))}
    </div>
  );
}
