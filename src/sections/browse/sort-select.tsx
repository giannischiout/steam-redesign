import { SelectField } from "@/components/select-field";
import { SORTS, type Sort } from "@/lib/browse";

const labels: Record<Sort, string> = {
  relevance: "Suggested",
  reviews: "Best reviews",
  newest: "Newest",
  price: "Lowest price",
  discount: "Biggest discount",
  name: "Name",
};

export function SortSelect({ sort, onSort }: { sort: Sort; onSort: (sort: Sort) => void }) {
  return (
    <SelectField
      label="Sort by"
      value={sort}
      options={SORTS.map((value) => ({ value, label: labels[value] }))}
      onChange={(value) => onSort(SORTS.find((option) => option === value) ?? "relevance")}
    />
  );
}
