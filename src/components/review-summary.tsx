import type { Game } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";

function toneOf(label: string) {
  if (label.includes("Positive")) return "text-review-positive";
  if (label === "Mixed") return "text-review-mixed";
  return "text-text-long";
}

type ReviewSummaryProps = {
  reviews: Game["reviews"];
  variant?: "full" | "short";
};

export function ReviewSummary({ reviews, variant = "short" }: ReviewSummaryProps) {
  if (!reviews) return <span className="text-sm text-text-long">No reviews yet</span>;

  return (
    <span className="text-sm text-text-long">
      <span className={cn("font-medium", toneOf(reviews.label))}>{reviews.label}</span>
      {variant === "full" &&
        ` ${reviews.percent}% of ${formatCount(reviews.total)} reviews`}
    </span>
  );
}
