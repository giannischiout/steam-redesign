import { z } from "zod";
import data from "@/data/games.json";

const gameSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.url(),
  shot: z.url().nullable(),
  price: z.string(),
  was: z.string().nullable(),
  discount: z.number(),
});

const listKeys = ["featured", "for-you", "deals", "new", "top-sellers"] as const;

const catalogSchema = z.object({
  games: z.array(gameSchema),
  lists: z.record(z.enum(listKeys), z.array(z.number())),
});

export type Game = z.infer<typeof gameSchema>;
type ListKey = (typeof listKeys)[number];

const catalog = catalogSchema.parse(data);
const byId = new Map(catalog.games.map((game) => [game.id, game]));

export function getList(key: ListKey): Game[] {
  return catalog.lists[key].flatMap((id) => byId.get(id) ?? []);
}
