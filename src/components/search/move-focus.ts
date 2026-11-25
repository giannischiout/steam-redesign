import type { KeyboardEvent } from "react";

/** Down and up move between the search field and the links below it. */
export function moveFocus(event: KeyboardEvent<HTMLElement>) {
  const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
  if (!step) return;
  const stops = [...event.currentTarget.querySelectorAll<HTMLElement>("input, a")];
  const current = stops.findIndex((stop) => stop === document.activeElement);
  const next = stops[current + step];
  if (current === -1 || !next) return;
  event.preventDefault();
  next.focus();
}
