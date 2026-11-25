"use client";

import { IconAdjustmentsFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { GameCard, type CardGame } from "@/components/game-card";
import { SectionTitle } from "@/components/section-title";
import { browseHref, filterGames, noFilters, type Filters } from "@/lib/browse";
import { QuickFilters } from "./quick-filters";
import { Tabs } from "@/components/tabs";

type GameTabsProps = { lists: { key: string; label: string; games: CardGame[] }[] };

const SHOWN = 8;

/** Quick filters work on the open tab. "All filters" takes them along to the browse page. */
export function GameTabs({ lists }: GameTabsProps) {
  const [filters, setFilters] = useState<Filters>(noFilters);
  const href = browseHref(filters);

  const tabs = lists.map(({ key, label, games }) => {
    const shown = filterGames(games, filters).slice(0, SHOWN);
    return {
      key,
      label,
      panel: shown.length ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-6">
          {shown.map((game) => (
            <li key={game.id}>
              <GameCard game={game} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-tile bg-page-product p-6">
          Nothing in this list fits.{" "}
          <Link href={href} className="text-link hover:underline">
            Look in all games
          </Link>
        </p>
      ),
    };
  });

  return (
    <section aria-labelledby="games-title" className="grid gap-3 md:gap-4">
      <SectionTitle id="games-title">Browse games</SectionTitle>
      <Tabs
        label="Games"
        tabs={tabs}
        aside={
          <div className="flex flex-wrap items-center gap-2">
            <QuickFilters filters={filters} onChange={(changes) => setFilters({ ...filters, ...changes })} />
            <Link
              href={href}
              className="flex h-11 items-center gap-2 rounded-full px-3 text-sm text-link hover:underline"
            >
              <IconAdjustmentsFilled aria-hidden="true" size={18} />
              All filters
            </Link>
          </div>
        }
      />
    </section>
  );
}
