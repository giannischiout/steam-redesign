import type { Game } from "./catalog";

/** A game's first tags say the most about it. */
const TAGS_COMPARED = 10;

/** The games sharing the most tags with this one, best first. */
export function similarGames(game: Game, others: Game[], limit: number): Game[] {
  const tags = new Set(game.tags.slice(0, TAGS_COMPARED));
  return others
    .filter((other) => other.id !== game.id)
    .map((other) => ({ other, shared: other.tags.slice(0, TAGS_COMPARED).filter((tag) => tags.has(tag)).length }))
    .filter(({ shared }) => shared > 1)
    .toSorted((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ other }) => other);
}
