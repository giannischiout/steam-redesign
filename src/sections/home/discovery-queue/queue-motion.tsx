"use client";

import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useState } from "react";
import { QueueLine } from "./queue-line";
import type { QueueGame } from "./queue-games";

type QueueMotionProps = { lines: [QueueGame[], QueueGame[]] };

export function QueueMotion({ lines }: QueueMotionProps) {
  const [isPaused, setIsPaused] = useState(false);
  const Icon = isPaused ? IconPlayerPlayFilled : IconPlayerPauseFilled;

  return (
    <div data-paused={isPaused || undefined} className="queue-motion absolute inset-x-0 bottom-0 h-1/2 md:inset-y-0 md:left-auto md:h-auto md:w-1/2 lg:w-3/5">
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden opacity-55 max-md:mask-t-from-50% md:mask-l-from-50%"
      >
        <div className="absolute -inset-x-48 top-1/2 grid -translate-y-1/2 -rotate-45 gap-4 md:translate-x-16">
          <QueueLine games={lines[0]} />
          <QueueLine games={lines[1]} isReversed />
        </div>
      </div>
      <button
        type="button"
        aria-label={isPaused ? "Play moving games" : "Pause moving games"}
        onClick={() => setIsPaused(!isPaused)}
        className="queue-pause absolute right-3 bottom-3 z-10 grid size-11 cursor-pointer place-content-center rounded-full text-text-strong"
      >
        <Icon aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
