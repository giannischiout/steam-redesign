import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import type { Game } from "@/lib/catalog";

type NextGameProps = {
  game: Game;
  position: number;
  total: number;
  isPaused: boolean;
  onNext: () => void;
  onTogglePause: () => void;
};

export function NextGame({
  game,
  position,
  total,
  isPaused,
  onNext,
  onTogglePause,
}: NextGameProps) {
  const PauseIcon = isPaused ? IconPlayerPlayFilled : IconPlayerPauseFilled;

  return (
    <div className="row-start-6 flex items-center gap-1 border-t border-text-quiet/25 pt-3 xl:col-start-2 xl:row-start-2 xl:row-end-4 xl:self-end">
      {/* On the left: the floating Settings button sits in the bottom right corner. */}
      <button
        type="button"
        aria-label={isPaused ? "Play featured games" : "Pause featured games"}
        onClick={onTogglePause}
        className="rotator-pause grid size-11 shrink-0 cursor-pointer place-content-center rounded-full text-text-menu hover:text-text-strong"
      >
        <PauseIcon aria-hidden="true" size={18} />
      </button>
      <button
        type="button"
        onClick={onNext}
        className="group flex min-w-0 flex-1 cursor-pointer items-center gap-4 text-left"
      >
        <span className="relative block aspect-[460/215] w-28 shrink-0 overflow-hidden rounded-thumb md:w-36">
          <Image src={game.image} alt="" fill sizes="144px" className="object-cover" />
          <span className="absolute inset-x-0 bottom-0 h-1 bg-media">
            <span
              key={game.id}
              onAnimationEnd={onNext}
              className="rotator-fill block h-full origin-left bg-text-strong"
            />
          </span>
        </span>
        <span className="grid min-w-0">
          <span className="text-sm text-text-long">Next game, {position} of {total}</span>
          <span className="truncate text-lg font-bold text-text-strong group-hover:underline">
            {game.name}
          </span>
        </span>
      </button>
    </div>
  );
}
