"use client";

import { IconPinFilled, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { announcement } from "@/lib/announcement";

export function AnnouncementStrip() {
  const [isClosed, setIsClosed] = useState(false);
  if (!announcement || isClosed) return null;

  return (
    <aside
      aria-label="Announcement"
      className="flex items-center rounded-tile bg-button-blue-to text-text-strong"
    >
      <Link
        href={announcement.href}
        className="group flex min-w-0 flex-1 items-center gap-3 rounded-tile px-4 py-3"
      >
        <IconPinFilled aria-hidden="true" size={20} className="shrink-0" />
        <span className="flex flex-col text-sm md:flex-row md:gap-4">
          <b className="group-hover:underline">{announcement.title}</b>
          <span>{announcement.detail}</span>
        </span>
      </Link>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setIsClosed(true)}
        className="grid size-11 cursor-pointer place-content-center rounded-full"
      >
        <IconX aria-hidden="true" size={20} />
      </button>
    </aside>
  );
}
