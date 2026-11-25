import { ReviewSummary } from "@/components/review-summary";
import { browseHref } from "@/lib/browse";
import { getAllGames, getGamesBy, getUpcoming, type Game } from "@/lib/catalog";
import { similarGames } from "@/lib/similar-games";
import { About } from "./about";
import { BuyBox } from "./buy-box";
import { FriendsWhoPlay } from "./friends-who-play";
import { GameRow } from "./game-row";
import { MediaViewer } from "./media-viewer";
import { PlayerReviews } from "./player-reviews";

const ROW = 4;

/** Media and buy box side by side, then the details, then more games. */
export function GamePage({ game }: { game: Game }) {
  const isUpcoming = getUpcoming().some((other) => other.id === game.id);
  const developer = game.developers[0];
  const fromDeveloper = developer ? getGamesBy(developer).filter((other) => other.id !== game.id).slice(0, ROW) : [];
  const shown = new Set(fromDeveloper.map((other) => other.id));
  const alike = similarGames(game, getAllGames().filter((other) => !shown.has(other.id)), ROW);

  return (
    <main className="grid grid-cols-[minmax(0,1fr)] gap-10 md:gap-14">
      <div className="grid gap-3 md:gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold text-balance text-text-strong md:text-3xl">{game.name}</h1>
          <p className="flex flex-wrap items-center gap-x-2 text-sm text-text-long">
            {isUpcoming ? <span>Not out yet</span> : <ReviewSummary reviews={game.reviews} variant="full" />}
            {game.genres.length > 0 && <span>{game.genres.join(" · ")}</span>}
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-5">
          <MediaViewer key={game.id} name={game.name} video={game.trailer?.loop ?? null} shots={game.shots} />
          <BuyBox game={game} isUpcoming={isUpcoming} />
        </div>
      </div>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-5">
        <div className="grid gap-10 md:gap-14">
          <About game={game} />
          {!isUpcoming && <PlayerReviews game={game} />}
        </div>
        <FriendsWhoPlay gameId={game.id} />
      </div>
      {developer && fromDeveloper.length > 0 && (
        <GameRow
          id="developer-title"
          title={`More from ${developer}`}
          games={fromDeveloper}
          href={browseHref({ creator: developer })}
        />
      )}
      {alike.length > 0 && <GameRow id="alike-title" title="Games like this" games={alike} />}
    </main>
  );
}
