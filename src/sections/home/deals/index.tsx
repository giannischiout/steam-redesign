import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { publisherSale, spotlightDeals } from "@/data/events";
import { browseHref } from "@/lib/browse";
import { getGame, getGamesBy } from "@/lib/catalog";
import { DealCard } from "./deal-card";
import { EventCard } from "./event-card";

export function Deals() {
  const lead = getGame(publisherSale.leadId);
  const onSale = getGamesBy(publisherSale.publisher).filter((game) => game.discount > 0);

  return (
    <section aria-labelledby="deals-title">
      <SectionHeader id="deals-title" title="Discounts and events">
        <Link
          href={browseHref({ sale: true })}
          aria-label="See all games on sale"
          className="flex min-h-11 min-w-11 items-center justify-end text-sm text-link hover:underline"
        >
          See all
        </Link>
      </SectionHeader>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-5">
        {lead && onSale.length > 0 && (
          <EventCard
            kicker={publisherSale.kicker}
            title={publisherSale.title}
            image={lead.shots[publisherSale.leadShot] ?? lead.image}
            bestDiscount={Math.max(...onSale.map((game) => game.discount))}
            count={onSale.length}
            href={browseHref({ creator: publisherSale.publisher, sale: true })}
          />
        )}
        <ul className="grid grid-cols-2 gap-4 lg:gap-5">
          {spotlightDeals.map(({ gameId, label }) => {
            const game = getGame(gameId);
            return game ? <DealCard key={gameId} label={label} game={game} /> : null;
          })}
        </ul>
      </div>
    </section>
  );
}
