import * as z from "zod/mini";
import { categories } from "@/data/categories";
import type { Game } from "@/lib/catalog";

export type BrowseGame = Pick<
  Game,
  | "id" | "name" | "image" | "genres" | "tags" | "developers" | "publishers" | "players" | "platforms"
  | "released" | "releasedAt" | "price" | "was" | "discount" | "cents" | "reviews"
> & { shot: string | undefined };

export const PRICES = ["any", "0", "5", "10", "20", "40"] as const;
export const REVIEWS = ["any", "70", "80", "95"] as const;
export const PLAYERS = ["Single-player", "Multi-player", "Co-op"] as const;
export const PLATFORMS = ["Windows", "macOS", "Linux"] as const;
export const SORTS = ["relevance", "reviews", "newest", "price", "discount", "name"] as const;

export type Price = (typeof PRICES)[number];
export type Reviews = (typeof REVIEWS)[number];
export type Sort = (typeof SORTS)[number];

/** Everything the page can be filtered by. It lives in the link. */
export type Filters = {
  q: string;
  category: string[];
  price: Price;
  players: string[];
  platform: string[];
  reviews: Reviews;
  sale: boolean;
  creator: string;
  sort: Sort;
};

export const noFilters: Filters = {
  q: "",
  category: [],
  price: "any",
  players: [],
  platform: [],
  reviews: "any",
  sale: false,
  creator: "",
  sort: "relevance",
};

const priceSchema = z.catch(z.enum(PRICES), "any");
const reviewsSchema = z.catch(z.enum(REVIEWS), "any");
const sortSchema = z.catch(z.enum(SORTS), "relevance");
const textSchema = z.catch(z.string().check(z.maxLength(80)), "");

type Params = { get: (name: string) => string | null };

/** Unknown values in a link are ignored, so an old or edited link still works. */
export function parseFilters(params: Params): Filters {
  const list = (name: string, allowed: readonly string[]) =>
    (params.get(name)?.split(",") ?? []).filter((value) => allowed.includes(value));

  return {
    q: textSchema.parse(params.get("q")),
    category: list("category", categories.map((category) => category.slug)),
    price: priceSchema.parse(params.get("price")),
    players: list("players", PLAYERS),
    platform: list("platform", PLATFORMS),
    reviews: reviewsSchema.parse(params.get("reviews")),
    sale: params.get("sale") === "1",
    creator: textSchema.parse(params.get("creator")),
    sort: sortSchema.parse(params.get("sort")),
  };
}

export function browseHref(filters: Partial<Filters>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      if (value.length) params.set(key, value.join(","));
    } else if (value === true) params.set(key, "1");
    else if (value && value !== "any" && value !== "relevance") params.set(key, String(value));
  }
  const query = params.toString().replaceAll("%2C", ",");
  return query ? `/browse?${query}` : "/browse";
}

function matches(game: BrowseGame, filters: Filters): boolean {
  const tags = categories.filter(({ slug }) => filters.category.includes(slug)).map(({ tag }) => tag);
  const isPriceOk =
    filters.price === "any" ||
    (filters.price === "0" ? game.cents === 0 : game.cents < Number(filters.price) * 100);

  return (
    isPriceOk &&
    game.name.toLowerCase().includes(filters.q.toLowerCase()) &&
    // Any ticked category will do. The other filters each narrow the results.
    (tags.length === 0 || tags.some((tag) => game.tags.includes(tag))) &&
    filters.players.every((mode) => game.players.includes(mode)) &&
    filters.platform.every((platform) => game.platforms.includes(platform)) &&
    (filters.reviews === "any" || (game.reviews?.percent ?? 0) >= Number(filters.reviews)) &&
    (!filters.sale || game.discount > 0) &&
    (!filters.creator || [...game.developers, ...game.publishers].includes(filters.creator))
  );
}

const sorters: Record<Sort, (a: BrowseGame, b: BrowseGame) => number> = {
  relevance: () => 0,
  reviews: (a, b) => (b.reviews?.percent ?? 0) - (a.reviews?.percent ?? 0),
  newest: (a, b) => b.releasedAt - a.releasedAt,
  price: (a, b) => a.cents - b.cents,
  discount: (a, b) => b.discount - a.discount,
  name: (a, b) => a.name.localeCompare(b.name),
};

export function filterGames(games: BrowseGame[], filters: Filters): BrowseGame[] {
  return games.filter((game) => matches(game, filters)).toSorted(sorters[filters.sort]);
}

/** How many games would be left with these filters. Shown beside each choice. */
export function countGames(games: BrowseGame[], filters: Filters): number {
  return games.filter((game) => matches(game, filters)).length;
}

export function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/** Only what the cards and the filters need goes to the browser. */
export function toBrowseGame(game: Game): BrowseGame {
  return {
    id: game.id,
    name: game.name,
    image: game.image,
    shot: game.shots[0],
    genres: game.genres,
    tags: game.tags.filter((tag) => categories.some((category) => category.tag === tag)),
    developers: game.developers,
    publishers: game.publishers,
    players: game.players,
    platforms: game.platforms,
    released: game.released,
    releasedAt: game.releasedAt,
    price: game.price,
    was: game.was,
    discount: game.discount,
    cents: game.cents,
    reviews: game.reviews,
  };
}
