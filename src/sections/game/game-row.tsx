import Link from "next/link";
import { GameCard } from "@/components/game-card";
import { SectionHeader } from "@/components/section-header";
import { toBrowseGame } from "@/lib/browse";
import type { Game } from "@/lib/catalog";

type GameRowProps = { id: string; title: string; games: Game[]; href?: string };

export function GameRow({ id, title, games, href }: GameRowProps) {
  return (
    <section aria-labelledby={id}>
      <SectionHeader id={id} title={title}>
        {href && (
          <Link
            href={href}
            aria-label={`See all, ${title}`}
            className="flex min-h-11 min-w-11 items-center justify-end text-sm text-link hover:underline"
          >
            See all
          </Link>
        )}
      </SectionHeader>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-6">
        {games.map((game) => (
          <li key={game.id}>
            <GameCard game={toBrowseGame(game)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
