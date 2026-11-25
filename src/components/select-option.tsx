import * as Select from "@radix-ui/react-select";
import { IconCheck } from "@tabler/icons-react";

/** One row of the dropdown. The one in use has a tick. */
export function SelectOption({ value, label }: { value: string; label: string }) {
  return (
    <Select.Item
      value={value}
      className="flex h-11 cursor-pointer items-center justify-between gap-6 rounded-media px-3 text-sm whitespace-nowrap text-text-menu outline-none select-none data-highlighted:bg-text-strong/10 data-highlighted:text-text-strong data-[state=checked]:font-semibold data-[state=checked]:text-text-strong"
    >
      <Select.ItemText>{label}</Select.ItemText>
      <span className="grid size-4 place-content-center">
        <Select.ItemIndicator>
          <IconCheck aria-hidden="true" size={16} className="text-accent" />
        </Select.ItemIndicator>
      </span>
    </Select.Item>
  );
}
