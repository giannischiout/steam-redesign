import { useState } from "react";

/** Nothing is stored: a reload brings the starting list back. */
export function useWishlist(startingIds: number[]) {
  const [ids, setIds] = useState(startingIds);

  function toggle(id: number) {
    setIds(ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  }

  return { has: (id: number) => ids.includes(id), toggle };
}
