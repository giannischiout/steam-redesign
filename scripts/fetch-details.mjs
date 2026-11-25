// Saves each saved game's long description and system requirements to
// src/data/details.json, as plain text (no HTML from outside reaches the page).
// Run by hand after the other fetch scripts: node scripts/fetch-details.mjs
// It skips games it already has, so it can be run again if Steam asks it to slow down.
import { readFile, writeFile } from "node:fs/promises";
import { STORE, wait } from "./steam.mjs";

const FILE = "src/data/details.json";
const MAX_CHARS = 3500;

const read = async (path, fallback) => {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT" && fallback) return fallback;
    throw error;
  }
};

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", reg: "®", trade: "™", copy: "©" };
const decode = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, name) => {
    if (name[0] !== "#") return ENTITIES[name.toLowerCase()] ?? whole;
    const isHex = name[1].toLowerCase() === "x";
    return String.fromCodePoint(parseInt(name.slice(isHex ? 2 : 1), isHex ? 16 : 10));
  });
const plain = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Headings, paragraphs and lists, up to about MAX_CHARS. Pictures and videos are left out. */
function toBlocks(html = "") {
  const lines = html
    .replace(/<h[1-6][^>]*>/gi, "\n\u0001")
    .replace(/<li[^>]*>/gi, "\n\u0002")
    .replace(/<\/?(br|p|h[1-6]|li|ul|ol|div)\b[^>]*>/gi, "\n")
    .split("\n");
  const blocks = [];
  let length = 0;
  for (const line of lines) {
    const kind = line[0] === "\u0001" ? "heading" : line[0] === "\u0002" ? "item" : "text";
    const text = plain(line.replace(/[\u0001\u0002]/g, ""));
    if (!text) continue;
    if (length + text.length > MAX_CHARS && length > 0) break;
    length += text.length;
    const last = blocks.at(-1);
    if (kind !== "item") blocks.push({ type: kind, text });
    else if (last?.type === "list") last.items.push(text);
    else blocks.push({ type: "list", items: [text] });
  }
  while (blocks.at(-1)?.type === "heading") blocks.pop();
  return blocks;
}

/** "<li><strong>OS:</strong> Windows 10</li>" becomes { label: "OS", value: "Windows 10" }. */
function toRows(html = "") {
  return [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map(([, item]) => {
      const match = item.match(/^\s*<strong>([\s\S]*?)<\/strong>([\s\S]*)$/i);
      return match
        ? { label: plain(match[1]).replace(/\s*\*?\s*:\s*\*?$/, ""), value: plain(match[2]) }
        : { label: "", value: plain(item) };
    })
    .filter((row) => row.value);
}

/** Steam sends an empty list instead of an object when there is nothing. */
const toRequirements = (entry) => ({ minimum: toRows(entry?.minimum), recommended: toRows(entry?.recommended) });

async function getDetails(id) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const res = await fetch(`${STORE}/api/appdetails?appids=${id}&cc=de&l=english`);
    if (res.ok) {
      const entry = (await res.json())?.[id];
      return entry?.success ? entry.data : null;
    }
    console.log(`${res.status} for ${id}, waiting`);
    await wait(res.status === 429 || res.status === 403 ? 70000 : 5000);
  }
  throw new Error(`Gave up on ${id}`);
}

const [games, upcoming, saved] = await Promise.all([
  read("src/data/games.json"),
  read("src/data/upcoming.json"),
  read(FILE, { games: {} }),
]);
const ids = [...new Set([...games.games, ...upcoming.games].map((game) => game.id))];
const todo = ids.filter((id) => !saved.games[id]);
console.log(`${todo.length} of ${ids.length} to fetch`);

const save = () =>
  writeFile(FILE, JSON.stringify({ fetchedOn: new Date().toISOString().slice(0, 10), games: saved.games }) + "\n");

for (const [index, id] of todo.entries()) {
  const data = await getDetails(id);
  if (data) {
    saved.games[id] = {
      about: toBlocks(data.about_the_game),
      requirements: {
        windows: toRequirements(data.pc_requirements),
        macos: toRequirements(data.mac_requirements),
        linux: toRequirements(data.linux_requirements),
      },
    };
  } else console.log(`nothing for ${id}`);
  if (index % 20 === 19) {
    await save();
    console.log(`${index + 1} done`);
  }
  await wait(1600);
}
await save();
console.log(`${Object.keys(saved.games).length} saved`);
