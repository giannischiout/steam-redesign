import { FriendsPanel } from "./friends-panel";
import { WishlistPanel } from "./wishlist-panel";

export function Player() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      <WishlistPanel />
      <FriendsPanel />
    </div>
  );
}
