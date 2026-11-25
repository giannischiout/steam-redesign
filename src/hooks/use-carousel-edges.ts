import type { UseEmblaCarouselType } from "embla-carousel-react";
import { useSyncExternalStore } from "react";

type CarouselApi = UseEmblaCarouselType[1];

/** Whether the carousel can still move each way. "reInit" covers resizes. */
export function useCarouselEdges(api: CarouselApi) {
  function subscribe(onChange: () => void) {
    api?.on("init", onChange).on("select", onChange).on("scroll", onChange).on("reInit", onChange);
    return () => {
      api?.off("init", onChange).off("select", onChange).off("scroll", onChange).off("reInit", onChange);
    };
  }

  const canScrollPrev = useSyncExternalStore(subscribe, () => api?.canScrollPrev() ?? false, () => false);
  const canScrollNext = useSyncExternalStore(subscribe, () => api?.canScrollNext() ?? false, () => false);

  return { canScrollPrev, canScrollNext };
}
