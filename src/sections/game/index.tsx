import { ReviewSummary } from "@/components/review-summary";
import { browseHref } from "@/lib/browse";
import { getAllGames, getGamesBy, getUpcoming, type Game } from "@/lib/catalog";
import { getDetails } from "@/lib/game-details";
import { similarGames } from "@/lib/similar-games";
import { About } from "./about";
import { BuyBox } from "./buy-box";
import { FriendsWhoPlay } from "./friends-who-play";
import { GameRow } from "./game-row";
import { MediaViewer } from "./media-viewer";
import { PlayerReviews } from "./player-reviews";
import { SystemRequirements } from "./system-requirements";

const ROW = 4;

/** Media and details on the left, a buy card that stays in view on the right, then more games. */
export function GamePage({ game }: { game: Game }) {
  const isUpcoming = getUpcoming().some((other) => other.id === game.id);
  const developer = game.developers[0];
  const details = getDetails(game.id);
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
        {/* From lg the buy column runs beside the media and the details, so it can stick.
            Below lg it comes between them. */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-5 lg:gap-y-14">
          <MediaViewer key={game.id} name={game.name} video={game.trailer?.loop ?? null} shots={game.shots} />
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="grid gap-10 lg:sticky lg:top-4">
              <BuyBox game={game} isUpcoming={isUpcoming} />
              <FriendsWhoPlay gameId={game.id} />
            </div>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] content-start gap-10 pt-6 md:gap-14 lg:col-start-1 lg:pt-0">
            <About game={game} blocks={details?.about ?? []} />
            {!isUpcoming && <PlayerReviews game={game} />}
            {details && (
              <SystemRequirements key={game.id} platforms={game.platforms} requirements={details.requirements} />
            )}
          </div>
        </div>
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
