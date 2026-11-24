import { useSyncExternalStore } from "react";
import { defaultFont, fontSchema, fontStorageKey, type FontKey } from "@/lib/font-setting";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): FontKey {
  const parsed = fontSchema.safeParse(document.documentElement.dataset.font);
  return parsed.success ? parsed.data : defaultFont;
}

function setFont(font: FontKey) {
  document.documentElement.dataset.font = font;
  try {
    localStorage.setItem(fontStorageKey, font);
  } catch {
    // Storage is blocked: the choice still applies until the page reloads.
  }
  listeners.forEach((listener) => listener());
}

export function useFontSetting() {
  const font = useSyncExternalStore(subscribe, getSnapshot, () => defaultFont);
  return { font, setFont };
}
