import { TopBar } from "@/components/site-nav/top-bar";
import { FontPicker } from "@/sections/settings/font-picker";

export default function SettingsPage() {
  return (
    <>
      <TopBar />
      <main className="grid gap-8 py-4">
        <h1 className="text-3xl font-bold text-text-strong">Settings</h1>
        <FontPicker />
        <p className="text-sm text-text-long">Saved in this browser only.</p>
      </main>
    </>
  );
}
