import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import type { Game } from "@/lib/catalog";
import type { Media } from "./media";

type MediaPickerProps = {
  game: Pick<Game, "name">;
  media: Media[];
  active: number;
  onSelect: (index: number) => void;
};

export function MediaPicker({ game, media, active, onSelect }: MediaPickerProps) {
  return (
    <ul className="order-3 grid grid-cols-2 gap-2 xl:order-none xl:flex-1 xl:auto-rows-fr">
      {media.map((item, index) => (
        <li key={item.src}>
          <button
            type="button"
            aria-label={
              item.kind === "trailer"
                ? `Play ${game.name} trailer`
                : `Show ${game.name} screenshot ${index + 1}`
            }
            aria-pressed={index === active}
            onClick={() => onSelect(index)}
            className="relative block aspect-video w-full cursor-pointer overflow-hidden rounded-thumb hover:brightness-110 aria-pressed:ring-2 aria-pressed:ring-text-strong xl:aspect-auto xl:size-full xl:min-h-24"
          >
            <Image src={item.src} alt="" fill sizes="(min-width: 1280px) 20vw, 50vw" className="object-cover" />
            {item.kind === "trailer" && (
              <span className="absolute inset-0 m-auto grid size-11 place-content-center rounded-full bg-page/90 text-text-strong">
                <IconPlayerPlayFilled aria-hidden="true" size={20} />
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
