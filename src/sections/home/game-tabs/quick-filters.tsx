import { SelectField } from "@/components/select-field";
import { ToggleChip } from "@/components/toggle-chip";
import { categories } from "@/data/categories";
import type { Filters } from "@/lib/browse";

type QuickFiltersProps = { filters: Filters; onChange: (changes: Partial<Filters>) => void };

export function QuickFilters({ filters, onChange }: QuickFiltersProps) {
  return (
    <>
      <ToggleChip
        isOn={filters.price === "10"}
        onToggle={() => onChange({ price: filters.price === "10" ? "any" : "10" })}
      >
        Under 10€
      </ToggleChip>
      <ToggleChip isOn={filters.sale} onToggle={() => onChange({ sale: !filters.sale })}>
        On sale
      </ToggleChip>
      <SelectField
        label="Category"
        value={filters.category[0] ?? ""}
        options={[
          { value: "", label: "Any category" },
          ...categories.map(({ slug, name }) => ({ value: slug, label: name })),
        ]}
        onChange={(slug) => onChange({ category: slug ? [slug] : [] })}
      />
    </>
  );
}
