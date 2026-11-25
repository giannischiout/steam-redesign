import { platformIcons } from "@/components/platform-icons";
import { SectionHeader } from "@/components/section-header";
import { Tabs } from "@/components/tabs";
import type { Details } from "@/lib/game-details";
import { RequirementList } from "./requirement-list";

type SystemRequirementsProps = { platforms: string[]; requirements: Details["requirements"] };

const systems = [
  { key: "windows", platform: "Windows", label: "Windows" },
  { key: "macos", platform: "macOS", label: "macOS" },
  { key: "linux", platform: "Linux", label: "SteamOS and Linux" },
] as const;

/**
 * A tab for each system the game runs on. Steam sends filler text for others, so the
 * game's own list of systems decides.
 */
export function SystemRequirements({ platforms, requirements }: SystemRequirementsProps) {
  const tabs = systems.flatMap(({ key, platform, label }) => {
    const { minimum, recommended } = requirements[key];
    if (!platforms.includes(platform) || minimum.length + recommended.length === 0) return [];
    const Icon = platformIcons.get(platform);
    return [
      {
        key: `system-${key}`,
        label,
        icon: Icon && <Icon aria-hidden="true" size={18} />,
        panel: (
          <div className="grid gap-6 rounded-tile bg-page-product p-4 md:grid-cols-2 md:p-5">
            {minimum.length > 0 && <RequirementList title="Minimum" rows={minimum} />}
            {recommended.length > 0 && <RequirementList title="Recommended" rows={recommended} />}
          </div>
        ),
      },
    ];
  });
  if (tabs.length === 0) return null;

  return (
    <section aria-labelledby="requirements-title">
      <SectionHeader id="requirements-title" title="System requirements" />
      <Tabs label="Operating system" tabs={tabs} />
    </section>
  );
}
