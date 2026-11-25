import type { ReactNode } from "react";
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

type ResultsBarProps = { count: number; sort: Sort; onSort: (sort: Sort) => void; children: ReactNode };

export function ResultsBar({ count, sort, onSort, children }: ResultsBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p role="status" className="text-text-strong">
        {count === 1 ? "1 game" : `${count} games`}
      </p>
      <div className="flex items-center gap-2">
        {children}
        <SelectField
          label="Sort by"
          value={sort}
          options={SORTS.map((value) => ({ value, label: labels[value] }))}
          onChange={(value) => onSort(SORTS.find((option) => option === value) ?? "relevance")}
        />
      </div>
    </div>
  );
}
