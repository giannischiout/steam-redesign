import { getList } from "@/lib/catalog";
import { FeaturedRotator } from "./featured-rotator";

export function Featured() {
  return <FeaturedRotator games={getList("featured")} />;
}
