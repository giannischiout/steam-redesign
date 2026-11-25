import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/price";
import type { SearchGame } from "@/lib/search";

type SearchResultsProps = { results: SearchGame[]; query: string; onOpen: () => void };

export function SearchResults({ results, query, onOpen }: SearchResultsProps) {
  const count = results.length === 1 ? "1 game" : `${results.length} games`;

  return (
    <>
      <p role="status" className={results.length ? "sr-only" : "py-6 text-center"}>
        {results.length ? `${count} found` : `No games found for "${query}". Try a name or a category.`}
      </p>
      <ul className="grid gap-1">
        {results.map((game) => (
          <li key={game.id}>
            <Link
              href={`/game/${game.id}`}
              onClick={onOpen}
              className="flex items-center gap-4 rounded-media p-2 -outline-offset-2 hover:bg-page"
            >
              <span className="relative block aspect-[460/215] w-24 shrink-0 overflow-hidden rounded-thumb bg-page md:w-30">
                <Image src={game.image} alt="" fill sizes="120px" className="object-cover" />
              </span>
              <span className="grid min-w-0 flex-1 gap-1 md:flex md:items-center md:justify-between md:gap-4">
                <span className="truncate font-semibold text-text-strong">{game.name}</span>
                <span className="shrink-0">
                  <Price game={game} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
