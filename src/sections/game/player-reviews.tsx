import { ReviewSummary } from "@/components/review-summary";
import { SectionHeader } from "@/components/section-header";
import { communityPicks } from "@/data/community-picks";
import type { Game } from "@/lib/catalog";
import { formatCount } from "@/lib/format";

/** Steam's review totals, plus the made-up recommendation if this game has one. */
export function PlayerReviews({ game }: { game: Game }) {
  const pick = communityPicks.find((entry) => entry.gameId === game.id);
  const { reviews } = game;

  return (
    <section aria-labelledby="players-title">
      <SectionHeader id="players-title" title="What players say" />
      <div className="grid gap-4 rounded-tile bg-page-product p-4 md:p-5">
        {reviews ? (
          <div className="grid gap-2">
            <ReviewSummary reviews={reviews} />
            <span aria-hidden="true" className="block h-2 overflow-hidden rounded-thumb bg-page">
              <span className="block h-full bg-review-positive" style={{ width: `${reviews.percent}%` }} />
            </span>
            <p className="text-sm text-text-long">
              {reviews.percent}% of {formatCount(reviews.total)} reviews are positive.
            </p>
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
        {pick && (
          <figure className="grid gap-2 rounded-media bg-page p-4">
            <blockquote className="text-lg text-pretty text-text-strong">“{pick.quote}”</blockquote>
            <figcaption className="text-sm text-text-long">
              {pick.player}, {pick.hours} hours played
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
