"use client";

import * as Popover from "@radix-ui/react-popover";
import { IconChevronDown } from "@tabler/icons-react";
import { useId } from "react";
import { ScrollArea } from "@/components/scroll-area";
import type { FilterGroupData } from "@/lib/filter-groups";
import { FilterChoice } from "./filter-choice";

/** One filter in the top bar. It stays open while you choose; Escape or a click outside closes it. */
export function FilterDropdown({ group }: { group: FilterGroupData }) {
  const name = useId();

  return (
    <Popover.Root>
      <Popover.Trigger className="group flex h-11 cursor-pointer items-center gap-2 rounded-full bg-page-product px-4 text-sm whitespace-nowrap text-text-menu hover:text-text-strong data-[state=open]:text-text-strong">
        {group.title}
        {group.active > 0 && (
          <span className="grid h-5 min-w-5 place-content-center rounded-full bg-text-strong px-1.5 text-xs font-semibold text-page">
            {group.active}
            <span className="sr-only"> chosen</span>
          </span>
        )}
        <IconChevronDown aria-hidden="true" size={16} className="shrink-0 group-data-[state=open]:rotate-180" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          collisionPadding={16}
          aria-label={group.title}
          className="fade-in z-50 w-64 overflow-hidden rounded-tile border border-text-quiet/40 bg-page-product text-text shadow-2xl shadow-media"
        >
          <ScrollArea className="max-h-(--radix-popover-content-available-height)">
            <fieldset className="grid px-4 py-2">
              <legend className="sr-only">{group.title}</legend>
              {group.options.map(({ key, ...option }) => (
                <FilterChoice key={key} type={group.type} name={name} {...option} />
              ))}
            </fieldset>
          </ScrollArea>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
