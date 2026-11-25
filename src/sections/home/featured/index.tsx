import { getList } from "@/lib/catalog";
import { GiftCardLink } from "../gift-cards/gift-card-link";
import { FeaturedRotator } from "./featured-rotator";

export function Featured() {
  const wishlistIds = getList("wishlist").map((game) => game.id);

  return <FeaturedRotator games={getList("featured")} wishlistIds={wishlistIds} aside={<GiftCardLink />} />;
}
