import { cn } from "@/lib/cn";

/** Opening and closing: the bar's width and everything that fades share this timing. */
export const sidebarMotion =
  "motion-safe:transition-opacity motion-safe:duration-250 motion-safe:ease-out";

/** One row in the sidebar: the links and the open/close button. */
export const sidebarRow =
  "group relative flex h-10 w-full items-center rounded-xl text-sm text-text-menu hover:bg-text-strong/10 hover:text-text-strong [@media(max-height:44rem)]:h-9 quiet:hover:bg-transparent classic:rounded-full classic:hover:bg-transparent";

export const sidebarIcon = "grid h-full w-11 shrink-0 place-content-center";

/**
 * The label beside the icon. It is always there, on one line, and the row's width cuts
 * it off, so nothing wraps or jumps while the bar opens.
 */
export function sidebarLabel(isExpanded: boolean) {
  return cn("flex min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap", sidebarMotion, !isExpanded && "opacity-0");
}

/** The name that pops out beside a closed row. */
export const sidebarTooltip =
  "pointer-events-none absolute left-full z-20 ml-4 rounded-full border border-text-quiet/40 bg-header px-3 py-1.5 whitespace-nowrap text-text-strong opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 classic:ml-3 classic:rounded-lg classic:border-0 classic:bg-text-strong classic:py-2 classic:text-page";
