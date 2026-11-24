import { palette } from "@/data/palette";
import { SwatchCard } from "./swatch-card";

export function PaletteSection() {
  return (
    <section aria-labelledby="palette-title" className="grid gap-8">
      <h2 id="palette-title" className="text-2xl font-bold text-text-strong">
        Colours
      </h2>
      {palette.map((group) => (
        <div
          key={group.name}
          className="grid gap-4 md:grid-cols-[8rem_minmax(0,1fr)]"
        >
          <h3 className="text-lg text-text-strong">{group.name}</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 xl:grid-cols-5">
            {group.swatches.map((swatch) => (
              <SwatchCard key={swatch.token} swatch={swatch} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
