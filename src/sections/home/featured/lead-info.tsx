import Link from "next/link";
import { ReviewSummary } from "@/components/review-summary";
import type { Game } from "@/lib/catalog";

type LeadInfoProps = { game: Game };

export function LeadInfo({ game }: LeadInfoProps) {
  return (
    <div className="order-1 grid gap-1 xl:order-none">
        <h2 className="text-2xl font-bold text-text-strong md:text-3xl 2xl:text-4xl">
          <Link href={`/game/${game.id}`} className="hover:underline">
            {game.name}
          </Link>
        </h2>
        <ReviewSummary reviews={game.reviews} variant="full" />
      </div>
  );
}
