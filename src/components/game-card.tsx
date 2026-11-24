import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import type { Game } from "@/lib/catalog";

type GameCardProps = { game: Game };

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="group grid gap-2 rounded-tile">
      <span className="relative block aspect-[460/215] overflow-hidden rounded-tile bg-page-product">
        <Image
          src={game.image}
          alt=""
          fill
          sizes="(min-width: 768px) 22vw, 50vw"
          className="object-cover"
        />
      </span>
      <span className="text-sm font-bold text-text-strong group-hover:underline">
        {game.name}
      </span>
      <Price game={game} />
    </Link>
  );
}
