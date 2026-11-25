import { IconChevronsRight } from "@tabler/icons-react";
import { ShortcutKeys } from "@/components/shortcut-keys";
import { cn } from "@/lib/cn";

type SidebarEdgeToggleProps = { isExpanded: boolean; onToggle: () => void };

/** Original sidebar only: a round button sitting on its edge, equally spaced from logo and icons. */
export function SidebarEdgeToggle({ isExpanded, onToggle }: SidebarEdgeToggleProps) {
  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Close sidebar" : "Open sidebar"}
      aria-keyshortcuts="Control+B Meta+B"
      onClick={onToggle}
      className="group relative my-4 -mr-9 hidden size-8 shrink-0 cursor-pointer place-content-center self-end rounded-full border border-text-quiet/40 bg-page-product text-text-strong after:absolute after:-inset-1.5 classic:grid"
    >
      <IconChevronsRight aria-hidden="true" size={18} className={cn(isExpanded && "rotate-180")} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-full z-20 ml-3 flex items-center gap-2 rounded-lg bg-text-strong px-3 py-1.5 text-sm whitespace-nowrap text-page opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {isExpanded ? "Close sidebar" : "Open sidebar"}
        <ShortcutKeys letter="b" />
      </span>
    </button>
  );
}
