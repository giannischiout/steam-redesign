import Image from "next/image";
import { friends } from "@/data/friends";
import { getGame } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { Panel } from "./panel";

export function FriendsPanel() {
  return (
    <Panel id="friends-title" title="Friends" href="/friends">
      {friends.map((friend) => {
        const game = getGame(friend.gameId);
        return (
          <li key={friend.name} className="flex h-14 items-center gap-4">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-content-center rounded-full bg-page font-semibold text-text-strong"
            >
              {friend.name[0]}
            </span>
            <span className="grid min-w-0 flex-1">
              <span className="font-semibold text-text-strong">{friend.name}</span>
              <span className={cn("truncate text-sm", friend.isPlaying ? "text-link" : "text-text-long")}>
                {friend.note}
                {game && `: ${game.name}`}
              </span>
            </span>
            {game && (
              <span className="relative hidden h-14 w-30 shrink-0 overflow-hidden rounded-thumb sm:block">
                <Image src={game.image} alt="" fill sizes="120px" className="object-cover" />
              </span>
            )}
          </li>
        );
      })}
    </Panel>
  );
}
