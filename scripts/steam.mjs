// What both fetch scripts share: reading Steam's public store data and shaping one game.
export const STORE = "https://store.steampowered.com";
const API = "https://api.steampowered.com";
const IMAGES = "https://shared.akamai.steamstatic.com/store_item_assets/";
const VIDEOS = "https://video.akamai.steamstatic.com/store_trailers/";

export const COUNTRY = "de";
/** Steam's content descriptors for adult-only and frequent sexual content. */
const ADULT = [3, 4];

const GENRES = [
  "Action", "Adventure", "RPG", "Strategy", "Simulation", "Puzzle", "Platformer", "Horror", "Racing",
  "Sports", "Shooter", "FPS", "Roguelike", "Metroidvania", "Deckbuilding", "Survival", "Sandbox",
  "Fighting", "City Builder", "Farming Sim", "Souls-like", "Visual Novel", "Action RPG", "JRPG",
];
const PLAYERS = { "Single-player": [2], "Multi-player": [1, 27, 36, 47, 49], "Co-op": [9, 38, 39, 48] };

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getJson(url, triesLeft = 3) {
  const res = await fetch(url);
  const text = await res.text();
  if (res.ok && text.startsWith("{")) return JSON.parse(text);
  if (triesLeft === 0) throw new Error(`${res.status} ${url} ${text.slice(0, 80)}`);
  await wait(5000);
  return getJson(url, triesLeft - 1);
}

/** Game ids from a store search, in order. */
export async function search(params) {
  const body = await getJson(`${STORE}/search/results/?${params}&category1=998&cc=${COUNTRY}&json=1&count=50`);
  await wait(1500);
  return body.items.map((item) => Number(item.logo.match(/\/apps\/(\d+)\//)?.[1])).filter(Boolean);
}

export async function getItems(ids) {
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

const formatDate = (seconds, options) =>
  new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(new Date(seconds * 1000));

function getReleased(release) {
  if (!release?.steam_release_date) return { released: "Coming soon", releasedAt: 0 };
  const released = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(release.steam_release_date * 1000),
  );
  return { released, releasedAt: release.steam_release_date };
}

/** Only as exact as the studio has said: a day, a month, or just "Coming soon". */
function getComingDate(release) {
  const releasedAt = release?.steam_release_date ?? 0;
  const shown = release?.coming_soon_display;
  if (releasedAt && shown === "date_full") {
    return { released: formatDate(releasedAt, { day: "numeric", month: "short", year: "numeric" }), releasedAt };
  }
  if (releasedAt && shown === "date_month") {
    return { released: formatDate(releasedAt, { month: "short", year: "numeric" }), releasedAt };
  }
  return { released: "Coming soon", releasedAt };
}

/** An upcoming game often has no price yet. The huge number keeps it out of "Under 10" filters. */
function getComingPrice(item) {
  if (item.is_free) return { price: "Free to play", was: null, discount: 0, cents: 0 };
  if (!item.best_purchase_option) return { price: "No price yet", was: null, discount: 0, cents: Number.MAX_SAFE_INTEGER };
  return getPrice(item);
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

export function toGame(item, tagNames, topSellers, { isUpcoming = false } = {}) {
  if (item.success !== 1 || !item.visible || item.type !== 0 || item.unlisted) return null;
  if (item.content_descriptorids?.some((id) => ADULT.includes(id))) return null;
  if (!isUpcoming && !item.best_purchase_option && !item.is_free) return null;
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
    ...(isUpcoming ? getComingDate(item.release) : getReleased(item.release)),
    image: asset(item.assets.header),
    poster: asset(item.assets.library_capsule),
    shots: (item.screenshots.all_ages_screenshots ?? []).slice(0, 5).map((shot) => IMAGES + withoutQuery(shot.filename)),
    trailer: getTrailer(item),
    ...(isUpcoming ? getComingPrice(item) : getPrice(item)),
    reviews: reviews?.review_count
      ? { label: reviews.review_score_label, percent: reviews.percent_positive, total: reviews.review_count }
      : null,
    topSellerRank: rank === -1 || rank >= 100 ? null : rank + 1,
  };
}

export async function getTagNames() {
  const tagList = await getJson(`${API}/IStoreService/GetTagList/v1/?language=english`);
  return new Map(tagList.response.tags.map((tag) => [tag.tagid, tag.name]));
}
