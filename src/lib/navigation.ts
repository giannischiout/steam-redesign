import {
  IconCalendarEventFilled,
  IconCompassFilled,
  IconHeartFilled,
  IconHelpCircleFilled,
  IconHomeFilled,
  IconLayoutGridFilled,
  IconSearch,
  IconSettingsFilled,
  IconUserFilled,
  type Icon,
} from "@tabler/icons-react";

export type NavItem = { href: string; label: string; Icon: Icon };

const home = { href: "/", label: "Home", Icon: IconHomeFilled };
const library = { href: "/library", label: "Library", Icon: IconLayoutGridFilled };
const browse = { href: "/browse", label: "Browse store", Icon: IconCompassFilled };
const wishlist = { href: "/wishlist", label: "Wishlist", Icon: IconHeartFilled };

/** Groups shown at the top of the sidebar. */
export const sidebarGroups: NavItem[][] = [
  [{ href: "/search", label: "Search", Icon: IconSearch }],
  [home, library],
  [
    browse,
    wishlist,
    { href: "/news", label: "News and events", Icon: IconCalendarEventFilled },
  ],
  [{ href: "/friends", label: "Friends", Icon: IconUserFilled }],
];

/** Shown at the bottom of the sidebar. */
export const sidebarFooter: NavItem[] = [
  { href: "/support", label: "Support", Icon: IconHelpCircleFilled },
  { href: "/settings", label: "Settings", Icon: IconSettingsFilled },
];

export const bottomBarItems: NavItem[] = [home, { ...browse, label: "Browse" }, wishlist, library];
