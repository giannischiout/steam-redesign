import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { categories } from "@/data/categories";
import { browseHref } from "@/lib/browse";
import { getGame } from "@/lib/catalog";
import { CategoryCarousel } from "./category-carousel";

export function Categories() {
  return (
    <section aria-labelledby="categories-title">
      <SectionHeader id="categories-title" title="Browse by category">
        <Link href={browseHref({})} aria-label="See all games" className="flex min-h-11 min-w-11 shrink-0 items-center justify-end text-sm text-link hover:underline">
          See all
        </Link>
      </SectionHeader>
      <CategoryCarousel label="Categories">
        {categories.map((category) => {
          const game = getGame(category.posterId);
          return (
            <li key={category.slug} className="w-36 shrink-0 first:ml-4 last:mr-4 md:w-44 md:first:ml-0 md:last:mr-0">
              <Link
                href={browseHref({ category: [category.slug] })}
                draggable={false}
                className="group grid gap-2 rounded-tile -outline-offset-2 select-none"
              >
                <span className="relative block aspect-[2/3] overflow-hidden rounded-tile bg-page-product">
                  {game && (
                    <Image
                      src={game.poster}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 176px, 144px"
                      className="object-cover group-hover:brightness-110"
                    />
                  )}
                </span>
                <span className="font-semibold text-text-strong group-hover:underline">{category.name}</span>
              </Link>
            </li>
          );
        })}
      </CategoryCarousel>
    </section>
  );
}
