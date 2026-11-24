import type { Game } from "@/lib/catalog";
import { cn } from "@/lib/cn";

type PriceProps = {
  game: Pick<Game, "price" | "was" | "discount">;
  size?: "normal" | "large";
};

export function Price({ game, size = "normal" }: PriceProps) {
  return (
    <span
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1",
        size === "large" ? "text-base md:text-xl" : "text-sm",
      )}
    >
      {game.was && (
        <span className="rounded bg-discount-badge px-1.5 font-semibold text-discount-product-text">
          -{game.discount}%
        </span>
      )}
      <span className="font-semibold text-text-strong">{game.price}</span>
      {game.was && (
        <s className="text-text-long">
          <span className="sr-only">Was </span>
          {game.was}
        </s>
      )}
    </span>
  );
}
