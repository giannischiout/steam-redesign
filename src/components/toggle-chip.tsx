import type { ReactNode } from "react";

type ToggleChipProps = { isOn: boolean; onToggle: () => void; isDisabled?: boolean; children: ReactNode };

export function ToggleChip({ isOn, onToggle, isDisabled = false, children }: ToggleChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isOn}
      disabled={isDisabled}
      onClick={onToggle}
      className="flex h-11 cursor-pointer items-center gap-2 rounded-full bg-page-product px-4 text-sm text-text-menu hover:text-text-strong disabled:cursor-default disabled:opacity-50 aria-pressed:bg-text-strong aria-pressed:font-semibold aria-pressed:text-page"
    >
      {children}
    </button>
  );
}
