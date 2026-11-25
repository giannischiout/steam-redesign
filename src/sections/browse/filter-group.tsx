import type { ReactNode } from "react";

type FilterGroupProps = { title: string; children: ReactNode };

export function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <fieldset className="grid min-w-0">
      <legend className="mb-1 font-bold text-text-strong">{title}</legend>
      {children}
    </fieldset>
  );
}
