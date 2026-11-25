import { SectionHeader } from "@/components/section-header";
import { friends } from "@/data/friends";

export function FriendsWhoPlay({ gameId }: { gameId: number }) {
  const playing = friends.filter((friend) => friend.gameId === gameId);

  return (
    <section aria-labelledby="friends-who-title">
      <SectionHeader id="friends-who-title" title="Friends who play" />
      <div className="rounded-tile bg-page-product p-4">
        {playing.length > 0 ? (
          <ul className="grid gap-3">
            {playing.map((friend) => (
              <li key={friend.name} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-content-center rounded-full bg-page font-semibold text-text-strong"
                >
                  {friend.name[0]}
                </span>
                <span className="grid">
                  <span className="font-semibold text-text-strong">{friend.name}</span>
                  <span className="text-sm text-text-long">{friend.note}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>None of your friends have played this yet.</p>
        )}
      </div>
    </section>
  );
}
