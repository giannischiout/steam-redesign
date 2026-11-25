// Saves a snapshot of public Steam store data (euro prices, Germany) to src/data/games.json.
// Run by hand: node scripts/fetch-games.mjs
import { writeFile } from "node:fs/promises";
import { COUNTRY, STORE, getItems, getJson, getTagNames, search, toGame } from "./steam.mjs";

const TOTAL = 150;
const MIN_REVIEWS = 1000;
const LIMITS = { featured: 10, wishlist: 4 };
const PER_TAB = 24;
const CATEGORY_TAGS = {
  Roguelike: 1716,
  Metroidvania: 1628,
  "Open World": 1695,
  Deckbuilding: 32322,
  "Co-op": 1685,
  "Farming Sim": 87918,
  "Story Rich": 1742,
  "Souls-like": 29482,
  Strategy: 9,
  Horror: 1667,
  Cozy: 97376,
  Puzzle: 1664,
};

const tagNames = await getTagNames();
const topSellers = await search("filter=topsellers");
const home = await getJson(`${STORE}/api/featuredcategories?cc=${COUNTRY}&l=english`);

const wanted = {
  // Chosen for their art. Every one needs a trailer.
  featured: [
    367520, 1030300, 1145350, 1057090, 1903340, 1245620, 268910, 1332010, 683320, 1086940, 2358720, 753640, 1313140, 1868140,
  ],
  "for-you": [1091500, 105600, 620, 632360, 504230, 268910, 427520, 646570, 2379780, 413150, 588650, 1794680, 391540, 1092790],
  deals: [...new Set(home.specials.items.map((item) => item.id)), ...(await search("specials=1&filter=topsellers"))],
  new: await search("filter=popularnew&sort_by=Released_DESC"),
  "top-sellers": topSellers,
  wishlist: [1145350, 1174180, 632360, 1222140, 1086940, 646570, 1332010],
};
const creators = [292030, 1174180, 753640, 638230, 257850, 237930, 1145360, 70, 400, 546560, 1449850];
const byCategory = [];
for (const tag of Object.values(CATEGORY_TAGS)) byCategory.push(await search(`filter=topsellers&tags=${tag}`));
const cheap = await search("filter=topsellers&maxprice=10");

const ids = [...new Set([...Object.values(wanted).flat(), ...creators, ...byCategory.flat(), ...cheap])];
const games = new Map();
for (let start = 0; start < ids.length; start += 30) {
  for (const item of await getItems(ids.slice(start, start + 30))) {
    const game = toGame(item, tagNames, topSellers);
    if (game && game.shots.length >= 4) games.set(game.id, game);
  }
}

const checks = {
  featured: (game) => game.trailer,
  new: (game) => (game.reviews?.total ?? 0) >= 500,
  wishlist: (game) => game.discount > 0,
  deals: (game) => game.discount > 0,
};
const lists = {};
for (const [key, list] of Object.entries(wanted)) {
  lists[key] = [...new Set(list)]
    .filter((id) => games.has(id) && (checks[key]?.(games.get(id)) ?? true))
    .slice(0, LIMITS[key] ?? PER_TAB);
}

// The lists first, then one game per category in turn until there are enough.
const kept = new Set([...Object.values(lists).flat(), ...creators.filter((id) => games.has(id))]);
const pools = [...byCategory, cheap].map((list) =>
  list.filter((id) => (games.get(id)?.reviews?.total ?? 0) >= MIN_REVIEWS),
);
for (let turn = 0; kept.size < TOTAL && turn < 50; turn += 1) {
  for (const pool of pools) if (kept.size < TOTAL && pool[turn]) kept.add(pool[turn]);
}

const result = [...kept].map((id) => games.get(id));
await writeFile(
  "src/data/games.json",
  JSON.stringify({ fetchedOn: new Date().toISOString().slice(0, 10), games: result, lists }, null, 1) + "\n",
);
console.log(result.length, "games");
console.log(Object.fromEntries(Object.entries(lists).map(([key, list]) => [key, list.map((id) => games.get(id).name)])));
for (const name of Object.keys(CATEGORY_TAGS)) console.log(name, result.filter((game) => game.tags.includes(name)).length);
console.log("under 10:", result.filter((game) => game.cents < 1000).length);
