import { IconX } from "@tabler/icons-react";
import type { Ref } from "react";
import { PlatformIcons } from "@/components/platform-icons";
import { ScrollArea } from "@/components/scroll-area";
import type { Game } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import type { DetailsDrawer as Drawer } from "@/hooks/use-details-drawer";

type DetailsDrawerProps = { id: string; game: Game; drawer: Drawer; closeRef: Ref<HTMLButtonElement> };

/** Slides up over the image and the text. The bar with Wishlist and the price stays below it. */
export function DetailsDrawer({ id, game, drawer, closeRef }: DetailsDrawerProps) {
  const facts = [
    { label: "Developer", value: game.developers.join(", ") },
    { label: "Publisher", value: game.publishers.join(", ") },
    { label: "Released", value: game.released },
    { label: "Genres", value: game.genres.join(", ") },
    { label: "Players", value: game.players.join(", ") },
  ].filter((fact) => fact.value);

  return (
    <div className="pointer-events-none absolute inset-0 col-start-1 col-end-2 row-start-1 row-end-4 overflow-hidden rounded-media xl:row-end-3">
      <section
        id={id}
        aria-label={`${game.name}, more details`}
        inert={!drawer.isOpen}
        data-details-drawer
        className={cn(
          "pointer-events-auto absolute inset-x-0 bottom-0 flex h-[68%] flex-col rounded-t-tile bg-page motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
          !drawer.isOpen && "translate-y-full",
        )}
      >
        <div className="flex items-center justify-between gap-4 py-1 pr-1 pl-4 md:pl-5">
          <p className="font-semibold text-text-strong">More details</p>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close details"
            onClick={drawer.close}
            className="grid size-11 cursor-pointer place-content-center rounded-full text-text-menu -outline-offset-2 hover:text-text-strong"
          >
            <IconX aria-hidden="true" size={20} />
          </button>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="grid content-start gap-5 px-4 pb-5 md:px-5">
            <p className="max-w-[72ch]">{game.about}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-text-long">{fact.label}</dt>
                  <dd className="font-semibold text-text-strong">{fact.value}</dd>
                </div>
              ))}
              <div className="grid content-start gap-1">
                <dt className="text-sm text-text-long">Platforms</dt>
                <dd>
                  <PlatformIcons platforms={game.platforms} />
                </dd>
              </div>
            </dl>
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}
