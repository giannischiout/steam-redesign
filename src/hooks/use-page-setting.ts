import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type PageSetting<Value extends string> = {
  /** Used for both the `data-*` attribute on <html> and the storage key. */
  key: string;
  fallback: Value;
  parse: (raw: unknown) => Value;
};

/** A visitor's choice, kept on <html> and saved in this browser. */
export function usePageSetting<Value extends string>({ key, fallback, parse }: PageSetting<Value>) {
  const value = useSyncExternalStore(
    subscribe,
    () => parse(document.documentElement.dataset[key]),
    () => fallback,
  );

  function setValue(next: Value) {
    document.documentElement.dataset[key] = next;
    try {
      localStorage.setItem(key, next);
    } catch {
      // Storage is blocked: the choice still applies until the page reloads.
    }
    listeners.forEach((listener) => listener());
  }

  return [value, setValue] as const;
}
