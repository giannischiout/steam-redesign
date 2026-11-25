import Image from "next/image";
import Link from "next/link";
import type { Pick } from "./pick";

/** The main picture and three more, or four in two rows where that fills the height better. */
export function CommunityMedia({ game }: { game: Pick["game"] }) {
  const [main, ...rest] = game.shots;

  return (
    <div className="grid content-start gap-2 lg:max-xl:grid-rows-[auto_minmax(4rem,1fr)] lg:max-xl:content-stretch">
      <Link
        href={`/game/${game.id}`}
        aria-hidden="true"
        tabIndex={-1}
        className="relative block aspect-video overflow-hidden rounded-media bg-media"
      >
        {main && (
          <Image key={main} src={main} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="fade-in object-cover" />
        )}
      </Link>
      <ul className="grid grid-cols-3 gap-2 lg:max-xl:grid-cols-2 lg:max-xl:grid-rows-2">
        {rest.map((shot) => (
          <li key={shot} className="relative aspect-video overflow-hidden rounded-thumb bg-media lg:max-xl:aspect-auto nth-4:hidden lg:max-xl:nth-4:block">
            <Image src={shot} alt="" fill sizes="(min-width: 1280px) 17vw, (min-width: 1024px) 25vw, 33vw" className="fade-in object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
}
