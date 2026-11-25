import { ReviewSummary } from "@/components/review-summary";
import { SectionHeader } from "@/components/section-header";
import type { Game } from "@/lib/catalog";
import { formatCount } from "@/lib/format";
import { sampleReviews } from "@/lib/sample-reviews";
import { ReviewRotator } from "./review-rotator";

/** Steam's review totals, then sample reviews that are marked as made up. */
export function PlayerReviews({ game }: { game: Game }) {
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
        {reviews && (
          <div className="grid gap-2">
            <p className="text-sm text-text-long">Sample reviews, made up for this concept.</p>
            <ReviewRotator key={game.id} reviews={sampleReviews(game.id, reviews.percent)} />
          </div>
        )}
      </div>
    </section>
  );
}
