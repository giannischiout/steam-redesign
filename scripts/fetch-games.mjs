// Saves a snapshot of public Steam store data to src/data/games.json.
// Run by hand: node scripts/fetch-games.mjs
import { writeFile } from "node:fs/promises";

const STORE = "https://store.steampowered.com";
const API = `${STORE}/api`;
const LIMITS = { featured: 10, wishlist: 4 };
const PER_TAB = 8;
const MIN_NEW_REVIEWS = 500;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, triesLeft = 3) {
  const res = await fetch(url);
  const text = await res.text();
  if (res.ok && text.startsWith("{")) return JSON.parse(text);
  if (triesLeft === 0) throw new Error(`${res.status} ${url} ${text.slice(0, 80)}`);
  await wait(5000);
  return getJson(url, triesLeft - 1);
}

/** Game ids from a store search, in order. */
async function search(params) {
  const body = await getJson(
    `${STORE}/search/results/?${params}&category1=998&cc=us&json=1`,
  );
  return body.items
    .map((item) => Number(item.logo.match(/\/apps\/(\d+)\//)?.[1]))
    .filter(Boolean);
}

/** Review label, percent and count as shown on the public search page. */
async function getReviews(id, name) {
  const term = encodeURIComponent(name.replace(/[^\p{L}\p{N}\s:'-]/gu, ""));
  const res = await fetch(
    `${STORE}/search/results/?term=${term}&category1=998&cc=us&l=english`,
  );
  const html = await res.text();
  await wait(1600);
  const row = html.split("<a ").find((part) => part.includes(`data-ds-appid="${id}"`));
  const match = row?.match(
    /data-tooltip-html="([^"&]+)&lt;br&gt;(\d+)% of the ([\d,]+) user reviews/,
  );
  if (!match) return null;
  const [, label, percent, total] = match;
  return { label, percent: Number(percent), total: Number(total.replaceAll(",", "")) };
}

function getTrailer(movies) {
  const movie = movies?.find((item) => item.highlight) ?? movies?.[0];
  if (!movie?.hls_h264) return null;
  return {
    hls: movie.hls_h264.split("?")[0],
    mp4: `https://video.akamai.steamstatic.com/store_trailers/${movie.id}/movie480.mp4`,
    poster: movie.thumbnail.split("?")[0],
  };
}

async function getGame(id, topSellers) {
  const body = await getJson(`${API}/appdetails?appids=${id}&cc=us&l=english`);
  await wait(1600);
  const data = body[id]?.data;
  if (!data || data.type !== "game") return null;
  const price = data.price_overview;
  if (!price && !data.is_free) return null;
  const rank = topSellers.indexOf(id);
  return {
    id,
    name: data.name,
    image: data.header_image.split("?")[0],
    shots: (data.screenshots ?? []).slice(0, 5).map((s) => s.path_full.split("?")[0]),
    trailer: getTrailer(data.movies),
    price: price ? price.final_formatted : "Free to play",
    was: price?.discount_percent ? price.initial_formatted : null,
    discount: price?.discount_percent ?? 0,
    reviews: await getReviews(id, data.name),
    topSellerRank: rank === -1 ? null : rank + 1,
  };
}

const topSellers = await search("filter=topsellers");
const home = await getJson(`${API}/featuredcategories?cc=us&l=english`);

const lists = {
  featured: [
    1086940, 1145350, 1245620, 367520, 413150, 292030, 1174180, 753640, 2379780, 3768760,
  ],
  "for-you": [1091500, 105600, 620, 632360, 504230, 268910, 427520, 646570],
  deals: [...new Set(home.specials.items.map((item) => item.id))],
  new: await search("filter=popularnew&sort_by=Released_DESC"),
  "top-sellers": topSellers,
  wishlist: [1145350, 1174180, 632360, 1222140, 1086940],
};

const games = {};
const result = {};
for (const [key, ids] of Object.entries(lists)) {
  const limit = LIMITS[key] ?? PER_TAB;
  result[key] = [];
  for (const id of ids) {
    if (result[key].length === limit) break;
    games[id] ??= await getGame(id, topSellers);
    const game = games[id];
    if (!game) continue;
    if (key === "new" && (game.reviews?.total ?? 0) < MIN_NEW_REVIEWS) continue;
    if (key === "wishlist" && !game.discount) continue;
    result[key].push(id);
  }
}

const used = new Set(Object.values(result).flat());
const kept = Object.values(games).filter((game) => game && used.has(game.id));
await writeFile(
  "src/data/games.json",
  JSON.stringify({ fetchedOn: new Date().toISOString().slice(0, 10), games: kept, lists: result }, null, 2) + "\n",
);
for (const g of kept)
  console.log(g.id, g.name, "|", g.reviews?.label, g.reviews?.total, "|", g.price, g.was, "| top", g.topSellerRank, "| shots", g.shots.length);
console.log(result);
