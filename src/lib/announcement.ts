// The one pinned announcement. Set to null when there is none.
// The art loads from Steam's CDN, like the game images.
type Announcement = {
  title: string;
  detail: string;
  href: string;
  image: string;
};

const art =
  "https://shared.fastly.steamstatic.com/store_item_assets/steam/clusters/frontpage/11cb00145d11c6d71b98f817";

export const announcement: Announcement | null = {
  title: "The 2026 Steam Awards",
  detail: "Nominate until Nov 30, 10 AM PT",
  href: "/news/steam-awards",
  image: `${art}/639ddae4ac26265e685f21f3b8eaf330f376d47b/page_bg_mobile_english.jpg`,
};
