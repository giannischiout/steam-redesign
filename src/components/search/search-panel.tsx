import { IconSearch, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScrollArea } from "@/components/scroll-area";
import { categories, favoriteCategories } from "@/data/categories";
import { searchGames, type SearchGame } from "@/lib/search";
import { moveFocus } from "./move-focus";
import { SearchResults } from "./search-results";
import { SearchSuggestions } from "./search-suggestions";

type SearchPanelProps = { games: SearchGame[]; popular: SearchGame[]; onClose: () => void };

/** Enter in the field opens the first result. */
export function SearchPanel({ games, popular, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const term = query.trim();
  const results = searchGames(games, categories, term);

  function openFirst() {
    const first = results[0];
    if (!first) return;
    onClose();
    router.push(`/game/${first.id}`);
  }

  return (
    <div onKeyDown={moveFocus} className="flex h-[33rem] max-h-[calc(100dvh-2rem)] flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-text-quiet/25 py-2 pr-2 pl-4 md:pl-5">
        <IconSearch aria-hidden="true" size={22} className="shrink-0 text-text-long" />
        <input
          autoFocus
          type="text"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          aria-label="Search the store"
          placeholder="Search the store"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && openFirst()}
          className="h-11 min-w-0 flex-1 bg-transparent text-lg text-text-strong placeholder:text-text-long focus-visible:outline-none"
        />
        <button
          type="button"
          aria-label="Close search"
          onClick={onClose}
          className="grid size-11 shrink-0 cursor-pointer place-content-center rounded-full text-text-menu -outline-offset-2 hover:text-text-strong"
        >
          <IconX aria-hidden="true" size={20} />
        </button>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="p-4 md:p-5">
          {term ? (
            <SearchResults results={results} query={term} onOpen={onClose} />
          ) : (
            <SearchSuggestions popular={popular} categories={favoriteCategories} onOpen={onClose} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
