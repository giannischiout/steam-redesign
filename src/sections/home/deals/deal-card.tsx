import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import type { Game } from "@/lib/catalog";

export function DealCard({ label, game }: { label: string; game: Game }) {
  return (
    <li className="grid">
      <Link href={`/game/${game.id}`} className="group flex flex-col gap-2 rounded-tile bg-page-product p-2">
        <span className="relative block aspect-[460/215] overflow-hidden rounded-media bg-media">
          <Image src={game.image} alt="" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover group-hover:brightness-110" />
        </span>
        <span className="grid flex-1 content-between gap-2 px-1 pb-1">
          <span className="grid">
            <span className="text-sm text-text-long">{label}</span>
            <span className="font-semibold text-text-strong group-hover:underline">{game.name}</span>
          </span>
          <Price game={game} />
        </span>
      </Link>
    </li>
  );
}
