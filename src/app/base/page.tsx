import { LogoSection } from "@/sections/base/logo-section";
import { PaletteSection } from "@/sections/base/palette-section";
import { TypeSection } from "@/sections/base/type-section";

export default function BasePage() {
  return (
    <main className="grid gap-16 py-10">
      <h1 className="text-3xl font-bold text-text-strong">
        Steam store redesign: base
      </h1>
      <LogoSection />
      <PaletteSection />
      <TypeSection />
    </main>
  );
}
