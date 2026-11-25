/** One row in the sidebar: the links and the open/close button. */
export const sidebarRow =
  "group relative flex h-10 w-full items-center rounded-xl text-sm text-text-menu hover:bg-text-strong/10 hover:text-text-strong [@media(max-height:42rem)]:h-9 quiet:hover:bg-transparent classic:rounded-full classic:hover:bg-transparent";

export const sidebarIcon = "grid h-full w-11 shrink-0 place-content-center";

/** The label: beside the icon when open, a tooltip when closed. */
export function sidebarLabel(isExpanded: boolean) {
  return isExpanded
    ? "truncate pr-4"
    : "pointer-events-none absolute left-full z-20 ml-4 rounded-full border border-text-quiet/40 bg-header px-3 py-1.5 whitespace-nowrap text-text-strong opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 classic:ml-3 classic:rounded-lg classic:border-0 classic:bg-text-strong classic:py-2 classic:text-page";
}
