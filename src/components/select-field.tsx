"use client";

import * as Select from "@radix-ui/react-select";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { SelectOption } from "./select-option";

type SelectFieldProps = {
  label: string;
  value: string;
  /** A value cannot be an empty string. */
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

const scrollButton = "flex h-7 cursor-default items-center justify-center text-text-long";

/** Our own dropdown, on Radix Select, which brings the keyboard and screen reader support. */
export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label={label}
        className="group flex h-11 cursor-pointer items-center gap-2 rounded-full bg-page-product pr-4 pl-4 text-sm whitespace-nowrap text-text-menu hover:text-text-strong data-[state=open]:text-text-strong"
      >
        {/* Given here so the label is there from the first paint, not only once Radix has run. */}
        <Select.Value>{options.find((option) => option.value === value)?.label}</Select.Value>
        <Select.Icon asChild>
          <IconChevronDown aria-hidden="true" size={16} className="shrink-0 group-data-[state=open]:rotate-180" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          align="end"
          sideOffset={8}
          collisionPadding={16}
          className="fade-in z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-hidden rounded-tile border border-text-quiet/40 bg-page-product text-text shadow-2xl shadow-media"
        >
          <Select.ScrollUpButton className={scrollButton}>
            <IconChevronUp aria-hidden="true" size={16} />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1.5">
            {options.map((option) => (
              <SelectOption key={option.value} value={option.value} label={option.label} />
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={scrollButton}>
            <IconChevronDown aria-hidden="true" size={16} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
