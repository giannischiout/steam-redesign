import { TopBar } from "@/components/site-nav/top-bar";
import { Browse } from "@/sections/browse";

export default function BrowsePage() {
  return (
    <>
      <TopBar />
      <main className="grid gap-6">
        <h1 className="text-3xl font-bold text-text-strong">Browse games</h1>
        <Browse />
      </main>
    </>
  );
}
