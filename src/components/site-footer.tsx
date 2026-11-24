import { VALVE_ATTRIBUTION } from "@/lib/legal";

export function SiteFooter() {
  return (
    <footer className="pt-16 pb-8 text-sm text-text-quiet">
      <p className="max-w-prose">{VALVE_ATTRIBUTION}</p>
    </footer>
  );
}
