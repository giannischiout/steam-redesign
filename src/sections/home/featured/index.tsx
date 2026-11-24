import { getList } from "@/lib/catalog";
import { LeadGame } from "./lead-game";
import { SideGame } from "./side-game";

export function Featured() {
  const [lead, ...rest] = getList("featured");
  if (!lead) return null;

  return (
    <section
      aria-label="Featured"
      className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-6"
    >
      <LeadGame game={lead} />
      <ul className="grid gap-4">
        {rest.map((game) => (
          <li key={game.id}>
            <SideGame game={game} />
          </li>
        ))}
      </ul>
    </section>
  );
}
