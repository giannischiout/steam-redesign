import Image from "next/image";
import Link from "next/link";
import type { FocusEvent, PointerEvent } from "react";
import type { Game } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { HoverVideo } from "./hover-video";
import { TopSellerBadge } from "./top-seller-badge";

const sizes = "(min-width: 1280px) 60vw, 100vw";

type LeadMediaProps = {
  game: Game;
  shot: string | undefined;
  nextGame: Game;
  number: number;
  isPlaying: boolean;
  onPlayingChange: (isPlaying: boolean) => void;
};

/** A picture. The trailer plays over it under the mouse, or with keyboard focus. */
export function LeadMedia({ game, shot, nextGame, number, isPlaying, onPlayingChange }: LeadMediaProps) {
  const src = shot ?? game.image;
  const nextShot = nextGame.shots[0];
  const rank = game.topSellerRank ? `, top seller number ${game.topSellerRank}` : "";

  function playForMouse(event: PointerEvent) {
    if (event.pointerType === "mouse" && !prefersReducedMotion()) onPlayingChange(true);
  }

  function playForKeyboard(event: FocusEvent) {
    if (event.target.matches(":focus-visible") && !prefersReducedMotion()) onPlayingChange(true);
  }

  return (
    <Link
      href={`/game/${game.id}`}
      aria-label={`Open ${game.name}, screenshot ${number}${rank}`}
      onPointerEnter={playForMouse}
      onPointerLeave={() => onPlayingChange(false)}
      onFocus={playForKeyboard}
      onBlur={() => onPlayingChange(false)}
      className="relative row-start-1 block aspect-video overflow-hidden rounded-media bg-media xl:col-start-1"
    >
      {/* Loaded ahead, so the change of game does not flash empty. */}
      {nextShot && <Image src={nextShot} alt="" fill loading="eager" sizes={sizes} className="opacity-0" />}
      <Image
        key={src}
        src={src}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes={sizes}
        className="fade-in object-cover"
      />
      {isPlaying && game.trailer && <HoverVideo key={game.trailer.loop} src={game.trailer.loop} />}
      {game.topSellerRank && <TopSellerBadge rank={game.topSellerRank} />}
    </Link>
  );
}
