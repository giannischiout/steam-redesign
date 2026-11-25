import { Suspense } from "react";
import { toBrowseGame } from "@/lib/browse";
import { getAllGames } from "@/lib/catalog";
import { BrowseView } from "./browse-view";

export function Browse() {
  return (
    <Suspense fallback={<p className="py-12">Loading games</p>}>
      <BrowseView games={getAllGames().map(toBrowseGame)} />
    </Suspense>
  );
}
