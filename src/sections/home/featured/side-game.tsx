import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import type { Game } from "@/lib/catalog";

type SideGameProps = { game: Game };

export function SideGame({ game }: SideGameProps) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group flex h-full items-center gap-4 rounded-tile"
    >
      <span className="relative block aspect-[460/215] w-1/2 shrink-0 overflow-hidden rounded-tile bg-page-product">
        <Image
          src={game.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 16vw, 50vw"
          className="object-cover"
        />
      </span>
      <span className="grid min-w-0 gap-1">
        <span className="text-sm font-bold text-text-strong group-hover:underline">
          {game.name}
        </span>
        <Price game={game} />
      </span>
    </Link>
  );
}
