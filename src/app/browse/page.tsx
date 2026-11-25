import { TopBar } from "@/components/site-nav/top-bar";
import { Browse } from "@/sections/browse";
import { LayoutSwitch } from "@/sections/browse/layout-switch";

export default function BrowsePage() {
  return (
    <>
      <TopBar />
      <main className="grid gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-text-strong">Browse games</h1>
          <LayoutSwitch />
        </div>
        <Browse />
      </main>
    </>
  );
}
