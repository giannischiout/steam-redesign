// Saves popular games that are not out yet to src/data/upcoming.json, without touching games.json.
// Run by hand: node scripts/fetch-upcoming.mjs
import { writeFile } from "node:fs/promises";
import { getItems, getTagNames, search, toGame } from "./steam.mjs";

const SHOWN = 16;

const tagNames = await getTagNames();
const ids = await search("filter=popularcomingsoon");
const items = [];
for (let start = 0; start < ids.length; start += 30) items.push(...(await getItems(ids.slice(start, start + 30))));

const now = Date.now() / 1000;
const byId = new Map(items.map((item) => [item.appid, item]));
const games = ids
  .map((id) => byId.get(id))
  .filter((item) => item?.release?.is_coming_soon)
  .map((item) => toGame(item, tagNames, [], { isUpcoming: true }))
  .filter((game) => game && game.shots.length > 0 && (!game.releasedAt || game.releasedAt > now))
  .slice(0, SHOWN);

await writeFile(
  "src/data/upcoming.json",
  JSON.stringify({ fetchedOn: new Date().toISOString().slice(0, 10), games }, null, 1) + "\n",
);
console.log(games.map((game) => `${game.name} | ${game.released} | ${game.price}`).join("\n"));
