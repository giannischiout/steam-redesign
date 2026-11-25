import { TopBar } from "@/components/site-nav/top-bar";
import { AnnouncementBanner } from "@/sections/home/announcement-banner";
import { Categories } from "@/sections/home/categories";
import { Community } from "@/sections/home/community";
import { Creators } from "@/sections/home/creators";
import { Deals } from "@/sections/home/deals";
import { DiscoveryQueue } from "@/sections/home/discovery-queue";
import { Featured } from "@/sections/home/featured";
import { GameTabs } from "@/sections/home/game-tabs";
import { Player } from "@/sections/home/player";

export default function Home() {
  return (
    <>
      <TopBar />
      {/* Between sections: 40px on phone, 56px from md, 64px from xl. */}
      <main className="grid grid-cols-[minmax(0,1fr)] gap-10 md:gap-14 xl:gap-16">
        <h1 className="sr-only">Store home</h1>
        {/* The announcement is a notice, not a section, so it sits closer. */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:gap-8">
          <AnnouncementBanner />
          <Featured />
        </div>
        <Player />
        <Deals />
        <DiscoveryQueue />
        <Categories />
        <Community />
        <GameTabs />
        <Creators />
      </main>
    </>
  );
}
