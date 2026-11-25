import { IconBrandAppleFilled, IconBrandWindowsFilled, IconTerminal2 } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

export const platformIcons = new Map([
  ["Windows", IconBrandWindowsFilled],
  ["macOS", IconBrandAppleFilled],
  ["Linux", IconTerminal2],
]);

type PlatformIconsProps = { platforms: string[]; itemClassName?: string };

export function PlatformIcons({ platforms, itemClassName }: PlatformIconsProps) {
  return (
    <ul className="flex gap-2">
      {platforms.map((platform) => {
        const Icon = platformIcons.get(platform);
        return (
          <li
            key={platform}
            title={platform}
            className={cn("grid size-10 place-content-center rounded-full bg-page-product text-text-strong", itemClassName)}
          >
            {Icon && <Icon aria-hidden="true" size={20} />}
            <span className="sr-only">{platform}</span>
          </li>
        );
      })}
    </ul>
  );
}
