"use client";

import { useId } from "react";
import { useFontSetting } from "@/hooks/use-font-setting";
import { cn } from "@/lib/cn";
import { fontOptions } from "@/lib/font-setting";

export function FontPicker() {
  const { font, setFont } = useFontSetting();
  // The floating panel has its own font choices, so the radio group needs its own name.
  const name = useId();

  return (
    <fieldset>
      <legend className="mb-4 text-lg font-bold text-text-strong">Font</legend>
      <div className="grid gap-4 md:grid-cols-3">
        {fontOptions.map((option) => (
          <label
            key={option.key}
            className={cn(
              option.className,
              "grid cursor-pointer gap-2 rounded-tile bg-page-product p-5 has-checked:ring-2 has-checked:ring-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-text-strong",
            )}
          >
            <span className="flex items-center gap-3 font-semibold text-text-strong">
              <input
                type="radio"
                name={name}
                value={option.key}
                checked={font === option.key}
                onChange={() => setFont(option.key)}
                className="size-4 accent-accent"
              />
              {option.label}
            </span>
            <span className="text-2xl font-bold text-text-strong">Baldur&apos;s Gate 3</span>
            <span className="text-sm">Overwhelmingly Positive, 41,99€</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
