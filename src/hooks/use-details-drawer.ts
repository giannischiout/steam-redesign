import { useEffect, useState, type RefObject } from "react";
import { useEscape } from "./use-escape";

/** The drawer covers its own button, so the focus moves in, and back out on close. */
export function useDetailsDrawer(
  openRef: RefObject<HTMLButtonElement | null>,
  closeRef: RefObject<HTMLButtonElement | null>,
) {
  const [isOpen, setIsOpen] = useState(false);
  useEscape(() => setIsOpen(false));

  useEffect(() => {
    if (!isOpen) return;
    const openButton = openRef.current;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      const focused = document.activeElement;
      const isElsewhere = focused && focused !== document.body && !focused.closest("[data-details-drawer]");
      if (!isElsewhere) openButton?.focus({ preventScroll: true });
    };
  }, [isOpen, openRef, closeRef]);

  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}

export type DetailsDrawer = ReturnType<typeof useDetailsDrawer>;
