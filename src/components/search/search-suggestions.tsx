import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/categories";
import { browseHref } from "@/lib/browse";
import type { SearchGame } from "@/lib/search";

type SearchSuggestionsProps = { popular: SearchGame[]; categories: Category[]; onOpen: () => void };

const heading = "mb-3 font-bold text-text-strong";

export function SearchSuggestions({ popular, categories, onOpen }: SearchSuggestionsProps) {
  return (
    <div className="grid gap-6">
      <section aria-labelledby="popular-searches">
        <h2 id="popular-searches" className={heading}>
          Popular searches
        </h2>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-4">
          {popular.map((game) => (
            <li key={game.id} className="max-md:nth-[n+5]:hidden">
              <Link href={`/game/${game.id}`} onClick={onOpen} className="group grid gap-1.5 rounded-media">
                <span className="relative block aspect-[460/215] overflow-hidden rounded-media bg-page">
                  <Image
                    src={game.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 180px, 45vw"
                    className="object-cover"
                  />
                </span>
                <span className="truncate text-sm font-semibold text-text-strong group-hover:underline">
                  {game.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="favorite-categories">
        <h2 id="favorite-categories" className={heading}>
          Your favorite categories
        </h2>
        <ul className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={browseHref({ category: [category.slug] })}
                onClick={onOpen}
                className="flex h-11 items-center rounded-full bg-page px-4 text-sm text-text-menu hover:text-text-strong"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
