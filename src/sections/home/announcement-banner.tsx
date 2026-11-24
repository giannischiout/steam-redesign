"use client";

import { IconPinFilled, IconX } from "@tabler/icons-react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { useAnnouncementOpen } from "@/hooks/use-announcement-open";
import { announcement } from "@/lib/announcement";

const round = "grid size-11 place-content-center rounded-full bg-page text-text-strong";

export function AnnouncementBanner() {
  const { open, setOpen } = useAnnouncementOpen();
  if (!announcement || !open) return null;

  const common = { alt: "", loading: "eager" as const };
  const wide = getImageProps({ ...common, src: announcement.wideImage, width: 1850, height: 450, sizes: "95vw" });
  const phone = getImageProps({ ...common, src: announcement.phoneImage, width: 500, height: 350, sizes: "100vw" });

  return (
    <aside aria-label="Pinned announcement" className="relative overflow-hidden rounded-tile">
      <Link
        href={announcement.href}
        aria-label={`${announcement.title}. ${announcement.detail}`}
        className="block -outline-offset-4"
      >
        <picture>
          <source media="(min-width: 768px)" srcSet={wide.props.srcSet} sizes="95vw" />
          <img
            {...phone.props}
            alt=""
            className="w-full object-cover object-top md:h-[clamp(11rem,17.5vw,17rem)]"
          />
        </picture>
      </Link>
      <div className="absolute right-2 bottom-2 flex gap-2 md:top-3 md:right-3 md:bottom-auto">
        <span title="Pinned" className={round}>
          <IconPinFilled aria-hidden="true" size={20} />
        </span>
        <button
          type="button"
          aria-label="Close announcement"
          onClick={() => setOpen(false)}
          className={`${round} cursor-pointer`}
        >
          <IconX aria-hidden="true" size={20} />
        </button>
      </div>
    </aside>
  );
}
