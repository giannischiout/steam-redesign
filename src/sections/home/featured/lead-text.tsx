import { IconChevronUp } from "@tabler/icons-react";
import type { Ref } from "react";
import type { Game } from "@/lib/catalog";
import { formatFacts } from "@/lib/format";

type LeadTextProps = {
  game: Game;
  drawerId: string;
  isOpen: boolean;
  buttonRef: Ref<HTMLButtonElement>;
  onOpen: () => void;
};

/** Always the same number of lines, so a change of game does not move the page. */
export function LeadText({ game, drawerId, isOpen, buttonRef, onOpen }: LeadTextProps) {
  return (
    <div inert={isOpen} className="row-start-3 xl:col-start-1 xl:row-start-2">
      <p className="line-clamp-3 min-h-[3lh] max-w-[72ch] md:line-clamp-2 md:min-h-[2lh]">{game.about}</p>
      <p className="mt-1 text-sm text-text-long">{formatFacts(game.genres, game.released)}</p>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={drawerId}
        onClick={onOpen}
        className="flex h-11 cursor-pointer items-center gap-1 rounded-thumb text-sm text-link hover:underline"
      >
        More details
        <IconChevronUp aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
