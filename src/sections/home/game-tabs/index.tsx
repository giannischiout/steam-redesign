import type { CardGame } from "@/components/game-card";
import { toBrowseGame } from "@/lib/browse";
import { getList, getUpcoming } from "@/lib/catalog";
import { GameTabs as Tabs } from "./game-tabs";

const lists = [
  { key: "for-you", label: "For you" },
  { key: "deals", label: "Deals" },
  { key: "new", label: "New" },
  { key: "top-sellers", label: "Top sellers" },
] as const;

export function GameTabs() {
  const tabs: { key: string; label: string; games: CardGame[] }[] = lists.map(({ key, label }) => ({ key, label, games: getList(key).map((game) => toBrowseGame(game)) }));
  const upcoming = getUpcoming().map((game) => ({ ...toBrowseGame(game), note: "Not out yet" }));
  // Upcoming sits next to New.
  tabs.splice(3, 0, { key: "upcoming", label: "Upcoming", games: upcoming });

  return <Tabs lists={tabs} />;
}
