import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled } from "@tabler/icons-react";
import { ShortcutKeys } from "@/components/shortcut-keys";
import { cn } from "@/lib/cn";
import { sidebarIcon, sidebarLabel, sidebarRow } from "./sidebar-item-styles";

type SidebarToggleProps = { isExpanded: boolean; onToggle: () => void };

export function SidebarToggle({ isExpanded, onToggle }: SidebarToggleProps) {
  const Icon = isExpanded ? IconLayoutSidebarLeftCollapseFilled : IconLayoutSidebarLeftExpandFilled;

  return (
    <>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-keyshortcuts="Control+B Meta+B"
        onClick={onToggle}
        className={cn(sidebarRow, "cursor-pointer")}
      >
        <span className={sidebarIcon}>
          <Icon aria-hidden="true" size={22} />
        </span>
        <span className={sidebarLabel(isExpanded)}>{isExpanded ? "Collapse" : "Open sidebar"}</span>
        {isExpanded && <ShortcutKeys letter="b" className="mr-3 ml-auto" />}
      </button>
      {/* Closed, the keys stay in view under the icon. */}
      {!isExpanded && (
        <ShortcutKeys letter="b" className="block pt-1 text-center text-xs text-text-menu" />
      )}
    </>
  );
}
