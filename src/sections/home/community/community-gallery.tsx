"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { useWishlist } from "@/hooks/use-wishlist";
import { CommunityDetails } from "./community-details";
import { CommunityMedia } from "./community-media";
import type { Pick } from "./pick";

type CommunityGalleryProps = { picks: Pick[] };

const round =
  "grid size-11 cursor-pointer place-content-center rounded-full bg-page-product text-text-menu hover:text-text-strong";

/** One recommendation at a time. It never changes by itself. */
export function CommunityGallery({ picks }: CommunityGalleryProps) {
  const [index, setIndex] = useState(0);
  const wishlist = useWishlist([]);
  const pick = picks[index];
  if (!pick) return null;

  const { game } = pick;
  const step = (by: number) => setIndex((index + by + picks.length) % picks.length);

  return (
    <section aria-labelledby="community-title">
      <SectionHeader id="community-title" title="The community recommends">
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" aria-label="Previous recommendation" onClick={() => step(-1)} className={round}>
            <IconChevronLeft aria-hidden="true" size={20} />
          </button>
          <span aria-hidden="true" className="min-w-10 text-center text-sm tabular-nums">
            {index + 1} / {picks.length}
          </span>
          <button type="button" aria-label="Next recommendation" onClick={() => step(1)} className={round}>
            <IconChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </SectionHeader>
      <div
        aria-live="polite"
        className="grid gap-4 rounded-tile bg-page-product p-2 md:p-4 lg:grid-cols-2 lg:gap-6 lg:max-xl:min-h-[31.5rem] xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      >
        <CommunityMedia game={game} />
        <CommunityDetails pick={pick} isSaved={wishlist.has(game.id)} onToggleSaved={() => wishlist.toggle(game.id)} />
      </div>
    </section>
  );
}
