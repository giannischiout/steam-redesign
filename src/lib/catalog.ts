import { z } from "zod";
import data from "@/data/games.json";

const gameSchema = z.object({
  id: z.number(),
  name: z.string(),
  about: z.string(),
  genres: z.array(z.string()),
  tags: z.array(z.string()),
  developers: z.array(z.string()),
  publishers: z.array(z.string()),
  players: z.array(z.string()),
  platforms: z.array(z.string()),
  released: z.string(),
  releasedAt: z.number(),
  image: z.url(),
  poster: z.url(),
  shots: z.array(z.url()),
  trailer: z.object({ hls: z.url(), loop: z.url() }).nullable(),
  price: z.string(),
  cents: z.number(),
  was: z.string().nullable(),
  discount: z.number(),
  reviews: z
    .object({ label: z.string(), total: z.number(), percent: z.number() })
    .nullable(),
  topSellerRank: z.number().nullable(),
});

const listKeys = ["featured", "for-you", "deals", "new", "top-sellers", "wishlist"] as const;

const catalogSchema = z.object({
  games: z.array(gameSchema),
  lists: z.record(z.enum(listKeys), z.array(z.number())),
});

export type Game = z.infer<typeof gameSchema>;
type ListKey = (typeof listKeys)[number];

const catalog = catalogSchema.parse(data);
const byId = new Map(catalog.games.map((game) => [game.id, game]));

export function getGame(id: number): Game | undefined {
  return byId.get(id);
}

export function getAllGames(): Game[] {
  return catalog.games;
}

/** A studio's games as developer or publisher, newest first. */
export function getGamesBy(creator: string): Game[] {
  return catalog.games
    .filter((game) => game.developers.includes(creator) || game.publishers.includes(creator))
    .toSorted((a, b) => b.releasedAt - a.releasedAt);
}

export function getList(key: ListKey): Game[] {
  return catalog.lists[key].flatMap((id) => byId.get(id) ?? []);
}
