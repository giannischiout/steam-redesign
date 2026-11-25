import { useEffect, useEffectEvent } from "react";

/** Control or Command with a letter, anywhere on the page. */
export function useShortcut(letter: string, onPress: () => void) {
  const handle = useEffectEvent(onPress);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const hasOnlyCommand = (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey;
      if (!hasOnlyCommand || event.key.toLowerCase() !== letter) return;
      event.preventDefault();
      if (!event.repeat) handle();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [letter]);
}
