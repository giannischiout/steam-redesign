import { SectionHeader } from "@/components/section-header";
import { creators } from "@/data/creators";
import { getGamesBy } from "@/lib/catalog";
import { CreatorPanel } from "./creator-panel";

export function Creators() {
  return (
    <section aria-labelledby="creators-title">
      <SectionHeader
        id="creators-title"
        title="From developers and publishers you know"
        detail="Creators you follow or we recommend based on games you play"
      />
      <ul className="grid gap-4 min-[56rem]:grid-cols-3 lg:gap-5">
        {creators.map((creator) => (
          <CreatorPanel key={creator.name} {...creator} games={getGamesBy(creator.name)} />
        ))}
      </ul>
    </section>
  );
}
