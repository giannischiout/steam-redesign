import { getAllGames, getList } from "@/lib/catalog";
import { toSearchGame } from "@/lib/search";
import { SearchDialog } from "./search-dialog";

const POPULAR = 8;

export function Search() {
  return (
    <SearchDialog
      games={getAllGames().map(toSearchGame)}
      popular={getList("top-sellers").slice(0, POPULAR).map(toSearchGame)}
    />
  );
}
