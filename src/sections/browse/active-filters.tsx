import { IconX } from "@tabler/icons-react";
import { categories } from "@/data/categories";
import { toggleValue, type Filters } from "@/lib/browse";
import { priceLabel, reviewsLabel } from "@/lib/browse-labels";

type ActiveFiltersProps = { filters: Filters; onChange: (changes: Partial<Filters>) => void; onClear: () => void };

type Chip = { label: string; removed: Partial<Filters> };

function getChips(filters: Filters): Chip[] {
  return [
    ...(filters.q ? [{ label: `"${filters.q}"`, removed: { q: "" } }] : []),
    ...(filters.creator ? [{ label: filters.creator, removed: { creator: "" } }] : []),
    ...filters.category.map((slug) => ({
      label: categories.find((category) => category.slug === slug)?.name ?? slug,
      removed: { category: toggleValue(filters.category, slug) },
    })),
    ...(filters.price === "any" ? [] : [{ label: priceLabel(filters.price), removed: { price: "any" as const } }]),
    ...(filters.sale ? [{ label: "On sale", removed: { sale: false } }] : []),
    ...(filters.reviews === "any"
      ? []
      : [{ label: reviewsLabel(filters.reviews), removed: { reviews: "any" as const } }]),
    ...filters.players.map((mode) => ({ label: mode, removed: { players: toggleValue(filters.players, mode) } })),
    ...filters.platform.map((name) => ({ label: name, removed: { platform: toggleValue(filters.platform, name) } })),
  ];
}

export function ActiveFilters({ filters, onChange, onClear }: ActiveFiltersProps) {
  const chips = getChips(filters);
  if (chips.length === 0) return null;

  // Rows are 12px apart, so the tap areas of two rows do not overlap.
  return (
    <ul aria-label="Active filters" className="flex flex-wrap items-center gap-x-2 gap-y-3 py-1.5">
      {chips.map((chip) => (
        <li key={chip.label}>
          <button
            type="button"
            aria-label={`Remove ${chip.label}`}
            onClick={() => onChange(chip.removed)}
            // Small and faint, unlike the filter buttons. `after` keeps the tap area 44px high.
            className="relative flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-text-quiet/30 pr-2.5 pl-3 text-xs text-text-long after:absolute after:inset-x-0 after:-inset-y-1.5 hover:border-text-quiet/60 hover:text-text-strong"
          >
            {chip.label}
            <IconX aria-hidden="true" size={14} />
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={onClear} className="relative h-8 min-w-11 cursor-pointer px-1 text-xs text-link after:absolute after:inset-x-0 after:-inset-y-1.5 hover:underline">
          Clear all
        </button>
      </li>
    </ul>
  );
}
