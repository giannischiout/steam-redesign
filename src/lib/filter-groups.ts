import { categories } from "@/data/categories";
import { countGames, PLATFORMS, PLAYERS, PRICES, REVIEWS, toggleValue, type BrowseGame, type Filters } from "./browse";
import { priceLabel, reviewsLabel } from "./browse-labels";

export type FilterOption = { key: string; label: string; isChecked: boolean; count: number; onChange: () => void };

export type FilterGroupData = {
  key: "price" | "category" | "players" | "platform" | "reviews";
  title: string;
  /** "radio" is choose one, "checkbox" is choose several. */
  type: "radio" | "checkbox";
  /** How many choices are in use. */
  active: number;
  options: FilterOption[];
};

/**
 * Every filter with its choices and counts, shared by the top bar, the sidebar and the
 * phone drawer. A count is how many games that choice would leave.
 */
export function getFilterGroups(
  games: BrowseGame[],
  filters: Filters,
  onChange: (changes: Partial<Filters>) => void,
): FilterGroupData[] {
  const countWith = (changes: Partial<Filters>) => countGames(games, { ...filters, ...changes });

  /** Players and platform: a game must have everything ticked. */
  const needsAll = (key: "players" | "platform", values: readonly string[]) =>
    values.map((value) => ({
      key: value,
      label: value,
      isChecked: filters[key].includes(value),
      count: countWith({ [key]: [...new Set([...filters[key], value])] }),
      onChange: () => onChange({ [key]: toggleValue(filters[key], value) }),
    }));

  return [
    {
      key: "price",
      title: "Price",
      type: "radio",
      active: filters.price === "any" ? 0 : 1,
      options: PRICES.map((price) => ({
        key: price,
        label: priceLabel(price),
        isChecked: filters.price === price,
        count: countWith({ price }),
        onChange: () => onChange({ price }),
      })),
    },
    {
      key: "category",
      title: "Category",
      type: "checkbox",
      active: filters.category.length,
      // A game in any ticked category is shown, so each count is that category's own.
      options: categories.map(({ slug, name }) => ({
        key: slug,
        label: name,
        isChecked: filters.category.includes(slug),
        count: countWith({ category: [slug] }),
        onChange: () => onChange({ category: toggleValue(filters.category, slug) }),
      })),
    },
    {
      key: "players",
      title: "Players",
      type: "checkbox",
      active: filters.players.length,
      options: needsAll("players", PLAYERS),
    },
    {
      key: "platform",
      title: "Platform",
      type: "checkbox",
      active: filters.platform.length,
      options: needsAll("platform", PLATFORMS),
    },
    {
      key: "reviews",
      title: "Reviews",
      type: "radio",
      active: filters.reviews === "any" ? 0 : 1,
      options: REVIEWS.map((reviews) => ({
        key: reviews,
        label: reviewsLabel(reviews),
        isChecked: filters.reviews === reviews,
        count: countWith({ reviews }),
        onChange: () => onChange({ reviews }),
      })),
    },
  ];
}
