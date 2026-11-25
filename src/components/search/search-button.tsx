"use client";

import { IconSearch } from "@tabler/icons-react";
import { ShortcutKeys } from "@/components/shortcut-keys";
import { useSearchOpen } from "@/hooks/use-search-open";
import { cn } from "@/lib/cn";

type SearchButtonProps = { variant: "field" | "icon"; className?: string };

export function SearchButton({ variant, className }: SearchButtonProps) {
  const { setOpen } = useSearchOpen();
  const isField = variant === "field";

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-keyshortcuts="Control+K Meta+K"
      aria-label={isField ? undefined : "Search the store"}
      onClick={() => setOpen(true)}
      className={cn("cursor-pointer", className)}
    >
      <IconSearch aria-hidden="true" size={20} className="shrink-0" />
      {isField && (
        <>
          <span className="truncate">Search the store</span>
          <ShortcutKeys letter="k" className="mr-1.5 ml-auto" />
        </>
      )}
    </button>
  );
}
