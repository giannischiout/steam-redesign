import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import type { Game } from "@/lib/catalog";

type LeadGameProps = { game: Game };

export function LeadGame({ game }: LeadGameProps) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group flex min-h-full flex-col overflow-hidden rounded-tile bg-page-product"
    >
      <span className="relative block aspect-video lg:aspect-auto lg:min-h-80 lg:flex-1">
        <Image
          src={game.shot ?? game.image}
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 65vw, 100vw"
          className="object-cover"
        />
      </span>
      <span className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4 md:p-5">
        <span className="text-2xl font-bold text-text-strong group-hover:underline">
          {game.name}
        </span>
        <span className="flex w-full flex-wrap items-center justify-between gap-4 md:ml-auto md:w-auto">
          <Price game={game} />
          <span className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-media">
            View game
          </span>
        </span>
      </span>
    </Link>
  );
}
