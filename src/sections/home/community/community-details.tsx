import Link from "next/link";
import { PlatformIcons } from "@/components/platform-icons";
import { Price } from "@/components/price";
import { ReviewSummary } from "@/components/review-summary";
import { WishlistButton } from "@/components/wishlist-button";
import { formatFacts } from "@/lib/format";
import type { Pick } from "./pick";

type CommunityDetailsProps = { pick: Pick; isSaved: boolean; onToggleSaved: () => void };

/** The game, what one player said about it, and what you need to decide. */
export function CommunityDetails({ pick, isSaved, onToggleSaved }: CommunityDetailsProps) {
  const { game } = pick;

  return (
    <div className="flex flex-col gap-4 p-2 lg:py-0 lg:pr-1 lg:pl-0">
      <div className="grid gap-1">
        <h3 className="text-xl font-bold text-text-strong md:text-2xl">
          <Link href={`/game/${game.id}`} className="hover:underline">
            {game.name}
          </Link>
        </h3>
        <ReviewSummary reviews={game.reviews} variant="full" />
        <p className="text-sm text-text-long">
          {formatFacts(game.developers, game.released)}
        </p>
      </div>
      <figure className="grid gap-2 rounded-media bg-page p-4">
        <blockquote className="min-h-[3lh] text-lg text-pretty text-text-strong">“{pick.quote}”</blockquote>
        <figcaption className="text-sm text-text-long">
          {pick.player}, {pick.hours} hours played
        </figcaption>
      </figure>
      <p className="line-clamp-3 min-h-[3lh] max-w-[65ch] text-sm">{game.about}</p>
      <ul aria-label="Tags" className="flex flex-wrap gap-2">
        {game.tags.map((tag) => (
          <li key={tag} className="rounded-thumb bg-text-strong/5 px-2.5 py-1 text-sm">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <PlatformIcons platforms={game.platforms} itemClassName="bg-page" />
        <div className="ml-auto flex flex-wrap items-center justify-end gap-3">
          <Price game={game} size="large" />
          <WishlistButton name={game.name} isSaved={isSaved} onToggle={onToggleSaved} />
        </div>
      </div>
    </div>
  );
}
