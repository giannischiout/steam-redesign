import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import { ReviewSummary } from "@/components/review-summary";
import type { BrowseGame } from "@/lib/browse";
import { formatFacts } from "@/lib/format";

type GameCardProps = {
  game: Pick<
    BrowseGame,
    "id" | "name" | "image" | "shot" | "genres" | "released" | "reviews" | "price" | "was" | "discount"
  >;
};

const sizes = "(min-width: 1024px) 22vw, 50vw";

/** Hover or focus shows a screenshot in place of the cover. */
export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="group grid gap-1.5 rounded-tile">
      <span className="relative mb-1 block aspect-[460/215] overflow-hidden rounded-tile bg-page-product">
        <Image src={game.image} alt="" fill sizes={sizes} className="object-cover" />
        {game.shot && (
          <Image
            src={game.shot}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity"
          />
        )}
      </span>
      <span className="font-semibold text-text-strong group-hover:underline">{game.name}</span>
      <span className="text-sm text-text-long">{formatFacts(game.genres.slice(0, 1), game.released)}</span>
      <ReviewSummary reviews={game.reviews} />
      <Price game={game} />
    </Link>
  );
}
