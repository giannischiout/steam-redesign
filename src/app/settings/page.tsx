import { TopBar } from "@/components/site-nav/top-bar";
import { SidebarPicker } from "@/components/settings/sidebar-picker";
import { FontPicker } from "@/sections/settings/font-picker";

export default function SettingsPage() {
  return (
    <>
      <TopBar />
      <main className="grid gap-8 py-4">
        <h1 className="text-3xl font-bold text-text-strong">Settings</h1>
        <div className="hidden max-w-xl md:block">
          <SidebarPicker />
        </div>
        <FontPicker />
        <p className="text-sm text-text-long">Saved in this browser only.</p>
      </main>
    </>
  );
}
