import { platformIcons } from "@/components/platform-icons";
import type { FilterOption } from "@/lib/filter-groups";

/** In the sidebar and the drawer, platforms are round icon buttons. */
export function PlatformToggles({ options }: { options: FilterOption[] }) {
  return (
    <div className="flex gap-2 py-1">
      {options.map((option) => {
        const Icon = platformIcons.get(option.key);
        return (
          <button
            key={option.key}
            type="button"
            title={option.label}
            aria-label={option.label}
            aria-pressed={option.isChecked}
            onClick={option.onChange}
            className="grid size-11 cursor-pointer place-content-center rounded-full bg-page text-text-menu hover:text-text-strong aria-pressed:bg-text-strong aria-pressed:text-page"
          >
            {Icon && <Icon aria-hidden="true" size={20} />}
          </button>
        );
      })}
    </div>
  );
}
