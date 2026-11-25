import { useEffect, useEffectEvent } from "react";

/** Runs wherever the focus is, so it also works for something shown by the mouse. */
export function useEscape(onEscape: () => void) {
  const handle = useEffectEvent(onEscape);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handle();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
}
