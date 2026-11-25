import { useId } from "react";
import { cn } from "@/lib/cn";

type Choice<Value extends string> = { key: Value; label: string; detail?: string; className?: string };

type ChoiceListProps<Value extends string> = {
  legend: string;
  options: Choice<Value>[];
  value: Value;
  onChange: (value: Value) => void;
};

/** One choice out of a few, as rows of radio buttons. */
export function ChoiceList<Value extends string>({ legend, options, value, onChange }: ChoiceListProps<Value>) {
  const name = useId();

  return (
    <fieldset>
      <legend className="mb-2 font-bold text-text-strong">{legend}</legend>
      <div className="grid gap-1.5">
        {options.map((option) => (
          <label
            key={option.key}
            className={cn(
              option.className,
              "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl bg-text-strong/5 px-3 py-2 has-checked:ring-2 has-checked:ring-accent has-checked:ring-inset has-focus-visible:outline-2 has-focus-visible:outline-text-strong",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.key}
              checked={value === option.key}
              onChange={() => onChange(option.key)}
              className="size-4 shrink-0 accent-accent"
            />
            <span className="grid">
              <span className="font-semibold text-text-strong">{option.label}</span>
              {option.detail && <span className="text-sm text-text-long">{option.detail}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
