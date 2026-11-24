import { GameCard } from "@/components/game-card";
import { getList } from "@/lib/catalog";
import { Tabs } from "./tabs";

const lists = [
  { key: "for-you", label: "For you" },
  { key: "deals", label: "Deals" },
  { key: "new", label: "New" },
  { key: "top-sellers", label: "Top sellers" },
] as const;

export function GameTabs() {
  const tabs = lists.map(({ key, label }) => ({
    key,
    label,
    panel: (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-6">
        {getList(key).map((game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    ),
  }));

  return <Tabs tabs={tabs} />;
}
