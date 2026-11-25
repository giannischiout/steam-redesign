import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  kicker: string;
  title: string;
  image: string;
  bestDiscount: number;
  count: number;
  href: string;
};

/** Text sits under the picture, not on it: nothing tinted, and it is always readable. */
export function EventCard({ kicker, title, image, bestDiscount, count, href }: EventCardProps) {
  return (
    <Link href={href} className="group flex flex-col gap-3 rounded-tile bg-page-product p-2 md:p-3">
      <span className="relative block aspect-video overflow-hidden rounded-media bg-media lg:aspect-auto lg:min-h-48 lg:flex-1">
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover group-hover:brightness-110" />
      </span>
      <span className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 px-1 pb-1">
        <span className="grid">
          <span className="text-sm text-text-long">{kicker}</span>
          <span className="text-xl font-bold text-text-strong group-hover:underline md:text-2xl">{title}</span>
          <span className="text-sm text-text-long">{count} games on sale</span>
        </span>
        <span className="rounded-thumb bg-discount-badge px-3 py-1 text-lg font-bold text-discount-product-text">
          Up to -{bestDiscount}%
        </span>
      </span>
    </Link>
  );
}
