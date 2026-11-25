"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { SectionTitle } from "@/components/section-title";
import { useDetailsDrawer } from "@/hooks/use-details-drawer";
import { useWishlist } from "@/hooks/use-wishlist";
import type { Game } from "@/lib/catalog";
import { DetailsDrawer } from "./details-drawer";
import { GameDots } from "./game-dots";
import { LeadBar } from "./lead-bar";
import { LeadInfo } from "./lead-info";
import { LeadMedia } from "./lead-media";
import { LeadText } from "./lead-text";
import { MediaPicker } from "./media-picker";
import { NextGame } from "./next-game";

const MAX_SHOTS = 4;

type FeaturedRotatorProps = { games: Game[]; wishlistIds: number[]; aside: ReactNode };

/** One game at a time. The next one loads in at the bottom of the right column. */
export function FeaturedRotator({ games, wishlistIds, aside }: FeaturedRotatorProps) {
  const [index, setIndex] = useState(0);
  const [shotIndex, setShotIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const wishlist = useWishlist(wishlistIds);
  const drawerId = useId();
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawer = useDetailsDrawer(openRef, closeRef);
  const game = games[index];
  const nextIndex = (index + 1) % games.length;
  const nextGame = games[nextIndex];
  if (!game || !nextGame) return null;

  const shots = game.shots.slice(0, MAX_SHOTS);

  function showGame(position: number) {
    setIndex(position);
    setShotIndex(0);
    setIsPlaying(false);
    drawer.close();
  }

  function pickShot(picked: number) {
    setShotIndex(picked);
    setIsPaused(true);
    drawer.close();
  }

  // One column below xl. From xl, the name and pictures take exactly the height of the main image.
  return (
    <section
      aria-labelledby="featured-title"
      data-paused={isPaused || isPlaying || drawer.isOpen || undefined}
      className="rotator"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 md:mb-4">
        <SectionTitle id="featured-title">Featured and recommended</SectionTitle>
        {/* Taller than the title: pulled in so the spacing matches the other sections. */}
        <div className="sm:-my-3">{aside}</div>
      </div>
      <div className="relative grid grid-cols-[minmax(0,1fr)] gap-3 rounded-tile bg-page-product p-2 md:gap-4 md:p-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:grid-rows-[auto_auto_1fr] xl:gap-x-6">
        <LeadMedia
          game={game}
          shot={shots[shotIndex]}
          nextGame={nextGame}
          number={shotIndex + 1}
          isPlaying={isPlaying}
          onPlayingChange={setIsPlaying}
        />
        <LeadText
          game={game}
          drawerId={drawerId}
          isOpen={drawer.isOpen}
          buttonRef={openRef}
          onOpen={drawer.open}
        />
        <DetailsDrawer id={drawerId} game={game} drawer={drawer} closeRef={closeRef} />
        <LeadBar
          game={game}
          isSaved={wishlist.has(game.id)}
          onToggleSaved={() => wishlist.toggle(game.id)}
        />
        <div className="contents xl:col-start-2 xl:row-start-1 xl:flex xl:flex-col xl:gap-4">
          <LeadInfo game={game} />
          <MediaPicker name={game.name} shots={shots} active={shotIndex} onSelect={pickShot} />
        </div>
        <NextGame
          game={nextGame}
          position={nextIndex + 1}
          total={games.length}
          isPaused={isPaused}
          onNext={() => showGame(nextIndex)}
          onTogglePause={() => setIsPaused(!isPaused)}
        />
      </div>
      <GameDots games={games} active={index} onSelect={showGame} />
    </section>
  );
}
