import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { getQueueLines } from "./queue-games";
import { QueueMotion } from "./queue-motion";

export function DiscoveryQueue() {
  return (
    <section
      aria-labelledby="queue-title"
      className="group relative flex h-72 overflow-hidden rounded-tile bg-linear-to-b from-button-blue-to to-accent md:h-48 md:bg-linear-to-r md:items-center"
    >
      <QueueMotion lines={getQueueLines()} />
      <div className="z-1 grid content-start gap-2 p-4 md:max-w-sm md:px-8 md:py-0 lg:max-w-md">
        <h2 id="queue-title" className="text-xl font-bold text-balance text-text-strong md:text-2xl">
          <Link
            href="/queue"
            className="rounded-tile after:absolute after:inset-0 after:rounded-tile focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-text-strong"
          >
            Explore your discovery queue
          </Link>
        </h2>
        <p className="max-w-[40ch] text-text-strong">Your queue of top-selling, new and recommended titles.</p>
        {/* Only the look of a button: the title's link covers the whole strip. */}
        <span
          aria-hidden="true"
          className="mt-2 flex h-11 items-center gap-2 justify-self-start rounded-full bg-text-strong pr-4 pl-5 text-sm font-semibold text-page"
        >
          Open your queue
          <IconArrowRight size={18} className="motion-safe:transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </section>
  );
}
