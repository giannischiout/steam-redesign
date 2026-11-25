import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled } from "@tabler/icons-react";
import { ShortcutKeys } from "@/components/shortcut-keys";
import { cn } from "@/lib/cn";
import { sidebarIcon, sidebarLabel, sidebarRow, sidebarTooltip } from "./sidebar-item-styles";

type SidebarToggleProps = { isExpanded: boolean; onToggle: () => void };

export function SidebarToggle({ isExpanded, onToggle }: SidebarToggleProps) {
  const Icon = isExpanded ? IconLayoutSidebarLeftCollapseFilled : IconLayoutSidebarLeftExpandFilled;

  return (
    <div>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse sidebar" : "Open sidebar"}
        aria-keyshortcuts="Control+B Meta+B"
        onClick={onToggle}
        className={cn(sidebarRow, "cursor-pointer")}
      >
        <span className={sidebarIcon}>
          <Icon aria-hidden="true" size={22} />
        </span>
        <span aria-hidden="true" className={sidebarLabel(isExpanded)}>
          Collapse
          <ShortcutKeys letter="b" className="mr-3 ml-auto pl-3" />
        </span>
        {!isExpanded && (
          <span aria-hidden="true" className={sidebarTooltip}>
            Open sidebar
          </span>
        )}
      </button>
      {/* Closed, the keys stay in view under the icon. Their room folds away as the bar opens. */}
      <div
        className={cn(
          "grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-250 motion-safe:ease-out",
          isExpanded ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">
          <ShortcutKeys letter="b" className="block pt-1 text-center text-xs text-text-menu" />
        </div>
      </div>
    </div>
  );
}
