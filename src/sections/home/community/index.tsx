import { communityPicks } from "@/data/community-picks";
import { getGame } from "@/lib/catalog";
import { CommunityGallery } from "./community-gallery";
import type { Pick } from "./pick";

export function Community() {
  const picks = communityPicks.flatMap(({ gameId, ...pick }): Pick[] => {
    const game = getGame(gameId);
    if (!game) return [];
    const { id, name, about, developers, released, reviews, platforms, shots, image, price, was, discount } = game;
    // The genres are too broad to say much, and "Singleplayer" is on nearly every pick.
    const tags = game.tags.filter((tag) => tag !== "Singleplayer").slice(0, 4);
    return [
      {
        ...pick,
        game: { id, name, about, developers, released, reviews, tags, platforms, price, was, discount, shots: shots.length ? shots.slice(0, 5) : [image] },
      },
    ];
  });

  return <CommunityGallery picks={picks} />;
}
