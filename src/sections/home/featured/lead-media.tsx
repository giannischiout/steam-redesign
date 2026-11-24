import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/catalog";
import type { Media } from "./media";
import { TopSellerBadge } from "./top-seller-badge";
import { Trailer } from "./trailer";

const sizes = "(min-width: 1280px) 60vw, 100vw";
const frame = "relative block aspect-video overflow-hidden rounded-media bg-media";

type LeadMediaProps = {
  game: Game;
  media: Media | undefined;
  nextGame: Game;
  number: number;
};

export function LeadMedia({ game, media, nextGame, number }: LeadMediaProps) {
  if (media?.kind === "trailer") {
    return (
      <div className={frame}>
        <Trailer key={media.hls} name={game.name} trailer={media} />
      </div>
    );
  }

  const src = media?.src ?? game.image;
  const nextShot = nextGame.shots[0];
  const rank = game.topSellerRank ? `, top seller number ${game.topSellerRank}` : "";

  return (
    <Link
      href={`/game/${game.id}`}
      aria-label={`Open ${game.name}, screenshot ${number}${rank}`}
      className={`group ${frame}`}
    >
      {/* Loaded ahead, so the change of game does not flash empty. */}
      {nextShot && (
        <Image src={nextShot} alt="" fill loading="eager" sizes={sizes} className="opacity-0" />
      )}
      <Image
        key={src}
        src={src}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes={sizes}
        className="fade-in object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
      />
      {game.topSellerRank && <TopSellerBadge rank={game.topSellerRank} />}
    </Link>
  );
}
