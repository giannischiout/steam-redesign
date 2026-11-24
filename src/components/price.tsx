import type { Game } from "@/lib/catalog";

type PriceProps = { game: Pick<Game, "price" | "was" | "discount"> };

export function Price({ game }: PriceProps) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      {game.was && (
        <span className="rounded bg-discount px-1.5 font-bold text-media">
          -{game.discount}%
        </span>
      )}
      <span className="text-text-strong">{game.price}</span>
      {game.was && (
        <s className="text-text-long">
          <span className="sr-only">Was </span>
          {game.was}
        </s>
      )}
    </span>
  );
}
