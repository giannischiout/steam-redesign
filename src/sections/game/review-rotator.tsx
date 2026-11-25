"use client";

import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconThumbDownFilled,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import type { SampleReview } from "@/data/sample-reviews";

const round =
  "grid size-11 cursor-pointer place-content-center rounded-full bg-page-product text-text-menu hover:text-text-strong";

/**
 * A new review every 10 seconds. It waits on hover, keyboard focus or Pause,
 * and never changes by itself with reduced motion.
 */
export function ReviewRotator({ reviews }: { reviews: SampleReview[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const review = reviews[index];
  if (!review) return null;

  const step = (by: number) => setIndex((index + by + reviews.length) % reviews.length);
  const Thumb = review.isRecommended ? IconThumbUpFilled : IconThumbDownFilled;
  const PauseIcon = isPaused ? IconPlayerPlayFilled : IconPlayerPauseFilled;

  return (
    <div
      className="rotator grid gap-3 rounded-media bg-page p-4"
      data-paused={isPaused || isHovered || undefined}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Read aloud only when the visitor is in charge of the change. */}
      <figure key={index} aria-live={isPaused ? "polite" : "off"} className="fade-in grid gap-2">
        <p className="flex items-center gap-2 text-sm font-semibold text-text-strong">
          <Thumb aria-hidden="true" size={18} className={review.isRecommended ? "text-review-positive" : "text-text-long"} />
          {review.isRecommended ? "Recommended" : "Not recommended"}
        </p>
        <blockquote className="min-h-[3lh] text-lg text-pretty text-text-strong md:min-h-[2lh]">
          “{review.quote}”
        </blockquote>
        <figcaption className="text-sm text-text-long">
          {review.player}, {review.hours} hours played
        </figcaption>
      </figure>
      <span aria-hidden="true" className="block h-1 overflow-hidden rounded-thumb bg-page-product">
        <span key={index} onAnimationEnd={() => step(1)} className="rotator-fill block h-full origin-left bg-text-quiet" />
      </span>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Previous review" onClick={() => step(-1)} className={round}>
          <IconChevronLeft aria-hidden="true" size={20} />
        </button>
        <button type="button" aria-label="Next review" onClick={() => step(1)} className={round}>
          <IconChevronRight aria-hidden="true" size={20} />
        </button>
        <button
          type="button"
          aria-label={isPaused ? "Play reviews" : "Pause reviews"}
          onClick={() => setIsPaused(!isPaused)}
          className={`rotator-pause ${round}`}
        >
          <PauseIcon aria-hidden="true" size={18} />
        </button>
        <span className="ml-auto text-sm text-text-long tabular-nums">
          {index + 1} / {reviews.length}
        </span>
      </div>
    </div>
  );
}
