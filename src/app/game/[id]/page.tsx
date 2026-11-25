import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TopBar } from "@/components/site-nav/top-bar";
import { getAllGames, getGame, getUpcoming } from "@/lib/catalog";
import { GamePage } from "@/sections/game";

/** Every saved game gets its page at build time. */
export function generateStaticParams() {
  return [...getAllGames(), ...getUpcoming()].map((game) => ({ id: String(game.id) }));
}

export async function generateMetadata({ params }: PageProps<"/game/[id]">): Promise<Metadata> {
  const game = getGame(Number((await params).id));
  return { title: game ? `${game.name}, store redesign concept (unofficial)` : "Game not found" };
}

async function Content({ params }: Pick<PageProps<"/game/[id]">, "params">) {
  const game = getGame(Number((await params).id));
  if (!game) notFound();
  return <GamePage game={game} />;
}

/** The top bar shows at once on a click through, while the game itself loads. */
export default function Page({ params }: PageProps<"/game/[id]">) {
  return (
    <>
      <TopBar />
      <Suspense fallback={<div className="min-h-dvh" />}>
        <Content params={params} />
      </Suspense>
    </>
  );
}
