import { TopBar } from "@/components/site-nav/top-bar";
import { AnnouncementStrip } from "@/sections/home/announcement-strip";
import { Featured } from "@/sections/home/featured";
import { GameTabs } from "@/sections/home/game-tabs";

export default function Home() {
  return (
    <>
      <TopBar>
        <AnnouncementStrip />
      </TopBar>
      <main className="grid gap-6 md:gap-8">
        <h1 className="sr-only">Store home</h1>
        <Featured />
        <GameTabs />
      </main>
    </>
  );
}
