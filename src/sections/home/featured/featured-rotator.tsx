"use client";

import { useState } from "react";
import { Price } from "@/components/price";
import type { Game } from "@/lib/catalog";
import { LeadInfo } from "./lead-info";
import { LeadMedia } from "./lead-media";
import { getMedia } from "./media";
import { MediaPicker } from "./media-picker";
import { NextGame } from "./next-game";

type FeaturedRotatorProps = { games: Game[] };

/** One game at a time. The next one loads in at the bottom of the right column. */
export function FeaturedRotator({ games }: FeaturedRotatorProps) {
  const [index, setIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const game = games[index];
  const nextIndex = (index + 1) % games.length;
  const nextGame = games[nextIndex];
  if (!game || !nextGame) return null;

  const media = getMedia(game);

  function showNext() {
    setIndex(nextIndex);
    setMediaIndex(0);
  }

  function pickMedia(picked: number) {
    setMediaIndex(picked);
    setIsPaused(true);
  }

  // Below xl the two columns dissolve, so the name can come before the price.
  return (
    <section
      aria-label="Featured"
      data-paused={isPaused || undefined}
      className="rotator flex flex-col gap-3 rounded-tile bg-page-product p-2 md:p-3 xl:grid xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
    >
      <div className="contents xl:flex xl:flex-col xl:gap-3">
        <LeadMedia game={game} media={media[mediaIndex]} nextGame={nextGame} number={mediaIndex + 1} />
        <div className="order-2 flex md:justify-end xl:order-none">
          <Price game={game} size="large" />
        </div>
      </div>
      <div className="contents xl:flex xl:flex-col xl:gap-3">
        <LeadInfo game={game} />
        <MediaPicker game={game} media={media} active={mediaIndex} onSelect={pickMedia} />
        <NextGame
          game={nextGame}
          position={nextIndex + 1}
          total={games.length}
          isPaused={isPaused}
          onNext={showNext}
          onTogglePause={() => setIsPaused(!isPaused)}
        />
      </div>
    </section>
  );
}
