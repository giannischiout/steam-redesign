// Saves a snapshot of public Steam store data (euro prices, Germany) to src/data/games.json.
// Run by hand: node scripts/fetch-games.mjs
import { writeFile } from "node:fs/promises";

const STORE = "https://store.steampowered.com";
const API = "https://api.steampowered.com";
const IMAGES = "https://shared.akamai.steamstatic.com/store_item_assets/";
const VIDEOS = "https://video.akamai.steamstatic.com/store_trailers/";

const COUNTRY = "de";
const TOTAL = 150;
const MIN_REVIEWS = 1000;
const LIMITS = { featured: 10, wishlist: 4 };
const PER_TAB = 24;
/** Steam's content descriptors for adult-only and frequent sexual content. */
const ADULT = [3, 4];

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
const GENRES = [
  "Action", "Adventure", "RPG", "Strategy", "Simulation", "Puzzle", "Platformer", "Horror", "Racing",
  "Sports", "Shooter", "FPS", "Roguelike", "Metroidvania", "Deckbuilding", "Survival", "Sandbox",
  "Fighting", "City Builder", "Farming Sim", "Souls-like", "Visual Novel", "Action RPG", "JRPG",
];
const PLAYERS = { "Single-player": [2], "Multi-player": [1, 27, 36, 47, 49], "Co-op": [9, 38, 39, 48] };

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
  const body = await getJson(`${STORE}/search/results/?${params}&category1=998&cc=${COUNTRY}&json=1&count=50`);
  await wait(1500);
  return body.items.map((item) => Number(item.logo.match(/\/apps\/(\d+)\//)?.[1])).filter(Boolean);
}

async function getItems(ids) {
  const input = {
    ids: ids.map((appid) => ({ appid })),
    context: { language: "english", country_code: COUNTRY.toUpperCase(), steam_realm: 1 },
    data_request: {
      include_assets: true,
      include_release: true,
      include_platforms: true,
      include_basic_info: true,
      include_tag_count: 20,
      include_reviews: true,
      include_screenshots: true,
      include_trailers: true,
    },
  };
  const body = await getJson(
    `${API}/IStoreBrowseService/GetItems/v1/?input_json=${encodeURIComponent(JSON.stringify(input))}`,
  );
  await wait(1000);
  return body.response.store_items ?? [];
}

const withoutQuery = (url) => url.split("?")[0];

function getTrailer(item) {
  const trailer = item.trailers?.highlights?.[0] ?? item.trailers?.other_trailers?.[0];
  const hls = trailer?.adaptive_trailers?.find((version) => version.encoding === "hls_h264");
  const loop = trailer?.microtrailer?.find((version) => version.type === "video/mp4");
  if (!hls || !loop) return null;
  return {
    hls: VIDEOS + withoutQuery(hls.cdn_path),
    loop: VIDEOS + withoutQuery(loop.filename),
  };
}

function getReleased(release) {
  if (!release?.steam_release_date) return { released: "Coming soon", releasedAt: 0 };
  const date = new Date(release.steam_release_date * 1000);
  const released = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(date);
  return { released, releasedAt: release.steam_release_date };
}

const euro = (cents) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cents / 100).replace(/\s/g, "");

function getPrice(item) {
  const option = item.best_purchase_option;
  if (item.is_free || !option) return { price: "Free to play", was: null, discount: 0, cents: 0 };
  const cents = Number(option.final_price_in_cents);
  const original = Number(option.original_price_in_cents ?? 0);
  return {
    price: euro(cents),
    was: original > cents ? euro(original) : null,
    discount: original > cents ? (option.discount_pct ?? 0) : 0,
    cents,
  };
}

function toGame(item, tagNames, topSellers) {
  if (item.success !== 1 || !item.visible || item.type !== 0 || item.unlisted) return null;
  if (item.content_descriptorids?.some((id) => ADULT.includes(id))) return null;
  if (!item.best_purchase_option && !item.is_free) return null;
  if (!item.assets?.header || !item.assets?.library_capsule || !item.screenshots) return null;

  const asset = (name) => IMAGES + withoutQuery(item.assets.asset_url_format.replace("${FILENAME}", name));
  const tags = (item.tags ?? []).map((tag) => tagNames.get(tag.tagid)).filter(Boolean);
  const reviews = item.reviews?.summary_filtered;
  const playerIds = item.categories?.supported_player_categoryids ?? [];
  const rank = topSellers.indexOf(item.appid);
  const names = (list) => (list ?? []).map((entry) => entry.name);

  return {
    id: item.appid,
    name: item.name,
    about: item.basic_info?.short_description?.trim() ?? "",
    genres: tags.filter((tag) => GENRES.includes(tag)).slice(0, 2),
    tags,
    developers: names(item.basic_info?.developers),
    publishers: names(item.basic_info?.publishers),
    players: Object.keys(PLAYERS).filter((mode) => PLAYERS[mode].some((id) => playerIds.includes(id))),
    platforms: [
      item.platforms?.windows && "Windows",
      item.platforms?.mac && "macOS",
      item.platforms?.steamos_linux && "Linux",
    ].filter(Boolean),
    ...getReleased(item.release),
    image: asset(item.assets.header),
    poster: asset(item.assets.library_capsule),
    shots: (item.screenshots.all_ages_screenshots ?? []).slice(0, 5).map((shot) => IMAGES + withoutQuery(shot.filename)),
    trailer: getTrailer(item),
    ...getPrice(item),
    reviews: reviews?.review_count
      ? { label: reviews.review_score_label, percent: reviews.percent_positive, total: reviews.review_count }
      : null,
    topSellerRank: rank === -1 || rank >= 100 ? null : rank + 1,
  };
}

const tagList = await getJson(`${API}/IStoreService/GetTagList/v1/?language=english`);
const tagNames = new Map(tagList.response.tags.map((tag) => [tag.tagid, tag.name]));
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
