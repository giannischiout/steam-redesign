import type { ReactNode } from "react";
import { GameCount } from "./game-count";

type ResultsBarProps = { count: number; children: ReactNode };

/** Above the games with the sidebar, and on narrow screens: the count, then the menus. */
export function ResultsBar({ count, children }: ResultsBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 lg:hidden filters-side:lg:flex">
      <GameCount count={count} />
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
