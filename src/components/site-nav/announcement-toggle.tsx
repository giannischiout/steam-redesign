"use client";

import { IconSpeakerphone } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useAnnouncementOpen } from "@/hooks/use-announcement-open";
import { announcement } from "@/lib/announcement";

type AnnouncementToggleProps = { className: string };

/** Brings the closed announcement back. Hidden while it is showing. */
export function AnnouncementToggle({ className }: AnnouncementToggleProps) {
  const { open, setOpen } = useAnnouncementOpen();
  const pathname = usePathname();
  const router = useRouter();
  if (!announcement || (open && pathname === "/")) return null;

  function show() {
    setOpen(true);
    if (pathname !== "/") router.push("/");
  }

  return (
    <button type="button" aria-label={`Show ${announcement.title}`} onClick={show} className={className}>
      <IconSpeakerphone aria-hidden="true" size={20} />
    </button>
  );
}
