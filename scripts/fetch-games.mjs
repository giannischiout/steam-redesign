// Saves a snapshot of public Steam store data to src/data/games.json.
// Run by hand: node scripts/fetch-games.mjs
import { writeFile } from "node:fs/promises";

const IDS = {
  featured: [1086940, 1145350, 1245620, 367520, 413150],
  "for-you": [1091500, 105600, 620, 632360],
};

const API = "https://store.steampowered.com/api";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function getGame(id) {
  const body = await getJson(`${API}/appdetails?appids=${id}&cc=us&l=english`);
  await wait(1600);
  const data = body[id]?.data;
  if (!data || data.type !== "game") return null;
  const price = data.price_overview;
  if (!price && !data.is_free) return null;
  return {
    id,
    name: data.name,
    image: data.header_image.split("?")[0],
    shot: data.screenshots?.[0]?.path_full.split("?")[0] ?? null,
    price: price ? price.final_formatted : "Free to play",
    was: price?.discount_percent ? price.initial_formatted : null,
    discount: price?.discount_percent ?? 0,
  };
}

const lists = { ...IDS };
const home = await getJson(`${API}/featuredcategories?cc=us&l=english`);
const pick = (key) =>
  [...new Set(home[key].items.map((item) => item.id))].slice(0, 14);
lists.deals = pick("specials");
lists.new = pick("new_releases");
const top = await getJson(
  "https://store.steampowered.com/search/results/?filter=topsellers&category1=998&cc=us&json=1",
);
lists["top-sellers"] = top.items
  .map((item) => Number(item.logo.match(/\/apps\/(\d+)\//)?.[1]))
  .filter(Boolean);

const games = {};
const result = {};
for (const [key, ids] of Object.entries(lists)) {
  const limit = key === "featured" ? 5 : 4;
  result[key] = [];
  for (const id of ids) {
    if (result[key].length === limit) break;
    games[id] ??= await getGame(id);
    if (games[id]) result[key].push(id);
  }
}

await writeFile(
  "src/data/games.json",
  JSON.stringify(
    {
      fetchedOn: new Date().toISOString().slice(0, 10),
      games: Object.values(games).filter(Boolean),
      lists: result,
    },
    null,
    2,
  ) + "\n",
);
console.log(result, Object.values(games).filter(Boolean).map((g) => g.name));
