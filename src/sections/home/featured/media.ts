import type { Game } from "@/lib/catalog";

export type Media =
  | { kind: "shot"; src: string }
  | { kind: "trailer"; src: string; hls: string; mp4: string };

const MAX_MEDIA = 4;

/** A screenshot first, then the trailer, then more screenshots. */
export function getMedia(game: Game): Media[] {
  const shots = game.shots.map((src): Media => ({ kind: "shot", src }));
  const [first, ...rest] = shots;
  const trailer: Media[] = game.trailer
    ? [{ kind: "trailer", src: game.trailer.poster, hls: game.trailer.hls, mp4: game.trailer.mp4 }]
    : [];
  return [...(first ? [first] : []), ...trailer, ...rest].slice(0, MAX_MEDIA);
}
