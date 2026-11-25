"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { useSearchOpen } from "@/hooks/use-search-open";
import { useShortcut } from "@/hooks/use-shortcut";
import type { SearchGame } from "@/lib/search";
import { SearchPanel } from "./search-panel";

type SearchDialogProps = { games: SearchGame[]; popular: SearchGame[] };

/** The browser's own modal: it keeps the focus inside, closes on Escape and gives the focus back. */
export function SearchDialog({ games, popular }: SearchDialogProps) {
  const { open, setOpen } = useSearchOpen();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useShortcut("k", () => setOpen(!open));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  function closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) setOpen(false);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the store"
      onClose={() => setOpen(false)}
      onClick={closeOnBackdrop}
      className="search-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-tile border border-text-quiet/25 bg-page-product text-text shadow-2xl shadow-media backdrop:bg-page/40 backdrop:backdrop-blur-md"
    >
      {open && <SearchPanel games={games} popular={popular} onClose={() => setOpen(false)} />}
    </dialog>
  );
}
