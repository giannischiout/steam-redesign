import { getList, type Game } from "@/lib/catalog";

export type QueueGame = Pick<Game, "id" | "image">;

/** Top sellers, new and recommended games, each once, split over two lines. */
export function getQueueLines(): [QueueGame[], QueueGame[]] {
  const all = [...getList("top-sellers"), ...getList("new"), ...getList("for-you")];
  const unique = [...new Map(all.map((game) => [game.id, { id: game.id, image: game.image }])).values()];
  return [unique.filter((_, index) => index % 2 === 0), unique.filter((_, index) => index % 2 === 1)];
}
