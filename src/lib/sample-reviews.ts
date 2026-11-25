import { communityPicks } from "@/data/community-picks";
import { negativeReviews, positiveReviews, type SampleReview } from "@/data/sample-reviews";

const SHOWN = 4;

/** `count` entries starting at a place that depends on the game, wrapping around. */
const take = (list: SampleReview[], start: number, count: number) =>
  Array.from({ length: count }, (_, step) => list[(start + step) % list.length]).filter((entry) => entry !== undefined);

/**
 * The same game always gets the same sample reviews. A game rated less well gets more
 * that do not recommend it. Its recommendation from home, if it has one, comes first.
 */
export function sampleReviews(gameId: number, percentPositive: number): SampleReview[] {
  const pick = communityPicks.find((entry) => entry.gameId === gameId);
  const own = pick ? [{ player: pick.player, hours: pick.hours, isRecommended: true, quote: pick.quote }] : [];
  const against = percentPositive >= 70 ? 1 : 2;
  const positive = take(
    positiveReviews.filter((entry) => entry.player !== pick?.player),
    gameId,
    SHOWN - against - own.length,
  );
  return [...own, ...positive, ...take(negativeReviews, gameId, against)];
}
