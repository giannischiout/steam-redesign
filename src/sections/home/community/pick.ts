import type { Game } from "@/lib/catalog";

/** One player's recommendation, with only the game fields the card shows. */
export type Pick = {
  player: string;
  hours: number;
  quote: string;
  game: globalThis.Pick<
    Game,
    "id" | "name" | "about" | "developers" | "released" | "reviews" | "tags" | "platforms" | "shots" | "price" | "was" | "discount"
  >;
};
