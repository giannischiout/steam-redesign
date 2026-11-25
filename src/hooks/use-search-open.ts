import { useSyncExternalStore } from "react";

let isOpen = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setOpen(next: boolean) {
  isOpen = next;
  listeners.forEach((listener) => listener());
}

/** Shared by the search buttons in the top bar and the search window. */
export function useSearchOpen() {
  const open = useSyncExternalStore(subscribe, () => isOpen, () => false);
  return { open, setOpen };
}
