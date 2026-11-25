import { toBrowseGame } from "@/lib/browse";
import { getList } from "@/lib/catalog";
import { GameTabs as Tabs } from "./game-tabs";

const lists = [
  { key: "for-you", label: "For you" },
  { key: "deals", label: "Deals" },
  { key: "new", label: "New" },
  { key: "top-sellers", label: "Top sellers" },
] as const;

export function GameTabs() {
  return <Tabs lists={lists.map(({ key, label }) => ({ key, label, games: getList(key).map(toBrowseGame) }))} />;
}
