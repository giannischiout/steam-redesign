import Image from "next/image";
import { PlatformIcons } from "@/components/platform-icons";
import { Price } from "@/components/price";
import { getList, type Game } from "@/lib/catalog";
import { BuyActions } from "./buy-actions";

export function BuyBox({ game, isUpcoming }: { game: Game; isUpcoming: boolean }) {
  const isSaved = getList("wishlist").some((other) => other.id === game.id);
  const facts = [
    { label: "Developer", value: game.developers.join(", ") },
    { label: "Publisher", value: game.publishers.join(", ") },
    { label: isUpcoming ? "Coming" : "Released", value: game.released },
    { label: "Players", value: game.players.join(", ") },
  ].filter((fact) => fact.value);

  return (
    <aside aria-label="Price and details" className="flex flex-col gap-4 rounded-tile bg-page-product p-3 md:p-4">
      {/* On narrow screens the media sits right above, and this would push the price down. */}
      <span className="relative hidden aspect-[460/215] overflow-hidden rounded-media bg-media lg:block">
        <Image src={game.image} alt="" fill sizes="33vw" className="object-cover" />
      </span>
      <Price game={game} size="large" />
      <BuyActions
        key={game.id}
        id={game.id}
        name={game.name}
        buyLabel={isUpcoming ? null : game.cents === 0 ? "Play for free" : "Add to cart"}
        isSaved={isSaved}
      />
      <dl className="mt-auto grid gap-2 text-sm">
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
    </aside>
  );
}
