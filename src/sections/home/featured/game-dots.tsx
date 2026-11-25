import type { Game } from "@/lib/catalog";

type GameDotsProps = {
  games: Pick<Game, "id" | "name">[];
  active: number;
  onSelect: (index: number) => void;
};

export function GameDots({ games, active, onSelect }: GameDotsProps) {
  return (
    <ul aria-label="Featured games" className="flex -mb-4 justify-center">
      {games.map((game, index) => (
        <li key={game.id} className="max-w-11 flex-1">
          <button
            type="button"
            aria-label={`Show ${game.name}`}
            aria-current={index === active || undefined}
            title={game.name}
            onClick={() => onSelect(index)}
            className="group grid h-11 w-full cursor-pointer place-content-center rounded-full"
          >
            <span className="size-2.5 rounded-full bg-text-quiet/60 group-hover:bg-text-strong group-aria-[current]:w-6 group-aria-[current]:bg-text-strong motion-safe:transition-[width]" />
          </button>
        </li>
      ))}
    </ul>
  );
}
