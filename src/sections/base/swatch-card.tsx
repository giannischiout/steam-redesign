import type { Swatch } from "@/data/palette";

type SwatchCardProps = { swatch: Swatch };

export function SwatchCard({ swatch }: SwatchCardProps) {
  return (
    <li className="min-w-0">
      <div
        className="h-20 outline outline-text-quiet/40"
        style={{ backgroundColor: `var(--color-${swatch.token})` }}
      />
      <p className="mt-2 text-sm font-bold break-words text-text-strong">
        {swatch.token}
      </p>
      <p className="text-sm">{swatch.hex}</p>
      <p className="text-sm text-text-long">{swatch.use}</p>
    </li>
  );
}
