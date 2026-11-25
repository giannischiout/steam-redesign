"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import type { ReactNode } from "react";
import { useCarouselEdges } from "@/hooks/use-carousel-edges";
import { prefersReducedMotion } from "@/lib/reduced-motion";

type CategoryCarouselProps = { label: string; children: ReactNode };

const button =
  "absolute top-[40%] z-10 hidden size-11 cursor-pointer place-content-center rounded-full bg-page text-text-strong shadow-md shadow-media md:not-[[hidden]]:grid";

/** Drag, swipe or scroll sideways. The arrows are for the mouse: tabbing already moves the row. */
export function CategoryCarousel({ label, children }: CategoryCarouselProps) {
  const [viewportRef, api] = useEmblaCarousel(
    { align: "start", containScroll: "trimSnaps", dragFree: true, slidesToScroll: "auto" },
    [WheelGesturesPlugin()],
  );
  const { canScrollPrev, canScrollNext } = useCarouselEdges(api);

  return (
    <div className="relative">
      <div ref={viewportRef} className="-mx-4 cursor-grab overflow-hidden active:cursor-grabbing md:mx-0">
        <ul aria-label={label} className="flex touch-pan-y touch-pinch-zoom gap-3 md:gap-4">
          {children}
        </ul>
      </div>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        hidden={!canScrollPrev}
        onClick={() => api?.scrollPrev(prefersReducedMotion())}
        className={`${button} left-2`}
      >
        <IconChevronLeft size={22} />
      </button>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        hidden={!canScrollNext}
        onClick={() => api?.scrollNext(prefersReducedMotion())}
        className={`${button} right-2`}
      >
        <IconChevronRight size={22} />
      </button>
    </div>
  );
}
