import { Price } from "@/components/price";
import type { Game } from "@/lib/catalog";
import { WishlistButton } from "@/components/wishlist-button";

type LeadBarProps = { game: Game; isSaved: boolean; onToggleSaved: () => void };

export function LeadBar({ game, isSaved, onToggleSaved }: LeadBarProps) {
  return (
    <div className="row-start-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 self-start xl:col-start-1 xl:row-start-3">
      <WishlistButton name={game.name} isSaved={isSaved} onToggle={onToggleSaved} />
      <Price game={game} size="large" />
    </div>
  );
}
