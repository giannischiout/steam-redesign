import type { Category } from "@/data/categories";
import type { Game } from "@/lib/catalog";

export type SearchGame = Pick<Game, "id" | "name" | "image" | "tags" | "price" | "was" | "discount">;

const MAX_RESULTS = 6;

/** Only what the search window shows goes to the browser. */
export function toSearchGame({ id, name, image, tags, price, was, discount }: Game): SearchGame {
  return { id, name, image, tags: tags.slice(0, 10), price, was, discount };
}

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .toLowerCase()
    .trim();
}

/** Games whose name matches come first, then those with a matching tag or category. */
export function searchGames(games: SearchGame[], categories: Category[], query: string): SearchGame[] {
  const term = normalize(query);
  if (!term) return [];
  const categoryTags = categories
    .filter((category) => normalize(category.name).includes(term))
    .map((category) => category.tag);
  const byName = games.filter((game) => normalize(game.name).includes(term));
  const byTag = games.filter(
    (game) =>
      !byName.includes(game) &&
      game.tags.some((tag) => categoryTags.includes(tag) || normalize(tag).includes(term)),
  );
  return [...byName, ...byTag].slice(0, MAX_RESULTS);
}
