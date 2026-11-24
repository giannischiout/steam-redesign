import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import { getList } from "@/lib/catalog";
import { Panel } from "./panel";

export function WishlistPanel() {
  return (
    <Panel id="wishlist-title" title="Your wishlist on sale" href="/wishlist">
      {getList("wishlist").map((game) => (
        <li key={game.id}>
          <Link href={`/game/${game.id}`} className="group flex items-center gap-4 rounded-thumb">
            <span className="relative block h-14 w-30 shrink-0 overflow-hidden rounded-thumb">
              <Image src={game.image} alt="" fill sizes="120px" className="object-cover" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="font-semibold text-text-strong group-hover:underline">{game.name}</span>
              <Price game={game} />
            </span>
          </Link>
        </li>
      ))}
    </Panel>
  );
}
