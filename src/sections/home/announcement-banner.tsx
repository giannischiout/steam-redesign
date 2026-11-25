"use client";

import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useAnnouncementOpen } from "@/hooks/use-announcement-open";
import { announcement } from "@/lib/announcement";

export function AnnouncementBanner() {
  const { open, setOpen } = useAnnouncementOpen();
  if (!announcement || !open) return null;

  return (
    <aside
      aria-label="Pinned announcement"
      className="flex items-center gap-2 rounded-tile bg-page-product p-2 md:pr-3"
    >
      <Link
        href={announcement.href}
        className="group flex min-w-0 flex-1 items-center gap-3 rounded-media md:gap-4"
      >
        <span className="relative block size-14 shrink-0 overflow-hidden rounded-media md:w-40">
          <Image
            src={announcement.image}
            alt=""
            fill
            loading="eager"
            sizes="320px"
            className="object-cover object-bottom"
          />
        </span>
        <span className="grid min-w-0">
          <span className="font-semibold text-text-strong group-hover:underline">{announcement.title}</span>
          <span className="text-sm text-balance text-text-long">{announcement.detail}</span>
        </span>
      </Link>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setOpen(false)}
        className="grid size-11 shrink-0 cursor-pointer place-content-center rounded-full text-text-menu hover:text-text-strong"
      >
        <IconX aria-hidden="true" size={20} />
      </button>
    </aside>
  );
}
