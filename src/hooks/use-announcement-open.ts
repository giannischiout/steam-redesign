import { useSyncExternalStore } from "react";

let isOpen = true;
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

/** Shared by the banner and its button in the top bar. Comes back on reload. */
export function useAnnouncementOpen() {
  const open = useSyncExternalStore(subscribe, () => isOpen, () => true);
  return { open, setOpen };
}
