import { IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import { browseHref } from "@/lib/browse";
import type { Game } from "@/lib/catalog";

type CreatorPanelProps = { name: string; reason: string; isFollowed: boolean; games: Game[] };

const MAX_OTHERS = 2;

/** The newest game as a wide picture, the others as short rows. */
export function CreatorPanel({ name, reason, isFollowed, games }: CreatorPanelProps) {
  const [lead, ...others] = games;
  if (!lead) return null;

  return (
    <li className="flex flex-col gap-4 rounded-tile bg-page-product p-3 md:p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-0.5">
          <h3 className="text-lg font-bold text-text-strong">{name}</h3>
          <p className="flex items-center gap-1.5 text-sm text-text-long">
            {isFollowed && <IconHeartFilled aria-hidden="true" size={14} className="shrink-0" />}
            {reason}
          </p>
        </div>
        <Link
          href={browseHref({ creator: name })}
          aria-label={`See all from ${name}`}
          className="-my-2 flex min-h-11 min-w-11 shrink-0 items-center justify-end text-sm text-link hover:underline"
        >
          See all
        </Link>
      </div>
      <Link href={`/game/${lead.id}`} className="group grid gap-2 rounded-media">
        <span className="relative block aspect-video overflow-hidden rounded-media bg-media">
          <Image
            src={lead.shots[0] ?? lead.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover"
          />
        </span>
        <span className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <span className="font-semibold text-text-strong group-hover:underline">{lead.name}</span>
          <Price game={lead} />
        </span>
      </Link>
      <ul className="grid gap-3">
        {others.slice(0, MAX_OTHERS).map((game) => (
          <li key={game.id}>
            <Link href={`/game/${game.id}`} className="group flex items-center gap-3 rounded-thumb">
              <span className="relative block aspect-[460/215] w-24 shrink-0 overflow-hidden rounded-thumb">
                <Image src={game.image} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="grid min-w-0 gap-0.5">
                <span className="truncate text-sm font-semibold text-text-strong group-hover:underline">{game.name}</span>
                <Price game={game} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
