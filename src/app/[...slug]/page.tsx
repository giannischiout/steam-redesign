import { TopBar } from "@/components/site-nav/top-bar";

export default function NotBuiltYet() {
  return (
    <>
      <TopBar />
      <main className="grid gap-2 py-12">
        <h1 className="text-3xl font-bold text-text-strong">Not built yet</h1>
        <p>This screen comes later in the concept.</p>
      </main>
    </>
  );
}
