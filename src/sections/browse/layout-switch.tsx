"use client";

import { IconLayoutNavbarFilled, IconLayoutSidebarFilled } from "@tabler/icons-react";
import { useId } from "react";
import { useFiltersLayout } from "@/hooks/use-filters-layout";
import { filtersLayoutOptions } from "@/lib/filters-layout-setting";

const icons = { top: IconLayoutNavbarFilled, sidebar: IconLayoutSidebarFilled };

/** Beside the page title: where the filters sit. Wide screens only; narrower ones use the drawer. */
export function LayoutSwitch() {
  const { layout, setLayout } = useFiltersLayout();
  const name = useId();

  return (
    <fieldset className="hidden items-center gap-3 lg:flex">
      <legend className="sr-only">Where the filters sit</legend>
      <span aria-hidden="true" className="text-sm text-text-long">
        Filters
      </span>
      <div className="flex gap-1 rounded-full bg-page-product p-1">
        {filtersLayoutOptions.map((option) => {
          const Icon = icons[option.key];
          return (
            <label
              key={option.key}
              className="flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm text-text-menu hover:text-text-strong has-checked:bg-text-strong has-checked:font-semibold has-checked:text-page has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-text-strong"
            >
              <input
                type="radio"
                name={name}
                value={option.key}
                checked={layout === option.key}
                onChange={() => setLayout(option.key)}
                className="sr-only"
              />
              <Icon aria-hidden="true" size={18} />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
