import { PlatformIcons } from "@/components/platform-icons";
import { Price } from "@/components/price";
import { getList, type Game } from "@/lib/catalog";
import { BuyActions } from "./buy-actions";

/** One short card: price and buttons first, then the facts. */
export function BuyBox({ game, isUpcoming }: { game: Game; isUpcoming: boolean }) {
  const isSaved = getList("wishlist").some((other) => other.id === game.id);
  const isFree = game.cents === 0;
  const facts = [
    { label: "Developer", value: game.developers.join(", ") },
    { label: "Publisher", value: game.publishers.join(", ") },
    { label: isUpcoming ? "Coming" : "Released", value: game.released },
    { label: "Players", value: game.players.join(", ") },
  ].filter((fact) => fact.value);

  return (
    <section aria-label="Price and details" className="grid gap-4 rounded-tile bg-page-product p-3 md:p-4">
      <Price game={game} size="large" />
      <BuyActions
        key={game.id}
        id={game.id}
        name={game.name}
        buyLabel={isUpcoming ? null : isFree ? "Play for free" : "Add to cart"}
        // A free game needs no gift, and one that is not out cannot be sent yet.
        canGift={!isUpcoming && !isFree}
        isSaved={isSaved}
      />
      <dl className="grid gap-2.5 text-sm">
        {facts.map((fact) => (
          <div key={fact.label} className="flex justify-between gap-4">
            <dt className="text-text-long">{fact.label}</dt>
            <dd className="text-right text-text-strong">{fact.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-long">Platforms</dt>
          <dd>
            <PlatformIcons platforms={game.platforms} itemClassName="size-9 bg-page" />
          </dd>
        </div>
      </dl>
    </section>
  );
}
