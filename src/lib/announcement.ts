// The one pinned announcement. Set to null when there is none.
type Announcement = { title: string; detail: string; href: string };

export const announcement: Announcement | null = {
  title: "The 2026 Steam Awards",
  detail: "Nominate until Nov 30, 10 AM PT",
  href: "/news/steam-awards",
};
