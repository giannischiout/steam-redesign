import { useEffect, type RefObject } from "react";

const GAP = 16;

/**
 * Sets `--fit` on a sticky panel: the room from its top edge to the bottom of the screen.
 * CSS cannot know how far down the panel starts before the page is scrolled.
 */
export function useFitToScreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const panel = ref.current;
    if (!panel) return;
    function fit() {
      if (!panel) return;
      const top = Math.max(panel.getBoundingClientRect().top, GAP);
      panel.style.setProperty("--fit", `${window.innerHeight - top - GAP}px`);
    }
    fit();
    // Also when it appears, as after switching the filters to the sidebar.
    const observer = new ResizeObserver(fit);
    observer.observe(panel);
    window.addEventListener("scroll", fit, { passive: true });
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", fit);
      window.removeEventListener("resize", fit);
    };
  }, [ref]);
}
