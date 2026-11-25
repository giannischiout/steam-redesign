import Image from "next/image";
import { cn } from "@/lib/cn";
import type { QueueGame } from "./queue-games";

type QueueLineProps = { games: QueueGame[]; isReversed?: boolean };

/** The list is there twice, so the loop has no visible start. */
export function QueueLine({ games, isReversed = false }: QueueLineProps) {
  return (
    <div className={cn("queue-line flex w-max", isReversed && "[animation-direction:reverse]")}>
      {[...games, ...games].map((game, index) => (
        <span key={`${game.id}-${index}`} className="pr-4">
          <span className="relative block aspect-[460/215] w-96 overflow-hidden rounded-media bg-page md:w-160">
            <Image
              src={game.image}
              alt=""
              fill
              loading="eager"
              fetchPriority="low"
              sizes="(min-width: 768px) 640px, 384px"
              className="object-cover"
            />
          </span>
        </span>
      ))}
    </div>
  );
}
