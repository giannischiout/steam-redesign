import { TopBar } from "@/components/site-nav/top-bar";
import { AnnouncementBanner } from "@/sections/home/announcement-banner";
import { Featured } from "@/sections/home/featured";
import { GameTabs } from "@/sections/home/game-tabs";
import { Player } from "@/sections/home/player";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="grid grid-cols-[minmax(0,1fr)] gap-4 md:gap-5">
        <h1 className="sr-only">Store home</h1>
        <AnnouncementBanner />
        <Featured />
        <Player />
        <GameTabs />
      </main>
    </>
  );
}
