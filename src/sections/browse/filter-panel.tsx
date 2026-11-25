import { useId } from "react";
import { platformIcons } from "@/components/platform-icons";
import { categories } from "@/data/categories";
import { countGames, PLATFORMS, PLAYERS, PRICES, REVIEWS, toggleValue, type BrowseGame, type Filters } from "@/lib/browse";
import { priceLabel, reviewsLabel } from "@/lib/browse-labels";
import { FilterChoice } from "./filter-choice";
import { FilterGroup } from "./filter-group";

type FilterPanelProps = { games: BrowseGame[]; filters: Filters; onChange: (changes: Partial<Filters>) => void };

/** Each choice shows how many games it would leave. Choices that leave none are off. */
export function FilterPanel({ games, filters, onChange }: FilterPanelProps) {
  const id = useId();
  const countWith = (changes: Partial<Filters>) => countGames(games, { ...filters, ...changes });
  const withValue = (list: string[], value: string) => [...new Set([...list, value])];

  return (
    <div className="grid gap-6">
      <FilterGroup title="Price">
        {PRICES.map((price) => (
          <FilterChoice
            key={price}
            type="radio"
            name={`${id}-price`}
            label={priceLabel(price)}
            isChecked={filters.price === price}
            count={countWith({ price })}
            onChange={() => onChange({ price })}
          />
        ))}
        <FilterChoice
          type="checkbox"
          label="On sale"
          isChecked={filters.sale}
          count={countWith({ sale: true })}
          onChange={() => onChange({ sale: !filters.sale })}
        />
      </FilterGroup>
      <FilterGroup title="Category">
        {categories.map(({ slug, name }) => (
          <FilterChoice
            key={slug}
            type="checkbox"
            label={name}
            isChecked={filters.category.includes(slug)}
            count={countWith({ category: withValue(filters.category, slug) })}
            onChange={() => onChange({ category: toggleValue(filters.category, slug) })}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Players">
        {PLAYERS.map((mode) => (
          <FilterChoice
            key={mode}
            type="checkbox"
            label={mode}
            isChecked={filters.players.includes(mode)}
            count={countWith({ players: withValue(filters.players, mode) })}
            onChange={() => onChange({ players: toggleValue(filters.players, mode) })}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Platform">
        <div className="flex gap-2 py-1">
          {PLATFORMS.map((platform) => {
            const Icon = platformIcons.get(platform);
            return (
              <button
                key={platform}
                type="button"
                title={platform}
                aria-label={platform}
                aria-pressed={filters.platform.includes(platform)}
                onClick={() => onChange({ platform: toggleValue(filters.platform, platform) })}
                className="grid size-11 cursor-pointer place-content-center rounded-full bg-page text-text-menu hover:text-text-strong aria-pressed:bg-text-strong aria-pressed:text-page"
              >
                {Icon && <Icon aria-hidden="true" size={20} />}
              </button>
            );
          })}
        </div>
      </FilterGroup>
      <FilterGroup title="Reviews">
        {REVIEWS.map((reviews) => (
          <FilterChoice
            key={reviews}
            type="radio"
            name={`${id}-reviews`}
            label={reviewsLabel(reviews)}
            isChecked={filters.reviews === reviews}
            count={countWith({ reviews })}
            onChange={() => onChange({ reviews })}
          />
        ))}
      </FilterGroup>
    </div>
  );
}
