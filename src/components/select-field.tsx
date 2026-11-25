import { IconChevronDown } from "@tabler/icons-react";

type SelectFieldProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

/** The browser's own select, so phones get their own picker. */
export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <span className="relative flex items-center">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 cursor-pointer appearance-none rounded-full bg-page-product pr-10 pl-4 text-sm text-text-menu hover:text-text-strong"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IconChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute right-4" />
    </span>
  );
}
