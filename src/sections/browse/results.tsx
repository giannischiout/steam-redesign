import { useState } from "react";
import { GameCard } from "@/components/game-card";
import type { BrowseGame } from "@/lib/browse";

type ResultsProps = { games: BrowseGame[]; onClear: () => void };

const PAGE = 24;

export function Results({ games, onClear }: ResultsProps) {
  const [shown, setShown] = useState(PAGE);

  if (games.length === 0) {
    return (
      <div className="grid justify-items-start gap-3 rounded-tile bg-page-product p-6">
        <p>No games fit all of these filters.</p>
        <button type="button" onClick={onClear} className="h-11 cursor-pointer text-link hover:underline">
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 filters-side:lg:grid-cols-3 filters-side:2xl:grid-cols-4">
        {games.slice(0, shown).map((game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
      {shown < games.length && (
        <button
          type="button"
          onClick={() => setShown(shown + PAGE)}
          className="mt-4 h-11 cursor-pointer justify-self-center rounded-full bg-page-product px-6 text-text-menu hover:text-text-strong"
        >
          Show {Math.min(PAGE, games.length - shown)} more
        </button>
      )}
    </>
  );
}
