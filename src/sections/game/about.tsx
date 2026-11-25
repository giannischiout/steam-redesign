import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { categories } from "@/data/categories";
import { browseHref } from "@/lib/browse";
import type { Game } from "@/lib/catalog";
import type { TextBlock } from "@/lib/game-details";
import { Description } from "./description";

const TAGS = 10;

/** Tags that are also a category are links. The rest are plain, so they do not look clickable. */
export function About({ game, blocks }: { game: Game; blocks: TextBlock[] }) {
  return (
    <section aria-labelledby="about-title">
      <SectionHeader id="about-title" title="About this game" />
      <div className="grid gap-4">
        <p className="max-w-[68ch] text-lg text-text-strong">{game.about || "No description yet."}</p>
        {blocks.length > 0 && <Description key={game.id} blocks={blocks} />}
        <ul aria-label="Tags" className="flex flex-wrap gap-2">
          {game.tags.slice(0, TAGS).map((tag) => {
            const category = categories.find((entry) => entry.tag === tag);
            return (
              <li key={tag}>
                {category ? (
                  <Link
                    href={browseHref({ category: [category.slug] })}
                    className="flex h-11 items-center rounded-thumb bg-page-product px-3 text-sm text-link hover:underline"
                  >
                    {tag}
                  </Link>
                ) : (
                  <span className="flex h-11 items-center rounded-thumb bg-text-strong/5 px-3 text-sm">{tag}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
